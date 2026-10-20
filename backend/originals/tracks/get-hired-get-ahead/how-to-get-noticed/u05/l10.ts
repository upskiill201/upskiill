import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 5 · Lesson 10 — Checkpoint 2. Reviews lessons 6–9. Story beat: David's profile. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Checkpoint: David\'s profile',
  summary: 'David has never opened LinkedIn. His research placement interview is in two weeks, and the hospital\'s coordinator said she\'d "have a look at him". Clinton builds David\'s profile with him on a Sunday afternoon. About, experience, skills and links, mixed together.',
  minutes: 13,
  milestone: 'CHECKPOINT',
  outcomes: ['Write an About section that hooks', 'Add non-job experience and Featured proof', 'Keep skills, recommendations and links honest and clean'],
  learn: [
    {
      kind: 'story',
      title: 'Sunday afternoon',
      beats: [
        { speaker: 'narrator', text: 'Sunday. David\'s room, two laptops, a pile of anatomy notes. The hospital\'s research coordinator emailed: "I\'ll have a look at your LinkedIn before we meet."' },
        { speaker: 'david', text: 'I don\'t have a LinkedIn. Is it too late?' },
        { speaker: 'clinton', text: 'Two weeks is loads. I did mine in a weekend. Photo by the window, then headline, About, experience, Featured, link. Let\'s go.' },
        { speaker: 'tey', text: 'Teaching it is the best test. Let\'s build David\'s profile.' },
      ],
    },
  ],
  apply: {
    scenario: 'Checkpoint 2: build David\'s profile.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Pick David\'s About opening.',
        options: [
          { text: '"Welcome to my profile."', why: 'Wastes the first line.' },
          { text: '"I\'m a third-year medical student who loves explaining hard things simply, to first-years and to patients."' },
          { text: '"David is a hardworking medical student."', why: 'Third person, adjectives.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Goes in David\'s Experience, or not?',
        groups: ['Yes', 'No'],
        items: [
          { text: 'Volunteer, clinic waiting-room sign-in', group: 0 },
          { text: 'Organiser, campus blood drive', group: 0 },
          { text: 'Tutor, anatomy study group', group: 0 },
          { text: '"Doctor" (he isn\'t yet)', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the skill David should remove.',
        lines: ['Anatomy tutoring', 'Patient communication', 'Neurosurgery'],
        bug: 2,
        explanation: 'He\'s a third-year student. Only list skills he could be tested on.',
      },
      {
        kind: 'mcq',
        prompt: 'What should David pin in Featured?',
        options: [
          { text: 'A short write-up of the blood drive: 60 donors in one day' },
          { text: 'A photo of his textbooks', why: 'Shows nothing he did.' },
          { text: 'Nothing', why: 'Featured is free space for his best proof.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'Who should I ask for a recommendation?',
        options: [
          { text: 'The clinic nurse who supervised you: ask for two lines about the sign-in system.' },
          { text: 'Your mum.', why: 'Family recommendations don\'t carry weight. Ask a supervisor.' },
          { text: 'Nobody, it\'s awkward.', why: 'A specific ask isn\'t awkward. It\'s normal.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each About line to its job.',
        pairs: [
          ['I love explaining hard things simply', 'Hook'],
          ['I organised a blood drive with 60 donors', 'Proof'],
          ['I\'m looking for a summer research placement', 'What he wants next'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Clean link or messy link?',
        groups: ['Clean', 'Messy'],
        items: [
          { text: 'linkedin.com/in/davidmbah', group: 0 },
          { text: 'linkedin.com/in/david-m-91f2a7c0', group: 1 },
          { text: 'linkedin.com/in/ngumfru', group: 0 },
          { text: 'linkedin.com/in/medboi2003xx', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'David\'s profile says "Blood drive: 100 donors"; his CV says 60. What now?',
        options: [
          { text: 'Fix the profile to 60. They must match, and 60 is the truth.' },
          { text: 'Change the CV to 100', why: 'That makes both wrong.' },
          { text: 'Leave it, nobody compares', why: 'The coordinator is literally going to look.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Clinton\'s checklist for David.',
        template: 'Photo, headline, About, [[1]], Featured, [[2]].',
        blanks: [['experience'], ['link']],
        distractors: ['hobbies', 'followers', 'memes'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'In which person should David write his About? (first or third)',
        answers: ['first', 'first person'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'It\'s done! Should I add my home address so they can find me?',
        options: [
          { text: 'No: email and city are enough. Keep your address and personal number private.' },
          { text: 'Yes, and your phone number too.', why: 'Not on a public profile.' },
          { text: 'Add your ID number for trust.', why: 'Never.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Who do you know who doesn\'t have a professional profile yet? What\'s the first thing you\'d help them add?',
    starters: ['I could help...', 'First I\'d add...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Help one friend set up or fix their profile using the Sunday-afternoon checklist: photo, headline, About, experience, Featured, link.',
  },
  notes: 'Checkpoint 2 of Chapter 5 reviews l06–l09. David\'s surname Mbah is introduced in his example link (Cameroonian surname). These exercises double as Jump ahead / placement questions.',
};

export default lesson;
