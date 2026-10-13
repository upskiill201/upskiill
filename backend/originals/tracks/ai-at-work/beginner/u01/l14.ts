import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 14 — diagnose a bad answer: every symptom points to a missing piece of the request. */
const lesson: OriginalLesson = {
  key: 'l14',
  title: 'When the answer is wrong, fix the request',
  summary: 'A bad answer is a clue. Each problem in it points straight at what your request was missing.',
  minutes: 13,
  outcomes: [
    'Read a bad answer as a list of clues',
    'Match each problem to the missing piece of the request',
    'Fix the request in one follow-up',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'A bad answer, read like a detective',
      text:
        'Dear Valued Client, I hope this message finds you well. Our team has made tremendous progress, and the launch is confirmed for May 3rd. Our QA regression cycle is now complete. Please do not hesitate to reach out with any questions or concerns you may have at your earliest convenience.',
      hotspots: [
        { phrase: 'Dear Valued Client', note: 'Clue: no name, stiff tone. Missing: WHO it is for. Fix: "to Lucía, friendly".' },
        { phrase: 'the launch is confirmed for May 3rd', note: 'Clue: an invented fact. Missing: the real FACTS. Fix: give the real date, or say it is not set.' },
        { phrase: 'QA regression cycle', note: 'Clue: jargon. Missing: what the reader knows. Fix: "she does not know technical terms".' },
        {
          phrase: 'Please do not hesitate to reach out with any questions or concerns you may have at your earliest convenience',
          note: 'Clue: long, empty ending with no ask. Missing: the GOAL and LENGTH. Fix: "4 lines, end by asking her to approve the colours".',
        },
      ],
    },
    {
      kind: 'reading',
      title: 'Symptom → missing piece',
      html:
        '<ul>' +
        '<li><strong>Invented facts</strong> → you did not give the facts.</li>' +
        '<li><strong>Wrong tone</strong> → you did not say who it is for.</li>' +
        '<li><strong>Too long</strong> → you did not set a length.</li>' +
        '<li><strong>No point / no ask</strong> → you did not state the goal.</li>' +
        '<li><strong>Wrong shape</strong> (paragraphs instead of a table) → you did not set the format.</li>' +
        '<li><strong>Jargon</strong> → you did not say what the reader knows.</li>' +
        '</ul>' +
        '<p>So instead of "this is wrong, try again", write one follow-up that adds the missing pieces.</p>',
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Do not argue with the answer. Fix the request it came from.',
    },
    {
      kind: 'check',
      question: 'The AI invented a launch date. What was missing from the request?',
      options: ['The tone', 'The real facts', 'The length'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is diagnosing bad answers.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match the symptom to what the request was missing.',
        pairs: [
          ['Invented facts', 'The facts'],
          ['Wrong tone', 'Who it is for'],
          ['Too long', 'A length'],
          ['No clear ask', 'The goal'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'The AI gave paragraphs, but Ada needed to compare prices. What was missing?',
        options: [{ text: 'The format (a table)' }, { text: 'A role', why: 'A role would not turn paragraphs into a table.' }, { text: 'Politeness', why: 'Not the issue.' }],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Spot the line of the AI answer that is invented.',
        lines: [
          'Hi Lucía, quick update on sign-up.',
          'Testing moved to Friday.',
          'We have also doubled your budget at no cost.',
          'Could you approve the colours by Wednesday?',
        ],
        bug: 2,
        fix: 'Remove it, and add to the request: "only use the facts I give you".',
        explanation: 'Nobody said that. Anything not in the request may be invented.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Which missing piece caused each problem?',
        groups: ['Facts', 'Reader', 'Length'],
        items: [
          { text: 'It made up a date', group: 0 },
          { text: 'It was far too formal for a friend', group: 1 },
          { text: 'It was 400 words for a chat message', group: 2 },
          { text: 'It used jargon with a client', group: 1 },
          { text: 'It guessed the price', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'This draft calls me "Valued Client" and says we launch May 3rd. We never set a date!',
        prompt: 'Which follow-up should Ada send the AI?',
        options: [
          { text: "Rewrite it to Lucía by name, friendly. Don't mention a launch date, it isn't set. 4 lines." },
          { text: 'This is wrong, try again.', why: 'It does not say what was wrong, so it may repeat both problems.' },
          { text: 'Make it better.', why: 'Same problem: no missing pieces added.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the line that stops invented facts.',
        tiles: ['Only', 'use', 'the', 'facts', 'I', 'give', 'you'],
        distractors: ['invent', 'more'],
      },
      {
        kind: 'typeAnswer',
        prompt: "Don't argue with the answer, fix the ... (one word)",
        answers: ['request', 'prompt'],
        placeholder: 'One word',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s fix.',
        template: 'Write to [[1]] by name, [[2]] tone. Under [[3]] lines. End by asking her to approve the colours.',
        blanks: [['Lucía'], ['friendly', 'warm'], ['5', 'five', '4', 'four']],
        distractors: ['Valued Client', 'legal', '50'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'The AI answer was full of jargon and too long. Which follow-up fixes both?',
        options: [
          { text: 'Simpler please.', why: 'Fixes some jargon maybe; length is still unset.' },
          { text: 'Rewrite for a reader who does not know technical terms, in under 60 words.' },
          { text: 'Try again.', why: 'Nothing new to work with.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order Ada\'s diagnose-and-fix routine.',
        lines: ['Read the bad answer', 'List each problem', 'Name the missing piece for each', 'Add them all in one follow-up'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good follow-up or not?',
        groups: ['Good', 'Not useful'],
        items: [
          { text: 'Use her name, friendly tone, 4 lines', group: 0 },
          { text: 'Wrong, again', group: 1 },
          { text: 'Remove the launch date, it is not set', group: 0 },
          { text: 'Do better', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "The AI summary of our call lists a decision we didn't make. Can you check?",
        prompt: 'What is the most likely cause?',
        options: [
          { text: "It didn't have the real notes, so it filled the gap with a likely-sounding decision." },
          { text: 'You must have made that decision.', why: 'The AI guesses when it lacks facts.' },
          { text: 'The AI reads minds.', why: 'It does not. It guesses.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Wrong shape (paragraphs instead of a table) means the ... was missing (one word)',
        answers: ['format'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the clue to the fix.',
        pairs: [
          ['"Dear Valued Client"', 'Give her name and the tone'],
          ['"QA regression cycle"', 'Say she does not know technical terms'],
          ['A long, empty ending', 'Set the length and the ask'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "try again" a weak follow-up?',
        options: [
          { text: 'It adds no missing piece, so the same gaps get the same guesses' },
          { text: 'It is rude', why: 'Not about manners. It adds no information.' },
          { text: 'It always works', why: 'Sometimes it gets lucky, but usually it repeats the problem.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a bad AI answer you got. What was the clue, and what was your request missing?',
    starters: ['The clue was...', 'My request was missing...'],
  },
  deepen: { title: 'Try it today', summary: 'Next time an answer is wrong, write down the symptom and the missing piece before you follow up.' },
  notes: 'Symptom-to-cause mapping is a Teyro teaching device. No statistics.',
};

export default lesson;
