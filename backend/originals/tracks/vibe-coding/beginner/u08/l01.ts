import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 8 · Lesson 1. Story: it only works on my laptop. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'It only works on my laptop',
  summary: 'Showcase week. Ten days to the bus, and the fundraiser dinner is Saturday. Hazel texts the app link to the parents\' group chat. It starts with "localhost". Nobody can open it.',
  minutes: 11,
  outcomes: [
    'Explain why localhost only works on your own computer',
    'Know what "deploying" means',
    'List what has to change for a live app',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tuesday, 7 p.m.',
      beats: [
        { speaker: 'hazel', text: '(group chat) Here\'s the band app! http://localhost:5173' },
        { speaker: 'narrator', text: 'Thirty replies. "Doesn\'t load." "Site can\'t be reached." "Is this a virus?" One grandma: "Is localhost near Metairie?"' },
        { speaker: 'benny', text: 'Miss B. Localhost means YOUR laptop. Only your laptop.' },
        { speaker: 'tey', text: 'Every app so far has lived on Hazel\'s computer. To put it on the internet, at an address anyone can open, you deploy it. And a few settings have to change when you do.' },
        { speaker: 'ruth', text: 'And it goes live after the security pass. Which it passed. So: this week.' },
      ],
      choice: {
        prompt: 'What should Hazel do?',
        options: [
          { text: 'Leave her laptop on all week so parents can use it.', outcome: 'Localhost still only works on her laptop. Leaving it on changes nothing for anyone else.' },
          { text: 'Deploy it properly to a hosting service, with the live settings, then test it on a phone that isn\'t on the school Wi-Fi.', outcome: 'By Thursday there\'s a real address. Benny opens it on the bus. It works.', best: true },
          { text: 'Email the code to every parent.', outcome: 'Thirty confused parents and thirty copies of the app. No.' },
        ],
      },
    },
  ],
  apply: {
    scenario: 'The localhost link.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What does localhost mean?',
        options: [
          { text: 'This computer: the one you\'re using right now' },
          { text: 'A website in your town', why: 'It always means "this computer".' },
          { text: 'A free hosting service', why: 'It\'s not hosted anywhere but your machine.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The word.',
        template: 'Putting an app on the internet, at an address anyone can open, is called [[1]] it.',
        blanks: [['deploying']],
        distractors: ['emailing', 'zipping'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Works for the parents, or only on Hazel\'s laptop?',
        groups: ['Works for parents', 'Only on her laptop'],
        items: [
          { text: 'http://localhost:5173', group: 1 },
          { text: 'A deployed address on a hosting service', group: 0 },
          { text: 'The app running with npm run dev', group: 1 },
          { text: 'The same app, built and deployed', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'benny',
        message: 'Can\'t you just leave your laptop on?',
        prompt: 'Hazel\'s reply?',
        options: [
          { text: 'Good idea.', why: 'localhost still only works on her laptop.' },
          { text: 'Localhost only works on this laptop, on or off. It has to be deployed to a real host.' },
          { text: 'Only at night.', why: 'Time of day doesn\'t matter.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Review from Chapter 5: which login setting still points at the laptop and must change?',
        options: [
          { text: 'The gig table', why: 'Tables don\'t point at addresses.' },
          { text: 'The Site URL in Supabase\'s Authentication settings' },
          { text: 'Her GitHub password', why: 'Unrelated.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the thing to what changes when the app goes live.',
        pairs: [
          ['The address', 'From localhost to a real web address'],
          ['Settings in .env.local', 'Set again on the hosting service'],
          ['Login Site URL', 'Points at the live address'],
          ['Login emails', 'Sent by a proper email service'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line in Hazel\'s launch plan is wrong?',
        lines: [
          'Pass the security pass first.',
          'Deploy to a hosting service.',
          'Copy .env.local into GitHub so the host can read it.',
          'Test on a phone off the school Wi-Fi.',
        ],
        bug: 2,
        fix: 'Set the settings in the host\'s dashboard. Never in GitHub.',
        explanation: 'Settings are added in the hosting service\'s own settings page.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'What one word means "this computer" in a web address?',
        answers: ['localhost'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why test on a phone that\'s NOT on the school Wi-Fi?',
        options: [
          { text: 'It proves the app works for a parent at home, not just inside the building' },
          { text: 'School Wi-Fi is illegal', why: 'It\'s about testing like a real user.' },
          { text: 'Phones are faster at home', why: 'It\'s about reaching the real address.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ruth',
        message: 'Before it goes live, what must be true?',
        prompt: 'Hazel\'s answer?',
        options: [
          { text: 'It looks nice.', why: 'Ruth wants the security pass.' },
          { text: 'Nothing, just ship it.', why: 'Parents\' data is in it.' },
          { text: 'The security pass is all yes, the tests pass, and it\'s committed and pushed.' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Who will be the first person outside your house to open your app? What will you ask them to try?',
  },
  deepen: {
    title: 'Get ready to deploy',
    summary: 'Check your app is ready: security pass done, tests pass, everything committed and pushed to GitHub, no secrets in the repository. Next lesson puts it live.',
  },
  notes: 'localhost resolves to the local machine (127.0.0.1). Metairie is a real suburb of New Orleans (joke).',
};

export default lesson;
