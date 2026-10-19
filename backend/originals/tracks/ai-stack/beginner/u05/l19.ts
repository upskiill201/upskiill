import type { OriginalLesson } from '../../../../../src/originals/originals-authoring.types';

/** Chapter 5 · Lesson 19 — Product search v0.5: everything from the chapter in one function. */

const SETUP =
  'import csv, re\nfrom teyro_ai import VectorStore\n\nrows = list(csv.DictReader(open("rao_products.csv")))\nby_id = {r["product_id"]: r for r in rows}\ncategories = sorted({r["category"] for r in rows}, key=len, reverse=True)\nstore = VectorStore()\nfor r in rows:\n    store.add(r["product_id"], r["name"] + ". " + r["description"],\n              price=int(r["price_rupees"]), in_stock=int(r["in_stock"]),\n              occasion=r["occasion"], category=r["category"])\n\ndef words(text):\n    return set(re.findall(r"[a-z0-9]+", text.lower()))\n';

const FUNC =
  'def search_products(question, k=3, max_price=None):\n    q = question.lower()\n    if re.fullmatch(r"p\\d{3}", q.strip()):            # a code: look it up\n        code = q.strip().upper()\n        return [code] if code in by_id else []\n    where = {"in_stock": 1}                          # filters\n    if "wedding" in q or "shaadi" in q:\n        where["occasion"] = "wedding"\n    for cat in categories:\n        if cat in q:\n            where["category"] = cat\n            break\n    hits = store.search(question, k=len(store), where=where)\n    hits = [h for h in hits if h["score"] >= 0.5]   # minimum score\n    if max_price is not None:\n        hits = [h for h in hits if h["price"] <= max_price]\n    for h in hits:                                   # hybrid score\n        h["hybrid"] = 0.5 * h["score"] + 0.5 * len(words(question) & words(h["text"])) / len(words(question))\n    hits.sort(key=lambda h: -h["hybrid"])\n    return [h["id"] for h in hits[:k]]\n';

const lesson: OriginalLesson = {
  key: 'l19',
  title: 'Product search v0.5',
  summary: 'Friday again. Joel puts the whole chapter into one function: lookup for codes, filters, a minimum score, a price limit and hybrid ranking. Mr Rao asks the wedding question one more time.',
  minutes: 13,
  outcomes: [
    'Read a complete product search function',
    'Point at the line for each idea in the chapter',
    'Run it on real customer questions',
  ],
  learn: [
    {
      kind: 'story',
      title: 'One more time',
      beats: [
        { speaker: 'narrator', text: 'Mr Rao types it himself: "do you have something for a wedding?"' },
        { speaker: 'narrator', text: 'Mustard silk lehenga. Green silk lehenga. Peach silk lehenga. All in stock.' },
        { speaker: 'joel', text: 'Now "something to wear to a shaadi", under ₹5,000.' },
        { speaker: 'narrator', text: 'Maroon silk saree, ₹3,599. Teal silk saree, ₹3,299. White silk saree, ₹3,999.' },
        { speaker: 'kavya', text: '"Do you sell laptops?"' },
        { speaker: 'narrator', text: 'Nothing. Ask Rao says the shop sells clothes and footwear.' },
        { speaker: 'arjun', text: 'And "lehenga under ₹3,000"?' },
        { speaker: 'narrator', text: 'Nothing, honestly. The cheapest lehenga is ₹4,799, and Ask Rao says so.' },
        { speaker: 'tey', text: 'That\'s v0.5. Search finds products by meaning. Next chapter, the same idea finds the right lines in the help page, so answers come from the shop\'s own rules.' },
      ],
    },
    {
      kind: 'tryIt',
      title: 'Ask Rao v0.5 search',
      caption: 'Every idea from the chapter, labelled.',
      code: SETUP + '\n' + FUNC + '\nprint(search_products("do you have something for a wedding?"))\nprint(search_products("something to wear to a shaadi", max_price=5000))\nprint(search_products("navy georgette saree"))\nprint(search_products("P121"))\nprint(search_products("Do you sell laptops?"))\n',
      challenge: 'Try "lehenga" with max_price=6000.',
    },
  ],
  apply: {
    scenario: 'Ask Rao v0.5.',
    items: [
      {
        kind: 'writeCode',
        prompt: 'Print search_products("something to wear to a shaadi", max_price=5000)',
        starter: SETUP + '\n' + FUNC,
        solution: SETUP + '\n' + FUNC + '\nprint(search_products("something to wear to a shaadi", max_price=5000))\n',
        hint: 'print(search_products("...", max_price=5000))',
        checks: [{ message: "Print ['P211', 'P103', 'P184']", outputEquals: "['P211', 'P103', 'P184']" }],
      },
      {
        kind: 'mcq',
        prompt: 'Which line stops "Do you sell laptops?" from returning juttis?',
        options: [
          { text: 'Keeping only hits with a score of at least 0.5' },
          { text: 'The in-stock filter', why: 'The juttis are in stock.' },
          { text: 'The price limit', why: 'No price limit was given.' },
        ],
        answer: 0,
      },
      {
        kind: 'matchPairs',
        prompt: 'Match the line to the lesson it comes from.',
        pairs: [
          ['re.fullmatch(r"p\\d{3}", ...)', 'Exact lookup for codes'],
          ['where = {"in_stock": 1}', 'Metadata filters'],
          ['h["score"] >= 0.5', 'Minimum score'],
          ['0.5 * h["score"] + 0.5 * ...', 'Hybrid search'],
        ],
      },
      {
        kind: 'sortGroups',
        prompt: 'What does search_products return?',
        groups: ['Some products', 'An empty list'],
        items: [
          { text: 'do you have something for a wedding?', group: 0 },
          { text: 'Do you sell laptops?', group: 1 },
          { text: 'lehenga, max_price=3000', group: 1 },
          { text: 'P121', group: 0 },
        ],
      },
      {
        kind: 'chatReply',
        from: 'arjun',
        message: 'What does Ask Rao say when the list comes back empty?',
        prompt: "Joel's best reply?",
        options: [
          { text: 'It says what it couldn\'t find and offers a next step, like the cheapest lehenga or WhatsApp help. Never random products.' },
          { text: 'Nothing; it stays silent.', why: 'Customers need to know why.' },
          { text: 'It shows the top 3 anyway.', why: 'That\'s the juttis mistake again.' },
        ],
        answer: 0,
      },
      {
        kind: 'mcq',
        variant: 'predictOutput',
        prompt: 'Using search_products from the lesson, what does this print?',
        code: 'print(search_products("p999"))',
        language: 'python',
        options: [
          { text: '[]' },
          { text: "['P999']", why: 'P999 isn\'t in the shop\'s product list.' },
          { text: 'An error', why: 'It returns an empty list for unknown codes.' },
        ],
        answer: 0,
      },
      {
        kind: 'writeCode',
        prompt: 'Print search_products("navy georgette saree")',
        starter: SETUP + '\n' + FUNC,
        solution: SETUP + '\n' + FUNC + '\nprint(search_products("navy georgette saree"))\n',
        hint: 'print(search_products("navy georgette saree"))',
        checks: [{ message: "Print ['P121', 'P157', 'P220']", outputEquals: "['P121', 'P157', 'P220']" }],
      },
      {
        kind: 'fillBlank',
        prompt: 'Calling it with a budget.',
        language: 'python',
        template: 'search_products("lehenga", [[1]]=6000, [[2]]=3)',
        blanks: [['max_price'], ['k']],
        distractors: ['price', 'where'],
      },
      {
        kind: 'findBug',
        prompt: 'This version shows sold-out products. Which line?',
        language: 'python',
        lines: ['where = {}', 'if "wedding" in q or "shaadi" in q:', '    where["occasion"] = "wedding"', 'hits = store.search(question, k=len(store), where=where)'],
        bug: 0,
        fix: 'where = {"in_stock": 1}',
        explanation: 'Start every search with the in-stock filter.',
      },
      {
        kind: 'writeCode',
        prompt: 'Print search_products("lehenga", max_price=6000)',
        starter: SETUP + '\n' + FUNC,
        solution: SETUP + '\n' + FUNC + '\nprint(search_products("lehenga", max_price=6000))\n',
        hint: 'max_price=6000',
        checks: [{ message: "Print ['P104', 'P131', 'P158']", outputEquals: "['P104', 'P131', 'P158']" }],
      },
      {
        kind: 'typeAnswer',
        prompt: 'What version of Ask Rao is this? (v0.?)',
        answers: ['v0.5', '0.5'],
        placeholder: 'A version',
      },
    ],
  },
  reflect: {
    prompt: 'Look at search_products. Which single line do you think matters most for customers? Why?',
    starters: ['The most important line is...', 'Because without it...'],
  },
  deepen: {
    title: 'Search is a stack too',
    summary: 'Real product search layers the same pieces: query understanding, filters, retrieval, ranking and a minimum quality bar. You just built a small one.',
  },
  notes: 'Measured with teyro_ai: wedding question -> [P212, P203, P167] (Mustard, Green, Peach silk lehengas); "something to wear to a shaadi" max 5000 -> [P211 Maroon silk saree 3599, P103 Teal silk saree 3299, P184 White silk saree 3999]; navy georgette saree -> [P121, P157, P220]; P121 -> [P121]; p999 -> []; laptops -> []; lehenga <= 3000 -> []; lehenga <= 6000 -> [P104, P131, P158]. Cheapest lehenga 4799.',
};

export default lesson;
