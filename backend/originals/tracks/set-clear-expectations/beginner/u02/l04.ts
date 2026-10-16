import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 4. Myth or Fact: who decides (decision rights; Bain decision effectiveness research). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Who decides?',
  summary: 'Kavya wants big product photos. Joel wants small ones so the page loads fast. They\'ve debated for a day, politely, and nothing has moved. Both are waiting for the other to give in. Myth or fact, about deciding.',
  minutes: 11,
  outcomes: [
    'Know why unclear decision rights slow teams down',
    'Agree who decides before the debate starts',
    'Know when to decide, and when to delegate the decision',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: 'Good teams decide everything by consensus.', isFact: false, explain: 'Myth. Input from everyone is valuable. Needing everyone to agree before anything happens can stall a team for days, like Kavya and Joel\'s photo debate. Someone needs to be able to decide.' },
        { text: 'Being clear about who decides is linked to better results.', isFact: true, explain: 'Fact, broadly. Bain & Company research (Blenko, Mankins and Rogers, 2010) found that companies that made and carried out decisions well tended to have stronger financial results. A big part of deciding well was clarity about who decides what.' },
        { text: 'The leader should make every decision personally.', isFact: false, explain: 'Myth. If every decision goes through Arjun, he becomes the bottleneck. Give decisions to the person closest to the work, inside the intent and the guardrails.' },
        { text: 'Saying who decides BEFORE a debate prevents a lot of arguments.', isFact: true, explain: 'Fact. When people know who decides, they argue to inform the decider, not to win. "Joel decides on page speed; Kavya decides on layout. If they clash, I decide by noon."' },
        { text: 'Once the decider decides, the debate should continue until everyone agrees.', isFact: false, explain: 'Myth. Disagree and commit: argue well, then get behind the decision. Reopening every decision means nothing ever gets finished.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Input, not consensus. Say who decides before the debate. Give decisions to the person closest to the work. Decide, then commit.',
    },
  ],
  apply: {
    scenario: 'The photo debate.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why has the photo debate stalled for a day?',
        options: [
          { text: 'They don\'t like each other', why: 'They\'re being very polite.' },
          { text: 'Nobody knows who decides, so both wait for the other' },
          { text: 'The question is impossible', why: 'It needs a decider, not genius.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Myth', 'Fact'],
        items: [
          { text: 'Good teams decide everything by consensus', group: 0 },
          { text: 'Clear decision rights link to better results', group: 1 },
          { text: 'The leader should decide everything', group: 0 },
          { text: 'Naming the decider first prevents arguments', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'kavya',
        message: 'So who wins: big photos or fast loading?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Keep discussing until you agree.', why: 'That\'s what stalled it.' },
          { text: 'You decide, Kavya.', why: 'Then Joel\'s speed concern is ignored.' },
          { text: 'Joel decides speed, you decide layout. Here: big photos that load small first. If you still clash, I decide by noon.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Argue well, then get behind it: disagree and ___. (one word)',
        answers: ['commit', 'Commit'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the decision to the best decider.',
        pairs: [
          ['Page speed', 'Joel'],
          ['Layout', 'Kavya'],
          ['A clash between them', 'Arjun, by noon'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why give decisions to the person closest to the work?',
        options: [
          { text: 'They know the details, and the leader doesn\'t become a bottleneck' },
          { text: 'To avoid responsibility', why: 'The leader still owns the outcome.' },
          { text: 'They\'re always right', why: 'Not always, but often best placed.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s decision rules. Which line causes a bottleneck?',
        lines: [
          'Joel decides page speed; Kavya decides layout.',
          'Every other decision comes to me first, however small.',
          'If they clash, I decide by noon.',
        ],
        bug: 1,
        fix: 'Small choices inside the intent are yours to make.',
        explanation: 'Every small decision through Arjun means everyone waits for Arjun.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a good decision in order.',
        lines: ['Name who decides', 'Hear the input', 'Decide, by a set time', 'Everyone commits'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Get [[1]], not consensus. Say who [[2]] before the debate.',
        blanks: [['input', 'views'], ['decides']],
        distractors: ['votes', 'wins'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s tie-break.',
        tiles: ['If', 'you', 'clash,', 'I', 'decide', 'by', 'noon.'],
        distractors: ['never'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a debate that dragged on in a group you\'re in. Did everyone know who decided? What would have changed if they had?',
    starters: ['The debate was about...', 'If we\'d known who decided...'],
  },
  deepen: {
    title: 'Name the decider',
    summary: 'Before your next group discussion, say out loud who will make the final call, and by when. See how the discussion changes.',
  },
  notes: 'Marcia W. Blenko, Michael C. Mankins & Paul Rogers, Decide & Deliver (2010) and "The Decision-Driven Organization", HBR (2010): decision effectiveness correlated with financial performance; decision-role clarity (RAPID), hedged as "broadly". Disagree and commit: Bezos 2016 letter. Fictional details.',
};

export default lesson;
