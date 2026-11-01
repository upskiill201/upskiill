import { ImageResponse } from 'next/og';
import { CertificateArt } from '../../_art/CertificateArt';
import { certificateAssets } from '../../_art/assets';
import { fetchCertificate } from '@/lib/certificates/server';
import { CERTIFICATE_SIZE } from '@/lib/certificates/types';

/**
 * GET /c/:code/image — the certificate as a 1600×1131 PNG (A4 landscape
 * ratio, prints cleanly). `?download=1` serves it as a file. Renders only the
 * server snapshot, so nothing on it can be edited in a URL.
 */
export const runtime = 'nodejs';

export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const cert = await fetchCertificate(code);
  if (!cert) return new Response('Not found', { status: 404 });

  const assets = certificateAssets();
  const download = new URL(req.url).searchParams.get('download') === '1';
  const slug = cert.data.courseTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48);

  return new ImageResponse(<CertificateArt cert={cert} assets={assets} />, {
    ...CERTIFICATE_SIZE,
    fonts: assets.fonts,
    headers: {
      // Short edge cache: a revoked certificate must stop looking valid soon.
      'Cache-Control': cert.code === 'SAMPLE23' ? 'no-store' : 'public, max-age=3600, s-maxage=86400',
      ...(download ? { 'Content-Disposition': `attachment; filename="teyro-certificate-${slug || cert.code}.png"` } : {}),
    },
  });
}
