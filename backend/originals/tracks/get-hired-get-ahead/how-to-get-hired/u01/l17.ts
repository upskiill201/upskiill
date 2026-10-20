import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Level 1 · Chapter 1 · Lesson 17 — everyone else is ahead: comparison and imposter feelings, honestly. Story with a choice. */
const lesson: OriginalLesson = {
  key: 'l17',
  title: 'Everyone else is ahead',
  summary: 'Clinton opens LinkedIn at 1am. A classmate has an internship in Lagos. Another "just finished" a Google certificate. Someone is "thrilled to announce" something. Clinton closes his skills list and feels like a fraud.',
  minutes: 12,
  outcomes: ['Recognise comparison and imposter feelings', 'Compare yourself with your past self instead of others', 'Keep going on the days it feels like everyone is ahead'],
  learn: [
    {
      kind: 'story',
      title: '1am',
      beats: [
        { speaker: 'narrator', text: '1am. Clinton should be asleep. Instead he\'s scrolling. Internship in Lagos. "Thrilled to announce." A certificate. Another internship. Someone his age with "Founder" in their title.' },
        { speaker: 'clinton', text: 'Everyone is so far ahead. My list says I fix phones and run a group chat. Who am I kidding?' },
        { speaker: 'narrator', text: 'He messages David, who is also awake, revising.' },
        { speaker: 'david', text: 'You know that "founder" guy runs an Instagram page with 40 followers, right? And Ngum\'s internship is unpaid and she hates it. People post the highlights, bro.' },
        { speaker: 'tey', text: 'That feeling has a name: imposter feelings, the sense that you\'re less capable than people think and will be "found out". Psychologists first described it in 1978, and it\'s common, especially in people starting something new. It\'s a feeling, not a fact.' },
      ],
      choice: {
        prompt: 'What should Clinton do with this feeling?',
        options: [
          {
            text: 'Close the app, open his evidence bank, and compare himself with where he was a month ago.',
            outcome: 'A month ago he had zero skills written down. Tonight he has twelve, each with proof. He goes to sleep. The list is still good in the morning.',
            best: true,
          },
          {
            text: 'Stay up and apply to fifty jobs before morning, to catch up.',
            outcome: 'Fifty rushed applications at 3am, all the same. Panic speed isn\'t progress. The next morning, he regrets most of them.',
          },
          {
            text: 'Delete his skills list: if he\'s behind anyway, why bother?',
            outcome: 'The list didn\'t change at 1am. Only his mood did. Deleting it throws away a month of real work.',
          },
        ],
      },
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Other people post their highlights. Compare yourself with your past self, not with someone else\'s announcements.',
    },
  ],
  apply: {
    scenario: 'Clinton gets through a 1am wobble.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What are imposter feelings?',
        options: [
          { text: 'Feeling less capable than people think, and afraid of being "found out"' },
          { text: 'Actually being a fraud', why: 'It\'s a feeling, not a fact. Many very capable people have it.' },
          { text: 'A rare condition only some people have', why: 'It\'s common, especially when starting something new.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Helpful or unhelpful on a 1am wobble?',
        groups: ['Helpful', 'Unhelpful'],
        items: [
          { text: 'Read your evidence bank', group: 0 },
          { text: 'Compare your behind-the-scenes with others\' highlights', group: 1 },
          { text: 'Message a friend you trust', group: 0 },
          { text: 'Apply to 50 jobs before sunrise', group: 1 },
          { text: 'Sleep, and look again in the morning', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Everyone on LinkedIn is ahead of me. I\'m a fraud.',
        options: [
          { text: 'You\'re seeing their highlights. Compare yourself with a month ago: you\'ve found twelve skills with proof.' },
          { text: 'You\'re right, give up.', why: 'A 1am feeling isn\'t a fact. His list is real.' },
          { text: 'Lie on your profile to catch up.', why: 'That would make him an actual imposter. Keep it true.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Who should Clinton compare himself with?',
        options: [
          { text: 'The most successful person on his feed', why: 'He sees only their highlights. It\'s not a fair comparison.' },
          { text: 'His past self, a month or a year ago' },
          { text: 'Nobody, ever', why: 'Comparing with your past self is useful: it shows real progress.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Tap the thought that\'s a feeling pretending to be a fact.',
        lines: ['I grew the meet-up from 6 to 40 members.', 'Everyone my age is further ahead than me.', 'I\'ve written down twelve skills with proof this month.'],
        bug: 1,
        explanation: '"Everyone" is a feeling. Clinton has seen a few highlights, not everyone\'s life.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each 1am thought to a calmer one.',
        pairs: [
          ['Everyone is ahead', 'I\'m seeing highlights, not whole lives'],
          ['I\'m a fraud', 'My list has proof I can show'],
          ['I\'ll never catch up', 'I\'m further along than a month ago'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete Tey\'s reminder.',
        template: 'Other people post their [[1]]. Compare yourself with your [[2]] self.',
        blanks: [['highlights'], ['past']],
        distractors: ['problems', 'best', 'future'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Imposter feelings are a feeling, not a ___. (one word)',
        answers: ['fact', 'truth'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'When did psychologists first describe imposter feelings?',
        options: [
          { text: 'In 1978' },
          { text: 'Last year', why: 'Much earlier: Pauline Clance and Suzanne Imes described it in 1978.' },
          { text: 'In the 1800s', why: 'Later than that: 1978.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'david',
        message: 'I feel like this before every exam. Is something wrong with me?',
        options: [
          { text: 'No, it\'s really common when you\'re stretching yourself. And if it ever gets heavy, talking to someone helps.' },
          { text: 'Yes, you should quit medicine.', why: 'A common feeling isn\'t a reason to quit.' },
          { text: 'Ignore it forever.', why: 'Noticing it and talking about it works better than ignoring it.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'When do you feel "everyone is ahead"? What could you look at instead, to see how far you\'ve come?',
    starters: ['I feel it most when...', 'Instead, I could look at...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Write down three things you can do now that you couldn\'t do a year ago. Keep the list in your evidence bank for 1am.',
  },
  notes: 'Pauline Rose Clance and Suzanne Imes, "The Imposter Phenomenon in High Achieving Women: Dynamics and Therapeutic Intervention", Psychotherapy: Theory, Research & Practice (1978). Kept non-clinical per playbook §9; the David exchange points to talking to someone if it gets heavy. Ngum (classmate) is a named-only extra.',
};

export default lesson;
