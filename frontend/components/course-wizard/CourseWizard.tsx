'use client';

/**
 * /creator/create — start a course in five quick steps, Tey leading, the
 * same look as creator onboarding. It's personalised from what the creator
 * told us in onboarding (their track and topics are picked already), and it
 * ends inside the course workspace, optionally with a starter outline so the
 * first screen isn't empty.
 *
 *   1 track + topic   2 level   3 title   4 outline or blank   5 creating…
 */

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';
import { OnboardingFooter } from '@/components/onboarding/OnboardingFooter';
import CreatorTrackScreen from '@/components/creator-onboarding/screens/CreatorTrackScreen';
import CreatorQuestion from '@/components/creator-onboarding/screens/CreatorQuestion';
import { CREATOR_TRACKS, isCreatorTrack, type CreatorTrack } from '@/lib/creator/categories';
import { POSE_FAMILY, type Beat } from '@/lib/onboarding/dialogue/types';
import type { TeyPose } from '@/lib/onboarding/types';
import { extractErrorMessage } from '@/lib/apiError';
import { playOnboardingCue } from '@/lib/audio/onboardingAudio';
import { playSound } from '@/lib/audio/lessonSounds';
import { useStandaloneSound } from '@/lib/audio/useStandaloneSound';
import { celebrationHaptic, playHaptic } from '@/lib/haptics';
import b from '@/components/lesson-builder/Builder.module.css';

const TEY = '/User onbarding Assets/tey';
const beat = (text: string, pose: TeyPose): Beat => ({ text, pose, poseFamily: POSE_FAMILY[pose] });

type Level = 'Beginner' | 'Intermediate' | 'Advanced';
const LEVELS: { id: Level; label: string; description: string }[] = [
  { id: 'Beginner', label: 'Beginner', description: 'No experience needed. Start from zero.' },
  { id: 'Intermediate', label: 'Intermediate', description: 'For learners who know the basics.' },
  { id: 'Advanced', label: 'Advanced', description: 'For learners ready to go deep.' },
];

type Start = 'outline' | 'blank';
const START: { id: Start; label: string; description: string }[] = [
  { id: 'outline', label: 'Start with an outline', description: '3 modules with lesson titles to rename. The fastest way in.' },
  { id: 'blank', label: 'Start blank', description: 'An empty course. You add every module yourself.' },
];

/** A friendly first structure, per track. Titles are placeholders to rename. */
const OUTLINE: Record<CreatorTrack, { title: string; lessons: string[] }[]> = {
  coding: [
    { title: 'Getting started', lessons: ['What you’ll build', 'Your first lines of code'] },
    { title: 'Core ideas', lessons: ['The first big idea', 'Putting it to work'] },
    { title: 'Your first project', lessons: ['Plan the project', 'Build it step by step'] },
  ],
  ai: [
    { title: 'Getting started', lessons: ['What AI can do for you', 'Your first prompt'] },
    { title: 'Core skills', lessons: ['Writing clear prompts', 'Checking the answers'] },
    { title: 'Put it to work', lessons: ['A real task, start to finish', 'Make it a habit'] },
  ],
};

/** Topics are phrased as actions ("Build AI Agents"); titles need the thing. */
const TOPIC_NOUN: Record<string, string> = {
  'Web Development': 'Web development',
  'Mobile App Development': 'Mobile apps',
  'Programming Fundamentals': 'Programming',
  'Software Development': 'Software development',
  'Use AI Tools': 'AI tools',
  'Build AI Agents': 'AI agents',
  'Create Automations': 'AI automations',
};

function titleIdeas(track: CreatorTrack, topic: string, level: Level): string[] {
  const t = TOPIC_NOUN[topic] ?? (topic || CREATOR_TRACKS[track].label);
  const ideas =
    level === 'Beginner'
      ? [`${t} from zero`, `${t} for complete beginners`, `Your first steps in ${t}`]
      : level === 'Intermediate'
        ? [`${t}: the next level`, `Build real projects with ${t}`, `Practical ${t}`]
        : [`Advanced ${t}`, `${t} like a pro`, `Mastering ${t} in practice`];
  return ideas.map((i) => i.slice(0, 100));
}

async function call(url: string, method: string, body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(extractErrorMessage(data, res.status));
  return data;
}

export function CourseWizard() {
  const router = useRouter();
  const { muted, toggleMute } = useStandaloneSound();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState<1 | -1>(1);
  const [track, setTrack] = useState<CreatorTrack | undefined>();
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<Level | undefined>();
  const [title, setTitle] = useState('');
  const [start, setStart] = useState<Start | undefined>();
  const [favouriteTopics, setFavouriteTopics] = useState<string[]>([]);
  const [weekly, setWeekly] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [reaction, setReaction] = useState<Beat | null>(null);

  // Personalise from onboarding: track and topics already chosen.
  useEffect(() => {
    fetch('/api/profile/me', { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((me) => {
        const p = me?.profile ?? {};
        if (isCreatorTrack(p.niche)) setTrack((t) => t ?? p.niche);
        const topics = Array.isArray(p.subCategories) ? p.subCategories.filter((x: unknown) => typeof x === 'string') : [];
        setFavouriteTopics(topics);
        if (typeof p.creatorOnboarding?.weeklyHours === 'string') setWeekly(p.creatorOnboarding.weeklyHours);
      })
      .catch(() => {});
    // A track handed over in the URL (from onboarding's last screen) wins.
    const q = new URLSearchParams(window.location.search).get('track');
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one read of the URL on arrival
    if (isCreatorTrack(q)) setTrack(q);
    playSound('studioOpen');
  }, []);

  // Topics the creator said they teach come first.
  const topicOptions = useMemo(() => {
    if (!track) return [];
    const list = CREATOR_TRACKS[track].topics;
    return [...list.filter((t) => favouriteTopics.includes(t.id)), ...list.filter((t) => !favouriteTopics.includes(t.id))].map((t) => ({
      id: t.label,
      label: t.label,
      description: favouriteTopics.includes(t.id) ? `You teach this · ${t.description}` : t.description,
    }));
  }, [track, favouriteTopics]);

  const ideas = track && level ? titleIdeas(track, topic, level) : [];

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
    setReaction(null);
    setError(null);
  };

  const create = async () => {
    if (!track || !level || !start) return;
    go(5);
    try {
      const course = await call('/api/courses', 'POST', {
        title: title.trim(),
        category: CREATOR_TRACKS[track].label,
        ...(weekly ? { creatorTimeWeekly: `${weekly} hours` } : {}),
      });
      await call(`/api/courses/${course.id}`, 'PATCH', { subcategory: topic, level, description: '' });
      if (start === 'outline') {
        for (const mod of OUTLINE[track]) {
          const sec = await call(`/api/courses/${course.id}/sections`, 'POST', { title: mod.title });
          for (const l of mod.lessons) await call(`/api/courses/sections/${sec.id}/lessons`, 'POST', { title: l, lessonType: 'interactive' });
        }
      }
      playSound('studioReady');
      celebrationHaptic('win');
      router.push(`/creator/courses/${course.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'The course could not be created.');
      playSound('wrong');
      setStep(4);
    }
  };

  const lines: Record<number, Beat> = {
    1: track
      ? beat(`Let’s make ${track === 'ai' ? 'an' : 'a'} ${CREATOR_TRACKS[track].label} course! What’s it about?`, 'excited')
      : beat('Let’s make a course! What will it teach?', 'excited'),
    2: beat('Who is it for?', 'curious'),
    3: beat('Now give it a name learners will want to tap.', 'thinking'),
    4: beat('How do you want to start?', 'encouraging'),
    5: beat('Setting up your course…', 'celebrating'),
  };

  const canContinue =
    step === 1 ? Boolean(track && topic) : step === 2 ? Boolean(level) : step === 3 ? title.trim().length >= 5 : step === 4 ? Boolean(start) : false;

  const mascot = [`${TEY}/pointing.webp`, `${TEY}/thinking.webp`, `${TEY}/tablet.webp`, `${TEY}/searching.webp`, `${TEY}/cheering.webp`][step - 1];

  return (
    <OnboardingLayout
      step={step}
      total={5}
      percent={Math.round(((step - 1) / 4) * 100)}
      direction={dir}
      pose={(reaction ?? lines[step]).pose}
      mascot={mascot}
      layout={step === 5 ? 'hero' : 'row'}
      mascotSize="md"
      reactKey={reaction?.text ?? null}
      beat={lines[step]}
      onBack={() => {
        playOnboardingCue('back');
        if (step === 1) router.push('/creator/courses');
        else if (step < 5) go(step - 1);
      }}
      muted={muted}
      onToggleSound={toggleMute}
      footer={
        step < 5 ? (
          <OnboardingFooter
            onContinue={() => {
              playOnboardingCue('continue');
              playHaptic('light', false);
              if (step === 4) void create();
              else go(step + 1);
            }}
            canContinue={canContinue}
            label={step === 4 ? 'Create course' : 'Continue'}
            feedback={reaction}
            disabledReason={step === 3 ? 'The title needs at least 5 characters' : 'Choose an option to continue'}
          />
        ) : null
      }
      footerActive={Boolean(reaction)}
    >
      {step === 1 && (
        <div className="flex flex-col gap-5">
          <CreatorTrackScreen
            selected={track}
            onSelect={(t) => {
              if (t !== track) setTopic('');
              setTrack(t);
            }}
          />
          {track && (
            <CreatorQuestion
              question="topics"
              legend="Topic"
              options={topicOptions}
              selected={topic ? [topic] : []}
              onToggle={(id) => {
                setTopic(id);
                setReaction(beat(`${id}! Learners are looking for that.`, 'excited'));
              }}
            />
          )}
        </div>
      )}

      {step === 2 && (
        <CreatorQuestion
          question="level"
          legend="Level"
          options={LEVELS}
          selected={level ? [level] : []}
          onToggle={(id) => {
            setLevel(id as Level);
            setReaction(beat(id === 'Beginner' ? 'Beginner courses are the most popular on Teyro.' : 'Nice, a step up for learners who are ready.', 'encouraging'));
          }}
        />
      )}

      {step === 3 && (
        <div className="flex flex-col gap-4 md:max-w-[560px]">
          <label className="sr-only" htmlFor="course-title">
            Course title
          </label>
          <input
            id="course-title"
            autoFocus
            className={b.input}
            style={{ fontSize: 20, fontWeight: 800, padding: '14px 16px' }}
            value={title}
            maxLength={100}
            placeholder="Your course title"
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && title.trim().length >= 5) go(4);
            }}
          />
          <span className={b.hint}>Ideas to start from. Tap one, then make it yours.</span>
          <div className={b.chips}>
            {ideas.map((i) => (
              <button
                key={i}
                type="button"
                className={`${b.chip} ${title === i ? b.chipOn : ''}`}
                onClick={() => {
                  setTitle(i);
                  playSound('select');
                  playHaptic('selection', false);
                }}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-col gap-4">
          <CreatorQuestion
            question="start"
            legend="How to start"
            options={START}
            selected={start ? [start] : []}
            onToggle={(id) => setStart(id as Start)}
          />
          {error && (
            <p className={`${b.issue} ${b.issueBad}`} role="alert">
              {error}
            </p>
          )}
        </div>
      )}

      {step === 5 && <p className="text-center text-[16px] font-bold text-[var(--text-secondary)]">One moment…</p>}
    </OnboardingLayout>
  );
}

export default CourseWizard;
