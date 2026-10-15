import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 1 — free. On air: Tey FM opens, Clinton calls in. The hook for the whole course: talking more is not the same as being heard. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'On air: "Everyone muted me"',
  summary: 'Tey FM, 11 p.m., the station that listens back. Line 1: Clinton from Buea. He sent 63 messages to his class group chat yesterday. Nobody replied. Today he found out why: all 40 of them have muted him.',
  minutes: 11,
  outcomes: [
    'Know the course\'s big idea: being heard is not about talking more',
    'Spot the three reasons people tune someone out',
    'Ask the question that starts every fix: what do you want them to DO?',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tey FM, 11:02 p.m.',
      beats: [
        { speaker: 'tey', text: "Gooood evening, night owls. You're listening to Tey FM, the station that listens back. I'm Tey, and tonight's topic: nobody listens to me. The phones are already melting. And you, my new producer, are running the desk. First caller. Line 1, you're on air." },
        { speaker: 'clinton', text: 'Tey! Big fan! Okay. So. I\'m Clinton, I\'m in first-year Computer Science in Buea, I run the class group chat, forty people, and yesterday I organised a study session for the exam and I sent, like, a few messages.' },
        { speaker: 'tey', text: "How many is \"a few\"?" },
        { speaker: 'clinton', text: '...Sixty-three. Plus four voice notes. Nobody came. And today someone accidentally screenshotted the chat and I saw it: "Clinton (muted)". All of them. FORTY people muted me.' },
        { speaker: 'tey', text: "Ignore-o-Meter reading: forty out of forty. A new Tey FM record. Producer, you're coaching Clinton tonight. What do we ask him first?" },
      ],
      choice: {
        prompt: 'You\'re the producer. What should Tey ask Clinton first?',
        options: [
          {
            text: '"What did you actually want them to do?"',
            outcome: 'Clinton pauses. "Come to the library at 4 on Saturday." Tey: "That\'s nine words. You sent sixty-three messages." The whole problem, in one sentence.',
            best: true,
          },
          {
            text: '"Have you tried writing in CAPITALS?"',
            outcome: 'Clinton: "Oh, I did. Twelve of them were in capitals." Louder didn\'t help. It never does.',
          },
          {
            text: '"Why don\'t you just leave the group?"',
            outcome: 'Clinton: "But I RUN the group!" Leaving won\'t fix the problem. It just stops anyone hearing him at all.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Here's the paradox Clinton has walked into: <strong>the person who talks the most is often the person heard the least.</strong></p><p>People tune someone out for three common reasons:</p><ul><li><strong>Too much:</strong> sixty-three messages to say nine words. Listeners stop sorting the important from the noise.</li><li><strong>No clear point:</strong> people can't tell what you want from them.</li><li><strong>Not listening back:</strong> Clinton never asks what time suits anyone. People stop listening to someone who never listens to them.</li></ul><p>This course is a radio show. Every chapter, a new caller with the same problem: <em>nobody listens to me.</em> You'll help each one get heard, and pick up every trick along the way.</p>",
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Being heard isn\'t about talking more, or louder. It starts with knowing what you want people to DO.',
    },
  ],
  apply: {
    scenario: 'Tey FM, Line 1. Clinton from Buea.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What\'s the paradox Clinton has fallen into?',
        options: [
          { text: 'Nobody in his group can read', why: 'They can. They just stopped reading him.' },
          { text: 'He talks the most and is heard the least' },
          { text: 'He talks too little', why: 'Sixty-three messages says otherwise.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which reason for being tuned out is this?',
        groups: ['Too much', 'No clear point', 'Not listening back'],
        items: [
          { text: 'Sixty-three messages in one day', group: 0 },
          { text: 'Nobody can tell what he wants them to do', group: 1 },
          { text: 'He never asks what time suits anyone', group: 2 },
          { text: 'Four voice notes, three minutes each', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'So should I just send more messages until they unmute me?',
        prompt: 'Your answer, producer?',
        options: [
          { text: 'Yes, and use more capitals.', why: 'Louder made it worse.' },
          { text: 'Give up, Clinton.', why: 'Tey FM never gives up on a caller.' },
          { text: 'More messages is how you got muted. Let\'s work out the ONE thing you want them to do.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Tey\'s first question for every caller: "What do you want them to ___?" (one word)',
        answers: ['do'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What did Clinton really want, in his own nine words?',
        options: [
          { text: 'Come to the library at 4 on Saturday' },
          { text: 'Everyone to know he\'s funny', why: 'Maybe, secretly. Not the message.' },
          { text: 'More followers', why: 'Not the point of the study session.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Clinton\'s plan for tomorrow. Which line will get him muted again?',
        lines: [
          'Work out what I want people to do.',
          'Send it in one clear message.',
          'Then send twenty follow-ups in case they missed it.',
        ],
        bug: 2,
        fix: 'Then wait, and reply to anyone who asks a question.',
        explanation: 'Twenty follow-ups is the original problem again. One clear message, then listen.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the Tey FM segment to what happens in it.',
        pairs: [
          ['On air', 'The caller explains their problem'],
          ['The Call Back', 'The caller reports back live'],
          ['Ignore-o-Meter', 'How ignored the caller is'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why did writing in capitals not help?',
        options: [
          { text: 'Phones don\'t show capitals', why: 'They do. Everyone saw them.' },
          { text: 'Louder doesn\'t fix "too much" or "no clear point"' },
          { text: 'He didn\'t use enough capitals', why: 'Twelve messages in capitals was plenty.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The course\'s big idea.',
        template: 'Being heard isn\'t about talking [[1]], or [[2]]. It starts with what you want people to [[3]].',
        blanks: [['more'], ['louder'], ['do']],
        distractors: ['less', 'quieter'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Clinton\'s message in nine words.',
        tiles: ['Study', 'session:', 'library,', '4', 'p.m.', 'Saturday.', 'Who\'s', 'in?'],
        distractors: ['URGENT', '!!!'],
      },
    ],
  },
  reflect: {
    prompt: 'Where do you feel unheard: a group chat, a meeting, at home? What do you actually want people to DO there? Write it in one sentence.',
    starters: ['I feel unheard in...', 'What I want them to do is...'],
  },
  deepen: {
    title: 'Your Ignore-o-Meter',
    summary: 'Think of one place you often feel ignored. This week, before you speak or send anything there, write down the one thing you want people to do. Notice how much shorter your messages get.',
  },
  notes: 'Course framing lesson. The three tune-out reasons are a teaching framework drawing on later lessons (attention and memory limits, Cowan 2001; listening research, Itzchakov et al. 2017). Clinton is 18 and in first-year CS here, after Study Smarter (CAST.md, Tey FM note).',
};

export default lesson;
