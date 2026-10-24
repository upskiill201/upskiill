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
| Arjun | Bengaluru, India | Freelance developer juggling international clients | Clear Writing at Work, Acing Job Interviews, Python, The AI Stack (team lead) |
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
- **Remi's job (Leadership track):** Synergix offers Remi a job at the end of his internship; as a junior analyst he leads the refund fix across five teams (How to Lead Without Being the Boss), and is then asked to lead the delivery-times project.
- **Arjun's first team (How to Set Clear Expectations):** Arjun takes on two junior subcontractors, Kavya (Pune) and Joel (Kochi), to build Mr Rao's online shop before the Diwali sale. Mr Rao is the same client who reads only the first line of every email (How to Make People Listen to You).
- **Ask Rao (The AI Stack):** after the Diwali sale, Mr Rao sends one line, "Add AI. Like ChatGPT. For my shop. How much?" Arjun gives the job to Kavya and Joel, who build Ask Rao, a shop assistant, one layer of the AI stack per chapter. Mr Rao stays narrated and reads only first lines.
- **Clinton's Big Idea (Business set: How to Validate a Business Idea, then pricing, then profit and cash flow):** in his first year at the University of Buea, Clinton tries to start CampusEats (food delivery). Customer conversations reveal the real problem, laundry in the rainy season, and he tests WashDay, a laundry pickup service, by hand. David (Medicine, Buea) is his sceptical numbers friend; Miracle mentors by voice note from Lagos, having just joined Afiya. Mama Rose, who runs the wash-and-iron stand at the campus gate, is narrated only. In the pricing course her sister, Auntie Bih (narrated), becomes the second washer at 1,100 FCFA a bag.
- **Miracle in Lagos (How to Motivate a Team):** Miracle chose the Lagos health-tech startup, Afiya. Eighteen months later she is asked to lead Afiya's Clinic Success team (Bisi, Chidi, Halima, Emmanuel) before 300 clinics go live; her boss is Folake, the COO.
- **Halima's Empty Chairs (Machine Learning for Beginners):** after the 300-clinic rollout, and with Chidi staying, Folake wants "AI to fix no-shows" (about 1 in 5 bookings). Halima builds the predictor on 12 weeks of bookings from 8 pilot clinics, including Gumel, a small rural clinic. Miracle mentors her; Chidi is the sceptic; Emmanuel owns the booking export; Bisi makes the reminder calls.
- **Ada Asks (Negotiation Skills for Beginners):** Ada says yes to everything; over five weeks she negotiates a bakery logo (₦120,000), her rent (₦1,350,000 for two years) and her salary review (₦420,000 now, ₦480,000 in writing). Lucía mentors her; Remi is her WhatsApp friend.
- **Arjun's Big Contract (How to Handle Difficult Negotiations):** Arjun, Kavya and Joel quote £48,000 for Harlow & Finch's loyalty app; procurement counters £28,000. Arjun's BATNA is a Kinwell extension (Priya). Signed at £42,000 with launch support. Grace is his sounding board.
- **Grace Keeps the Peace (How to Manage Conflict at Work):** Kinwell's GP booking app launches 21 November. Femi snaps at Grace over step 3 research; "Fine." starts a cold war; Callum (new PM) calls her report "just opinions"; Priya overloads her; Jayden takes the car. Grace's "ward rules for the office" grow to v5.
- **Personal Finance track (added 2026-10-22):** seven short money courses. **The Kofi trilogy** (Budgeting for Beginners, How to Save Money on a Low Income, How to Stop Impulse Buying): Kofi is now in his first year at KNUST, Kumasi, on GH₵1,500 a month from his mum; Yaw is his roommate, Efua (now also at KNUST) his steady friend, Miracle sends voice notes from Lagos. He finds his money gone by day 12, saves GH₵2,850 for a laptop paid in cash, and beats the 2 a.m. cart. **Ada's Raise** (Needs vs. Wants): after Negotiation Skills, Ada saves less on ₦480,000 than before the raise, then funds ₦900,000 for Lucía's Mexico City conference. **Miracle's Long Game** (Money Habits That Build Long-Term Wealth): her dad, a Maths teacher in Buea, retires at 60 with little saved; Folake turns out to be a quiet long-term saver; Miracle turns down a ₦1.5m bank offer, stays at Afiya on ₦1,250,000, and builds a 40-year map. **Arjun's Windfall** (How to Understand Investment Risk): the Harlow & Finch money leaves Arjun ₹12 lakh; cousin Vikram (options), his uncle (a disputed plot near Mysuru), a "3% a month" WhatsApp scheme and Kavya's crypto; Appa's knee operation; Joel's aunt loses ₹3 lakh to the scheme. **Grace and the Scam Files** (How Scams and Financial Fraud Work): a "Hi Mum" text, Femi's crypto "mentor", a spoofed bank call, a hacked supplier email at Kinwell, Jayden's money-mule DM, Femi's aunt Bimpe's fake credit alert in Lagos; Grace's scam file becomes Kinwell's handout. Family safe word agreed with Jayden and Nan.

## The Esplanade Brass (added 2026-10-24)

They lead **Vibe Coding: Build Apps with AI** ("Second Line", docs/originals/vibe-coding-outline.md): New Orleans, USA, US dollars. Hazel, Benny and Ruth are castIds `hazel`, `benny`, `ruth`.

| Name | Age | Home | Life stage | Personality |
|---|---|---|---|---|
| **Hazel Broussard** | 29 | New Orleans, USA (grew up in Gentilly) | Band director and music teacher at Esplanade High School; plays trumpet; teaches private lessons on weekends. Has never written code. | Big-hearted, fast-talking, says "y'all", wants everything done yesterday. Asks for too much at once, then learns to ask for one thing well. Brave about trying; honest about what she doesn't know. |
| **Benny Castillo** | 16 | New Orleans, USA | Trumpet, band captain, junior at Esplanade High | Fearless, funny, always on his phone, "just ship it". Finds every bug by accident. Learns that "it works on my phone" isn't a test. |
| **Ruth Kessler** | 66 | New Orleans, USA (Mid-City) | Booster club treasurer; retired software engineer (32 years, mostly bank systems); her grandson Marcus plays sousaphone | Dry, precise, kind under the frown. "Show me." Distrusts AI at first, then distrusts it only when it's unchecked. The reviewer who signs off launch. |

**Fixed relationships:**
- **Hazel and Benny:** his band director for three years; he calls her "Miss B".
- **Hazel and Ruth:** Ruth runs the booster club's money; she reviews every change to the band's app before it goes live.
- Narrated: Principal Dupree (Esplanade High), Mr Lionel (Crescent Coach Lines, the bus), Marcus (Ruth's grandson), band parents. Target: $18,000 for the National Brass Showcase in Washington, D.C.

## Cameroon (added 2026-10-14, founder)

These three join the shared cast. They first appear in Study Smarter with AI and can return in any Original.

| Name | Age | Home | Life stage | Personality | Best for |
|---|---|---|---|---|---|
| **Miracle** | 22 | Buea, Cameroon | Final-year Software Engineering student at the University of Buea. She volunteers as an online mentor for final-year school students. | Warm, organised, very direct ("show me your notes first"). She made every study mistake once and keeps a list of them. Her own final-year project and job hunt run in the background. | Study Smarter with AI (mentor), Acing Job Interviews, Python for Beginners, Machine Learning for Beginners (mentor) |
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
| Zanele Dlamini | Corporate Jargon (and Data Science for Beginners) | The other Synergix intern, from Johannesburg. Uses jargon confidently and often wrongly; a genius with spreadsheets. Remi's rival, then his best friend at work. Grew up in Soweto; English is her third language (isiZulu, then Afrikaans), and she quietly rehearses important messages. Later a junior analyst at Synergix: in Data Science for Beginners she learns Python and pandas to find out why 1 in 3 deliveries is late. |
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
| Tobi | Negotiation Skills for Beginners | Ada's manager at the Lagos fintech startup. Fair, budget-bound, sets pay by quarter. Narrated. |
| Mr Adeyemi | Negotiation Skills for Beginners | Ada's landlord. Wants a reliable tenant; hates empty months. Narrated. |
| Mrs Okon | Negotiation Skills for Beginners | Runs a bakery; hires Ada for a logo. Narrated. |
| Ngozi | Negotiation Skills for Beginners | Ada's flatmate; sells ankara fabric online. Narrated. |
| Mr Pryce | How to Handle Difficult Negotiations | Procurement manager at Harlow & Finch (fictional London homeware chain, 60 shops). Measured on savings; uses every tactic. Narrated. |
| Ms Okafor-Lane | How to Handle Difficult Negotiations | Harlow & Finch digital director who wants the loyalty app before the spring sale. Narrated. |
| Callum | How to Manage Conflict at Work | New product manager at Kinwell; calls Grace's report "just opinions", later apologises. Narrated. |
| Carmen | Leadership track | Nopal's marketing director, Lucía's boss. Direct, busy, fair; wants no surprises. |
| Njeri | How to Lead Without Being the Boss | Synergix warehouse supervisor in Nairobi. 20 years on the floor; has seen five head-office projects come and go. Blunt, funny, knows exactly why things really break. Becomes Remi's strongest ally once he listens. |
| Kavya | How to Set Clear Expectations (and The AI Stack) | Junior developer in Pune, 23, one of Arjun's first two subcontractors. Fast, ambitious, funny; says "done" when things are 80% done. Co-leads The AI Stack: builds Ask Rao fast, breaks it, and learns why each layer exists. |
| Joel | How to Set Clear Expectations (and The AI Stack) | Junior developer in Kochi, 26, Arjun's other subcontractor. Careful and thorough; waits to be told everything, and goes quiet when unsure. Co-leads The AI Stack: learns every layer properly; his notebook becomes the course map. |
| Bisi | How to Motivate a Team (and Machine Learning for Beginners) | Afiya's first support hire in Lagos, 4 years on the Clinic Success team. Warm, very funny, quietly cynical after three managers in two years. |
| Chidi | How to Motivate a Team (and Machine Learning for Beginners) | Clinic Success's top performer at Afiya. Sharp, fast, bored; has a job offer from a bank in his inbox. |
| Halima | How to Motivate a Team (and Machine Learning for Beginners) | Newest on Clinic Success at Afiya, a former nurse from Kano. Quiet, brilliant with clinics, unsure she belongs in tech. Leads Machine Learning for Beginners: she builds a no-show predictor for Afiya's clinics, with Miracle as her mentor. |
| Folake | How to Motivate a Team (and Machine Learning for Beginners) | Afiya's COO, Miracle's boss. Fast, demanding, fair; thinks motivation is "a pizza problem" until shown otherwise. |
| Emmanuel | How to Motivate a Team (and Machine Learning for Beginners) | Clinic Success agent at Afiya. The funniest person on the team, does the minimum, always eating chin chin. Not lazy: bored, and quietly brilliant at fixing the same bug twice. |
| Yaw | Budgeting for Beginners (Kofi trilogy) | Kofi's roommate at KNUST. Generous, stylish, always "it's only GH₵20"; quietly owes GH₵2,900 on pay-later apps. CastId `yaw`. |
| Miracle's dad | Money Habits That Build Long-Term Wealth | Maths teacher in Buea for 35 years, 59, retires at 60 with a small pension and about 400,000 FCFA; starts a Saturday tutoring group. Narrated. |
| Vikram | How to Understand Investment Risk | Arjun's cousin in Bengaluru; trades options, posts the good months; later down ₹3.2 lakh and switches to a boring monthly plan. Narrated. |
| Nan | How Scams and Financial Fraud Work | Grace's mum, 72, in Salford. Targeted by "Hi Nan" and courier fraud; her "ring first" note becomes the family's favourite safety tool. Narrated. |
| Bimpe | How Scams and Financial Fraud Work | Femi's aunt in Lagos; loses ₦85,000 to a fake credit alert and "please reverse it" call, then warns her church. Narrated. |
| Tyler, Ella, Tobi | How Scams and Financial Fraud Work | Jayden's friends (Tyler muled twice, account frozen; Ella lost £400 to a task scam) and Femi's brother Tobi (19, "finance assistant" mule offer). Narrated. |

## Decisions

- **Art style:** new characters are drawn in Ada's style (bold sticker look with a white outline), so the whole cast reads as one family in lessons and on social. Remi keeps his motion-explainer look there.
- **Who appears where:** each Original picks a lead and one or two supporting characters from the "Best for" column; the lead stays the same for the whole Track.
- **One fixed relationship per pair.** Once two characters meet, how they know each other never changes across Originals.
- **Pilot (AI at Work):** Ada leads. Lucía supports as the marketing lead at a client company Ada's startup works with (so Ada has someone to write to, present to, and impress). (Grace's life is now fixed by The Art of Small Talk: she works at Kinwell in Manchester and knows Ada as a contact.)
