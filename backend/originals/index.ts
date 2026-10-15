import type { OriginalTrackDef } from '../src/originals/originals-authoring.types';
import aiAtWork from './tracks/ai-at-work';
import formatTour from './tracks/format-tour';
import studySmarter from './tracks/study-smarter';
import python from './tracks/python';
import corporateJargon from './tracks/corporate-jargon';
import smallTalk from './tracks/small-talk';
import makePeopleListen from './tracks/make-people-listen';
import elevatorPitch from './tracks/elevator-pitch';
import { launchLineup } from './tracks/launch-lineup';

/**
 * Every Teyro Original the loader knows about (scripts/originals.ts).
 * Add a Track here once its file exists. Tracks with no units yet are
 * checked but never loaded.
 */
export const tracks: OriginalTrackDef[] = [aiAtWork, studySmarter, python, corporateJargon, smallTalk, makePeopleListen, elevatorPitch, ...launchLineup, formatTour];
