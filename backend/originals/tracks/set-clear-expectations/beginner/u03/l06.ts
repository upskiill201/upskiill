import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 6. Side by side: "Does that make sense?" vs teach-back. */
const lesson: OriginalLesson = {
  key: 'l06',
  title: 'Teach it back',
  summary: 'Day 15. Arjun explains the stock-sync rules to Joel: eight minutes of detail. "Does that make sense?" Joel: "Yes." Arjun has been here before. Two versions of the end of that conversation.',
  minutes: 11,
  outcomes: [
    'Know why "Does that make sense?" doesn\'t check understanding',
    'Use teach-back to check what someone really understood',
    'Make it about your explanation, not their intelligence',
  ],
  learn: [
    {
      kind: 'compare',
      title: 'The end of the explanation',
      before: { label: '"Does that make sense?"', text: 'Arjun: "Does that make sense?" Joel: "Yes." (Two days later, stock goes negative when two people buy the last kurta at once.)' },
      after: { label: 'Teach-back', text: 'Arjun: "I want to check I explained it well. Can you walk me through what happens when two people buy the last one?" Joel: "Um... both orders go through?" Found in one minute. Fixed in ten.' },
      notes: [
        '"Does that make sense?" almost always gets "yes".',
        'Teach-back checks the explanation, not the person.',
        'The gap appears in a minute, not in production.',
      ],
    },
    {
      kind: 'text',
      html: "<p>Doctors and nurses use a method called <strong>teach-back</strong>: after explaining a treatment, they ask the patient to explain it back in their own words. Research on teach-back (for example Schillinger and colleagues, 2003) linked checking understanding this way to better outcomes for patients. The key is the framing: <strong>\"I want to check I explained it well\"</strong>. It's a test of the explainer, not the listener, so nobody feels quizzed.</p>",
    },
    {
      kind: 'check',
      question: 'Why frame it as "I want to check I explained it well"?',
      options: ['It tests the explanation, so the listener doesn\'t feel quizzed', 'It sounds humble', 'It\'s shorter'],
      answer: 0,
      explanation: 'People explain back freely when they\'re not being tested.',
    },
  ],
  apply: {
    scenario: 'The stock-sync rules.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Checks understanding, or not?',
        groups: ['Checks it', 'Doesn\'t'],
        items: [
          { text: '"Walk me through what happens when..."', group: 0 },
          { text: '"Does that make sense?"', group: 1 },
          { text: '"How would you explain this to Kavya?"', group: 0 },
          { text: '"Clear?"', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why does "Does that make sense?" usually get "yes"?',
        options: [
          { text: 'Saying "no" feels like admitting you didn\'t follow' },
          { text: 'Everyone always understands', why: 'Joel didn\'t.' },
          { text: 'It\'s a great question', why: 'It\'s a yes/no question.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'joel',
        message: 'Um... both orders go through?',
        prompt: 'Arjun\'s best reply?',
        options: [
          { text: 'No! I just explained that.', why: 'Next time Joel will just say "yes".' },
          { text: 'Close enough.', why: 'That\'s how stock goes negative.' },
          { text: 'That\'s my explanation\'s fault, thanks for walking through it. The second one should see "just sold out". Let\'s draw it.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Asking someone to explain it back in their own words is called teach-___. (one word)',
        answers: ['back', 'Back'],
        placeholder: 'One word',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the weak check to a teach-back.',
        pairs: [
          ['"Make sense?"', '"Walk me through it."'],
          ['"Clear?"', '"What happens if two people buy the last one?"'],
          ['"Got it?"', '"How would you explain it to Kavya?"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Where does teach-back come from?',
        options: [
          { text: 'The army', why: 'That\'s commander\'s intent.' },
          { text: 'Software', why: 'It\'s used there, but it comes from healthcare.' },
          { text: 'Healthcare: checking patients understand their treatment' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s teach-back. Which line makes it feel like a test?',
        lines: [
          'I want to check I explained it well.',
          'Let\'s see if you were actually listening.',
          'Walk me through what happens when stock hits zero.',
        ],
        bug: 1,
        fix: 'There\'s a tricky case, so I might have rushed it.',
        explanation: 'Teach-back works when it tests the explainer, not the listener.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put teach-back in order.',
        lines: ['Explain it', 'Say you want to check your explanation', 'Ask them to walk through a real case', 'Fix the gaps in your explanation'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'Test the [[1]], not the [[2]].',
        blanks: [['explanation', 'explainer'], ['listener', 'person']],
        distractors: ['code', 'client'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Arjun\'s teach-back opener.',
        tiles: ['I', 'want', 'to', 'check', 'I', 'explained', 'it', 'well.'],
        distractors: ['you'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of the last time you asked "Does that make sense?" What teach-back question could you have asked instead?',
    starters: ['I explained...', 'I could have asked...'],
  },
  deepen: {
    title: 'One teach-back today',
    summary: 'After your next explanation, say "I want to check I explained it well" and ask them to walk through one real case. Notice what you learn about your explanation.',
  },
  notes: 'Teach-back: Dean Schillinger et al. (2003), "Closing the loop: physician communication with diabetic patients who have low health literacy", Archives of Internal Medicine 163(1); AHRQ Health Literacy Universal Precautions Toolkit (teach-back method). Fictional details.',
};

export default lesson;
