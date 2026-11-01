import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 8. Chat with Tey: belonging (social belonging research, Walton & Cohen 2011; inclusion in small acts). */
const lesson: OriginalLesson = {
  key: 'l08',
  title: 'Making people belong',
  summary: 'Halima eats lunch alone most days. The others speak Yoruba or Pidgin at lunch; she\'s from Kano. Nobody means anything by it. Halima told Miracle she sometimes wonders if she\'s "really part of the team". Miracle asks Tey what she can do.',
  minutes: 11,
  outcomes: [
    'Know why belonging matters for motivation',
    'Spot the small, unintended ways people get left out',
    'Build belonging through small, everyday acts',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        {
          tey: 'Has anyone done anything wrong?',
          replies: ['No. Nobody\'s unkind to her.', 'Not on purpose.'],
        },
        {
          tey: "Right. Exclusion is often accidental: a lunch language, an inside joke, a group chat she wasn't added to. But it still lands. Belonging is the \"relatedness\" need from Chapter 1. When people doubt they belong, they often hold back their best ideas.",
          replies: ['Is there research on this?'],
        },
        {
          tey: "Yes. Psychologists Gregory Walton and Geoffrey Cohen (2011) ran a short intervention with new university students. They told them that worrying about belonging at first is normal and usually fades. It was linked to better grades and well-being years later, especially for students who felt like outsiders. Small signals about belonging can matter a lot.",
          replies: ['So what can I do here?'],
        },
        {
          tey: "Small things, done on purpose. Switch the team chat to English, which everyone shares. Invite her to lunch, in a group. Ask her expertise in meetings: \"Halima, how would a nurse see this?\" Tell her it's normal to feel new for a while. And never let her be the only one who adapts.",
          replies: ['What about the jokes in Yoruba?'],
        },
        {
          tey: "Don't ban them: they're part of who Bisi is. Just make sure Halima's in the joke too, sometimes. Ask Bisi to teach her one Yoruba phrase. Ask Halima to teach everyone one in Hausa. Belonging works both ways.",
        },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Exclusion is often accidental. Belonging needs small, deliberate acts: a shared language, invitations, asking their expertise, and "it\'s normal to feel new". Both ways.',
    },
  ],
  apply: {
    scenario: 'Tey and Miracle, about Halima.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why does Halima feel left out, if nobody is unkind?',
        options: [
          { text: 'She\'s too sensitive', why: 'Her feeling is a real signal.' },
          { text: 'She doesn\'t try', why: 'She\'s trying hard.' },
          { text: 'Exclusion is often accidental: language, jokes, who\'s invited' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Builds belonging, or leaves people out?',
        groups: ['Builds belonging', 'Leaves people out'],
        items: [
          { text: 'Team chat in a shared language', group: 0 },
          { text: 'Lunch plans she never hears about', group: 1 },
          { text: '"Halima, how would a nurse see this?"', group: 0 },
          { text: 'Inside jokes she\'s never in on', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'halima',
        message: 'Sometimes I wonder if I\'m really part of this team.',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'You are. And feeling new for a while is really normal, it usually fades. I\'d also love to know what would help.' },
          { text: 'Don\'t be silly.', why: 'Dismisses a real, brave feeling.' },
          { text: 'Try to fit in more.', why: 'Puts all the work on her.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Belonging is the ___ need from Chapter 1. (one word)',
        answers: ['relatedness', 'Relatedness'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the small act to what it does.',
        pairs: [
          ['Shared-language team chat', 'Nobody is shut out of news'],
          ['Ask her nursing view', 'Values what she brings'],
          ['Teach a phrase both ways', 'Belonging, both directions'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What did Walton and Cohen\'s belonging intervention tell students?',
        options: [
          { text: 'That they should try harder', why: 'Not the message.' },
          { text: 'That worrying about belonging at first is normal and usually fades' },
          { text: 'That university is easy', why: 'Not the message.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s belonging plan. Which line puts it all on Halima?',
        lines: [
          'Switch the team chat to English.',
          'Suggest Halima learns Yoruba so she can join in.',
          'Ask for her nursing view in meetings.',
        ],
        bug: 1,
        fix: 'Bisi teaches her a phrase; she teaches everyone one in Hausa.',
        explanation: 'If only Halima adapts, it\'s not belonging. It\'s fitting in.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put building belonging in order.',
        lines: ['Notice who\'s left out', 'Fix the accidental barriers', 'Value what they bring, out loud', 'Make it work both ways'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Exclusion is often [[1]]. Belonging is built on [[2]].',
        blanks: [['accidental'], ['purpose']],
        distractors: ['deliberate', 'accident'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the expertise question.',
        tiles: ['How', 'would', 'a', 'nurse', 'see', 'this?'],
        distractors: ['boss'],
      },
    ],
  },
  reflect: {
    prompt: 'Have you ever felt like an outsider in a group? What small thing someone did (or could have done) made a difference?',
    starters: ['I felt like an outsider when...', 'What helped was...'],
  },
  deepen: {
    title: 'Find one barrier',
    summary: 'Look at a group you\'re in. Is there a language, a chat, a lunch, an inside joke that leaves someone out by accident? Fix one this week.',
  },
  notes: 'Gregory M. Walton & Geoffrey L. Cohen (2011), "A brief social-belonging intervention improves academic and health outcomes of minority students", Science 331(6023); effects hedged. Relatedness need (Deci & Ryan). Inclusion through everyday practices: standard inclusive-leadership guidance. Fictional details.',
};

export default lesson;
