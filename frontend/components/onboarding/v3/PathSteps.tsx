'use client';

/**
 * Easing into the first lesson, Duolingo's way: choose where to start ("New
 * to Python?" or "Already know some?"), then Tey introduces what happens
 * next, then the lesson or the placement test.
 */

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Art } from '@/components/art/Art';
import type { CatalogCourse } from '@/lib/onboarding/v3/catalog';
import type { LessonPath } from '@/lib/onboarding/v3/flow';
import { Choice, ChoiceGroup, Hero, TeyHero, kitCss as css } from './ui/Kit';

const TEY = (pose: string) => `/User onbarding Assets/tey/${pose}.webp`;

/** About how long the taste takes: the first card plus a few questions. */
export const TASTE_QUESTIONS = 3;
export const TASTE_MINUTES = 3;

export function PathStep(props: {
  course: CatalogCourse;
  topic: string;
  experience?: string;
  selected?: LessonPath;
  /** Picked "Already know some" (also true when that leads to lesson 1). */
  knowsSome?: boolean;
  onPick: (path: LessonPath, knowsSome: boolean) => void;
}) {
  const knows = props.experience === 'some' || props.experience === 'lots';
  return (
    <ChoiceGroup label="Where do you want to start?">
      <Choice
        index={0}
        className={css.pathCard}
        selected={props.selected === 'start' && !props.knowsSome}
        onSelect={() => props.onPick('start', false)}
        badge={!knows ? 'Recommended for you' : undefined}
        label={`New to ${props.topic}?`}
        sub={`Start with the basics. Try lesson 1, about ${TASTE_MINUTES} minutes.`}
        media={
          <span className={css.pathTey}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={TEY('waving')} alt="" />
          </span>
        }
      />
      <Choice
        index={1}
        className={css.pathCard}
        selected={!!props.selected && !!props.knowsSome}
        onSelect={() => props.onPick(props.course.placement ? 'placement' : 'start', true)}
        badge={knows && props.course.placement ? 'Recommended for you' : undefined}
        label={`Already know some ${props.topic}?`}
        sub={
          props.course.placement
            ? 'Take a short placement test and skip what you know.'
            : props.course.isOriginal
              ? 'Lesson 1 is a quick warm-up, then jump ahead chapter by chapter in the app.'
              : 'Lesson 1 is a quick warm-up, then go at your own pace.'
        }
        media={
          <span className={css.pathTey}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={TEY('thinking')} alt="" />
            <span className={css.pathHat}>
              <Art name="mortarboard" size={52} />
            </span>
          </span>
        }
      />
    </ChoiceGroup>
  );
}

/** "Your first lesson!": Tey, the lesson card, what to expect. */
export function LessonIntroStep(props: { course: CatalogCourse; name?: string }) {
  const reduce = useReducedMotion();
  const c = props.course;
  return (
    <div className="flex flex-col items-center gap-6 pt-2">
      <TeyHero
        teySrc={TEY('cheering')}
        size={150}
        text={props.name ? `${props.name}, here's your first lesson! Mistakes are free, so go for it.` : "Here's your first lesson! Mistakes are free, so go for it."}
      />
      <motion.div
        className="w-full flex items-center gap-4 rounded-[20px] border-2 border-[var(--border)] p-3"
        style={{ boxShadow: '0 4px 0 var(--border)' }}
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className={css.cover} style={{ width: 72, height: 72 }}>
          {c.thumbnailUrl && <Image src={c.thumbnailUrl} alt="" fill sizes="72px" className="object-cover" />}
        </span>
        <span className="min-w-0">
          <span className="block text-[12px] font-extrabold uppercase tracking-wider text-[var(--color-brand)]">{c.title}</span>
          <span className="block mt-0.5 text-[18px] leading-tight font-extrabold text-[var(--color-ink)]">Lesson 1: {c.firstLesson.title}</span>
        </span>
      </motion.div>
      <motion.ul
        className={css.chips}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
      >
        <li className={css.chip}>
          <Art name="clock" size={26} /> About {TASTE_MINUTES} min
        </li>
        <li className={css.chip}>
          <Art name="target" size={26} /> {TASTE_QUESTIONS} quick questions
        </li>
      </motion.ul>
    </div>
  );
}

/** "Take a test to jump ahead!" */
export function PlacementIntroStep(props: { course: CatalogCourse; topic: string }) {
  const questions = Math.max(3, (props.course.chapters - 1) * 3);
  const minutes = Math.max(2, Math.ceil(questions / 3));
  return (
    <Hero
      art={
        <span className="relative inline-block">
          <TeyHero teySrc={TEY('thinking')} size={160} />
          <span className="absolute" style={{ top: 2, left: 46, transform: 'rotate(-10deg)' }}>
            <Art name="mortarboard" size={76} />
          </span>
        </span>
      }
      title="Take a test to jump ahead!"
      body={`Up to ${minutes} minutes. It gets to know what you know about ${props.topic} and stops as soon as it finds your level.`}
    />
  );
}

/** After the taste: a real win, and the rest of lesson 1 waiting. */
export function TasteDoneStep(props: { right: number; questions: number; bestCombo: number; name?: string }) {
  const perfect = props.questions > 0 && props.right === props.questions;
  return (
    <Hero
      art={<TeyHero teySrc={TEY('cheering')} size={170} />}
      title={perfect ? 'Perfect start!' : "You're off to a great start!"}
      body={
        props.name
          ? `Lesson 1 is under way, ${props.name}. The rest of it is waiting for you.`
          : 'Lesson 1 is under way. The rest of it is waiting for you.'
      }
    >
      <ul className={css.chips}>
        <li className={css.chip}>
          <Art name="target" size={26} /> {props.right} of {props.questions} right
        </li>
        {props.bestCombo >= 2 && (
          <li className={css.chip}>
            <Art name="pace20" size={26} /> {props.bestCombo} in a row
          </li>
        )}
      </ul>
    </Hero>
  );
}
