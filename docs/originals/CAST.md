# Teyro Originals — Cast Sheet

> The people in every Original's Story lessons (docs/ORIGINALS_PLAYBOOK.md §8).
> **Status: v1.0 (2026-10-13). Decided: the founder delegated the cast choices; any line can still be changed before it appears in a published lesson.**

One shared cast appears across **every** Original, so learners get attached to them and see the same faces in the app and in Teyro's social videos. Tey narrates and comments; the cast is who the story happens *to*.

## Rules

1. **Stay consistent.** A character's name, look, home, job, and way of speaking never change between lessons or courses.
2. **Lives move forward, never backwards.** Ada can get promoted in a later course; she can't suddenly be a student again.
3. **Mistakes belong to the cast, never the learner.** Characters get things wrong so the learner can spot it and fix it. Tey teases the situation, never the person.
4. **Everyone is competent at something.** No character exists only to be the bad example.
5. **Real, global, specific.** Real cities, real jobs, real money in local currency. No stereotypes, no accents written phonetically.
6. **Not Tey.** Tey is the teacher and the logo; Tey is never a character in someone else's story.

---

## Tey — the teacher

| | |
|---|---|
| Role | Teaches every Original. Narrates stories ("Watch what happens when Ada hits send..."). |
| Voice | `backend/src/tey/ai/tey-personality.ts`, tuned for teaching (playbook §8): clear while explaining, playful at the edges, never mocks a mistake. |

## Ada

| | |
|---|---|
| Look (fixed) | Curly puff hair, yellow sunshine headband, violet hoodie with a yellow `</>` badge, gold hoop earrings. Drawn in `video-studio/src/host/Ada.tsx`. |
| Age | 24 |
| Home | Lagos, Nigeria |
| Job | just started her first job as a junior product designer at a fintech startup; teaching herself Python and AI tools on the side |
| Personality | quick, funny, ambitious, says yes to everything and then panics a little. Writes long messages when nervous. |
| Best for | Clear Writing at Work, AI at Work, Speak Like a CEO, Python for Beginners |
| Note | Teyro's `/teach` pages use "Ada Okafor" as a sample creator name. Don't put those sample cards next to cast-Ada. |

## Remi

| | |
|---|---|
| Look (fixed) | Coral beanie with a pompom, thick round glasses, Teyro-blue bomber over a white `</>` tee, charcoal cargos, white high-tops, a tablet in one hand. Drawn in `video-studio/src/motion/kit/Host.tsx`. |
| Age | 21 |
| Home | Nairobi, Kenya |
| Job | final-year computer science student, applying for his first internships |
| Personality | curious, calm, a little too relaxed about deadlines; brilliant at understanding things, less good at explaining them to others. |
| Best for | AI for Students, Acing Job Interviews, Python for Beginners |

## The rest of the cast

Four more, so every Original has someone who fits. Each needs a look drawn before it appears in a lesson with art; until then they appear in text-only Story lessons.

| Working name | Home | Life stage | Best for |
|---|---|---|---|
| Lucía | Mexico City, Mexico | Mid-career marketer, newly promoted to lead a small team | Speak Like a CEO, AI at Work, Clear Writing at Work |
| Arjun | Bengaluru, India | Freelance developer juggling international clients | Clear Writing at Work, Acing Job Interviews, Python |
| Grace | Manchester, UK | Career-changer in her 40s, moving from nursing into tech | Acing Job Interviews, AI at Work |
| Kofi | Accra, Ghana | Secondary-school student preparing for university | AI for Students |

## Decisions

- **Art style:** new characters are drawn in Ada's style (bold sticker look with a white outline), so the whole cast reads as one family in lessons and on social. Remi keeps his motion-explainer look there.
- **Who appears where:** each Original picks a lead and one or two supporting characters from the "Best for" column; the lead stays the same for the whole Track.
- **One fixed relationship per pair.** Once two characters meet, how they know each other never changes across Originals.
- **Pilot (AI at Work):** Ada leads. Lucía supports as the marketing lead at a client company Ada's startup works with (so Ada has someone to write to, present to, and impress). Grace may appear as a newer colleague Ada helps with AI tools in later units.
