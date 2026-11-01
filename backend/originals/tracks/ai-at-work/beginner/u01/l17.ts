import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 17 — good requests on a small screen: voice, shortcuts, paste-and-ask. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Fast prompting on your phone',
  summary: 'Typing a full recipe with your thumbs is slow. Talking it, pasting it and saving it is not.',
  minutes: 11,
  outcomes: [
    'Speak a request instead of typing it',
    'Use paste-and-ask for replies on the go',
    'Keep a few saved requests one tap away',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'On the bus, replying to Lucía',
      before: {
        label: 'Slow',
        text: 'Ada types a full request with her thumbs, misspells half of it, gives up, and writes the reply herself at 11pm.',
      },
      after: {
        label: 'Fast',
        text:
          'Ada copies Lucía\'s message, opens her AI app, taps the microphone and says: "Reply to this for me. Friendly, 3 lines. Yes to Thursday, and ask her to send the logo files." Then pastes the message.',
      },
      notes: ['Voice is faster than thumbs for long requests.', 'Paste the message instead of describing it.', 'The recipe still applies, just spoken.'],
    },
    {
      kind: 'steps',
      title: 'Three phone habits',
      steps: [
        { title: 'Speak it', body: 'Most phones and AI apps let you dictate. Say the request like you would explain it to a colleague.' },
        { title: 'Paste and ask', body: 'Copy the message, paste it, and add one line: "Reply to this: friendly, 3 lines, say yes to Thursday."' },
        { title: 'Save your top 3', body: 'Keep your most-used requests in a note or as text shortcuts, ready to paste.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'warning',
      text: 'Pasting on the go is fast, so it is easy to paste something private by accident. Glance before you send.',
    },
    {
      kind: 'check',
      question: "What's the fastest way to get a reply drafted on your phone?",
      options: ['Type a long description of the message', 'Paste the message and add one short instruction', 'Wait until you are at your laptop'],
      answer: 1,
    },
  ],
  apply: {
    scenario: 'Ada is working from her phone between meetings.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why paste the original message instead of describing it?',
        options: [
          { text: 'Describing is not allowed', why: 'Allowed, just slower and less accurate.' },
          { text: 'The AI gets the exact words and facts, and you save typing' },
          { text: 'Pasting makes it longer', why: 'It makes your request shorter.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a paste-and-ask instruction.',
        tiles: ['Reply', 'to', 'this:', 'friendly,', '3', 'lines'],
        distractors: ['essay', 'maybe'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Fast on a phone, or slow?',
        groups: ['Fast', 'Slow'],
        items: [
          { text: 'Dictating the request', group: 0 },
          { text: 'Typing a full recipe with thumbs', group: 1 },
          { text: 'Pasting a saved request from a note', group: 0 },
          { text: 'Rewriting the same request every day', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Are we still on for Thursday? Also, could you send the logo files?',
        prompt: 'Ada is on the bus. Which spoken request should she give the AI (after pasting this)?',
        options: [
          { text: '"Reply to this: friendly, 2 lines, yes to Thursday, and the logo files are coming tonight."' },
          { text: '"Write a reply."', why: 'Yes or no to Thursday? What about the files?' },
          { text: '"Write a formal letter about logos."', why: 'Wrong tone and length for a quick reply.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the habit to its benefit.',
        pairs: [
          ['Speak it', 'Faster than thumbs'],
          ['Paste and ask', 'Exact words, less typing'],
          ['Save your top 3', 'One tap away'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Spot the risk in what Ada is about to paste.',
        lines: ['Reply to this, friendly, 3 lines:', '"Hi Ada, the logo files are attached."', '"PS: the Wi-Fi password is BlueSky2026"'],
        bug: 2,
        fix: 'Delete the password line before pasting.',
        explanation: 'Fast pasting makes it easy to share private details by accident.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Instead of typing, you can ... your request (one word)',
        answers: ['speak', 'dictate', 'say', 'voice'],
        placeholder: 'One word',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Ada\'s saved request.',
        template: 'Reply to this for me: [[1]] tone, under [[2]] lines, and end with a [[3]].',
        blanks: [['friendly', 'warm'], ['3', 'three', '4', 'four'], ['question']],
        distractors: ['angry', '300', 'poem'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Which spoken request will work best?',
        options: [
          { text: '"Um, so, write something back I guess."', why: 'Speaking is fine; vague is still vague.' },
          { text: '"Reply to this message for me. Friendly, 3 lines. Say yes to Thursday at 2, and ask her to bring the brand guide."' },
          { text: '"Reply perfectly."', why: 'No facts, no length.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Order the paste-and-ask routine.',
        lines: ['Copy the message', 'Open the AI app', 'Paste it', 'Add one instruction (tone, length, the facts)', 'Glance at it, then send'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Good "top 3" saved request, or not worth saving?',
        groups: ['Worth saving', 'Not worth it'],
        items: [
          { text: 'Reply to this: friendly, 3 lines, end with a question', group: 0 },
          { text: 'Summarise this in 3 bullets: decisions, owners, deadlines', group: 0 },
          { text: 'A one-off request about a single event', group: 1 },
          { text: 'Make this shorter and clearer, keep the facts', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Your replies come so fast now, even on weekends! (No pressure to reply on weekends though.)',
        prompt: 'Which reply is best?',
        options: [
          { text: 'I never stop working.', why: 'Not a great message to send a client.' },
          { text: 'Ha, my phone tricks! And thank you, I\'ll keep weekends quieter.' },
          { text: 'The AI replies for me automatically.', why: 'It drafts; Ada decides and sends.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Before sending a pasted message, always ... at it (one word)',
        answers: ['glance', 'look', 'check'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the phone situation to the move.',
        pairs: [
          ['Long request, walking', 'Dictate it'],
          ['Replying to a message', 'Paste and ask'],
          ['Same request every day', 'Save it as a shortcut'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Does the recipe (reader, facts, goal, format) still apply on a phone?',
        options: [
          { text: 'No, phones need different rules', why: 'Same ingredients, faster input.' },
          { text: 'Only the role matters on phones', why: 'All the ingredients still matter.' },
          { text: 'Yes, it is just spoken or pasted instead of typed' },
        ],
        answer: 2,
      },
    ],
  },
  reflect: {
    prompt: 'Which message do you most often reply to on your phone? Write the saved request you would use for it.',
    starters: ['I often reply to...', 'My saved request:'],
  },
  deepen: { title: 'Do it now', summary: 'Save your top 3 requests in a note or as text shortcuts on your phone.' },
  notes: 'Dictation and saved shortcuts referenced generically; availability varies by phone and app. The "password" is a fictional example of what not to paste.',
};

export default lesson;
