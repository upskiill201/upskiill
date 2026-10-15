import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 20 — Unit Challenge. The whole chapter, harder. Climax: Brian's KPI brief, decoded and delivered before EOD. Cliffhanger into Chapter 4 (the lift). */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: decode Brian before EOD',
  summary: 'Friday, 2:00 p.m. Brian is back. His brief for the KPI deck lands: one paragraph, a dozen acronyms, due EOD. Two weeks ago it would have taken Remi all weekend. Today he has three hours.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Decode a full acronym-heavy brief from your manager',
    'Turn it into a clear plan and a professional reply',
    'Choose the right acronyms (and plain words) for each reader',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 2:00 p.m.',
      beats: [
        { speaker: 'narrator', text: 'Brian is back at his desk, mostly recovered, with a flask of ginger tea. At 2:00, an email lands.' },
        { speaker: 'brian', text: 'Subject: KPI deck. Hi Remi, pls finalise the KPI deck EOD for the CFO. NB: use FY quarters, not calendar. Lead w/ on-time delivery vs target + YoY revenue. Add ROI on the courier PoC (TBC is fine if no data). Cc Wanjiku, she owns the P&L numbers. Pls also add 1 slide on churn from Pauline\'s CRM. Keep it to 5 slides max, the CFO hates long decks. Ping me w/ an ETA. Thx, B.' },
        { speaker: 'remi', text: '(I understand every single word. Every single letter.)' },
        { speaker: 'tey', text: "Three weeks ago, \"circle back\" was a mystery. Now look at him. Everything from this chapter, all at once. Let's decode it, plan it and deliver it." },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge. Brian\'s brief, due EOD.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When is the deck due, and for whom?',
        options: [
          { text: 'End of week, for Mr Kamau', why: 'EOD = end of DAY. And CFO = chief financial officer.' },
          { text: 'End of today, for the chief financial officer' },
          { text: 'As soon as possible, for Brian', why: 'Brian wrote EOD and CFO.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Decode the brief.',
        pairs: [
          ['FY quarters', 'Quarters of the company\'s financial year'],
          ['YoY revenue', 'Revenue compared with last year'],
          ['ROI on the PoC', 'Was the courier trial worth it?'],
          ['P&L', 'Profit and loss'],
        ],
      },
      {
        kind: 'mcq',
        prompt: '"NB: use FY quarters, not calendar." Synergix\'s FY runs July to June. What does "Q1" cover on Remi\'s slides?',
        options: [
          { text: 'January to March', why: 'That\'s calendar Q1. Brian said FY quarters.' },
          { text: 'April to June', why: 'That\'s FY Q4.' },
          { text: 'July to September' },
        ],
        answer: 2,
      },
      {
        kind: 'orderLines',
        prompt: 'Brian says "lead with". Put the deck in the order he asked for.',
        lines: ['On-time delivery vs target', 'Revenue, year over year', 'ROI on the courier trial', 'Churn, from the CRM', 'Summary and next steps'],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Ping me w/ an ETA.',
        prompt: 'Best reply?',
        options: [
          { text: 'ASAP!', why: 'He asked for an ETA. Give a time.' },
          { text: 'Will do. ETA 4:30 p.m., so you\'ll have it before EOD. I\'ve cc\'d Wanjiku for the P&L numbers.' },
          { text: 'ETA TBC.', why: 'Possible, but unhelpful. He needs to plan.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'There\'s no ROI data for the courier trial yet. What does Brian say to do?',
        options: [
          { text: 'Write "TBC": he said that\'s fine' },
          { text: 'Make up a number', why: 'Never. Brian said TBC is fine.' },
          { text: 'Delete the slide', why: 'He asked for it, with TBC as an option.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Who does Remi need what from?',
        groups: ['Wanjiku', 'Pauline'],
        items: [
          { text: 'The P&L numbers', group: 0 },
          { text: 'The churn data', group: 1 },
          { text: 'Revenue compared with last year', group: 0 },
          { text: 'Customer accounts at risk', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The CFO is the chief ___ officer. (one word)',
        answers: ['financial'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s message to Pauline, from Marketing. Which line could confuse her?',
        lines: [
          'Hi Pauline, could I get this quarter\'s churn number from the CRM?',
          'It\'s for the KPI deck for the CFO, due at 4:30 today.',
          'NB pls send POD + SKU + AIs per SOW ASAP, thx.',
        ],
        bug: 2,
        fix: 'Thanks so much!',
        explanation: 'A pile of acronyms from other teams, most of them irrelevant to Pauline. One clear request is enough.',
      },
      {
        kind: 'mcq',
        prompt: 'Zanele looks at the draft: "Slide 4 says AI." Remi means action items. What should he do for the CFO?',
        options: [
          { text: 'Leave it, the CFO will guess', why: 'The CFO might read artificial intelligence.' },
          { text: 'Write "Next steps" or "Action items" in full' },
          { text: 'Change it to "AIs (not robots)"', why: 'Funny for Zanele, odd for the CFO.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Families. Match each acronym to its family.',
        pairs: [
          ['EOD', 'Time'],
          ['CC', 'Email'],
          ['ROI', 'Money'],
          ['NDA', 'Documents'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Can we add a slide on drones? Small one. Tiny.',
        prompt: 'Brian said 5 slides max. What does Remi say?',
        options: [
          { text: 'Sure, slide 6!', why: 'That breaks Brian\'s limit, and it\'s scope creep.' },
          { text: 'Drones are TBD forever.', why: 'Unkind. And not quite the point.' },
          { text: 'Brian said five max, so it\'s out of scope for today. Parking lot, again?' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Remi\'s summary slide, in plain words.',
        template: 'Deliveries: below [[1]]. Revenue: up on last [[2]]. Courier trial: return to be [[3]]. Churn: 3 accounts lost.',
        blanks: [['target'], ['year'], ['confirmed']],
        distractors: ['budget', 'quarter'],
      },
      {
        kind: 'mcq',
        prompt: 'At 4:28, Remi sends the deck. Which subject line?',
        options: [
          { text: 'KPI deck for the CFO: final, 5 slides' },
          { text: 'RE: RE: FWD: stuff', why: 'Nobody can find that later.' },
          { text: 'URGENT!!!', why: 'It\'s on time. Nothing urgent about it.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s cover email to Brian. Which line breaks a rule from this chapter?',
        lines: [
          'Hi Brian, the KPI deck is attached: 5 slides, FY quarters.',
          'ROI on the courier trial is TBC until Emeka\'s results on 3 November.',
          'I\'ve added a slide on MSA performance.',
          'Wanjiku has checked the P&L numbers.',
        ],
        bug: 2,
        fix: 'I\'ve added a slide on the Mombasa route.',
        explanation: '"MSA" is Remi\'s own invented shortcut. Never invent acronyms in shared writing.',
      },
      {
        kind: 'mcq',
        prompt: 'Brian replies: "LGTM, sending to the CFO. Gr8 work." What does Remi do?',
        options: [
          { text: 'Celebrate. LGTM = looks good to me. He approved it.' },
          { text: 'Ask what LGTM means', why: 'He knows by now.' },
          { text: 'Start again', why: 'It was approved.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'How was acronym week?? Did you survive?',
        prompt: 'Remi\'s voice note to Ada.',
        options: [
          { text: 'Survived! Decoded Brian\'s whole brief and sent the KPI deck before EOD. And I didn\'t search for a single pig.' },
          { text: 'LGTM TBH FYI EOD BRB.', why: 'Ada: "translation??"' },
          { text: 'It was OK.', why: 'He did better than OK.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Remi\'s golden rule from this chapter.',
        tiles: ['Decode', 'from', 'context,', 'check', 'what', 'matters,', 'write', 'for', 'your', 'reader.'],
        distractors: ['pig'],
      },
    ],
  },
  reflect: {
    prompt: 'Three weeks ago, Remi couldn\'t read Brian\'s messages. Which acronym from this chapter will you use or recognise first in your own life?',
    starters: ['The first one I\'ll meet is...', 'I\'ll use it when...'],
  },
  deepen: {
    title: 'Coming up in Chapter 4: "Yo, Mr Kamau"',
    summary: 'Monday morning, 8:01. The lift doors open. Mr Kamau steps in, alone, holding a coffee. Remi, still riding the high of Friday, says the first word that comes into his head: "Yo." The doors close. It is a very long ride to the seventh floor.',
  },
  notes: 'Unit Challenge: reviews all of Chapter 3 plus earlier chapters. All acronyms covered in lessons 1–19. Synergix FY July–June (lesson 6). Dates fictional.',
};

export default lesson;
