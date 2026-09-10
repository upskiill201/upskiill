import fs from 'fs';
import path from 'path';
import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog/posts';
import { getCategoryOrThrow } from '@/lib/blog/categories';

// Auto-generated social card per post — title on a branded card, category
// chip in the category's accent color. No hand-designed images needed.
export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Article from the Teyro blog';

const FONT_DIR = path.join(process.cwd(), 'app', 'blog', '_fonts');
const fontBold = fs.readFileSync(path.join(FONT_DIR, 'PlusJakartaSans-Bold.ttf'));
const fontExtra = fs.readFileSync(path.join(FONT_DIR, 'PlusJakartaSans-ExtraBold.ttf'));

interface OgImageProps {
  params: Promise<{ slug: string }>;
}

export default async function OgImage({ params }: OgImageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.frontmatter.title ?? 'Teyro Blog';
  let categoryName = '';
  let accent = '#3D5AFE';
  if (post) {
    try {
      const category = getCategoryOrThrow(post.frontmatter.category);
      categoryName = category.name.toUpperCase();
      accent = category.accentColor;
    } catch {
      // fall through with defaults
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #EEF2FF 100%)',
          fontFamily: 'Jakarta',
        }}
      >
        {/* Category chip */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {categoryName && (
            <div
              style={{
                display: 'flex',
                padding: '10px 28px',
                borderRadius: 999,
                border: `3px solid ${accent}`,
                color: accent,
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 3,
              }}
            >
              {categoryName}
            </div>
          )}
        </div>

        {/* Title (satori wraps automatically; sized to fit ~4 lines) */}
        <div
          style={{
            fontSize: title.length > 80 ? 56 : 68,
            fontWeight: 800,
            color: '#1F2A44',
            lineHeight: 1.18,
          }}
        >
          {title}
        </div>

        {/* Brand footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ fontSize: 34, fontWeight: 800, color: '#3D5AFE', letterSpacing: 2 }}>
            TEYRO
          </div>
          <div
            style={{
              width: 48,
              height: 8,
              borderRadius: 999,
              background: 'linear-gradient(90deg, #3D5AFE 0%, #7B61FF 100%)',
            }}
          />
          <div style={{ fontSize: 26, fontWeight: 700, color: '#64748B' }}>teyro.app</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Jakarta', data: fontBold, weight: 700, style: 'normal' },
        { name: 'Jakarta', data: fontExtra, weight: 800, style: 'normal' },
      ],
    }
  );
}
