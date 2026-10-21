import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 4. Chat with Tey: change your phone, not your personality. */
const lesson: OriginalLesson = {
  key: 'l04',
  title: 'Change your phone, not your personality',
  summary: 'Seven of Kofi\'s first eleven urges came from his phone. He can\'t become a different person by Black Friday, but he can make his phone a different place. Tey walks him through a 20-minute phone clean-up.',
  minutes: 11,
  outcomes: [
    'Set up your phone so impulse buying takes more effort',
    'Cut the triggers that reach you',
    'Keep the good parts of your phone',
  ],
  learn: [
    {
      kind: 'chat',
      turns: [
        { tey: 'Twenty minutes, one phone. We\'re not deleting your life. We\'re adding speed bumps. First: saved cards. Where are they?', replies: ['In every shopping app.'] },
        { tey: 'Remove them all. For the one planned buy, you\'ll type your details in. That 60 seconds is a free pause. Next: notifications from shops.', replies: ['They buzz all day.'] },
        { tey: 'Turn off notifications from every shopping app. Unsubscribe from shop emails: one tap at the bottom of each. Fewer cues, fewer urges.', replies: ['And the apps themselves?'] },
        { tey: 'Move them off your home screen into a folder on the last page. Or log out, so buying needs a password. You can still shop; it just isn\'t one thumb away at 2 a.m.', replies: ['What about social media?'] },
        { tey: 'Mute the accounts that always leave you wanting. Not the friends: the sponsored posts, the "drop" accounts, the influencer with a code for everything. Your feed gets calmer immediately.', replies: ['Anything else?'] },
        { tey: 'Two last things. Keep pay-later turned off in any app that offers it. And set your phone to charge by the door after 10. That one change cut your late-night urges from 7 to 2.' },
      ],
    },
    {
      kind: 'callout',
      tone: 'tip',
      text: 'Remove saved cards, turn off shop notifications, unsubscribe, move apps off the home screen, mute trigger accounts, turn off pay later, phone by the door at night.',
    },
  ],
  apply: {
    scenario: 'The 20-minute phone clean-up.',
    items: [
      {
        kind: 'orderLines',
        prompt: 'Order Kofi\'s phone clean-up.',
        lines: ['Remove saved cards', 'Turn off shop notifications', 'Unsubscribe from shop emails', 'Move shopping apps off the home screen', 'Mute trigger accounts', 'Phone by the door after 10'],
      },
      {
        kind: 'sortGroups',
        prompt: 'Adds a speed bump, or removes one?',
        groups: ['Adds a speed bump', 'Removes one'],
        items: [
          { text: 'Logging out of shopping apps', group: 0 },
          { text: 'One-tap buy with a saved card', group: 1 },
          { text: 'Turning off shop notifications', group: 0 },
          { text: 'Pay later switched on', group: 1 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why remove saved cards?',
        options: [
          { text: 'Typing details in adds a free pause before every buy' },
          { text: 'Cards are unsafe', why: 'It\'s about adding a pause.' },
          { text: 'To stop all shopping', why: 'He can still shop; it just takes a minute.' },
        ],
        answer: 0,
      },
      {
        kind: 'chatReply',
        from: 'kofi',
        message: 'Shouldn\'t I just become a more disciplined person?',
        prompt: 'Tey\'s best reply?',
        options: [
          { text: 'You can\'t become a different person in two weeks. You can make your phone a different place in twenty minutes.' },
          { text: 'Yes, try harder.', why: 'That\'s willpower again. Design beats it.' },
          { text: 'Throw your phone away.', why: 'He needs it for beats and studies.' },
        ],
        answer: 0,
      },
      {
        kind: 'fillBlank',
        prompt: 'The idea.',
        template: 'Change your [[1]], not your [[2]].',
        blanks: [['phone'], ['personality']],
        distractors: ['friends', 'income'],
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each change to the trigger it cuts.',
        pairs: [
          ['Notifications off', 'Buzzing sale alerts'],
          ['Mute "drop" accounts', 'Sponsored posts and FOMO'],
          ['Phone by the door', 'Late-night scrolling in bed'],
          ['Pay later off', 'Buying money you don\'t have'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Which step goes too far and will probably snap back?',
        lines: [
          'Turn off shop notifications.',
          'Mute three trigger accounts.',
          'Delete every app including the one for my beat sales.',
        ],
        bug: 2,
        fix: 'Keep useful apps; add speed bumps to shopping ones.',
        explanation: 'Removing things he needs makes the clean-up unbearable. Target the shopping triggers.',
      },
      {
        kind: 'typeAnswer',
        prompt: 'Kofi unsubscribes from 12 shop email lists. If each sent 3 emails a week, how many fewer emails a week?',
        answers: ['36', 'thirty-six'],
        placeholder: 'A number',
      },
      {
        kind: 'mcq',
        prompt: 'Why mute sponsored and "drop" accounts but not friends?',
        options: [
          { text: 'They\'re the triggers; friends are the good part of the phone' },
          { text: 'Friends are worse', why: 'The aim is to keep connection and cut selling.' },
          { text: 'Muting is rude', why: 'Muting accounts is private and harmless.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        prompt: 'How long does the whole clean-up take?',
        options: [
          { text: 'About 20 minutes' },
          { text: 'A whole week', why: 'It\'s quick.' },
          { text: 'Two minutes', why: 'A bit longer, about 20.' },
        ],
        answer: 0,
      },
    ],
  },
  reflect: {
    prompt: 'Do the 20-minute clean-up on your phone. Which step made the biggest difference?',
    starters: ['I removed...', 'The biggest difference was...'],
  },
  deepen: {
    title: 'Friction works both ways',
    summary: 'Apps remove friction to make buying easy. You can add friction back to make buying thoughtful, and remove friction from saving (automatic transfers) to make saving easy. Design your phone for the habits you want.',
  },
  notes: 'Choice architecture/friction (Thaler & Sunstein 2008). Late-night urges 7 → 2 (Ch2). Fictional email counts.',
};

export default lesson;
