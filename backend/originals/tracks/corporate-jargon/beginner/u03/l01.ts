import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 1. Story with a choice: Brian's fourteen-acronym message, and how to decode letters you've never seen. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Brian\'s fourteen-acronym email',
  summary: 'Friday, 4:12 p.m. Brian replies to Remi\'s minutes from his sickbed. About thirty words. Fourteen acronyms. Remi spends the weekend staring at it.',
  minutes: 12,
  outcomes: [
    'Know what an acronym is, and why offices love them',
    'Decode an acronym from context before you look it up',
    'Choose a smart way to check one you don\'t know',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 4:12 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Remi has just sent the minutes of the CEO meeting. He is feeling, for the first time in his life, like a professional. Then Brian replies.' },
        { speaker: 'brian', text: 'Gr8 work. FYI CEO v happy. Pls send MoM + AIs to Wanjiku & Emeka ASAP, cc me. OOO til Weds, WFH Thu. NB: KPI deck EOW. TBC re SLA. LGTM. B.' },
        { speaker: 'remi', text: '(I know CEO. I know... ASAP? Everything else is a car registration number.)' },
        { speaker: 'narrator', text: 'Remi searches "SOW meaning" for a different email Brian sent last week. The first result is about female pigs.' },
        { speaker: 'tey', text: "Welcome to Alphabet Soup, week three. Offices shorten everything they say often. Once you know the common ones, a message like Brian's takes ten seconds to read. Let's start with what Remi does right now." },
      ],
      choice: {
        prompt: 'Brian wants something ASAP, and Remi understands two of the fourteen acronyms. What should he do?',
        options: [
          {
            text: 'Reply "Will do!" and work it out over the weekend.',
            outcome: 'Remi sends the minutes on Monday. "ASAP" meant Friday. Wanjiku and Emeka spent Monday morning asking where they were.',
          },
          {
            text: 'Decode what he can from context, then send one short check: "Will do! Just to confirm: MoM = the minutes and AIs = action items?"',
            outcome: 'Brian replies in two minutes: "Yes! Sorry, sickbed shorthand." The minutes go out at 4:30. Everyone has them before the weekend.',
            best: true,
          },
          {
            text: 'Ask Brian to explain all fourteen.',
            outcome: 'Brian, who has the flu, sends a voice note that is mostly coughing. Remi now knows twelve of them. Brian is now worse.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>An <strong>acronym</strong> is a word made from the first letters of other words: <strong>ASAP</strong> = <em>as soon as possible</em>. Offices use them because they're fast to type and everyone inside knows them.</p><p>Here's Brian's message, decoded:</p><ul><li><strong>FYI:</strong> for your information. <strong>CEO:</strong> chief executive officer.</li><li><strong>MoM:</strong> minutes of meeting. <strong>AIs:</strong> action items.</li><li><strong>ASAP:</strong> as soon as possible. <strong>cc:</strong> copy me in.</li><li><strong>OOO:</strong> out of office. <strong>WFH:</strong> working from home.</li><li><strong>NB:</strong> note well (pay attention to this). <strong>KPI:</strong> key performance indicator. <strong>EOW:</strong> end of week.</li><li><strong>TBC:</strong> to be confirmed. <strong>SLA:</strong> service level agreement. <strong>LGTM:</strong> looks good to me.</li></ul><p>By the end of this chapter, you'll read messages like this without blinking.</p>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Decode from context first: what would make sense here? Then check only the ones that affect what you have to DO.',
    },
  ],
  apply: {
    scenario: 'Friday, 4:13 p.m. Brian\'s message is open.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is an acronym?',
        options: [
          { text: 'A spelling mistake', why: 'They\'re deliberate shortcuts.' },
          { text: 'A short form made from the first letters of other words' },
          { text: 'A type of email', why: 'They appear in emails, but they\'re a kind of word.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match Brian\'s acronyms.',
        pairs: [
          ['ASAP', 'As soon as possible'],
          ['OOO', 'Out of office'],
          ['WFH', 'Working from home'],
          ['EOW', 'End of week'],
        ],
      },
      {
        kind: 'mcq',
        prompt: '"Pls send MoM + AIs to Wanjiku." Using context, what are "MoM" and "AIs"?',
        options: [
          { text: 'Brian\'s mother and some robots', why: 'Context: Remi just took minutes. Mother and robots don\'t fit.' },
          { text: 'A report and an invoice', why: 'Close, but think about what Remi just wrote.' },
          { text: 'The minutes of the meeting and the action items' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Pls send MoM + AIs to Wanjiku & Emeka ASAP, cc me.',
        prompt: 'Best reply from Remi?',
        options: [
          { text: 'Will do! Just to confirm: MoM = the minutes and AIs = the action items? Sending now, with you copied in.' },
          { text: 'What is MoM?', why: 'Fine, but Remi can make a good guess and just confirm it.' },
          { text: 'LGTM ASAP FYI.', why: 'Acronyms answering acronyms. Brian is ill enough.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'TBC means "to be ..." (one word)',
        answers: ['confirmed'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Is it about TIME or about WHERE someone is?',
        groups: ['Time', 'Where someone is'],
        items: [
          { text: 'ASAP', group: 0 },
          { text: 'OOO', group: 1 },
          { text: 'EOW', group: 0 },
          { text: 'WFH', group: 1 },
          { text: 'EOD', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s decoding notes. Which one is wrong?',
        lines: [
          'OOO til Weds: Brian is out of the office until Wednesday.',
          'WFH Thu: Brian is working from home on Thursday.',
          'KPI deck EOW: the KPI slides are due at the end of today.',
        ],
        bug: 2,
        fix: 'KPI deck EOW: the KPI slides are due by the end of the week.',
        explanation: 'EOW is end of WEEK. End of day is EOD.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Review from earlier chapters.',
        pairs: [
          ['Hard stop', 'Must leave at a fixed time'],
          ['Minutes', 'Record of decisions and actions'],
          ['Loop in', 'Add someone to the conversation'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which acronyms should Remi check first?',
        options: [
          { text: 'All fourteen, in alphabetical order', why: 'Most of them don\'t change what he has to do.' },
          { text: 'None, it\'ll be fine', why: 'One of them (ASAP) has a deadline in it.' },
          { text: 'The ones that affect what he has to do, and when' },
        ],
        answer: 2,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s quick check.',
        tiles: ['Just', 'to', 'confirm:', 'MoM', 'means', 'the', 'minutes?'],
        distractors: ['mother', 'LGTM'],
      },
    ],
  },
  reflect: {
    prompt: 'Which acronyms do people use at your work, school or in your group chats that confused you at first? How did you find out what they meant?',
    starters: ['One that confused me was...', 'I found out by...'],
  },
  deepen: {
    title: 'Start your acronym list',
    summary: 'Add an "Acronyms" page to your Jargon Notebook. Write Brian\'s fourteen with their meanings, and add every new one you see this week.',
  },
  notes: 'Meanings: FYI, CEO, MoM (minutes of meeting; common in South Asian, Middle Eastern and some African business English), AI = action item (context; also artificial intelligence), ASAP, cc (carbon copy), OOO, WFH, NB (Latin nota bene, "note well"), KPI, EOW, TBC, SLA, LGTM (code-review/chat slang "looks good to me"). Sow = female pig (Cambridge); SOW = statement of work, taught in lesson 11.',
};

export default lesson;
