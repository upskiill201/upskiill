import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 1 — free. The hook: the careers fair, and "I don't have any experience." */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"I don\'t have any experience"',
  summary: 'The careers fair. A recruiter from the company Clinton most wants to work for asks one question: "So what can you do?" He gives the answer almost every student gives, and watches it fall flat.',
  minutes: 11,
  outcomes: ['Spot why "I don\'t have any experience" is almost never true', 'Name three things you\'ve done that count', 'Answer "What can you do?" with one real example'],
  learn: [
    {
      kind: 'story',
      title: 'Stand 14',
      beats: [
        { speaker: 'narrator', text: 'University of Buea, the main hall. Careers fair day. Eight months until graduation. Clinton has been circling stand 14 for twenty minutes: Njangi Pay, the Douala fintech everyone wants to work for.' },
        { speaker: 'narrator', text: 'He finally walks up. The recruiter, Brenda Fon, looks up from her laptop and smiles.' },
        { speaker: 'brenda', text: 'Hi! Final year? Great. So, what can you do?' },
        { speaker: 'clinton', text: 'Well, I don\'t have any experience yet. I mean, I haven\'t done an internship. But I\'m a fast learner!' },
        { speaker: 'narrator', text: 'Brenda nods politely, hands him a leaflet, and turns to the next student. The whole conversation took fifteen seconds.' },
        { speaker: 'narrator', text: 'That night, Clinton video-calls Miracle in Lagos. She leads a team at Afiya now, and she hires people.' },
        { speaker: 'miracle', text: 'Clinton. You run a tech meet-up with forty people. You organise the football fixtures for the whole faculty. You run a WhatsApp group of 300 students without it turning into chaos. And you told her you have NO experience?' },
      ],
      choice: {
        prompt: 'What should Clinton do next?',
        options: [
          {
            text: 'Write down everything he\'s actually done, and work out what it proves.',
            outcome: 'Miracle grins. "Good. Tonight, write the list. Tomorrow, we turn it into skills." That list becomes the start of everything else in this course.',
            best: true,
          },
          {
            text: 'Wait until he has an internship, then go back to Brenda.',
            outcome: 'To get the internship, he\'ll be asked the same question. "No experience" is a loop. The way out is seeing what he already has.',
          },
          {
            text: 'Next time, say he has lots of experience and hope she doesn\'t ask.',
            outcome: 'She will ask. Recruiters always ask "Tell me about that." Vague claims fall apart in one question. Real examples don\'t.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: '"I don\'t have experience" usually means "I don\'t have a job title yet." Clubs, family business, sport, volunteering, caring for family, group projects: it all counts as experience.',
    },
    {
      kind: 'text',
      html: '<p><strong>Through this course, you build your own career kit.</strong> Every chapter adds a real piece, in your own words: your skills, your proof, your CV, your cover letter, your profile, your interview stories. Clinton builds his. You build yours.</p>',
    },
  ],
  apply: {
    scenario: 'The night after the careers fair.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Clinton\'s answer fall flat?',
        options: [
          { text: 'Brenda only talks to people with internships', why: 'She talked to him. She just had nothing to remember him by.' },
          { text: 'He gave her nothing specific to remember' },
          { text: 'He was too confident', why: 'The opposite: he talked himself down.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it count as experience?',
        groups: ['Counts', 'Doesn\'t count'],
        items: [
          { text: 'Running a 40-person tech meet-up', group: 0 },
          { text: 'Helping in the family shop every Saturday', group: 0 },
          { text: 'Scrolling job adverts', group: 1 },
          { text: 'Organising the faculty football fixtures', group: 0 },
          { text: 'Thinking about starting a club', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'brenda',
        message: 'So, what can you do?',
        options: [
          { text: 'I don\'t have any experience yet, but I\'m a fast learner.', why: 'Every student says this. It gives her nothing to remember.' },
          { text: 'Anything you need!', why: 'Too vague to believe. Give one real example.' },
          { text: 'I organise people. I grew our campus tech meet-up from 6 to 40 members this year.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What does "I don\'t have any experience" usually really mean?',
        options: [
          { text: 'I haven\'t had a job title yet' },
          { text: 'I can\'t do anything', why: 'Almost nobody can do nothing. Most people just haven\'t noticed what they can do.' },
          { text: 'I\'m not ready to apply', why: 'Students apply every day without job titles. What matters is proof of what you can do.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the line that talks Clinton down.',
        lines: ['I run a tech meet-up with 40 members.', 'I haven\'t really done anything important.', 'I organise the faculty football fixtures every term.'],
        bug: 1,
        explanation: 'The other two lines are real, specific things he did. This one erases them.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match what Clinton did to what it shows.',
        pairs: [
          ['Grew the meet-up to 40 people', 'He can bring people together'],
          ['Runs a 300-person WhatsApp group', 'He can keep a big group organised'],
          ['Plans football fixtures', 'He can plan and schedule'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s advice.',
        template: 'Write down everything you\'ve [[1]], then work out what it [[2]].',
        blanks: [['done'], ['proves', 'shows']],
        distractors: ['wanted', 'costs', 'hides'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Brenda\'s question was "So, what can you ___?" (one word)',
        answers: ['do'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which careers-fair answer would Brenda remember?',
        options: [
          { text: '"I\'m hardworking and passionate."', why: 'Everyone says this. No proof, nothing to remember.' },
          { text: '"I keep our 300-student WhatsApp group running without chaos, and I\'d love to do that kind of organising at Njangi Pay."' },
          { text: '"I\'m not sure, what do you need?"', why: 'Puts the work on her. Bring one example.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Specific or vague?',
        groups: ['Specific', 'Vague'],
        items: [
          { text: 'I grew a meet-up from 6 to 40 people', group: 0 },
          { text: 'I\'m a people person', group: 1 },
          { text: 'I help run my aunt\'s shop on Saturdays', group: 0 },
          { text: 'I\'m good at lots of things', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Start your own list tonight. Write down five things you\'ve done in the last two years: clubs, family, church, sport, school projects, side hustles, caring for someone. Anything.',
    starters: ['1. I...', 'Something I\'ve done that I never counted is...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Ask one friend or family member: "What do you think I\'m good at?" Write down exactly what they say. You\'ll use it in lesson 4.',
  },
  notes: 'Clinton, Miracle, David and Kofi are shared cast (CAST.md). Clinton is 21, final-year Computer Science at the University of Buea (three-year bachelor). Brenda Fon (Njangi Pay recruiter) and Njangi Pay (fictional Douala fintech; a njangi is a Cameroonian rotating savings group) are new and course-only. Miracle leads a team at Afiya by now (How to Motivate a Team).',
};

export default lesson;
