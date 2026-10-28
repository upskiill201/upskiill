import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 1 — opens the chapter: "I am writing to apply..." */
const lesson: OriginalLesson = {
  key: 'l01',
  title: '"I am writing to apply"',
  summary: 'Njangi Pay\'s form has a box: "Cover letter (optional, but we read them)." Clinton\'s first draft opens "I am writing to apply for the position of Graduate Developer as advertised on your website." Miracle sighs. She\'s read this letter a thousand times.',
  minutes: 12,
  outcomes: ['Explain why the default opening wastes the most-read line', 'Spot what makes a cover letter forgettable', 'Decide whether to send an "optional" cover letter'],
  learn: [
    {
      kind: 'story',
      title: 'A thousand times',
      beats: [
        { speaker: 'narrator', text: 'Monday. Five months to graduation. Njangi Pay\'s graduate applications open. Below the CV upload: "Cover letter (optional, but we read them)."' },
        { speaker: 'narrator', text: 'Clinton opens a blank page and types what everyone types: "Dear Sir/Madam, I am writing to apply for the position of Graduate Developer as advertised on your website. I am a hardworking and passionate final-year student..."' },
        { speaker: 'miracle', text: 'I\'ve read this letter a thousand times. Never by you. The first line tells me you\'re applying. I know. You\'re in the application form.' },
        { speaker: 'clinton', text: 'But it\'s optional. Maybe I just skip it?' },
        { speaker: 'miracle', text: '"Optional, but we read them" means: the people who bother will stand out. A good letter is your chance to say what a CV can\'t. Why THEM. Why YOU. In your voice.' },
      ],
      choice: {
        prompt: 'What should Clinton do?',
        options: [
          {
            text: 'Write a real letter that opens with something only he could say.',
            outcome: 'He deletes "I am writing to apply" and starts again: "My mum\'s savings group kept its accounts in a school exercise book until I built them a tracker." Miracle: "Now I\'m reading."',
            best: true,
          },
          {
            text: 'Skip it. It says optional.',
            outcome: 'Skipping is allowed, but when two CVs look similar, the person who wrote a good letter usually wins the closer look.',
          },
          {
            text: 'Download a template and change the company name.',
            outcome: 'Brenda reads hundreds. Templates sound like templates. It\'s the same as "I am writing to apply", just longer.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'The first line of a cover letter is its most-read line. Don\'t spend it saying you\'re applying. Say something only you could say.',
    },
  ],
  apply: {
    scenario: 'Clinton starts his cover letter.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why is "I am writing to apply for..." a weak opening?',
        options: [
          { text: 'It\'s rude', why: 'It\'s polite, just empty.' },
          { text: 'It tells them what they already know, in the most-read line' },
          { text: 'It\'s too short', why: 'Length isn\'t the issue. It says nothing new.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Forgettable or memorable opening?',
        groups: ['Forgettable', 'Memorable'],
        items: [
          { text: 'I am writing to apply for the role of Graduate Developer.', group: 0 },
          { text: 'My mum\'s savings group kept its accounts in an exercise book until I built them a tracker.', group: 1 },
          { text: 'Please find attached my CV.', group: 0 },
          { text: 'I am a hardworking and passionate student.', group: 0 },
          { text: 'Every month, twelve women argued about who had paid. Then I built something.', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'It says optional. Is it worth my time?',
        options: [
          { text: 'No, optional means pointless.', why: 'They said they read them. That\'s an invitation.' },
          { text: 'Only if I have nothing else to do.', why: 'It\'s one of the few places he gets to speak in his own voice.' },
          { text: 'Yes: "optional, but we read them" means a good letter helps me stand out.' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'What can a cover letter say that a CV can\'t?',
        options: [
          { text: 'Why this company, and why you, in your own voice' },
          { text: 'Your hobbies in detail', why: 'Not hobbies: why them and why you.' },
          { text: 'Your whole CV again, in sentences', why: 'Repeating the CV wastes the letter.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the sentence that wastes the letter.',
        lines: ['I built a tracker that ended my mum\'s njangi\'s monthly arguments.', 'Please find attached my CV, which lists my skills.', 'That\'s why Njangi Pay\'s mission matters to me.'],
        bug: 1,
        explanation: 'They can see the CV. Use the space to say something new.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each habit to a better one.',
        pairs: [
          ['"I am writing to apply"', 'Open with your own story'],
          ['"Dear Sir/Madam"', 'Use a name or "Dear Njangi Pay team"'],
          ['"I am hardworking and passionate"', 'Show proof instead'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Miracle\'s advice.',
        template: 'Say what a CV [[1]]: why [[2]], why you.',
        blanks: [['can\'t', 'cannot'], ['them']],
        distractors: ['can', 'me', 'now'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which opening would Brenda keep reading?',
        options: [
          { text: '"To whom it may concern, I wish to apply..."', why: 'Formal and empty.' },
          { text: '"Every month, my mum\'s savings group argued about who had paid. I built them a tracker. Njangi Pay is building that for 200,000 groups, and I want to help."' },
          { text: '"I saw your advert and decided to apply."', why: 'True, but tells her nothing.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'The most-read line of a cover letter is the ___ line. (one word)',
        answers: ['first', 'opening'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Does it belong in a cover letter?',
        groups: ['Belongs', 'Doesn\'t'],
        items: [
          { text: 'Why you want THIS company', group: 0 },
          { text: 'Your CV, copied out in full', group: 1 },
          { text: 'One or two stories that prove you fit', group: 0 },
          { text: 'A list of adjectives about yourself', group: 1 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'For a job you want, write a first line only you could write. What story would you start with?',
    starters: ['My first line would be...', 'It\'s mine because...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Search for "cover letter example" and read the first lines of five. How many start with "I am writing to apply"? That\'s what you\'re competing with.',
  },
  notes: '"Optional, but we read them" is the fictional Njangi Pay\'s form wording. No statistic on how many recruiters read cover letters is claimed (published surveys vary widely and many are vendor-run). Ch4 replaces the cover-letter part of the old Acing Job Interviews plan.',
};

export default lesson;
