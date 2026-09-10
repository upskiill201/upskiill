import type { TeyContext } from '../../contracts/tey-context.types';

export interface TeyMessage {
  title: string;
  body: string;
  deepLink: string;
  /** Collapses repeats of the same reason on the device. */
  tag: string;
  /**
   * The ledger row this message belongs to. Carried on the message rather than
   * derived by the channel, because the id only exists once the delivery row is
   * written — and the deep link embeds it for open attribution.
   */
  deliveryId: string;
}

export interface TeyChannelResult {
  status: 'SENT' | 'FAILED' | 'NO_TARGET';
  providerMessageId?: string;
  error?: string;
}

export type TeyChannelId = 'PUSH' | 'INAPP' | 'WHATSAPP';

/**
 * One delivery channel.
 *
 * This interface is the seam the spec asks for (section 34): WhatsApp, and
 * later a native FCM channel, plug in here without anything above them
 * changing. Note it takes a TeyContext as well as the rendered message —
 * channels differ in what they can express (WhatsApp has buttons, push has a
 * tag), and the context is what lets each decide.
 */
export interface TeyChannel {
  readonly id: TeyChannelId;
  /** Cheap check: does this learner have a usable target on this channel? */
  isAvailableFor(userId: string): Promise<boolean>;
  send(
    userId: string,
    message: TeyMessage,
    ctx: TeyContext,
  ): Promise<TeyChannelResult>;
}
