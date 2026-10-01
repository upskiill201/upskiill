import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getAllFeaturePages } from '@/lib/features/posts';
import { ACCENTS } from '@/lib/seo/mdxPages';
import type { SeoMdxPage } from '@/lib/seo/mdxPages';
import { START_HREF, START_LABEL, TEYRO } from '@/lib/seo/facts';
import { breadcrumbSchema, collectionSchema, itemListSchema, schemas } from '@/lib/seo/schema';
import JsonLd from '@/components/features/blog/JsonLd';
import CtaBlock from '@/components/features/blog/CtaBlock';
import { LinkCards, SectionHead } from '@/components/seo/Blocks';
import s from '@/components/seo/Seo.module.css';

export const revalidate = 3600;

const DESCRIPTION =
  'Every Teyro feature: four-step lessons, streaks with freezes, weekly leagues, daily quests and chests, course communities — plus the studio for creators.';

export const metadata: Metadata = {
  title: 'Teyro Features: Everything That Makes Learning Stick',
  description: DESCRIPTION,
  alternates: { canonical: '/features' },
};

function toCard(p: SeoMdxPage) {
  return {
    href: `/features/${p.slug}`,
    title: p.frontmatter.keyword,
    text: p.frontmatter.meta_description,
    accent: ACCENTS[p.frontmatter.accent],
    art: p.frontmatter.art ? (
      <Image src={p.frontmatter.art} alt="" width={40} height={40} />
    ) : (
      <Sparkles size={28} strokeWidth={2.5} />
    ),
  };
}

export default function FeaturesHubPage() {
  const pages = getAllFeaturePages();
  const learners = pages.filter((p) => p.frontmatter.audience === 'learners');
  const creators = pages.filter((p) => p.frontmatter.audience === 'creators');

  return (
    <div className={s.page}>
      <JsonLd
        data={schemas(
          collectionSchema({ name: 'Teyro Features', path: '/features', description: DESCRIPTION }),
          breadcrumbSchema([{ name: 'Features', path: '/features' }]),
          itemListSchema(
            'Teyro features',
            pages.map((p) => ({ name: p.frontmatter.keyword, url: `/features/${p.slug}` })),
          ),
        )}
      />

      <div className={s.hubBand}>
        <header className={s.hubHero}>
          <div className={s.hubCopy}>
            <span className={s.eyebrow}>Features</span>
            <h1 className={`${s.display} ${s.hubTitle}`}>
              Built so you <em>actually finish.</em>
            </h1>
            <p className={s.lead}>
              {TEYRO.oneLiner} Here is every piece, what it does, and why it keeps you going.
            </p>
            <div className={s.pillRow}>
              <a href="#learners" className={s.pill}>
                For learners · {learners.length}
              </a>
              <a href="#creators" className={s.pill}>
                For creators · {creators.length}
              </a>
            </div>
            <Link href={START_HREF} className={s.btn}>
              {START_LABEL}
              <ArrowRight size={18} strokeWidth={3} aria-hidden="true" />
            </Link>
          </div>
          <div className={s.hubArt}>
            <Image
              src="/User onbarding Assets/tey/pointing.webp"
              alt=""
              width={260}
              height={300}
              className={s.hubTey}
              priority
            />
          </div>
        </header>
      </div>

      <div className={s.container}>
        <section className={s.section} aria-labelledby="learners">
          <SectionHead
            id="learners"
            eyebrow="For learners"
            title="The habit loop"
            lead="Short lessons you apply straight away, and the streaks, leagues and rewards that bring you back tomorrow."
          />
          <LinkCards items={learners.map(toCard)} />
        </section>

        {creators.length > 0 && (
          <section className={s.section} aria-labelledby="creators">
            <SectionHead
              id="creators"
              eyebrow="For creators"
              title="Teyro Studio"
              lead="Build a course in four-step lessons and every learner gets streaks, leagues and a community around it."
            />
            <LinkCards items={creators.map(toCard)} />
          </section>
        )}

        <div className={s.narrow}>
          <CtaBlock
            cta={{
              title: 'See it on your first lesson',
              text: 'Your first lesson takes a few minutes. Free to start, no ads.',
              href: START_HREF,
              label: START_LABEL,
            }}
          />
        </div>
      </div>
    </div>
  );
}
