import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 2. Reading: can't, or won't? (Mager & Pipe, Analyzing Performance Problems, 1970). */
const lesson: OriginalLesson = {
  key: 'l02',
  title: 'Can\'t, or won\'t?',
  summary: 'The Hindi emails are fixed by 9:40 p.m. Arjun can\'t sleep. He keeps thinking about how close he came to blaming Joel for something that wasn\'t Joel\'s fault. Tey sends him a short read about diagnosing missed expectations.',
  minutes: 12,
  outcomes: [
    'Know the questions that diagnose a missed expectation',
    'Tell skill gaps from obstacles and from choices',
    'Pick the right fix for the real cause',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'The question that changes the fix',
      html: "<p>In their classic book <em>Analyzing Performance Problems</em> (1970), <strong>Robert Mager</strong> and <strong>Peter Pipe</strong> asked one famous question: <strong>\"Could they do it if their life depended on it?\"</strong> If yes, it's not a skill problem, and training won't help. If no, it's a skill problem, and pressure won't help. Mixing the two up is how leaders end up shouting at people who need teaching, and teaching people who need an obstacle removed.</p><h3>A short diagnosis</h3><ol><li><strong>Was the expectation clear?</strong> Could they have described it back? (Chapters 1 to 3.)</li><li><strong>Could they do it?</strong> Do they have the skill and knowledge?</li><li><strong>Could they do it here?</strong> Did they have the time, tools, access and information? Joel lacked access to one setting.</li><li><strong>Was something punishing doing it, or rewarding not doing it?</strong> Joel felt that admitting a problem on launch eve would look bad. Speaking up felt like punishment.</li><li><strong>Did they know it mattered?</strong> Did anyone ever notice when it was done well, or badly?</li></ol><h3>The fix follows the cause</h3><ul><li>Unclear: fix the brief.</li><li>Can't: teach, show a worked example, pair them up.</li><li>Obstacle: remove it (Arjun turned on the setting).</li><li>Speaking up feels risky: make it safe, out loud, again.</li><li>Truly won't, after all of that: a direct, honest conversation about expectations and consequences.</li></ul><p>In practice, \"won't\" is the rarest cause. Most missed expectations are one of the others.</p>",
    },
    {
      kind: 'check',
      question: 'If someone could do it if their life depended on it, but didn\'t, what is it NOT?',
      options: ['A skill problem', 'An obstacle problem', 'A clarity problem'],
      answer: 0,
      explanation: 'Training won\'t help. Look for obstacles, clarity, or what\'s punishing or rewarding.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Was it clear? Could they? Could they here? Was doing it punished? Did it matter? Fix the real cause. "Won\'t" is the rarest.',
    },
  ],
  apply: {
    scenario: 'Late night, reading.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What was Mager and Pipe\'s famous question?',
        options: [
          { text: '"Who\'s to blame?"', why: 'The opposite of their approach.' },
          { text: '"Could they do it if their life depended on it?"' },
          { text: '"Why are they so lazy?"', why: 'Not a diagnosis.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the cause to the fix.',
        pairs: [
          ['Unclear expectation', 'Fix the brief'],
          ['Can\'t: missing skill', 'Teach or show an example'],
          ['Obstacle: no access', 'Remove the obstacle'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'Which cause was it for Joel?',
        groups: ['A cause for Joel', 'Not a cause'],
        items: [
          { text: 'No access to one setting', group: 0 },
          { text: 'Didn\'t know how to code emails', group: 1 },
          { text: 'Speaking up on launch eve felt risky', group: 0 },
          { text: 'Didn\'t care about Hindi', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'What if someone really just won\'t do it?',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Then, after checking clarity, skill and obstacles, have a direct, honest conversation about the expectation and the consequences. It\'s rarer than it feels.' },
          { text: 'Fire them immediately.', why: 'Diagnose first. It\'s usually something else.' },
          { text: 'Ignore it.', why: 'If it\'s truly "won\'t", it needs a direct talk.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Robert Mager and Peter Pipe wrote "Analyzing Performance ___". (one word)',
        answers: ['Problems', 'problems'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Why does mixing up "can\'t" and "won\'t" cause damage?',
        options: [
          { text: 'It doesn\'t matter', why: 'The fix depends on it.' },
          { text: 'It makes meetings longer', why: 'It makes the fix wrong.' },
          { text: 'You pressure people who need teaching, or teach people who need an obstacle removed' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Arjun\'s plan for next time. Which line skips the diagnosis?',
        lines: [
          'Ask: was it clear? Could they? Could they here?',
          'If something\'s missed, send them on a training course.',
          'Check if speaking up felt risky.',
        ],
        bug: 1,
        fix: 'If something\'s missed, find the cause first, then pick the fix.',
        explanation: 'Training only helps when the cause is a missing skill.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the diagnosis in order.',
        lines: ['Was it clear?', 'Could they do it?', 'Could they do it here?', 'Was doing it punished?', 'Did it matter?'],
      },
      {
        kind: 'fillBlank',
        prompt: 'The rule.',
        template: 'The [[1]] follows the [[2]].',
        blanks: [['fix'], ['cause']],
        distractors: ['blame', 'boss'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the key question.',
        tiles: ['Could', 'they', 'do', 'it', 'here?'],
        distractors: ['why'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of a missed expectation (yours or someone else\'s). Run the five questions. Which one found the real cause?',
    starters: ['It was missed because...', 'The question that found it: ...'],
  },
  deepen: {
    title: 'Five questions',
    summary: 'Keep the five diagnosis questions in your notes. Next time something is missed, run them before you say anything to anyone.',
  },
  notes: 'Robert F. Mager & Peter Pipe, Analyzing Performance Problems, or You Really Oughta Wanna (1970; 3rd ed. 1997): "Could they do it if their lives depended on it?"; distinguishing skill deficiencies from execution problems, obstacles, and consequences (punishing desired performance, rewarding undesired). Fictional events.',
};

export default lesson;
