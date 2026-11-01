import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 4 — free. Mining your life for skills: a step-by-step method. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Mining your life for skills',
  summary: 'Miracle gives Clinton a method she uses with every new hire who says "I haven\'t done anything": walk through your week, find the problems you solved, and name the skill behind each one.',
  minutes: 12,
  outcomes: ['Walk through your life to find hidden skills', 'Turn an everyday activity into a skill', 'Find at least five skills of your own'],
  learn: [
    {
      kind: 'steps',
      title: 'Four steps to find your skills',
      steps: [
        { title: '1. List the places you spend time', body: 'Not just school. Home, family business, church or mosque, sport, clubs, group chats, side hustles, caring for younger siblings or an older relative. Clinton\'s list: lectures, the tech meet-up, football, the department WhatsApp group, Saturdays at his aunt\'s phone-repair stall.' },
        { title: '2. In each place, what do you actually do?', body: 'Write verbs, not titles. At his aunt\'s stall, Clinton doesn\'t "help out". He greets customers, works out what\'s wrong with their phone, quotes a price and handles the ones who complain.' },
        { title: '3. What problem did you solve?', body: 'Skills show up when something goes wrong. A customer shouts that the repair cost too much. Clinton calms him down, explains the parts, and he comes back next week. That\'s a real problem, solved.' },
        { title: '4. Name the skill', body: 'Turn the problem into a skill an employer recognises. Calming the customer and explaining the price: customer service, handling conflict, explaining technical things simply. Three skills from one Saturday.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Ask: "What went wrong, and what did I do about it?" Every answer is a skill with a story attached, and stories are what interviewers remember.',
    },
  ],
  apply: {
    scenario: 'Clinton mines his own week.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s four steps in order.',
        lines: ['List the places you spend time', 'Write what you actually do there', 'Find the problems you solved', 'Name the skill behind each one'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment at the phone stall to the skill it shows.',
        pairs: [
          ['Calming an angry customer', 'Handling conflict'],
          ['Explaining a repair in simple words', 'Explaining technical things clearly'],
          ['Working out what\'s wrong with a phone', 'Problem-solving'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why write verbs instead of titles in step 2?',
        options: [
          { text: 'Titles are rude', why: 'Not rude, just vague. "Helper" hides what you really did.' },
          { text: 'Verbs show what you actually do, which is where the skills are' },
          { text: 'Verbs are shorter', why: 'Length isn\'t the point. Verbs reveal the skills.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which skill does each example show?',
        groups: ['Organising', 'Communication', 'Caring and patience'],
        items: [
          { text: 'Planning the meet-up schedule for a whole term', group: 0 },
          { text: 'Writing the weekly update for 300 students', group: 1 },
          { text: 'Helping his younger cousin with homework every evening', group: 2 },
          { text: 'Booking a room and speakers for 40 people', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I just help my aunt at her phone stall on Saturdays. That doesn\'t count, right?',
        options: [
          { text: 'Only if she pays you.', why: 'Paid or not, the skills are real.' },
          { text: 'Leave it out, it sounds small.', why: 'It sounds small until you name what you do there.' },
          { text: 'It counts. You deal with customers, diagnose problems and handle complaints. That\'s three skills.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that\'s a title, not a verb.',
        lines: ['I greet customers and find out what they need.', 'I\'m a helper at my aunt\'s stall.', 'I quote prices and explain the parts.'],
        bug: 1,
        fix: 'I diagnose phone problems and explain repairs to customers.',
        explanation: '"Helper" hides everything Clinton actually does. The other lines show it.',
      },
      {
        kind: 'mcq',
        prompt: 'In step 3, where do skills show up most clearly?',
        options: [
          { text: 'When everything goes smoothly', why: 'Smooth days hide your skills. Problems reveal them.' },
          { text: 'When something goes wrong and you fix it' },
          { text: 'When someone gives you a certificate', why: 'Certificates help, but skills show in what you do when things go wrong.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s question.',
        template: 'What went [[1]], and what did I [[2]] about it?',
        blanks: [['wrong'], ['do']],
        distractors: ['right', 'say', 'pay'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In step 2, write what you do as action words, also called ___. (one word)',
        answers: ['verbs', 'verb'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Places to mine for skills, or not useful?',
        groups: ['Worth mining', 'Not useful'],
        items: [
          { text: 'The family business', group: 0 },
          { text: 'A sports team', group: 0 },
          { text: 'Caring for a grandparent', group: 0 },
          { text: 'Nowhere outside a job', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Do the four steps for one place in your life. What do you do there, what went wrong once, and what skill did fixing it show?',
    starters: ['In ___, I...', 'Once, ___ went wrong, so I...', 'That shows I can...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Do all four steps for three places in your life. Aim for at least five skills, each with a moment that proves it. Keep the list: it\'s the first piece of your career kit.',
  },
  notes: 'Method adapted from common careers-service skills audits (activities → actions → problems → skills); the "problem solved" framing prepares STAR (l08) and CV achievement bullets (Ch3).',
};

export default lesson;
