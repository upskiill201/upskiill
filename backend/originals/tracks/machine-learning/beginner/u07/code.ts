/**
 * Chapter 7's shared starter code: v0.6 (logistic regression on the four
 * honest features), now measured properly. Learn from weeks 1-11, test on
 * week 12; weeks 1-9 / 10-11 when choosing a threshold.
 */

export const IMPORTS = 'import pandas as pd\nfrom sklearn.linear_model import LogisticRegression\n';

export const METRICS = 'from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score\n';

export const DATA = 'df = pd.read_csv("appointments.csv")\nfeats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\n';

export const SPLIT = 'train = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\n';

export const VAL_SPLIT = 'train = df[df["week"] <= 9]\nval = df[df["week"].isin([10, 11])]\n';

const FIT = 'model = LogisticRegression().fit(train[feats], train["no_show"])\n';

/** v0.6 fitted on weeks 1-11, with week 12's answers in y. */
export const BASE = IMPORTS + METRICS + DATA + SPLIT + FIT + 'y = test["no_show"]\n';

/** BASE plus v0.6's yes/no predictions at the default 0.5. */
export const PRED = BASE + 'pred = model.predict(test[feats])\n';

/** BASE plus week 12's no-show chances. */
export const PROBS = BASE + 'p = model.predict_proba(test[feats])[:, 1]\n';

/** Fitted on weeks 1-9, with validation chances pv and answers yv. */
export const VAL = IMPORTS + METRICS + DATA + VAL_SPLIT + FIT + 'pv = model.predict_proba(val[feats])[:, 1]\nyv = val["no_show"]\n';
