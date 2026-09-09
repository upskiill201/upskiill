# Media Storage Migration: AWS S3/CloudFront → Cloudflare R2

**Date:** 2026-09-08 to 2026-09-09
**Status:** Code + infra changes complete, pending a live upload test and Vercel redeploy confirmation.

---

## Why this happened

- The original AWS account (S3 + CloudFront) was suspended and could not be verified/recovered. All previously uploaded media (lesson videos, resources, avatars, thumbnails, community post images) was lost — tracked separately in memory `teyro-aws-s3-audit`.
- A new AWS account was created (`Teyro Production`, account ID `448571506732`) with a new bucket `teyro-production` (bucket name `teyro-course-videos` was already taken).
- After completing IAM user + S3 bucket + CORS setup, **CloudFront access was blocked** with: *"Your account must be verified before you can add new CloudFront resources."* AWS Support confirmed this is a routine new-account restriction — CloudFront stays blocked for roughly 1–2 months of billing history before it can be requested again.
- Rather than wait 1–2 months, decided to switch storage/CDN entirely to **Cloudflare R2** (S3-compatible API, zero egress fees, no account-age gating, built-in public CDN).
- The AWS account is not deleted — the `teyro-production` S3 bucket, IAM user, and $100/179-day promotional credit still exist and could be revisited later (e.g. once CloudFront unblocks, or to compare costs at scale), but the app no longer uses it.

---

## What changed in code

All AWS upload logic lives in the **frontend** (Next.js API routes) — the NestJS backend has zero AWS/storage code, confirmed unaffected by this migration.

### 1. [`frontend/lib/uploadS3Server.ts`](frontend/lib/uploadS3Server.ts)
Shared `getS3Client()` helper now detects a new `R2_ACCOUNT_ID` env var. When present, it points the AWS SDK's `S3Client` at Cloudflare's S3-compatible endpoint (`https://<account_id>.r2.cloudflarestorage.com`) with `region: 'auto'` and `forcePathStyle: true`, instead of AWS's endpoint. When `R2_ACCOUNT_ID` is absent, it falls back to normal AWS S3 behavior (untouched).

### 2. [`frontend/app/api/upload/avatar/route.ts`](frontend/app/api/upload/avatar/route.ts) and [`frontend/app/api/upload/thumbnail/route.ts`](frontend/app/api/upload/thumbnail/route.ts)
These two routes each instantiate their own `S3Client` (pre-existing duplication, not introduced by this change) instead of using the shared helper. Applied the identical R2-detection patch to both so avatars and thumbnails route to R2 too.

### 3. [`frontend/app/api/upload/presign/route.ts`](frontend/app/api/upload/presign/route.ts), [`multipart/route.ts`](frontend/app/api/upload/multipart/route.ts), [`community/route.ts`](frontend/app/api/upload/community/route.ts)
No changes needed — these already call the shared `getS3Client()`/`cloudFrontUrlFor()` helpers from `uploadS3Server.ts`, so they picked up R2 support automatically.

### 4. [`frontend/next.config.ts`](frontend/next.config.ts)
Swapped the `remotePatterns` entry for the old CloudFront hostname (`dhnydb8s9j6i4.cloudfront.net`) for the new R2 public dev hostname (`pub-d1eea6d3cd36417ea274a8c49e11c316.r2.dev`), so `next/image` will render images served from R2.

**Design decision:** kept the existing env var *names* (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_S3_BUCKET`, `CLOUDFRONT_URL`) rather than renaming everything to `R2_*` — they now simply hold Cloudflare values. This kept the code diff to just the client-construction logic in 3 files instead of touching every route that references `process.env.AWS_S3_BUCKET`. The only *new* env var is `R2_ACCOUNT_ID`, which acts as the switch between AWS mode and R2 mode.

---

## Cloudflare R2 resources created

| Resource | Value |
|---|---|
| Cloudflare account | `Upskiill201@gmail.c...` |
| R2 Account ID | `24367eccb11824c79e19f2d757dc5d16` |
| Bucket name | `teyro-production` |
| Bucket location | Western Europe (WEUR), Automatic |
| Public access | Enabled via "Public Development URL" |
| Public URL | `https://pub-d1eea6d3cd36417ea274a8c49e11c316.r2.dev` |
| CORS policy | Set — allows PUT/GET/HEAD from `localhost:3000`, `teyro.app`, staging Vercel URL; exposes `ETag` header (required for multipart video uploads) |
| API token | Account API Token, name `teyro-app-uploader`, permission **Object Read & Write**, scoped to `teyro-production` bucket only, TTL Forever |

**What's stored where in the bucket** (unchanged key structure from the old S3 setup):
- `avatars/` — profile avatars
- `community/<userId>/…` — community post images
- `thumbnails/` — course thumbnails
- `lessons/<lessonId>/{videos|audio|resources}/…` — lesson media

---

## Env vars set

### Vercel (frontend project) — done, per user confirmation
- `AWS_ACCESS_KEY_ID` = R2 token access key
- `AWS_SECRET_ACCESS_KEY` = R2 token secret
- `R2_ACCOUNT_ID` = `24367eccb11824c79e19f2d757dc5d16`
- `AWS_S3_BUCKET` = `teyro-production`
- `CLOUDFRONT_URL` = `https://pub-d1eea6d3cd36417ea274a8c49e11c316.r2.dev`
- `AWS_REGION` intentionally **not** set (R2 mode hardcodes `region: 'auto'`)

### `frontend/.env.local` — done
Same 5 values written locally, replacing the old AWS block. Not committed to git.

### Render (backend) — not needed
Confirmed the NestJS backend has no AWS/storage code; nothing to change there.

---

## Not yet done / next steps

1. **Restart local dev server** (`next dev` needs a restart to pick up the new `.env.local` values) and/or confirm the Vercel redeploy after adding env vars finished.
2. **Live test:** upload a real avatar/thumbnail/video through the app and confirm it lands in the R2 bucket and the returned public URL loads in a browser.
3. **Deactivate the old AWS IAM access key** (`AKIA33LFOZH7I3IFZLNY`, user `teyro-app-uploader` in the AWS account) — no longer used, sitting idle is unnecessary exposure. Not urgent, do after step 2 confirms R2 works end-to-end.
4. **Pre-launch checklist item:** move off the `pub-xxxx.r2.dev` "Public Development URL" (meant for testing, has looser rate limits) onto a **Custom Domain** (e.g. `cdn.teyro.app`) for production-grade caching with no rate-limit ceiling. Confirmed `teyro.app` DNS is managed via Vercel nameservers (`ns1/ns2.vercel-dns.com`), so this would be: add custom domain in Cloudflare R2 bucket settings → get a CNAME target → add that CNAME in Vercel's Domains settings for `teyro.app`.
5. **Decide fate of old AWS resources** (`teyro-production` S3 bucket + IAM user in AWS account `448571506732`, plus the unused $100/179-day promo credit) — leave dormant, delete, or revisit once/if CloudFront unblocks in ~1–2 months for a cost comparison at scale.
6. **DB URL cleanup (pre-existing, unrelated to this migration but relevant):** the database stores absolute media URLs (`users.avatarUrl`, `courses.thumbnailUrl`, lesson block JSON, community post URLs). Any URLs stored under the *old* dead CloudFront domain (`dhnydb8s9j6i4.cloudfront.net`) are now broken regardless of which storage provider is used going forward — per the earlier AWS audit, that old media was already presumed lost, so this is mostly a non-issue, but worth a sanity check before launch.

---

## Related memory
- `teyro-aws-s3-audit` — full pre-migration map of AWS S3/CloudFront usage (now superseded by this doc for the storage-provider decision, but still accurate for upload-flow architecture: presign vs multipart, key shapes, client hooks).
