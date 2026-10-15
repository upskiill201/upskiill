import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1 — free. The hook for the whole course: Remi's first meeting, and the three ways to handle not understanding. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Welcome to Synergix',
  summary: "Remi's first meeting at his new internship. Brian says one sentence with five pieces of jargon in it, and Remi has to decide what to do.",
  minutes: 11,
  outcomes: [
    'Spot jargon in a sentence, even when you don\'t know what it means yet',
    'Say what jargon is, and why offices use so much of it',
    'Choose a smart move when you don\'t understand something at work',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Monday, 9:00 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Nairobi. Remi, 21, fresh Computer Science graduate, first day of a 12-week internship in the Strategy & Operations team at Synergix.' },
        { speaker: 'narrator', text: 'Nobody has yet explained what Synergix actually does. The website says "end-to-end solutions". Remi has read it three times.' },
        { speaker: 'brian', text: 'Morning, team! Welcome, Remi. Okay: let\'s circle back on the Q3 deck, take the vendor thing offline, grab the low-hanging fruit, and deep-dive the numbers EOD.' },
        { speaker: 'narrator', text: 'Everybody nods. Zanele, the other intern, nods hardest. Remi writes down every word. He understands none of them.' },
        { speaker: 'remi', text: '(Circle back... like a roundabout? Offline... is the vendor\'s Wi-Fi down? And why is there fruit?)' },
        { speaker: 'tey', text: "Hi, I'm Tey. I'll be your translator for the next twelve weeks. And don't worry: Brian just said something very simple. He just said it in Office." },
      ],
      choice: {
        prompt: 'Brian looks at Remi. "All good, Remi?" What should Remi do?',
        options: [
          {
            text: 'Smile and say "All good!" Then quietly write the phrases down to look up after the meeting.',
            outcome: 'Not bad. Remi survives the moment, and his list becomes his Jargon Notebook. But for an hour, he has no idea what his first task is.',
          },
          {
            text: 'Say: "Mostly! Quick check: what\'s the low-hanging fruit you\'d like me to start on?"',
            outcome: 'Brian lights up. "Great question. The easy wins: clean up the supplier list. Should take you a day." Remi now has a clear first task, and Brian thinks he\'s sharp.',
            best: true,
          },
          {
            text: 'Google "low-hanging fruit" under the table during the meeting.',
            outcome: 'Google shows him a mango tree. Brian sees him on his phone in his first meeting. Not the first impression he wanted.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p><strong>Jargon</strong> is the special language a group uses that outsiders don't understand. Doctors have it, footballers have it, gamers have it. Offices have <em>a lot</em> of it.</p><p>Here's Brian's sentence again, decoded:</p><ul><li><strong>Circle back on the Q3 deck:</strong> we'll come back to the slides for July to September later.</li><li><strong>Take the vendor thing offline:</strong> let's not talk about the supplier problem now; we'll discuss it separately.</li><li><strong>Grab the low-hanging fruit:</strong> do the easy tasks first.</li><li><strong>Deep-dive the numbers:</strong> look at the figures in detail.</li><li><strong>EOD:</strong> by the end of today.</li></ul><p>Five phrases. One simple plan. That's how most jargon works: it sounds complicated and means something ordinary.</p>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Not understanding jargon is not a sign you\'re slow. It\'s a sign you\'re new. Everybody in that room learned it the same way you will.',
    },
    {
      kind: 'check',
      question: 'Why does Brian use so much jargon?',
      options: ['To confuse the interns', "It's the shorthand his office has used for years, so it feels normal to him", 'Because plain English is not allowed at work'],
      answer: 1,
      explanation: 'Most people who use jargon aren\'t trying to confuse anyone. It\'s habit: shorthand that everyone around them already knows.',
    },
  ],
  apply: {
    scenario: 'Day 1 at Synergix. Remi\'s notebook is still empty.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is jargon?',
        options: [
          { text: 'Bad grammar', why: 'Jargon can be perfectly good grammar. It\'s about special words, not mistakes.' },
          { text: 'Special words a group uses that outsiders often don\'t understand' },
          { text: 'Swearing at work', why: 'Jargon is shorthand, not rude language.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each piece of Brian\'s sentence to what it means.',
        pairs: [
          ['Circle back', 'Come back to it later'],
          ['Take it offline', 'Discuss it separately, not now'],
          ['Low-hanging fruit', 'The easy tasks'],
          ['Deep-dive', 'Look at it in detail'],
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In Brian\'s sentence, "EOD" means "by the end of the ..." (one word)',
        answers: ['day'],
        placeholder: 'One word',
        explanation: 'EOD = end of day. You\'ll meet a lot more of these letters in Chapter 3.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Jargon or plain English?',
        groups: ['Office jargon', 'Plain English'],
        items: [
          { text: 'Let\'s circle back', group: 0 },
          { text: 'Let\'s talk about this tomorrow', group: 1 },
          { text: 'Grab the low-hanging fruit', group: 0 },
          { text: 'Do the easy tasks first', group: 1 },
          { text: 'Take it offline', group: 0 },
          { text: 'Can we discuss this after the meeting?', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Remi!! First day!! How was the first meeting? Tell me everything.',
        prompt: 'Remi messages Ada, his friend from a hackathon in Kigali, who has worked in an office in Lagos for a while. What should he send?',
        options: [
          { text: 'Perfect. Understood everything.', why: 'Remi didn\'t, and Ada is exactly the person who can help him. Pretending helps nobody.' },
          { text: 'I\'m quitting. They speak another language.', why: 'It feels like that on day one. But it\'s a language you can learn in a week or two.' },
          { text: 'I understood about 0%. What does "take the vendor thing offline" mean?? I wrote everything down.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Decode Brian\'s plan.',
        template: 'Do the [[1]] tasks first, look at the numbers in [[2]], and finish by the end of the [[3]].',
        blanks: [['easy'], ['detail'], ['day']],
        distractors: ['hardest', 'secret', 'week'],
      },
      {
        kind: 'mcq',
        prompt: 'Brian asks, "All good?" and Remi doesn\'t understand his task. What\'s the strongest reply?',
        options: [
          { text: '"Mostly! Quick check: what\'s the first easy task you\'d like me to start on?"' },
          { text: '"All good!"', why: 'Safe for ten seconds, but Remi still has no idea what to do.' },
          { text: '"I didn\'t understand a single word you said."', why: 'Honest, but it puts Brian on the spot. Ask one specific question instead.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi writes down what he thinks Brian meant. Tap the line he got wrong.',
        lines: [
          'Circle back on the Q3 deck: we\'ll return to the July to September slides later.',
          'Take the vendor thing offline: the supplier\'s internet is broken.',
          'Grab the low-hanging fruit: start with the easy tasks.',
        ],
        bug: 1,
        fix: 'Take the vendor thing offline: we\'ll discuss the supplier problem separately, not in this meeting.',
        explanation: '"Offline" here has nothing to do with the internet. It means "not here, not now".',
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the question Remi asks Brian.',
        tiles: ['Which', 'easy', 'task', 'should', 'I', 'start', 'with?'],
        distractors: ['fruit', 'offline'],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Tey say jargon is worth learning, even if you\'d rather speak plainly?',
        options: [
          { text: 'Because the more jargon you use, the smarter you sound', why: 'Not true, and later in the course you\'ll see the CEO proves it.' },
          { text: 'You need to understand it to do your job, even if you choose plain words yourself' },
          { text: 'You don\'t need to, everyone will explain it', why: 'Most people won\'t notice they\'re using it, so they won\'t explain it.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time someone used a word or phrase you didn\'t understand, at work, school or anywhere. What did you do, and what would you do now?',
    starters: ['The phrase was...', 'Next time I would ask...'],
  },
  deepen: {
    title: 'Start your own Jargon Notebook',
    summary: 'Like Remi, keep a note on your phone. Every time you hear a phrase at work, school or on the news that you\'re not sure about, write it down. By the end of this chapter you\'ll be able to decode most of them.',
  },
  notes:
    '"Low-hanging fruit" (easy targets), "circle back" (return to a topic later), "take offline" (discuss separately, outside the meeting), "deep dive" (detailed analysis), EOD (end of day) — meanings per Cambridge and Merriam-Webster dictionaries.',
};

export default lesson;
