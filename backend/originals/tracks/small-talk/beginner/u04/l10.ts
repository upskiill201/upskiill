import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 10 — Unit Challenge. The meetup, take two. Cliffhanger into Chapter 5. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Unit Challenge: the meetup, take two',
  summary: 'Thursday, two weeks later. Same mill, same fairy lights, same samosas. Grace walks in with a plan: pause, scan, three conversations, one introduction, a kind exit, and follow-ups tomorrow.',
  minutes: 14,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every event skill in one evening',
    'Join a group, answer "what do you do?", introduce people and leave well',
    'Follow up the next day',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Thursday, 6:30 p.m., Ancoats, again',
      beats: [
        { speaker: 'narrator', text: 'Grace stops inside the door. Three seconds. She breathes. She scans. Someone alone by the window. An open group of three near the drinks. A queue at the bar.' },
        { speaker: 'narrator', text: 'The samosa table calls to her. She ignores it. Mostly.' },
        { speaker: 'grace', text: '(Goal: three real conversations, one introduction, home by nine.)' },
        { speaker: 'tey', text: "Two weeks ago: one conversation, about snacks. Tonight: everything from this chapter. Let's see Grace go." },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge. The meetup, take two.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Where should Grace start?',
        options: [
          { text: 'The samosa table', why: 'Tempting. Not tonight.' },
          { text: 'A tight circle in a serious conversation', why: 'Closed shape.' },
          { text: 'The person alone by the window' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(to the woman by the window) First time at one of these?',
        prompt: 'She says: "Second. The first time I hid by the samosas." Grace\'s reply?',
        options: [
          { text: 'Weird.', why: 'You did exactly the same thing!' },
          { text: 'Okay.', why: 'Dropped ball, and a perfect hook missed.' },
          { text: 'Me too! Two weeks ago, a whole hour. I\'m Grace. What brought you back?' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'She asks, "So what do you do?" Grace\'s answer?',
        options: [
          { text: '"Just a junior, sorry."', why: 'No shrinking.' },
          { text: '"I make sure our hospital app works for patients. Eighteen years as a nurse helps. What brings you here?"' },
          { text: '"I leverage patient-journey synergies."', why: 'Femi\'s jargon is contagious.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Grace joins the open group near the drinks. Put her moves in order.',
        lines: ['Stand in the gap', 'Catch someone\'s eye with a smile', 'Listen for a minute', 'Add something at a pause'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which skill is Grace using?',
        groups: ['Joining a group', 'Introducing people', 'Leaving well'],
        items: [
          { text: 'Standing in the gap', group: 0 },
          { text: 'Name + detail + connection', group: 1 },
          { text: '"I\'m going to grab a drink. Lovely to meet you!"', group: 2 },
          { text: 'Listening before speaking', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Grace\'s first move inside the door: ___ for three seconds. (one word)',
        answers: ['pause', 'stop', 'breathe'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'grace',
        message: '(Ravi arrives and waves.)',
        prompt: 'Grace introduces Ravi to the woman from the window, Chloe, a designer. Best introduction?',
        options: [
          { text: 'Chloe, this is Ravi, a developer moving into health tech. Ravi, Chloe designs patient apps. You two should talk.' },
          { text: 'This is Ravi.', why: 'Names only.' },
          { text: 'Ravi hid by the samosas once too, ha!', why: 'Introduce people at their best.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s exit from a long chat. Which line spoils it?',
        lines: [
          'This has been great. I promised myself three conversations tonight.',
          'Good luck with the launch, Chloe!',
          '(stays and hovers for six minutes)',
        ],
        bug: 2,
        fix: '(walks to the drinks with a smile)',
        explanation: 'After a kind exit line, go. Hovering undoes it.',
      },
      {
        kind: 'mcq',
        prompt: '9:00 p.m. Goal reached: three conversations and one introduction. What now?',
        options: [
          { text: 'Stay until midnight to "make the most of it"', why: 'Goal met. Leaving on a high is fine.' },
          { text: 'Go home happy, as planned' },
          { text: 'One more lap of the samosas', why: 'Well. Maybe one.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the chapter tool.',
        pairs: [
          ['Choosing the woman by the window', 'Walking into a room'],
          ['Answering with a hook', '"What do you do?"'],
          ['Chloe meets Ravi', 'Introducing people'],
          ['Messages the next morning', 'The follow-up'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Friday morning. Grace\'s follow-up to Chloe?',
        options: [
          { text: '"Can you get me a job at your company?"', why: 'Far too soon.' },
          { text: 'Nothing; she\'ll remember', why: 'By Wednesday, she won\'t.' },
          { text: '"Hi Chloe, it was great to meet a fellow samosa survivor last night. Good luck with the patient app launch! Grace"' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Two weeks ago, or tonight?',
        groups: ['Two weeks ago', 'Tonight'],
        items: [
          { text: 'An hour at the snack table', group: 0 },
          { text: 'Three conversations and an introduction', group: 1 },
          { text: '"I\'m just a junior, sorry"', group: 0 },
          { text: 'Follow-ups the next morning', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Grace\'s event formula.',
        template: 'Pause, [[1]], start easy. Join at a [[2]]. Leave on a [[3]]. Follow up tomorrow.',
        blanks: [['scan'], ['pause', 'gap'], ['high']],
        distractors: ['run', 'low'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Grace\'s message to Femi on the way home.',
        tiles: ['Three', 'conversations,', 'one', 'intro,', 'zero', 'samosas.', 'Mostly.'],
        distractors: ['hid'],
      },
    ],
  },
  reflect: {
    prompt: 'Grace changed a lot in two weeks. What\'s the one event skill from this chapter you most want to try?',
    starters: ['The skill I want to try is...', 'I\'ll try it at...'],
  },
  deepen: {
    title: 'Coming up in Chapter 5: from small talk to real talk',
    summary: 'Grace now actually enjoys talking to strangers, which worries Jayden. But small talk is starting to turn into something bigger: a colleague\'s bad news, a joke that doesn\'t land, a parents\' evening, and the biggest tech conference in Manchester, where Grace is about to meet someone very interesting in the coffee queue.',
  },
  notes: 'Unit Challenge: reviews Chapter 4 plus earlier. Chloe is a named extra.',
};

export default lesson;
