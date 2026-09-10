'use client';

import React from 'react';
import { BarChart3, Check } from 'lucide-react';
import type { CommunityPost } from '@/lib/communityApi';
import { votePoll } from '@/lib/communityApi';
import styles from './PollBlock.module.css';

interface PollBlockProps {
  post: Pick<CommunityPost, 'id' | 'poll'>;
  /** Voting mutates local state; the parent re-renders via key change if needed. */
  onChanged?: () => void;
}

export default function PollBlock({ post, onChanged }: PollBlockProps) {
  const [options, setOptions] = React.useState(post.poll?.options ?? []);
  const [myOptionId, setMyOptionId] = React.useState<string | null>(post.poll?.myOptionId ?? null);
  const [busyOption, setBusyOption] = React.useState<string | null>(null);
  const [error, setError] = React.useState('');

  // Sync when the underlying post changes (e.g. after a refetch)
  React.useEffect(() => {
    setOptions(post.poll?.options ?? []);
    setMyOptionId(post.poll?.myOptionId ?? null);
  }, [post.poll?.myOptionId, post.poll?.options]);

  const totalVotes = options.reduce((sum, o) => sum + o.voteCount, 0);

  const handleVote = async (optionId: string) => {
    setError('');
    setBusyOption(optionId);
    try {
      const res = await votePoll(post.id, optionId);
      setOptions(res.options);
      setMyOptionId(res.votedOptionId);
      onChanged?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not record your vote.');
    } finally {
      setBusyOption(null);
    }
  };

  if (!post.poll) return null;

  // Before voting: clean choice buttons. After: results with % bars.
  if (!myOptionId) {
    return (
      <div className={styles.wrap}>
        {options.map((o) => (
          <button
            key={o.id}
            className={styles.optionBtn}
            disabled={busyOption !== null}
            onClick={() => handleVote(o.id)}
          >
            {busyOption === o.id ? 'Voting…' : o.text}
          </button>
        ))}
        <span className={styles.meta}>
          <BarChart3 size={13} /> {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'}
        </span>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      {options.map((o) => {
        const pct = totalVotes > 0 ? Math.round((o.voteCount / totalVotes) * 100) : 0;
        const mine = o.id === myOptionId;
        return (
          <button
            key={o.id}
            className={`${styles.resultRow} ${mine ? styles.resultMine : ''}`}
            disabled
          >
            <span className={styles.resultBar} style={{ width: `${pct}%` }} />
            <span className={styles.resultLabel}>
              {mine && <Check size={14} color="var(--brand-blue)" />} {o.text}
            </span>
            <span className={styles.resultPct}>{pct}%</span>
          </button>
        );
      })}
      <span className={styles.meta}>
        <BarChart3 size={13} /> {totalVotes} {totalVotes === 1 ? 'vote' : 'votes'} · you voted
      </span>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
