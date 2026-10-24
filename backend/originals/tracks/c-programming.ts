import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './c-programming/beginner/u01';
import u02 from './c-programming/beginner/u02';

/**
 * C for Beginners — storyline "Ten Sols on Red Mesa". Full length: one
 * level, 10 chapters × 20 lessons, one chapter per sol of a ten-sol mission
 * at a (fictional) Mars-analog station in the Utah desert. Ines, the crew
 * engineer, has never coded; when HABCON, the 1998 station controller, dies
 * on Sol 1, she keeps the mission alive in C, one chapter at a time, with
 * Lars (who wrote HABCON) answering once a sol by email.
 *
 * Every lesson compiles and runs real C in the learner's browser
 * (runner: 'c', frontend/public/c: xcc built to WebAssembly). Outline and
 * cast: docs/originals/c-outline.md.
 */
const UNITS = [u01, u02];
const PLANNED = 10;

const track: OriginalTrackDef = {
  slug: 'c-for-beginners',
  title: 'C for Beginners',
  category: 'Coding',
  runner: 'c',
  description:
    'Learn C from zero by keeping a desert research station running: write, compile and debug real C programs in your browser, from printf to pointers, structs, memory and files.',
  levels: [
    {
      level: 1,
      slug: 'c-for-beginners',
      title: 'C for Beginners',
      subtitle: 'Ten Sols on Red Mesa: a dead controller, a desert habitat, and the C that keeps the mission alive',
      shortDescription:
        'Learn C the fun way: keep a Mars-analog station running for ten sols, compiling and running real C in every lesson, right on your phone.',
      description:
        "Sol 1 of a ten-sol mission at Red Mesa, a Mars-analog research station in the Utah desert. A power surge kills HABCON, the station's controller, written in C in 1998. The backup board boots to a blinking cursor, and the only thing it runs is C. Ines, the crew engineer, has wired every circuit in the Hab and has never written a line of code. Follow her through ten sols as she brings the station back one program at a time: a status report, the water count, alarms that decide for themselves, a battery monitor, a day of sensor readings, the radio log, the memory map, the supply inventory, and the final controller the inspector tests on Sol 10. You'll write and run real C in every lesson, right in your browser: variables and types, input and decisions, loops, functions, arrays, strings, pointers, structs, dynamic memory and files. Ten to fifteen minutes a lesson, made for your phone.",
      startingPoint:
        'Total beginners. You have never written C or any other code. Nothing to install: a real C compiler runs in your browser.',
      endOutcome:
        'Write, compile and debug complete C programs that read input, make decisions, loop, and use functions, arrays, strings, pointers, structs, dynamic memory and files.',
      outcomes: [
        'Write, compile and run C programs, and read what the compiler tells you',
        'Store and calculate with the right types: int, double and char',
        'Make decisions and repeat work with if, switch and loops',
        'Split programs into functions that each do one job',
        'Work with arrays, strings, pointers and structs',
        'Manage memory with malloc and free, and read and write files',
      ],
      skills: ['C', 'Compiling', 'Debugging', 'Pointers', 'Memory management', 'Data structures'],
      // Cover: frontend/public/originals, designed in originals/covers.
      thumbnailUrl: '/originals/c-for-beginners.jpg',
      upcomingUnits: PLANNED - UNITS.length,
      units: UNITS,
    },
  ],
};

export default track;
