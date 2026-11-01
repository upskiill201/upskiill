/**
 * Chapter 9's shared starter code: v0.8 and Chidi's trees, now judged with
 * cross-validation. Weeks 1-11 are the learning data; week 12 stays the
 * one-time test. Leave-one-week-out gives every one of the 11 weeks a turn as
 * validation.
 */

export const IMPORTS =
  'import pandas as pd\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.tree import DecisionTreeClassifier\n' +
  'from sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.impute import SimpleImputer\n';

export const CV_IMPORTS = 'from sklearn.model_selection import cross_val_score, LeaveOneGroupOut, GridSearchCV\n';

export const DATA = 'df = pd.read_csv("appointments.csv")\ndf["monday"] = (df["weekday"] == "Mon").astype(int)\n';

export const F6 = 'feats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder", "rain", "monday"]\n';

/** Chidi's "every number column": v0.8's six plus hour. */
export const F7 = 'feats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder", "rain", "monday", "hour"]\n';

export const SPLIT = 'train = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\n';

export const VAL_SPLIT = 'train = df[df["week"] <= 9]\nval = df[df["week"].isin([10, 11])]\n';

export const MINUTES = 'def minutes(flags, answers):\n    missed = ((flags == 0) & (answers == 1)).sum()\n    return 20 * missed + 5 * flags.sum()\n';

/** A scorer scikit-learn can use: higher is better, so minutes are negated. */
export const SCORER =
  MINUTES + 'def minutes_score(model, X, y):\n    flags = (model.predict_proba(X)[:, 1] >= 0.2).astype(int)\n    return -minutes(flags, y.values)\n';

export const V8 = 'v8 = make_pipeline(SimpleImputer(strategy="median"), StandardScaler(), LogisticRegression())\n';

/** Weeks 1-11, one fold per week. */
export const BY_WEEK = 'weeks = LeaveOneGroupOut()\n';

/** Everything for leave-one-week-out on the learning weeks. */
export const CV_BASE = IMPORTS + CV_IMPORTS + DATA + F6 + SPLIT + SCORER + BY_WEEK;

/** Everything for the old weeks 1-9 / 10-11 validation split. */
export const VAL_BASE = IMPORTS + DATA + F6 + VAL_SPLIT + MINUTES;
