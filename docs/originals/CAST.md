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
| Best for | Acing Job Interviews, Python for Beginners (Miracle mentors in Study Smarter with AI) |

## The rest of the cast

Four more, so every Original has someone who fits. Each needs a look drawn before it appears in a lesson with art; until then they appear in text-only Story lessons.

| Working name | Home | Life stage | Best for |
|---|---|---|---|
| Lucía | Mexico City, Mexico | Mid-career marketer, newly promoted to lead a small team | Speak Like a CEO, AI at Work, Clear Writing at Work |
| Arjun | Bengaluru, India | Freelance developer juggling international clients | Clear Writing at Work, Acing Job Interviews, Python |
| Grace | Manchester, UK | Career-changer, 44: 18 years a ward nurse, now a junior UX researcher at Kinwell, a Manchester health-tech company (The Art of Small Talk, lead). Warm, funny, blunt, brilliant under pressure; freezes in rooms full of strangers and slips into "Nurse Mode" ("And how are we feeling today?") when nervous. Son Jayden, 17. | The Art of Small Talk (lead), Acing Job Interviews |
| Kofi | Accra, Ghana | Final-year secondary-school student, 17, who wants to study Biomedical Engineering. Funny, competitive, a last-minute worker with big plans; makes beats on his phone and plays football. | Study Smarter with AI (lead) |

## Fixed relationships so far

- **Ada and Lucía:** Lucía is the marketing lead at a client company Ada's startup works with (AI at Work).
- **Ada and Arjun:** Arjun does freelance contract development for Ada's startup and mentors her as she learns Python (Python for Beginners). He is precise, opinionated about variable names, and writes code nobody else can read; Ada teaches him why readable code matters.
- **Ada and Remi:** friends since they met at a hackathon in Kigali. In Corporate Jargon, Ada (a year or two into her job in Lagos) is Remi's WhatsApp lifeline during his Synergix internship, answering in voice notes.
- **Remi's internship:** after graduating, Remi does a 12-week internship in the Strategy & Operations team at Synergix, Nairobi (Corporate Jargon). Acing Job Interviews should end with him landing it.
- **Grace and Ada:** they meet in the coffee queue at a Manchester tech conference where Ada is speaking (The Art of Small Talk, final chapter) and stay in touch as contacts. (Supersedes the earlier idea of Grace as Ada's colleague in AI at Work.)
- **Grace and Arjun:** Arjun does freelance development for Kinwell; Grace works with him on video calls (The Art of Small Talk).
- **Tey FM (How to Make People Listen to You):** a radio phone-in anthology set AFTER Study Smarter with AI. Clinton (18) and David (18) are now first-year university students in Buea (Computer Science and Medicine). Miracle (23) has graduated and is choosing between a bank job and a Lagos startup. Lucía has been promoted and leads a small team. Each calls Tey FM; callers do not meet each other except on air in the final Live Special.
- **Ada's office ajo:** Ada runs the rotating savings group at work. Members (Tunde and others) appear as names in her code, not as characters.

## Cameroon (added 2026-10-14, founder)

These three join the shared cast. They first appear in Study Smarter with AI and can return in any Original.

| Name | Age | Home | Life stage | Personality | Best for |
|---|---|---|---|---|---|
| **Miracle** | 22 | Buea, Cameroon | Final-year Software Engineering student at the University of Buea. She volunteers as an online mentor for final-year school students. | Warm, organised, very direct ("show me your notes first"). She made every study mistake once and keeps a list of them. Her own final-year project and job hunt run in the background. | Study Smarter with AI (mentor), Acing Job Interviews, Python for Beginners |
| **Clinton** | 17 | Bamenda, Cameroon | Final year of secondary school; wants to study Computer Science | Loud, funny, runs every group chat, and is brilliant at organising people. He is tempted by shortcuts, but he keeps his drafts, and that saves him. | Study Smarter with AI, Speak Like a CEO |
| **David** | 17 | Buea, Cameroon | Final year of secondary school; wants to study Medicine | Quiet and the best at Maths in the group. He explains numbers beautifully but freezes when he has to write an essay. | Study Smarter with AI, Clear Writing at Work |

**Fixed relationships:**
- Miracle mentors Kofi, Clinton and David as one online study group (weekly video call plus a group chat).
- Clinton and David go to the same school in Buea; Clinton moved there from Bamenda.
- Kofi meets Clinton and David through Miracle's group.

## Course-only characters

These appear in one Original only and don't join the shared cast.

| Name | Course | Who |
|---|---|---|
| Efua | Study Smarter with AI | Kofi's classmate in Accra. Top of the class, with famous handwritten notes; she doesn't trust AI. |
| Mrs Asante | Study Smarter with AI | Kofi's Chemistry teacher. Strict and fair, and gives surprise quizzes. |
| Brian Otieno | Corporate Jargon | Remi's manager at Synergix (Nairobi), Head of Strategy & Operations. Speaks almost entirely in jargon; kind, generous, brilliant at reading people. Was a confused Synergix intern himself 15 years ago and kept a notebook translating it all. |
| Zanele Dlamini | Corporate Jargon | The other Synergix intern, from Johannesburg. Uses jargon confidently and often wrongly; a genius with spreadsheets. Remi's rival, then his best friend at work. Grew up in Soweto; English is her third language (isiZulu, then Afrikaans), and she quietly rehearses important messages. |
| Mrs Achieng | Corporate Jargon | Executive assistant to the CEO for 25 years. Knows every unwritten rule. Plain-spoken and very dry. |
| Mr Kamau | Corporate Jargon | Synergix's CEO (first name Peter). The plainest speaker in the building. Started in the Synergix warehouse 22 years ago and didn't understand the jargon either. |
| Felix | Corporate Jargon | Synergix IT. Caused the Great Reply-All; fixes everything instantly without explaining how. |
| Pauline Wairimu | Corporate Jargon | Synergix marketing lead. Had Remi's idea first; they pitch it together. |
| Emeka | Corporate Jargon | Synergix logistics lead in the Lagos office; joins by video. Detailed, clever, generous; forgets he's on mute. |
| Wanjiku | Corporate Jargon | Synergix Finance. Calm, exact with numbers; owns the Swift Freight refund claim. |
| Jayden | The Art of Small Talk | Grace's son, 17, Manchester. Coaches his mum on "not being cringe"; usually wrong. |
| Priya | The Art of Small Talk | Grace's manager, head of UX at Kinwell. A brilliant introvert who finds small talk draining and does it her own quiet way. |
| Femi | The Art of Small Talk | Kinwell developer, Lagos-born and Manchester-raised. Talks to everyone; Grace's unofficial small-talk coach; overdoes it sometimes. |
| Diego | How to Make People Listen to You | Lucía's senior colleague in Mexico City. Experienced, funny, well liked, and interrupts constantly without noticing. Not a villain: he changes once Lucía holds the floor kindly and clearly. |
| Mr Rao | How to Make People Listen to You | Arjun's client, a busy online-shop founder in Pune who reads only the first line of every email. Named extra (narrated). |
| Marta | Leadership for Beginners (and the Leadership track) | Lucía's desk-mate and best work friend for six years at Nopal (Mexico City snack brand). Applied for the same promotion. Dependable, says yes to everything, quietly overloaded. |
| Sofía | Leadership track | Newest hire on Lucía's team at Nopal. Brilliant, quiet, rarely speaks first (also in How to Make People Listen to You, ch4). |
| Tomás | Leadership track | Junior marketer on Lucía's team. Eager, fast, makes mistakes fast and sometimes hides them. |
| Carmen | Leadership track | Nopal's marketing director, Lucía's boss. Direct, busy, fair; wants no surprises. |

## Decisions

- **Art style:** new characters are drawn in Ada's style (bold sticker look with a white outline), so the whole cast reads as one family in lessons and on social. Remi keeps his motion-explainer look there.
- **Who appears where:** each Original picks a lead and one or two supporting characters from the "Best for" column; the lead stays the same for the whole Track.
- **One fixed relationship per pair.** Once two characters meet, how they know each other never changes across Originals.
- **Pilot (AI at Work):** Ada leads. Lucía supports as the marketing lead at a client company Ada's startup works with (so Ada has someone to write to, present to, and impress). (Grace's life is now fixed by The Art of Small Talk: she works at Kinwell in Manchester and knows Ada as a contact.)
