/**
 * Chapter 8's shared starter code: better ingredients for v0.7. Same honest
 * split (weeks 1-11 learn, week 12 test; weeks 1-9 / 10-11 to choose), same
 * minutes-lost measure, now with features built from the whole spreadsheet.
 */

export const IMPORTS = 'import pandas as pd\nfrom sklearn.linear_model import LogisticRegression\n';

export const PIPE_IMPORTS =
  'from sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.impute import SimpleImputer\n';

export const DATA = 'df = pd.read_csv("appointments.csv")\n';

/** The Monday flag, built from the weekday column. */
export const MONDAY = 'df["monday"] = (df["weekday"] == "Mon").astype(int)\n';

export const F4 = 'feats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\n';

export const F5 = 'feats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder", "rain"]\n';

export const F6 = 'feats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder", "rain", "monday"]\n';

export const SPLIT = 'train = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\n';

export const VAL_SPLIT = 'train = df[df["week"] <= 9]\nval = df[df["week"].isin([10, 11])]\n';

export const MINUTES = 'def minutes(flags, answers):\n    missed = ((flags == 0) & (answers == 1)).sum()\n    return 20 * missed + 5 * flags.sum()\n';

/** A scaled logistic regression, ready to fit. */
export const PIPE = 'model = make_pipeline(StandardScaler(), LogisticRegression())\n';

/** v0.8's full pipeline. */
export const PIPE8 = 'model = make_pipeline(SimpleImputer(strategy="median"), StandardScaler(), LogisticRegression())\n';

/** Emmanuel's raw export with " km" text fixed, so only true blanks remain. */
export const RAW =
  'raw = pd.read_csv("appointments_raw.csv")\n' +
  'raw["distance_km"] = pd.to_numeric(raw["distance_km"].astype(str).str.replace(" km", ""), errors="coerce")\n';
