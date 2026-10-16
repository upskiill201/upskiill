import { packagesFor } from '../pythonRunner';

describe('packagesFor', () => {
  it('finds pandas and numpy imports', () => {
    expect(packagesFor('import pandas as pd\ndf = pd.read_csv("deliveries.csv")')).toEqual(['pandas']);
    expect(packagesFor('from pandas import read_csv')).toEqual(['pandas']);
    expect(packagesFor('import numpy as np\nimport pandas as pd')).toEqual(['pandas', 'numpy']);
  });

  it('ignores programs that only mention them', () => {
    expect(packagesFor('print("I love pandas")')).toEqual([]);
    expect(packagesFor('# import pandas later\nprint(1)')).toEqual([]);
    expect(packagesFor('x = 1')).toEqual([]);
  });
});
