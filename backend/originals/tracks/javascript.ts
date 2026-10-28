import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './javascript/beginner/u01';
import u02 from './javascript/beginner/u02';
import u03 from './javascript/beginner/u03';
import u04 from './javascript/beginner/u04';
import u05 from './javascript/beginner/u05';
import p01 from './javascript/pages/u01';
import p02 from './javascript/pages/u02';
import p03 from './javascript/pages/u03';
import p04 from './javascript/pages/u04';
import p05 from './javascript/pages/u05';
import a01 from './javascript/apps/u01';
import a02 from './javascript/apps/u02';
import a03 from './javascript/apps/u03';
import a04 from './javascript/apps/u04';
import a05 from './javascript/apps/u05';

/**
 * JavaScript: From Beginner to Interactive Apps — storyline "Silver Pine".
 * Outline and story: docs/originals/javascript-outline.md; cast in CAST.md.
 *
 * Nora, a lift operator at a 1961 family ski hill in Colorado, built its
 * static website last summer. This winter she makes it behave like an app.
 * Three linked short courses (5 chapters × 10 lessons each), one season:
 *
 *   1. JavaScript for Beginners ("First Chair", December): the console:
 *      values, decisions, functions, arrays and loops, objects.
 *   2. Interactive Web Pages with JavaScript ("The Live Board", January):
 *      the DOM, events, building pages from data, forms, a full widget.
 *   3. Build Interactive Apps with JavaScript ("Championship Weekend",
 *      February to March): app state, localStorage, fetch, real public
 *      APIs, and the finished app.
 *
 * Every lesson runs real JavaScript in the learner's browser (runner:
 * 'javascript' → frontend/lib/code/jsRunner.ts): console lessons have no
 * `page`; page lessons give the practice page's HTML in `page`. fetch() to
 * https://api.silverpine.test answers from frontend/public/javascript/practice-api.js
 * (never change its values: lessons check them).
 */
const track: OriginalTrackDef = {
  slug: 'javascript-for-beginners',
  title: 'JavaScript: From Beginner to Interactive Apps',
  category: 'Coding',
  format: 'short',
  runner: 'javascript',
  description:
    'Go beyond static websites: learn JavaScript from zero and make web pages behave like real apps, with live code that runs in every lesson.',
  levels: [
    {
      level: 1,
      slug: 'javascript-for-beginners',
      title: 'JavaScript for Beginners',
      subtitle: 'First Chair: a ski hill, a phone that never stops ringing, and your first real code',
      shortDescription:
        'Learn JavaScript from zero, right on your phone: variables, decisions, functions, lists and objects, with real code that runs in every ten-minute lesson.',
      description:
        "Opening day at Silver Pine, a little family ski hill in Colorado, and the phone rings forty times an hour: is the chairlift open, how much for a family of four, is the bunny slope groomed? The website Nora built last summer can't answer anything. It's just a page. Follow Nora, the lift operator who has never written a line of JavaScript, as she learns the language that makes websites think. You'll write real code from the first minute, right in your browser: store prices in variables, decide who pays what with if and else, wrap the rules in functions, loop through all fourteen trails and describe them with objects. Tey explains every line and every error in plain words. Ten minutes a lesson, made for your phone.",
      startingPoint: 'You have never written code. Some HTML helps but isn\'t needed. Nothing to install: JavaScript runs right in your browser.',
      endOutcome: 'Write small JavaScript programs that store data, make decisions, repeat work and organise information in objects, and read their error messages.',
      outcomes: [
        'Write and run JavaScript from your very first lesson',
        'Store values in variables and build text with template literals',
        'Make decisions with if, else, && and ||',
        'Package rules into functions that return answers',
        'Work through lists with arrays and loops',
        'Describe real things with objects, filter and map',
      ],
      skills: ['JavaScript', 'Programming basics', 'Functions', 'Arrays', 'Objects'],
      // Cover: frontend/public/originals, designed in originals/covers.
      thumbnailUrl: '/originals/javascript-for-beginners.jpg',
      upcomingUnits: 0,
      units: [u01, u02, u03, u04, u05],
    },
    {
      level: 2,
      slug: 'interactive-web-pages-javascript',
      title: 'Interactive Web Pages with JavaScript',
      subtitle: 'The Live Board: make a web page react to every tap, type and choice',
      shortDescription:
        'Make web pages come alive: change what\'s on the page, react to taps and typing, build lists from data and check forms, on a live page in every lesson.',
      description:
        "Silver Pine's website finally answers the phone. Now it has to come alive. Follow Nora through January as she builds a live trail board for the lodge, a lift-line counter for the liftie's tablet, the rental shop's gear list, a ski school sign-up form that Wes, the hill's fifteen-year-old chaos tester, can't break, and the board that 3,000 people check before breakfast on MLK Day weekend. You'll learn the DOM, events, building pages from data, and forms with friendly validation, and every lesson runs your JavaScript on a live page you can tap and type in, right on your phone.",
      startingPoint: 'You know JavaScript basics (variables, if, functions, arrays and objects), as in JavaScript for Beginners, and a little HTML.',
      endOutcome: 'Make web pages respond to people: change content and styles, react to taps and typing, build pages from data, and check forms with clear messages.',
      outcomes: [
        'Find anything on a page and change its text, classes and attributes',
        'React to clicks, typing and keys with event listeners',
        'Build and rebuild page content from arrays of data',
        'Read forms, stop page reloads and validate input kindly',
        'Combine it all into widgets like search, filters and tabs',
      ],
      skills: ['JavaScript', 'DOM', 'Events', 'Forms', 'Validation'],
      thumbnailUrl: '/originals/interactive-web-pages-javascript.jpg',
      upcomingUnits: 0,
      units: [p01, p02, p03, p04, p05],
    },
    {
      level: 3,
      slug: 'build-interactive-apps-javascript',
      title: 'Build Interactive Apps with JavaScript',
      subtitle: 'Championship Weekend: data that saves, live results from an API, and an app you ship',
      shortDescription:
        'Build real web apps: keep data in one place, save it on the device, load live data from APIs, and ship a finished app, with live code in every lesson.',
      description:
        "Silver Pine said yes to hosting the Colorado Junior Freeride Championship, and now forty volunteers, two hundred spectators and every rider's family need one app. Follow Nora through the six weeks to Saturday 13 March as she builds it: a volunteer checklist that keeps its data in one place, saving that works when the Wi-Fi dies at the summit, live lift status and results from the event's API, the real snow forecast from a free public weather API, and finally the live results board, with Wes on it. You'll learn app state, localStorage and JSON, async code and fetch, real APIs, and how to debug and ship, and every lesson runs your code live in the browser.",
      startingPoint: 'You can make interactive pages with the DOM, events and forms, as in Interactive Web Pages with JavaScript.',
      endOutcome: 'Build and ship a small web app that keeps its data in one place, saves it on the device, loads live data from an API, and handles loading, empty and error states.',
      outcomes: [
        'Build apps where the data comes first and the page follows it',
        'Save and load data with localStorage and JSON',
        'Write async code with promises, async and await',
        'Load and send data with fetch, and handle errors',
        'Use a real public API, then debug and ship your app',
      ],
      skills: ['JavaScript', 'App state', 'localStorage', 'fetch', 'APIs', 'async/await'],
      thumbnailUrl: '/originals/build-interactive-apps-javascript.jpg',
      upcomingUnits: 0,
      units: [a01, a02, a03, a04, a05],
    },
  ],
};

export default track;
