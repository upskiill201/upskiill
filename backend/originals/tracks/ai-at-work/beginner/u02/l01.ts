import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 2 · Lesson 1 — beat the blank page: brain dump, then let the AI draft while you edit. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'A first draft in one minute',
  summary: 'The hardest part of writing is starting. Dump your raw points, let the AI shape them, then edit like a pro.',
  minutes: 13,
  outcomes: [
    'Use a brain dump to get past the blank page',
    'Turn messy notes into a clean first draft with AI',
    'Switch from writer to editor, which is faster',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The recap at 5:40pm',
      beats: [
        { speaker: 'narrator', text: 'Friday, 5:40pm. Ada still owes her manager a recap of the week. She stares at an empty email for ten minutes.' },
        { speaker: 'ada', text: "I know what happened this week. I just can't make it sound like a proper email." },
        { speaker: 'tey', text: "Then don't write an email yet. Dump everything you know, in any order, typos and all. Shaping it is a separate job." },
        { speaker: 'narrator', text: 'Ada taps the microphone and talks for forty seconds: sign-up finished, bug found Tuesday, testing moved, Lucía still owes the colours, Grace starts Monday.' },
        { speaker: 'narrator', text: 'She adds: "Turn these notes into a 5-bullet recap for my manager, most important first, friendly." The draft appears.' },
      ],
      choice: {
        prompt: 'The draft is good, but it says "a minor bug". The bug delayed testing by two days. What should Ada do?',
        options: [
          {
            text: 'Edit that one line herself: "a bug that moved testing to Friday", then send.',
            outcome: 'Done at 5:47pm. Seven minutes, and the one fact that mattered is now accurate.',
            best: true,
          },
          {
            text: 'Send it as it is. It looks professional.',
            outcome: 'On Monday her manager asks why testing slipped "for a minor bug". Ada has to explain it twice.',
          },
          {
            text: 'Delete it and write the whole thing herself.',
            outcome: 'Done at 6:30pm. The draft was 90% right; she threw away the useful part.',
          },
        ],
      },
    },
    {
      kind: 'reading',
      title: 'Why writing feels slow, and the fix',
      html:
        '<p>Writing is really two different jobs that most people try to do at the same time:</p>' +
        '<ul>' +
        '<li><strong>Drafting:</strong> getting the ideas out. Messy is fine.</li>' +
        '<li><strong>Editing:</strong> shaping, cutting, fixing. This needs a calm, critical eye.</li>' +
        '</ul>' +
        '<p>Doing both at once is why the cursor blinks for ten minutes: every sentence gets judged before it exists. Professional writers separate the two jobs. With AI, you can go further:</p>' +
        '<ol>' +
        '<li><strong>You dump.</strong> Bullets, half-sentences, voice notes. Only the facts and what you want to happen.</li>' +
        '<li><strong>The AI drafts.</strong> Give it the reader, the length and the tone.</li>' +
        '<li><strong>You edit.</strong> Check every fact, fix what is off, cut what is not needed.</li>' +
        '</ol>' +
        '<p>The facts always come from you. The AI is very good at shape and very bad at knowing what actually happened this week.</p>',
    },
    {
      kind: 'compare',
      title: 'A brain dump vs the draft it became',
      before: {
        label: 'Ada\'s brain dump',
        text: 'signup done!! bug tues (email field) -> testing moved fri. lucia still owes colours, chase. grace starts mon, need laptop',
      },
      after: {
        label: 'The AI draft (after Ada\'s edit)',
        text:
          '• Sign-up screens are finished.\n• A bug found on Tuesday moved testing to Friday.\n• Still waiting on Lucía\'s colour approval; I\'ll chase Monday.\n• Grace starts Monday and needs a laptop.\n• Next week: testing, then launch prep.',
      },
      notes: ['The facts all came from Ada.', 'The AI added order, structure and clean wording.', 'Ada fixed one line and added one she knew mattered.'],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'You bring the facts and the final say. The AI brings the shape. Never the other way round.',
    },
    {
      kind: 'check',
      question: 'What goes into a good brain dump?',
      options: ['Perfect sentences', 'The facts and what you want to happen, in any order', 'Nothing; let the AI decide'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is using brain dumps to write faster.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does writing often feel slow?',
        options: [
          { text: 'We try to draft and edit at the same time' },
          { text: 'Keyboards are slow', why: 'The bottleneck is judging every sentence before it exists.' },
          { text: 'Emails must be long', why: 'Most should be short.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put the three-step method in order.',
        lines: ['You dump the facts', 'The AI drafts with reader, length and tone', 'You edit and check every fact'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Whose job is it?',
        groups: ['Ada', 'The AI'],
        items: [
          { text: 'Knowing what happened this week', group: 0 },
          { text: 'Putting the points in a clean order', group: 1 },
          { text: 'Checking every fact before sending', group: 0 },
          { text: 'Turning half-sentences into full ones', group: 1 },
          { text: 'Deciding what really matters', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "I need to write a thank-you note to our whole team for the launch and I'm totally blocked. Any tricks?",
        prompt: 'What should Ada suggest?',
        options: [
          { text: 'Dump what you want to thank them for in bullets, messy is fine, then ask the AI to shape it. Then edit.' },
          { text: 'Ask the AI to write a thank-you note.', why: 'It does not know what the team did. It will be generic.' },
          { text: 'Wait until you feel inspired.', why: 'The brain dump removes the need to wait.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the request Ada adds after her brain dump.',
        tiles: ['Turn', 'these', 'notes', 'into', 'a', '5-bullet', 'recap'],
        distractors: ['novel', 'ignore'],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the problem in this draft from Ada\'s notes. (Her notes said the bug moved testing to Friday.)',
        lines: ['Sign-up screens are finished.', 'A minor bug was quickly resolved with no impact.', 'Lucía still needs to approve the colours.'],
        bug: 1,
        fix: 'A bug found on Tuesday moved testing to Friday.',
        explanation: 'The AI softened a fact. Editing means checking every fact against what you know.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Writing is two jobs: drafting and ... (one word)',
        answers: ['editing'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the brain-dump scrap to the clean line.',
        pairs: [
          ['"signup done!!"', '"Sign-up screens are finished."'],
          ['"lucia still owes colours"', '"Still waiting on Lucía\'s colour approval."'],
          ['"grace mon, laptop"', '"Grace starts Monday and needs a laptop."'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which request turns Ada\'s brain dump into the best draft?',
        options: [
          { text: 'Fix this.', why: 'Fix it into what, for whom?' },
          { text: 'Turn these notes into a 5-bullet weekly recap for my manager, most important first, friendly. Only use these facts: [notes]' },
          { text: 'Write a weekly recap.', why: 'Without the notes, it will invent the week.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s rule.',
        template: 'You bring the [[1]] and the final say. The AI brings the [[2]].',
        blanks: [['facts'], ['shape', 'structure']],
        distractors: ['coffee', 'facts again'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good brain dump, or not?',
        groups: ['Good dump', 'Not a dump'],
        items: [
          { text: '"bug tues -> testing fri, chase lucia"', group: 0 },
          { text: '"Write my recap" (nothing else)', group: 1 },
          { text: 'A 40-second voice note of the week', group: 0 },
          { text: '"You know what happened, write it"', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I tried your trick! The AI draft was nice but it said our launch was "a huge success". We launched yesterday, we have no data yet.',
        prompt: 'What should Ada say?',
        options: [
          { text: "That's the editing step: change it to what you actually know, like 'went live yesterday, first results next week'." },
          { text: 'Leave it, it sounds nice.', why: 'It is an unsupported claim. Edit it.' },
          { text: 'Ask the AI to prove it.', why: 'It cannot. You know the facts; fix the line.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The quickest way to dump your points on a phone is to ... them (one word)',
        answers: ['speak', 'dictate', 'say', 'talk'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the step to the mindset.',
        pairs: [
          ['Dump', 'Fast and messy'],
          ['Draft', 'The AI shapes it'],
          ['Edit', 'Calm and critical'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The AI draft is 90% right. What is the fastest good move?',
        options: [
          { text: 'Fix the 10% yourself and send' },
          { text: 'Rewrite everything from scratch', why: 'Throws away the useful 90%.' },
          { text: 'Send it unchanged', why: 'The 10% may be a wrong fact.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'What do you have to write this week that you keep putting off? Do a 30-second brain dump of it now.',
    starters: ['I need to write...', 'My brain dump:'],
  },
  deepen: {
    title: 'Go deeper',
    summary: 'Try a "voice dump": talk through your next message for 30 seconds, paste the transcript, and ask for a draft.',
  },
  notes: 'Separating drafting from editing is standard writing advice. No statistics.',
};

export default lesson;
