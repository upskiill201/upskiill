import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { AdminController } from './admin.controller';

const contextFor = (role: string | undefined, cls: unknown) =>
  ({
    switchToHttp: () => ({
      getRequest: () => ({ user: role ? { id: 'u1', role } : undefined }),
    }),
    getHandler: () => function handler() {},
    getClass: () => cls,
  }) as unknown as ExecutionContext;

describe('AdminController authorization', () => {
  /**
   * RolesGuard returns TRUE when no @Roles metadata is present
   * (auth/guard/roles.guard.ts). A new admin controller that forgets the
   * decorator is therefore wide open to every logged-in student — a failure
   * that looks like working code. This test is the tripwire.
   */
  it('declares @Roles(ADMIN) at class level', () => {
    const reflector = new Reflector();
    const roles = reflector.get<Role[]>(ROLES_KEY, AdminController);

    expect(roles).toBeDefined();
    expect(roles).toContain(Role.ADMIN);
  });

  describe('RolesGuard against this controller', () => {
    let guard: RolesGuard;

    beforeEach(() => {
      guard = new RolesGuard(new Reflector());
    });

    it('admits an ADMIN', () => {
      expect(guard.canActivate(contextFor('ADMIN', AdminController))).toBe(
        true,
      );
    });

    it.each(['STUDENT', 'INSTRUCTOR'])('refuses a %s', (role) => {
      expect(guard.canActivate(contextFor(role, AdminController))).toBe(false);
    });

    it('refuses a request with no role at all', () => {
      expect(guard.canActivate(contextFor(undefined, AdminController))).toBe(
        false,
      );
    });
  });
});
