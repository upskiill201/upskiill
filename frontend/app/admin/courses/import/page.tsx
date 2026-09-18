'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  File as FileIcon,
  FileText,
  Folder,
  Image as ImageIcon,
  Presentation,
  Video,
} from 'lucide-react';
import {
  Banner,
  Button,
  Card,
  Empty,
  ErrorState,
  Loading,
  Metric,
  PageHeader,
  Pill,
  adminMutate,
  useAdminData,
} from '@/components/admin/AdminUI';
import styles from './page.module.css';

interface ConnectionStatus {
  connected: boolean;
  email?: string;
  connectedAt?: string;
}

type DriveFileCategory = 'folder' | 'video' | 'document' | 'presentation' | 'image' | 'other';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  category: DriveFileCategory;
  sizeBytes?: number;
  durationMs?: number;
  modifiedTime?: string;
}

interface FolderPreview {
  folderId: string;
  folderName: string;
  totalFiles: number;
  videos: number;
  documents: number;
  presentations: number;
  images: number;
  unsupported: DriveFile[];
  estimatedVideoDurationSeconds: number;
  videosMissingDuration: number;
}

interface CourseImportSummary {
  id: string;
  sourceDriveFolderName: string;
  status: string;
  counts: { total: number; pending: number; claimed: number; uploaded: number; failed: number; skipped: number };
  createdAt: string;
}

const IMPORT_STATUS_TONE: Record<string, 'neutral' | 'good' | 'warn' | 'bad' | 'brand'> = {
  CREATED: 'brand',
  PROCESSING_FILES: 'brand',
  READY_FOR_GENERATION: 'brand',
  TRANSCRIBING: 'brand',
  GENERATING_CONTENT: 'brand',
  READY_FOR_REVIEW: 'good',
  COURSE_CREATED: 'good',
  FAILED: 'bad',
  CANCELLED: 'neutral',
};

interface Crumb {
  id: string;
  name: string;
}

const CATEGORY_ICON: Record<DriveFileCategory, typeof Folder> = {
  folder: Folder,
  video: Video,
  document: FileText,
  presentation: Presentation,
  image: ImageIcon,
  other: FileIcon,
};

function formatDuration(totalSeconds: number): string {
  if (totalSeconds <= 0) return '0m';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.round((totalSeconds % 3600) / 60);
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function formatBytes(bytes?: number): string {
  if (!bytes) return '—';
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function humanizeDriveError(code: string): string {
  switch (code) {
    case 'access_denied':
      return 'You declined the Google consent screen.';
    case 'missing_code_or_state':
    case 'invalid_state':
    case 'state_mismatch':
      return 'The connection request could not be verified. Please try again.';
    case 'state_expired':
      return 'That consent screen took too long — please try connecting again.';
    default:
      return code;
  }
}

export default function ImportCoursePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data: status,
    error: statusError,
    isLoading: statusLoading,
    mutate: refreshStatus,
  } = useAdminData<ConnectionStatus>('/api/admin/google-drive/status');

  const [breadcrumbs, setBreadcrumbs] = useState<Crumb[]>([{ id: 'root', name: 'My Drive' }]);
  const currentFolder = breadcrumbs[breadcrumbs.length - 1];
  const [analyzeFolderId, setAnalyzeFolderId] = useState<string | null>(null);
  const [disconnecting, setDisconnecting] = useState(false);
  const [startingImport, setStartingImport] = useState(false);
  const [startError, setStartError] = useState<string | null>(null);

  const { data: recentImports } = useAdminData<CourseImportSummary[]>('/api/admin/course-imports');

  const {
    data: children,
    error: childrenError,
    isLoading: childrenLoading,
  } = useAdminData<DriveFile[]>(
    status?.connected ? `/api/admin/google-drive/folders?parentId=${currentFolder.id}` : null,
  );

  const {
    data: preview,
    error: previewError,
    isLoading: previewLoading,
  } = useAdminData<FolderPreview>(
    analyzeFolderId ? `/api/admin/google-drive/folders/${analyzeFolderId}/preview` : null,
  );

  // A preview only ever describes the exact folder it was generated for —
  // clear it the moment the admin navigates anywhere else in the browser.
  useEffect(() => {
    setAnalyzeFolderId(null);
  }, [currentFolder.id]);

  // The OAuth callback redirects back here with a one-time status in the
  // query string. Consume it once, then strip it so a refresh doesn't
  // re-show a stale "connected" banner.
  const driveConnected = searchParams.get('driveConnected');
  const driveError = searchParams.get('driveError');
  useEffect(() => {
    if (!driveConnected && !driveError) return;
    void refreshStatus();
    const url = new URL(window.location.href);
    url.searchParams.delete('driveConnected');
    url.searchParams.delete('driveError');
    router.replace(url.pathname + url.search);
    // Only re-run when the redirect params themselves change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driveConnected, driveError]);

  const connect = () => {
    window.location.href = '/api/admin/google-drive/connect';
  };

  const disconnect = async () => {
    setDisconnecting(true);
    try {
      await adminMutate('/api/admin/google-drive/disconnect', { method: 'POST' });
      setBreadcrumbs([{ id: 'root', name: 'My Drive' }]);
      setAnalyzeFolderId(null);
      await refreshStatus();
    } finally {
      setDisconnecting(false);
    }
  };

  const openFolder = (folder: DriveFile) => {
    setBreadcrumbs((prev) => [...prev, { id: folder.id, name: folder.name }]);
  };

  const jumpTo = (index: number) => {
    setBreadcrumbs((prev) => prev.slice(0, index + 1));
  };

  const startImport = async () => {
    if (!preview) return;
    setStartingImport(true);
    setStartError(null);
    try {
      const created = await adminMutate<{ id: string }>('/api/admin/course-imports', {
        method: 'POST',
        body: { driveFolderId: preview.folderId },
      });
      router.push(`/admin/courses/import/${created.id}`);
    } catch (err) {
      setStartError((err as Error).message);
    } finally {
      setStartingImport(false);
    }
  };

  if (statusError) return <ErrorState error={statusError as Error} />;

  return (
    <>
      <PageHeader
        title="Import Course"
        subtitle="Bring a finished course in from Google Drive and turn it into a Teyro draft — reviewed and published the same way as anything built by hand."
      />

      {driveError && !status?.connected && (
        <Banner tone="warn">Google Drive connection failed: {humanizeDriveError(driveError)}</Banner>
      )}

      <Card title="1. Connect Google Drive">
        {statusLoading || !status ? (
          <Loading />
        ) : status.connected ? (
          <div className={styles.connectRow}>
            <Pill tone="good">Connected</Pill>
            <span>{status.email}</span>
            <Button variant="secondary" size="sm" onClick={() => void disconnect()} disabled={disconnecting}>
              {disconnecting ? 'Disconnecting…' : 'Disconnect'}
            </Button>
          </div>
        ) : (
          <div className={styles.connectRow}>
            <Pill tone="neutral">Not connected</Pill>
            <Button onClick={connect}>Connect Google Drive</Button>
          </div>
        )}
      </Card>

      {status?.connected && (
        <Card title="2. Select a course folder">
          <nav className={styles.breadcrumbs}>
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.id}>
                {index > 0 && <span className={styles.breadcrumbSeparator}>/</span>}
                {index === breadcrumbs.length - 1 ? (
                  <span className={styles.breadcrumbCurrent}>{crumb.name}</span>
                ) : (
                  <button type="button" onClick={() => jumpTo(index)} className={styles.breadcrumbLink}>
                    {crumb.name}
                  </button>
                )}
              </span>
            ))}
          </nav>

          {childrenError ? (
            <ErrorState error={childrenError as Error} />
          ) : childrenLoading || !children ? (
            <Loading />
          ) : children.length === 0 ? (
            <Empty>This folder is empty.</Empty>
          ) : (
            <ul className={styles.fileList}>
              {children.map((file) => {
                const Icon = CATEGORY_ICON[file.category];
                const isFolder = file.category === 'folder';
                return (
                  <li
                    key={file.id}
                    className={`${styles.fileRow} ${isFolder ? styles.fileRowFolder : ''}`}
                    onClick={isFolder ? () => openFolder(file) : undefined}
                  >
                    <Icon size={16} />
                    <span className={styles.fileName}>{file.name}</span>
                    {!isFolder && <span className={styles.fileSize}>{formatBytes(file.sizeBytes)}</span>}
                  </li>
                );
              })}
            </ul>
          )}

          <div>
            <Button
              onClick={() => setAnalyzeFolderId(currentFolder.id)}
              disabled={currentFolder.id === 'root' || previewLoading}
            >
              {previewLoading && analyzeFolderId === currentFolder.id
                ? 'Analyzing…'
                : `Use "${currentFolder.name}" as the course`}
            </Button>
            {currentFolder.id === 'root' && (
              <p className={styles.selectFolderHint}>
                Navigate into the course&apos;s own folder first — My Drive itself can&apos;t be imported.
              </p>
            )}
          </div>
        </Card>
      )}

      {previewError && <ErrorState error={previewError as Error} />}

      {preview && (
        <Card title="3. Course preview">
          <h3 className={styles.previewTitle}>{preview.folderName}</h3>
          <div className={styles.previewMetrics}>
            <Metric label="Total files" value={preview.totalFiles} />
            <Metric label="Videos" value={preview.videos} />
            <Metric label="Documents" value={preview.documents} />
            <Metric label="Presentations" value={preview.presentations} />
            <Metric label="Images" value={preview.images} />
            <Metric label="Est. video runtime" value={formatDuration(preview.estimatedVideoDurationSeconds)} />
          </div>

          {(preview.unsupported.length > 0 || preview.videosMissingDuration > 0) && (
            <div className={styles.warnings}>
              <h4>Warnings</h4>
              <ul>
                {preview.videosMissingDuration > 0 && (
                  <li>
                    {preview.videosMissingDuration} video{preview.videosMissingDuration === 1 ? '' : 's'} without a
                    Drive-reported duration — runtime estimate is incomplete.
                  </li>
                )}
                {preview.unsupported.length > 0 && (
                  <li>
                    {preview.unsupported.length} file{preview.unsupported.length === 1 ? '' : 's'} Teyro doesn&apos;t
                    know how to use yet: {preview.unsupported.map((f) => f.name).join(', ')}
                  </li>
                )}
              </ul>
            </div>
          )}

          <div className={styles.continueRow}>
            <Button onClick={() => void startImport()} disabled={startingImport}>
              {startingImport ? 'Starting…' : `Import "${preview.folderName}"`}
            </Button>
            <p className={styles.selectFolderHint}>
              This moves the videos and documents above into Teyro&apos;s storage, transcribes each video, and
              generates Learn/Apply/Reflect/Deepen content for every lesson — then you review it and create the
              course draft from the import&apos;s own page.
            </p>
            {startError && <Banner tone="warn">{startError}</Banner>}
          </div>
        </Card>
      )}

      {recentImports && recentImports.length > 0 && (
        <Card title="Recent imports">
          <ul className={styles.fileList}>
            {recentImports.map((imp) => (
              <li key={imp.id} className={styles.fileRow}>
                <span className={styles.fileName}>{imp.sourceDriveFolderName}</span>
                <Pill tone={IMPORT_STATUS_TONE[imp.status] ?? 'neutral'}>{imp.status}</Pill>
                <span className={styles.fileSize}>
                  {imp.counts.uploaded}/{imp.counts.total} uploaded
                </span>
                <Button variant="secondary" size="sm" onClick={() => router.push(`/admin/courses/import/${imp.id}`)}>
                  View
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
}
