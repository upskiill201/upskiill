#!/usr/bin/env bash
# Drives the remaining end-to-end stages for an import as soon as the
# database is reachable, so an external outage does not cost the whole run.
#
# Each stage is polled from the database rather than assumed, and every step
# is idempotent: re-running this after an interruption is safe.
set -uo pipefail

IMPORT_ID="${1:?usage: e2e-supervisor.sh <importId> <courseTitle>}"
TITLE="${2:-Hayden Hillier Video Editing Course (retest)}"
CATEGORY="${3:-Video Editing}"
cd "$(dirname "$0")/.." || exit 1

q() { # run a prisma query, print result or BLIP
  node -e "$1" 2>/dev/null | tail -1
}

wait_for_db() {
  while true; do
    if node -e "
const { PrismaClient } = require('@prisma/client');
new PrismaClient().\$queryRaw\`SELECT 1\`.then(()=>process.exit(0)).catch(()=>process.exit(1));
" 2>/dev/null; then return 0; fi
    echo "  [supervisor] db unreachable, waiting 30s..."
    sleep 30
  done
}

echo "[supervisor] waiting for database..."
wait_for_db
echo "[supervisor] database reachable."

# ── Stage 1: uploads ───────────────────────────────────────────────────────
echo "[supervisor] waiting for uploads to settle..."
for _ in $(seq 1 240); do
  R=$(q "
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.courseImportFile.findMany({where:{importId:'$IMPORT_ID'},select:{status:true}})
.then(r=>{const n=r.filter(x=>x.status==='PENDING'||x.status==='CLAIMED').length;console.log(n===0?'DONE':'WAIT:'+n);process.exit(0)}).catch(()=>{console.log('BLIP');process.exit(0)});
")
  [ "$R" = "DONE" ] && { echo "[supervisor] uploads settled."; break; }
  echo "  uploads: $R"
  sleep 30
done

# ── Stage 2: transcription ─────────────────────────────────────────────────
echo "[supervisor] waiting for transcription to settle..."
for _ in $(seq 1 240); do
  R=$(q "
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.courseImportFile.findMany({where:{importId:'$IMPORT_ID',category:'video'},select:{transcriptStatus:true}})
.then(r=>{const n=r.filter(x=>x.transcriptStatus==='PENDING'||x.transcriptStatus==='CLAIMED').length;console.log(n===0?'DONE':'WAIT:'+n);process.exit(0)}).catch(()=>{console.log('BLIP');process.exit(0)});
")
  [ "$R" = "DONE" ] && { echo "[supervisor] transcription settled."; break; }
  echo "  transcripts: $R"
  sleep 30
done

# ── Stage 3: analyze (idempotent — skipped if modules already exist) ───────
HAS_MODULES=$(q "
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.courseImportModule.count({where:{importId:'$IMPORT_ID'}}).then(n=>{console.log(n>0?'YES':'NO');process.exit(0)}).catch(()=>{console.log('BLIP');process.exit(0)});
")
if [ "$HAS_MODULES" = "NO" ]; then
  echo "[supervisor] analyzing course structure..."
  NODE_OPTIONS="--max-old-space-size=4096" npx ts-node -T scripts/e2e-drive-import.ts "$IMPORT_ID" analyze 2>&1 | grep -E "ANALYZE|FAILED|title|lessons" | head -30
else
  echo "[supervisor] structure already analyzed, skipping."
fi

# ── Stage 4: lesson generation ─────────────────────────────────────────────
echo "[supervisor] waiting for lesson generation to settle..."
for _ in $(seq 1 240); do
  R=$(q "
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
p.courseImportLesson.findMany({where:{module:{importId:'$IMPORT_ID'}},select:{status:true}})
.then(r=>{const n=r.filter(x=>x.status==='PENDING'||x.status==='CLAIMED').length;console.log(r.length===0?'NONE':(n===0?'DONE':'WAIT:'+n));process.exit(0)}).catch(()=>{console.log('BLIP');process.exit(0)});
")
  [ "$R" = "DONE" ] && { echo "[supervisor] generation settled."; break; }
  echo "  lessons: $R"
  sleep 30
done

# ── Stage 5: build the course (idempotent — appends if already created) ────
echo "[supervisor] creating/extending the course..."
NODE_OPTIONS="--max-old-space-size=4096" npx ts-node -T scripts/e2e-drive-import.ts \
  "$IMPORT_ID" create-course "$TITLE" "$CATEGORY" 2>&1 \
  | grep -E "CREATED COURSE|APPENDED|FAILED|courseId|sectionId|title" | head -40

echo "[supervisor] done."
