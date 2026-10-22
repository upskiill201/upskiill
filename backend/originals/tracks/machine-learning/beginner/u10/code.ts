/**
 * Chapter 10's shared starter code: random forests against v0.9. Exercises
 * use the quick weeks 1-9 / 10-11 split (forests are slow to cross-validate
 * on a phone); the 11-week cross-validated numbers are quoted from the notes.
 */

export const IMPORTS =
  'import pandas as pd\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.tree import DecisionTreeClassifier\n' +
  'from sklearn.ensemble import RandomForestClassifier\n' +
  'from sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.impute import SimpleImputer\n';

export const DATA = 'df = pd.read_csv("appointments.csv")\ndf["monday"] = (df["weekday"] == "Mon").astype(int)\n';

export const F6 = 'feats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder", "rain", "monday"]\n';

export const SPLIT = 'train = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\n';

export const VAL_SPLIT = 'train = df[df["week"] <= 9]\nval = df[df["week"].isin([10, 11])]\n';

export const MINUTES = 'def minutes(flags, answers):\n    missed = ((flags == 0) & (answers == 1)).sum()\n    return 20 * missed + 5 * flags.sum()\n';

export const V9 = 'v9 = make_pipeline(SimpleImputer(strategy="median"), StandardScaler(), LogisticRegression(C=0.1))\n';

/** A 100-tree forest of depth-5 trees. */
export const FOREST = 'forest = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)\n';

/** Weeks 1-9 to learn, 10-11 to judge. */
export const VAL_BASE = IMPORTS + DATA + F6 + VAL_SPLIT + MINUTES;

/** Weeks 1-11 to learn, week 12 to test. */
export const TEST_BASE = IMPORTS + DATA + F6 + SPLIT + MINUTES;

/** Score a fitted model on the validation weeks. */
export const VAL_MINUTES = (model: string) =>
  `flags = (${model}.predict_proba(val[feats])[:, 1] >= 0.2).astype(int)\nprint(minutes(flags, val["no_show"]))\n`;
