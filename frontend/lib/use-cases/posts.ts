import { createMdxCollection } from '@/lib/seo/mdxPages';

// Use-case pages at /for/[slug] — content/use-cases/*.mdx. The programmatic
// persona pages that share the route live in lib/seo/personas.ts.
const useCases = createMdxCollection('use-cases');

export const getAllUseCasePages = useCases.all;
export const getAllUseCaseSlugs = useCases.slugs;
export const getUseCaseBySlug = useCases.bySlug;
