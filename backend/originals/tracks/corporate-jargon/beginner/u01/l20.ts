import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 1 · Lesson 20 — Unit Challenge. The whole chapter, harder. Climax: the Friday wrap-up, Remi's turn to speak. Cliffhanger into Chapter 2 (meetings). */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: Remi\'s turn to speak',
  summary: 'Friday, 5 p.m. The whole team, the Lagos office on screen, and Brian turns to the intern: "Remi, how was your week?" Everything from this chapter, all at once.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Decode a full meeting\'s worth of office jargon',
    'Answer jargon with clear, confident plain English',
    'Use every tool from the chapter: the picture trick, play-backs, did-found-next-need',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 5:00 p.m., the weekly wrap-up',
      beats: [
        { speaker: 'narrator', text: 'Five days ago, Remi sat in this room and understood nothing. Today, the same chairs, the same screen, the same Brian.' },
        { speaker: 'brian', text: 'Okay team, quick wrap-up before the weekend. Let\'s not boil the ocean. Big picture: Q4 is about late deliveries, so let\'s get our ducks in a row and keep the drone moonshot on the back burner, Zanele.' },
        { speaker: 'zanele', text: 'I hear you.' },
        { speaker: 'brian', text: 'Zanele...' },
        { speaker: 'zanele', text: 'I mean: I\'m on board. Fully. Aligned.' },
        { speaker: 'brian', text: 'Ha! Good. Now, our newest team player. Remi, you really hit the ground running. Give us a status update on the supplier deep dive, and flag anything I need to take offline.' },
        { speaker: 'narrator', text: 'Eleven faces turn towards him. Three more on the screen from Lagos. Remi\'s heart is pounding. But this time, he understood every single word.' },
        { speaker: 'tey', text: "This is it. Everything from this week, all at once. You've got this. So has he." },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge. The Friday wrap-up. Everyone is listening.',
    items: [
      {
        kind: 'mcq',
        prompt: '"Let\'s not boil the ocean." What is Brian asking the team to do?',
        options: [
          { text: 'Save electricity', why: 'There\'s no ocean and no kettle. It\'s about keeping the task a sensible size.' },
          { text: 'Work harder this weekend', why: 'It\'s about scope, not effort.' },
          { text: 'Focus on what can actually be done, not everything at once' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Decode Brian\'s opening.',
        pairs: [
          ['Big picture', 'The overall view'],
          ['Ducks in a row', 'Organised and ready'],
          ['Moonshot', 'A huge, long-shot idea'],
          ['Back burner', 'Paused for now'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Zanele first says "I hear you." Why does Brian pause?',
        options: [
          { text: 'Because it\'s rude', why: 'Not rude. Just not a yes.' },
          { text: 'Because he didn\'t hear her', why: 'He heard her fine. He just didn\'t hear a yes.' },
          { text: 'Because "I hear you" means "I understand", not "I agree", and he\'s learned that this week' },
        ],
        answer: 2,
      },
      {
        kind: 'sortGroups',
        prompt: 'Brian\'s request to Remi. Sort the pieces.',
        groups: ['What he wants', 'How to treat it'],
        items: [
          { text: 'A status update on the deep dive', group: 0 },
          { text: 'Flag anything important', group: 0 },
          { text: 'Take sensitive things offline', group: 1 },
          { text: 'Keep it short: it\'s a quick wrap-up', group: 1 },
        ],
      },
      {
        kind: 'orderLines',
        prompt: 'Remi plans his answer. Put it in the four-part order.',
        lines: [
          'I cleaned up the supplier list and checked three suppliers in detail.',
          'We paid Swift Freight twice for four deliveries, and Finance is claiming it back.',
          'Next, Felix is checking the system, and I\'ll send Brian a summary on Monday.',
          'I need access to the invoice system to finish it.',
        ],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Remi\'s finding, in front of eleven people and the Lagos office. Which version?',
        options: [
          { text: 'We paid Swift Freight KSh 186,000 twice because someone in Finance coded it wrong.', why: 'That names someone\'s mistake in front of everyone. It\'s exactly the kind of thing to take offline.' },
          { text: 'We found a double payment to a supplier. Finance is on it, and I can give Brian the details after.' },
          { text: 'There was a game-changing finding with significant impact.', why: 'Big words, no facts.' },
        ],
        answer: 1,
        explanation: 'The headline goes to the room. The sensitive details go offline. That\'s what Brian asked for.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Details about someone\'s mistake are best discussed ___. (one word)',
        answers: ['offline', 'privately', 'separately'],
        placeholder: 'One word',
      },
      {
        kind: 'chatReply',
        from: 'brian',
        message: 'Great work. Can you ping me the summary EOD Monday and loop in Finance?',
        prompt: 'Remi plays it back. Best reply?',
        options: [
          { text: 'Will do: summary to you by the end of Monday, with Finance copied in.' },
          { text: 'Circling back on the loop!', why: 'Jargon answering jargon. Play it back in plain words.' },
          { text: 'Monday? I thought it was due Friday.', why: 'EOD Monday is the end of Monday. Read it carefully before replying.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Zanele whispers her bingo notes. Which one is wrong?',
        lines: [
          'Hit the ground running: started fast from day one.',
          'Flag it: point out a problem.',
          'Team player: someone who prefers to work alone.',
          'Status update: where things are up to.',
        ],
        bug: 2,
        fix: 'Team player: someone who works well with others.',
        explanation: 'A team player is the opposite of a lone wolf.',
      },
      {
        kind: 'matchPairs',
        prompt: 'The whole week. Match the family to an example.',
        pairs: [
          ['The "later" family', 'Circle back'],
          ['The "busy" family', 'At capacity'],
          ['The "tell people" family', 'Loop in'],
          ['The "agree" family', 'On board'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Someone on the Lagos screen asks, "Can you give us a ballpark on the savings?" Remi isn\'t sure of the exact number yet. Best answer?',
        options: [
          { text: '"I don\'t know yet."', why: 'A ballpark is a rough estimate. He can give one and promise the exact figure later.' },
          { text: '"Roughly KSh 180,000 to 190,000. I\'ll confirm the exact figure in Monday\'s summary."' },
          { text: '"KSh 186,412.50."', why: 'Precise, but not yet confirmed. Saying it too early can backfire.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'Keep it, or translate it, in an update to the whole room?',
        groups: ['Fine to keep (everyone knows it)', 'Translate it (it hides the facts)'],
        items: [
          { text: 'Q4', group: 0 },
          { text: 'Moved the needle', group: 1 },
          { text: 'Action items', group: 0 },
          { text: 'Leveraged synergies', group: 1 },
          { text: 'Drove impact', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: '(whispering) Remi, what does "take it offline" mean again? Brian just said it to me.',
        prompt: 'Remi whispers back.',
        options: [
          { text: 'It means you\'re in trouble.', why: 'It usually means time, detail or sensitivity. Rarely trouble.' },
          { text: 'Turn your laptop off.', why: 'Remi knows better by now.' },
          { text: 'Talk about it separately after the meeting. Ask him for a time.' },
        ],
        answer: 2,
      },
      {
        kind: 'fillBlank',
        prompt: 'Tey\'s three habits from this chapter.',
        template: 'For a new phrase, ask: what\'s the [[1]]? For a task, find the task, the [[2]] and the people. For an update: did, found, next, [[3]].',
        blanks: [['picture'], ['deadline'], ['need']],
        distractors: ['price', 'fruit'],
      },
      {
        kind: 'mcq',
        prompt: 'A man from the Lagos office says something Remi doesn\'t understand: "We\'ll need an SLA on that." What\'s the best move?',
        options: [
          { text: '"Quick question: what does SLA mean here?"' },
          { text: 'Nod and google it later, even though it affects his task', why: 'If it affects your task, ask now.' },
          { text: '"Sorry, sorry, I\'m new, I don\'t get anything."', why: 'No apology needed, and he does get most things now. Ask about the one word.' },
        ],
        answer: 0,
        explanation: 'SLA = service level agreement: a promise about how fast or how well something will be done. You\'ll meet it properly in Chapter 3.',
      },
      {
        kind: 'tapBuild',
        prompt: 'Translate Brian\'s closing line: "Let\'s put a pin in the courier question and circle back Monday."',
        tiles: ['Let\'s', 'pause', 'the', 'courier', 'question', 'until', 'Monday.'],
        distractors: ['offline', 'boil'],
      },
      {
        kind: 'mcq',
        prompt: 'After the meeting, Brian says, "You really stepped up to the plate today." How should Remi take it?',
        options: [
          { text: 'As a warning', why: 'It\'s one of the nicest things a manager can say.' },
          { text: 'As praise: he took responsibility and delivered when it was his turn' },
          { text: 'As an invitation to play baseball', why: 'Literal Remi has retired. Mostly.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s message to Ada after the meeting. Which line would Brian love least?',
        lines: [
          'I did it! I understood everything.',
          'I gave my update in under a minute.',
          'I told everyone exactly whose mistake the double payment was.',
          'Brian said I stepped up to the plate.',
        ],
        bug: 2,
        fix: 'I kept the sensitive details for afterwards, just with Brian.',
        explanation: 'Good thing it didn\'t really happen. Naming someone\'s mistake in front of the room is an own goal.',
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Remi!!! How did the wrap-up go??',
        prompt: 'The last message of the week. What does Remi send?',
        options: [
          { text: 'We aligned on synergies going forward.', why: 'Ada would send back one word: "translation??".' },
          { text: 'It was fine.', why: 'After this week? He can say more than "fine".' },
          { text: 'I understood every word. And I answered in plain English. Brian said I stepped up to the plate. I KNOW WHAT THAT MEANS NOW.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Last one. Plain English for "low-hanging fruit": the easy ___. (one word)',
        answers: ['wins', 'win', 'tasks', 'jobs'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'At the start of this chapter, Remi understood nothing. What phrase do YOU understand now that you didn\'t a week ago, and where will you hear it next?',
    starters: ['A week ago I didn\'t know...', 'I\'ll hear it next at...'],
  },
  deepen: {
    title: 'Coming up in Chapter 2: the meeting about the meeting',
    summary: 'As the room empties, Brian calls over: "Great work, Remi. Let\'s take the rest offline, and set up a sync to align on the pre-meeting." On Monday morning, Remi opens his calendar. Eleven meetings. One of them is a meeting to plan another meeting.',
  },
  notes: 'Unit Challenge: reviews all of Chapter 1 (lessons 1–19). SLA = service level agreement (standard business term; taught in Chapter 3). Numbers consistent with lessons 10, 13 and 19.',
};

export default lesson;
