import type { OriginalLesson } from '../../../../src/originals/originals-authoring.types';

/**
 * Chapter 1 · Lesson 1 (Story) — free. The hook for the whole course: even a
 * killer under siege doesn't blame himself, so the people you deal with
 * won't either. Rule 1: don't criticise, condemn or complain.
 */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'Nobody Thinks They\'re the Villain',
  summary:
    'New York, 1931. A gunman is trapped in a top-floor flat, a hundred and fifty police outside, and he stops shooting long enough to write a letter about his kind heart. What he wrote explains why scolding almost never works.',
  minutes: 12,
  outcomes: [
    'Explain why people almost never blame themselves, even when they are clearly wrong',
    'Give the two reasons criticism backfires',
    'Swap a criticism for a question that finds out why',
  ],
  learn: [
    {
      kind: 'story',
      title: 'West End Avenue, May 1931',
      beats: [
        {
          speaker: 'narrator',
          text: 'New York, May 1931. The biggest manhunt the city has ever known is coming to its end. A young gunman called "Two Gun" Crowley is trapped in a top-floor apartment on West End Avenue.',
        },
        {
          speaker: 'narrator',
          text: 'A hundred and fifty police officers surround the building. They cut holes in the roof. They fire tear gas. Machine guns rattle from the rooftops across the street, and ten thousand people stand on the pavement to watch. Crowley crouches behind an armchair and fires back.',
        },
        {
          speaker: 'narrator',
          text: 'Not long before, a police officer had walked up to Crowley\'s parked car and asked to see his licence. Crowley shot him without a word.',
        },
        {
          speaker: 'narrator',
          text: 'And now, with bullets coming through the walls, he does something strange. He takes out a sheet of paper and writes a letter "to whom it may concern". Wounded and bleeding onto the page, he writes about his heart: a tired heart, he says, but a kind one. A heart that would never hurt anybody.',
        },
        {
          speaker: 'narrator',
          text: 'A kind heart. From a man who had shot an officer for asking to see a licence. Crowley is captured and sentenced to death. On the day he arrives at Sing Sing prison, he says one sentence about why he is there.',
        },
      ],
      choice: {
        prompt: 'What do you suppose Crowley said when he arrived at the prison?',
        options: [
          {
            text: '"This is what I get for killing people."',
            outcome:
              'That\'s what you or I might expect. It isn\'t what he said. Crowley never once saw it that way.',
          },
          {
            text: '"This is what I get for defending myself."',
            outcome:
              'That\'s it, word for word. Defending himself! A man who shot first and asked nothing. He went to his death believing he was the one who had been wronged.',
            best: true,
          },
          {
            text: '"I don\'t deserve to live."',
            outcome:
              'If only. Crowley blamed the police, the world, anybody but Crowley. He never said a word against himself.',
          },
        ],
      },
    },
    {
      kind: 'myth',
      statements: [
        {
          text: 'Most people in prison see themselves as bad people.',
          isFact: false,
          explain:
            'The warden of Sing Sing, Lewis Lawes, said the opposite: few of his prisoners thought of themselves as bad. They explained, they justified, and most insisted they should never have been locked up at all.',
        },
        {
          text: 'Al Capone, the most feared gangster in America, thought of himself as a public benefactor.',
          isFact: true,
          explain:
            'He complained that he had spent his best years giving people a good time and got nothing but abuse for it. Capone saw himself as misunderstood, not as a villain.',
        },
        {
          text: 'If you point out someone\'s mistake clearly enough, they will see they were wrong.',
          isFact: false,
          explain:
            'Ninety-nine times out of a hundred, people don\'t criticise themselves for anything, however wrong they are. Point it out, and they start defending.',
        },
      ],
    },
    {
      kind: 'reading',
      title: 'Now bring it home',
      html:
        '<p>Here\'s the question that matters. If Crowley didn\'t blame himself, if Capone didn\'t blame himself, if the men behind prison walls didn\'t blame themselves, <strong>what about the people you and I deal with every day?</strong></p>' +
        '<p>The colleague who missed the deadline. The flatmate who left the dishes. The friend who forgot your birthday. Every one of them has a story in which they are the reasonable one. Every one.</p>' +
        '<p>So when you criticise them, two things happen.</p>' +
        '<ul><li><strong>It\'s futile.</strong> Criticism puts a person on the defensive. Instead of thinking "I was wrong", they start working out why they were right.</li>' +
        '<li><strong>It\'s dangerous.</strong> It wounds a person\'s pride and their sense of being worth something. That breeds resentment, and resentment lasts.</li></ul>' +
        '<p>Criticisms are like homing pigeons. They always fly back home. The person you scold will defend themselves, and then they will very likely condemn you in return.</p>' +
        '<p>Remember this: when we deal with people, we are not dealing with creatures of logic. We are dealing with creatures of emotion, full of pride and feelings. Logic bounces off a wounded ego.</p>',
    },
    {
      kind: 'check',
      question: 'Why does criticism usually fail to change anyone?',
      options: [
        'People can\'t hear it properly',
        'It puts them on the defensive, so they justify themselves instead',
        'Most people already know they were wrong',
      ],
      answer: 1,
      explanation: 'Criticism is a push. People push back, and they push back by explaining why they were right all along.',
    },
    {
      kind: 'compare',
      title: 'The hard hats',
      before: {
        label: 'The order',
        text:
          'A safety officer at an engineering firm finds workers without their hard hats. He tells them, with plenty of authority, that it\'s the rule and they must comply. They put the hats on, sulking. The moment he walks away, the hats come off again.',
      },
      after: {
        label: 'The question',
        text:
          'Next time, he asks them first: are the hats uncomfortable? Do they fit properly? Then, in a pleasant voice, he reminds them the hats are there to protect them, and suggests they keep them on. The hats stay on. No sulking, no resentment.',
      },
      notes: [
        'Same rule, same workers. Only the approach changed.',
        'The order made them defend their pride. The question let them keep it.',
        'He found out WHY before he asked them to change.',
      ],
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Rule 1: Don\'t criticise, condemn or complain. Any fool can do that, and most fools do. It takes character and self-control to understand.',
    },
    {
      kind: 'text',
      html:
        '<p>So what do we do instead? Let me give it to you in one line: <strong>instead of condemning people, try to understand them.</strong> Ask yourself why they do what they do. It\'s far more useful than criticism, and far more interesting.</p>' +
        '<p>John Wanamaker, who built one of America\'s great department stores, said he learned early that scolding was foolish. Benjamin Franklin, clumsy with people as a young man, grew so tactful he was sent to France as America\'s ambassador. His secret? He made it a rule to speak ill of no one, and to speak all the good he knew of everybody.</p>' +
        '<p>Now, don\'t take my word for it. This is an action course. Let\'s put it to work.</p>',
    },
  ],
  apply: {
    scenario: 'Rule 1: Don\'t criticise, condemn or complain.',
    items: [
      {
        kind: 'mcq',
        prompt: 'With police firing into his hiding place, what did Crowley write about himself?',
        options: [
          { text: 'That he was sorry for what he had done', why: 'He never said sorry. Not once.' },
          { text: 'That he had a tired but kind heart that would never hurt anyone' },
          { text: 'That he would never be taken alive', why: 'He fought back, but his letter was about his kind heart.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'According to the warden of Sing Sing, how did most of his prisoners see themselves?',
        options: [
          { text: 'As bad people who deserved to be there', why: 'That\'s what we\'d expect. The warden found the opposite.' },
          { text: 'As people who were too weak to resist', why: 'They didn\'t see it as weakness. They had reasons.' },
          { text: 'As people with good reasons, who should never have been locked up' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Criticism backfires in two ways. Which is which?',
        groups: ['Futile: they defend', 'Dangerous: they resent'],
        items: [
          { text: '"It wasn\'t my fault, the brief was unclear."', group: 0 },
          { text: 'They stop sharing ideas with you for months', group: 1 },
          { text: 'They list every reason they had no choice', group: 0 },
          { text: 'They remember your words years later', group: 1 },
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'Why criticism fails, in one sentence.',
        template: 'Criticism puts a person on the [[1]] and wounds their [[2]].',
        blanks: [['defensive'], ['pride']],
        distractors: ['spot', 'wallet'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'Criticisms are like homing ________. They always come back home. (one word)',
        answers: ['pigeons', 'pigeon'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'What did the safety officer change to get the hard hats to stay on?',
        options: [
          { text: 'He brought in a fine for anyone without a hat', why: 'More force. That\'s what had already failed.' },
          { text: 'He asked whether the hats were uncomfortable, then reminded them, pleasantly, why they mattered' },
          { text: 'He stopped checking', why: 'He kept checking. He just changed how he spoke.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'A message to a flatmate. Which sentence breaks Rule 1?',
        lines: [
          'Hey, quick one about the kitchen.',
          'You\'re honestly the messiest person I\'ve ever lived with.',
          'Is something making it hard to get to the dishes lately?',
          'Happy to work out a rota if that helps.',
        ],
        bug: 1,
        fix: 'I\'ve noticed the dishes piling up a bit.',
        explanation: 'That line condemns the person, not the problem. The rest of the message can\'t recover from it: they\'ll spend the whole reply defending themselves.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each person to what they believed or did.',
        pairs: [
          ['Two Gun Crowley', 'Said he had a kind heart'],
          ['Al Capone', 'Saw himself as a public benefactor'],
          ['John Wanamaker', 'Decided scolding was foolish'],
          ['Benjamin Franklin', 'Spoke ill of no one'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Your teammate is late again. Build the question that tries to understand.',
        tiles: ['Is', 'something', 'making', 'mornings', 'hard', 'right', 'now?'],
        distractors: ['Why', 'always', 'late?'],
      },
      {
        kind: 'mcq',
        prompt:
          'A colleague\'s mistake cost your team a client. You are right, and you are furious. What does Rule 1 tell you to do first?',
        options: [
          {
            text: 'Tell them exactly what they did wrong while it\'s fresh',
            why: 'You\'d feel better for a minute. They\'d defend themselves, resent you, and the client would still be gone.',
          },
          {
            text: 'Complain about them to the rest of the team instead',
            why: 'Complaining is the third thing the rule forbids. It still flies home.',
          },
          { text: 'Find out why it happened before you say anything about it' },
        ],
        answer: 2,
        explanation: 'Being right doesn\'t make criticism work. Understanding them first is what gives you any chance of fixing it.',
      },
    ],
  },
  reflect: {
    prompt:
      'Your mission for today: catch yourself once, just once, about to criticise, condemn or complain. Stop. Ask yourself why they did what they did. Then write down who it was and what happened when you held back.',
    starters: ['Today I nearly criticised...', 'Instead, I asked myself why...', 'What happened was...'],
  },
  deepen: {
    title: 'The kind-heart test',
    summary:
      'Next time someone annoys you, finish this sentence the way THEY would: "I only did it because..." If a man under siege could believe in his own kind heart, the person who annoyed you certainly believes in theirs. Start from their story, not yours.',
  },
  notes:
    'Source for every fact: Dale Carnegie, How to Win Friends and Influence People (1981 rev. ed.), Part One, ch. 1 "If You Want to Gather Honey, Don\'t Kick Over the Beehive". ' +
    'Crowley siege (7 May 1931, West End Ave, 150 police, ~10,000 onlookers), the "to whom it may concern" letter, the licence shooting, and "This is what I get for defending myself" at Sing Sing; ' +
    'Capone as "public benefactor"; warden Lewis Lawes on prisoners justifying themselves; "ninety-nine times out of a hundred"; criticism futile (defensive) and dangerous (pride, resentment); ' +
    'homing pigeons; creatures of emotion not logic; George B. Johnston\'s hard hats (Enid, Oklahoma); Wanamaker on scolding; Franklin "speak ill of no man", ambassador to France; ' +
    '"Any fool can criticize, condemn and complain". All retold in our own words; only the short Crowley quote is kept verbatim. Voice: narrator in Carnegie\'s style, see docs/originals/win-and-influence-people-outline.md §3.',
};

export default lesson;
