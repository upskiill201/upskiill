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

/** Categorizes by Google's mimeType (and, for project files, the name) —
 *  the supported-type list: MP4/MOV, MP3/WAV, PDF/DOC(X)/PPT(X), images,
 *  native Google Docs/Slides/Sheets, and downloadable project files. */
export function categorize(mimeType: string, name = ''): DriveFileCategory {
  if (mimeType === 'application/vnd.google-apps.folder') return 'folder';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.startsWith('image/')) return 'image';
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
