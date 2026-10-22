import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './react-native/beginner/u01';
import u02 from './react-native/beginner/u02';
import u03 from './react-native/beginner/u03';

/**
 * Mobile App Development with React Native — the "Order Up" trilogy.
 * Outline: docs/originals/react-native-app-development-outline.md (approved
 * 2026-10-22).
 *
 * Film 1 (this course, the only one built now): Theo Nguyen (22, Austin,
 * fresh out of a coding bootcamp) builds an order-ahead app for Pho Real,
 * his mum Linh's food truck, before the Eastside Food Truck Festival. Mai
 * (16, his sister) tests it; Arjun reviews his code. Markers are app
 * versions, v0.1 to v0.5; lesson 9 of every chapter is Theo's build log.
 * Prices in US dollars (founder, 2026-10-22: Teyro is global).
 *
 * Films 2 (Full-Stack Mobile Apps) and 3 (Launch Your Mobile App) are
 * announced as in production; their levels are added here when their first
 * chapter is written. Every Try it live card and Build it exercise runs in the
 * React Native runner (frontend lib/code/rnRunner.ts): a phone preview in the
 * lesson, graded with screen checks.
 */
const track: OriginalTrackDef = {
  slug: 'react-native-app-development',
  title: 'Mobile App Development with React Native',
  category: 'Coding',
  format: 'focused',
  runner: 'react-native',
  description:
    'Build real Android and iPhone apps with React Native, Expo and TypeScript, one film at a time: your first app now, with full-stack and launch courses in production.',
  levels: [
    {
      level: 1,
      slug: 'react-native-for-beginners',
      title: 'React Native for Beginners',
      thumbnailUrl: '/originals/react-native-for-beginners.jpg',
      subtitle: 'Order Up: build your first real phone app, screen by screen',
      shortDescription:
        'Build a real phone app with React Native: one codebase for Android and iPhone. Ten-minute lessons, real code in every one, and screens you can tap right in the lesson, then on your own phone.',
      description:
        "Friday lunch in Austin, Texas. The line at Pho Real, the Nguyen family's food truck, runs past the corner, the wait is 22 minutes, and customers are giving up and walking away. Theo, three weeks out of a coding bootcamp, has one month before the city's biggest food truck festival to build an order-ahead app. Build it with him, screen by screen: a menu people can read in the sun, a \"build your bowl\" cart that gets every order right, a list that answers \"is my order ready?\", and an app that survives a festival weekend. You write real React Native in every lesson, tap through your screens in the lesson itself, and run your app on your own phone with Expo Go. This is Film 1 of the Order Up trilogy: Order Up: Rush Hour (full-stack apps) and Order Up: Opening Day (launching your app) are in production.",
      startingPoint:
        'You know basic JavaScript or TypeScript: variables, functions, arrays and objects (for example, from Teyro\'s TypeScript course). Chapter 1 recaps exactly what you need.',
      endOutcome:
        'Build a multi-screen React Native app with styled screens, forms, lists, navigation and saved data, and run it on your own phone.',
      outcomes: [
        'Set up everything you need and build screens with React Native and Expo',
        'Style apps with flexbox so they\'re easy to read and use on any phone',
        'Handle taps, typing and a shopping cart with state',
        'Show lists and move between screens with navigation',
        'Save data on the phone and handle loading and empty states',
        'Run your app on your own phone with Expo Go',
      ],
      skills: ['React Native', 'Expo', 'TypeScript', 'Mobile app development', 'UI development'],
      upcomingUnits: 2,
      units: [u01, u02, u03],
    },
  ],
};

export default track;
