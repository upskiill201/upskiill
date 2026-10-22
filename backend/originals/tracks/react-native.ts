import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';

/**
 * Mobile App Development with React Native — the "WashDay: The App" trilogy.
 * Outline: docs/originals/react-native-app-development-outline.md (DRAFT
 * 2026-10-22, awaiting approval).
 *
 * Clinton (first-year Computer Science, University of Buea) turns WashDay,
 * the laundry pickup service from the Business courses, from WhatsApp chaos
 * into a real full-stack mobile app: Course 1 builds the screens, Course 2
 * the API, database, accounts and a washer app, Course 3 payments, push,
 * offline, tests and the Play Store. David is the numbers sceptic, Miracle
 * reviews code from Lagos, Kofi helps with design; Mama Rose and Auntie Bih
 * (narrated) are the real users; SpinCycle is the rival app. Markers are app
 * versions, v0.1 to v1.0; lesson 9 of every chapter is Clinton's build log.
 *
 * Three 'focused' courses (5 chapters × 20 lessons each). Courses with no
 * units yet are checked but never loaded. `runner` is set once the React
 * Native runner (react-native-web in a phone frame, on top of the TypeScript
 * runner) is built, before Chapter 1 is written.
 */
const track: OriginalTrackDef = {
  slug: 'react-native-app-development',
  title: 'Mobile App Development with React Native',
  category: 'Coding',
  format: 'focused',
  description:
    'Build real Android and iPhone apps with React Native, Expo and TypeScript, from your first screen to a full-stack app with accounts, a database, payments and push notifications, published to the store.',
  levels: [
    {
      level: 1,
      slug: 'react-native-for-beginners',
      title: 'React Native for Beginners',
      subtitle: 'WashDay: The App. Build your first real phone app, screen by screen',
      shortDescription:
        'Build a real phone app with React Native: one codebase for Android and iPhone. Ten-minute lessons, real code in every one, and screens you can tap right in the lesson, then on your own phone.',
      description:
        "Saturday, heavy rain, 41 orders on WhatsApp, and a professor's interview suit has just been delivered to the wrong hostel. Clinton runs WashDay, a laundry pickup service at the University of Buea, entirely from his phone's chat app, and it's falling apart. He studies Computer Science, so he decides to build a real app. Build it with him, screen by screen: a home screen, a price list Mama Rose can actually read, an order form that makes mistakes impossible, a list that answers \"where's my bag?\", and a demo for twenty students on a real phone. You write real React Native in every lesson, tap through your screens in the lesson itself, and run your app on your own phone with Expo Go.",
      startingPoint:
        'You know basic JavaScript or TypeScript: variables, functions, arrays and objects (for example, from Teyro\'s TypeScript course). Chapter 1 recaps exactly what you need.',
      endOutcome:
        'Build a multi-screen React Native app with styled screens, forms, lists and navigation, and run it on your own phone.',
      outcomes: [
        'Build screens from components with React Native and Expo',
        'Style apps with flexbox that work on small, cheap phones',
        'Handle taps, typing and form input with state',
        'Show lists and move between screens with navigation',
        'Save data on the phone and handle loading and empty states',
        'Run your app on your own phone with Expo Go',
      ],
      skills: ['React Native', 'Expo', 'TypeScript', 'Mobile app development', 'UI development'],
      upcomingUnits: 5,
      units: [],
    },
    {
      level: 2,
      slug: 'full-stack-mobile-apps',
      title: 'Full-Stack Mobile Apps',
      subtitle: 'WashDay Goes Live. Give your app a backend, a database and accounts',
      shortDescription:
        'Turn a phone app into a real product: build the API, the database and the sign-in that power it, then a second app for the people who run the service. Real backend code, run in every lesson.',
      description:
        "The night before the busiest Saturday of the year, Clinton's phone resets, and every WashDay order stored on it vanishes. Orders have to live on a server. Build WashDay's backend with him: an API with Hono, a Postgres database, sign-up and sign-in, and protected data, after a student discovers she can see everyone's orders by changing one number in a link. Then build a second app for Mama Rose and Auntie Bih, the washers, and a dashboard for David, and take the whole system live for 200 students. Every API route and every SQL query runs right in the lesson.",
      startingPoint: 'You have finished React Native for Beginners, or can build a multi-screen React Native app with state, lists and navigation.',
      endOutcome:
        'Build and deploy a full-stack mobile app: a React Native front end, a typed API, a Postgres database and secure accounts with roles.',
      outcomes: [
        'Fetch and send data from your app with HTTP and JSON',
        'Build a typed API with routes, validation and clear errors',
        'Design a Postgres database and query it with SQL',
        'Add sign-up, sign-in and protected data, safely',
        'Build a second app for staff, with roles and live status updates',
        'Deploy your backend so real users can use your app',
      ],
      skills: ['React Native', 'Full-stack development', 'REST APIs', 'Hono', 'PostgreSQL', 'SQL', 'Authentication'],
      upcomingUnits: 5,
      units: [],
    },
    {
      level: 3,
      slug: 'launch-your-mobile-app',
      title: 'Launch Your Mobile App',
      subtitle: 'WashDay Ships. Payments, push notifications, offline and the app store',
      shortDescription:
        'Everything between "it works on my phone" and "people are paying for it in the Play Store": mobile money payments, push notifications, offline mode, testing, and publishing your app.',
      description:
        "Demo Day is four weeks away, SpinCycle is competing too, and WashDay still runs on cash and hope. Add mobile money payments (and catch a fake payment screenshot), push notifications that tell students their bag is on its way, an offline mode for rainy-season networks, photos of every bag at pickup, tests and crash reports. Then face the Play Store review, a rejection three days before Demo Day, and a live demo with the network down. Finish with WashDay 1.0 in the store, and your own app, from idea to a build on your phone.",
      startingPoint: 'You have finished Full-Stack Mobile Apps, or can build a React Native app with its own API, database and sign-in.',
      endOutcome:
        'Publish a production-ready mobile app with payments, push notifications, offline support, tests and store listings, and ship updates after launch.',
      outcomes: [
        'Take payments with a mobile money flow, safely and without double charges',
        'Send push notifications people actually want',
        'Make your app work offline and fast on low-end phones',
        'Test your app and catch crashes before users do',
        'Build, submit and publish your app to the store',
        'Plan, build and ship your own app',
      ],
      skills: ['React Native', 'Expo', 'Mobile payments', 'Push notifications', 'Offline-first', 'App testing', 'App store publishing'],
      upcomingUnits: 5,
      units: [],
    },
  ],
};

export default track;
