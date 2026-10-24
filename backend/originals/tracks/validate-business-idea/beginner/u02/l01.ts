import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 1. Story: fifteen conversations. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Fifteen conversations',
  summary: 'Miracle gives Clinton a strange instruction: talk to fifteen hostel students this week and don\'t mention CampusEats once. Just ask about their lives. He doesn\'t see the point until conversation four.',
  minutes: 11,
  outcomes: [
    'Know why customer conversations come before any product',
    'See what happens when you stop pitching',
    'Plan your own first conversations',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Don\'t mention the idea',
      beats: [
        { speaker: 'miracle', text: 'This week, talk to fifteen students in the hostels. Ask about their evenings, their weekends, what annoys them. Don\'t mention CampusEats. Not once.' },
        { speaker: 'clinton', text: 'Then how will I know if they like it?' },
        { speaker: 'miracle', text: 'You already know what happens when you ask if they like it: forty fire emojis and one payment. This time, find out what their life is actually like.' },
        { speaker: 'narrator', text: 'Conversation one: a student talks about the noise. Two: data bundles. Three: exams. Four: "Honestly? Laundry. It\'s rainy season. Nothing dries. I lost my whole Saturday to washing and my jeans are still wet."' },
        { speaker: 'clinton', text: 'Laundry? I didn\'t even ask about laundry.' },
        { speaker: 'tey', text: 'That\'s the point. When you stop steering, people tell you what really bothers them. By Friday, nine of the fifteen bring up laundry without being asked.' },
      ],
      choice: {
        prompt: 'In conversation four, the student starts talking about laundry. What should Clinton do?',
        options: [
          { text: 'Follow it: "When did you last do laundry? Walk me through it."', outcome: 'Right. A problem someone raises on their own is worth digging into.', best: true },
          { text: 'Steer back to food: that\'s his idea.', outcome: 'Then he hears what he wants and misses what matters to them.' },
          { text: 'Pitch a laundry app on the spot.', outcome: 'Too soon. One conversation is a hint, not a market.' },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Customer conversations are for learning about their life, not for selling your idea.',
    },
  ],
  apply: {
    scenario: 'Talking to students.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why did Miracle tell Clinton not to mention CampusEats?',
        options: [
          { text: 'Because the idea is secret', why: 'Secrecy isn\'t the reason; honest answers are.' },
          { text: 'So students would talk about their real problems, not react to his idea' },
          { text: 'Because she thinks it\'s a bad idea', why: 'It\'s about getting unbiased answers, whatever the idea.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Of the fifteen students, how many brought up laundry without being asked?',
        answers: ['9', 'nine'],
        placeholder: 'A number',
      },
      {
        kind: 'sortGroups',
        prompt: 'Learning about their life, or selling?',
        groups: ['Learning', 'Selling'],
        items: [
          { text: '"What annoys you most about hostel life?"', group: 0 },
          { text: '"Wouldn\'t food delivery be great?"', group: 1 },
          { text: '"Walk me through your last Saturday."', group: 0 },
          { text: '"My app will change your life."', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'clinton',
        message: 'Nine people talked about laundry. Should I switch to a laundry business right now?',
        prompt: "Miracle's best reply?",
        options: [
          { text: 'Yes, launch tomorrow.', why: 'A problem isn\'t yet proof that they\'d pay for your solution.' },
          { text: 'Ignore it; stick with food.', why: 'The evidence is pointing elsewhere.' },
          { text: 'Not yet. It\'s a strong hint. Now dig: what do they do about it today, and what does it cost them?' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the conversation to what came up.',
        pairs: [
          ['Conversation 1', 'Noise'],
          ['Conversation 2', 'Data bundles'],
          ['Conversation 4', 'Laundry that won\'t dry'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'What share of the fifteen students raised laundry on their own?',
        options: [
          { text: '60%' },
          { text: '9%', why: '9 out of 15 is 60%.' },
          { text: '90%', why: '9 out of 15, not 9 out of 10.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'Miracle\'s instruction.',
        template: 'Ask about their [[1]]. Don\'t mention your [[2]].',
        blanks: [['life', 'lives'], ['idea']],
        distractors: ['price', 'friends'],
      },
      {
        kind: 'orderLines',
        prompt: 'Order how Clinton\'s week went.',
        lines: ['Plan fifteen conversations', 'Ask about their lives, not the idea', 'Notice laundry coming up again and again', 'Dig into what they do about it'],
      },
      {
        kind: 'findBug',
        prompt: 'Which question breaks Miracle\'s rule?',
        lines: [
          'What do you usually do on Saturdays?',
          'What\'s the most annoying part of hostel life?',
          'Would you use my food-delivery app?',
          'When did that last happen?',
        ],
        bug: 2,
        fix: 'Leave the idea out: "How did you get dinner last night?"',
        explanation: 'Mentioning the app turns the talk into a pitch.',
      },
      {
        kind: 'sortGroups',
        prompt: 'A hint worth following, or noise?',
        groups: ['Follow it', 'Probably noise'],
        items: [
          { text: 'Nine of fifteen raise laundry unprompted', group: 0 },
          { text: 'One student dislikes the hostel paint colour', group: 1 },
          { text: 'Several describe losing every Saturday morning', group: 0 },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'Who are five people who might have the problem behind your idea? What would you ask them about their week, without mentioning your idea?',
    starters: ['I could talk to...', 'I\'d ask about...'],
  },
  deepen: {
    title: 'How many conversations?',
    summary: 'There\'s no magic number, but many founders find patterns after about 10 to 20 conversations with the right people. When you stop hearing anything new, you\'ve probably talked to enough for now.',
  },
  notes: 'Fictional interview tally: 15 hostel students in Molyko; 9 (60%) raised laundry unprompted during the rainy season. Buea has a long, very wet rainy season (it sits on the slopes of Mount Cameroon). "Stop pitching, ask about their life": Rob Fitzpatrick, The Mom Test (2013).',
};

export default lesson;
