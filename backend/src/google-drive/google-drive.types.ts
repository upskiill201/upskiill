export type DriveFileCategory =
  | 'folder'
  | 'video'
  | 'audio'
  | 'document'
  | 'presentation'
  | 'image'
  /** A downloadable project file: archive, starter code, dataset, sheet. */
  | 'file'
  | 'other';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  category: DriveFileCategory;
  /** Bytes. Undefined for Google-native docs (Sheets/Docs/Slides have no fixed size). */
  sizeBytes?: number;
  /** Only present for video files Drive has already indexed. */
  durationMs?: number;
  modifiedTime?: string;
  /** The first-level subfolder (directly under the selected course root)
   *  this file lives under, if any — undefined for a file sitting directly
   *  in the course root, or nested deeper than one level (attributed to its
   *  nearest first-level ancestor instead). Set by GoogleDriveService's
   *  walkFolder; this is the only structural signal course sections have. */
  sectionFolderId?: string;
  sectionFolderName?: string;
}

export interface ConnectionStatus {
  connected: boolean;
  email?: string;
  connectedAt?: string;
}

export interface FolderPreview {
  folderId: string;
  folderName: string;
  totalFiles: number;
  videos: number;
  audio: number;
  documents: number;
  presentations: number;
  images: number;
  /** Project files (archives, starter code, datasets, Sheets) for Deepen. */
  projectFiles: number;
  /** Files Teyro doesn't know how to ingest yet (category === 'other'). */
  unsupported: DriveFile[];
  estimatedVideoDurationSeconds: number;
  /** How many videos have no Drive-reported duration (metadata missing). */
  videosMissingDuration: number;
  /** Videos/audio over 15 minutes: each is split into bite-size parts. */
  videosOverLimit: number;
  /** How many part-lessons those long files become in total. */
  longVideoParts: number;
  /** Modules the import will make (one per section folder with lessons). */
  modules: number;
}

/** Native Google files the importer exports to a real format instead of
 *  skipping: Docs/Slides become PDFs, Sheets an Excel file. Forms, Drawings
 *  and the rest have nothing a learner could download. */
export const NATIVE_EXPORTS: Record<string, { mimeType: string; ext: string }> =
  {
    'application/vnd.google-apps.document': {
      mimeType: 'application/pdf',
      ext: 'pdf',
    },
    'application/vnd.google-apps.presentation': {
      mimeType: 'application/pdf',
      ext: 'pdf',
    },
    'application/vnd.google-apps.spreadsheet': {
      mimeType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ext: 'xlsx',
    },
  };

/** Project files a lesson hands out in Deepen: starter code, archives,
 *  datasets. Matched by extension, because Drive reports most of them as
 *  application/octet-stream or a dozen different text/x-* types. */
const PROJECT_FILE_EXT =
  /\.(zip|rar|7z|tar|gz|tgz|csv|tsv|xlsx?|json|ya?ml|xml|ipynb|py|js|jsx|ts|tsx|mjs|cjs|html?|css|scss|sql|sh|bat|ps1|java|kt|swift|dart|go|rs|rb|php|c|cpp|h|cs|r|md|env\.example|txt|fig|sketch|psd|ai|xd)$/i;
const PROJECT_FILE_MIME =
  /^(application\/(zip|x-zip-compressed|x-rar-compressed|vnd\.rar|x-7z-compressed|x-tar|gzip|json|xml|javascript|x-ipynb\+json|vnd\.ms-excel|vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet)|text\/(csv|tab-separated-values|x-[\w+-]+|javascript|html|css|markdown|xml))$/;

/** Extensions a course file can really have — what `cleanDriveFileName`
 *  cuts back to. Anything after the LAST of these is junk a re-uploader
 *  appended ("…Introduction.mp4 |google>|ahm7tech|or|ahm7tech.vercel.app|"). */
const REAL_EXTENSIONS =
  'mp4|mov|m4v|mkv|webm|avi|mpe?g|wmv|flv|3gp|mp3|wav|m4a|aac|ogg|oga|opus|flac|wma|pdf|docx?|pptx?|xlsx?|csv|tsv|txt|md|rtf|odt|odp|ods|key|pages|numbers|html?|zip|rar|7z|tar|gz|tgz|png|jpe?g|gif|webp|svg|bmp|heic|json|ya?ml|xml|ipynb|py|js|jsx|ts|tsx|mjs|cjs|css|scss|sql|sh|bat|ps1|java|kt|swift|dart|go|rs|rb|php|c|cpp|h|cs|r|fig|sketch|psd|ai|xd|srt|vtt';
/** Greedy, so the LAST real extension wins ("my.notes.pdf" keeps ".pdf"),
 *  and it must end the name or be followed by a non-alphanumeric. */
const UP_TO_REAL_EXT = new RegExp(
  `^(.*\\.(?:${REAL_EXTENSIONS}))(?=$|[^a-z0-9])`,
  'i',
);

/**
 * A Drive file name with the junk re-uploaders add, removed:
 *
 *   "Copy of 9 - Introduction.mp4 |google>|ahm7tech|or|ahm7tech.vercel.app|"
 *     -> "9 - Introduction.mp4"
 *
 * Drops Drive's "Copy of " prefix (repeated, as in "Copy of Copy of"),
 * everything after the real file extension, and, for names with no
 * extension (native Google Docs), everything from the first "|". Used
 * everywhere a name means something: file type, storage key, lesson and
 * resource titles. The original name stays on the import row as-is.
 */
export function cleanDriveFileName(name: string): string {
  let n = name.trim().replace(/^(?:copy of\s+)+/i, '');
  const upToExt = n.match(UP_TO_REAL_EXT);
  if (upToExt) n = upToExt[1];
  else if (n.includes('|')) n = n.slice(0, n.indexOf('|'));
  n = n.trim();
  return n || name.trim();
}

const GENERIC_MIME = new Set([
  '',
  'application/octet-stream',
  'application/x-unknown',
  'binary/octet-stream',
]);

const MIME_BY_EXT: Record<string, string> = {
  mp4: 'video/mp4',
  m4v: 'video/mp4',
  mov: 'video/quicktime',
  mkv: 'video/x-matroska',
  webm: 'video/webm',
  avi: 'video/x-msvideo',
  mpg: 'video/mpeg',
  mpeg: 'video/mpeg',
  wmv: 'video/x-ms-wmv',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  m4a: 'audio/mp4',
  aac: 'audio/aac',
  ogg: 'audio/ogg',
  opus: 'audio/opus',
  flac: 'audio/flac',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp',
  pdf: 'application/pdf',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  doc: 'application/msword',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  ppt: 'application/vnd.ms-powerpoint',
  txt: 'text/plain',
  html: 'text/html',
  htm: 'text/html',
};

/** The real type of a file, read from its (cleaned) extension. */
export function mimeFromExtension(name: string): string | null {
  const ext = name.trim().split('.').pop()?.toLowerCase() ?? '';
  return MIME_BY_EXT[ext] ?? null;
}

/** Categorizes by Google's mimeType (and, for project files, the name) —
 *  the supported-type list: MP4/MOV, MP3/WAV, PDF/DOC(X)/PPT(X), images,
 *  native Google Docs/Slides/Sheets, and downloadable project files. */
export function categorize(
  rawMimeType: string,
  rawName = '',
): DriveFileCategory {
  const name = cleanDriveFileName(rawName);
  // Drive types an upload by its name, so junk after the extension
  // ("….mp4 |site.app|") often leaves a real video as a generic binary.
  // Trust the cleaned extension when Drive's own type says nothing.
  const mimeType = GENERIC_MIME.has(rawMimeType)
    ? (mimeFromExtension(name) ?? rawMimeType)
    : rawMimeType;
  if (mimeType === 'application/vnd.google-apps.folder') return 'folder';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.startsWith('image/')) return 'image';
  // Saved web pages are lesson text: a reading lesson in a docs-only
  // section, otherwise a download like any other handout.
  if (mimeType === 'text/html' || /\.html?$/i.test(name)) return 'document';
  if (
    mimeType === 'application/pdf' ||
    mimeType === 'application/msword' ||
    mimeType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType === 'application/vnd.google-apps.document' ||
    (mimeType === 'text/plain' &&
      !/\.(py|js|ts|sql|sh|json|csv|md)$/i.test(name))
  ) {
    return 'document';
  }
  if (
    mimeType === 'application/vnd.ms-powerpoint' ||
    mimeType ===
      'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
    mimeType === 'application/vnd.google-apps.presentation'
  ) {
    return 'presentation';
  }
  if (
    mimeType === 'application/vnd.google-apps.spreadsheet' ||
    PROJECT_FILE_MIME.test(mimeType) ||
    PROJECT_FILE_EXT.test(name.trim())
  ) {
    return 'file';
  }
  return 'other';
}
