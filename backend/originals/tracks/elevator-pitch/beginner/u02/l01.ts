import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. "I'm just a junior designer": three missed chances at the finalists' mixer. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"I\'m just a junior designer"',
  summary: 'The finalists\' networking mixer. Investors, recruiters, founders, small chops. Three people ask Ada, "So, what do you do?" Three times she answers, "Oh, I\'m just a junior designer." Three conversations end in under a minute.',
  minutes: 12,
  outcomes: [
    'See why a job title isn\'t a personal pitch',
    'Notice how small words like "just" shrink you',
    'Know this chapter\'s goal: introduce yourself so people remember you',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tech Fest mixer, Wednesday, 6:30 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Person 1, a recruiter from a big bank: "Hi! So, what do you do?"' },
        { speaker: 'ada', text: 'Oh, I\'m just a junior designer. At a fintech. It\'s not very exciting.' },
        { speaker: 'narrator', text: 'Recruiter: "Ah, nice." She spots someone over Ada\'s shoulder. "Excuse me." Gone.' },
        { speaker: 'narrator', text: 'Person 2, a founder with a coffee: "So, what do you do?" Ada: "Just design, really. Screens and things." Founder: "Cool, cool." Gone.' },
        { speaker: 'narrator', text: 'Person 3, a young investor\'s assistant: "What do you do?" Ada: "I\'m just a junior designer... oh, and I\'m a finalist, but it\'s just a small app." Assistant: "Oh. Good luck!" Gone.' },
        { speaker: 'ada', text: '(texting Arjun from the toilets) Three people. Three "just"s. Zero conversations. I have a whole APP and I hid it under the word "just".' },
        { speaker: 'arjun', text: 'You pitched the app beautifully on Friday. Tonight, you\'re pitching YOU. That\'s a different pitch. Come out of the toilet.' },
      ],
      choice: {
        prompt: 'Arjun asks one question to get Ada thinking. Which?',
        options: [
          {
            text: '"Forget your job title. What problem do you solve for people?"',
            outcome: 'Ada thinks. "I make money apps simple enough that people actually use them. And I built one for my office." Arjun: "Say THAT next time."',
            best: true,
          },
          {
            text: '"What\'s your exact job title? Maybe it sounds better in full."',
            outcome: '"Junior Product Designer II." It doesn\'t sound better. A title tells people your rank, not what you do for anyone.',
          },
          {
            text: '"Maybe just leave early?"',
            outcome: 'Tempting. But the mixer is full of exactly the people she needs to meet.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p><strong>A personal pitch</strong> is your answer to \"So, what do you do?\" It's different from an idea pitch: you're not selling an app, you're helping someone understand who you are and why you're interesting to talk to.</p><p>This chapter: drop the \"just\", a simple three-line structure, tailoring it to whoever's asking, turning it into a conversation, and taking it online.</p>",
    },
  ],
  apply: {
    scenario: 'The mixer. Three missed chances.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did all three conversations end so fast?',
        options: [
          { text: 'The people were rude', why: 'They just had nothing to hold on to.' },
          { text: 'Ada gave a small job title with "just", and nothing to ask about' },
          { text: 'Ada talked too long', why: 'The opposite this time.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Shrinks Ada, or opens a conversation?',
        groups: ['Shrinks her', 'Opens a conversation'],
        items: [
          { text: '"I\'m just a junior designer."', group: 0 },
          { text: '"I make money apps simple enough that people use them."', group: 1 },
          { text: '"It\'s not very exciting."', group: 0 },
          { text: '"I built one for my office\'s savings group."', group: 1 },
          { text: '"It\'s just a small app."', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'But I AM a junior designer. Isn\'t saying more just showing off?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Yes, so say less.', why: 'She said almost nothing, and lost them.' },
          { text: 'Pretend you\'re the CEO.', why: 'Never lie. Just say the true, interesting part.' },
          { text: 'It\'s true AND small. Saying what you do for people isn\'t showing off. It\'s giving them something to ask about.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The little word Ada used three times that shrank her: ___. (one word)',
        answers: ['just'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between an idea pitch and a personal pitch?',
        options: [
          { text: 'An idea pitch is about a product or plan; a personal pitch is about who you are and what you do for people' },
          { text: 'There\'s no difference', why: 'Different goals, different shape.' },
          { text: 'Personal pitches are longer', why: 'Usually shorter.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the recruiter conversation in order.',
        lines: ['"So, what do you do?"', '"I\'m just a junior designer."', '"Ah, nice."', 'She spots someone else.', '"Excuse me."'],
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s reply to Person 3. Which part hides the most interesting thing?',
        lines: [
          'I\'m a product designer at a fintech.',
          'Oh, and I\'m a finalist, but it\'s just a small app.',
          'What brings you here tonight?',
        ],
        bug: 1,
        fix: 'And I\'m a finalist on Friday: I built an app that ended the money arguments in my office.',
        explanation: '"Just a small app" turns her best news into an apology.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Who did Ada meet?',
        pairs: [
          ['Person 1', 'A recruiter from a bank'],
          ['Person 2', 'A founder with a coffee'],
          ['Person 3', 'An investor\'s assistant'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Ada\'s better answer.',
        template: 'I make money [[1]] simple enough that people actually [[2]] them. I built one for my office\'s [[3]] group.',
        blanks: [['apps'], ['use'], ['savings', 'ajo']],
        distractors: ['just', 'boring'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s question.',
        tiles: ['What', 'problem', 'do', 'you', 'solve', 'for', 'people?'],
        distractors: ['title'],
      },
    ],
  },
  reflect: {
    prompt: 'How do you usually answer "So, what do you do?" Write your usual answer, and circle any "just", "only" or "not very exciting".',
    starters: ['I usually say...', 'Words that shrink me: ...'],
  },
  deepen: {
    title: 'Hear yourself',
    summary: 'Next time someone asks what you do, notice your exact first words. Do they start with a job title, a "just", or something people can ask about?',
  },
  notes: 'Story setup. The mixer and its attendees are fictional named extras (narrated). "Small chops" are Nigerian party snacks.',
};

export default lesson;
