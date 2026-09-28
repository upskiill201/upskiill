import { IsObject, IsOptional } from 'class-validator';

/** Body of POST /auth/become-creator. */
export class BecomeCreatorDto {
  // Creator onboarding answers (version 2 shape) — validated field by field
  // in ProfileService.hydrateFromOnboarding, never trusted wholesale.
  @IsOptional()
  @IsObject()
  onboarding?: Record<string, unknown>;
}
