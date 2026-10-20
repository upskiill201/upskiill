import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 2 · Chapter 4 · Lesson 17 — story choice: David is rejected too; how Clinton supports him. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'When it\'s your friend',
  summary: 'The Yaoundé lab says no to David\'s research internship. He calls Clinton, very quiet. Clinton has just learned everything about rejection, and he\'s dying to tell David all of it, right now.',
  minutes: 11,
  outcomes: ['Support a friend after a rejection', 'Listen before giving advice', 'Offer specific help'],
  learn: [
    {
      kind: 'story',
      title: 'The quiet call',
      beats: [
        { speaker: 'narrator', text: 'Evening. David\'s voice on the phone is very quiet.' },
        { speaker: 'david', text: 'The lab said no. They took a fourth-year student. I really thought this one was it.' },
        { speaker: 'clinton', text: '(to himself) I know exactly what to do! The 48 hours, the gracious reply, the feedback plan, the self-talk...' },
        { speaker: 'tey', text: 'Right after a no, most people want to feel heard before they want advice. Advice too early can feel like "stop being sad".' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Listen first. Ask how he\'s feeling. Offer help later, if David wants it.',
            outcome: 'David talks for twenty minutes. At the end he says, "Thanks, bro. Tomorrow, can you help me write the reply?" Now advice is welcome.',
            best: true,
          },
          {
            text: 'Give him the full five-step plan right away.',
            outcome: 'David goes quiet. "I know. I just wanted to tell someone." He feels lectured, not supported.',
          },
          {
            text: 'Say "It\'s fine, it doesn\'t matter, cheer up."',
            outcome: 'It does matter to David. He hangs up feeling unheard.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Listen first. Ask before advising. Offer specific help when they\'re ready.',
    },
  ],
  apply: {
    scenario: 'David gets rejected.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What do most people want first after a no?',
        options: [
          { text: 'To feel heard' },
          { text: 'A five-step plan', why: 'Advice too early can feel like a lecture.' },
          { text: 'To be told it doesn\'t matter', why: 'It matters to them.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Supportive or not?',
        groups: ['Supportive', 'Not supportive'],
        items: [
          { text: 'That sounds really hard. How are you feeling?', group: 0 },
          { text: 'Cheer up, it\'s nothing', group: 1 },
          { text: 'Do you want to talk, or be distracted?', group: 0 },
          { text: 'You should have prepared better', group: 1 },
          { text: 'Want help with the reply tomorrow?', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s first reply.',
        from: 'david',
        message: 'The lab said no. I really thought this one was it.',
        options: [
          { text: 'I\'m sorry, bro. That\'s really hard. Do you want to tell me about it?' },
          { text: 'OK, step one: don\'t reply for 24 hours. Step two...', why: 'Listen first.' },
          { text: 'There are other labs.', why: 'True, but too soon.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that makes David feel unheard.',
        lines: ['That sounds really hard.', 'Honestly, it doesn\'t matter at all.', 'I\'m here if you want to talk.'],
        bug: 1,
        explanation: 'It matters to him. Acknowledge it.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s support in order.',
        lines: ['Listen', 'Acknowledge how hard it is', 'Ask what would help', 'Offer specific help later'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each choice to its result.',
        pairs: [
          ['Listen first', 'David asks for help himself'],
          ['The full plan right away', 'David feels lectured'],
          ['Cheer up, it doesn\'t matter', 'David feels unheard'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What specific help can Clinton offer later?',
        options: [
          { text: '"Want me to help you write the reply tomorrow?"' },
          { text: '"Let me know if you need anything."', why: 'Kind, but vague. Offer something specific.' },
          { text: '"I\'ll call the lab and complain."', why: 'Never.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s tip.',
        template: 'Listen [[1]]. Ask before [[2]].',
        blanks: [['first'], ['advising']],
        distractors: ['later', 'leaving', 'laughing'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many minutes did David talk? (a number)',
        answers: ['20', 'twenty'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific help, or vague?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: 'I\'ll read your reply before you send it', group: 0 },
          { text: 'Let me know if you need anything', group: 1 },
          { text: 'Football on Saturday?', group: 0 },
          { text: 'Things will work out', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'When you\'ve had bad news, what helped most from friends: listening, advice, or distraction?',
    starters: ['What helped most was...', 'What didn\'t help was...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Next time a friend shares bad news, ask: "Do you want to talk about it, or do you want to be distracted?"',
  },
  notes: 'David (shared cast) applied to the Yaoundé lab in Ch2 l04. Listening before advising is common supportive-communication guidance.',
};

export default lesson;
