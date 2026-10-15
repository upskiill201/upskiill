import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 18. Card deck: names, titles and how to address people around the world. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Names, titles and how to address people',
  summary: 'Remi is about to write to Mr Kamau. "Dear Mr Kamau"? "Dear Peter"? "Dear Sir"? Then Emeka calls him "Sir", and the board member from London says "Call me Helen." Who gets called what?',
  minutes: 11,
  outcomes: [
    'Choose between first names, titles and surnames',
    'Know how norms differ around the world',
    'Ask politely what someone prefers',
  ],
  learn: [
    {
      kind: 'text',
      html: "<p>Friday afternoon. Remi has the email to Mr Kamau open. The first two words are already a problem: what does he call the CEO?</p>",
    },
    {
      kind: 'text',
      html: "<h3>Titles</h3><ul><li><strong>Mr</strong> (any man), <strong>Mrs</strong> (married woman, if she uses it), <strong>Ms</strong> (any woman: the safe choice if you don't know).</li><li><strong>Dr</strong> and <strong>Prof</strong>: use them if the person has them, especially in health and universities.</li><li>Title + <strong>surname</strong>: \"Mr Kamau\", never \"Mr Peter\" in most places.</li></ul>",
    },
    {
      kind: 'text',
      html: "<h3>Around the world</h3><ul><li><strong>Kenya:</strong> Mr/Mrs/Ms + surname for seniors and people you don't know is common, and first names among peers.</li><li><strong>Nigeria and Ghana:</strong> \"Sir\" and \"Ma\" are common and respectful for seniors and older people.</li><li><strong>UK, US, Australia, many tech companies everywhere:</strong> first names are normal, even for CEOs.</li><li><strong>Many other places:</strong> titles, or family names first. Watch, ask, and follow.</li></ul>",
    },
    {
      kind: 'check',
      question: 'You\'re writing to a woman you\'ve never met and don\'t know if she uses Mrs. Which title?',
      options: ['Mrs', 'Miss', 'Ms'],
      answer: 2,
      explanation: 'Ms works for any woman and doesn\'t depend on marriage.',
    },
    {
      kind: 'text',
      html: "<h3>The three safe moves</h3><ol><li><strong>Start formal:</strong> \"Dear Mr Kamau\".</li><li><strong>Mirror:</strong> if they sign \"Peter\" or say \"call me Helen\", switch to the first name.</li><li><strong>Ask, if unsure:</strong> \"How would you like me to address you?\" Nobody minds this question.</li></ol><p>And always: <strong>spell names correctly</strong>, and learn how to say them. Getting someone's name right is the smallest, most powerful respect there is.</p>",
    },
  ],
  apply: {
    scenario: 'Friday, 2:30. How do you address a CEO?',
    items: [
      {
        kind: 'mcq',
        prompt: 'Remi\'s first written message to the CEO. Which opening?',
        options: [
          { text: 'Dear Peter,', why: 'He hasn\'t invited Remi to use his first name.' },
          { text: 'Dear Mr Kamau,' },
          { text: 'Hey Kamau,', why: 'Surname without a title sounds abrupt.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the title to who it\'s for.',
        pairs: [
          ['Mr', 'Any man'],
          ['Ms', 'Any woman, the safe choice'],
          ['Mrs', 'A married woman who uses it'],
          ['Dr', 'Someone with a doctorate or a medical doctor'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'emeka',
        message: 'Good afternoon Sir, kindly find the Mombasa numbers attached.',
        prompt: 'Remi is 21 and an intern. Emeka is senior. How should Remi read "Sir"?',
        options: [
          { text: 'As a joke at his expense', why: 'In Nigerian business English, "Sir" is an everyday courtesy.' },
          { text: 'As a promotion', why: 'Sadly not.' },
          { text: 'As normal Nigerian politeness. Reply warmly: "Thanks so much, Emeka!"' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'First name, or title + surname?',
        groups: ['First name is fine', 'Title + surname'],
        items: [
          { text: 'Zanele, a fellow intern', group: 0 },
          { text: 'The CEO, first message', group: 1 },
          { text: 'Helen, who said "call me Helen"', group: 0 },
          { text: 'A client you\'ve never met', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Not sure? Ask: "How would you like me to ___ you?" (one word)',
        answers: ['address', 'call'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s email. Which line will cause trouble?',
        lines: [
          'Dear Mrs Acheing,',
          'Thank you for the board calendar.',
          'Kind regards, Zanele',
        ],
        bug: 0,
        fix: 'Dear Mrs Achieng,',
        explanation: 'A misspelled name is the first thing people notice. Copy it from their signature.',
      },
      {
        kind: 'mcq',
        prompt: 'A board member says, "Please, call me Helen." What should Remi do?',
        options: [
          { text: 'Switch to "Helen"' },
          { text: 'Keep saying "Ms Helen"', why: 'She invited the first name. Use it.' },
          { text: 'Call her "Sir"', why: 'No.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Clear beats perfect', 'Tey\'s rule for work English'],
          ['Obviously', 'Can make readers feel slow'],
          ['Kind regards', 'Polite, safe sign-off'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The three safe moves.',
        template: 'Start [[1]]. [[2]] what they do. [[3]] if unsure.',
        blanks: [['formal'], ['Mirror', 'Copy'], ['Ask']],
        distractors: ['casual', 'Guess'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the polite question.',
        tiles: ['How', 'would', 'you', 'like', 'me', 'to', 'address', 'you?'],
        distractors: ['bro'],
      },
    ],
  },
  reflect: {
    prompt: 'How do people address each other where you work or study? Is it first names, titles, "Sir/Ma"? Has a newcomer ever got it wrong?',
    starters: ['Where I am, people say...', 'A newcomer once...'],
  },
  deepen: {
    title: 'Names matter',
    summary: 'Check the spelling of every name before you send, and if you\'re unsure how to say a name, ask. "How do you pronounce your name?" is a compliment, not a mistake.',
  },
  notes: 'Ms/Mrs/Mr/Dr usage (Cambridge). Address norms by region are generalisations stated with "common"; "Sir/Ma" in Nigerian and Ghanaian usage widely documented. Helen is an unnamed-surname board member (London). Mr Kamau\'s first name is Peter (new detail; add to CAST.md).',
};

export default lesson;
