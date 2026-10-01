import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CommunityAdminService } from './community-admin.service';
import { CommunityService } from './community.service';

/** The creator's community admin: mutes and the write guard they drive. */

function build(role: 'MEMBER' | 'ADMIN' | null = 'MEMBER') {
  const prisma: any = {
    communityMembership: {
      findUnique: jest.fn().mockResolvedValue(role ? { role } : null),
      update: jest.fn().mockResolvedValue({}),
    },
  };
  const communities = {
    assertModerator: jest.fn().mockResolvedValue({}),
    forgetAccess: jest.fn(),
  };
  return { service: new CommunityAdminService(prisma, communities as any), prisma, communities };
}

const creator = { id: 'creator', role: 'INSTRUCTOR' };

describe('CommunityAdminService.mute', () => {
  it('mutes for 1, 7 or 30 days and drops the member’s cached access', async () => {
    const { service, prisma, communities } = build();
    const before = Date.now();
    const res = await service.mute(creator, 'comm', 'kim', 7);
    const until = (res.mutedUntil as Date).getTime();
    expect(until - before).toBeGreaterThanOrEqual(7 * 86400000 - 1000);
    expect(until - before).toBeLessThanOrEqual(7 * 86400000 + 1000);
    expect(prisma.communityMembership.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: { mutedUntil: res.mutedUntil } }),
    );
    expect(communities.assertModerator).toHaveBeenCalledWith('comm', 'creator', 'INSTRUCTOR');
    expect(communities.forgetAccess).toHaveBeenCalledWith('comm', 'kim');
  });

  it('lifts a mute with days: null', async () => {
    const { service, prisma } = build();
    await service.mute(creator, 'comm', 'kim', null);
    expect(prisma.communityMembership.update.mock.calls[0][0].data).toEqual({ mutedUntil: null });
  });

  it('refuses other durations, the creator, and strangers', async () => {
    await expect(build().service.mute(creator, 'comm', 'kim', 3)).rejects.toBeInstanceOf(BadRequestException);
    await expect(build('ADMIN').service.mute(creator, 'comm', 'creator', 1)).rejects.toBeInstanceOf(BadRequestException);
    await expect(build(null).service.mute(creator, 'comm', 'nobody', 1)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('only a moderator of this community can mute', async () => {
    const { service, communities, prisma } = build();
    communities.assertModerator.mockRejectedValue(new ForbiddenException());
    await expect(service.mute({ id: 'kim' }, 'comm', 'lee', 1)).rejects.toBeInstanceOf(ForbiddenException);
    expect(prisma.communityMembership.update).not.toHaveBeenCalled();
  });
});

describe('CommunityService.assertCanWrite', () => {
  const svc = Object.create(CommunityService.prototype) as CommunityService;

  it('blocks a member muted into the future', () => {
    expect(() => svc.assertCanWrite({ mutedUntil: new Date(Date.now() + 3600_000) }, false)).toThrow(ForbiddenException);
  });

  it('lets through an expired mute, no mute, and moderators', () => {
    expect(() => svc.assertCanWrite({ mutedUntil: new Date(Date.now() - 1000) }, false)).not.toThrow();
    expect(() => svc.assertCanWrite({ mutedUntil: null }, false)).not.toThrow();
    expect(() => svc.assertCanWrite(null, false)).not.toThrow();
    expect(() => svc.assertCanWrite({ mutedUntil: new Date(Date.now() + 3600_000) }, true)).not.toThrow();
  });
});
