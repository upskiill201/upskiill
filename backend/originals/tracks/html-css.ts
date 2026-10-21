import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './html-css/beginner/u01';
import u02 from './html-css/beginner/u02';
import u03 from './html-css/beginner/u03';
import u04 from './html-css/beginner/u04';
import u05 from './html-css/beginner/u05';
import r01 from './html-css/responsive/u01';
import r02 from './html-css/responsive/u02';
import r03 from './html-css/responsive/u03';
import r04 from './html-css/responsive/u04';
import r05 from './html-css/responsive/u05';
import b01 from './html-css/launch/u01';
import b02 from './html-css/launch/u02';

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
 *
 * Founder, 2026-10-20: courses have 5 chapters, so the track is three
 * 'focused' levels (5 chapters × 20 lessons each), 15 chapters in all, still
 * one summer countdown to university:
 *
 *   1. HTML & CSS for Beginners ("Kofi Goes Live"): first page, text, links
 *      and media, first CSS, colour and type, and publishing v1.
 *   2. Responsive Web Design with CSS ("Kofi's Site Grows Up"): the box
 *      model, classes and the cascade, Flexbox, Grid, phones first.
 *   3. Build and Launch a Website ("Kofi Goes Pro"): forms, motion,
 *      accessibility, search basics, and launch night.
 */
const track: OriginalTrackDef = {
  slug: 'html-css-for-beginners',
  title: 'HTML & CSS',
  category: 'Coding',
  format: 'focused',
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
        "HTML says what's on a web page. CSS says how it looks. Together they build every website you have ever opened, and they're the friendliest first step into coding, because you see what you made the moment you make it. Follow Kofi, a music producer in Accra with twelve weeks before university, as he builds a website for his beats after a gig organiser asks, \"Send me your website.\" Every lesson changes a real, live page on your screen, with nothing to install. Alongside Kofi's site you build your own page, and by the last chapter of this course you publish it on the internet and share the link. Tey explains every tag, every style and every mistake in plain words.",
      startingPoint: 'You have never written code or made a web page. You can use a phone or computer comfortably.',
      endOutcome: 'Build a personal web page with HTML, style it with CSS colours and fonts, and publish it on the internet for free.',
      outcomes: [
        'Write real HTML and watch your page change as you type',
        'Structure pages with headings, lists, links, pictures and sound',
        'Style pages with CSS selectors, colours and fonts',
        'Choose colours and type that look good and are easy to read',
        'Publish your own website on the internet for free',
      ],
      skills: ['HTML', 'CSS', 'Web design'],
      thumbnailUrl: '/originals/html-css-for-beginners.jpg',
      upcomingUnits: 0,
      units: [u01, u02, u03, u04, u05],
    },
    {
      level: 2,
      slug: 'responsive-web-design-css',
      title: 'Responsive Web Design with CSS',
      subtitle: 'Kofi\'s Site Grows Up: layouts that fit every screen, from Grandma\'s phone to a laptop',
      shortDescription:
        'Turn a simple page into a real site: tidy cards, a proper header, galleries that line up, and layouts that rearrange themselves for phones. Ten-minute lessons on a live page.',
      description:
        "Your page is online. Now make it look like a real site. Follow Kofi through the next five weeks before university as Mensah Beats grows from one plain list into a site with beat cards, a navigation bar, a gallery of covers and a gig calendar, all of it working on every phone and laptop in the house. Miracle, a developer in Lagos, mentors him on video calls; Efua sketches the designs; his ten-year-old sister Ama tests everything on her old phone. You learn the box model, classes and the cascade, Flexbox, CSS Grid and phones-first layouts with media queries, and every lesson changes a live page on your screen. Alongside Kofi's site, you rebuild your own page into a responsive one.",
      startingPoint: 'You can write a simple page with HTML and style it with CSS colours and fonts, as in HTML & CSS for Beginners.',
      endOutcome: 'Lay out a multi-section website with the box model, classes, Flexbox and Grid that adapts to phones, tablets and laptops.',
      outcomes: [
        'Space and size elements with the box model',
        'Reuse styles with classes and understand which rule wins',
        'Line things up in rows and columns with Flexbox',
        'Build galleries and grids with CSS Grid',
        'Make layouts that work on phones first, with media queries',
      ],
      skills: ['CSS', 'Responsive design', 'Flexbox', 'CSS Grid'],
      thumbnailUrl: '/originals/responsive-web-design-css.jpg',
      upcomingUnits: 0,
      units: [r01, r02, r03, r04, r05],
    },
    {
      level: 3,
      slug: 'build-and-launch-a-website',
      title: 'Build and Launch a Website',
      subtitle: 'Kofi Goes Pro: forms, motion, accessibility and search, then launch night',
      shortDescription:
        'Turn your site into the real thing: a booking form, gentle motion, a site everyone can use, and pages people can find on search. Then launch it properly. Ten-minute lessons on a live page.',
      description:
        "Your site works on every screen. Now make it professional. Follow Kofi through the last two weeks before university as Mensah Beats gets a booking form the Sound Up Saturdays organiser actually fills in, motion that feels alive without making anyone dizzy, checks that make it work for everyone, and the titles, descriptions and sharing previews that help people find it. Then comes launch night: Mensah Beats v2.0. Miracle mentors him, Efua designs, and Ama and Grandma test everything. Every lesson changes a live page on your screen, and alongside Kofi's site you finish your own personal site, ready to share.",
      startingPoint: 'You can build a responsive page with HTML and CSS, as in Responsive Web Design with CSS.',
      endOutcome: 'Build and launch a complete, accessible website with forms, motion and search basics, and share it with confidence.',
      outcomes: [
        'Build forms with labels, the right input types and helpful checks',
        'Add hover effects, transitions and animations that respect people who turn motion off',
        'Make a site work for keyboard and screen reader users',
        'Write titles, descriptions and sharing previews that help people find your site',
        'Launch a finished website and share it',
      ],
      skills: ['HTML forms', 'CSS animation', 'Web accessibility', 'SEO basics'],
      thumbnailUrl: '/originals/build-and-launch-a-website.jpg',
      upcomingUnits: 3,
      units: [b01, b02],
    },
  ],
};

export default track;
