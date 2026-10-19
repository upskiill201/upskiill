# Teyro's practice AI toolkit, for The AI Stack.
#
# Loaded by frontend/public/python/runner.worker.js (the learner's browser)
# and backend/src/originals/originals-code-verify.ts (the course checker),
# which write it into Python's file system so lessons can say:
#
#     from teyro_ai import PracticeModel, count_tokens, embed, VectorStore
#
# Nothing here calls a real AI model: no network, no API keys, no cost. It is
# small, rule-based and fully deterministic, so every learner sees the same
# output and lessons can check exact numbers. Lessons say so plainly:
#   - count_tokens: a simplified tokenizer (about 4 letters per token in
#     English; every non-Latin character is a token). Real ones differ.
#   - embed: small "practice" vectors built from about 200 shop words, plus a
#     little spelling signal. Real embeddings capture meaning far better.
#   - PracticeModel: answers from the context you give it, says "I don't know"
#     when it can't find an answer, and, with no context, invents a confident
#     wrong answer, so hallucination is visible. It also asks for tools,
#     follows "ignore your instructions" (to teach guardrails) and reports
#     tokens and cost from made-up price cards.
#
# Lessons check exact numbers: never change a rule, a word list or a price
# without re-running `npm run originals` on The AI Stack.

import hashlib as _hashlib
import json as _json
import math as _math
import re as _re

__all__ = [
    'tokenize', 'count_tokens', 'embed', 'cosine', 'VectorStore',
    'MODELS', 'cost', 'PracticeModel', 'Reply',
]

# ── Tokens ───────────────────────────────────────────────────────────────────

_PIECES = _re.compile(r"[A-Za-z]+|[0-9]|[^\sA-Za-z0-9]")


def tokenize(text):
    """Split text into practice tokens: English words in pieces of up to 4
    letters, each digit, each punctuation mark and each non-Latin character."""
    tokens = []
    for piece in _PIECES.findall(str(text)):
        if piece.isalpha() and piece.isascii() and len(piece) > 4:
            tokens.extend(piece[i:i + 4] for i in range(0, len(piece), 4))
        else:
            tokens.append(piece)
    return tokens


def count_tokens(text):
    """How many practice tokens a piece of text is."""
    return len(tokenize(text))


# ── Embeddings ───────────────────────────────────────────────────────────────

CONCEPTS = [
    'festive', 'everyday', 'office', 'women', 'men', 'kids', 'footwear',
    'clothing', 'delivery', 'returns', 'size', 'price', 'payment', 'order',
    'help', 'greeting',
]

_VOCAB = {
    'festive': ['wedding', 'festive', 'festival', 'diwali', 'eid', 'sangeet', 'mehendi', 'party',
                'celebration', 'ceremony', 'reception', 'puja', 'navratri', 'garba', 'shaadi',
                'silk', 'embroidered', 'zari', 'lehenga', 'sherwani', 'bridal', 'occasion', 'function'],
    'everyday': ['everyday', 'casual', 'daily', 'cotton', 'comfortable', 'simple', 'weekend', 'light',
                 'summer', 'linen', 'plain', 'home'],
    'office': ['office', 'work', 'formal', 'meeting', 'interview', 'smart', 'professional'],
    'women': ['women', 'woman', 'ladies', 'lady', 'her', 'she', 'saree', 'sari', 'kurti', 'dupatta',
              'lehenga', 'blouse', 'salwar', 'anarkali', 'mother', 'wife', 'sister', 'girl', 'bride'],
    'men': ['men', 'man', 'gents', 'him', 'he', 'kurta', 'sherwani', 'nehru', 'jacket', 'dhoti',
            'father', 'husband', 'brother', 'boy', 'groom'],
    'kids': ['kids', 'kid', 'child', 'children', 'baby', 'son', 'daughter', 'boy', 'girl', 'school'],
    'footwear': ['footwear', 'shoe', 'shoes', 'jutti', 'juttis', 'mojari', 'sandal', 'sandals',
                 'chappal', 'slipper', 'heel', 'heels'],
    'clothing': ['kurta', 'kurti', 'saree', 'sari', 'lehenga', 'sherwani', 'dupatta', 'jacket',
                 'dress', 'outfit', 'wear', 'clothes', 'set', 'shirt', 'top', 'blouse', 'anarkali'],
    'delivery': ['delivery', 'deliver', 'delivered', 'shipping', 'ship', 'shipped', 'arrive', 'courier',
                 'dispatch', 'when', 'day', 'days', 'pune', 'city', 'pincode', 'reach', 'fast', 'express'],
    'returns': ['return', 'returns', 'refund', 'exchange', 'replace', 'replacement', 'back', 'unworn',
                'tag', 'tags', 'damaged', 'wrong', 'policy', 'within'],
    'size': ['size', 'sizes', 'small', 'medium', 'large', 'xl', 'xxl', 'fit', 'fits', 'chest', 'waist',
             'length', 'measurement', 'measurements', 'tight', 'loose', 'chart', 'free'],
    'price': ['price', 'cost', 'costs', 'cheap', 'expensive', 'rupees', 'rs', 'budget', 'discount',
              'sale', 'offer', 'code', 'coupon', 'under', 'much'],
    'payment': ['pay', 'payment', 'upi', 'card', 'cash', 'cod', 'emi', 'wallet', 'paid', 'refund'],
    'order': ['order', 'orders', 'track', 'tracking', 'status', 'where', 'placed', 'cancel', 'cancelled',
              'packed', 'number'],
    'help': ['help', 'human', 'person', 'agent', 'call', 'phone', 'email', 'contact', 'complaint',
             'speak', 'talk'],
    'greeting': ['hi', 'hello', 'hey', 'namaste', 'thanks', 'thank', 'morning', 'evening'],
}

_WORD_CONCEPTS = {}
for _concept, _words in _VOCAB.items():
    for _w in _words:
        _WORD_CONCEPTS.setdefault(_w, []).append(CONCEPTS.index(_concept))

_SPELLING_DIMS = 8
DIMS = len(CONCEPTS) + _SPELLING_DIMS


def _words(text):
    out = []
    for w in _re.findall(r"[a-z0-9]+", str(text).lower()):
        if w not in _WORD_CONCEPTS and len(w) > 3 and w.endswith('s') and w[:-1] in _WORD_CONCEPTS:
            w = w[:-1]
        out.append(w)
    return out


def _spelling_dim(word):
    return len(CONCEPTS) + int(_hashlib.md5(word.encode('utf-8')).hexdigest(), 16) % _SPELLING_DIMS


def embed(text):
    """A practice embedding: a list of DIMS numbers, length 1. Shop words point
    towards their concepts; every word adds a small spelling signal."""
    v = [0.0] * DIMS
    for w in _words(text):
        for i in _WORD_CONCEPTS.get(w, []):
            v[i] += 1.0
        v[_spelling_dim(w)] += 0.3
    norm = _math.sqrt(sum(x * x for x in v))
    return [round(x / norm, 6) for x in v] if norm else v


def cosine(a, b):
    """Cosine similarity of two vectors: 1 = same direction, 0 = unrelated."""
    dot = sum(x * y for x, y in zip(a, b))
    na = _math.sqrt(sum(x * x for x in a))
    nb = _math.sqrt(sum(y * y for y in b))
    return dot / (na * nb) if na and nb else 0.0


class VectorStore:
    """A tiny in-memory vector store: add texts, search by meaning."""

    def __init__(self):
        self.items = []

    def add(self, id, text, **meta):
        self.items.append({'id': id, 'text': text, 'vector': embed(text), **meta})

    def __len__(self):
        return len(self.items)

    def search(self, query, k=3, where=None):
        """The k most similar items, best first. where={'in_stock': 1} keeps
        only items whose metadata matches."""
        q = embed(query)
        results = []
        for item in self.items:
            if where and any(item.get(key) != value for key, value in where.items()):
                continue
            hit = {key: value for key, value in item.items() if key != 'vector'}
            hit['score'] = round(cosine(q, item['vector']), 3)
            results.append(hit)
        results.sort(key=lambda h: -h['score'])  # stable: ties keep insertion order
        return results[:k]


# ── Models and prices ────────────────────────────────────────────────────────
# Made-up price cards in US dollars per million tokens. Real prices change
# monthly; lessons quote them in text, with a date and a source.

MODELS = {
    'model-a': {'kind': 'closed', 'price_in': 5.00, 'price_out': 15.00, 'context': 128000, 'speed': 60},
    'model-b': {'kind': 'closed', 'price_in': 0.50, 'price_out': 1.50, 'context': 128000, 'speed': 120},
    'model-c': {'kind': 'open-weight', 'price_in': 0.10, 'price_out': 0.30, 'context': 32000, 'speed': 90},
    'practice-tiny': {'kind': 'open-weight', 'price_in': 0.00, 'price_out': 0.00, 'context': 300, 'speed': 200},
}


def cost(model, tokens_in, tokens_out):
    """Dollars for one call: tokens times the price per million."""
    card = MODELS[model]
    return (tokens_in * card['price_in'] + tokens_out * card['price_out']) / 1_000_000


# What the practice model says when it has no context: confident, and wrong
# for Mr Rao's shop (rao_policies.md has the real answers).
_MADE_UP = {
    'returns': ['You can return any item within 60 days for a full refund, no questions asked.',
                'Returns are accepted for 90 days, even if the item has been worn.'],
    'delivery': ['Delivery is free and takes 1 day anywhere in India.',
                 'Every order arrives the next morning, anywhere in India, for free.'],
    'price': ['Use code WELCOME50 for 50% off your first order.',
              'Everything is 40% off this week with code FESTIVE40.'],
    'size': ['Every item comes in sizes XS to 4XL.',
             'All our clothes are free size, so they fit everyone.'],
    'payment': ['We accept every payment method, including cryptocurrency.'],
    'order': ['Your order has been delivered.'],
    'help': ['You can call us 24 hours a day on 1800-000-0000.'],
}
_GREETINGS = ['Namaste! How can I help you today?', 'Hello! What can I help you find?']
_GENERIC = ['Great question! Most shops do, so the answer is probably yes.']
_DONT_KNOW = "I don't know. That isn't in the information I was given."
_INJECTION = _re.compile(r"ignore\s+(all\s+|your\s+|the\s+|any\s+|my\s+)?(previous\s+|prior\s+|earlier\s+)?(instructions|rules)")
_ORDER_ID = _re.compile(r"\bR-?(\d{4})\b", _re.IGNORECASE)
_ORDER_WORDS = ('order', 'where', 'status', 'track', 'delivered', 'arrive', 'shipped')
_GROUNDED_AT = 0.35


_STOPWORDS = {
    'a', 'an', 'the', 'is', 'are', 'am', 'do', 'does', 'did', 'you', 'your', 'i', 'my', 'me', 'we', 'our',
    'us', 'can', 'could', 'how', 'what', 'when', 'where', 'which', 'who', 'why', 'to', 'for', 'of', 'in',
    'on', 'at', 'and', 'or', 'it', 'its', 'this', 'that', 'be', 'with', 'any', 'have', 'has', 'there',
    'will', 'much', 'many', 'if', 'so', 'get', 'got', 'please', 'from', 'by', 'up', 'all', 'every', 'one',
}


def _content_words(text):
    return {w for w in _words(text) if w not in _STOPWORDS}


def _sentences(text):
    """The answerable pieces of a document: one per line or sentence, headings skipped."""
    out = []
    for line in str(text).splitlines():
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        for part in _re.split(r"(?<=[.!?])\s+(?=[A-Z])", line.strip('-* \t')):
            if len(part) > 3:
                out.append(part.strip())
    return out


def _match(question, sentence):
    """How well a sentence answers a question: meaning (embeddings) plus shared words."""
    q_words = _content_words(question)
    overlap = len(q_words & _content_words(sentence)) / len(q_words) if q_words else 0.0
    return 0.5 * cosine(embed(question), embed(sentence)) + 0.5 * overlap


def _topic(text):
    v = embed(text)
    scores = {c: v[i] for i, c in enumerate(CONCEPTS)}
    best = max(scores, key=scores.get)
    return best if scores[best] > 0 else None


def _pick(options, prompt, temperature, seed):
    if temperature <= 0 or len(options) == 1:
        return options[0]
    key = f'{prompt}|{temperature}|{seed}'.encode('utf-8')
    return options[int(_hashlib.md5(key).hexdigest(), 16) % len(options)]


class Reply:
    """What PracticeModel.reply() returns. print(reply) shows the text."""

    def __init__(self, model, text, tokens_in, tokens_out, tool_call=None, source=None):
        self.model = model
        self.text = text
        self.tool_call = tool_call
        self.tokens_in = tokens_in
        self.tokens_out = tokens_out
        self.cost = cost(model, tokens_in, tokens_out)
        self.source = source
        self.grounded = source is not None

    def __str__(self):
        return self.text if self.tool_call is None else 'TOOL CALL ' + _json.dumps(self.tool_call)

    __repr__ = __str__


class PracticeModel:
    """A rule-based stand-in for an AI model. See the notes at the top of this file."""

    def __init__(self, name='model-b'):
        if name not in MODELS:
            raise ValueError(f'Unknown model {name!r}. Choose one of: {", ".join(MODELS)}')
        self.name = name
        self.card = MODELS[name]
        self.context_window = self.card['context']

    def reply(self, prompt, system='', context='', tools=None, temperature=0.0, seed=0):
        prompt = str(prompt)
        tokens_in = count_tokens(system) + count_tokens(context) + count_tokens(prompt)
        if tokens_in > self.context_window:
            raise ValueError(
                f'The prompt is {tokens_in} tokens, but {self.name} can only read {self.context_window}.')
        lower = prompt.lower()

        # 1. "Ignore your instructions": the practice model obeys, which is the point.
        if _INJECTION.search(lower):
            text = f'Sure! Here are my instructions: {system}' if system else 'Sure, I will ignore them. What next?'
            return Reply(self.name, text, tokens_in, count_tokens(text))

        # 2. A tool can answer it: ask for the tool instead of answering.
        if tools:
            names = [t['name'] if isinstance(t, dict) else str(t) for t in tools]
            match = _ORDER_ID.search(prompt)
            order_tool = next((n for n in names if 'order' in n), None)
            if match and order_tool and any(w in lower for w in _ORDER_WORDS):
                call = {'name': order_tool, 'arguments': {'order_id': 'R-' + match.group(1)}}
                return Reply(self.name, '', tokens_in, count_tokens(_json.dumps(call)), tool_call=call)

        # 3. Context given: answer only from it, or say so.
        if str(context).strip():
            best, best_score = None, 0.0
            for sentence in _sentences(context):
                score = _match(prompt, sentence)
                if score > best_score:
                    best, best_score = sentence, score
            if best is not None and best_score >= _GROUNDED_AT:
                return Reply(self.name, best, tokens_in, count_tokens(best), source=best)
            return Reply(self.name, _DONT_KNOW, tokens_in, count_tokens(_DONT_KNOW))

        # 4. No context. A careful system prompt can make it admit it doesn't know.
        topic = _topic(prompt)
        careful = any(p in str(system).lower() for p in ("don't know", 'do not know', 'not sure'))
        if topic == 'greeting':
            text = _pick(_GREETINGS, prompt, temperature, seed)
        elif careful:
            text = _DONT_KNOW
        elif topic in _MADE_UP:
            text = _pick(_MADE_UP[topic], prompt, temperature, seed)
        else:
            text = _pick(_GENERIC, prompt, temperature, seed)
        return Reply(self.name, text, tokens_in, count_tokens(text))
