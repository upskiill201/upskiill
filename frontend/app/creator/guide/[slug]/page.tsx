import { notFound } from 'next/navigation';
import { GUIDE, guideBySlug } from '@/lib/creator/guide';
import { GuideArticleView } from '@/components/studio/guide/GuideArticle';

export function generateStaticParams() {
  return GUIDE.map((a) => ({ slug: a.slug }));
}

export default async function CreatorGuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = guideBySlug(slug);
  if (!article) notFound();
  return <GuideArticleView article={article} />;
}
