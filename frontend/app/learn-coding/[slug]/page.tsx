import { trackSlugRoute } from '@/components/seo/learn/routes';

// A topic (/learn-coding/<topic>) or a place (/learn-coding/<place>).
const route = trackSlugRoute('coding');

export const revalidate = 86400;
export const dynamicParams = false;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
