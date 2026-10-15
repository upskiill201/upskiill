import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10 — Final Challenge. The conference coffee queue: Grace meets Ada, and Nurse Mode finally becomes a superpower. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Final Challenge: the conference coffee queue',
  summary: 'Thursday, 8:45 a.m. The biggest tech conference in Manchester. Two thousand people. In the coffee queue, a young woman in a violet hoodie is gripping her phone and breathing very carefully. Grace has seen that face a thousand times. On patients.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every tool from the course in one real conversation',
    'Go from a stranger in a queue to a real connection',
    'Follow up, so it lasts',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 8:45 a.m., Manchester Central',
      beats: [
        { speaker: 'narrator', text: 'Two thousand people, a coffee queue that bends round a pillar, and a stage being lit for the first talk at 9:30.' },
        { speaker: 'narrator', text: 'In front of Grace: a young woman with curly hair, a yellow headband and a violet hoodie with a little </> badge. She is reading the same phone note over and over, and breathing like someone counting to four.' },
        { speaker: 'grace', text: '(Eight weeks ago I\'d have stared at my phone. Notice. Read the signals. She\'s not busy. She\'s scared.)' },
        { speaker: 'tey', text: "This is it. Everything from the course, in one coffee queue. Start warm. Keep it going. Go a little deeper. Leave on a high. Follow up. And Grace: this time, Nurse Mode might be exactly right." },
      ],
    },
  ],
  apply: {
    scenario: 'Final Challenge. The coffee queue.',
    items: [
      {
        kind: 'mcq',
        prompt: 'The woman is clearly nervous, reading a note. Grace\'s opener?',
        options: [
          { text: '"Why are you breathing like that?"', why: 'Points at her nerves, not kind.' },
          { text: 'Say nothing; she\'s busy', why: 'She\'s not busy. She\'s nervous, and probably glad of a friendly face.' },
          { text: '"Big day? You look like someone about to do something brave."' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Ha, is it that obvious? I\'m speaking at 9:30. First time at a big conference. I\'m Ada, from Lagos.',
        prompt: 'Grace\'s reply, with her name and a little warmth?',
        options: [
          { text: 'Okay. Good luck.', why: 'She just opened up. Throw the ball back.' },
          { text: 'I hate public speaking, I\'d die.', why: 'Not helpful to someone about to go on stage.' },
          { text: 'I\'m Grace. And honestly, after eighteen years as a nurse, I have to ask: and how are we feeling today?' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Ada laughs: "Terrified, nurse." Why does Nurse Mode work this time?',
        options: [
          { text: 'Nurse Mode always works', why: 'Not at the coffee machine on day one!' },
          { text: 'She really is nervous, and it\'s said warmly, with a smile: the right words for the right moment' },
          { text: 'Ada is a patient', why: 'She\'s a speaker. Just a nervous one.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful thing to say to a nervous speaker, or not?',
        groups: ['Helpful', 'Not helpful'],
        items: [
          { text: 'What\'s your talk about? I\'d love to hear the short version.', group: 0 },
          { text: 'I heard the last speaker got booed.', group: 1 },
          { text: 'People are usually on your side more than you think.', group: 0 },
          { text: 'Don\'t be nervous!', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'It\'s about designing money apps for people who\'ve never trusted banks. My aunties are my test users.',
        prompt: 'Grace follows up on the best hook.',
        options: [
          { text: 'Your aunties are your test users? Please tell me there\'s a story there.' },
          { text: 'I don\'t really use banking apps.', why: 'A switch to yourself.' },
          { text: 'Nice.', why: 'Dropped ball, great hook missed.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Ada asks, "So what do you do?" Grace\'s answer?',
        options: [
          { text: '"Just a junior researcher, sorry."', why: 'Card 4: no "just".' },
          { text: '"I make sure a hospital app actually works for patients. I was a nurse for eighteen years. Apparently my aunties are hospital patients."' },
          { text: '"Long story."', why: 'You have a 30-second story now.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A light question that invites a real answer is a ___ question. (one word)',
        answers: ['bridge'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Can I tell you a secret? I almost didn\'t come. I thought nobody would want to hear from someone like me.',
        prompt: 'Something real. Grace listens, doesn\'t fix. Best reply?',
        options: [
          { text: 'Don\'t be silly!', why: 'It dismisses what she just shared.' },
          { text: 'Let me tell you about my snack table for ten minutes.', why: 'Share a little, then hand it back.' },
          { text: 'I know that feeling exactly. Eight weeks ago I hid by a snack table for an hour. What made you come anyway?' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s side of the queue chat. Which line breaks a rule from the course?',
        lines: [
          'Your aunties are your test users? Tell me everything.',
          'I hid by the snacks at my first meetup, so I get it.',
          'Your accent is so funny, say "Lagos" again!',
        ],
        bug: 2,
        fix: 'What\'s the one thing you want people to remember from your talk?',
        explanation: 'Jokes about accents or who people are hurt. Punch up at situations, never at people.',
      },
      {
        kind: 'mcq',
        prompt: '9:15. Ada needs to go backstage. How does Grace leave the conversation?',
        options: [
          { text: '"Go and be brilliant. I\'ll be in row three, nodding like a proud aunty."' },
          { text: '"Wait, one more question..."', why: 'Her signals say she needs to go.' },
          { text: 'Nothing; she just leaves', why: 'A warm exit sends her off on a high.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the chapter it came from.',
        pairs: [
          ['"Big day?" to a nervous stranger', 'The first hello'],
          ['"Your aunties are your test users?"', 'Keep it going'],
          ['"What made you come anyway?"', 'From small talk to real talk'],
          ['"I\'ll be in row three."', 'A room full of strangers'],
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the whole conversation in order.',
        lines: ['Notice and open warmly', 'Swap names, add a little warmth', 'Follow up on her hook', 'Go a little deeper', 'Leave on a high', 'Follow up the next day'],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: '(after the talk, by text) You were right, they were on my side. Thank you for the coffee queue.',
        prompt: 'Grace\'s reply, and the follow-up?',
        options: [
          { text: 'np', why: 'This is the start of a friendship. Use more than two letters.' },
          { text: 'You were brilliant. The aunties section had the whole room laughing. Let\'s stay in touch: next time you\'re in Manchester, coffee\'s on me.' },
          { text: 'Can you get me a job in Lagos?', why: 'Relationship first.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why did this conversation work so well?',
        options: [
          { text: 'She had prepared clever jokes', why: 'Warmth beats wit.' },
          { text: 'Luck', why: 'Skills she learned, one lesson at a time.' },
          { text: 'Grace read the signals, stayed curious, shared a little, went a little deeper, and left kindly' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Week one, or week eight?',
        groups: ['Week one', 'Week eight'],
        items: [
          { text: '"And how are we feeling today?" (by accident)', group: 0 },
          { text: '"And how are we feeling today?" (on purpose, to a nervous speaker)', group: 1 },
          { text: 'Nine-second conversations', group: 0 },
          { text: 'Follow-ups the next morning', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The whole course, in Grace\'s words.',
        template: 'Start [[1]]. Keep it [[2]]. Go a little [[3]]. Leave on a high.',
        blanks: [['warm'], ['going'], ['deeper']],
        distractors: ['clever', 'shorter'],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'So how was the big conference?',
        prompt: 'Grace\'s answer to her son, eight weeks later.',
        options: [
          { text: 'I made a friend in a coffee queue. She\'s from Lagos, she gave a talk, and she thinks Nurse Mode is a superpower.' },
          { text: 'Fine.', why: 'After everything she\'s learned? Never "Fine".' },
          { text: 'I hid by the snacks.', why: 'Not anymore.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build what Grace finally believes.',
        tiles: ['I\'ve', 'been', 'good', 'at', 'this', 'all', 'along.'],
        distractors: ['never', 'weird'],
      },
    ],
  },
  reflect: {
    prompt: 'Eight weeks ago, Grace dreaded small talk. What has changed for you since lesson 1? What will you do differently in your next conversation with a stranger?',
    starters: ['When I started, I...', 'Now I...', 'Next time I\'ll...'],
  },
  deepen: {
    title: 'Your project: the three-hello week',
    summary: 'Over the next week, start three short conversations with people you don\'t usually talk to: a colleague from another team, a shop assistant, someone at an event. Use one tool from each chapter. Afterwards, write one line about each: did it go better than you expected? (Most people find it did.)',
  },
  notes: 'Final Challenge: reviews the whole course. Ada\'s look matches CAST.md (curly puff hair, yellow headband, violet hoodie with </> badge); she designs at a Lagos fintech, so "money apps for people who\'ve never trusted banks" fits. Grace–Ada fixed relationship recorded in CAST.md. Manchester Central is a real conference venue. "People are on your side more than you think" echoes the liking gap (Boothby et al. 2018).',
};

export default lesson;
