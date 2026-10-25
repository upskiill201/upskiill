// Page map rules for Python for Beginners. First matching rule wins, so order matters.
// Each rule is [target, reasonOrNull, regex]. 'skip' and 'backlog' are decisions, not pages.
export default [
  ['skip', 'Not about learning Python (the animal, interviews, certification, internships, other brands)',
    /snake|interview|certification|internship|john zelle|leetcode|neetcode|steam|\bmooc\b|moratuwa|scaler|andrew ng|programming with mosh|microsoft|khan academy|github|kaggle|reddit|coursera|udemy|w3schools/],
  ['backlog', 'Other languages and cities (need translated pages or real local facts first)',
    /in (hindi|tamil|telugu|urdu|kannada|marathi|malayalam|bengali|bangla|gujarati|punjabi|nepali|tagalog|arabic|spanish|french|portuguese|chinese|japanese|korean|sinhala|burmese|swahili|vietnamese|indonesian)|chennai|bangalore|delhi|pune|hyderabad|mumbai|kolkata|bangladesh|near me|kerala|ahmedabad|coimbatore|noida|gurgaon|hindi|tamil|telugu|urdu|kannada|marathi/],
  ['backlog', 'Kids, school and exam-style searches (a different audience)', /kids|children|class \d|grade|ncert|cbse|handwritten/],
  ['/blog/python-jobs-and-salary', null, /\bjobs?\b|salary|career|freelance|hire|resume|\bpay\b|opportunit/],
  ['/blog/learn-python-for-ai', null, /\bai\b|machine learning|data science|data analysis|pandas|numpy|chatgpt|automation|scraping|django|flask/],
  ['/blog/best-apps-to-learn-python', null, /\bapps?\b|mobile|phone|android|iphone/],
  ['/blog/how-to-install-python', null, /install|download|setup|\bide\b|vscode|pycharm|jupyter|anaconda|windows|\bmac\b|version|interpreter|compiler/],
  ['/blog/python-vs-javascript-for-beginners', null, /\bvs\b|versus|alternative|better than|\bjava\b|c\+\+|which language/],
  ['/blog/python-cheat-sheet-for-beginners', null, /pdf|cheat|syntax|notes|slides|guide|dictionary|data types|examples|quick reference/],
  ['/blog/python-projects-for-beginners', null, /project|exercise|practice|simple code/],
  ['/blog/learn-python-by-playing-games', null, /game|play/],
  ['/blog/learn-python-in-30-days', null, /30 days|21 days|10 days|7 days|step by step|roadmap|plan|schedule|in a month|fast|quickly/],
  ['/blog/is-python-good-for-beginners', null, /\bis\b|\bwhy\b|what is|meaning|named|easy|hard|difficult|good for|best for|popular|worth|used for|uses|for dummies/],
  ['/blog/how-to-learn-python-for-free', null, /free/],
  ['/blog/how-to-learn-python-for-beginners', null, /./],
];
