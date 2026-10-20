import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 4 · Lesson 18 — read a great cover letter: Remi's Synergix internship letter. Tap to explore. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Read a great cover letter',
  summary: 'Miracle knows someone who landed a competitive internship with a cover letter: Remi, in Nairobi, who got into Synergix\'s Strategy & Operations team. He agreed to share it. Tap each part to see how it works.',
  minutes: 12,
  outcomes: ['Recognise every part of a strong cover letter', 'See the four paragraphs working together', 'Borrow the structure, not the words'],
  learn: [
    {
      kind: 'explore',
      title: 'Tap each part of Remi\'s letter',
      text: 'Dear Synergix Strategy & Operations team,\nLast year our university\'s hostel ran out of water three times in one month, and nobody could say why. I spent a weekend mapping when the tanks emptied and found the cleaners\' schedule clashed with the pump. One timetable change later, it hasn\'t happened since. Synergix untangles that kind of problem for whole supply chains, which is why I\'m applying for your 12-week Strategy & Operations internship.\nI\'ve followed your work on delivery times across East Africa, and your recent post about fixing late refunds stuck with me: the problem was a handover between two teams, not any one person.\nYou\'re looking for interns who can work with data and explain it to people who don\'t love spreadsheets. In my final-year project I analysed 6 months of matatu route data for a Nairobi SACCO and presented it to the drivers\' committee in Swahili and English; they changed two routes.\nI\'d love to talk about how I could help your team. Thank you for reading.\nKind regards,\nRemi',
      hotspots: [
        { phrase: 'Dear Synergix Strategy & Operations team,', note: 'No name found, so the specific team instead. Much better than "To whom it may concern".' },
        { phrase: 'our university\'s hostel ran out of water three times in one month', note: 'The hook: a picture you can see, and a problem with tension.' },
        { phrase: 'One timetable change later, it hasn\'t happened since.', note: 'Action and result in a sentence, before he names the role.' },
        { phrase: 'Synergix untangles that kind of problem for whole supply chains', note: 'The bridge from his small story to their big work.' },
        { phrase: 'your recent post about fixing late refunds', note: '"Why them" with a real detail from research. It passes the swap-the-name test.' },
        { phrase: 'You\'re looking for interns who can work with data and explain it', note: '"Why you": he names their need in their words, then proves it.' },
        { phrase: 'they changed two routes', note: 'The proof has a result. Real people did something differently because of him.' },
        { phrase: 'I\'d love to talk about how I could help your team.', note: 'A calm, confident close. No apology, no demand.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Notice what Remi left out: no "I am writing to apply", no adjectives, no CV repeated. About 200 words, and every one works.',
    },
  ],
  apply: {
    scenario: 'Clinton studies Remi\'s letter.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each part of Remi\'s letter to its paragraph.',
        pairs: [
          ['The hostel ran out of water', 'The hook'],
          ['Your recent post about late refunds', 'Why them'],
          ['Analysed matatu route data; they changed two routes', 'Why you'],
          ['I\'d love to talk about how I could help', 'The close'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does Remi\'s opening work so well?',
        options: [
          { text: 'It\'s a real problem he solved, with a result, bridged to what Synergix does' },
          { text: 'It\'s funny', why: 'It\'s engaging, but the key is problem, action, result and bridge.' },
          { text: 'It names the role first', why: 'The role comes last, after the story.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'In Remi\'s letter, or left out on purpose?',
        groups: ['In his letter', 'Left out'],
        items: [
          { text: 'A real detail from Synergix\'s news', group: 0 },
          { text: '"I am writing to apply"', group: 1 },
          { text: 'A proof with a result', group: 0 },
          { text: 'A list of adjectives', group: 1 },
          { text: 'His whole CV in sentences', group: 1 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which line would weaken Remi\'s letter if he added it?',
        lines: ['I analysed 6 months of route data for a SACCO.', 'I am a passionate, results-driven team player.', 'They changed two routes.'],
        bug: 1,
        explanation: 'Adjectives. His proof already shows all of it.',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Remi\'s letter is amazing. Can I copy his structure?',
        options: [
          { text: 'The structure, yes: hook, why them, why you, close. The words and stories have to be mine.' },
          { text: 'I\'ll copy his words and change the names.', why: 'That\'s his story. Borrow the shape, not the content.' },
          { text: 'No, every letter must be totally different.', why: 'The four-part shape works for everyone.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'How does Remi handle not knowing the recruiter\'s name?',
        options: [
          { text: 'He addresses the specific team: "Dear Synergix Strategy & Operations team"' },
          { text: '"To whom it may concern"', why: 'He avoids that.' },
          { text: 'No greeting', why: 'He uses the team name.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What should Clinton borrow from Remi for his Njangi Pay letter?',
        options: [
          { text: 'A real detail from Njangi Pay\'s news in "why them", and a proof with a clear result' },
          { text: 'The water-tank story', why: 'That\'s Remi\'s story. Clinton has the njangi book.' },
          { text: 'Swahili', why: 'Fit the language to your audience, not Remi\'s.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Remi\'s proof.',
        template: 'I analysed 6 months of [[1]] route data and presented it to the drivers\' committee; they changed two [[2]].',
        blanks: [['matatu'], ['routes']],
        distractors: ['bus', 'rules', 'prices'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'About how many words is Remi\'s letter? (a number, roughly)',
        answers: ['200', 'about 200', '250', 'around 200'],
        placeholder: 'A number',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s letter in order.',
        lines: ['Greeting to the team', 'The water-tank story and the bridge', 'Why Synergix: the late-refunds post', 'Why Remi: route data, two routes changed', 'Close and sign-off'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s your version of Remi\'s water-tank story: a real problem you noticed and helped fix?',
    starters: ['The problem was...', 'I helped by...', 'Since then...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Rewrite your own opening using Remi\'s pattern: a problem with tension, what you did, the result, and the bridge to the company.',
  },
  notes: 'Remi (shared cast; 21, Nairobi, final-year CS) does a 12-week Strategy & Operations internship at Synergix after graduating (CAST.md, Corporate Jargon). His letter is fictional and consistent with that story; the late-refunds reference nods to How to Lead Without Being the Boss. Matatu = Kenyan minibus; SACCO = savings and credit cooperative.',
};

export default lesson;
