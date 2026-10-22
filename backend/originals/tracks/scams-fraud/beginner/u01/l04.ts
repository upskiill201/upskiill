import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 4. Card deck: the pause (stop, challenge, protect). */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'The pause',
  summary: 'Grace writes her first protocol on a sticky note, three words long. It\'s based on advice UK banks and police have given for years. Three cards for the pause that stops most scams.',
  minutes: 10,
  outcomes: [
    'Use stop, challenge, protect',
    'Know that real organisations will wait',
    'Act fast if something has already happened',
  ],
  learn: [
    {
      kind: 'text',
      html: '<p><strong>Card 1: Stop.</strong> Before you send money, share a code, click a link or give details, stop. A genuine bank, family member or company will never mind you taking a few minutes to check. Only scammers need you to act right now.</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 2: Challenge.</strong> Ask: could this be fake? It\'s fine to refuse, hang up or ignore a message. Then check through a channel you already trust: the number on the back of your card, a saved contact, an official website you type yourself. "Only criminals will try to rush or panic you."</p>',
    },
    {
      kind: 'text',
      html: '<p><strong>Card 3: Protect.</strong> If you think you\'ve been caught, contact your bank immediately using a number you trust (in the UK you can call 159 to reach many banks safely), and report it. Speed matters: the sooner the bank knows, the better the chance of stopping the money.</p>',
    },
    {
      kind: 'check',
      question: 'A caller says they\'re your bank and you must act in 10 minutes. What\'s the first step?',
      options: ['Stop', 'Act within 10 minutes', 'Give them a code to prove you\'re you'],
      answer: 0,
      explanation: 'A genuine bank will understand if you hang up and call back on a number you trust.',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Stop. Challenge. Protect. Real organisations will wait while you check. Only scammers need you to act now.',
    },
  ],
  apply: {
    scenario: 'The pause.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order the pause.',
        lines: ['Stop', 'Challenge', 'Protect'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each step to what it means.',
        pairs: [
          ['Stop', 'Don\'t send, click or share yet'],
          ['Challenge', 'Could it be fake? Check a trusted channel'],
          ['Protect', 'Call your bank fast and report it'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Who minds you taking a few minutes to check?',
        options: [
          { text: 'Your bank', why: 'Genuine banks are happy for you to check.' },
          { text: 'Only scammers' },
          { text: 'Your family', why: 'Real family will understand.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'In the UK, what short number can you call to reach many banks safely?',
        answers: ['159'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Trusted channel, or not trusted?',
        groups: ['Trusted', 'Not trusted'],
        items: [
          { text: 'The number on the back of your card', group: 0 },
          { text: 'A number in the suspicious text', group: 1 },
          { text: 'A website address you type yourself', group: 0 },
          { text: 'A link in an unexpected email', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'jayden',
        message: 'Isn\'t hanging up on the "bank" rude?',
        prompt: 'Grace\'s best reply?',
        options: [
          { text: 'Yes, so stay on the line.', why: 'Hanging up is exactly right.' },
          { text: 'Only hang up if they\'re rude.', why: 'Hang up and check either way.' },
          { text: 'Not at all. A real bank expects it. You hang up and call the number on your card.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'The saying.',
        template: 'Only [[1]] will try to rush or [[2]] you.',
        blanks: [['criminals', 'scammers'], ['panic']],
        distractors: ['banks', 'thank'],
      },
      {
        kind: 'findBug',
        prompt: 'Which "protect" step is wrong?',
        lines: [
          'Call my bank on a number I trust.',
          'Report it.',
          'Wait a few days to see if the money comes back first.',
        ],
        bug: 2,
        fix: 'Contact the bank immediately.',
        explanation: 'Speed gives the best chance of stopping the money.',
      },
      {
        kind: 'mcq',
        prompt: 'Is it okay to simply ignore a suspicious message?',
        options: [
          { text: 'No, you must reply', why: 'You never have to reply.' },
          { text: 'Yes: refusing, ignoring or hanging up is always fine' },
          { text: 'Only if you\'re sure it\'s fake', why: 'If unsure, ignore and check another way.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why did Grace write the pause on a sticky note?',
        options: [
          { text: 'To decorate her desk', why: 'It\'s a protocol.' },
          { text: 'Her bank told her to', why: 'It\'s her own protocol.' },
          { text: 'A protocol written down is easier to follow under pressure' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Where could you put your own "stop, challenge, protect" reminder so you see it at the right moment?',
    starters: ['I\'ll put it...'],
  },
  deepen: {
    title: 'Take Five',
    summary: 'Stop, challenge, protect comes from the UK\'s "Take Five to Stop Fraud" campaign, led by the banking industry with the police. Many other countries run similar campaigns.',
  },
  notes: 'Take Five to Stop Fraud (UK Finance) — Stop, Challenge, Protect; "Only criminals will try to rush or panic you" is its message. 159: Stop Scams UK service. Jayden per CAST.',
};

export default lesson;
