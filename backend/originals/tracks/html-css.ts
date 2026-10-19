import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './html-css/beginner/u01';

/**
 * HTML & CSS for Beginners — storyline "Kofi Goes Live".
 * Outline and story: docs/originals/html-css-beginner-outline.md (approved 2026-10-19).
 *
 * Kofi (Accra, the summer before university) builds a website for his beats,
 * Mensah Beats, after Sound Up Saturdays asks for one. Miracle (Afiya, Lagos)
 * mentors him on video calls; Clinton and David are his first fans; Efua
 * reviews his pages; Ama (10, his sister) is his user tester. Alongside
 * Kofi's site, learners build their own page. Every lesson edits a live page
 * (runner: 'html' → frontend/lib/code/htmlRunner.ts), checked by looking at the
 * rendered page, not the wording of the code. Sounds and pictures for Kofi's
 * site live in frontend/public/originals/html-css (made by Teyro).
 */
const track: OriginalTrackDef = {
  slug: 'html-css-for-beginners',
  title: 'HTML & CSS for Beginners',
  category: 'Coding',
  description: 'Build your first website from a blank page, with a live page that changes the moment you type, and publish it on the internet.',
  runner: 'html',
  levels: [
    {
      level: 1,
      slug: 'html-css-for-beginners',
      title: 'HTML & CSS for Beginners',
      subtitle: 'Kofi Goes Live: from a blank page to your own website on the internet',
      shortDescription:
        'Build your first website, right on your phone. Ten-minute lessons, a streak to keep, and a live page that changes the moment you type. By the end, it\'s on the internet with your name on it.',
      description:
        "HTML says what's on a web page. CSS says how it looks. Together they build every website you have ever opened, and they're the friendliest first step into coding, because you see what you made the moment you make it. Follow Kofi, a music producer in Accra with twelve weeks before university, as he builds a website for his beats after a gig organiser asks, \"Send me your website.\" Every lesson changes a real, live page on your screen, with nothing to install. Alongside Kofi's site you build your own page, and by the last chapter you publish it on the internet and share the link. Tey explains every tag, every style and every mistake in plain words.",
      startingPoint: 'You have never written code or made a web page. You can use a phone or computer comfortably.',
      endOutcome: 'Build and publish a good-looking, mobile-friendly personal website with HTML and CSS, and read and fix other people\'s simple pages.',
      outcomes: [
        'Write real HTML and watch your page change as you type',
        'Structure pages with headings, lists, links, pictures and sound',
        'Style pages with CSS: colours, fonts, spacing and boxes',
        'Lay out pages with Flexbox and Grid that work on any phone',
        'Build forms, hover effects and kind animations',
        'Publish your own website on the internet for free',
      ],
      skills: ['HTML', 'CSS', 'Web design', 'Responsive design'],
      upcomingUnits: 12,
      units: [u01],
    },
  ],
};

export default track;
