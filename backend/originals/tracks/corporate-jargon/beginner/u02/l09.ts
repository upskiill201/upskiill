import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 9. Story with a choice: interrupting politely — Remi knows the deadline everyone is planning around is wrong. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'Interrupting politely',
  summary: 'Emeka has been talking for six minutes about a plan built on the wrong deadline. Remi knows the right one. Interrupting a senior colleague feels impossible. Not saying anything is worse.',
  minutes: 12,
  outcomes: [
    'Know when an interruption is worth it',
    'Use the phrases that make an interruption polite',
    'Handle being interrupted yourself',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Wednesday, 9:25 a.m.',
      beats: [
        { speaker: 'narrator', text: 'Brian has joined. The supplier sync is going well. Then Emeka, in Lagos, starts explaining his delivery plan. It\'s detailed. It\'s clever. It\'s built on a deadline of the 30th.' },
        { speaker: 'remi', text: '(The deadline moved to the 20th. It was in Monday\'s supplier sync, the one Zanele skipped. Emeka must have missed it too.)' },
        { speaker: 'narrator', text: 'Six minutes. Emeka is now planning which trucks leave on the 28th. Everyone is nodding. Remi\'s heart is going very fast.' },
        { speaker: 'tey', text: "Every minute Remi waits, more of this plan gets built on the wrong date. This is exactly when interrupting is the kind thing to do. But HOW he does it matters." },
      ],
      choice: {
        prompt: 'What should Remi do?',
        options: [
          {
            text: 'Wait until Emeka finishes, however long it takes.',
            outcome: 'Emeka talks for nine more minutes. The plan is beautiful and completely wrong. Everyone has to start again, and the meeting runs over.',
          },
          {
            text: 'Cut in: "No, that\'s wrong, the deadline is the 20th."',
            outcome: 'It works, but Emeka goes quiet. Brian has to smooth things over. The fact was right; the way felt like a slap.',
          },
          {
            text: 'Raise his hand on video, then: "Sorry to jump in, Emeka. Quick check before you go further: I think the deadline moved to the 20th on Monday. Does that change the plan?"',
            outcome: 'Emeka stops. "The 20th? Nobody told Lagos! Thank you, Remi, that saves me a week of wrong planning." Brian makes a note to fix how updates reach Lagos.',
            best: true,
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p><strong>When is an interruption worth it?</strong></p><ul><li>When the discussion is built on a wrong fact.</li><li>When the meeting is about to run out of time before something important.</li><li>When someone hasn't been heard and is trying to speak.</li></ul><p><strong>The polite interruption has three parts:</strong></p><ol><li><strong>Signal:</strong> raise your hand (real or on video), or say their name.</li><li><strong>Soften:</strong> \"Sorry to jump in...\", \"Can I just add something quickly?\", \"Before we go further...\"</li><li><strong>Keep it short, then hand back:</strong> say the one thing, then \"Sorry, go ahead\" or ask them a question.</li></ol>",
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Make it a question, not a correction: "I think the deadline moved to the 20th. Does that change things?" You might be the one who\'s wrong, and a question leaves room for that.',
    },
  ],
  apply: {
    scenario: 'Wednesday, 9:25. Emeka is still talking.',
    items: [
      {
        kind: 'mcq',
        prompt: 'When is interrupting the right thing to do?',
        options: [
          { text: 'Whenever you have an idea', why: 'Most ideas can wait for a pause.' },
          { text: 'When the discussion is built on a wrong fact' },
          { text: 'Never at work', why: 'Sometimes NOT interrupting costs everyone hours.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s interruption in order.',
        lines: ['(raises hand)', 'Sorry to jump in, Emeka.', 'I think the deadline moved to the 20th on Monday.', 'Does that change the plan?'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Polite interruption, or not?',
        groups: ['Polite', 'Not polite'],
        items: [
          { text: 'Sorry to jump in...', group: 0 },
          { text: 'No, that\'s wrong.', group: 1 },
          { text: 'Can I just add something quickly?', group: 0 },
          { text: 'Talking louder until they stop', group: 1 },
          { text: 'Before we go further, a quick check...', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: '(private chat) Remi!! The deadline is the 20th, not the 30th! Say something!',
        prompt: 'What does Remi reply?',
        options: [
          { text: 'Doing it now.' },
          { text: 'You say it.', why: 'Zanele wasn\'t at Monday\'s sync, so she\'s not sure. Remi was.' },
          { text: 'I know, I\'ll wait until he finishes.', why: 'Every minute adds more plan built on the wrong date.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Finish the softener: "Sorry to ___ in..." (one word)',
        answers: ['jump', 'cut', 'butt'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s interruption. Which part could sound like a slap?',
        lines: [
          'Sorry to jump in, Emeka.',
          'You obviously didn\'t read Monday\'s notes.',
          'I think the deadline moved to the 20th.',
        ],
        bug: 1,
        fix: 'Delete it. The update clearly never reached Lagos.',
        explanation: 'Blaming him for missing it isn\'t needed, and Remi doesn\'t know why it happened.',
      },
      {
        kind: 'mcq',
        prompt: 'Why does Tey suggest turning the correction into a question?',
        options: [
          { text: 'Questions are always better than statements', why: 'Not always. But here, it leaves room for Remi to be wrong.' },
          { text: 'To sound less confident', why: 'It\'s not about confidence. It\'s about leaving room for the other person.' },
          { text: 'Remi might be the one who\'s wrong, and a question leaves room for that' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Later, Zanele interrupts REMI with a good point. What should he say?',
        options: [
          { text: '"Good point, Zanele. Let me finish this one sentence and then over to you."' },
          { text: '"I was talking!"', why: 'Fair, but sharp. There\'s a kinder way to keep your turn.' },
          { text: 'Stop and never finish', why: 'His point matters too. Finish it briefly, then hand over.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['Take it offline', 'Discuss it separately'],
          ['Flag it', 'Point out a problem'],
          ['I hear you', 'I understand (not always I agree)'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build a polite interruption.',
        tiles: ['Can', 'I', 'just', 'add', 'something', 'quickly?'],
        distractors: ['wrong', 'stop'],
      },
    ],
  },
  reflect: {
    prompt: 'Is interrupting normal or rude where you live, work or study? Think of a time you stayed quiet when you knew something important. What would you say now?',
    starters: ['Where I am, interrupting is...', 'Next time I\'d say...'],
  },
  deepen: {
    title: 'Interruption styles around the world',
    summary: 'In some cultures overlapping talk is a sign of interest; in others it\'s rude. Notice how people in your workplace or school do it, and adjust. The three-part polite interruption works almost everywhere.',
  },
  notes: 'Conversational norms around interruption vary across cultures (well documented in sociolinguistics, e.g. Deborah Tannen on "high-involvement" styles); lesson keeps this general. Phrases: "sorry to jump in", "can I just add something".',
};

export default lesson;
