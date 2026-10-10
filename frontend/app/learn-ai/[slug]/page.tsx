import { trackSlugRoute } from '@/components/seo/learn/routes';

// A topic (/learn-ai/<topic>) or a place (/learn-ai/<place>).
const route = trackSlugRoute('ai');

export const revalidate = 86400;
export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
