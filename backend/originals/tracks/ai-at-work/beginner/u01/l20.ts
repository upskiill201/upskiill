import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Unit 1 · Lesson 20 — Unit Challenge. The whole unit, harder, in one realistic day. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: a day with Ada',
  summary: 'Everything from Unit 1 in one busy day. Harder than a Checkpoint. Pass it and the unit is yours.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  xp: 30,
  outcomes: ['Use every Unit 1 skill under pressure', 'Prove you can get useful answers from AI, every time'],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: "The Unit Challenge. One full day in Ada's job, from the first message to the last. Every skill from Unit 1 shows up.", replies: ['Ready', 'Nervous'] },
        { tey: 'Nervous is fine. You have done every one of these already, just not all in one day.' },
        { tey: 'Remember the recipe: Role, Reader, Facts, Goal, Format. And read before you send. Go.' },
      ],
    },
  ],
  apply: {
    scenario: "8:45am. Ada opens her laptop. It's going to be a busy one.",
    items: [
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Morning Ada! My boss wants a status in 2 lines before her 9:30. Can you help?',
        prompt: 'Which request should Ada give the AI?',
        options: [
          { text: 'For a senior manager who reads in seconds: 2 lines, status first, then the one decision needed. Facts: sign-up done; testing Friday; palette approval needed by Wednesday.' },
          { text: 'Write a status update.', why: 'No reader, no facts, no length.' },
          { text: 'Write a detailed status report for a boss.', why: 'She asked for 2 lines.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Why did the AI\'s first draft yesterday say "launch confirmed for May"?',
        options: [
          { text: 'Ada did not give the launch date, so it guessed one' },
          { text: 'It found the date online', why: 'Private dates are not online.' },
          { text: 'May is correct', why: 'Confident is not correct.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each part of the request to its recipe line.',
        pairs: [
          ['"You are an editor"', 'Role'],
          ['"For Lucía, a client"', 'Reader'],
          ['"Testing moved to Friday"', 'Facts'],
          ['"Get her OK by Wednesday"', 'Goal'],
          ['"4 lines, friendly"', 'Format'],
        ],
      },
      {
        kind: 'findBug',
        prompt: '9:10. Spot the problem in Ada\'s request.',
        lines: [
          'Summarise this 30-message thread for my manager.',
          'In 4 bullets: decisions, owners, deadlines, risks.',
          'Fill in any details you think are probably true.',
        ],
        bug: 2,
        fix: 'Only use what is in the thread.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'An AI chat tool writes the words most likely to come ... (one word)',
        answers: ['next'],
        placeholder: 'One word',
      },
      {
        kind: 'tapBuild',
        prompt: '9:40. Build Ada\'s anti-guessing line.',
        tiles: ['If', 'unclear,', 'ask', 'me', 'instead', 'of', 'guessing'],
        distractors: ['invent', 'skip'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: '10:00. Ada needs a subject line for the launch email. Which request?',
        options: [
          { text: 'Give me a subject line.', why: 'One guess.' },
          { text: 'Give me 4 subject lines for the sign-up launch email to existing customers, each a different style (curious, benefit, short, playful), under 8 words. Which would you pick?' },
          { text: 'Give me 40 subject lines.', why: 'Too many, too similar.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'I love the start of option 2 and the end of option 4!',
        prompt: 'Which follow-up?',
        options: [
          { text: 'Combine the start of option 2 with the end of option 4. Under 8 words.' },
          { text: 'Try again.', why: 'She told you exactly what she wants.' },
          { text: 'Give us 4 new options.', why: 'She already chose.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the reader to the right version of the same news.',
        pairs: [
          ['Developers', '"Fix merged; regression run Friday"'],
          ['Lucía', '"We fixed a small bug; final testing is Friday"'],
          ["Lucía's CEO", '"On track. One approval needed by Wednesday."'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: '11:00. Complete Ada\'s "show it" request.',
        template: 'Here is an update my manager [[1]]: [example]. Match its [[2]], but use this week\'s [[3]].',
        blanks: [['liked', 'loved'], ['tone', 'length', 'style'], ['facts', 'news']],
        distractors: ['hated', 'typos', 'password'],
      },
      {
        kind: 'sortGroups',
        prompt: '11:30. Safe to paste as an example, or clean it first?',
        groups: ['Safe', 'Clean it first'],
        items: [
          { text: 'A newsletter intro already sent to all customers', group: 0 },
          { text: "An email with a customer's account number", group: 1 },
          { text: 'A message with a colleague\'s salary', group: 1 },
          { text: 'A public blog post', group: 0 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: '12:00. Ada must write a one-page plan. Order her steps.',
        lines: ['Ask for the outline only', 'Fix the outline', 'Write one section at a time with real facts', 'Read it as her manager would', 'Send it'],
      },
      {
        kind: 'mcq',
        prompt: '1:00pm. The AI draft is 90% right but too long. What does Ada do?',
        options: [
          { text: 'Follow up: "Keep the content and the opening, cut it to half the length."' },
          { text: 'Start a new chat from scratch', why: 'It is 90% right. Steer it.' },
          { text: 'Send it as it is', why: 'Too long for the reader.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Most reliable way to set length: use a ... (one word)',
        answers: ['number', 'count'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: "Could your team draft a short case study about our project? I don't know what it should include.",
        prompt: '2:00pm. Which request should Ada start with?',
        options: [
          { text: 'I need a short case study about our project with Lucía\'s company. Before writing, ask me up to 5 questions.' },
          { text: 'Write a case study.', why: 'It will invent the results.' },
          { text: 'Write a case study and make up impressive numbers.', why: 'Invented numbers in a case study are a serious problem.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: '2:30pm. Spot the invented line in the AI\'s answer.',
        lines: ['Hi Lucía, quick update.', 'Testing moved to Friday.', 'We also cut your price by 20%.', 'Could you approve the colours by Wednesday?'],
        bug: 2,
        fix: 'Delete it. Nobody agreed to a price cut.',
      },
      {
        kind: 'sortGroups',
        prompt: 'Match each symptom to the missing piece.',
        groups: ['Facts', 'Reader', 'Length'],
        items: [
          { text: 'Invented a discount', group: 0 },
          { text: '"Dear Valued Client"', group: 1 },
          { text: '500 words for a chat', group: 2 },
          { text: 'Guessed the launch date', group: 0 },
          { text: 'Jargon for a client', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: '3:00pm. Which follow-up fixes a jargon-heavy, too-long answer for Lucía?',
        options: [
          { text: 'Better please.', why: 'Better how?' },
          { text: 'Rewrite for Lucía, who does not know technical terms. Under 60 words. Keep the facts.' },
          { text: 'Again.', why: 'Same gaps, same guesses.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: '3:30pm. Ada is on the bus. Build her paste-and-ask line.',
        tiles: ['Reply', 'to', 'this:', 'friendly,', '2', 'lines'],
        distractors: ['essay'],
      },
      {
        kind: 'matchPairs',
        prompt: '4:00pm. Match the moment to the everyday prompt.',
        pairs: [
          ['A message to answer', 'Reply to this'],
          ['A long thread you missed', 'Summarise this for someone'],
          ['Your own long draft', 'Make this clearer'],
          ['Before a big send', 'What am I missing?'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: '4:30pm. Complete the recipe.',
        template: 'Role, [[1]], Facts, Goal, [[2]]. Plus: ask instead of [[3]].',
        blanks: [['Reader'], ['Format'], ['guessing']],
        distractors: ['Budget', 'Luck', 'waiting'],
      },
      {
        kind: 'chatReply',
        from: 'lucia',
        message: 'Last thing today: your AI said our competitor charges $49. Can I put that in my deck?',
        prompt: 'What should Ada say?',
        options: [
          { text: "Let's check it on their website first. It may be guessed or out of date." },
          { text: 'Yes, it sounded sure.', why: 'It always sounds sure.' },
          { text: 'Only if it is a round number.', why: 'Check it regardless.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: "Tey's biggest trap: sending without ... (one word)",
        answers: ['reading', 'checking', 'looking'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: '5:00pm. Order Ada\'s pre-send check.',
        lines: ['Are the facts the ones I gave?', 'Does it fit the reader?', 'Is the length right?', 'Is the ask clear?'],
      },
      {
        kind: 'sortGroups',
        prompt: 'End of day. True or false?',
        groups: ['True', 'False'],
        items: [
          { text: 'A clear request beats a fancier AI tool', group: 0 },
          { text: 'Confident answers are always right', group: 1 },
          { text: 'One message rarely fits very different readers', group: 0 },
          { text: '"Try again" is a strong follow-up', group: 1 },
          { text: 'Big tasks go better in steps', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What is the one idea behind all of Unit 1?',
        options: [
          { text: 'Every gap in a request is something the AI has to guess, so close the gaps and check the result' },
          { text: 'AI tools are always right', why: 'The opposite.' },
          { text: 'Longer requests are always better', why: 'Clear beats long.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Final one. Which line in this request is a trap?',
        lines: ['For Lucía, our client, on her phone.', 'Facts: testing Friday; launch on the 14th.', 'Goal: her OK on the colours.', 'Make it perfect.', '4 friendly lines.'],
        bug: 3,
        explanation: 'A wish, not a detail. The other four lines already say everything.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each Unit 1 skill to what it prevents.',
        pairs: [
          ['Give the facts', 'Invented details'],
          ["Say who it's for", 'The wrong tone'],
          ['Set a length', 'Essays nobody reads'],
          ['Read before sending', 'Mistakes reaching the client'],
        ],
      },
    ],
  },
  reflect: {
    prompt: 'You finished Unit 1. Compared with when you started, what is different about how you ask AI tools for help?',
    starters: ['Before, I used to...', 'Now I...'],
  },
  deepen: {
    title: 'Next up: Unit 2',
    summary: 'Unit 2, Write anything faster: emails, messages and documents in your own voice.',
  },
  notes: 'Review of the whole unit. "$49" and "20%" are fictional examples of invented or unverified figures.',
};

export default lesson;
