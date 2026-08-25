'use client';

import React from 'react';
import {
  Image as ImageIcon, Paperclip, BarChart3, X, Plus, AtSign, BookOpen, Send,
} from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import type { CommunityOverview } from '@/lib/communityApi';
import { createPost, getMembers } from '@/lib/communityApi';
import shared from './community.module.css';
import styles from './PostComposer.module.css';

const LEARNER_TYPES = ['QUESTION', 'TIP', 'WIN', 'DISCUSSION', 'RESOURCE', 'POLL'] as const;
const MOD_TYPES = ['ANNOUNCEMENT', 'CHALLENGE'] as const;

interface MemberSuggestion {
  id: string;
  fullName: string;
  avatarUrl: string | null;
}

interface PostComposerProps {
  community: CommunityOverview;
  /** Pre-set lesson link (from "Discuss this lesson") */
  lessonLink?: { id: string; title: string } | null;
  /** Start expanded (e.g. deep-linked from the global feed's composer card). */
  defaultOpen?: boolean;
  onPosted?: () => void;
}

/** Simple direct-to-S3 upload via the community presign route. */
async function uploadCommunityFile(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<{ url: string; filename: string; mimeType: string; sizeBytes: number }> {
  const presign = await fetch('/api/upload/community', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename: file.name, contentType: file.type, size: file.size }),
  });
  if (!presign.ok) {
    const err = await presign.json().catch(() => ({}));
    throw new Error(err.error || `Upload failed (${presign.status})`);
  }
  const { uploadUrl, cloudFrontUrl } = await presign.json();

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl, true);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve({
            url: cloudFrontUrl,
            filename: file.name,
            mimeType: file.type,
            sizeBytes: file.size,
          })
        : reject(new Error(`Upload failed (${xhr.status})`));
    xhr.onerror = () => reject(new Error('Network error during upload.'));
    xhr.send(file);
  });
}

export default function PostComposer({ community, lessonLink, defaultOpen = false, onPosted }: PostComposerProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [postType, setPostType] = React.useState<string>('QUESTION');
  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const [images, setImages] = React.useState<string[]>([]);
  const [files, setFiles] = React.useState<Array<{ url: string; filename: string; mimeType?: string; sizeBytes?: number }>>([]);
  const [pollOptions, setPollOptions] = React.useState<string[]>(['', '']);
  const [lessonId, setLessonId] = React.useState<string | null>(lessonLink?.id ?? null);

  const [uploading, setUploading] = React.useState(false);
  const [uploadPct, setUploadPct] = React.useState(0);
  const [sending, setSending] = React.useState(false);
  // Ref, not state — two clicks inside one render frame both see stale
  // `sending === false` and double-post. The ref closes that race.
  const sendingRef = React.useRef(false);
  const [error, setError] = React.useState('');

  // Mention autocomplete
  const [mentionResults, setMentionResults] = React.useState<MemberSuggestion[]>([]);
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const mentionAnchorRef = React.useRef<number>(-1); // index of the '@'

  const types = [
    ...LEARNER_TYPES,
    ...(community.isModerator ? MOD_TYPES : []),
  ];

  const isPoll = postType === 'POLL';

  const reset = () => {
    setOpen(false);
    setTitle('');
    setBody('');
    setImages([]);
    setFiles([]);
    setPollOptions(['', '']);
    setError('');
  };

  // ── Mention detection while typing ──────────────────────────────────────
  const handleBodyChange = async (value: string) => {
    setBody(value);

    const cursor = textareaRef.current?.selectionStart ?? value.length;
    const atIdx = value.lastIndexOf('@', Math.max(0, cursor - 1));
    if (atIdx === -1 || /\s/.test(value.slice(atIdx + 1, cursor))) {
      if (mentionAnchorRef.current !== -1) {
        mentionAnchorRef.current = -1;
        setMentionResults([]);
      }
      return;
    }

    const q = value.slice(atIdx + 1, cursor);
    mentionAnchorRef.current = atIdx;
    if (q.length >= 1) {
      try {
        const res = await getMembers(community.id, q, 1);
        setMentionResults(res.members.slice(0, 6));
      } catch {
        setMentionResults([]);
      }
    } else {
      setMentionResults([]);
    }
  };

  const pickMention = (m: MemberSuggestion) => {
    const start = mentionAnchorRef.current;
    if (start >= 0) {
      const before = body.slice(0, start);
      const after = body.slice((textareaRef.current?.selectionStart ?? body.length));
      const token = `[${m.fullName}](mention:${m.id}) `;
      setBody(before + token + after);
    }
    setMentionResults([]);
    mentionAnchorRef.current = -1;
    textareaRef.current?.focus();
  };

  // ── Uploads ───────────────────────────────────────────────────────────────
  const handleImagePick = async (fileList: FileList | null) => {
    if (!fileList?.length) return;
    setError('');
    setUploading(true);
    setUploadPct(0);
    try {
      for (const file of Array.from(fileList).slice(0, 8 - images.length)) {
        const res = await uploadCommunityFile(file, setUploadPct);
        setImages((prev) => [...prev, res.url]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  const handleFilePick = async (fileList: FileList | null) => {
    if (!fileList?.length) return;
    setError('');
    setUploading(true);
    setUploadPct(0);
    try {
      for (const file of Array.from(fileList).slice(0, 5 - files.length)) {
        const res = await uploadCommunityFile(file, setUploadPct);
        setFiles((prev) => [...prev, res]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const canSubmit =
    body.trim().length > 0 &&
    !uploading &&
    !sending &&
    (!isPoll || pollOptions.filter((o) => o.trim()).length >= 2);

  const handleSubmit = async () => {
    if (sendingRef.current || !canSubmit) return;
    sendingRef.current = true;
    setSending(true);
    setError('');
    try {
      await createPost(community.id, {
        postType,
        title: title.trim() || undefined,
        contentText: body.trim(),
        images: images.length ? images : undefined,
        attachments: files.length ? files : undefined,
        pollOptions: isPoll
          ? pollOptions.filter((o) => o.trim()).map((text) => ({ text: text.trim() }))
          : undefined,
        lessonId: lessonId ?? undefined,
      });
      reset();
      onPosted?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not publish your post.');
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };

  return (
    <div className={styles.wrap}>
      {!open ? (
        <div className={styles.topRow}>
          <Avatar size="md" name="You" />
          <button className={styles.triggerBtn} onClick={() => setOpen(true)}>
            Share a question, win or tip with your community…
          </button>
        </div>
      ) : (
        <div className={styles.openArea}>
          {/* Type chips */}
          <div className={styles.typeRow}>
            {types.map((t) => (
              <button
                key={t}
                className={`${styles.typeChip} ${postType === t ? styles.chipActive : ''}`}
                onClick={() => setPostType(t)}
                disabled={community.isModerator ? false : t === 'ANNOUNCEMENT' || t === 'CHALLENGE'}
              >
                {t.toLowerCase()}
              </button>
            ))}
          </div>

          {/* Lesson link banner */}
          {lessonLink && lessonId && (
            <div className={styles.lessonBanner}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <BookOpen size={14} /> Linked to lesson: {lessonLink.title}
              </span>
              <button className={styles.unlinkBtn} onClick={() => setLessonId(null)}>
                unlink
              </button>
            </div>
          )}

          {/* Title */}
          <input
            className={styles.titleInput}
            placeholder="Add a headline (optional)"
            maxLength={150}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Body + mentions */}
          <div className={styles.mentionWrap}>
            <textarea
              ref={textareaRef}
              className={styles.textarea}
              placeholder={
                postType === 'QUESTION'
                  ? 'What would you like to ask the community?'
                  : postType === 'WIN'
                    ? 'Share your win — what happened and how?'
                    : 'Write your post… use @ to mention someone'
              }
              value={body}
              onChange={(e) => handleBodyChange(e.target.value)}
              maxLength={8000}
            />
            {mentionResults.length > 0 && (
              <div className={styles.mentionMenu}>
                {mentionResults.map((m) => (
                  <button key={m.id} className={styles.mentionItem} onClick={() => pickMention(m)}>
                    <AtSign size={13} /> {m.fullName}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Poll editor */}
          {isPoll && (
            <div className={styles.pollEditor}>
              {pollOptions.map((opt, i) => (
                <div key={i} className={styles.pollRow}>
                  <input
                    className={styles.pollInput}
                    placeholder={`Option ${i + 1}`}
                    maxLength={200}
                    value={opt}
                    onChange={(e) =>
                      setPollOptions((prev) => prev.map((o, j) => (j === i ? e.target.value : o)))
                    }
                  />
                  {pollOptions.length > 2 && (
                    <button
                      className={styles.iconGhostBtn}
                      aria-label="Remove option"
                      onClick={() => setPollOptions((prev) => prev.filter((_, j) => j !== i))}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
              {pollOptions.length < 8 && (
                <button
                  className={styles.iconGhostBtn}
                  style={{ width: '100%', height: 36 }}
                  onClick={() => setPollOptions((prev) => [...prev, ''])}
                >
                  <Plus size={14} /> Add option
                </button>
              )}
            </div>
          )}

          {/* Image previews */}
          {images.length > 0 && (
            <div className={styles.previewGrid}>
              {images.map((src) => (
                <div key={src} className={styles.previewCell}>
                  <img src={src} alt="" />
                  <button
                    className={styles.removeBtn}
                    aria-label="Remove image"
                    onClick={() => setImages((prev) => prev.filter((u) => u !== src))}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* File chips */}
          {files.length > 0 && (
            <div className={styles.fileChips}>
              {files.map((f, i) => (
                <div key={f.url} className={styles.fileChip}>
                  <Paperclip size={13} />
                  <span>{f.filename}</span>
                  <button
                    aria-label="Remove file"
                    onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {uploading && (
            <div className={styles.uploadProgress}>
              <div className={styles.uploadProgressBar} style={{ width: `${uploadPct}%` }} />
            </div>
          )}

          {/* Toolbar */}
          <div className={styles.toolbar}>
            <label style={{ display: 'inline-flex' }}>
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                disabled={uploading || images.length >= 8}
                onChange={(e) => void handleImagePick(e.target.files)}
              />
              <span className={styles.toolBtn}>
                <ImageIcon size={15} /> Images
              </span>
            </label>
            <label style={{ display: 'inline-flex' }}>
              <input
                type="file"
                accept=".pdf,.zip,.txt,.csv"
                multiple
                hidden
                disabled={uploading || files.length >= 5}
                onChange={(e) => void handleFilePick(e.target.files)}
              />
              <span className={styles.toolBtn}>
                <Paperclip size={15} /> Files
              </span>
            </label>
            <button
              className={`${styles.toolBtn} ${isPoll ? styles.chipActive : ''}`}
              onClick={() => setPostType(isPoll ? 'QUESTION' : 'POLL')}
            >
              <BarChart3 size={15} /> Poll
            </button>
          </div>

          {/* Footer */}
          <div className={styles.footerRow}>
            {error && <span className={styles.errorText}>{error}</span>}
            {!error && !uploading && <span className={styles.xpHint}>+15 XP for your first posts each day</span>}
            <Button variant="ghost" onClick={reset} disabled={sending}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={!canSubmit} loading={sending} leftIcon={<Send size={15} />}>
              Post
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
