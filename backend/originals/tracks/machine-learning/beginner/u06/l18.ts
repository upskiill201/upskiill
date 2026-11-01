import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';
import { LR_FIT } from './code';

const T = LR_FIT + 't = test.assign(p=model.predict_proba(test[feats])[:, 1])\n';

/** Chapter 6 · Lesson 18 — Reading a classifier's output honestly. */
const lesson: OriginalLesson = {
  key: 'l18',
  title: 'Reading a classifier\'s output',
  summary: 'Folake wants one page she can take to the clinic managers. What should it say, and what must it never claim? A short reading on how to report a classifier honestly.',
  minutes: 11,
  outcomes: [
    'Report a classifier\'s results in plain words',
    'Say what a chance does and doesn\'t mean',
    'Include the numbers a manager needs',
  ],
  learn: [
    {
      kind: 'reading',
      title: 'One honest page',
      html: '<p>Halima drafts the page for Folake. Every line has to survive a sceptical clinic manager.</p><p><strong>What the model does.</strong> "For each booking, the model gives a chance of not turning up, from four things we know when the booking is made: how long they waited, how far they live, how often they missed before, and whether they got a reminder."</p><p><strong>How well, in the clinic\'s terms.</strong> "On a week the model had never seen, the 20 bookings it ranked riskiest included 12 who really missed. Picking 20 at random would have found about 4."</p><p><strong>What a chance means.</strong> "A chance of 0.7 means: of bookings that look like this, about 7 in 10 miss. It does not mean this person will miss. Three in ten will come."</p><p><strong>What it can\'t do.</strong> "It catches about a third of no-shows with 20 calls. It knows nothing about illness, transport strikes or the weather. It was tested on one week."</p><p><strong>Where it\'s weakest.</strong> "Gumel has the most risky bookings: 8 of the 44 above 0.3 in week 12."</p><p><strong>What it must never say.</strong> Halima deletes one line from her draft: "The model is 82% accurate." True, and almost useless, for a reason the next lessons make painful.</p>',
    },
    {
      kind: 'check',
      question: 'Which line belongs on Folake\'s page?',
      options: ['The model knows who will miss', 'Accuracy: 82%, so it\'s nearly perfect', 'Of 20 calls, 12 reached people who would have missed'],
      answer: 2,
      explanation: 'It\'s in the clinic\'s terms and it\'s honest.',
    },
    {
      kind: 'tryIt',
      title: 'The numbers for the page',
      caption: 'Everything Halima quotes, from one run.',
      code: T + '\nprint("Top 20 catches:", t.nlargest(20, "p")["no_show"].sum())\nprint("Random 20 would get about:", round(20 * t["no_show"].mean(), 1))\nprint("Above 0.3 by clinic:")\nprint(t[t["p"] >= 0.3].groupby("clinic").size().sort_values(ascending=False))\n',
      challenge: 'Add the share of all week-12 no-shows that the top 20 reaches.',
    },
  ],
  apply: {
    scenario: 'Reading a classifier\'s output.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print how many no-shows picking 20 bookings at random would reach on average, rounded to 1 place',
        starter: T,
        solution: T + 'print(round(20 * t["no_show"].mean(), 1))\n',
        hint: '20 times the no-show rate',
        checks: [{ message: 'Print 3.7', outputEquals: '3.7' }],
      },
      {
        kind: 'mcq',
        prompt: 'A booking has a chance of 0.7. What should the page say?',
        options: [
          { text: 'About 7 in 10 bookings like this miss; this person may still come' },
          { text: 'This person will miss', why: 'A chance isn\'t a certainty.' },
          { text: 'The model is 70% accurate', why: 'That\'s a different number.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print how many week-12 bookings at Gumel have a chance of 0.3 or more',
        starter: T + 'risky = t[t["p"] >= 0.3]\n',
        solution: T + 'risky = t[t["p"] >= 0.3]\nprint((risky["clinic"] == "Gumel").sum())\n',
        hint: '(risky["clinic"] == "Gumel").sum()',
        checks: [{ message: 'Print 8', outputEquals: '8' }],
      },
      {
        kind: 'sortGroups',
        prompt: 'On the page, or off it?',
        groups: ['On the page', 'Off the page'],
        items: [
          { text: '12 of the top 20 really missed', group: 0 },
          { text: 'It was tested on one week', group: 0 },
          { text: 'The model knows who will miss', group: 1 },
          { text: 'Coefficient of sms_reminder: −0.985', group: 1 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'folake',
        message: 'Can I tell the managers it\'s 82% accurate? That sounds great.',
        prompt: 'Halima\'s best reply?',
        options: [
          { text: 'Yes, say 82%.', why: 'Halima has a reason to drop it.' },
          { text: 'Say 100%.', why: 'That\'s false.' },
          { text: 'I\'d rather not. It\'s true, but it hides something. "12 of the riskiest 20 really missed" tells them what it does for their mornings.' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the page section to its line.',
        pairs: [
          ['What it does', 'Gives each booking a chance of not coming'],
          ['How well', '12 of the riskiest 20 missed'],
          ['What it can\'t do', 'Knows nothing about strikes or illness'],
          ['Where it\'s weakest', 'Gumel has the most risky bookings'],
        ],
      },
      {
        kind: 'fillBlank',
        prompt: 'A chance, in plain words.',
        template: 'A chance of 0.7 means about [[1]] in 10 bookings like this [[2]].',
        blanks: [['7'], ['miss']],
        distractors: ['3', 'come'],
      },
      {
        kind: 'findBug',
        prompt: 'Which line on the page overclaims?',
        lines: ['Tested on one week the model had never seen.', '20 calls reached 12 people who would have missed.', 'With this model, no-shows will stop.'],
        bug: 2,
        fix: 'With 20 calls, we can reach about a third of no-shows.',
        explanation: 'The model ranks; it doesn\'t stop anything on its own.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'How many weeks was the model tested on so far?',
        answers: ['1', 'one'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why say "tested on one week" on the page?',
        options: [
          { text: 'To sound modest', why: 'It\'s about evidence, not tone.' },
          { text: 'So managers know how much evidence there is: one week could be lucky or unlucky' },
          { text: 'It\'s required by law', why: 'It\'s honest reporting.' },
        ],
        answer: 1,
      },
    ],
  },
  reflect: {
    prompt: 'Think of a statistic you\'ve seen in an advert. What would an honest version of the same claim say?',
    starters: ['The advert said...', 'An honest version...'],
  },
  deepen: {
    title: 'Calibration',
    summary: 'A model is well calibrated if, among bookings it gives about 0.7, about 7 in 10 really miss. Checking this needs many predictions; Chapter 7 looks at it alongside the other ways to measure a classifier.',
  },
  notes: 'Week 12 LR: top 20 catches 12; no-show rate 37/200 -> random 20 ~3.7. Above 0.3: 44 bookings; by clinic Gumel 8, Kano City 7, Ibadan North 6, Ikeja 6, Yaba 6, Surulere 4, Wuse 4, Lekki 3. Accuracy 0.82 (dropped from the page; Chapter 7 explains why).',
};

export default lesson;
