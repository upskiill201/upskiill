import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 5 — Checkpoint. Reviews lessons 1–4 plus Chapter 1. */
const lesson: OriginalLesson = {
  key: 'l05',
  title: 'Checkpoint: the bus-stop test',
  summary: 'At the bus stop, a woman notices Ada\'s Tech Fest lanyard. "Oh, are you in tech? What do you do?" No mixer, no pressure. Ada tries her new intro, and the bus is late enough for a real conversation.',
  minutes: 12,
  milestone: 'CHECKPOINT',
  outcomes: ['Use the personal pitch tools without notes', 'Connect the personal pitch to Chapter 1'],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, the bus stop',
      beats: [
        { speaker: 'narrator', text: 'The woman at the bus stop: "Oh, are you in tech? What do you do?"' },
        { speaker: 'ada', text: '"I make money apps simple enough that people actually use them. I built one for my office\'s ajo; no more arguments about who paid. What about you?"' },
        { speaker: 'narrator', text: 'Woman: "An ajo app? My church women\'s group needs that! We have forty members and one very tired treasurer." The bus is twenty minutes late. They talk the whole time. She takes Ada\'s number.' },
        { speaker: 'ada', text: '(texting Arjun) A CHURCH GROUP WANTS MY APP. From a bus stop.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint: the bus stop.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the bus-stop chat turn into a real conversation?',
        options: [
          { text: 'The bus was late', why: 'Helpful, but the intro did the work.' },
          { text: 'Ada said what she does for people, gave a specific example and asked a question back' },
          { text: 'She said "I\'m just a designer"', why: 'She didn\'t, this time.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the three-line intro in order.',
        lines: ['Present', 'Past', 'Future', 'A question back'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Opens a conversation, or closes it?',
        groups: ['Opens', 'Closes'],
        items: [
          { text: '"What about you?"', group: 0 },
          { text: '"It\'s not very exciting."', group: 1 },
          { text: '"I built one for my office\'s ajo."', group: 0 },
          { text: '"Just design, really."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Quick quiz: is "I\'m passionate and hard-working" a good line?',
        prompt: 'Your answer?',
        options: [
          { text: 'Yes, it\'s perfect.', why: 'Easy to say, hard to believe.' },
          { text: 'Add more adjectives.', why: 'More of the same problem.' },
          { text: 'It\'s adjectives. A fact works better: "Ten colleagues use the app I built."' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Instead of your job title, say the ___ you solve. (one word)',
        answers: ['problem', 'problems'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why do people often enjoy a conversation where they get to talk too?',
        options: [
          { text: 'Talking about yourself tends to feel rewarding' },
          { text: 'They don\'t; they want long speeches', why: 'Usually the opposite.' },
          { text: 'Because questions are rude', why: 'Questions are how conversations start.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Someone\'s intro at the bus stop. Which line is a shrinker?',
        lines: [
          'I help new nurses settle into busy wards.',
          'It\'s only a small thing, really, nothing special.',
          'What do you do?',
        ],
        bug: 1,
        fix: 'Last year I trained twelve of them.',
        explanation: '"Only a small thing" shrinks it. Swap it for a fact.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 or Chapter 2?',
        pairs: [
          ['"I help savings groups track who\'s paid"', 'Chapter 1: the one sentence'],
          ['"Present, past, future"', 'Chapter 2: the personal pitch'],
          ['"60 seconds is about 140 words"', 'Chapter 1: timing'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'How long should Ada\'s personal intro be before she hands it back?',
        options: [
          { text: 'Five minutes', why: 'The bus would come and go.' },
          { text: 'About three short lines' },
          { text: 'One word', why: 'Too little to ask about.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Chapter 2 so far.',
        template: 'Drop the "[[1]]". Say the [[2]] you solve. Then ask a [[3]] back.',
        blanks: [['just'], ['problem'], ['question']],
        distractors: ['title', 'only'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s question back.',
        tiles: ['What', 'about', 'you?'],
        distractors: ['just'],
      },
    ],
  },
  reflect: {
    prompt: 'Try your three-line intro on someone you meet this week, even casually. What did they ask next?',
    starters: ['I said...', 'They asked...'],
  },
  deepen: {
    title: 'Every lanyard is a door',
    summary: 'Bus stops, queues, weddings, church, the gym. Anywhere someone asks "What do you do?", your intro can start something. Use it at least once this week outside work.',
  },
  notes: 'Checkpoint: reviews lessons 1–4 plus Chapter 1.',
};

export default lesson;
