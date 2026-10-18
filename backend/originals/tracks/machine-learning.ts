import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './machine-learning/beginner/u01';
import u02 from './machine-learning/beginner/u02';
import u03 from './machine-learning/beginner/u03';

/**
 * Machine Learning for Beginners — storyline "Halima's Empty Chairs".
 * Outline: docs/originals/machine-learning-for-beginners-outline.md (approved 2026-10-18).
 *
 * Halima (a former nurse, now on Afiya's Clinic Success team in Lagos) builds a
 * no-show predictor for Afiya's clinics; Miracle mentors her. Each chapter
 * improves the same model, and the map marker is its version. Lessons run real
 * Python in the browser on made-up practice data (appointments.csv in
 * frontend/public/python/teyro_datasets.py); scikit-learn loads from Chapter 5.
 */
const track: OriginalTrackDef = {
  slug: 'machine-learning-for-beginners',
  title: 'Machine Learning for Beginners',
  category: 'Coding',
  description:
    'Learn machine learning by building one real model, step by step, with real Python in your browser and no maths degree.',
  levels: [
    {
      level: 1,
      slug: 'machine-learning-for-beginners',
      title: 'Machine Learning for Beginners',
      subtitle: "Halima's Empty Chairs: build a model that predicts missed clinic appointments",
      shortDescription:
        'Learn machine learning by building one real model, step by step: 10-minute lessons, real Python in your browser, no maths degree and nothing to install.',
      description:
        "About 1 in 5 appointments at Afiya's clinics ends with an empty chair: a nurse waiting, a patient who didn't get care. Folake, the COO, says \"AI will fix it.\" Halima, a former nurse who has just joined the team, knows why patients miss, but she has never heard of machine learning. Follow her from three rules on a sticky note to a model the clinics trust. You'll learn what machine learning really is, prepare real (practice) data, build a predictor from scratch, then train and fairly test models with scikit-learn, the tool professionals use. You'll also learn the honest parts most courses skip: baselines, leaks, overfitting and fairness. Ten minutes a lesson, made for your phone, ready on the bus.",
      startingPoint:
        "Curious beginners. A little Python helps, but Chapter 2 teaches what you need. No maths beyond percentages, nothing to install: the code runs in your browser.",
      endOutcome:
        'Frame a prediction problem, prepare the data, train and fairly test a model, explain its mistakes, and check it is fair.',
      outcomes: [
        'Explain what machine learning is, and what it can and can\'t do',
        'Prepare data: features, labels, and clean train and test sets',
        'Build a nearest-neighbour predictor from scratch',
        'Train regression and classification models with scikit-learn',
        'Judge a model honestly with baselines, precision and recall',
        'Spot leakage, overfitting and unfairness before they ship',
      ],
      skills: ['Machine learning', 'Python', 'pandas', 'scikit-learn', 'Model evaluation', 'Responsible AI'],
      upcomingUnits: 10,
      units: [u01, u02, u03],
    },
  ],
};

export default track;
