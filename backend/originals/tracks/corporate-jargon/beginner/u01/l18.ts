import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 18. Reading: sports jargon at work — football, baseball and tennis phrases offices borrowed. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Sports jargon at work',
  summary: 'Remi is a football fan, so "own goal" makes sense. But why does everyone keep talking about baseball, in Nairobi? A short read on the sports words offices borrowed.',
  minutes: 12,
  outcomes: [
    'Decode common sports phrases used at work',
    'Know which sport each comes from, so you can picture it',
    'Notice which ones may confuse people from other countries',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'Why offices talk like sports commentators',
      html: "<p>Work and sport have a lot in common: teams, goals, competition, winning and losing. So offices borrowed sports language, and they borrowed a lot of it. If you know the sport, the phrase is easy. If you don't, it's a mystery.</p><h3>From football</h3><p><strong>Moving the goalposts:</strong> changing the rules or targets after someone has started. \"They agreed a price, then asked for more work. They keep moving the goalposts.\"</p><p><strong>Own goal:</strong> a mistake that hurts your own side. \"Cancelling the contract before Finance finished was a bit of an own goal.\"</p><p><strong>A level playing field:</strong> a fair situation where everyone has the same chance.</p><h3>From baseball</h3><p>A lot of office jargon comes from American workplaces, so a lot of it comes from baseball, even in countries where nobody plays it.</p><p><strong>Touch base:</strong> make brief contact. (You met this one on Tuesday.)</p><p><strong>Ballpark figure:</strong> a rough estimate. \"I don't need the exact cost, just a ballpark.\"</p><p><strong>Step up to the plate:</strong> take responsibility and act when it's your turn.</p><p><strong>Throw a curveball:</strong> surprise someone with something unexpected and difficult.</p><h3>From tennis and everywhere else</h3><p><strong>The ball is in your court:</strong> it's your turn to act or decide.</p><p><strong>Drop the ball:</strong> make a mistake by not doing something you should have.</p><p><strong>Team player:</strong> someone who works well with others.</p><p>Baseball phrases can puzzle colleagues who never grew up with the game. Football phrases travel further, but not everywhere. When you're not sure your listener knows the sport, use the plain words.</p>",
    },
    {
      kind: 'check',
      question: 'Brian asks for a "ballpark figure" for the courier costs. What does he want?',
      options: ['The exact cost to the shilling', 'The cost of a stadium', 'A rough estimate'],
      answer: 2,
      explanation: 'A ballpark figure is a rough number: good enough to plan with.',
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'brian', text: 'Zanele, cancelling Swift Freight was a bit of an own goal. But you stepped up to the plate and apologised to them yourself. That matters.' },
        { speaker: 'zanele', text: 'Thanks. So... the ball is in their court now?' },
        { speaker: 'brian', text: 'Exactly. We wait for their reply.' },
        { speaker: 'tey', text: "Three sports, one conversation. Football, baseball, tennis. And not a single ball in the room." },
      ],
    },
  ],
  apply: {
    scenario: 'Friday, 4 p.m. Sports commentary, office edition.',
    items: [
      {
        kind: 'matchPairs',
        prompt: 'Match each phrase to its sport.',
        pairs: [
          ['Own goal', 'Football'],
          ['Ballpark figure', 'Baseball'],
          ['The ball is in your court', 'Tennis'],
        ],
      },
      {
        kind: 'mcq',
        prompt: '"The client keeps moving the goalposts." What\'s happening?',
        options: [
          { text: 'The client is redecorating', why: 'It\'s a picture: changing the target mid-game.' },
          { text: 'The client keeps changing what they want after work has started' },
          { text: 'The client is being fair', why: 'The opposite: it feels unfair because the target keeps changing.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Good thing to hear, or not?',
        groups: ['Good', 'Not good'],
        items: [
          { text: 'You\'re a real team player', group: 0 },
          { text: 'That was an own goal', group: 1 },
          { text: 'You stepped up to the plate', group: 0 },
          { text: 'Someone dropped the ball', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'I\'ve sent Swift Freight our numbers. The ball is in their court now.',
        prompt: 'What does Brian mean?',
        options: [
          { text: 'We should play tennis with Swift Freight.', why: 'Literal Remi strikes again. It means it\'s their move.' },
          { text: 'We\'ve lost the argument.', why: 'No one has lost. It\'s just their turn to act.' },
          { text: 'It\'s Swift Freight\'s turn to reply. We wait.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'A rough estimate is a ___ figure. (one word)',
        answers: ['ballpark', 'ball-park'],
        placeholder: 'One word',
      },
      {
        kind: 'mcq',
        prompt: 'Felix forgot to check the payment system for a month. What would Brian probably say?',
        options: [
          { text: 'Someone dropped the ball' },
          { text: 'What a team player', why: 'That\'s praise. Forgetting a check is the opposite.' },
          { text: 'Let\'s get a ballpark', why: 'That\'s about estimates, not mistakes.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Zanele\'s notes on sports jargon. Tap the wrong one.',
        lines: [
          'Level playing field: everyone has a fair chance.',
          'Throw a curveball: give someone an easy, expected task.',
          'Step up to the plate: take responsibility when it\'s your turn.',
        ],
        bug: 1,
        fix: 'Throw a curveball: surprise someone with something unexpected and difficult.',
        explanation: 'A curveball is a pitch that bends unexpectedly. The whole point is the surprise.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Translate Brian\'s message into plain English.',
        template: '"Give me a ballpark and step up to the plate on the courier report" = "Give me a [[1]] estimate and take [[2]] for the courier report."',
        blanks: [['rough'], ['responsibility', 'charge']],
        distractors: ['exact', 'tennis'],
      },
      {
        kind: 'mcq',
        prompt: 'Remi is emailing a supplier in Germany. Which is clearest?',
        options: [
          { text: 'Could you give us a ballpark?', why: 'A baseball phrase that may not travel. Plain words are safer across countries.' },
          { text: 'Could you give us a rough estimate of the cost?' },
          { text: 'Step up to the plate with a number!', why: 'Unclear, and a bit pushy.' },
        ],
        answer: 1,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the plain version of "The ball\'s in your court."',
        tiles: ['It\'s', 'your', 'turn', 'to', 'decide.'],
        distractors: ['tennis', 'goal'],
      },
    ],
  },
  reflect: {
    prompt: 'Which sports phrase from today could you use this week? Is there a sport people love where you live that has given your language its own work phrases?',
    starters: ['I could use...', 'Where I live, people say...'],
  },
  deepen: {
    title: 'Watch the match, hear the meeting',
    summary: 'Next time you watch a football (or any) match, listen to the commentators. Count how many phrases you\'ve also heard at work or school.',
  },
  notes: 'Sport origins: "own goal", "moving the goalposts", "level playing field" — football/association football idioms (Cambridge marks "own goal" figurative use as UK). "Touch base", "ballpark", "step up to the plate", "curveball" — baseball (Merriam-Webster notes the baseball sense for each). "The ball is in your court" — tennis (Cambridge). "Drop the ball" — general ball games.',
};

export default lesson;
