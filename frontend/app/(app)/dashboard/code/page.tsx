import type { Metadata } from 'next';
import { Playground } from '@/components/code/Playground';

export const metadata: Metadata = { title: 'Code playground · Teyro' };

export default function CodePlaygroundPage() {
  return <Playground />;
}
