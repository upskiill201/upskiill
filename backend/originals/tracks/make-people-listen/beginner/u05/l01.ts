import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 1. On air: Miracle, "They won't hear me out". Being heard by people who love you and disagree with you. */
const lesson: OriginalLesson = {
  key: 'l01',
  title: 'On air: "They won\'t hear me out"',
  summary: 'Line 5, Buea. Miracle, 23, has two offers: a safe developer job at a big bank in Douala, and a job she loves at a small health-tech startup in Lagos. Her parents want the bank. Every time she brings up Lagos, the conversation ends in ten seconds.',
  minutes: 12,
  outcomes: [
    'See why "winning the argument" is the wrong goal with family',
    'Notice what happens when both sides only push',
    'Know this chapter\'s goal: be heard by people who love you and disagree with you',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Tey FM, midnight',
      beats: [
        { speaker: 'tey', text: "Line 5, from Buea. Miracle! Clinton and David's old mentor! They talk about you on air, you know." },
        { speaker: 'miracle', text: 'They told me. That\'s why I\'m calling. I\'ve helped everyone else get heard. I can\'t get my own parents to hear me.' },
        { speaker: 'miracle', text: 'I have two offers. A bank in Douala: safe, good salary, close to home. And a startup in Lagos that builds software for small clinics. I love it. Every time I say "Lagos", Papa says "Startups fail" and Mama says "Who will look after you?" And it\'s over.' },
        { speaker: 'tey', text: "What do you say when they say that?" },
        { speaker: 'miracle', text: 'I list all my reasons. Louder each time. Growth! Impact! Learning! Then Papa leaves the table.' },
        { speaker: 'tey', text: "Ignore-o-Meter: two loving parents, one brilliant daughter, zero listening on either side. Producer, this is our hardest call yet." },
      ],
      choice: {
        prompt: 'Producer: what\'s the first thing to ask Miracle?',
        options: [
          {
            text: '"When Papa says \'startups fail\', what do you think he\'s actually worried about?"',
            outcome: 'Miracle pauses. "That I\'ll be stranded. Far away. With no money. He grew up with nothing, Tey." Now we\'re getting somewhere: under the position is a fear.',
            best: true,
          },
          {
            text: '"What\'s your best argument? Let\'s make it stronger."',
            outcome: 'Miracle has twelve arguments already. Stronger arguments haven\'t worked. More pushing usually means more pushback.',
          },
          {
            text: '"You\'re 23. Just go."',
            outcome: 'Miracle: "I could. But I want their blessing, not just a plane ticket." The goal isn\'t only the decision; it\'s the relationship.',
          },
        ],
      },
    },
    {
      kind: 'text',
      html: "<p><strong>This chapter's goal:</strong> help Miracle be <em>heard</em> by her parents. Not to trick them, not to win, and not to give up what she wants. To have a conversation where both sides actually listen. The decision is hers. The relationship belongs to all of them.</p>",
    },
  ],
  apply: {
    scenario: 'Tey FM, Line 5. Miracle\'s family.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Why hasn\'t listing more reasons, louder, worked for Miracle?',
        options: [
          { text: 'Her reasons are bad', why: 'Her reasons are good. The method isn\'t working.' },
          { text: 'Pushing harder tends to make people push back harder' },
          { text: 'Her parents don\'t love her', why: 'They love her. That\'s why they\'re worried.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'A position, or the worry underneath?',
        groups: ['Position (what they say)', 'Worry (what they feel)'],
        items: [
          { text: '"Startups fail."', group: 0 },
          { text: 'Fear she\'ll be stranded with no money', group: 1 },
          { text: '"Who will look after you?"', group: 0 },
          { text: 'Fear of her being far away and alone', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'miracle',
        message: 'Shouldn\'t I just go? I\'m an adult.',
        prompt: 'What does Tey say?',
        options: [
          { text: 'Yes, leave tonight.', why: 'She wants the relationship too.' },
          { text: 'No, always do what parents say.', why: 'Her life, her decision.' },
          { text: 'The decision is yours. But you said you want their blessing. That needs a conversation where they feel heard too.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Under Papa\'s position ("startups fail") is a ___. (one word)',
        answers: ['fear', 'worry', 'concern'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Put a typical dinner in order.',
        lines: ['Miracle says "Lagos".', 'Papa says "Startups fail."', 'Miracle lists her reasons, louder.', 'Papa leaves the table.'],
      },
      {
        kind: 'mcq',
        prompt: 'What\'s the goal of this chapter?',
        options: [
          { text: 'Be heard, and listen, while keeping both the decision and the relationship' },
          { text: 'Win the argument', why: 'Winning against family often loses something bigger.' },
          { text: 'Give up on Lagos', why: 'Not the goal either.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s plan for the next dinner. Which line repeats the old pattern?',
        lines: [
          'Ask what they\'re most worried about.',
          'Bring a printed list of twelve reasons and read them all out.',
          'Listen before I explain.',
        ],
        bug: 1,
        fix: 'Share my one main reason, after they feel heard.',
        explanation: 'Twelve reasons, read out, is more pushing. Listen first, then one clear reason.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Who\'s who on Tey FM?',
        pairs: [
          ['Lucía', 'Talked over at work'],
          ['David', 'Idea taken by someone louder'],
          ['Miracle', 'Family won\'t hear her out'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'The producer\'s notes.',
        template: 'Under the [[1]] is a [[2]]. The decision is hers; the [[3]] belongs to all of them.',
        blanks: [['position'], ['fear', 'worry'], ['relationship']],
        distractors: ['argument', 'ticket'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Tey\'s first question.',
        tiles: ['What', 'is', 'he', 'actually', 'worried', 'about?'],
        distractors: ['wrong'],
      },
    ],
  },
  reflect: {
    prompt: 'Think of someone you love who disagrees with you about something important. What do they say, and what might they be worried about underneath?',
    starters: ['They say...', 'Underneath, they might be worried that...'],
  },
  deepen: {
    title: 'Find the worry',
    summary: 'Next time someone pushes back on a plan of yours, ask yourself silently: "What are they afraid of?" You don\'t have to agree. Just notice how different the conversation feels.',
  },
  notes: 'Story setup. Miracle (23, graduated, Buea) per CAST.md Tey FM timeline. Parents are named extras (narrated). Positions vs underlying interests/fears: Fisher & Ury, Getting to Yes. The course treats the decision as Miracle\'s and the goal as being heard, not winning; respectful of family culture.',
};

export default lesson;
