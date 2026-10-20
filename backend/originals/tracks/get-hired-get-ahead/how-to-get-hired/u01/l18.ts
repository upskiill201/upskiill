import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 18 — read a job advert and match your skills to it (tap to explore). */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Read a job advert',
  summary: 'Njangi Pay\'s graduate advert is 300 words long. Miracle shows Clinton how to read it like a recruiter: what\'s required, what\'s a wish, and what the company is really worried about.',
  minutes: 12,
  outcomes: ['Find what an advert really asks for', 'Tell "must have" from "nice to have"', 'Match your evidence to each requirement'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of Njangi Pay\'s advert',
      text: 'Graduate Developer, Douala. We\'re growing fast and need people who can learn quickly. You\'ll work with our product team to build features used by 200,000 savings groups. You must have: a degree in Computer Science or a related field, experience building at least one project in JavaScript or Python, and clear written communication. Nice to have: experience with APIs, automated testing, French. You\'ll thrive here if you stay calm when things break and enjoy explaining technical ideas to non-technical colleagues.',
      hotspots: [
        { phrase: 'We\'re growing fast and need people who can learn quickly.', note: 'What they\'re worried about: things change fast. Your proof of learning quickly (a gap you closed, a tool you taught yourself) speaks directly to this.' },
        { phrase: 'You must have:', note: 'The real requirements. Make sure you can show proof for every one of these.' },
        { phrase: 'experience building at least one project in JavaScript or Python', note: 'Note "at least one project". Not a job. Clinton\'s fixtures app counts.' },
        { phrase: 'Nice to have: experience with APIs, automated testing, French.', note: 'Wishes, not requirements. Missing them is normal. An honest level or a gap plan is enough.' },
        { phrase: 'stay calm when things break and enjoy explaining technical ideas to non-technical colleagues', note: 'Personal qualities they\'ll test in the interview. Clinton\'s phone-stall stories fit perfectly.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Make a two-column table: what the advert asks for, and your proof for each. Any empty "must have" row is your top priority. Empty "nice to have" rows are normal.',
    },
  ],
  apply: {
    scenario: 'Clinton reads the Njangi Pay advert.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Must have or nice to have, in Njangi Pay\'s advert?',
        groups: ['Must have', 'Nice to have'],
        items: [
          { text: 'A Computer Science or related degree', group: 0 },
          { text: 'French', group: 1 },
          { text: 'At least one JavaScript or Python project', group: 0 },
          { text: 'Automated testing', group: 1 },
          { text: 'Clear written communication', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is "We\'re growing fast and need people who can learn quickly" really telling Clinton?',
        options: [
          { text: 'Nothing, it\'s just filler', why: 'Adverts often hide their biggest worry in lines like this.' },
          { text: 'Their worry: things change fast. Proof that he learns quickly will land.' },
          { text: 'They want someone who types quickly', why: 'Learning quickly, not typing quickly.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each requirement to Clinton\'s proof.',
        pairs: [
          ['A JavaScript or Python project', 'His fixtures app'],
          ['Clear written communication', 'The daily update for 300 students'],
          ['Calm when things break', 'Calming customers at the phone stall'],
          ['Explaining tech to non-technical people', 'Explaining repairs to customers'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'I don\'t have APIs, testing OR proper French. Should I even apply?',
        options: [
          { text: 'Yes. Those are all "nice to have". You have proof for every "must have".' },
          { text: 'No, wait until you have everything.', why: 'Adverts are wish lists. He meets every must-have.' },
          { text: 'Apply and say you have them.', why: 'Never. Apply honestly and show your gap plans.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line where Clinton misreads the advert.',
        lines: ['They need at least one project, so my fixtures app counts.', 'They want five years of work experience.', 'French is a plus, not a must.'],
        bug: 1,
        explanation: 'The advert never says that. It\'s a graduate role: they ask for one project, not years of work.',
      },
      {
        kind: 'mcq',
        prompt: 'In Clinton\'s two-column table, which empty row is his top priority?',
        options: [
          { text: 'An empty "must have" row' },
          { text: 'An empty "nice to have" row', why: 'Those are normal. Must-haves come first.' },
          { text: 'Neither, empty rows don\'t matter', why: 'An empty must-have could stop the application.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s method.',
        template: 'Column one: what the advert [[1]] for. Column two: your [[2]] for each.',
        blanks: [['asks'], ['proof', 'evidence']],
        distractors: ['pays', 'excuse', 'grade'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Requirements you can be missing without worrying are called "nice to ___". (one word)',
        answers: ['have'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which personal quality does each advert line point to?',
        groups: ['Calm under pressure', 'Explaining clearly', 'Learning fast'],
        items: [
          { text: '"Stay calm when things break"', group: 0 },
          { text: '"Explaining technical ideas to non-technical colleagues"', group: 1 },
          { text: '"We need people who can learn quickly"', group: 2 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which story should Clinton prepare for "stay calm when things break"?',
        options: [
          { text: 'The night the meet-up venue cancelled an hour before 40 people arrived, and he moved it to the library' },
          { text: 'His grades in Data Structures', why: 'Not about staying calm when things break.' },
          { text: 'His favourite football team', why: 'No link to the requirement.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Find one real job advert you\'d like. Make the two-column table. Which must-have do you have the best proof for?',
    starters: ['The advert asks for...', 'My best proof is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Do the two-column table for three different adverts. Which skills show up in all three? Those are the ones to lead with.',
  },
  notes: 'Njangi Pay and its advert are fictional. "200,000 savings groups" is the fictional company\'s own claim. "Must have" vs "nice to have" reading is standard careers-service guidance.',
};

export default lesson;
