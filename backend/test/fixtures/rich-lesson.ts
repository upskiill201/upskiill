/* eslint-disable @typescript-eslint/no-explicit-any -- test fixture */

/** What a model returns for a real video-editing lesson (non-coding). */
export function editingLessonOutput(): any {
  return {
    summary:
      "In this lesson I'll show you how composition guides the viewer's eye, and how to use it on purpose in your edits.",
    whatYouWillLearn: [
      'Spot the focal point of a frame',
      'Use the rule of thirds when cropping',
      'Cut on movement to keep attention',
    ],
    keyIdeas: [
      {
        heading: 'Every frame has a focal point',
        body: 'Before you cut, ask where the eye lands first. Brightness, faces and contrast pull attention.',
      },
      {
        heading: 'Thirds beat the centre',
        body: 'Placing the subject on a third line leaves room to look into, and it feels more natural than dead centre.',
      },
      {
        heading: 'Cut on movement',
        body: 'A cut hidden inside a movement feels invisible, so the viewer stays in the story instead of noticing the edit.',
      },
    ],
    codeSamples: [],
    tip: {
      tone: 'remember',
      text: 'If you have to ask where to look, the frame has no focal point yet.',
    },
    quickCheck: {
      question: 'Where should a single subject usually sit?',
      options: ['Dead centre', 'On a third line', 'At the very edge'],
      correctIndex: 1,
      explanation: 'The third lines give the subject room and feel natural.',
    },
    scenario: "You're cutting a 30-second promo for a local café.",
    exercises: [
      {
        kind: 'mcq',
        prompt:
          'A shot feels flat and the eye wanders. What do you check first?',
        options: ['The focal point', 'The export bitrate', 'The music volume'],
        correctIndex: 0,
        explanation: 'A wandering eye means no clear focal point.',
      },
      {
        kind: 'fillBlank',
        prompt: 'Complete the rule.',
        template: 'Place the subject on a ___ line and cut on ___.',
        answers: ['third', 'movement'],
        distractors: ['centre', 'silence'],
        explanation: 'Thirds for placement, movement to hide the cut.',
      },
      {
        kind: 'orderLines',
        prompt: 'Put the edit in order.',
        lines: [
          'Watch the raw clip',
          'Find the focal point',
          'Crop to the thirds',
          'Cut on the movement',
        ],
        explanation: 'See it, find the point, frame it, then cut.',
      },
      {
        kind: 'findBug',
        prompt: "Tap the step that's wrong.",
        lines: [
          'Find where the eye lands',
          'Put the subject dead centre every time',
          'Leave room to look into',
        ],
        bugLine: 2,
        fix: 'Put the subject on a third line',
        explanation: 'Dead centre every time is the mistake.',
      },
      {
        kind: 'matchPairs',
        prompt: 'Match each idea to what it does.',
        pairs: [
          { left: 'Focal point', right: 'Where the eye lands' },
          { left: 'Rule of thirds', right: 'Natural subject placement' },
          { left: 'Cut on movement', right: 'Hides the edit' },
        ],
        explanation: 'Each tool solves a different problem.',
      },
      {
        kind: 'mcq',
        prompt: 'Which cut is least noticeable?',
        options: [
          'During a head turn',
          'On a still frame',
          'Mid-sentence with no motion',
        ],
        correctIndex: 0,
        explanation: 'Movement hides the cut.',
      },
    ],
    reflectPrompt:
      'Pick one shot from your last edit. Where does the eye land, and how would you reframe it?',
    reflectStarters: ['In my last edit…', 'I would reframe…'],
    deepenTitle: 'Leading lines',
    deepenSummary:
      'Once thirds feel easy, use lines in the scene to pull the eye toward your subject.',
  };
}
