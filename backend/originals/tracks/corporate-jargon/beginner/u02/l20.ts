import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 20 — Unit Challenge. The whole chapter, harder. Climax: the supplier review with Mr Kamau, Brian off sick, Remi on minutes. Cliffhanger into Chapter 3 (acronyms). */
const lesson: OriginalLesson = {
  key: 'l20',
  title: 'Unit Challenge: minutes for the CEO',
  summary: 'Friday, 10:00. Mr Kamau, Mrs Achieng, Wanjiku, Emeka on the screen from Lagos, and Remi, with no Brian. Forty-five minutes, one hard stop, and the minutes are his.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every meeting skill from the chapter in one high-stakes meeting',
    'Take neutral minutes and send a clear follow-up',
    'Open, interrupt, steer and close a meeting with confidence',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Friday, 10:00 a.m. The boardroom.',
      beats: [
        { speaker: 'narrator', text: 'The boardroom on the top floor. Remi has never been up here. The chairs are leather. The view is all of Nairobi.' },
        { speaker: 'kamau', text: 'Morning. Brian\'s ill, so Remi will start us off and take the minutes. I have a hard stop at 10:45. Remi, what\'s the ask?' },
        { speaker: 'narrator', text: 'Everyone looks at Remi. Emeka, on the screen, gives him a thumbs-up from Lagos. Mrs Achieng does not move a single muscle.' },
        { speaker: 'remi', text: '(Welcome, purpose, plan. The ask in two minutes. Numbers first. Breathe.)' },
        { speaker: 'tey', text: "Two weeks ago, Remi didn't know what \"circle back\" meant. Now he's opening a meeting with the CEO. Everything from this chapter, all at once. Ready?" },
      ],
    },
  ],
  apply: {
    scenario: 'Unit Challenge. The supplier review. Hard stop at 10:45.',
    items: [
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Mr Kamau asks, "What\'s the ask?" Remi\'s opening line?',
        options: [
          { text: 'Well, it\'s a long story, it starts in August...', why: 'He asked for the ask. Background later, if at all.' },
          { text: 'We\'d like your approval to continue the courier test for two more weeks. Three numbers explain why.' },
          { text: 'Um, Brian usually does this bit.', why: 'Brian asked Remi to. Go.' },
        ],
        answer: 1,
      },
      {
        kind: 'orderLines',
        prompt: 'Put Remi\'s opening in order.',
        lines: ['Morning, and thanks for making time.', 'The purpose is a decision on the courier test.', 'Our ask: two more weeks of testing.', 'I\'ll share three numbers, then we\'ll hear from Emeka and Wanjiku.'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Decode the room.',
        pairs: [
          ['Hard stop at 10:45', 'He leaves then, decision or not'],
          ['What\'s the ask?', 'What do you want from me?'],
          ['Start us off', 'Kick off the meeting'],
          ['Take the minutes', 'Record decisions and actions'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: '(text, from downstairs) Are you okay?? Is he scary?? Did you say the ask??',
        prompt: 'Remi is mid-meeting. What does he do?',
        options: [
          { text: 'Nothing now. He\'ll reply after the meeting.' },
          { text: 'Types a long reply under the table', why: 'Mr Kamau will notice. So will Mrs Achieng.' },
          { text: 'Sends "HELP"', why: 'Funny. Also unprofessional, and he\'s doing fine.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Emeka, in Lagos, has been talking for a minute. Nobody can hear him. What does Remi say?',
        options: [
          { text: '"EMEKA. MUTE."', why: 'True, but you can do it more kindly, even in the boardroom.' },
          { text: 'Nothing, Mr Kamau will notice', why: 'Every minute counts with a hard stop.' },
          { text: '"Sorry Emeka, I think you\'re on mute."' },
        ],
        answer: 2,
      },
      {
        kind: 'mcq',
        prompt: 'Emeka unmutes: "I\'d like to table the Mombasa route." They\'re in Nairobi. What does he want?',
        options: [
          { text: 'To raise the Mombasa route for discussion now' },
          { text: 'To postpone the Mombasa route', why: 'That\'s the American meaning. In Kenya and the UK, table = bring it up.' },
          { text: 'A bigger table', why: 'No furniture today.' },
        ],
        answer: 0,
      },
      {
        kind: 'findBug',
        prompt: 'Wanjiku\'s refund numbers are from September, not October. How should Remi interrupt? Tap the line that would go badly.',
        lines: [
          '(raises hand) Sorry to jump in, Wanjiku.',
          'You\'ve got the wrong month, obviously.',
          'I think those might be September\'s numbers. Shall I share October\'s?',
        ],
        bug: 1,
        fix: 'Delete it: the question in the next line already does the job.',
        explanation: '"Obviously" turns a helpful correction into a put-down, in front of the CEO.',
      },
      {
        kind: 'sortGroups',
        prompt: 'The discussion drifts into invoice codes. Which phrases steer it back?',
        groups: ['Steers back', 'Doesn\'t help'],
        items: [
          { text: 'Are we getting into the weeds? Shall I take the codes offline with Wanjiku?', group: 0 },
          { text: 'Building on that, here are twelve more codes...', group: 1 },
          { text: 'Big picture: does the test continue or not?', group: 0 },
          { text: 'On a slightly different note, drones...', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Emeka wants to switch ALL deliveries to the new courier on Monday. Remi disagrees. Best line?',
        options: [
          { text: '"With all due respect, that\'s ridiculous."', why: 'We know how that one goes.' },
          { text: '"I see it a bit differently: two more weeks on one route gives us real numbers first. Could we decide after that?"' },
          { text: 'Silence', why: 'Mr Kamau asked for views. Give yours, kindly.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'It\'s 10:35. Mr Kamau leaves at 10:45. Time to help him "land the ___". (one word)',
        answers: ['plane'],
        placeholder: 'One word',
      },
      {
        kind: 'orderLines',
        prompt: 'Remi closes the meeting at 10:38. Put it in order.',
        lines: ['We\'re nearly at time.', 'To recap: the courier test continues for two weeks on the Mombasa route.', 'Next steps: Emeka reports results by 3 November.', 'Any other business?'],
      },
      {
        kind: 'chatReply',
        from: 'kamau',
        message: 'Agreed. Two more weeks. Good work, Remi. Five minutes back for everyone.',
        prompt: 'Mr Kamau leaves. What does Remi say?',
        options: [
          { text: 'Thank you! Minutes will be with Mrs Achieng this afternoon.' },
          { text: 'Thanks bro!', why: 'Save "bro" for Zanele. (There\'s a whole chapter about this coming.)' },
          { text: 'Nothing, he\'s gone', why: 'A one-line thanks and what happens next is perfect.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Remi writes the minutes. Attendees or apologies?',
        groups: ['Attendees', 'Apologies'],
        items: [
          { text: 'Mr Kamau (chair)', group: 0 },
          { text: 'Brian Otieno (unwell, told the organiser)', group: 1 },
          { text: 'Emeka (joined by video)', group: 0 },
          { text: 'Remi (minutes)', group: 0 },
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s draft minutes. Which line would Mrs Achieng cross out?',
        lines: [
          'Remi presented the request to continue the courier test.',
          'Wanjiku reported 2 refunds in October.',
          'Emeka\'s plan to switch everything was honestly a bit much.',
          'It was agreed to continue the test for two weeks.',
        ],
        bug: 2,
        fix: 'Emeka proposed switching all deliveries; it was agreed to test further first.',
        explanation: 'Minutes are neutral. Opinions about a colleague\'s plan don\'t belong.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Remi\'s action line in the minutes.',
        template: 'Action: [[1]] to report test results by [[2]] November. Owner: [[3]].',
        blanks: [['Emeka'], ['3'], ['Emeka']],
        distractors: ['Everyone', 'someday'],
      },
      {
        kind: 'mcq',
        variant: 'pickPrompt',
        prompt: 'Best subject line for Remi\'s follow-up?',
        options: [
          { text: 'Supplier review (Friday): decisions and next steps' },
          { text: 'Meeting!!', why: 'Which meeting? Mrs Achieng has forty a week.' },
          { text: 'Minutes (probably)', why: 'Sounds unsure. They\'re his minutes: own them.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'Who does Remi send the minutes to first?',
        options: [
          { text: 'The whole company', why: 'Only the people involved, and the organiser checks first.' },
          { text: 'Zanele, for fun', why: 'She\'ll get the gossip at lunch.' },
          { text: 'Mrs Achieng, the organiser, to check' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'The whole chapter. Match the moment to the phrase.',
        pairs: [
          ['Opening', 'Shall we get started?'],
          ['Adding to a point', 'Building on that...'],
          ['Too much detail', 'We\'re in the weeds'],
          ['Closing', 'To recap...'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'ada',
        message: 'Remi!!! You ran a meeting with the CEO?? In WEEK TWO??',
        prompt: 'What does Remi send Ada?',
        options: [
          { text: 'Kind of! Opened it, gave the ask, took the minutes. He said "good work". I may never sleep again.' },
          { text: 'We levelled-set and landed the plane, synergistically.', why: 'Ada would reply with one word: "translation??"' },
          { text: 'It was fine.', why: 'It was a lot better than fine.' },
        ],
        answer: 0,
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the last line of Remi\'s follow-up.',
        tiles: ['Let', 'me', 'know', 'if', 'I', 'missed', 'anything.'],
        distractors: ['URGENT', 'per'],
      },
    ],
  },
  reflect: {
    prompt: 'Two weeks ago, Remi couldn\'t follow a meeting. Which meeting skill from this chapter will you use first in your own life: opening, asking, interrupting, disagreeing, steering, closing or minutes?',
    starters: ['The first one I\'ll use is...', 'I\'ll use it at...'],
  },
  deepen: {
    title: 'Coming up in Chapter 3: alphabet soup',
    summary: 'At 4:12 p.m., Brian replies to the minutes from his sickbed: "Gr8 work. FYI CEO v happy. Pls send MoM + AIs to Wanjiku & Emeka ASAP, cc me. OOO til Weds, WFH Thu. NB: KPI deck EOW. TBC re SLA. LGTM. B." Fourteen acronyms. Remi understands two of them.',
  },
  notes: 'Unit Challenge: reviews all of Chapter 2 plus Chapter 1. "Table" UK vs US (see l19 notes). Acronyms in the cliffhanger (FYI, CEO, MoM = minutes of meeting, AIs = action items, ASAP, cc, OOO, WFH, NB, KPI, EOW, TBC, SLA, LGTM = 14) are taught in Chapter 3. Dates are fictional.',
};

export default lesson;
