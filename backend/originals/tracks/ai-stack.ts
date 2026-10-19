import type { OriginalTrackDef } from '../../src/originals/originals-authoring.types';
import u01 from './ai-stack/beginner/u01';
import u02 from './ai-stack/beginner/u02';
import u03 from './ai-stack/beginner/u03';
import u04 from './ai-stack/beginner/u04';

/**
 * The AI Stack — storyline "Ask Rao".
 * Outline: docs/originals/the-ai-stack-outline.md (approved 2026-10-18).
 *
 * After the Diwali sale (How to Set Clear Expectations), Mr Rao wants "AI for
 * my shop". Arjun's junior developers Kavya and Joel build Ask Rao, a shop
 * assistant, one layer of the AI stack per chapter; the map marker is its
 * version. Lessons run real Python in the browser with the practice toolkit
 * (frontend/public/python/teyro_ai.py): no real AI model is ever called.
 */
const track: OriginalTrackDef = {
  slug: 'the-ai-stack',
  title: 'The AI Stack',
  category: 'AI',
  description:
    'Learn how AI products are really built, layer by layer: chips, models, data, agents, apps and evaluation, with real code in your browser.',
  levels: [
    {
      level: 1,
      slug: 'the-ai-stack',
      title: 'The AI Stack',
      subtitle: 'Ask Rao: how AI apps really work, layer by layer',
      shortDescription:
        'Learn how AI products are really built: chips, models, data, agents, apps and evaluation. Build your own AI assistant in your browser, one layer at a time.',
      description:
        "Mr Rao's online clothing shop survived the Diwali sale. Now customers ask the same questions all day, and Mr Rao sends one line: \"Add AI. Like ChatGPT. For my shop. How much?\" Kavya wants to wire up the biggest model by Friday. Joel wants to understand every layer first. Follow them as they build Ask Rao, a shop assistant, through every layer of the AI stack: the chips and clouds underneath, the models, embeddings and vector search, answers grounded in the shop's own documents, tools and agents, guardrails, the app itself, and the evaluation that proves it works. You'll write real Python in your browser with a built-in practice model, and learn the parts most explanations skip: what it costs, why it gets things wrong, and how to check. Ten minutes a lesson, made for your phone.",
      startingPoint:
        'You use AI tools and want to know how AI products are built. A little Python helps, but every code exercise is short and guided. Nothing to install.',
      endOutcome:
        'Explain every layer of the AI stack, build a working assistant with retrieval, tools and guardrails, and estimate, evaluate and govern it.',
      outcomes: [
        'Trace a message through every layer of the AI stack',
        'Explain GPUs, tokens, context windows and what drives cost',
        'Compare closed and open-weight models fairly',
        'Build search and answers from your own documents (RAG)',
        'Add tools, agents and guardrails safely',
        'Evaluate, trace and govern an AI product',
      ],
      skills: ['AI stack', 'LLMs', 'RAG', 'Vector search', 'AI agents', 'AI evaluation', 'Python'],
      // Cover: frontend/public/originals, designed in originals/covers.
      thumbnailUrl: '/originals/the-ai-stack.jpg',
      upcomingUnits: 7,
      units: [u01, u02, u03, u04],
    },
  ],
};

export default track;
