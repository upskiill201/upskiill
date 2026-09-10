'use client';

/**
 * Trigger a browser file download for an authenticated CSV endpoint.
 * Fetches with session cookies, then hands the blob to a synthetic anchor.
 */
export async function downloadCsv(path: string, filename?: string): Promise<void> {
  const res = await fetch(path, { credentials: 'include' });
  if (!res.ok) {
    throw new Error(`Download failed (${res.status})`);
  }
  const blob = await res.blob();

  // Prefer the server's Content-Disposition filename
  let name = filename;
  if (!name) {
    const disposition = res.headers.get('Content-Disposition') ?? '';
    const match = /filename="?([^";]+)"?/.exec(disposition);
    name = match?.[1] ?? 'teyro-download.csv';
  }

  const url = URL.createObjectURL(blob);
  try {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } finally {
    URL.revokeObjectURL(url);
  }
}
