import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Chat with Tey: swap the habit, not the feeling. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: 'Swap the habit, not the feeling',
  summary: 'Kofi can\'t stop feeling bored or stressed. Nobody can. But he can change what he does next. Tey explains the habit loop, and how to swap the middle part.',
  minutes: 11,
  outcomes: [
    'Describe the habit loop: cue, routine, reward',
    'Swap the routine while keeping the reward',
    'Make the new routine easy to start',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Habits have three parts. A cue: something that sets it off. A routine: what you do. A reward: what you get. Kofi\'s: cue, bored in bed after 10. Routine, scroll shops and buy. Reward, a little lift.', replies: ['So remove the cue?'] },
        { tey: 'Sometimes you can: phone across the room removes part of it. But boredom will still come. Feelings aren\'t the enemy. So the trick is to keep the cue and the reward, and swap the routine.', replies: ['Swap it for what?'] },
        { tey: 'Something that gives a similar reward. Bored wants stimulation: make a beat, read a manga chapter, message someone funny. Stressed wants relief: a short walk, ten minutes of the task, a shower. Lonely wants connection: a person, not a shop.', replies: ['What if I forget in the moment?'] },
        { tey: 'Make the new routine easier than the old one. Speaker and headphones on the pillow. A book by the bed. Efua\'s chat pinned to the top. The old routine needs your phone across the room, so it\'s harder.', replies: ['Will it work straight away?'] },
        { tey: 'Not perfectly. Some nights the old routine will win. Count the wins: Kofi\'s log shows late-night urges falling from 7 to 2 a week. That\'s the swap working.', replies: ['Can I write it as a rule?'] },
        { tey: 'Yes, as an if-then: "If I\'m bored in bed after 10, then I make a beat for 20 minutes." Plans written like that are much more likely to happen (Gollwitzer, 1999).' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Keep the cue and the reward; swap the routine. Write it as "If..., then I...", and make the new routine easier to start than the old one.',
    },
  ],
  apply: {
    scenario: 'Swapping Kofi\'s routine.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the habit loop to Kofi\'s example.',
        pairs: [
          ['Cue', 'Bored in bed after 10'],
          ['Routine', 'Scroll shops and buy'],
          ['Reward', 'A little lift'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which part of the loop does Tey suggest swapping?',
        options: [
          { text: 'The routine' },
          { text: 'The reward', why: 'Keep the reward. You still need the lift, just from somewhere else.' },
          { text: 'The cue', why: 'Feelings like boredom will still come.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which new routine fits which cue?',
        groups: ['Bored', 'Stressed', 'Lonely'],
        items: [
          { text: 'Make a beat for 20 minutes', group: 0 },
          { text: 'A short walk', group: 1 },
          { text: 'Voice note to a friend', group: 2 },
          { text: 'Ten minutes of the task you\'re worried about', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'An if-then plan.',
        template: '"[[1]] I\'m bored in bed after 10, [[2]] I make a beat for 20 minutes."',
        blanks: [['If'], ['then']],
        distractors: ['Never', 'maybe'],
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Last night the old routine won. I bought a phone case. The swap doesn\'t work.',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'You\'re right, give up.', why: 'Habits change gradually.' },
          { text: 'Delete your phone.', why: 'Overreaction. The swap is working most nights.' },
          { text: 'One night out of seven. Last month it was seven out of seven. Count the wins, and tonight, try again.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Which set-up makes the new routine harder than the old one?',
        lines: [
          'Phone charging by the door after 10.',
          'Speaker and headphones in a box under the bed.',
          'Efua\'s chat pinned to the top.',
        ],
        bug: 1,
        fix: 'Speaker and headphones on the pillow, ready.',
        explanation: 'If the new routine takes more effort than scrolling, scrolling wins.',
      },
      {
        kind: 'mcq',
        prompt: 'Why write the plan as "if..., then..."?',
        options: [
          { text: 'It sounds clever', why: 'It works because of how it links cue and action.' },
          { text: 'Plans tied to a specific situation are much more likely to happen' },
          { text: 'No real reason', why: 'Research on implementation intentions supports it.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Late-night urges fell from 7 a week to 2. How many fewer is that each week?',
        answers: ['5', 'five'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Order how to swap a habit.',
        lines: ['Name the cue', 'Name the reward you want', 'Pick a new routine with a similar reward', 'Make it easy to start', 'Write it as if-then'],
      },
      {
        kind: 'mcq',
        prompt: 'Why keep the reward?',
        options: [
          { text: 'The need is real; the new routine has to meet it or the old one comes back' },
          { text: 'Rewards are always good', why: 'It\'s about meeting the need behind the habit.' },
          { text: 'You shouldn\'t keep it', why: 'Without a reward, the new routine won\'t stick.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Write one if-then plan for your biggest trigger. What will you make easier to start?',
    starters: ['If I..., then I...', 'I\'ll make it easier by...'],
  },
  deepen: {
    title: 'Habits and context',
    summary: 'Research by Wendy Wood and others suggests that most habits are triggered by context: a place, a time, a feeling. Changing the context, as Kofi did with his phone, is one of the most reliable ways to change a habit.',
  },
  notes: 'Habit loop (cue–routine–reward): popularised by Duhigg (2012), grounded in habit research (Wood & Neal 2007; Wood 2019 Good Habits, Bad Habits). Gollwitzer, P. M. (1999). Implementation intentions. American Psychologist, 54(7), 493–503.',
};

export default lesson;
