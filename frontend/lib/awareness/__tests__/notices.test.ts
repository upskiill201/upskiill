import { _resetNotices, currentNotice, dismissNotice, notify, type Notice } from '../notices';

const n = (id: string, over: Partial<Notice> = {}): Notice => ({ id, tone: 'info', icon: 'league', title: id, ...over });

beforeEach(() => _resetNotices());

describe('notices', () => {
  it('shows one at a time, in order', () => {
    notify(n('a', { icon: 'chest' }));
    notify(n('b', { icon: 'league' }));
    expect(currentNotice()?.id).toBe('a');
    dismissNotice();
    expect(currentNotice()?.id).toBe('b');
    dismissNotice();
    expect(currentNotice()).toBeNull();
  });

  it('never shows the same event twice in a session', () => {
    notify(n('a'));
    dismissNotice();
    notify(n('a'));
    expect(currentNotice()).toBeNull();
  });

  it('keeps only the latest waiting notice of a kind', () => {
    notify(n('showing', { icon: 'chest' }));
    notify(n('passed-1'));
    notify(n('passed-2'));
    dismissNotice();
    expect(currentNotice()?.id).toBe('passed-2');
    dismissNotice();
    expect(currentNotice()).toBeNull();
  });
});
