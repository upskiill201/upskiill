import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 9 — second opinions: ask again, differently. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Second opinions: ask again, differently',
  summary: 'If an answer matters, don\'t just accept the first one. Ask again in a new way and compare. Where answers disagree, that\'s where to check.',
  minutes: 12,
  outcomes: [
    'Get a second opinion from AI in four ways',
    'Compare answers to find weak spots',
    'Know that agreement between AI answers is not proof',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Four ways to get a second opinion',
      steps: [
        { title: '1. Start a new chat', body: 'Ask the same question fresh, without the earlier conversation steering it.' },
        { title: '2. Flip the question', body: 'Instead of "Why is Ghana a good market?", ask "What are the risks of launching in Ghana?"' },
        { title: '3. Ask it to critique itself', body: '"Here is an answer. What might be wrong or missing?"' },
        { title: '4. Try another tool', body: 'A different AI assistant may have learned from different data and catch different things.' },
        { title: 'Then compare', body: 'Where the answers disagree, check that point with a real source. Where they agree, you still check anything important: they can share the same mistake.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Disagreement between answers shows you where to check. Agreement is not proof.',
    },
  ],
  apply: {
    scenario: 'Ada wants a second opinion on the Ghana fee estimate.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the steps for a second opinion.',
        lines: ['Start a new chat', 'Flip the question', 'Ask it to critique itself', 'Compare and check differences'],
      },
      {
        kind: 'mcq',
        prompt: 'Why start a new chat?',
        options: [
          { text: 'So the earlier conversation doesn\'t steer the answer' },
          { text: 'Because old chats are deleted', why: 'It\'s about a fresh start.' },
          { text: 'To make it faster', why: 'It\'s about independence.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Flip the question: which is the flipped version?',
        groups: ['Original', 'Flipped'],
        items: [
          { text: 'Why is Ghana a good market?', group: 0 },
          { text: 'What are the risks of launching in Ghana?', group: 1 },
          { text: 'Why will users love our app?', group: 0 },
          { text: 'Why might users not switch to our app?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Two AI tools both said fees are 1%. So that\'s confirmed, right?',
        prompt: 'What should Ada say?',
        options: [
          { text: 'Not yet. They might share the same old data. Let\'s check the provider\'s page.' },
          { text: 'Yes, two tools agree.', why: 'Agreement isn\'t proof.' },
          { text: 'Ask a third tool and go with the majority.', why: 'Voting doesn\'t replace a source.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the tip.',
        template: '[[1]] shows you where to check. [[2]] is not proof.',
        blanks: [['Disagreement'], ['Agreement']],
        distractors: ['Silence', 'Length'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Ada\'s self-critique request.',
        tiles: ['What', 'might', 'be', 'wrong', 'or', 'missing?'],
        distractors: ['perfect'],
      },
      {
        kind: 'findBug',
        prompt: 'Which point should Ada check first?',
        lines: [
          'Answer A: launch cost about $40,000. Answer B: about $40,000.',
          'Answer A: needs a local licence. Answer B: no licence needed.',
          'Answer A: Accra first. Answer B: Accra first.',
          'Answer A: 6 months. Answer B: 6 months.',
        ],
        bug: 1,
        fix: 'Check the licensing rules with the regulator or a lawyer.',
        explanation: 'The answers disagree, and it\'s a high-stakes point.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the method to what it catches.',
        pairs: [
          ['New chat', 'Answers steered by earlier talk'],
          ['Flip the question', 'One-sided answers'],
          ['Self-critique', 'Gaps and weak points'],
          ['Another tool', 'Blind spots of one model'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which self-critique request is best?',
        options: [
          { text: 'Is this good?', why: 'Invites "yes".' },
          { text: 'Act as a sceptical reviewer. List the three weakest claims in this answer and what evidence would settle each.' },
          { text: 'Rewrite it nicer.', why: 'Changes style, not accuracy.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Worth a second opinion?',
        groups: ['Worth it', 'Not needed'],
        items: [
          { text: 'A licensing rule for a launch', group: 0 },
          { text: 'A friendlier way to say "thanks"', group: 1 },
          { text: 'A cost estimate for the CEO', group: 0 },
          { text: 'A subject line for a team update', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Two AI answers agree. Is that proof? (yes or no)',
        answers: ['no'],
        placeholder: 'Yes or no',
      },
      {
        kind: 'mcq',
        prompt: 'What should Ada do where two answers agree on something important?',
        options: [
          { text: 'Still check it with a real source' },
          { text: 'Trust it completely', why: 'They may share the same mistake.' },
          { text: 'Ignore it', why: 'Check it instead.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What decision at work would have benefited from a flipped question?',
    starters: ['The decision was...', 'The flipped question:'],
  },
  deepen: { title: 'Try it today', summary: 'Take an important AI answer and ask, in a new chat, "What are the risks of this?" Compare.' },
  notes: 'General good practice. All figures fictional; licensing claims are illustrative, not legal advice.',
};

export default lesson;
