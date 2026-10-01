import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { SupportService } from './support.service';

function setup() {
  const prisma = {
    user: { findUnique: jest.fn() },
    supportTicket: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
    },
    supportReply: { create: jest.fn() },
    $transaction: jest.fn((ops: unknown[]) => Promise.all(ops)),
  };
  const notifications = { createMany: jest.fn() };
  const service = new SupportService(prisma as any, notifications as any);
  return { prisma, notifications, service };
}

const thread = (over: Record<string, unknown> = {}) => ({
  id: 't1',
  userId: 'u1',
  audience: 'LEARNER',
  subject: 'Hearts',
  userUnread: false,
  userAgent: 'UA',
  replies: [
    {
      id: 'r1',
      isStaff: false,
      message: 'hi',
      createdAt: new Date(),
      author: { id: 'u1', fullName: 'Ada', avatarUrl: null },
    },
    {
      id: 'r2',
      isStaff: true,
      message: 'hello',
      createdAt: new Date(),
      author: { id: 'a1', fullName: 'Staff Name', avatarUrl: null },
    },
  ],
  ...over,
});

describe('SupportService', () => {
  it('refuses creator conversations from accounts without creator access', async () => {
    const { prisma, service } = setup();
    prisma.user.findUnique.mockResolvedValue({
      hasCreatorAccess: false,
      role: 'STUDENT',
    });
    await expect(
      service.create('u1', {
        audience: 'CREATOR',
        kind: 'HELP',
        message: 'Where are my payouts?',
      }),
    ).rejects.toBeInstanceOf(ForbiddenException);
    expect(prisma.supportTicket.create).not.toHaveBeenCalled();
  });

  it('opens a conversation with the first message and a derived subject', async () => {
    const { prisma, service } = setup();
    prisma.supportTicket.create.mockResolvedValue({
      id: 't1',
      publicId: 'TS-ABCDEF',
    });
    await service.create('u1', {
      audience: 'LEARNER',
      kind: 'IDEA',
      message: 'Dark mode please\nit would help at night',
      mood: 4,
    });
    const data = prisma.supportTicket.create.mock.calls[0][0].data;
    expect(data.subject).toBe('Dark mode please');
    expect(data.mood).toBeNull(); // mood is kept for FEEDBACK only
    expect(data.publicId).toMatch(/^TS-[2-9A-Z]{6}$/);
    expect(data.replies.create).toEqual({
      authorId: 'u1',
      message: 'Dark mode please\nit would help at night',
    });
  });

  it('only returns a user their own conversation, and hides staff names', async () => {
    const { prisma, service } = setup();
    prisma.supportTicket.findFirst.mockResolvedValue(null);
    await expect(service.getMine('u2', 't1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(prisma.supportTicket.findFirst.mock.calls[0][0].where).toEqual({
      id: 't1',
      userId: 'u2',
    });

    prisma.supportTicket.findFirst.mockResolvedValue(
      thread({ userUnread: true }),
    );
    const view = await service.getMine('u1', 't1');
    expect(view.replies[1]).toMatchObject({ fromTeyro: true, author: null });
    expect(view).not.toHaveProperty('userAgent');
    expect(prisma.supportTicket.update).toHaveBeenCalledWith({
      where: { id: 't1' },
      data: { userUnread: false },
    });
  });

  it.each([
    ['LEARNER', 'SUPPORT_REPLY', '/dashboard/help/t1'],
    ['CREATOR', 'STUDIO_SUPPORT_REPLY', '/creator/help/t1'],
  ])(
    'a team reply to a %s rings the right bell',
    async (audience, type, link) => {
      const { prisma, notifications, service } = setup();
      prisma.supportTicket.findUnique.mockResolvedValue({
        id: 't1',
        userId: 'u1',
        audience,
        subject: 'Hearts',
      });
      prisma.supportTicket.findFirst.mockResolvedValue(thread({ audience }));
      prisma.user.findUnique.mockResolvedValue({ id: 'u1' });
      await service.adminReply('a1', 't1', 'Here is how');
      expect(prisma.supportTicket.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: 'ANSWERED',
            userUnread: true,
          }),
        }),
      );
      expect(notifications.createMany.mock.calls[0][0][0]).toMatchObject({
        userId: 'u1',
        type,
        deepLink: link,
      });
    },
  );

  it('a user reply reopens the conversation', async () => {
    const { prisma, service } = setup();
    prisma.supportTicket.findFirst
      .mockResolvedValueOnce({ id: 't1' })
      .mockResolvedValue(thread());
    await service.replyMine('u1', 't1', ' thanks, still broken ');
    expect(prisma.supportReply.create).toHaveBeenCalledWith({
      data: { ticketId: 't1', authorId: 'u1', message: 'thanks, still broken' },
    });
    expect(prisma.supportTicket.update.mock.calls[0][0].data.status).toBe(
      'OPEN',
    );
  });
});
