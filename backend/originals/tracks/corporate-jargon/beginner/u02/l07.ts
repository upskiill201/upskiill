import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 2 · Lesson 7. Myth or Fact: video-call phrases and manners — on mute, breaking up, froze, jump off, camera on/off. */
const lesson: OriginalLesson = {
  key: 'l07',
  title: '"You\'re on mute" and other video-call phrases',
  summary: 'Halfway through the supplier sync, Emeka in Lagos talks for two minutes. Nobody hears a word. Video calls have their own language, and their own manners.',
  minutes: 11,
  outcomes: [
    'Decode common video-call phrases',
    'Tell someone politely that something\'s wrong with their call',
    'Know the basic manners of video meetings, and where they differ',
  ],
  learn: [
    {
      kind: 'myth',
      statements: [
        { text: '"You\'re breaking up" means your sound or video is cutting in and out.', isFact: true, explain: 'Yes: the connection is bad, so only bits of what you say get through.' },
        { text: '"I have to jump" means the person is about to do some exercise.', isFact: false, explain: 'It means they have to leave the call, usually for another meeting. Also: "I need to drop off".' },
        { text: 'Muting yourself when you\'re not speaking is good manners on big calls.', isFact: true, explain: 'It stops background noise (traffic, typing, the neighbour\'s rooster) from drowning out the speaker.' },
        { text: 'Having your camera off is always rude.', isFact: false, explain: 'It depends on the team, the meeting and the internet connection. Many teams expect cameras on for small meetings and don\'t mind for big ones. When in doubt, ask or follow what others do.' },
        { text: '"Let\'s hop on a call" means let\'s have a quick phone or video call.', isFact: true, explain: 'Yes, informal: "Can we hop on a call for five minutes?"' },
        { text: '"You froze" means you looked cold.', isFact: false, explain: 'Your picture stopped moving because of the connection. Everyone has frozen mid-sentence with their mouth open at least once.' },
      ],
    },
    {
      kind: 'story',
      beats: [
        { speaker: 'narrator', text: 'Emeka, Synergix\'s logistics lead in Lagos, is talking. His mouth is moving. There is no sound. He has been talking for two minutes.' },
        { speaker: 'zanele', text: '(in the chat) EMEKA YOU ARE ON MUTE' },
        { speaker: 'remi', text: 'Sorry Emeka, I think you\'re on mute.' },
        { speaker: 'narrator', text: 'Emeka unmutes. "Ah! Did nobody hear the last two minutes? It was my best work."' },
        { speaker: 'tey', text: "Two ways to say the same thing. Zanele's ALL CAPS feels like shouting. Remi's \"Sorry, I think you're on mute\" is the classic: polite, quick, a little bit funny. Everyone has been on mute." },
      ],
    },
    {
      kind: 'text',
      html: "<p>Useful video-call phrases:</p><ul><li><strong>\"Sorry, I think you're on mute.\"</strong> They're talking but nobody can hear.</li><li><strong>\"You're breaking up a bit, could you say that again?\"</strong> Bad connection.</li><li><strong>\"You froze for a second there.\"</strong> Their picture stopped.</li><li><strong>\"Sorry, go ahead.\"</strong> When two people start talking at once (it happens constantly because of the delay).</li><li><strong>\"I'll have to jump at half past.\"</strong> A polite warning that you'll leave early.</li><li><strong>\"I'll drop the link in the chat.\"</strong> I'll paste it into the chat box.</li></ul>",
    },
  ],
  apply: {
    scenario: 'Wednesday. The supplier sync, on video.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Emeka is talking but nobody can hear him. What\'s the best thing to say?',
        options: [
          { text: 'EMEKA YOU ARE ON MUTE (in the chat)', why: 'It works, but capitals feel like shouting.' },
          { text: 'Nothing, he\'ll notice', why: 'He won\'t, and his best work is being lost.' },
          { text: '"Sorry Emeka, I think you\'re on mute."' },
        ],
        answer: 2,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the phrase to what\'s happening.',
        pairs: [
          ['You\'re breaking up', 'Bad connection, sound cutting out'],
          ['You froze', 'Picture stopped moving'],
          ['I have to jump', 'I need to leave the call'],
          ['Drop it in the chat', 'Paste it in the chat box'],
        ],
      },
      {
        kind: 'chatReply',
        from: 'zanele',
        message: 'Should I turn my camera off? My internet is terrible today.',
        prompt: 'What does Remi suggest?',
        options: [
          { text: 'Never! Cameras off is rude.', why: 'It depends. With bad internet, camera off can save the call.' },
          { text: 'Yes, and just say "My connection\'s bad, so I\'ll keep my camera off so you can hear me."' },
          { text: 'Leave the call.', why: 'There\'s a simpler fix.' },
        ],
        answer: 1,
      },
      {
        kind: 'typeAnswer',
        prompt: 'Brian: "Let\'s ___ on a call for five minutes." (one word)',
        answers: ['hop', 'jump'],
        placeholder: 'One word',
      },
      {
        kind: 'sortGroups',
        prompt: 'Good video-call manners, or not?',
        groups: ['Good manners', 'Not great'],
        items: [
          { text: 'Mute when you\'re not speaking on a big call', group: 0 },
          { text: 'Typing loudly while unmuted', group: 1 },
          { text: 'Warning people you\'ll have to leave early', group: 0 },
          { text: 'Leaving without a word', group: 1 },
          { text: '"Sorry, go ahead" when you talk over someone', group: 0 },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Remi and Emeka start talking at exactly the same time. What\'s the polite move?',
        options: [
          { text: 'Talk louder', why: 'That\'s how two people end up shouting into a delay.' },
          { text: '"Sorry, go ahead."' },
          { text: 'Leave the call', why: 'A bit dramatic.' },
        ],
        answer: 1,
      },
      {
        kind: 'findBug',
        prompt: 'Remi\'s message before a call. Which line is the problem?',
        lines: [
          'Hi all, I\'ll join from my phone today.',
          'I\'ll have to jump at 10:30 for the CEO meeting.',
          'I\'ll stay unmuted the whole time on the bus.',
        ],
        bug: 2,
        fix: 'I\'ll stay on mute unless I\'m speaking, as I\'ll be on the bus.',
        explanation: 'A bus has engines, horns and conversations. Mute is everyone\'s friend.',
      },
      {
        kind: 'mcq',
        prompt: 'Is "camera off" always rude?',
        options: [
          { text: 'No: it depends on the team, the meeting and the connection. Follow what others do, or ask.' },
          { text: 'Yes, always', why: 'Many teams don\'t mind, especially for big meetings or bad connections.' },
          { text: 'No, cameras are always optional', why: 'Some teams expect cameras on for small meetings. It varies.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Chapter 1 review.',
        pairs: [
          ['FYI', 'For your information, no action needed'],
          ['Ballpark figure', 'A rough estimate'],
          ['The ball is in your court', 'It\'s your turn to act'],
        ],
      },
      {
        kind: 'tapBuild',
        prompt: 'Build the polite way to ask someone to repeat.',
        tiles: ['You\'re', 'breaking', 'up.', 'Could', 'you', 'say', 'that', 'again?'],
        distractors: ['froze', 'mute'],
      },
    ],
  },
  reflect: {
    prompt: 'What\'s the funniest or most awkward thing you\'ve seen happen on a video call? Which phrase from today would have helped?',
    starters: ['The most awkward moment was...', 'The phrase that would have helped is...'],
  },
  deepen: {
    title: 'Your video-call checklist',
    summary: 'Before your next call: check your mic and camera, find a quiet spot or plan to stay on mute, and know how to share your screen. Thirty seconds of checking saves five minutes of "can you hear me?".',
  },
  notes: '"Breaking up" (Cambridge: of a phone signal, becoming hard to hear), "jump/drop off a call" (informal), "hop on a call" (informal), "on mute". Camera norms vary by organisation and region; lesson presents this as varying. Emeka is a Synergix Lagos colleague (named extra).',
};

export default lesson;
