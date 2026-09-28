import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { CalendarDays, Clock } from 'lucide-react';
import { getAllFeaturePages, getAllFeatureSlugs, getFeatureBySlug } from '@/lib/features/posts';
import { ACCENTS } from '@/lib/seo/mdxPages';
import { START_HREF } from '@/lib/seo/facts';
import { formatDate } from '@/lib/blog/site';
import { articleSchema, breadcrumbSchema, faqSchema, schemas } from '@/lib/seo/schema';
import { relatedCards } from '@/lib/seo/related';
import JsonLd from '@/components/features/blog/JsonLd';
import FaqAccordion from '@/components/features/blog/FaqAccordion';
import CtaBlock from '@/components/features/blog/CtaBlock';
import { AnswerCard, LinkCards, SectionHead, SeoHeader } from '@/components/seo/Blocks';
import proseStyles from '@/app/blog/prose.module.css';
import s from '@/components/seo/Seo.module.css';

export const revalidate = 3600;
export const dynamicParams = false;

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllFeatureSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getFeatureBySlug(slug);
  if (!page) return {};
  const { title, meta_description } = page.frontmatter;
  return {
    title,
    description: meta_description,
    alternates: { canonical: `/features/${slug}` },
    openGraph: { type: 'article', url: `/features/${slug}`, title, description: meta_description },
    twitter: { card: 'summary_large_image', title, description: meta_description },
  };
}

export default async function FeatureDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getFeatureBySlug(slug);
  if (!page) notFound();

  const fm = page.frontmatter;
  const path = `/features/${slug}`;
  const forCreators = fm.audience === 'creators';

  // Explicit picks first, then neighbours for the same audience.
  const siblings = getAllFeaturePages()
    .filter((p) => p.slug !== slug && p.frontmatter.audience === fm.audience)
    .map((p) => `/features/${p.slug}`);
  const related = relatedCards([...fm.related, ...siblings], path, 3);

  return (
    <div className={s.page} style={{ '--accent': ACCENTS[fm.accent] } as React.CSSProperties}>
      <JsonLd
        data={schemas(
          articleSchema({ path, title: fm.title, description: fm.meta_description, dateModified: fm.updated }),
          breadcrumbSchema([
            { name: 'Features', path: '/features' },
            { name: fm.keyword, path },
          ]),
          faqSchema(fm.faq),
        )}
      />

      <SeoHeader
        crumbs={[{ name: 'Features', path: '/features' }]}
        chip={forCreators ? 'For creators' : fm.keyword}
        title={fm.title}
        dek={fm.meta_description}
        meta={
          <>
            <span className={s.metaItem}>
              <CalendarDays size={16} strokeWidth={2.5} aria-hidden="true" />
              Updated <time dateTime={fm.updated}>{formatDate(fm.updated)}</time>
            </span>
            <span className={s.metaItem}>
              <Clock size={16} strokeWidth={2.5} aria-hidden="true" />
              {page.readingMinutes} min read
            </span>
          </>
        }
      />

      <div className={s.container}>
        <AnswerCard answer={fm.answer} visual={fm.visual} caption={fm.caption ?? `${fm.keyword}, as it looks in Teyro`} />

        <div className={`${proseStyles.prose} ${s.prose}`}>
          <MDXRemote
            source={page.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
          />
        </div>

        <div className={s.narrow}>
          {fm.faq.length > 0 && <FaqAccordion items={fm.faq} />}
          <CtaBlock
            cta={
              forCreators
                ? {
                    title: 'Teach a course people finish',
                    text: 'Build it in Teyro Studio and every learner gets streaks, leagues and a community around it.',
                    href: '/teach',
                    label: 'Teach on Teyro',
                  }
                : {
                    title: 'Try it on your first lesson',
                    text: 'Your first lesson takes a few minutes. Teyro is free to start, with no ads.',
                    href: START_HREF,
                    label: 'Get Teyro free',
                  }
            }
          />
        </div>

        {related.length > 0 && (
          <section className={s.section} aria-labelledby="related-heading">
            <SectionHead id="related-heading" title="Keep exploring" />
            <LinkCards items={related} />
          </section>
        )}
      </div>
    </div>
  );
}
