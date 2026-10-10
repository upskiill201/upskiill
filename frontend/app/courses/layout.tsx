import type { ReactNode } from 'react';
import { baloo2 } from '@/lib/seo/fonts';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className={baloo2.variable}>{children}</div>;
}
