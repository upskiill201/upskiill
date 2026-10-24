import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 3. Chat with Tey: ask it to explain. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Ask it to explain',
  summary: 'Hazel can\'t read the code yet. But she can ask. "Explain this change line by line, in plain words, and tell me what could go wrong." The answer teaches her more than a week of tutorials.',
  minutes: 11,
  outcomes: [
    'Ask for a plain-words explanation of a change',
    'Ask "what could go wrong?"',
    'Check the explanation against what you see',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'You don\'t need to read code fluently to check it. You need to ask good questions about it.', replies: ['Like what?'] },
        { tey: 'Three questions after any change: "Explain this change line by line in plain words." "Why did you change that line?" "What could go wrong with it?"', replies: ['Will it tell the truth?'] },
        { tey: 'Usually it explains well, and often spots its own mistake. When Hazel asked "Why did you remove Number(...)?", it said: "That was a mistake; without it, amounts are text and get joined. Shall I put it back?"', replies: ['So it admitted it!'] },
        { tey: 'It did. But an explanation is still a claim. Check it against something real: the diff, or the page. If it says "this adds the amounts", add two amounts and see.', replies: ['Ask, then check.'] },
        { tey: 'And here\'s the bonus: every explanation teaches you a bit of code. By Chapter 8, you\'ll read most of it yourself.', replies: ['Deal.'] },
      ],
    },
    {
      kind: 'code',
      language: 'plaintext',
      code: 'Explain your last change line by line, in plain words, for someone who doesn\'t code.\nThen tell me what could go wrong with it.',
      caption: 'Hazel\'s explain prompt.',
    },
  ],
  apply: {
    scenario: 'Asking about Tuesday\'s change.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which question gets the most useful explanation?',
        options: [
          { text: 'Is it good?', why: 'It will say yes.' },
          { text: 'Explain this change line by line in plain words, then tell me what could go wrong.' },
          { text: 'Explain everything about JavaScript.', why: 'Too big. Ask about this change.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the question to what it gets you.',
        pairs: [
          ['"Explain line by line"', 'What each line does'],
          ['"Why did you change that?"', 'The reason behind a surprise'],
          ['"What could go wrong?"', 'Risks to test for'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'It explained it beautifully. So it\'s correct?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'An explanation is still a claim. I\'ll add two pledges and see if the total is right.' },
          { text: 'Yes, it explained it.', why: 'A good explanation of wrong code is still wrong code.' },
          { text: 'I didn\'t understand it, so I skipped it.', why: 'Ask it to explain more simply.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s rhythm.',
        template: 'First [[1]] it to explain. Then [[2]] the explanation against the page.',
        blanks: [['ask'], ['check']],
        distractors: ['tell', 'trust'],
      },
      {
        kind: 'sortGroups',
        prompt: 'The AI\'s "what could go wrong" list. Worth testing, or not?',
        groups: ['Test it', 'Not needed'],
        items: [
          { text: 'A blank amount', group: 0 },
          { text: 'Letters typed in the amount box', group: 0 },
          { text: 'Someone pledging $0.50', group: 0 },
          { text: 'The moon landing', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The explanation is full of words Hazel doesn\'t know. Best move?',
        options: [
          { text: 'Give up', why: 'Just ask again, simpler.' },
          { text: 'Pretend she understood', why: 'Then she can\'t check it.' },
          { text: 'Ask: "Explain that again for a 12-year-old"' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Complete the safety question: "What could go ...?"',
        answers: ['wrong'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'The AI\'s explanation. Which line doesn\'t match the diff (where Number(...) was removed)?',
        lines: [
          'Line 1: adds the new pledge to the list.',
          'Line 2: the amount is turned into a number first.',
          'Line 3: if the total reaches the goal, show the message.',
        ],
        bug: 1,
        fix: 'The amount is NOT turned into a number any more.',
        explanation: 'Checking the explanation against the diff caught it: Number(...) was removed.',
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Asking all these questions uses up our plan. Isn\'t that a waste?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'You\'re right, no more questions.', why: 'Short questions cost little. Bugs on the street cost more.' },
          { text: 'Ask questions only on Sundays.', why: 'Ask when there\'s a change to check.' },
          { text: 'One short question costs less than one bug in front of the whole street.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Review: in the diff, what does a line starting with - mean?',
        options: [
          { text: 'It was removed' },
          { text: 'It\'s a minus sign in maths', why: 'In a diff, a leading - means removed.' },
          { text: 'It\'s an error', why: 'Just a removed line.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What\'s one thing in your own project you\'ve accepted without understanding? Write the question you\'ll ask about it.',
    starters: ['I don\'t understand...', 'My question:'],
  },
  deepen: {
    title: 'On your computer: explain and check',
    summary: 'In your project, ask: "Explain how the main calculation works, line by line, in plain words. What could go wrong?" Pick one risk from its answer and test it on your page.',
  },
  notes: 'Self-explanation prompting; explanations are treated as claims to verify.',
};

export default lesson;
