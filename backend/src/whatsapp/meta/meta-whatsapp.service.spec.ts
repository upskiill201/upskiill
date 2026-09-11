import { MetaWhatsAppService } from './meta-whatsapp.service';
import { MetaWhatsAppError } from './meta-whatsapp.types';

describe('MetaWhatsAppService', () => {
  let service: MetaWhatsAppService;
  const PHONE = '+237671405008';

  const withEnv = (
    env: Record<string, string | undefined>,
    fn: () => Promise<void> | void,
  ) => {
    const saved = { ...process.env };
    for (const [k, v] of Object.entries(env)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
    return Promise.resolve(fn()).finally(() => {
      process.env = saved;
    });
  };

  const enabledEnv = {
    META_WHATSAPP_ENABLED: 'true',
    META_WHATSAPP_PHONE_NUMBER_ID: '1234567890',
    META_WHATSAPP_ACCESS_TOKEN: 'test-token',
  };

  const jsonResponse = (status: number, body: unknown) =>
    ({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(body),
      text: () => Promise.resolve(JSON.stringify(body)),
    }) as Response;

  beforeEach(() => {
    service = new MetaWhatsAppService();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('configuration guard', () => {
    it('throws BAD_REQUEST without calling fetch when META_WHATSAPP_ENABLED is unset', async () => {
      await withEnv({ META_WHATSAPP_ENABLED: undefined }, async () => {
        await expect(
          service.sendTemplateMessage(PHONE, 'otp_code', 'en_US', ['123456']),
        ).rejects.toMatchObject({ kind: 'BAD_REQUEST' });
        expect(global.fetch).not.toHaveBeenCalled();
      });
    });

    it('throws BAD_REQUEST when enabled but missing phone number id / token', async () => {
      await withEnv(
        { META_WHATSAPP_ENABLED: 'true', META_WHATSAPP_PHONE_NUMBER_ID: undefined },
        async () => {
          await expect(
            service.sendTemplateMessage(PHONE, 'otp_code', 'en_US', ['123456']),
          ).rejects.toMatchObject({ kind: 'BAD_REQUEST' });
          expect(global.fetch).not.toHaveBeenCalled();
        },
      );
    });
  });

  describe('sendTemplateMessage', () => {
    it('builds the correct Graph API request shape', async () => {
      (global.fetch as jest.Mock).mockResolvedValue(
        jsonResponse(200, { messages: [{ id: 'wamid.TEST123' }] }),
      );

      await withEnv(enabledEnv, async () => {
        const result = await service.sendTemplateMessage(
          PHONE,
          'otp_code',
          'en_US',
          ['482913'],
        );

        expect(result.providerMessageId).toBe('wamid.TEST123');
        const [url, init] = (global.fetch as jest.Mock).mock.calls[0];
        expect(url).toBe(
          'https://graph.facebook.com/v21.0/1234567890/messages',
        );
        expect(init.method).toBe('POST');
        expect(init.headers.Authorization).toBe('Bearer test-token');
        const body = JSON.parse(init.body);
        expect(body).toMatchObject({
          messaging_product: 'whatsapp',
          to: '237671405008', // leading '+' stripped
          type: 'template',
          template: {
            name: 'otp_code',
            language: { code: 'en_US' },
            components: [
              { type: 'body', parameters: [{ type: 'text', text: '482913' }] },
            ],
          },
        });
      });
    });

    it('respects a custom META_WHATSAPP_API_VERSION', async () => {
      (global.fetch as jest.Mock).mockResolvedValue(
        jsonResponse(200, { messages: [{ id: 'wamid.X' }] }),
      );

      await withEnv(
        { ...enabledEnv, META_WHATSAPP_API_VERSION: 'v99.0' },
        async () => {
          await service.sendTemplateMessage(PHONE, 'otp_code', 'en_US', ['1']);
          const [url] = (global.fetch as jest.Mock).mock.calls[0];
          expect(url).toContain('/v99.0/');
        },
      );
    });
  });

  describe('sendTextMessage', () => {
    it('builds a plain text payload', async () => {
      (global.fetch as jest.Mock).mockResolvedValue(
        jsonResponse(200, { messages: [{ id: 'wamid.TXT' }] }),
      );

      await withEnv(enabledEnv, async () => {
        await service.sendTextMessage(PHONE, 'Hello from Tey');
        const [, init] = (global.fetch as jest.Mock).mock.calls[0];
        const body = JSON.parse(init.body);
        expect(body).toMatchObject({
          type: 'text',
          text: { body: 'Hello from Tey' },
        });
      });
    });
  });

  describe('error classification', () => {
    it.each([
      [401, 'AUTH'],
      [403, 'AUTH'],
      [429, 'RATE_LIMIT'],
      [500, 'SERVER'],
      [503, 'SERVER'],
      [400, 'BAD_REQUEST'],
    ])('classifies HTTP %d as %s', async (status, kind) => {
      (global.fetch as jest.Mock).mockResolvedValue(
        jsonResponse(status, { error: { message: 'nope' } }),
      );

      await withEnv(enabledEnv, async () => {
        await expect(
          service.sendTemplateMessage(PHONE, 'otp_code', 'en_US', ['1']),
        ).rejects.toMatchObject({ kind });
      });
    });

    it('classifies a fetch AbortError as TIMEOUT', async () => {
      const abortError = new Error('aborted');
      abortError.name = 'AbortError';
      (global.fetch as jest.Mock).mockRejectedValue(abortError);

      await withEnv(enabledEnv, async () => {
        await expect(
          service.sendTemplateMessage(PHONE, 'otp_code', 'en_US', ['1']),
        ).rejects.toMatchObject({ kind: 'TIMEOUT' });
      });
    });

    it('throws UNKNOWN when a 2xx response is missing a message id', async () => {
      (global.fetch as jest.Mock).mockResolvedValue(jsonResponse(200, {}));

      await withEnv(enabledEnv, async () => {
        await expect(
          service.sendTemplateMessage(PHONE, 'otp_code', 'en_US', ['1']),
        ).rejects.toMatchObject({ kind: 'UNKNOWN' });
      });
    });

    it('rethrows MetaWhatsAppError instances as-is', async () => {
      (global.fetch as jest.Mock).mockResolvedValue(
        jsonResponse(500, { error: { message: 'down' } }),
      );

      await withEnv(enabledEnv, async () => {
        try {
          await service.sendTemplateMessage(PHONE, 'otp_code', 'en_US', ['1']);
          fail('expected throw');
        } catch (err) {
          expect(err).toBeInstanceOf(MetaWhatsAppError);
        }
      });
    });
  });
});
