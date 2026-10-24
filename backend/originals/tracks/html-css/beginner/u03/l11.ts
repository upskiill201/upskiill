import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 3 · Lesson 11 — whose photo is it? Copyright, using your own or free-to-use pictures, crediting. Honesty choice. */
const lesson: OriginalLesson = {
  key: 'l11',
  title: 'Whose photo is it?',
  summary: 'Kofi finds a stunning photo of an Accra crowd at night and wants it at the top of his page. He found it in an image search. Can he just use it?',
  minutes: 12,
  outcomes: ['Explain why a photo online isn\'t free to use just because you found it', 'Choose your own or free-to-use pictures', 'Credit a photographer with a link'],
  learn: [
    {
      kind: 'story',
      title: 'The perfect photo',
      beats: [
        { speaker: 'narrator', text: 'Monday night. Kofi wants a big photo at the top of his page: a crowd with their hands up, lights everywhere. An image search finds the perfect one in seconds.' },
        { speaker: 'kofi', text: 'This is it. Download, upload, done.' },
        { speaker: 'miracle', text: 'Whose photo is it?' },
        { speaker: 'kofi', text: 'The internet\'s?' },
        { speaker: 'tey', text: 'Here\'s a rule most people don\'t know: a photographer owns the copyright to their photo the moment they take it. Finding it online doesn\'t make it free. Using it without permission can get the page taken down, or get Kofi a bill. And he\'s a musician: he\'d hate someone using his beats without asking.' },
      ],
      choice: {
        prompt: 'What should Kofi put at the top of his page?',
        options: [
          {
            text: 'His own photo, or one with a free-to-use licence, credited to the photographer.',
            outcome: 'David takes a photo of Kofi at the decks with his phone. It\'s less polished, and it\'s 100% Kofi. Fans like it more.',
            best: true,
          },
          {
            text: 'The search photo, with "credit: Google" underneath.',
            outcome: 'Google didn\'t take the photo. A credit isn\'t permission, and the search engine isn\'t the owner.',
          },
          {
            text: 'The search photo. Nobody will notice.',
            outcome: 'Photographers use reverse image search to find exactly this. A week later, an email arrives asking for payment.',
          },
        ],
      },
    },
    {
      kind: 'tryIt',
      title: 'A credit line',
      caption: 'When you use someone\'s photo with permission (or under a free licence), credit them, ideally with a link. Here, David took the photo.',
      code: '<img src="images/kofi.png" alt="Kofi at the decks in big headphones" width="200" height="200">\n<p><small>Photo by <a href="https://instagram.com/david">David</a>, used with permission.</small></p>\n',
      challenge: 'Change the credit to say Photo by David, Buea.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'Found it online doesn\'t mean free to use. Use your own pictures, ones you have permission for, or ones with a free licence, and credit the person who made them.',
    },
  ],
  apply: {
    scenario: 'Kofi picks pictures he\'s allowed to use.',
    items: [
      {
        kind: 'mcq',
        prompt: 'Kofi found a photo in an image search. Can he use it on his site?',
        options: [
          { text: 'Yes, anything online is free', why: 'The photographer owns it. Online isn\'t the same as free.' },
          { text: 'Only with permission or a licence that allows it' },
          { text: 'Yes, if he writes "credit: Google"', why: 'A search engine isn\'t the owner, and a credit isn\'t permission.' },
        ],
        answer: 1,
      },
      {
        kind: 'sortGroups',
        prompt: 'OK to use on Kofi\'s site, or not?',
        groups: ['OK to use', 'Not without permission'],
        items: [
          { text: 'A photo David took of Kofi, with David\'s OK', group: 0 },
          { text: 'A photo from an image search', group: 1 },
          { text: 'Kofi\'s own cover art', group: 0 },
          { text: 'A famous artist\'s album cover', group: 1 },
          { text: 'A photo with a free-to-use licence, credited', group: 0 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'Add a credit line under the photo: a paragraph in small that says Photo by David, with David linked to https://instagram.com/david',
        starter: '<img src="images/kofi.png" alt="Kofi at the decks" width="200" height="200">\n',
        solution: '<img src="images/kofi.png" alt="Kofi at the decks" width="200" height="200">\n<p><small>Photo by <a href="https://instagram.com/david">David</a></small></p>\n',
        hint: '<p><small>Photo by <a href="...">David</a></small></p>',
        checks: [
          { message: 'A small credit line', dom: { selector: 'small', text: 'Photo by David' } },
          { message: 'David is linked', dom: { selector: 'small a', text: 'David' } },
        ],
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'clinton',
        message: 'Bro, just use the crowd photo. Everybody does it.',
        options: [
          { text: 'You\'re right, everybody does.', why: 'Lots of people do, and some get takedown notices or bills. Kofi wants his site to last.' },
          { text: 'I\'d be angry if someone used my beats without asking. Same for their photo.' },
          { text: 'I\'ll crop it so nobody recognises it.', why: 'Cropping doesn\'t change who owns it.' },
        ],
        answer: 1,
      },
      {
        kind: 'mcq',
        prompt: 'When does a photographer get the copyright to a photo?',
        options: [
          { text: 'The moment they take it' },
          { text: 'Only after they register it', why: 'In most countries copyright is automatic. No registration needed.' },
          { text: 'Never, once it\'s online', why: 'Posting online doesn\'t give copyright away.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each word to what it means.',
        pairs: [
          ['Copyright', 'The creator\'s right to decide who uses their work'],
          ['Permission', 'The owner says yes'],
          ['Licence', 'Rules for how a work can be used, given in advance'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the credit that doesn\'t make it OK.',
        lines: ['Photo by David, used with permission.', 'Cover art by Mensah Beats.', 'Photo: found on Google Images.'],
        bug: 2,
        explanation: 'That\'s not a credit, it\'s a confession. Google isn\'t the owner, and nobody gave permission.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Found it online doesn\'t mean [[1]] to use. Ask the [[2]].',
        blanks: [['free'], ['owner']],
        distractors: ['fun', 'internet', 'search engine'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'The right a creator has over their photo, music or writing is called what?',
        answers: ['copyright'],
        placeholder: 'One word',
      },
      {
        kind: 'writeCode',
        prompt: 'Use Kofi\'s own cover instead of a downloaded one: show cover-1.png with alt text, and a small credit Cover art by Mensah Beats',
        starter: '<img src="crowd-from-google.jpg" alt="">\n',
        solution: '<img src="cover-1.png" alt="Album cover for Sunrise in Osu" width="200" height="200">\n<p><small>Cover art by Mensah Beats</small></p>\n',
        hint: 'Replace the src with cover-1.png and write a real alt. Add the credit in a p with small.',
        checks: [
          { message: 'Kofi\'s own cover', dom: { selector: 'img[src="cover-1.png"]', count: 1 } },
          { message: 'No downloaded photo left', dom: { selector: 'img[src*="google"]', count: 0 } },
          { message: 'It has alt text', dom: { selector: 'img', attr: 'alt' } },
          { message: 'A credit line', dom: { selector: 'small', text: 'Cover art by Mensah Beats' } },
        ],
      },
    ],
  },
  reflect: {
    prompt: 'You make things too: photos, drawings, writing, music. How would you feel if someone used them without asking?',
    starters: ['I\'d feel...', 'I\'d want them to...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Look up a free photo library that says "free to use" and read its licence page. What does it let you do, and what does it ask in return?',
  },
  notes: 'Berne Convention (181 contracting parties incl. Ghana): copyright is automatic on creation, no registration required. Credit is not permission. Free-licence libraries (e.g. Creative Commons-licensed works) state their terms. General principle only, not legal advice (playbook §9). Honesty choice per playbook §8a.7.',
};

export default lesson;
