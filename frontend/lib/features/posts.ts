import { createMdxCollection } from '@/lib/seo/mdxPages';

// Feature pages at /features/[slug] — content/features/*.mdx
const features = createMdxCollection('features');

export const getAllFeaturePages = features.all;
export const getAllFeatureSlugs = features.slugs;
export const getFeatureBySlug = features.bySlug;
