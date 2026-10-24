/**
 * How a Teyro Original is WRITTEN (backend/originals/**). The loader turns
 * this into the stored lesson format (originals-content.ts), generating every
 * id deterministically so re-loading a file never breaks learner progress.
 *
 * Kept deliberately compact for writing by hand: answers are indexes, not ids;
 * groups and pairs are plain lists. The product rules these must follow are in
 * docs/ORIGINALS_PLAYBOOK.md; `npm run originals` checks them.
 */

export type CodeLanguage =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'html'
  | 'css'
  | 'sql'
  | 'c'
  | 'bash'
  | 'json'
  | 'java'
  | 'kotlin'
  | 'swift'
  | 'dart'
  | 'plaintext';

/**
 * Languages the in-browser code runner can run (frontend/lib/code). 'sql' = SQLite (sql.js); 'c' = C (xcc, public/c).
 * 'javascript' = a sandboxed practice page (frontend/public/javascript/runner.js).
 */
export type RunLanguage = 'python' | 'sql' | 'c' | 'javascript';

/** The shared cast (docs/originals/CAST.md). */
/** Course-only characters (efua, asante; brian, zanele, achieng, kamau, felix, pauline, emeka, wanjiku; jayden, priya, femi; diego; marta, sofia, tomas, carmen) are listed in CAST.md too. */
export type CastId = 'ada' | 'remi' | 'lucia' | 'arjun' | 'grace' | 'kofi' | 'miracle' | 'clinton' | 'david' | 'efua' | 'asante' | 'brian' | 'zanele' | 'achieng' | 'kamau' | 'felix' | 'pauline' | 'emeka' | 'wanjiku' | 'jayden' | 'priya' | 'femi' | 'diego' | 'marta' | 'sofia' | 'tomas' | 'carmen' | 'njeri' | 'kavya' | 'joel' | 'bisi' | 'chidi' | 'halima' | 'folake' | 'emmanuel' | 'yaw' | 'juno' | 'walt' | 'leo' | 'dana' | 'nora' | 'mags' | 'rafa' | 'wes' | 'ines' | 'hal' | 'tomoko' | 'mateus' | 'lars' | 'hazel' | 'benny' | 'ruth';
export type Speaker = 'narrator' | 'tey' | CastId;

// ─── Learn cards ───────────────────────────────────────────────────────────

export type AuthoredCard =
  | { kind: 'text'; html: string }
  | { kind: 'code'; language: CodeLanguage; code: string; caption?: string }
  | { kind: 'image'; url: string; alt: string; caption?: string }
  | { kind: 'callout'; tone: 'tip' | 'warning' | 'remember'; text: string }
  /** A quick check inside Learn (free, no hearts). `answer` is the right option's index. */
  | { kind: 'check'; question: string; options: string[]; answer: number; explanation?: string }
  | { kind: 'reading'; title?: string; html: string }
  | {
      kind: 'story';
      title?: string;
      beats: { speaker: Speaker; text: string }[];
      choice?: { prompt: string; options: { text: string; outcome: string; best?: boolean }[] };
    }
  | { kind: 'chat'; turns: { tey: string; replies?: string[] }[] }
  | { kind: 'steps'; title?: string; steps: { title: string; body: string; code?: string; language?: CodeLanguage }[] }
  | {
      kind: 'compare';
      title?: string;
      before: { label?: string; text: string };
      after: { label?: string; text: string };
      notes: string[];
    }
  | { kind: 'explore'; title?: string; text: string; hotspots: { phrase: string; note: string }[] }
  | { kind: 'myth'; statements: { text: string; isFact: boolean; explain: string }[] }
  /**
   * Try it live: runnable, editable code in the track's `runner` language. Done once it runs without an error.
   * SQL: `database` names the practice database it starts from (frontend/public/sql/db); empty when absent.
   * JavaScript: `page` is the practice page's HTML (body markup, may include <style>), shown live; without
   * it the code runs in the console only. `storage` is what localStorage starts with. `stdin` answers prompt().
   */
  | { kind: 'tryIt'; title?: string; code: string; caption?: string; challenge?: string; stdin?: string[]; /** The code is meant to fail (an errors lesson): done on any run. */ expectError?: boolean; database?: string; page?: string; storage?: Record<string, string> };

export type AuthoredCardKind = AuthoredCard['kind'];

// ─── Exercises ─────────────────────────────────────────────────────────────

interface ExerciseBase {
  prompt: string;
  /** Why the right answer is right — shown after answering. */
  explanation?: string;
}

/** An answer option. `why` = why someone might pick it if it's wrong. */
export interface AuthoredOption {
  text: string;
  why?: string;
}

/** One hidden check on a Write and run program: set `message` and exactly one test. */
export interface AuthoredCodeCheck {
  message: string;
  outputIncludes?: string;
  outputEquals?: string;
  expr?: string;
  codeIncludes?: string;
}

export type AuthoredExercise =
  | (ExerciseBase & {
      kind: 'mcq';
      variant?: 'standard' | 'predictOutput' | 'pickPrompt';
      code?: string;
      language?: CodeLanguage;
      options: AuthoredOption[];
      answer: number;
    })
  /** Reply in a chat: someone sends a message, the learner picks the reply. */
  | (ExerciseBase & {
      kind: 'chatReply';
      from: CastId;
      message: string;
      options: AuthoredOption[];
      answer: number;
    })
  /** `template` uses [[1]], [[2]]… ; blanks[i] lists accepted answers for blank i+1. */
  | (ExerciseBase & {
      kind: 'fillBlank';
      template: string;
      blanks: string[][];
      distractors?: string[];
      language?: CodeLanguage;
    })
  /** Tap the wrong line: code, or prose split into sentences ("spot the problem"). */
  | (ExerciseBase & { kind: 'findBug'; lines: string[]; bug: number; fix?: string; language?: CodeLanguage })
  /** Lines in the CORRECT order; the player shuffles them. */
  | (ExerciseBase & { kind: 'orderLines'; lines: string[]; language?: CodeLanguage })
  | (ExerciseBase & { kind: 'matchPairs'; pairs: [left: string, right: string][] })
  /** Tiles in the CORRECT order, plus tiles that don't belong. */
  | (ExerciseBase & { kind: 'tapBuild'; tiles: string[]; distractors?: string[]; language?: CodeLanguage })
  | (ExerciseBase & { kind: 'typeAnswer'; answers: string[]; placeholder?: string })
  /** `items[i].group` is an index into `groups`. */
  | (ExerciseBase & { kind: 'sortGroups'; groups: string[]; items: { text: string; group: number }[] })
  /**
   * Write and run (in the track's `runner` language): runs in the learner's browser; CHECK unlocks when
   * every check passes. `solution` must pass them all (`npm run originals`
   * runs it); `starter` is what the editor opens with. SQL: `expr` is a query
   * run after the learner's code that must return a true first value, and
   * `database` names the practice database the code starts from.
   * JavaScript: `expr` is a JavaScript expression run in the page after the
   * code settles (it may return a promise); it must come out truthy. Helpers
   * on window.__t: click, type, check, key, submit, text, count, has, logs,
   * store, reloads, settle (frontend/public/javascript/runner.js). `page` and
   * `storage` work as on Try it live.
   */
  | (ExerciseBase & {
      kind: 'writeCode';
      starter?: string;
      solution: string;
      hint?: string;
      checks: AuthoredCodeCheck[];
      stdin?: string[];
      database?: string;
      page?: string;
      storage?: Record<string, string>;
    });

export type AuthoredExerciseKind = AuthoredExercise['kind'];

// ─── Lessons, units, levels, tracks ───────────────────────────────────────

export type Milestone = 'CHECKPOINT' | 'UNIT_CHALLENGE';

export interface OriginalLesson {
  /** Stable within its unit ("l01"). Changing it creates a NEW lesson and orphans learner progress. */
  key: string;
  title: string;
  /** One line under the title on the map (≤300 chars). */
  summary: string;
  /** Expected length; the playbook target is 10–15. */
  minutes: number;
  /** Every 5th lesson is a Checkpoint; a unit's last one is its Unit Challenge. */
  milestone?: Milestone;
  /** XP for finishing it. Defaults: 10, or 20 for a Checkpoint / Unit Challenge. */
  xp?: number;
  /** "You'll be able to…" — 2 to 5 short outcomes. */
  outcomes: string[];
  learn: AuthoredCard[];
  apply: { scenario?: string; items: AuthoredExercise[] };
  reflect: { prompt: string; starters?: string[] };
  deepen?: { title: string; summary: string };
  /** Author notes and sources for every fact. Never shown to learners or loaded. */
  notes?: string;
}

export interface OriginalUnit {
  /** Stable within its level ("u01"). */
  key: string;
  title: string;
  /** What the learner can DO after this unit, as an action. */
  goal: string;
  /**
   * The chapter's place in the story (playbook §8a), shown on the map banner
   * instead of the land name: "40 weeks to go", "Month 2". Keep it under 24 characters.
   */
  marker?: string;
  /** One-line story teaser under the chapter name on the map: the chapter's problem, not its skill. */
  story?: string;
  lessons: OriginalLesson[];
}

export interface OriginalLevel {
  level: 1 | 2 | 3;
  /** Public URL slug, e.g. "ai-at-work-beginner". Stable. */
  slug: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  description: string;
  /** Who it's for and what they can already do. */
  startingPoint: string;
  /** The one concrete thing they can do after, as an action. */
  endOutcome: string;
  outcomes: string[];
  skills: string[];
  thumbnailUrl?: string;
  /** Units planned but not written yet: "N more units coming soon" on the map. */
  upcomingUnits: number;
  units: OriginalUnit[];
}

export interface OriginalTrackDef {
  /** Stable, e.g. "ai-at-work". */
  slug: string;
  title: string;
  category: 'AI' | 'Coding' | 'Career' | 'Communication' | 'Leadership & Management' | 'Business' | 'Negotiation & Conflict' | 'Personal Finance';
  description: string;
  /** A sample for /dev/originals only: checked and exported, never written to a database. */
  devOnly?: boolean;
  /**
   * 'short' = a deliberately short course (founder, 2026-10-15): 10 lessons per unit
   * (Checkpoint at 5, Unit Challenge at 10) and 5 units per level. Default: full-length.
   */
  format?: 'full' | 'short';
  /** The language every Try it live card and Write and run exercise runs in. Default: Python. 'sql' = SQLite, 'c' = C. */
  runner?: RunLanguage;
  levels: OriginalLevel[];
}
