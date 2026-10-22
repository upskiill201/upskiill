import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 2. Prompt Lab: the complaint that works. */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'The complaint that works',
  summary: 'Day 10, morning coffee, cool head. Build the complaint email that gets the MX$1,850 removed: facts, evidence, the request, and the right tone.',
  minutes: 13,
  outcomes: [
    'Write a complaint with facts, evidence and one clear request',
    'Set the tone and length in the prompt',
    'Leave out anything you can\'t back up',
  ],
  learn: [
    {
      kind: 'promptLab',
      title: 'The MX$1,850 email',
      task: 'Get a complaint email that\'s calm, firm and hard to ignore.',
      base: 'Write a complaint email to my internet company.',
      parts: [
        { label: 'The facts', text: 'I\'m cancelling because I\'m moving to an address you can\'t serve. You charged me an MX$1,850 early-exit fee.' },
        { label: 'Evidence', text: 'Clause 11 of my contract says moving to an address you can\'t serve means no fee. Your coverage check says my new address is "not available".' },
        { label: 'The request', text: 'I want the fee removed and written confirmation within 10 days.' },
        { label: 'Tone and length', text: 'Calm and firm, under 150 words.' },
        { label: 'Make them feel terrible', text: 'Make them feel terrible.' },
      ],
      replies: [
        { uses: [], text: 'Dear Sir/Madam, I am writing to express my dissatisfaction with your services. I hope this matter can be resolved. Kind regards.', note: 'Dissatisfied with what? Resolved how? An agent can reply to this without changing anything.' },
        { uses: [4], text: 'You should be ashamed. Your company is a disgrace and everyone will hear about it.', note: 'Feels great. Gets nothing. There\'s no fact in it to act on.' },
        { uses: [0], text: 'I am cancelling my service as I am moving, and I was charged an early-exit fee of MX$1,850, which I believe is unfair.', note: 'Now they know what happened. But "I believe it\'s unfair" is an opinion. Where\'s the proof?' },
        { uses: [0, 1], text: '...I was charged MX$1,850. Clause 11 of my contract states that no fee applies when moving to an address you cannot serve, and your coverage check confirms my new address is not available...', note: 'Strong. But what does she want them to do, and by when?' },
        { uses: [0, 1, 2], text: '...Clause 11 states no fee applies, and your coverage check confirms my new address is not available. Please remove the MX$1,850 fee and confirm in writing within 10 days. I\'ve attached the coverage result and my contract. I look forward to your confirmation and appreciate your help in sorting this out quickly, as I am in the middle of a very busy move and would be grateful for a prompt resolution of this matter...', note: 'All the content is there. The ending rambles, and it\'s getting long. One more part.' },
        { uses: [0, 1, 2, 3], text: 'Subject: Remove early-exit fee (account ending 4471)\n\nHello,\nI\'m cancelling because I\'m moving to an address you can\'t serve. You\'ve charged me an early-exit fee of MX$1,850.\n\nClause 11 of my contract says no fee applies in this case, and your coverage check confirms my new address is "not available" (screenshot attached).\n\nPlease remove the fee and confirm in writing within 10 days.\n\nThank you,\nLucía Hernández', note: 'Facts, evidence, one request, a deadline. 80 words. Calm, firm, and very hard to ignore.' },
        { uses: [0, 1, 2, 3, 4], text: '...Please remove the fee within 10 days. Frankly, your customers deserve better than a company that treats them like this.', note: 'The last line undoes the calm. Drop "make them feel terrible" and send again.' },
      ],
      goal: 5,
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'A complaint that works: what happened, the proof, one clear request, a deadline. Calm and firm. Nothing you can\'t back up.',
    },
  ],
  apply: {
    scenario: 'Building the complaint.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Put the email\'s parts in order.',
        lines: ['What happened', 'The proof', 'The request', 'The deadline', 'Thank you and your name'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to its job.',
        pairs: [
          ['"You charged MX$1,850"', 'What happened'],
          ['"Clause 11 says no fee"', 'The proof'],
          ['"Please remove the fee"', 'The request'],
          ['"Within 10 days"', 'The deadline'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why is "I believe it\'s unfair" weaker than "Clause 11 says no fee applies"?',
        options: [
          { text: 'It\'s too polite', why: 'Politeness is fine; proof is what matters.' },
          { text: 'It\'s too long', why: 'It\'s actually shorter.' },
          { text: 'One is an opinion; the other is proof they can check and act on' },
        ],
        answer: 2,
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Send me your complaint before you send it. What\'s the request?',
        prompt: 'Lucía\'s answer?',
        options: [
          { text: 'Remove the MX$1,850 fee and confirm in writing within 10 days.' },
          { text: 'For them to feel bad.', why: 'That\'s not something they can do for her.' },
          { text: 'I didn\'t include one.', why: 'Without a request, nothing has to happen.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The tone and length line.',
        template: 'Calm and [[1]], under [[2]] words.',
        blanks: [['firm'], ['150']],
        distractors: ['furious', '1,500'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line should come out of the final email?',
        lines: [
          'Clause 11 of my contract says no fee applies in this case.',
          'Please remove the fee and confirm in writing within 10 days.',
          'Your customers deserve better than a company like you.',
        ],
        bug: 2,
        fix: 'Delete it.',
        explanation: 'It adds anger and no facts. It gives the agent a reason to get defensive.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Include it, or leave it out?',
        groups: ['Include', 'Leave out'],
        items: [
          { text: 'A screenshot of the coverage check', group: 0 },
          { text: 'Her full ID number', group: 1 },
          { text: 'The last 4 digits of her account', group: 0 },
          { text: 'A law she hasn\'t checked', group: 1 },
        ],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which clause of her contract is her proof? (A number.)',
        answers: ['11', 'clause 11', 'eleven'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Marta\'s online order arrived broken. Which prompt follows the complaint recipe?',
        options: [
          { text: 'Write a complaint: my order arrived broken. Make it strong.', why: 'No proof, no request.' },
          { text: 'Write a complaint: my blender arrived cracked on the 12th (photo attached). I want a replacement sent within 7 days. Calm and firm, under 120 words.' },
          { text: 'Write an email saying I\'m very disappointed.', why: 'Disappointed isn\'t a request.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'Why ask for "written confirmation"?',
        options: [
          { text: 'So she has proof the fee was removed if it ever comes back' },
          { text: 'Written is more polite', why: 'It\'s about proof.' },
          { text: 'Because phone calls are illegal', why: 'They aren\'t; writing just leaves a record.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Is there a complaint you\'ve been putting off? Write its four parts: what happened, the proof, the request, the deadline.',
    starters: ['What happened:...', 'The proof:...', 'The request:...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Use the complaint recipe on a real small problem (a late delivery, a wrong bill). Ask an AI tool for a draft, check every fact in it, and keep it under 150 words.',
  },
  notes: 'Complaint structure (facts, evidence, request, deadline) follows common consumer-advice guidance. Account digits fictional.',
};

export default lesson;
