/**
 * Chapter 4's shared starter code, so every lesson's predictor is identical.
 * KNN is predictor v0.3 from Chapter 3, wrapped in a function.
 */

export const LOAD = 'import pandas as pd\ndf = pd.read_csv("appointments.csv")\n';

export const FEATS = 'feats = ["wait_days", "distance_km", "previous_no_shows", "sms_reminder"]\n';

export const KNN =
  'def knn_risk(train, test, feats, k=15):\n' +
  '    lo = train[feats].min()\n' +
  '    hi = train[feats].max()\n' +
  '    X = ((train[feats] - lo) / (hi - lo)).to_numpy()\n' +
  '    y = train["no_show"].to_numpy()\n' +
  '    T = ((test[feats] - lo) / (hi - lo)).to_numpy()\n' +
  '    risks = []\n' +
  '    for row in T:\n' +
  '        d = ((X - row) ** 2).sum(axis=1) ** 0.5\n' +
  '        risks.append(y[d.argsort(kind="stable")[:k]].mean())\n' +
  '    return risks\n';

export const WEEK_SPLIT = 'train = df[df["week"] <= 11]\ntest = df[df["week"] == 12]\n';

/** Everything up to a scored week-12 test set. */
export const SETUP = LOAD + FEATS + KNN + WEEK_SPLIT;
