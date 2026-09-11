/**
 * The seam between OTP business logic and "however we actually deliver a
 * code over WhatsApp today."
 *
 * `WhatsappService` owns rate limiting, hashing, and storage regardless of
 * provider; only the delivery step branches on `WHATSAPP_PROVIDER`. Keeping
 * that branch behind this interface is what makes a future Baileys removal a
 * delete-the-old-branch change instead of a rewrite.
 */
export interface OtpDeliveryProvider {
  /** Sends the OTP over WhatsApp. Throws on failure — never resolves silently. */
  sendOtpMessage(phone: string, code: string): Promise<void>;
}
