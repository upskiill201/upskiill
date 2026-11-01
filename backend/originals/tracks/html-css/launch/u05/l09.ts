import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Course 3 · Chapter 5 · Lesson 9 — a tidy project folder and a backup before upload. Before / After. */
const lesson: OriginalLesson = {
  key: 'l09',
  title: 'A folder you can find things in',
  summary: 'Before uploading v2.0, Kofi opens his site folder. Forty files, three called "final". Efua helps him tidy it, and makes him keep a copy somewhere safe.',
  minutes: 11,
  outcomes: ['Organise a site folder clearly', 'Keep only the files the site needs online', 'Keep a backup before every big upload'],
  learn: [
    {
      kind: 'compare',
      title: 'Messy folder vs tidy folder',
      before: { label: 'Before', text: 'index.html\nindex-final.html\nindex-final-REAL.html\nstyle.css\nstyle-old.css\npage2.html\nIMG_4471.PNG\nnotes-for-me.txt\n...forty files in one place' },
      after: { label: 'After', text: 'index.html\nbeats.html\ngigs.html\nbook.html\nthanks.html\n404.html\nstyle.css\ncovers/\n  rain-on-zinc.webp\n  kente-code.webp\nimages/\n  share.jpg\nfavicon.png\nsitemap.xml' },
      notes: [
        'One version of each page. Old copies go in the backup, not online.',
        'Images in their own folders, named in lowercase with hyphens.',
        'Private notes never get uploaded.',
      ],
    },
    {
      kind: 'text',
      html: '<p><strong>Back up before you upload.</strong> Copy the whole folder somewhere else, like a USB stick or cloud storage, and name it with the version and date: mensah-beats-v2.0-2026-12-20. If anything goes wrong, you can put the old version back in minutes.</p>',
    },
    {
      kind: 'tryIt',
      title: 'Links that match the folders',
      caption: 'When images live in a covers folder, the src includes the folder name.',
      code: '<style>\n  body { background-color: #14213D; color: #FFF6E5; font-family: Verdana, sans-serif; }\n  img { width: 160px; height: auto; border-radius: 12px; }\n</style>\n<h1>Folder paths</h1>\n<img src="cover-2.png" alt="Kente Code cover" width="400" height="400">\n<p>On the real site this would be covers/kente-code.webp.</p>\n',
      challenge: 'Write the src you\'d use for a file called labadi-waves.webp inside the covers folder.',
    },
    {
      kind: 'callout',
      tone: 'remember',
      text: 'One version of each file, clear folders, nothing private online. Back up before every upload.',
    },
  ],
  apply: {
    scenario: 'A folder you can find things in.',
    items: [
      {
        kind: 'sortGroups',
        prompt: 'Upload it, or keep it off the site?',
        groups: ['Upload', 'Keep off the site'],
        items: [
          { text: '404.html', group: 0 },
          { text: 'notes-for-me.txt', group: 1 },
          { text: 'covers/rain-on-zinc.webp', group: 0 },
          { text: 'index-final-REAL.html', group: 1 },
        ],
      },
      {
        kind: 'writeCode',
        prompt: 'The cover moved into the covers folder. Change the src to "covers/kente-code.webp"',
        starter: '<img src="kente-code.webp" alt="Kente Code cover" width="600" height="600">\n',
        solution: '<img src="covers/kente-code.webp" alt="Kente Code cover" width="600" height="600">\n',
        hint: 'Put covers/ in front of the file name.',
        checks: [
          { message: 'The new path', dom: { selector: 'img', attr: 'src', attrValue: 'covers/kente-code.webp' } },
        ],
      },
      {
        kind: 'mcq',
        prompt: 'Why name a backup "mensah-beats-v2.0-2026-12-20"?',
        options: [
          { text: 'Backups need long names to work', why: 'It\'s so you can find the right one.' },
          { text: 'You can tell exactly which version and day it is, months later' },
          { text: 'It makes the site faster', why: 'Backups aren\'t online.' },
        ],
        answer: 1,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each file to its folder.',
        pairs: [
          ['rain-on-zinc.webp', 'covers/'],
          ['share.jpg', 'images/'],
          ['book.html', 'The main folder'],
        ],
      },
      {
        kind: 'findBug',
        prompt: 'Tap the image that won\'t load after the tidy-up.',
        language: 'html',
        lines: ['<img src="covers/rain-on-zinc.webp" alt="Rain on Zinc cover">', '<img src="IMG_4471.PNG" alt="Labadi Waves cover">', '<img src="covers/kente-code.webp" alt="Kente Code cover">'],
        bug: 1,
        explanation: 'That file was renamed and moved. It\'s now covers/labadi-waves.webp.',
        fix: '<img src="covers/labadi-waves.webp" alt="Labadi Waves cover">',
      },
      {
        kind: 'chatReply',
        prompt: 'Pick the best reply.',
        from: 'efua',
        message: 'Do you have a copy of the old site anywhere?',
        options: [
          { text: 'I\'ll copy the whole folder now and name it with the version and date, before I upload.' },
          { text: 'No, the new one will be fine.', why: 'A backup costs a minute and saves hours.' },
          { text: 'It\'s in index-final-REAL.html.', why: 'That\'s one page, not a backup.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'The file is at covers/rain-on-zinc.webp. Does this load?',
        code: '<img src="Covers/Rain-On-Zinc.webp" alt="Rain on Zinc cover">',
        language: 'html',
        options: [
          { text: 'Always, capitals never matter', why: 'On many servers they do.' },
          { text: 'Probably not online: many servers treat capitals as different letters' },
          { text: 'Only on phones', why: 'It\'s about the server.' },
        ],
        answer: 1,
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the path.',
        language: 'html',
        template: '<img src="[[1]]/labadi-waves.[[2]]" alt="Labadi Waves cover">',
        blanks: [['covers'], ['webp']],
        distractors: ['Covers', 'final', 'txt'],
      },
      {
        kind: 'orderLines',
        prompt: 'Put the tidy-up in order.',
        lines: ['Back up the whole folder', 'Delete old copies from the site folder', 'Move images into folders', 'Fix every src and href', 'Check every page again'],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What do you make before every big upload, in case something goes wrong? (one word)',
        answers: ['backup', 'back-up', 'copy'],
        placeholder: 'One word',
      },
    ],
  },
  reflect: {
    prompt: 'Is there anything in your site folder that shouldn\'t be online?',
    starters: ['I found...', 'I\'ll move...'],
  },
  deepen: {
    title: 'Try it now',
    summary: 'Back up your site folder with a version and date in the name. Then tidy the original: one version of each page, images in folders, nothing private.',
  },
  notes: 'Case-sensitivity depends on the server (most Linux hosts are case-sensitive), hence "many servers". Date in backup name uses the show date, 20 Dec.',
};

export default lesson;
