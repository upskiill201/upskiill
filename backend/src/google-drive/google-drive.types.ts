export type DriveFileCategory =
  | 'folder'
  | 'video'
  | 'document'
  | 'presentation'
  | 'image'
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
  documents: number;
  presentations: number;
  images: number;
  /** Files Teyro doesn't know how to ingest yet (category === 'other'). */
  unsupported: DriveFile[];
  estimatedVideoDurationSeconds: number;
  /** How many videos have no Drive-reported duration (metadata missing). */
  videosMissingDuration: number;
}

/** Categorizes by Google's mimeType — the same supported-type list CLAUDE.md
 *  and the importer spec both call out (MP4/MOV, PDF/DOC(X)/PPT(X), images),
 *  plus native Google Docs/Slides/Sheets equivalents. */
export function categorize(mimeType: string): DriveFileCategory {
  if (mimeType === 'application/vnd.google-apps.folder') return 'folder';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('image/')) return 'image';
  if (
    mimeType === 'application/pdf' ||
    mimeType === 'application/msword' ||
    mimeType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType === 'application/vnd.google-apps.document' ||
    mimeType === 'text/plain'
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
  return 'other';
}
