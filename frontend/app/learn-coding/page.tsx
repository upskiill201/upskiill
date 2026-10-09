import { trackHubRoute } from '@/components/seo/learn/routes';

const route = trackHubRoute('coding');

export const revalidate = 86400;
export const metadata = route.metadata;
export default route.Page;
