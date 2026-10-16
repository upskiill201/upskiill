import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 10 — Final Challenge: clinic 300, Friday night. */
const lesson: OriginalLesson = {
  key: 'l10',
  title: 'Final challenge: clinic 300',
  summary: 'Week 8, Friday, 6:40 p.m. 299 clinics live. Clinic 300, in Sokoto, loses power mid-setup. Rollout is tomorrow at 9 a.m. The whole team wants to stay all night. "We\'re not stopping at 299!" Miracle\'s rules say home by 7.',
  minutes: 15,
  milestone: 'UNIT_CHALLENGE',
  outcomes: [
    'Use every tool from the course in one final moment',
    'Hold a healthy rule when the team wants to break it',
    'Finish the goal and keep the team',
  ],
  learn: [
    {
      kind: 'story',
      title: 'Week 8, Friday, 6:40 p.m.',
      beats: [
        { speaker: 'bisi', text: 'We\'re not stopping at 299! I\'ll order suya. We stay till it\'s done!' },
        { speaker: 'chidi', text: 'Sokoto\'s power is out until morning. Even if we stay, nothing happens till then.' },
        { speaker: 'emmanuel', text: 'I\'m on call tomorrow anyway. I start at 7.' },
        { speaker: 'narrator', text: 'Eight weeks ago, nobody on this team would have stayed a minute late. Now they all want to. It\'s the best sign of motivation Miracle has seen. It\'s also the exact moment her rules were written for. You\'re with Miracle.' },
      ],
    },
  ],
  apply: {
    scenario: 'Friday, 6:40 p.m.',
    items: [
      {
        kind: 'mcq',
        prompt: 'What should Miracle say?',
        options: [
          { text: '"I love that you want to stay. Sokoto has no power till morning. Emmanuel is on call at 7. Everyone else: home, and back for the bell at 9."' },
          { text: '"Yes! Everyone stays!"', why: 'Nothing can happen till the power returns, and the rule exists for this.' },
          { text: '"Go home, it\'s just one clinic."', why: 'It\'s clinic 300. Respect how much it matters to them.' },
        ],
        answer: 0,
      },
      {
        kind: 'sortGroups',
        prompt: 'Which tool from the course?',
        groups: ['Chapters 1 and 2', 'Chapter 3', 'Chapters 4 and 5'],
        items: [
          { text: 'Fix the broken headsets first', group: 0 },
          { text: 'Learning goal before a target', group: 1 },
          { text: 'Home by 7, on-call covers it', group: 2 },
          { text: 'Meet the people you help', group: 0 },
          { text: 'Check in, don\'t check up', group: 1 },
          { text: 'End it well, then rest', group: 2 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'bisi',
        message: 'But it feels wrong to go home at 299!',
        prompt: 'Miracle\'s best reply?',
        options: [
          { text: 'Rules are rules.', why: 'True, but it ignores how she feels.' },
          { text: 'Fine, stay then.', why: 'Folding on the rule at the moment it matters most.' },
          { text: 'It does. So be here at 9 a.m., and ring the bell for clinic 300 with all of us. That\'s the moment.' },
        ],
        answer: 2,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Eight weeks ago the motivation score was 2.___ out of 5. (one digit)',
        answers: ['1', 'one'],
        placeholder: 'One digit',
      },
      {
        kind: 'orderLines',
        prompt: 'Put Miracle\'s eight weeks in order.',
        lines: ['Week 1: nobody wants to be here', 'Week 2: why does this matter?', 'Week 4: let them run with it', 'Week 6: fair and seen', 'Week 8: rollout'],
      },
      {
        kind: 'mcq',
        prompt: 'Why is the team wanting to stay a good sign?',
        options: [
          { text: 'They\'re scared of Folake', why: 'Nobody mentioned Folake.' },
          { text: 'They want overtime pay', why: 'Bisi offered to buy suya.' },
          { text: 'They care about the goal now: motivation, not pressure' },
        ],
        answer: 2,
      },
      {
        kind: 'findBug',
        prompt: 'Miracle\'s message to Folake. Which line forgets the course?',
        lines: [
          '299 live. Sokoto has no power until morning.',
          'The team will stay all night to be safe.',
          'Emmanuel on call from 7; bell at 9 a.m. for clinic 300.',
        ],
        bug: 1,
        fix: 'Everyone else is home and rested for tomorrow.',
        explanation: 'An all-nighter with nothing to do just to "be safe" is the old way.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the person to their eight-week story.',
        pairs: [
          ['Bisi', 'From sweepstake to "MY CLINICS"'],
          ['Chidi', 'From bank offer to the northern 40'],
          ['Halima', 'From outsider to Kano trainer'],
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Saturday, 8:52 a.m.: clinic 300 goes live. Chidi tells Miracle he\'s turned the bank down for good. What should she do?',
        options: [
          { text: 'Ask him to take on more tickets', why: 'More of the boring thing is what nearly lost him.' },
          { text: 'Thank him, ask what he wants to grow into next, and ring the bell with everyone' },
          { text: 'Nothing; he\'s staying anyway', why: 'Staying needs feeding, every quarter.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'The whole course, in one line.',
        template: 'Fix what [[1]] them, show who they [[2]], let them [[3]], and treat them fairly.',
        blanks: [['frustrates', 'blocks'], ['help'], ['run', 'grow']],
        distractors: ['pay', 'fear'],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build Miracle\'s last instruction.',
        tiles: ['Home,', 'and', 'back', 'for', 'the', 'bell.'],
        distractors: ['stay'],
      },
    ],
  },
  reflect: {
    prompt: 'Look back at the whole course. Which one idea will you use this month, and with which team or group?',
    starters: ['The idea I\'ll use is...', 'With...'],
  },
  deepen: {
    title: 'Your Week 1',
    summary: 'You\'ve finished How to Motivate a Team. This week, ask one person the stay-interview questions, fix one broken headset in their work, and tell them one specific thing they did well.',
  },
  notes: 'Final challenge: synthesis of the whole course. Sustaining healthy norms under intrinsic motivation; peak-end celebration; retention through competence. Fictional events.',
};

export default lesson;
