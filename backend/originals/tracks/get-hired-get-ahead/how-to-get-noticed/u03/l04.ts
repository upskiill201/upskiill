import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 3 · Lesson 4 — the sections of a graduate CV. Step-by-step. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The sections of a graduate CV',
  summary: 'Mrs Ewane draws a rectangle on her whiteboard and splits it into seven boxes. "Every graduate CV I\'ve ever liked had these, in roughly this order. Your job is to fill them, not to invent new ones."',
  minutes: 12,
  outcomes: ['Name the sections of a graduate CV', 'Put them in an order that shows your best proof first', 'Decide what goes in each section'],
  learn: [
    {
      kind: 'steps',
      title: 'Seven boxes, top to bottom',
      steps: [
        { title: '1. Name and contact', body: 'Your name, big. Then a professional email, a phone number, your city, and one link (LinkedIn or portfolio). Not your full address, date of birth or ID number.' },
        { title: '2. Profile (two lines)', body: 'Who you are and your strongest proof, in two lines. "Final-year Computer Science student. Built a savings tracker used by 42 people and grew a campus meet-up from 6 to 40 members." Not an "objective" about what you want.' },
        { title: '3. Education', body: 'University, degree, expected graduation date, and anything that helps: a relevant project, a prize, your grade if it\'s good. For graduates, education usually comes near the top.' },
        { title: '4. Projects', body: 'Your portfolio pieces as achievements: the Njangi Tracker, the fixtures sheet. Name, one line of what it does, one line of the result, and a link. For graduates with little work history, this is often the strongest section.' },
        { title: '5. Experience', body: 'Jobs, internships, volunteering and leadership roles, newest first. Role, organisation, dates, and two or three achievement bullets each. The phone stall and the meet-up both go here.' },
        { title: '6. Skills', body: 'A short list grouped by type, with honest levels: "Languages: English (native), French (intermediate). Technical: JavaScript, Python, Git." No skill bars or percentages.' },
        { title: '7. Extras (optional)', body: 'Only if they add proof: awards, certificates, a sport you captain. Skip "hobbies: reading, music, travel."' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'The order can flex. If your projects are stronger than your education, move Projects up. Best proof first, always.',
    },
  ],
  apply: {
    scenario: 'Mrs Ewane\'s seven boxes.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the usual graduate CV sections in order.',
        lines: ['Name and contact', 'Profile', 'Education', 'Projects', 'Experience', 'Skills', 'Extras'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Belongs in the contact section, or leave it out?',
        groups: ['Include', 'Leave out'],
        items: [
          { text: 'A professional email address', group: 0 },
          { text: 'Your national ID number', group: 1 },
          { text: 'Your city', group: 0 },
          { text: 'Your full home address', group: 1 },
          { text: 'A LinkedIn or portfolio link', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the difference between a profile and an "objective"?',
        options: [
          { text: 'None, they\'re the same', why: 'An objective is about your wishes. A profile is about your value.' },
          { text: 'A profile says who you are and your best proof; an objective says what you want' },
          { text: 'An objective is longer and better', why: 'Recruiters skip objectives. A two-line profile works harder.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each item to its section.',
        pairs: [
          ['Njangi Tracker', 'Projects'],
          ['Saturdays at the phone stall', 'Experience'],
          ['French (intermediate)', 'Skills'],
          ['BSc Computer Science, expected June', 'Education'],
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'My email is coolboy_clint99@... Is that okay?',
        options: [
          { text: 'It\'s fine, it shows personality.', why: 'It\'s the first thing they see. Use your name.' },
          { text: 'Leave the email off.', why: 'Then they can\'t contact you.' },
          { text: 'Make a simple one with your name, like clinton.ndi@... It\'s free and looks professional.' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that doesn\'t belong on Clinton\'s CV.',
        lines: ['Projects: Njangi Tracker, used by 42 people.', 'Hobbies: reading, music, travel.', 'Experience: Organiser, CS Tech Meet-up.'],
        bug: 1,
        explanation: 'A list of likes adds no proof. Use Extras only for things like awards or captaincy.',
      },
      {
        kind: 'mcq',
        prompt: 'Clinton\'s projects are stronger than his grades. What can he do?',
        options: [
          { text: 'Move Projects above Education' },
          { text: 'Leave the order fixed', why: 'The order flexes. Best proof first.' },
          { text: 'Remove Education', why: 'Keep it. Just move his strongest section up.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Clinton\'s skills line.',
        template: 'Languages: English ([[1]]), French ([[2]]).',
        blanks: [['native', 'fluent'], ['intermediate']],
        distractors: ['85%', 'expert', 'basic'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'For graduates with little work history, which section is often the strongest? (one word)',
        answers: ['projects', 'project'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which section does each line go in?',
        groups: ['Profile', 'Experience', 'Extras'],
        items: [
          { text: 'Final-year CS student who built a tracker used by 42 people', group: 0 },
          { text: 'Organiser, CS Tech Meet-up, 2024 to now', group: 1 },
          { text: 'Captain, CS football team', group: 2 },
          { text: 'Volunteer, church women\'s group tracker', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Which of the seven sections would be strongest on your CV? Which would be thinnest, and how could you fill it honestly?',
    starters: ['My strongest section is...', 'My thinnest is... I could add...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Open a blank document and type the seven section headings. Under each, write one thing you\'d put there. That\'s your CV skeleton.',
  },
  notes: 'Graduate CV structure (contact, profile, education, projects, experience, skills, extras) follows common university careers-service templates; order flexes by strength. Personal details to omit vary by country (l12); ID numbers and full addresses are a privacy risk everywhere.',
};

export default lesson;
