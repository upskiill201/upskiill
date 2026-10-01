export interface SendEmailInput {
  to: string;
  from: string;
  subject: string;
  html: string;
}

export type SendEmailErrorKind = 'TRANSIENT' | 'PERMANENT';

export class SendEmailError extends Error {
  constructor(
    message: string,
    public readonly kind: SendEmailErrorKind,
  ) {
    super(message);
    this.name = 'SendEmailError';
  }
}

export interface SendEmailResult {
  providerMessageId: string;
}

/** Everything above this line is Resend-agnostic. Swap the implementation,
 *  not the call sites — see docs/email-system.md §Adding a new channel. */
export const EMAIL_PROVIDER = Symbol('EMAIL_PROVIDER');

export interface EmailProvider {
  send(input: SendEmailInput): Promise<SendEmailResult>;
}
