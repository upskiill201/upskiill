import { Transform } from 'class-transformer';

/**
 * Trims and lowercases an email before validation. Login already lowercased,
 * but signup and verification stored and looked up whatever case was typed,
 * so "Ada@x.com" signed up and then couldn't log in as "ada@x.com".
 */
export function NormalizeEmail(): PropertyDecorator {
  return Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  );
}
