import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. Story: Diwali eve, the Hindi emails don't send, and Joel goes quiet. Diagnose before you blame. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Diwali eve',
  summary: 'Day 29, 9:04 p.m. Launch is tomorrow at 9 a.m. Arjun runs the final checklist. Every line ticks, except one: order emails in Hindi arrive as boxes and question marks. Joel\'s piece. Joel hasn\'t posted in the chat since 5 p.m.',
  minutes: 11,
  outcomes: [
    'See why a missed expectation needs a diagnosis, not a verdict',
    'Ask before you assume why something was missed',
    'Know this chapter\'s goal: handle missed expectations well, and learn from all of it',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Day 29, 9:04 p.m.',
      beats: [
        { speaker: 'narrator', text: 'The test email in Hindi arrives as "□□□□ ??? □□". The checklist line says: "Order emails: English and Hindi." Joel ticked it on Day 26. Joel hasn\'t said a word since 5 p.m.' },
        { speaker: 'narrator', text: 'Arjun\'s first thought is not kind: "He ticked it without testing it." His second thought is: "He\'s the most careful person I\'ve ever worked with. Something else is going on."' },
        { speaker: 'kavya', text: '(in the chat) I can look at it if Joel\'s offline?' },
      ],
      choice: {
        prompt: 'What should Arjun do first?',
        options: [
          {
            text: 'Call Joel: "The Hindi emails show boxes. Not a disaster, we have 12 hours. What do you know about it?"',
            outcome: 'Joel picks up on the second ring. "I found it at 5. The email service needs a Unicode setting I don\'t have access to. I was trying to fix it myself and I was too embarrassed to say." Twenty minutes later, Arjun has turned the setting on.',
            best: true,
          },
          {
            text: 'Message the team: "Joel ticked a box he didn\'t test."',
            outcome: 'Joel sees it at 9:06 p.m. He was already embarrassed. Now he\'s embarrassed in front of everyone, and the bug is still there.',
          },
          {
            text: 'Ask Kavya to rewrite Joel\'s emails tonight.',
            outcome: 'Kavya spends three hours on code she\'s never seen. The real cause, a missing setting, stays hidden.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p>Even with clear expectations, some get missed. What matters then is <strong>why</strong>. Was it unclear? Did they lack the skill, the time, the tools, the access? Or did they simply not do it? The answer changes everything about what you do next, and you usually can't tell from the outside. <strong>This chapter:</strong> diagnosing missed expectations, the expectations conversation, recognising expectations met, the power of believing in people, the retrospective and setting up the next project.</p>",
    },
  ],
  apply: {
    scenario: 'Diwali eve, 9:04 p.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was really in Joel\'s way?',
        options: [
          { text: 'Carelessness', why: 'He\'s the most careful person on the team.' },
          { text: 'A setting he didn\'t have access to, and embarrassment about saying so' },
          { text: 'He didn\'t care', why: 'He was trying to fix it alone.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Diagnoses the gap, or delivers a verdict?',
        groups: ['Diagnoses', 'Verdict'],
        items: [
          { text: '"What do you know about it?"', group: 0 },
          { text: '"He ticked a box he didn\'t test."', group: 1 },
          { text: '"What\'s in the way?"', group: 0 },
          { text: '"Typical."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'I found it at 5. I should have said. I\'m really sorry.',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'Yes, you should have said at 5.', why: 'True, and it adds shame on launch eve.' },
          { text: 'It\'s fine, really.', why: 'Kind, but it skips the learning: flag early.' },
          { text: 'Thank you for telling me now. It\'s a missing setting, and that\'s my access, not your fault. Let\'s fix it, then talk about how to flag these sooner.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A missed expectation needs a diagnosis, not a ___. (one word)',
        answers: ['verdict', 'Verdict', 'judgement', 'judgment'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Arjun\'s response in order.',
        lines: ['Call Joel privately', 'Describe the gap, calmly', 'Ask what he knows', 'Fix it, then learn from it'],
      },
      {
        kind: 'mcq',
        prompt: 'Why not just ask Kavya to rewrite it?',
        options: [
          { text: 'The real cause stays hidden, and Kavya burns three hours' },
          { text: 'Kavya can\'t code', why: 'She can. The cause was a setting.' },
          { text: 'It\'s against the rules', why: 'It\'s about finding the cause.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s message to the team. Which line breaks this lesson?',
        lines: [
          'Found the Hindi email issue: a missing setting. Fixed.',
          'Joel should have flagged it earlier.',
          'Final checklist: all lines ticked.',
        ],
        bug: 1,
        fix: 'Thanks Joel for walking me through it.',
        explanation: 'Public blame on launch eve teaches everyone to hide problems.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 4 review.',
        pairs: [
          ['Scope creep', 'Small yeses that add up'],
          ['Psychological contract', 'The unwritten deal'],
          ['"Yes, and that means..."', 'A yes with the cost'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The goal.',
        template: 'When an expectation is missed, ask [[1]] before deciding what to [[2]].',
        blanks: [['why'], ['do']],
        distractors: ['who', 'blame'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s first question.',
        tiles: ['What', 'do', 'you', 'know', 'about', 'it?'],
        distractors: ['Why'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a time someone missed something you expected. What did you assume the reason was? What might the real reason have been?',
    starters: ['I assumed...', 'The real reason might have been...'],
  },
  deepen: {
    title: 'Ask before you judge',
    summary: 'Next time an expectation is missed, ask one question before anything else: "What do you know about it?" Then listen.',
  },
  notes: 'Story setup. Diagnosing performance gaps before acting: Mager & Pipe (1970), lesson 2. Fictional events (Unicode email setting).',
};

export default lesson;
