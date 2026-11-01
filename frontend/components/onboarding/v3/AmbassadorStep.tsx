'use client';

/**
 * Onboarding → "Get Pro with friends" (founder, 2026-10-29). Reached only
 * from the paywall's last door, after they chose the free way in. They're an
 * ambassador already; this screen hands them their link and says plainly how
 * Pro is earned and kept. Continuing drops them into the normal free app —
 * inviting can wait, and the rail widget keeps the progress in view.
 */

import React from 'react';
import useSWR from 'swr';
import { Art } from '@/components/art/Art';
import { Btn, Footer, Screen } from '@/components/kit/Kit';
import { InviteShare } from '@/components/ambassador/AmbassadorParts';
import styles from '@/components/ambassador/Ambassador.module.css';
import { fetcher } from '@/lib/swr';
import { AMBASSADOR_ME_KEY, type AmbassadorMe } from '@/lib/ambassador';

export function AmbassadorStep(props: { direction: 1 | -1; name?: string; onDone: () => void }) {
  const { data, error, mutate } = useSWR<AmbassadorMe>(AMBASSADOR_ME_KEY, fetcher);

  return (
    <Screen
      stepKey="ambassador"
      direction={props.direction}
      footer={
        <Footer>
          <Btn variant="green" onClick={props.onDone}>
            Start learning
          </Btn>
        </Footer>
      }
    >
      <div className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-4 pt-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <Art name="friends" size={96} />
          <h1 className="m-0 text-[26px] font-extrabold leading-tight text-[var(--color-ink)]">
            {props.name ? `You're an ambassador, ${props.name}` : "You're an ambassador"}
          </h1>
          <p className={styles.lead}>
            {data
              ? `Invite ${data.rules.friendsForPro} friends. Once each has finished ${data.rules.qualifyLessons} lessons and reached a ${data.rules.qualifyStreak}-day streak, you get Teyro Pro, and you keep it while they keep learning.`
              : 'Invite friends. While they keep learning, you keep Teyro Pro.'}
          </p>
        </div>

        {data ? (
          <InviteShare me={data} />
        ) : error ? (
          <p className={styles.error} role="alert">
            Your link didn&apos;t load.{' '}
            <button type="button" className={styles.linkBtn} onClick={() => void mutate()}>
              Try again
            </button>{' '}
            You can also find it later under Pro with friends.
          </p>
        ) : (
          <span className={styles.skel} style={{ height: 96 }} aria-busy="true" />
        )}

        <p className={`${styles.sub} text-center`}>
          No rush. Learn for free in the meantime: your progress toward Pro is always on your home screen.
        </p>
      </div>
    </Screen>
  );
}
