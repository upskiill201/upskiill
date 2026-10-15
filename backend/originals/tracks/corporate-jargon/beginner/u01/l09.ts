import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 9. Story with a choice: Brian cuts Remi off with "let's take this offline". The four real reasons people say it. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: '"Let\'s take this offline"',
  summary: 'Remi raises a problem in the team meeting. Brian cuts him off: "Let\'s take this offline." Was it rude? Was Remi in trouble? Remi has to decide what to do next.',
  minutes: 12,
  outcomes: [
    'Know the four real reasons people say "let\'s take this offline"',
    'Respond without feeling shut down',
    'Make sure "offline" actually happens',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 10:00 a.m., the weekly team meeting',
      beats: [
        { speaker: 'narrator', text: 'Eight people around the table, three more on the screen from the Lagos office. Brian is running through the agenda.' },
        { speaker: 'brian', text: 'Last item: suppliers. Remi, anything from your deep dive?' },
        { speaker: 'remi', text: 'Yes! Swift Freight was late on 9 of 12 deliveries, and I think it\'s because their contract doesn\'t have any late penalties, and the way the invoices are coded, it actually looks like we paid them twice in...' },
        { speaker: 'brian', text: 'Great stuff. Let\'s take this offline. Okay everyone, that\'s time!' },
        { speaker: 'narrator', text: 'Chairs scrape. Everyone leaves. Remi stays sitting, face hot.' },
        { speaker: 'remi', text: '(Did I just get told off in front of everyone? In my first week?)' },
        { speaker: 'tey', text: "Breathe, Remi. \"Let's take this offline\" has four common meanings, and only one of them is bad news. Let's work out which one this was." },
      ],
      choice: {
        prompt: 'What should Remi do now?',
        options: [
          {
            text: 'Catch Brian in the corridor: "Sorry if I went into too much detail. When\'s a good time to go through the supplier issue?"',
            outcome: 'Brian laughs. "Not your fault, we were out of time, and the double payment is a finance thing. Grab 20 minutes with me at 2?" Offline happens, and Remi finds out it was the clock, not him.',
            best: true,
          },
          {
            text: 'Say nothing and assume he was told off.',
            outcome: 'Remi worries all afternoon. Brian, meanwhile, has forgotten. The double-payment problem sits in Remi\'s notebook for a week.',
          },
          {
            text: 'Send a long email to the whole team explaining everything he didn\'t get to say.',
            outcome: 'Eleven people get a 500-word email. Brian replies: "Thanks Remi, let\'s chat 1:1." The whole point of "offline" was to NOT do this with everyone.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>The four real reasons people say <strong>\"let's take this offline\"</strong>:</p><ol><li><strong>Out of time.</strong> The meeting is ending and this needs longer.</li><li><strong>Too detailed for the room.</strong> Only two or three people need this conversation.</li><li><strong>Sensitive.</strong> Money, a mistake, a person: better discussed privately.</li><li><strong>Avoiding it.</strong> Sometimes it's a polite way of saying \"not now, maybe never\".</li></ol><p>Remi's was reasons 1, 2 and 3 at once: time was up, it was detailed, and \"we paid them twice\" is a sensitive thing to say in front of eleven people.</p>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Whatever the reason, the fix is the same: follow up and ask for a time. That turns "offline" into a real meeting, and stops it from quietly becoming "never".',
    },
  ],
  apply: {
    scenario: 'Thursday, after the weekly meeting.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does "let\'s take this offline" literally ask for?',
        options: [
          { text: 'Stop talking about it forever', why: 'Sometimes it ends up that way, but the words ask for a separate conversation.' },
          { text: 'Discuss it separately, outside this meeting' },
          { text: 'Switch off your computer', why: 'Nothing to do with being on the internet.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which reason for "offline" is this?',
        groups: ['Out of time', 'Too detailed', 'Sensitive'],
        items: [
          { text: 'It\'s 10:59 and the meeting ends at 11', group: 0 },
          { text: 'Only Remi and Finance need to discuss invoice codes', group: 1 },
          { text: 'It\'s about a colleague\'s mistake', group: 2 },
          { text: 'Two people are arguing about a spreadsheet formula', group: 1 },
          { text: 'It involves someone\'s pay', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Sorry for cutting you off earlier, we were out of time. That double payment sounds important.',
        prompt: 'Best reply?',
        options: [
          { text: 'It\'s fine.', why: 'Polite, but nothing gets booked. The problem stays unsolved.' },
          { text: 'I felt really embarrassed in front of everyone.', why: 'Honest, but Brian already explained. Move the problem forward instead.' },
          { text: 'No problem! Could we find 20 minutes today or tomorrow to go through it?' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'To make sure "offline" actually happens, ask for a ... (one word)',
        answers: ['time', 'meeting', 'slot'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why was "we paid them twice" better discussed offline?',
        options: [
          { text: 'It\'s a sensitive money issue that needs checking before everyone hears it' },
          { text: 'Because interns aren\'t allowed to talk about money', why: 'Remi was right to raise it. The question is where.' },
          { text: 'Because it isn\'t important', why: 'It\'s very important. That\'s exactly why it needs the right room.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s follow-up message. Which line could cause trouble?',
        lines: [
          'Hi Brian, thanks for making time.',
          'I\'ve copied in the whole team so everyone can see the invoice problem.',
          'Would 2 p.m. work for 20 minutes?',
        ],
        bug: 1,
        fix: 'Just you and me for now; we can bring in Finance once we\'ve checked.',
        explanation: 'Copying in everyone undoes the point of "offline". Keep it small until it\'s checked.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what you hear to what it probably means.',
        pairs: [
          ['"Let\'s take this offline, we\'re out of time"', 'Out of time'],
          ['"Let\'s take this offline, just us two"', 'Too detailed for the room'],
          ['"Let\'s take this offline, it\'s a bit delicate"', 'Sensitive'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Someone says "let\'s take it offline" to you three meetings in a row and never follows up. What\'s likely going on?',
        options: [
          { text: 'They\'re just very busy, so stop raising it', why: 'If it matters, raise it again with a specific time. Don\'t let it vanish.' },
          { text: 'They may be avoiding it, so ask directly for a time, or check if it\'s still wanted' },
          { text: 'They hate you', why: 'Unlikely. Often people avoid a topic because it\'s awkward, not because of you.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Remi\'s corridor line.',
        template: 'Sorry if I went into too much [[1]]. When\'s a good [[2]] to go through it?',
        blanks: [['detail'], ['time']],
        distractors: ['trouble', 'offline'],
      },
      {
        kind: 'tapBuild',
        prompt: 'You\'re running a meeting and two people are deep in a detailed argument. Build what you say.',
        tiles: ['Great', 'point.', 'Can', 'you', 'two', 'take', 'this', 'offline', 'after', 'the', 'meeting?'],
        distractors: ['forever'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever felt shut down in a meeting, class or group chat? Looking back, which of the four reasons might it have been?',
    starters: ['It happened when...', 'It was probably...', 'Next time I\'d...'],
  },
  deepen: {
    title: 'Use it yourself',
    summary: 'Next time a group conversation gets stuck on a detail only two people care about, try: "Shall we take this offline?" Then book the time straight away.',
  },
  notes: '"Take offline" (Cambridge Business English: discuss later, privately or in a smaller group). Reasons list is a teaching framework, not a cited taxonomy.',
};

export default lesson;
