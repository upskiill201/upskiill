import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 4 · Lesson 17. Reading: you don't need perfect English to sound professional — clarity over perfection, World Englishes, accents, buying time. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'You don\'t need perfect English to sound professional',
  summary: 'Zanele admits something at lunch: she rehearses every message three times because English is her third language. Remi is stunned. She\'s the most confident person on the floor.',
  minutes: 12,
  outcomes: [
    'Know that clear beats perfect in work English',
    'Respect different Englishes, including your own',
    'Use phrases that buy you time to think',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Clear beats perfect',
      html: "<p>Friday lunch. Zanele, quietly: \"English is my third language. isiZulu first, then Afrikaans at school. I rehearse every message three times. Sometimes four.\"</p><p>Remi stares. Zanele, of the drones and the kippy deck, is nervous?</p><h3>Most of the world speaks English as an extra language</h3><p>Far more people speak English as a second or additional language than as their first. In most workplaces, especially international ones, perfect native-speaker English is not the standard. <strong>Clear</strong> English is.</p><h3>What \"professional\" actually means</h3><p>Professional English is clear, polite and right for the reader. It is not perfect grammar, a particular accent, or long words. A short, clear message with one small grammar slip beats a long, perfect one nobody can follow.</p><h3>Many Englishes, all valid</h3><p>Kenyan, Nigerian, South African, Indian, British, American: each has its own words and habits. \"Kindly\", \"I'm coming\", \"revert\", \"now now\". None is wrong English. The professional skill is knowing your <em>reader's</em> English and adjusting when you need to.</p><h3>Accents are not a problem to fix</h3><p>Everyone has an accent. If people sometimes don't catch you, slow down a little and pause between ideas. That helps far more than trying to change how you sound.</p><h3>Phrases that buy you time</h3><ul><li>\"Let me think about that for a second.\"</li><li>\"Could you say that another way?\"</li><li>\"Just to check I understood: you mean...?\"</li><li>\"I'll put it in writing after the call.\"</li></ul><p>Zanele grins. \"So my 'kippy deck' was a pronunciation choice.\" Remi: \"Let's not go that far.\"</p>",
    },
    {
      kind: 'check',
      question: 'What does professional English need most?',
      options: ['Perfect grammar', 'Long, impressive words', 'To be clear, polite and right for the reader'],
      answer: 2,
      explanation: 'Clear beats perfect.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Clear beats perfect. Every English is valid. Slow down, pause, and use a time-buying phrase when you need one.',
    },
  ],
  apply: {
    scenario: 'Friday lunch. Zanele\'s confession.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Zanele\'s English has small grammar slips sometimes. Does that make her unprofessional?',
        options: [
          { text: 'Yes, perfect grammar is required', why: 'Clear and polite matters far more.' },
          { text: 'Only if she has an accent', why: 'Everyone has an accent.' },
          { text: 'No: if she\'s clear and polite, she\'s professional' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of being professional, or not needed?',
        groups: ['Part of it', 'Not needed'],
        items: [
          { text: 'Being clear', group: 0 },
          { text: 'A native-speaker accent', group: 1 },
          { text: 'Being polite', group: 0 },
          { text: 'Long, impressive words', group: 1 },
          { text: 'Fitting your reader', group: 0 },
        ],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the time-buying phrase to its use.',
        pairs: [
          ['Let me think about that for a second.', 'You need a moment'],
          ['Could you say that another way?', 'You didn\'t understand'],
          ['Just to check: you mean...?', 'Confirm what you heard'],
          ['I\'ll put it in writing after.', 'Too much to answer now'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Emeka says "I\'m coming" and then leaves for 20 minutes. Is that bad English?',
        prompt: 'What does Remi say?',
        options: [
          { text: 'Yes, he\'s wrong.', why: 'It\'s normal in Nigerian and Ghanaian English.' },
          { text: 'He\'s lying.', why: 'He means he\'ll be back.' },
          { text: 'It\'s Nigerian English: "I\'m coming" can mean "I\'ll be right back". Different English, not bad English.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Tey\'s rule: clear beats ... (one word)',
        answers: ['perfect'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'People sometimes don\'t catch what Remi says on calls. Best fix?',
        options: [
          { text: 'Change his accent', why: 'Pace and pauses help far more.' },
          { text: 'Slow down a little and pause between ideas' },
          { text: 'Speak much louder', why: 'Volume rarely helps understanding.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s notes to herself. Which belief should she drop?',
        lines: [
          'Clear and polite is what matters.',
          'I must never send anything with a single grammar mistake.',
          'If I\'m unsure, I can say "Could you say that another way?"',
        ],
        bug: 1,
        fix: 'I\'ll check important messages, but one small slip is fine.',
        explanation: 'Perfectionism costs time and confidence. Check what matters; don\'t freeze over small slips.',
      },
      {
        kind: 'mcq',
        prompt: 'A colleague writes "Kindly revert by EOD." What does "revert" mean here?',
        options: [
          { text: 'Reply to me' },
          { text: 'Undo your changes', why: 'In Indian and some African business English, "revert" means reply.' },
          { text: 'Go back to the office', why: 'It means reply.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Noted.', 'Can sound cold in writing'],
          ['As per my last email', 'Can sound annoyed'],
          ['Thanks for your patience', 'Instead of "sorry for the delay"'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a time-buying phrase.',
        tiles: ['Let', 'me', 'think', 'about', 'that', 'for', 'a', 'second.'],
        distractors: ['perfect'],
      },
    ],
  },
  reflect: {
    prompt: 'What do you worry about in your own English at work or school? What would "clear beats perfect" change for you?',
    starters: ['I worry about...', 'Clear beats perfect means I can...'],
  },
  deepen: {
    title: 'Your time-buying phrase',
    summary: 'Pick one time-buying phrase and keep it ready. Use it in your next meeting when you need a moment. It sounds thoughtful, not lost.',
  },
  notes: 'Estimates consistently show non-native English speakers outnumber native speakers worldwide (e.g. Ethnologue, British Council estimates). World Englishes: "revert" = reply (Indian, some African business English), "I\'m coming" = I\'ll be back (Nigerian/Ghanaian English), "now now" (South African English). Zanele\'s languages (isiZulu, Afrikaans) are new details; add to CAST.md.',
};

export default lesson;
