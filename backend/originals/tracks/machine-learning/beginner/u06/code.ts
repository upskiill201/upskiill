/**
 * Chapter 6's shared starter code: the no-show question again, now with
 * scikit-learn classifiers. Same honest split as Chapter 4: learn from weeks
 * 1-11, test on week 12; weeks 1-9 / 10-11 when choosing settings.
 */

export const IMPORTS = 'import pandas as pd\nfrom sklearn.linear_model import LogisticRegression\n';

export const TREE = 'from sklearn.tree import DecisionTreeClassifier\n';

export const DATA = 'df = pd.read_csv("appointments.csv")\nfeats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\n';

export const SPLIT = 'train = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\n';

export const VAL_SPLIT = 'train = df[df["week"] <= 9]\nval = df[df["week"].isin([10, 11])]\n';

/** Logistic regression ready to fit on weeks 1-11. */
export const LR_BASE = IMPORTS + DATA + SPLIT;

/** A fitted logistic regression. */
export const LR_FIT = LR_BASE + 'model = LogisticRegression()\nmodel.fit(train[feats], train["no_show"])\n';

/** The same, plus the decision tree import. */
export const TREE_BASE = IMPORTS + TREE + DATA + SPLIT;
