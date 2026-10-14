import { notFound } from 'next/navigation';
import { Playground } from '@/components/code/Playground';

/** Dev bench for the Python runner: the playground without signing in. */
export default function DevCodePage() {
  if (process.env.NODE_ENV === 'production') notFound();
  return <Playground />;
}
