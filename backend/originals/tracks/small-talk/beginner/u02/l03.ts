import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 3. Tap to explore: free information — the hooks hidden in people's answers. */
const lesson: OriginalLesson = {
  key: 'l03',
  title: 'Free information: catch the hooks',
  summary: 'Grace asks a new colleague, Aisha, "How was your weekend?" Aisha\'s answer is one sentence long and contains six things Grace could ask about. Most people hear none of them.',
  minutes: 11,
  outcomes: [
    'Spot "free information" in an ordinary answer',
    'Choose the best hook to follow',
    'Give people hooks of your own',
  ],
  learn: [
    {
      kind: 'explore',
      title: 'Aisha\'s answer',
      text: 'Not bad, thanks. I was in Leeds at my gran\'s 90th, so lots of cake, then I finally started that pottery class, which was a disaster, and now I\'m exhausted because my flatmate got a puppy.',
      hotspots: [
        { phrase: 'Leeds', note: 'A place. "Is that where you\'re from?" or "Do you go back often?"' },
        { phrase: 'gran\'s 90th', note: 'A big family moment. "Ninety! How did she celebrate?" People love talking about a grandparent they\'re proud of.' },
        { phrase: 'finally started', note: '"Finally" means she\'s wanted this for a while. "How long have you wanted to try it?"' },
        { phrase: 'pottery class', note: 'A hobby: one of the best hooks there is. "What made you try pottery?"' },
        { phrase: 'disaster', note: 'An invitation to a funny story. "Oh no, what happened?" Probably the best hook in the sentence.' },
        { phrase: 'puppy', note: 'Nobody has ever been sorry they asked about a puppy. "What kind? Does it have a name?"' },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'grace', text: 'A disaster? What happened?' },
        { speaker: 'narrator', text: 'Aisha laughs. "I made a bowl. It looked like a sad hat. The teacher asked if it was meant to be a hat."' },
        { speaker: 'grace', text: 'Was it?' },
        { speaker: 'tey', text: "Free information: the extra details people put in their answers. They're hooks, and people usually put them there hoping someone will ask. Pick the one with the most feeling in it: \"disaster\" beats \"Leeds\"." },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Give hooks too. "Fine, thanks" has none. "Good! I tried to fix my bike and now it has extra parts" has three.',
    },
  ],
  apply: {
    scenario: 'Tuesday morning. Aisha\'s weekend.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What is "free information" in a conversation?',
        options: [
          { text: 'Gossip about other people', why: 'It\'s about what people share about themselves.' },
          { text: 'Information you don\'t have to pay for', why: 'Ha. Not this kind.' },
          { text: 'Extra details people add that you can ask about' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Is there a hook in this answer?',
        groups: ['Has a hook', 'No hook'],
        items: [
          { text: 'Fine, thanks.', group: 1 },
          { text: 'Good, I ran my first 5K!', group: 0 },
          { text: 'Okay.', group: 1 },
          { text: 'Tiring, the twins had a birthday party.', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Which hook in Aisha\'s answer has the most feeling in it?',
        options: [
          { text: 'Leeds', why: 'A place. Fine, but less feeling.' },
          { text: 'The pottery class that was a disaster' },
          { text: 'Thanks', why: 'Not a hook.' },
        ],
        answer: 1,
      },
      {
        kind: 'chatReply',
        from: 'priya',
        message: 'My weekend? Quiet. I mostly read, finished a book about octopuses.',
        prompt: 'Grace spots the hook. Best reply?',
        options: [
          { text: 'Octopuses! Is it true they have three hearts? I nearly opened a conversation with that once.' },
          { text: 'Quiet is good.', why: 'True, but she skipped the hook.' },
          { text: 'I don\'t read much.', why: 'A switch, and a closed one.' },
        ],
        answer: 0,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Grace\'s word for details you can ask about: ___ (one word, Tey calls them this)',
        answers: ['hooks', 'hook'],
        placeholder: 'One word',
      },
      {
        kind: 'findBug',
        prompt: 'Grace\'s answer to "How was your weekend?" Which version gives no hooks?',
        lines: [
          'Version A: Fine, thanks.',
          'Version B: Good! My son taught me a TikTok dance. I pulled a muscle.',
          'Version C: Lovely, I finally went to the Lowry gallery.',
        ],
        bug: 0,
        fix: 'Fine, thanks. I spent it losing to my son at video games.',
        explanation: '"Fine, thanks" closes the door. Add one detail and the other person has something to grab.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the hook to a good follow-up.',
        pairs: [
          ['"My gran\'s 90th"', '"Ninety! How did she celebrate?"'],
          ['"A disaster"', '"Oh no, what happened?"'],
          ['"A puppy"', '"What kind? What\'s its name?"'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why do people often add free information?',
        options: [
          { text: 'By accident, they wish you wouldn\'t ask', why: 'Usually they\'re hoping someone will.' },
          { text: 'They\'re often hoping someone will ask about it' },
          { text: 'To fill silence', why: 'Sometimes, but it\'s still an invitation.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Review.',
        pairs: [
          ['Follow-up question', 'About what they just said'],
          ['Switch', 'Changing to your own topic too soon'],
          ['Catch', 'What a conversation is a game of'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Grace\'s answer with hooks.',
        tiles: ['Good!', 'My', 'son', 'taught', 'me', 'a', 'dance.', 'I', 'pulled', 'a', 'muscle.'],
        distractors: ['Fine.'],
      },
    ],
  },
  reflect: {
    prompt: 'Write your answer to "How was your weekend?" with at least two hooks in it. What would you want someone to ask about?',
    starters: ['My answer: ...', 'I\'d love someone to ask about...'],
  },
  deepen: {
    title: 'Hook hunting',
    summary: 'Listen to one conversation today, even a podcast or TV interview. Count the hooks in each answer, and notice which ones the interviewer picks up.',
  },
  notes: '"Free information" is a common term in conversation-skills teaching (no single study); links to follow-up question research (Huang et al. 2017). The octopus callback is from Chapter 1 lesson 4.',
};

export default lesson;
