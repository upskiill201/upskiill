# Teyro Originals: course files

Every Teyro Original is written here, as TypeScript, then checked and loaded by one script. The rules every lesson follows are in [`docs/ORIGINALS_PLAYBOOK.md`](../../docs/ORIGINALS_PLAYBOOK.md); the story characters are in [`docs/originals/CAST.md`](../../docs/originals/CAST.md).

## Layout

```
originals/
  index.ts                 the Tracks the loader knows about
  tracks/
    ai-at-work.ts          a Track: its levels (one course each) and units
    format-tour.ts         every format in one place (dev sample, never loaded)
```

A Track lists its levels; a level lists its units; a unit lists its lessons. The shapes (and what every field means) are in [`src/originals/originals-authoring.types.ts`](../src/originals/originals-authoring.types.ts). As a level grows, put each unit in its own file (e.g. `tracks/ai-at-work/beginner/u01.ts`) and import it into the Track.

## Keys never change

Every unit and lesson has a `key` (`u01`, `l07`). All database ids come from these keys, so editing a lesson and re-loading updates it in place and **keeps every learner's progress**. Renaming a key creates a new lesson and orphans the old one, so don't.

## Writing a lesson

- **Learn** formats: `text`, `reading`, `story`, `chat`, `steps`, `compare`, `explore`, `myth`, plus `callout`, `check`, `code`, `image`. Mix them; the checker warns when two lessons in a row teach the same way.
- **Apply** exercises: `mcq`, `chatReply`, `fillBlank`, `findBug` (code, or prose for "spot the problem"), `orderLines`, `matchPairs`, `tapBuild`, `typeAnswer`, `sortGroups`. Answers are written as indexes (`answer: 2`), never ids.
- Every 5th lesson is a `milestone: 'CHECKPOINT'`; a full unit's last one is `'UNIT_CHALLENGE'`.
- Put sources for every fact in `notes`. They're never loaded or shown.
- Tey's voice, no emoji, and the currency is always "Coins". The checker refuses emoji and "gems".

`format-tour.ts` is the reference: it uses every format and exercise type.

## Check, preview, load

From `backend/`:

```bash
npm run originals                       # check every Track; changes nothing
npm run originals -- --track ai-at-work # one Track
npm run originals -- --export           # + preview bundles for /dev/originals
npm run originals -- --write            # + load into the database as drafts
npm run originals -- --write --publish  # + make them visible to learners
```

- **Errors** block loading (a broken exercise, a missing Checkpoint, an emoji). **Warnings** are playbook targets not met yet (lesson length, exercise mix, unit size). They load, but the lesson isn't finished.
- **Preview:** after `--export`, run the frontend dev server and open `/dev/originals`. On a phone, use the dev server's LAN address. Lessons play in the real player; nothing is saved.
- **Loading** only ever upserts. It never deletes: anything in the database that the files no longer describe is listed, then left alone. It refuses to run with `NODE_ENV=production`. Your local `.env` points at the **staging** database.
- Courses are loaded as drafts (admins only) until `--publish`.
