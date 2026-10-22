/**
 * Chapter 5's shared starter code. clinic_weeks.csv: last year's weekly
 * bookings for the 8 pilot clinics (teyro_datasets.py). Learn from weeks 1-40,
 * test on 41-52, the way Chapter 4 taught.
 */

export const LOAD = 'import pandas as pd\ncw = pd.read_csv("clinic_weeks.csv")\n';

export const SPLIT = 'train = cw[cw["week"] <= 40]\ntest = cw[cw["week"] > 40]\n';

export const SK = 'from sklearn.linear_model import LinearRegression\n';

export const MAE = 'from sklearn.metrics import mean_absolute_error\n';

export const FEATS = 'feats = ["open_hours", "nurses", "holiday", "rain_days"]\n';

/** pandas + the split. */
export const BASE = LOAD + SPLIT;

/** scikit-learn, data and split. */
export const SK_BASE = 'import pandas as pd\n' + SK + MAE + 'cw = pd.read_csv("clinic_weeks.csv")\n' + SPLIT;
