import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 4 · Lesson 1 — why AI sounds sure when it is wrong. Story: the number in Lucía's deck. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Why AI sounds sure when it\'s wrong',
  summary: 'An AI tool hands Ada a perfect statistic for Lucía\'s launch deck. It sounds certain. Nobody can find where it came from.',
  minutes: 12,
  outcomes: [
    'Explain why AI answers sound confident even when they are wrong',
    'Spot an unsupported claim before it goes into your work',
    'Ask the one question that catches most made-up facts',
  ],
  learn: [
    {
      kind: 'story',
      title: 'The number that wasn\'t true',
      beats: [
        { speaker: 'narrator', text: 'Month 3. Lucía\'s launch deck is due at noon. Slide 4 needs a big number about mobile money in Ghana.' },
        { speaker: 'ada', text: 'I asked the AI. It says 72% of small businesses in Ghana accept mobile money. Perfect for the slide.' },
        { speaker: 'narrator', text: 'Ada pastes it in. Then Lucía replies: "Love it. Source? Our CEO always asks."' },
        { speaker: 'ada', text: 'I asked the AI for the source. It named a report. I searched for an hour. The report doesn\'t exist.' },
        { speaker: 'tey', text: 'The AI wasn\'t lying. It writes what usually comes next, and confident numbers usually come next. Sure-sounding isn\'t the same as true.' },
      ],
      choice: {
        prompt: 'It\'s 11:30. What should Ada do with slide 4?',
        options: [
          { text: 'Remove the number, or replace it with one she can trace to a real source', outcome: 'Yes. A missing number costs nothing. A false one in the CEO\'s deck costs trust.', best: true },
          { text: 'Keep it. It sounds right and nobody will check.', outcome: 'Lucía\'s CEO always asks. And the next person who repeats it will be quoting Ada.' },
          { text: 'Change it to 70% so it\'s rounder', outcome: 'A rounded made-up number is still made up.' },
        ],
      },
    },
    {
      kind: 'reading',
      title: 'Why it sounds so sure',
      html:
        '<p>AI chat tools write by predicting likely words. They are very good at sounding like an expert, because they learned from a lot of expert-sounding writing.</p>' +
        '<ul>' +
        '<li><strong>Tone is not evidence.</strong> The tool uses the same confident voice whether it is right or wrong.</li>' +
        '<li><strong>Specific is not the same as checked.</strong> "72%" sounds more researched than "most". It may be equally invented.</li>' +
        '<li><strong>It rarely says "I don\'t know"</strong> unless you invite it to.</li>' +
        '</ul>' +
        '<p>The one question that catches most made-up facts: <em>"Where exactly does this come from, and can I open it?"</em></p>',
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Confidence is a writing style, not a fact check. Every number that leaves your desk needs a source you have opened yourself.',
    },
  ],
  apply: {
    scenario: 'Ada is deciding what to do with slide 4.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did the AI give a confident number with no real source?',
        options: [
          { text: 'It predicts likely-sounding text, and confident numbers often appear in that kind of writing' },
          { text: 'It was trying to trick Ada', why: 'It has no intent; it predicts text.' },
          { text: 'It checked a database and made a typo', why: 'It didn\'t look anything up.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Evidence, or just style?',
        groups: ['Evidence', 'Just style'],
        items: [
          { text: 'A report you opened and found the number in', group: 0 },
          { text: 'A precise-looking percentage', group: 1 },
          { text: 'A confident tone', group: 1 },
          { text: 'A page number you checked', group: 0 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What percentage did the AI claim?',
        answers: ['72', '72%'],
        placeholder: 'A number',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Love slide 4! What\'s the source for the 72%? Our CEO always asks.',
        prompt: 'What should Ada reply?',
        options: [
          { text: 'Honestly, I can\'t confirm it, so I\'ve taken it out. I\'ll find a figure with a real source by tomorrow.' },
          { text: 'It\'s from a report, trust me.', why: 'She couldn\'t find the report.' },
          { text: 'The AI said so.', why: 'That isn\'t a source.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: '[[1]] is a writing style, not a [[2]] check.',
        blanks: [['Confidence'], ['fact']],
        distractors: ['Grammar', 'spelling'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line of Ada\'s slide is the risk?',
        lines: [
          'Launching in Ghana in Q3',
          '72% of small businesses in Ghana accept mobile money',
          'Partner: two local banks',
          'Next step: pilot in Accra',
        ],
        bug: 1,
        fix: 'Remove it, or replace it with a sourced figure.',
        explanation: 'It\'s the only claim that came from the AI with no source she could open.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the AI behaviour to what it means for you.',
        pairs: [
          ['Sounds certain', 'Tells you nothing about accuracy'],
          ['Gives a precise number', 'Still needs a source'],
          ['Names a report', 'Open it before you trust it'],
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which follow-up question is most useful?',
        options: [
          { text: 'Are you sure?', why: 'It will usually just say yes.' },
          { text: 'Where exactly does this number come from? Give a link or document I can open. If you\'re not sure, say so.' },
          { text: 'Make the number bigger.', why: 'That makes it worse.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order what Ada should do with any AI number.',
        lines: ['Ask where it comes from', 'Open the source yourself', 'Find the number in it', 'Only then use it'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the one question that catches most made-up facts.',
        tiles: ['Where', 'exactly', 'does', 'this', 'come', 'from?'],
        distractors: ['Thanks', 'nice'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Safe to use as is, or check first?',
        groups: ['Fine as is', 'Check first'],
        items: [
          { text: 'AI rewording of your own email', group: 0 },
          { text: 'A market statistic for a client deck', group: 1 },
          { text: 'A list of synonyms for "fast"', group: 0 },
          { text: 'A date for a new regulation', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What does a missing number cost, compared to a false one?',
        options: [
          { text: 'Very little; a false one can cost the client\'s trust' },
          { text: 'More; slides need numbers', why: 'A gap is better than a false claim.' },
          { text: 'The same', why: 'False claims spread and get repeated.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a number or fact you used from an AI tool recently. Could you open its source right now?',
    starters: ['The fact was...', 'Its source is...'],
  },
  deepen: { title: 'Try it today', summary: 'Ask your AI tool for a statistic about your industry, then try to find the original source. Note whether you could.' },
  notes: 'The 72% figure and the missing report are fictional, used to show a fabricated statistic. AI tools generating plausible but false facts is well documented.',
};

export default lesson;
