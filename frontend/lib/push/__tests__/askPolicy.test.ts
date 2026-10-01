import { decideInAppAsk, type AskContext, type AskLedger } from '../askPolicy';

const NOW = new Date('2026-09-25T12:00:00Z');
const hoursAgo = (h: number) => new Date(NOW.getTime() - h * 3_600_000).toISOString();

const base: AskContext = {
  now: NOW,
  permission: 'default',
  subscribed: false,
  standalone: true,
  installable: false,
  needsInstall: false,
};
const empty: AskLedger = { asks: [] };

describe('decideInAppAsk', () => {
  it('asks to enable in the installed app when nothing was asked yet', () => {
    expect(decideInAppAsk(empty, base)).toEqual({ ask: true, kind: 'enable' });
  });

  it('asks to install first in a tab that can install', () => {
    expect(decideInAppAsk(empty, { ...base, standalone: false, installable: true })).toEqual({
      ask: true,
      kind: 'install',
    });
  });

  it('never asks once reminders are on, or blocked', () => {
    expect(decideInAppAsk(empty, { ...base, permission: 'granted', subscribed: true }).ask).toBe(false);
    expect(decideInAppAsk(empty, { ...base, permission: 'denied' }).ask).toBe(false);
  });

  it('re-asks when permission was granted but the subscription never landed', () => {
    expect(decideInAppAsk(empty, { ...base, permission: 'granted', subscribed: false })).toEqual({
      ask: true,
      kind: 'enable',
    });
  });

  it('does not ask an iPhone tab that cannot install for permission it cannot use', () => {
    expect(decideInAppAsk(empty, { ...base, standalone: false, needsInstall: true }).ask).toBe(false);
  });

  it('waits after the onboarding ask', () => {
    const ledger: AskLedger = { asks: [{ at: hoursAgo(2), kind: 'enable', where: 'onboarding' }] };
    expect(decideInAppAsk(ledger, base)).toEqual({ ask: false, reason: 'too-soon' });
    const later: AskLedger = { asks: [{ at: hoursAgo(21), kind: 'enable', where: 'onboarding' }] };
    expect(decideInAppAsk(later, base).ask).toBe(true);
  });

  it('spaces the two in-app asks by days, then stops for good', () => {
    const one: AskLedger = { asks: [{ at: hoursAgo(30), kind: 'enable', where: 'in-app' }] };
    expect(decideInAppAsk(one, base).ask).toBe(false);
    const oneOld: AskLedger = { asks: [{ at: hoursAgo(80), kind: 'enable', where: 'in-app' }] };
    expect(decideInAppAsk(oneOld, base).ask).toBe(true);
    const two: AskLedger = {
      asks: [
        { at: hoursAgo(200), kind: 'enable', where: 'in-app' },
        { at: hoursAgo(100), kind: 'enable', where: 'in-app' },
      ],
    };
    expect(decideInAppAsk(two, base)).toEqual({ ask: false, reason: 'budget-spent' });
  });

  it('asks straight away in the installed app after an install ask', () => {
    const ledger: AskLedger = { asks: [{ at: hoursAgo(1), kind: 'install', where: 'onboarding' }] };
    expect(decideInAppAsk(ledger, base)).toEqual({ ask: true, kind: 'enable' });
  });
});
