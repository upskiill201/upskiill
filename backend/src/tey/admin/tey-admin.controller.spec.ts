import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../../auth/decorator/roles.decorator';
import { RolesGuard } from '../../auth/guard/roles.guard';
import { TeyAdminController } from './tey-admin.controller';

const contextFor = (role: string | undefined, cls: unknown) =>
  ({
    switchToHttp: () => ({
      getRequest: () => ({ user: role ? { id: 'u1', role } : undefined }),
    }),
    getHandler: () => function handler() {},
    getClass: () => cls,
  }) as unknown as ExecutionContext;

describe('TeyAdminController authorization', () => {
  /**
   * RolesGuard returns TRUE when no @Roles metadata is present
   * (auth/guard/roles.guard.ts). A new admin controller that forgets the
   * decorator is therefore wide open to every logged-in student — a failure
   * that looks like working code. This test is the tripwire.
   */
  it('declares @Roles(ADMIN) at class level', () => {
    const reflector = new Reflector();
    const roles = reflector.get<Role[]>(ROLES_KEY, TeyAdminController);

    expect(roles).toBeDefined();
    expect(roles).toContain(Role.ADMIN);
  });

  describe('RolesGuard against this controller', () => {
    let guard: RolesGuard;

    beforeEach(() => {
      guard = new RolesGuard(new Reflector());
    });

    it('admits an ADMIN', () => {
      expect(guard.canActivate(contextFor('ADMIN', TeyAdminController))).toBe(
        true,
      );
    });

    it.each(['STUDENT', 'INSTRUCTOR'])('refuses a %s', (role) => {
      expect(guard.canActivate(contextFor(role, TeyAdminController))).toBe(
        false,
      );
    });

    it('refuses a request with no role at all', () => {
      expect(guard.canActivate(contextFor(undefined, TeyAdminController))).toBe(
        false,
      );
    });
  });

  describe('test-push', () => {
    it('takes the recipient from the session and offers no way to override it', () => {
      // A "send to any user" endpoint behind an admin login is the most direct
      // route from admin panel to accidental spam cannon. The handler takes
      // only @GetUser() — assert its arity so a body param cannot be added
      // without this failing.
      const handler = TeyAdminController.prototype.testPush;
      expect(handler.length).toBe(1);

      const source = handler.toString();
      expect(source).toContain('user.id');
      // No recipient is read off a request body anywhere in the method.
      expect(source).not.toMatch(/body\.\s*userId/);
    });
  });

  describe('preview', () => {
    let controller: TeyAdminController;
    const admin = {
      preview: jest.fn().mockReturnValue({ title: 't', body: 'b' }),
    };

    beforeEach(() => {
      controller = new TeyAdminController(
        admin as never,
        {} as never,
        {} as never,
        {} as never,
        {} as never,
      );
      admin.preview.mockClear();
    });

    it('rejects an unknown reason rather than rendering a fallback', () => {
      expect(() => controller.preview('DROP TABLE users')).toThrow();
      expect(() => controller.preview(undefined)).toThrow();
      expect(admin.preview).not.toHaveBeenCalled();
    });

    it('falls back to a known tone instead of throwing', () => {
      // Tone is cosmetic; a bad value should not break the page.
      controller.preview('STREAK_AT_RISK', 'NONSENSE');
      expect(admin.preview).toHaveBeenCalledWith(
        'STREAK_AT_RISK',
        'URGENT_PLAYFUL',
      );
    });

    it('honours a valid tone', () => {
      controller.preview('STREAK_AT_RISK', 'ENCOURAGING');
      expect(admin.preview).toHaveBeenCalledWith(
        'STREAK_AT_RISK',
        'ENCOURAGING',
      );
    });
  });
});
