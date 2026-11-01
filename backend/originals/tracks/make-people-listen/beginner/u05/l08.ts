import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 8. Reading: when they still say no (heard ≠ agreed; keeping the relationship; revisiting). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'When they still say no',
  summary: 'Miracle asks the question everyone is afraid of: "What if I do everything right, and they still say no?" Tey turns down the music and reads a letter from an old listener.',
  minutes: 12,
  outcomes: [
    'Know that being heard isn\'t the same as being agreed with',
    'Keep the relationship when you disagree',
    'Make your own decision with respect',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'A letter to Tey FM',
      html: "<p>Tey unfolds a letter. \"This came in last year, from a listener called Kemi. I keep it by the microphone.\"</p><blockquote><p>\"Dear Tey, I wanted to study music. My father wanted me to study law. I did everything you said: I listened first, asked what he feared, and found what we both wanted. He still said no. I was angry for a week. Then I realised something. For the first time, he had actually <em>heard</em> me. He knew why music mattered. He just didn't agree. And I finally understood why he was scared.\"</p></blockquote><p>\"So what happened?\" asks Miracle.</p><blockquote><p>\"I chose music. But I told him: 'I heard your worries. Here's how I'm handling each one.' And I kept calling every Sunday. Two years later, he came to my first concert. He sat in the front row.\"</p></blockquote><h3>What Kemi learned</h3><ul><li><strong>Heard is not the same as agreed.</strong> Success is a conversation where both sides understood each other, even if they still disagree.</li><li><strong>You can disagree and stay close.</strong> \"I love you, and I see this differently\" is possible in the same sentence.</li><li><strong>Show you heard their worries</strong>, even when you decide differently: \"Here's how I'm handling each one.\"</li><li><strong>Leave the door open.</strong> \"Can we talk about it again in three months?\" Minds often change slowly, after seeing things go well.</li><li><strong>Sometimes they're right.</strong> Listening goes both ways. Sometimes their worry reveals something you missed, and changing your plan is not losing.</li></ul>",
    },
    {
      kind: 'check',
      question: 'Kemi\'s father still said no. Why did she count the conversation as a success?',
      options: ['For the first time, they actually heard and understood each other', 'She tricked him into agreeing later', 'She won the argument'],
      answer: 0,
      explanation: 'Being heard and understanding each other matters, even without agreement. And it kept the door open.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Heard is not agreed. Disagree and stay close. Show you heard their worries. Leave the door open. And stay open yourself.',
    },
  ],
  apply: {
    scenario: 'Tey FM. Kemi\'s letter.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between being heard and being agreed with?',
        options: [
          { text: 'They\'re the same', why: 'Kemi\'s letter is all about the difference.' },
          { text: 'Heard means they obey', why: 'Not at all.' },
          { text: 'Heard means they understand your view; agreed means they share it' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Keeps the relationship, or damages it?',
        groups: ['Keeps it', 'Damages it'],
        items: [
          { text: '"I heard your worries. Here\'s how I\'m handling each one."', group: 0 },
          { text: '"You never understood me anyway."', group: 1 },
          { text: 'Calling every Sunday', group: 0 },
          { text: 'Stopping all contact to prove a point', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'What if Papa says no, and I go to Lagos anyway? Does that mean all this listening failed?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'No. If you both understood each other, it worked. Show him you heard his worries, and keep the door open.' },
          { text: 'Yes, total failure.', why: 'Heard isn\'t agreed. Understanding is the win.' },
          { text: 'Then don\'t tell him you\'re going.', why: 'Secrets damage the relationship far more.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Heard is not the same as ___. (one word)',
        answers: ['agreed', 'agreement', 'agree'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why might it be worth reconsidering your plan after listening?',
        options: [
          { text: 'You should always do what they say', why: 'Not always. But stay open.' },
          { text: 'Their worry might reveal something you missed; changing your plan isn\'t losing' },
          { text: 'It\'s never worth reconsidering', why: 'Listening goes both ways.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Kemi\'s path in order.',
        lines: ['She listened and asked about his fears.', 'He still said no.', 'She chose music, and explained how she\'d handle each worry.', 'She kept calling every Sunday.', 'Two years later, he came to her concert.'],
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s plan if they say no. Which line breaks Kemi\'s lessons?',
        lines: [
          'Thank them for really listening.',
          'Tell them they\'ll regret not supporting me.',
          'Ask if we can talk again in three months.',
        ],
        bug: 1,
        fix: 'Tell them how I\'ll handle each of their worries.',
        explanation: 'Threats close the door. Showing you heard them keeps it open.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Pick your moment', 'Not when they\'re tired'],
          ['Ask, don\'t tell', 'Open, curious questions'],
          ['Leave the door open', '"Can we talk again?"'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Kemi\'s line.',
        template: 'I [[1]] your worries. Here\'s how I\'m [[2]] each [[3]].',
        blanks: [['heard'], ['handling'], ['one']],
        distractors: ['ignored', 'all'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a "disagree and stay close" line.',
        tiles: ['I', 'love', 'you,', 'and', 'I', 'see', 'this', 'differently.'],
        distractors: ['but'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a disagreement where the other person didn\'t change their mind. Did they at least understand you? Did you understand them?',
    starters: ['The disagreement was...', 'I think they understood that...'],
  },
  deepen: {
    title: 'Close the loop',
    summary: 'If you\'ve made a decision someone disagreed with, tell them how you\'re handling one of their worries. You don\'t need their agreement, just to show you heard them.',
  },
  notes: 'Kemi\'s letter is fictional. Distinction between being heard/understood and agreement, maintaining relationships through disagreement, and revisiting decisions are standard conflict-communication principles.',
};

export default lesson;
