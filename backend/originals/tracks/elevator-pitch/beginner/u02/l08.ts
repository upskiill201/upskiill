import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 8. Reading: your pitch online — headline, bio, first message. */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Your pitch online',
  summary: 'The bus-stop lady and the hotel marketer both look Ada up that night. Her LinkedIn headline says: "Junior Product Designer II at Fintech Co." Her bio is empty. Arjun: "Your pitch has to live online too."',
  minutes: 12,
  outcomes: [
    'Write a headline that pitches you in one line',
    'Write a short bio with present, past and future',
    'Send a first message that gets a reply',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'When they look you up',
      html: "<p>After a good chat, many people do the same thing: they look you up. Your online profile is your pitch when you're not in the room.</p><h3>1. The headline</h3><p>It's often the first line people see, next to your name. A job title alone is the online version of \"I'm just a junior designer.\"</p><ul><li><strong>Before:</strong> \"Junior Product Designer II at Fintech Co.\"</li><li><strong>After:</strong> \"Product designer making money apps people actually use · Built Ajo Tracker · Lagos\"</li></ul><h3>2. The bio (\"About\")</h3><p>Use present, past, future, in a few short lines. Lead with what you do for people. Add one piece of proof. End with what you're looking for, so people know how to help.</p><h3>3. The first message</h3><p>When you message someone you met, or someone you'd like to meet:</p><ul><li><strong>Remind them where you met</strong>: \"Lovely to meet you at the Tech Fest mixer.\"</li><li><strong>Say one specific thing</strong> from the conversation: \"I loved your point about hotel staff and savings groups.\"</li><li><strong>One clear next step</strong>: \"Could I send you a two-minute demo?\"</li><li><strong>Keep it short.</strong> Three or four lines. Nobody reads a wall of text from a stranger.</li></ul><h3>4. Cold messages</h3><p>Messaging someone you haven't met? Same rules, plus a reason why <em>them</em>: \"I saw your post about church savings groups, and I've built an app for exactly that.\"</p>",
    },
    {
      kind: 'check',
      question: 'What should a first message after a networking chat include?',
      options: ['Where you met, one specific thing you discussed, and one next step', 'Your whole CV', 'Just "Hi"'],
      answer: 0,
      explanation: 'Short, specific, with a clear next step. "Hi" alone gives them nothing to reply to.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Headline: what you do for people. Bio: present, past, future. First message: where you met, one specific thing, one next step.',
    },
  ],
  apply: {
    scenario: 'Ada\'s profile makeover.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Which headline pitches Ada best?',
        options: [
          { text: '"Junior Product Designer II at Fintech Co."', why: 'The online "I\'m just a junior designer".' },
          { text: '"Designer. Dreamer. Coffee lover."', why: 'Fun, but says nothing about what she does for people.' },
          { text: '"Product designer making money apps people actually use · Built Ajo Tracker"' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Ada\'s first message in order.',
        lines: ['Lovely to meet you at the Tech Fest mixer.', 'I loved your point about hotel staff and savings groups.', 'Could I send you a two-minute demo?', 'Thanks, Ada'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good first message, or bad?',
        groups: ['Good', 'Bad'],
        items: [
          { text: 'Short, with one clear next step', group: 0 },
          { text: 'Just "Hi"', group: 1 },
          { text: 'Mentions where you met', group: 0 },
          { text: 'A 400-word wall of text', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'For a cold message, can I just send my pitch and ask for a meeting?',
        prompt: 'What does Arjun say?',
        options: [
          { text: 'Add why THEM: "I saw your post about church savings groups." Otherwise it looks like spam.' },
          { text: 'Yes, send the same message to 200 people.', why: 'That\'s spam.' },
          { text: 'Never send cold messages.', why: 'They work when they\'re specific.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Your bio follows the same pattern: present, past, ___. (one word)',
        answers: ['future'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why end your bio with what you\'re looking for?',
        options: [
          { text: 'It\'s required by LinkedIn', why: 'Not required. Just useful.' },
          { text: 'So people know how they can help you' },
          { text: 'To fill space', why: 'It\'s the most useful line.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Ada\'s first message. Which line breaks the rules?',
        lines: [
          'Lovely to meet you at the Tech Fest mixer!',
          'Here is my full CV, my portfolio, my app\'s 14 features and my thoughts on fintech in Africa...',
          'Could I send you a two-minute demo?',
        ],
        bug: 1,
        fix: 'I loved your point about hotel staff and savings groups.',
        explanation: 'A wall of attachments and features. One specific, short line instead.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the online part to its job.',
        pairs: [
          ['Headline', 'What you do for people, in one line'],
          ['Bio', 'Present, past, future'],
          ['First message', 'Where you met plus one next step'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A cold message.',
        template: 'I [[1]] your post about church savings groups, and I\'ve [[2]] an app for exactly that. Could I send you a two-minute [[3]]?',
        blanks: [['saw', 'read'], ['built', 'made'], ['demo', 'video']],
        distractors: ['CV', 'just'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the message opener.',
        tiles: ['Lovely', 'to', 'meet', 'you', 'at', 'the', 'mixer.'],
        distractors: ['Hi.'],
      },
    ],
  },
  reflect: {
    prompt: 'Rewrite your online headline (LinkedIn, Instagram, X, anywhere) so it says what you do for people, not just your title.',
    starters: ['My headline now: ...', 'New headline: ...'],
  },
  deepen: {
    title: 'Send one message',
    summary: 'Send one short message to someone you met recently or someone whose work you admire: where you met (or why them), one specific thing, one next step.',
  },
  notes: 'Profile headline, bio and outreach-message structure: standard career and networking guidance. "Ajo Tracker" is Ada\'s app name from Python for Beginners.',
};

export default lesson;
