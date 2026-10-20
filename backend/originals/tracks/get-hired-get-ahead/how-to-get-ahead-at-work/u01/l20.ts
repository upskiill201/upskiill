import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 3 · Chapter 1 · Lesson 20 — Chapter Challenge: day 90 with Ngozi. */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Chapter Challenge: day 90',
  summary: 'Day 90. Clinton\'s check-in with Ngozi. The retry button shipped yesterday. He has his notes, his plan for the growth area, and a question about what comes next. Everything from this chapter.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: ['Use the whole first-90-days toolkit', 'Run a strong review conversation', 'Finish your first-90-days kit'],
  learn: [
    {
      kind: 'story',
      title: 'Day 90',
      beats: [
        { speaker: 'narrator', text: 'Day 90. A small meeting room. Ngozi has her notes. Clinton has his: three wins, one growth plan, one question.' },
        { speaker: 'ngozi', text: 'You learned fast, you shipped, and when you broke something you told me before I\'d had coffee. I\'d like you to own sync status for support. And in design meetings, I\'m going to call on you.' },
        { speaker: 'clinton', text: 'Deal. I\'ll bring one idea to every design meeting. Can I ask: what would "great" look like by month six?' },
        { speaker: 'ngozi', text: 'Good question. Let\'s write it down together.' },
        { speaker: 'tey', text: 'Let\'s put the chapter together.' },
      ],
    },
    {
      kind: 'steps',
      title: 'Your career-growth kit so far',
      steps: [
        { title: 'Piece 1 (this chapter)', body: 'A first-90-days kit: plan, glossary, standards list, people map, 1:1 doc.' },
        { title: 'Next chapter: Worth more', body: 'Month three. Clinton is busy all day, every day. Ngozi asks a question he can\'t answer: "What did that change?"' },
      ],
    },
  ],
  apply: {
    scenario: 'Chapter Challenge: day 90.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'What did Clinton bring to the day-90 check-in?',
        options: [
          { text: 'Three wins, a plan for his growth area, and one question' },
          { text: 'Nothing', why: 'He came prepared.' },
          { text: 'A request for a promotion', why: 'He asked what "great" looks like by month six.' },
        ],
        answer: 0,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Clinton\'s first 90 days in order.',
        lines: ['Asked what success looks like', 'Wrote a 30-60-90 plan', 'Shipped the tap-once fix', 'Flagged his bug at 7:15am', 'Shipped the retry button'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Part of Clinton\'s approach, or not?',
        groups: ['Part of it', 'Not part of it'],
        items: [
          { text: 'A glossary of new words', group: 0 },
          { text: 'Hiding his bug', group: 1 },
          { text: 'Coffee with the support lead', group: 0 },
          { text: 'A three-week dashboard nobody asked for', group: 1 },
          { text: 'Small, specific questions for Paul', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick Clinton\'s best response to the growth area.',
        from: 'ngozi',
        message: 'In design meetings, I\'m going to call on you.',
        options: [
          { text: '"Deal. I\'ll bring one idea or question to every design meeting."' },
          { text: '"Please don\'t, I\'m shy."', why: 'Accept it with a plan.' },
          { text: '"Paul talks enough for both of us."', why: 'Take the growth area seriously.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the weak first-chat opener.',
        lines: ['What does success look like at 90 days?', 'Let me know if you need anything!', 'How would you like updates?'],
        bug: 1,
        explanation: 'Polite but vague. Ask about success.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each moment to the skill.',
        pairs: [
          ['Paul\'s five comments', 'Read feedback as standards'],
          ['The 7:10am bug', 'Tell the right people fast'],
          ['The week-eight meeting', 'Turn the fraud feeling into action'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why ask "What would great look like by month six?"',
        options: [
          { text: 'So the next goal is clear, agreed and written down' },
          { text: 'To ask for a raise', why: 'To agree the next goal.' },
          { text: 'To fill silence', why: 'To set the next target.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Myth or fact?',
        groups: ['Fact', 'Myth'],
        items: [
          { text: 'Owning mistakes fast builds trust', group: 0 },
          { text: 'Late nights impress most', group: 1 },
          { text: 'Other teams can help a lot', group: 0 },
          { text: 'Questions look weak', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the chapter rules.',
        template: 'Learn, [[1]], own. Small and [[2]] wins. Tell people [[3]].',
        blanks: [['contribute'], ['finished'], ['fast']],
        distractors: ['hide', 'flashy', 'later'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Which feature will Clinton own next? Sync ___. (one word)',
        answers: ['status'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'How did Clinton win Paul\'s trust?',
        options: [
          { text: 'Homework first, small questions, using his answers, giving back' },
          { text: 'Compliments', why: 'By being easy to help.' },
          { text: 'Avoiding him', why: 'By being easy to help.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'miracle',
        message: 'Ninety days done. What\'s the biggest thing you learned?',
        options: [
          { text: 'Ask what good looks like, learn on purpose, and when something breaks, say so fast.' },
          { text: 'Never make mistakes.', why: 'He made one, and handled it well.' },
          { text: 'Work until midnight.', why: 'Reliability beat hours.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Imagine your own day 90 in a new role. What three wins would you want to bring?',
    starters: ['1.', '2.'],
  },
  deepen: {
    title: 'Your kit, piece 1',
    summary: 'Finish your first-90-days kit. If you\'re in a role now, book a check-in and ask: "What would great look like in the next three months?"',
  },
  notes: 'Chapter Challenge. Ngozi (CastId ngozi) speaks. Marker "Week 1" frames the start of a chapter that spans the first 90 days.',
};

export default lesson;
