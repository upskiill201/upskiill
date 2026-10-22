import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 19. Step-by-step: turn a jargon-heavy update into a plain-English one (did, found, next, need). Sets up the Unit Challenge. */
const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Your first plain-English update',
  summary: 'Thirty minutes to the Friday wrap-up, and Brian will ask Remi for an update in front of everyone. Remi has a draft. It sounds like Brian. Here is how he fixes it, step by step.',
  minutes: 13,
  outcomes: [
    'Turn a jargon-heavy update into plain English, step by step',
    'Use the four-part update: did, found, next, need',
    'Keep the jargon that helps and cut the jargon that hides',
  ],
  learn: [
    {
      kind: 'steps',
      title: 'Remi rewrites his wrap-up update',
      steps: [
        {
          title: 'Start with the draft',
          body: '"So this week I hit the ground running on the supplier workstream, did a deep dive that really moved the needle, looped in the key stakeholders, and we\'re aligned on next steps, which we\'ll circle back on." Thirty-six words. Very Brian. What did he actually do?',
        },
        {
          title: 'What I DID',
          body: 'Swap every jargon phrase for the real action. "Hit the ground running on the supplier workstream" + "deep dive" = "I cleaned up the supplier list and checked three suppliers in detail."',
        },
        {
          title: 'What I FOUND',
          body: 'Swap "moved the needle" for the number. "We paid Swift Freight twice for four deliveries: KSh 186,000. Finance is claiming it back."',
        },
        {
          title: 'What happens NEXT',
          body: 'Swap "aligned on next steps, which we\'ll circle back on" for the actual steps, with owners and days. "Felix is checking why the system allowed it by Friday. I\'ll send Brian a one-page summary on Monday."',
        },
        {
          title: 'What I NEED',
          body: 'This is the part most people forget. Is anything blocking you? "I need access to the invoice system to finish the summary." If you need nothing, say so: it\'s good news.',
        },
        {
          title: 'Read it out loud',
          body: 'Under a minute? Every sentence says something? A new person could understand it? Then it\'s ready. Remi\'s is 58 words and takes 25 seconds.',
        },
      ],
    },
    {
      kind: 'compare',
      title: 'Before and after',
      before: {
        label: 'Draft',
        text: 'This week I hit the ground running on the supplier workstream, did a deep dive that really moved the needle, looped in the key stakeholders, and we\'re aligned on next steps, which we\'ll circle back on.',
      },
      after: {
        label: 'Plain English',
        text: 'This week I cleaned up the supplier list and checked three suppliers in detail. I found we paid Swift Freight twice for four deliveries: KSh 186,000, which Finance is claiming back. Next, Felix is checking why the system allowed it, and I\'ll send Brian a summary on Monday. I need access to the invoice system to finish it.',
      },
      notes: [
        'Did: real actions instead of "hit the ground running" and "deep dive".',
        'Found: a number instead of "moved the needle".',
        'Next: names and days instead of "aligned on next steps".',
        'Need: one clear request, which the draft didn\'t have at all.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Did. Found. Next. Need. Four short sentences beat one long jargon one, every time.',
    },
  ],
  apply: {
    scenario: 'Friday, 4:30 p.m. Thirty minutes to the wrap-up.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the four-part update in order.',
        lines: ['What I did', 'What I found', 'What happens next', 'What I need'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which part of the update is this?',
        groups: ['What I did', 'What I found', 'What happens next'],
        items: [
          { text: 'I cleaned up the supplier list', group: 0 },
          { text: 'We paid Swift Freight twice', group: 1 },
          { text: 'I\'ll send the summary on Monday', group: 2 },
          { text: 'I checked three suppliers in detail', group: 0 },
          { text: 'Felix is checking the system by Friday', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Remi\'s draft says the deep dive "really moved the needle". What should replace it?',
        options: [
          { text: '"Massively moved the needle"', why: 'Bigger words, still no fact.' },
          { text: 'Nothing, delete it', why: 'The result is the most important part. Keep it, as a fact.' },
          { text: 'The actual result: a double payment of KSh 186,000' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s update. Which sentence needs translating?',
        lines: [
          'This week I built the courier cost spreadsheet.',
          'It shows prices went up 15% since June.',
          'Going forward we\'ll leverage synergies to drive alignment.',
          'I need Finance\'s numbers for October.',
        ],
        bug: 2,
        fix: 'Next, I\'ll ask two other couriers for quotes by Wednesday.',
        explanation: 'That sentence has five buzzwords and no information. "Next" should say who does what, and when.',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Send me your wrap-up update, I\'ll tell you if it sounds okay! Voice note me if you want.',
        prompt: 'Which update should Remi send Ada?',
        options: [
          { text: 'Hit the ground running, deep dive, moved the needle, aligned. Circle back soon.', why: 'Ada will reply with a laughing voice note and the word "translation??".' },
          { text: 'Cleaned the supplier list, checked 3 suppliers, found a KSh 186,000 double payment. Next: summary Monday. Need: invoice system access.' },
          { text: 'It went well.', why: 'Ada can\'t help with that. Neither could Brian.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The four-part update: did, found, next, ... (one word)',
        answers: ['need'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Remi doesn\'t need anything. What should he say for "need"?',
        options: [
          { text: 'Skip it and hope nobody asks', why: 'Saying you\'re not blocked is useful news for a manager.' },
          { text: '"Nothing blocking me right now."' },
          { text: 'Invent something to ask for', why: 'No need. "Nothing blocking me" is a perfectly good answer.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Remi\'s "next" sentence.',
        template: 'Next, [[1]] is checking why the system allowed it, and I\'ll send Brian a [[2]] on [[3]].',
        blanks: [['Felix'], ['summary'], ['Monday']],
        distractors: ['everyone', 'someday'],
      },
      {
        kind: 'mcq',
        prompt: 'Is ALL jargon bad in an update?',
        options: [
          { text: 'Yes: never use any', why: 'Shared shorthand can save time. The problem is jargon that hides what happened.' },
          { text: 'No: the more the better', why: 'More jargon usually means fewer facts.' },
          { text: 'No: short words everyone in the room knows, like "Q4" or "action item", are fine. Cut the ones that hide the facts' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Turn "we\'re aligned on next steps" into a real next step.',
        tiles: ['I\'ll', 'send', 'the', 'summary', 'to', 'Brian', 'on', 'Monday.'],
        distractors: ['aligned', 'synergies'],
      },
    ],
  },
  reflect: {
    prompt: 'Write a four-part update about your own week, at work, school or home: what you did, what you found, what\'s next, what you need.',
    starters: ['Did: ...', 'Found: ...', 'Next: ...', 'Need: ...'],
  },
  deepen: {
    title: 'Did, found, next, need',
    summary: 'Use the four-part update in your next team meeting, class check-in or even a family group chat. Time yourself: aim for under a minute.',
  },
  notes: 'Teaching framework (did/found/next/need) is a common status-update structure, not a cited model. Numbers are fictional and consistent with lessons 10 and 13.',
};

export default lesson;
