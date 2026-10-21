import type { OriginalTrackDef } from '../src/originals/originals-authoring.types';
import aiAtWork from './tracks/ai-at-work';
import formatTour from './tracks/format-tour';
import studySmarter from './tracks/study-smarter';
import python from './tracks/python';
import corporateJargon from './tracks/corporate-jargon';
import smallTalk from './tracks/small-talk';
import makePeopleListen from './tracks/make-people-listen';
import elevatorPitch from './tracks/elevator-pitch';
import leadershipForBeginners from './tracks/leadership-for-beginners';
import leadWithoutBoss from './tracks/lead-without-boss';
import setClearExpectations from './tracks/set-clear-expectations';
import motivateTeam from './tracks/motivate-team';
import dataScience from './tracks/data-science';
import machineLearning from './tracks/machine-learning';
import aiStack from './tracks/ai-stack';
import validateBusinessIdea from './tracks/validate-business-idea';
import priceProduct from './tracks/price-product';
import negotiationBeginners from './tracks/negotiation-beginners';
import difficultNegotiations from './tracks/difficult-negotiations';
import conflictAtWork from './tracks/conflict-at-work';
import acingJobInterviews from './tracks/acing-job-interviews';
import clearWritingAtWork from './tracks/clear-writing-at-work';
import speakLikeACeo from './tracks/speak-like-a-ceo';
import budgeting from './tracks/budgeting';
import saveMoney from './tracks/save-money';
import impulseBuying from './tracks/impulse-buying';
import needsWants from './tracks/needs-wants';

/**
 * Every Teyro Original the loader knows about (scripts/originals.ts).
 * Add a Track here once its file exists. Tracks with no units yet are
 * checked but never loaded.
 */
export const tracks: OriginalTrackDef[] = [aiAtWork, studySmarter, python, corporateJargon, smallTalk, makePeopleListen, elevatorPitch, leadershipForBeginners, leadWithoutBoss, setClearExpectations, motivateTeam, dataScience, machineLearning, aiStack, validateBusinessIdea, priceProduct, negotiationBeginners, difficultNegotiations, conflictAtWork, acingJobInterviews, clearWritingAtWork, speakLikeACeo, budgeting, saveMoney, impulseBuying, needsWants, formatTour];
