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
| Best for | Get Hired, Get Ahead, Python for Beginners (Miracle mentors in Study Smarter with AI) |

## The rest of the cast

Four more, so every Original has someone who fits. Each needs a look drawn before it appears in a lesson with art; until then they appear in text-only Story lessons.

| Working name | Home | Life stage | Best for |
|---|---|---|---|
| Lucía | Mexico City, Mexico | Mid-career marketer, newly promoted to lead a small team | Speak Like a CEO, AI at Work, Clear Writing at Work |
| Arjun | Bengaluru, India | Freelance developer juggling international clients | Clear Writing at Work, Get Hired, Get Ahead, Python, The AI Stack (team lead) |
| Grace | Manchester, UK | Career-changer, 44: 18 years a ward nurse, now a junior UX researcher at Kinwell, a Manchester health-tech company (The Art of Small Talk, lead). Warm, funny, blunt, brilliant under pressure; freezes in rooms full of strangers and slips into "Nurse Mode" ("And how are we feeling today?") when nervous. Son Jayden, 17. | The Art of Small Talk (lead), Get Hired, Get Ahead |
| Kofi | Accra, Ghana | Final-year secondary-school student, 17, who wants to study Biomedical Engineering. Funny, competitive, a last-minute worker with big plans; makes beats on his phone and plays football. | Study Smarter with AI (lead) |

## Fixed relationships so far

- **Ada and Lucía:** Lucía is the marketing lead at a client company Ada's startup works with (AI at Work).
- **Ada and Arjun:** Arjun does freelance contract development for Ada's startup and mentors her as she learns Python (Python for Beginners). He is precise, opinionated about variable names, and writes code nobody else can read; Ada teaches him why readable code matters.
- **Ada and Remi:** friends since they met at a hackathon in Kigali. In Corporate Jargon, Ada (a year or two into her job in Lagos) is Remi's WhatsApp lifeline during his Synergix internship, answering in voice notes.
- **Remi's internship:** after graduating, Remi does a 12-week internship in the Strategy & Operations team at Synergix, Nairobi (Corporate Jargon). (The old plan for an interviews course ending with him landing it was dropped on 2026-10-20; interviews now live in Get Hired, Get Ahead, led by Clinton.)
- **Grace and Ada:** they meet in the coffee queue at a Manchester tech conference where Ada is speaking (The Art of Small Talk, final chapter) and stay in touch as contacts. (Supersedes the earlier idea of Grace as Ada's colleague in AI at Work.)
- **Grace and Arjun:** Arjun does freelance development for Kinwell; Grace works with him on video calls (The Art of Small Talk).
- **Grace learns to code (TypeScript for Beginners):** a few months after The Art of Small Talk, Grace builds a Session Booker in TypeScript for Kinwell's research sessions. Femi (Kinwell developer) is her coding mentor; Arjun reviews her code on video calls; Priya is her first "customer"; Jayden (17) codes a bit and is smug about it. The Intermediate level continues with Grace turning the booker into a React web app.
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
- **Lucía's Impossible Month (AI Tools for Everyday Productivity, added 2026-10-22):** Lucía has thirty days to throw her parents' 35th anniversary party in Oaxaca (Day 30), move flat (Señor Ibarra is selling; she signs a two-year lease on Flat 5, on a quiet side street, and moves on Day 27), and open a São Paulo distributor call in Portuguese (Day 29), on top of her job at Nopal. Ada, whom Lucía mentored in Negotiation Skills, returns the favour by voice note as her AI coach. Marta is the sceptic, Tomás trusts AI blindly, Sofía checks sources, Carmen sets the São Paulo deadline. Her parents are Rosa and Ernesto Hernández; her brother Mateo sends memes and is reliable only with specific tasks. The venue (Casa Lupe) is double-booked, so the party moves to Doña Lupe's cousin's hacienda; La Cocina de Inés caters. Her prompt cards (8 by Day 30) are the running device.

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

## The Starlight (added 2026-10-23)

They lead **SQL and Databases for Beginners** ("Save the Starlight", docs/originals/sql-databases-outline.md): Chicago, USA, US dollars. Juno, Walt, Leo and Dana are castIds `juno`, `walt`, `leo`, `dana`.

| Name | Age | Home | Life stage | Personality |
|---|---|---|---|---|
| **Juno Park** | 27 | Chicago, USA (grew up in Albany Park) | Projectionist at the Starlight Picture House for four years; has never written SQL | Film-obsessed night owl who labels everything and quotes movies when nervous. Impatient with mess, brilliant once she can see the shape of a problem. |
| **Walt Abernathy** | 74 | Chicago, USA | Owner of the Starlight, which his grandfather opened in November 1926 | Stubborn, generous, hands out free "comp" tickets to friends. Keeps every booking on an index card in a shoebox; remembers every regular's name and none of their seats. |
| **Leo Marchetti** | 19 | Chicago, USA | Usher and film student; paints the Starlight's posters | Bets on everything, sceptical of "Juno's spreadsheet thing", then its loudest fan. Makes big mistakes fast and owns them. |
| **Dana Whitlock** | 40s | Chicago, USA | Development agent for Crane Holdings, which wants the site for condos | Polite, sharp, always has the numbers. Offers Walt $2.4 million. Right that the Starlight can't prove it's a business, until it can. |

**Fixed relationships:**
- **Juno and Arjun:** met years ago on a classic-film restoration forum; his favourite single-screen cinema in Bengaluru closed in 2019. He mentors her on video calls (10:30 p.m. in Chicago, 9 a.m. in Bengaluru) while she builds the Starlight's database.
- **Juno, Walt and Leo** work together at the Starlight. Ms Delgado (Lakeview Community Bank, narrated) will lend $40,000 for the roof if the records are clean. Rosa Marin and Jack Murphy (narrated regulars) both hold seat G7 on Fri 2 Oct.

## Red Mesa (added 2026-10-24)

They lead **C for Beginners** ("Ten Sols on Red Mesa", docs/originals/c-outline.md): a fictional Mars-analog research station near Hanksville, Utah, USA, US dollars, metric readings. Ines, Hal, Tomoko, Mateus and Lars are castIds `ines`, `hal`, `tomoko`, `mateus`, `lars`.

| Name | Age | Home | Life stage | Personality |
|---|---|---|---|---|
| **Ines Moreau** | 31 | Montréal, Canada | Crew engineer at Red Mesa; an electrician by trade who wired the Hab two summers ago. Has never written code. | Labels every wire, keeps a pencil behind her ear, reads the whole manual first. Panics quietly, then makes a checklist. Careful, stubborn, funny when tired. |
| **Hal Brennan** | 62 | Green River, Utah, USA | Station director and mission commander; retired U.S. Air Force aircraft mechanic | Checklists and duct tape. Dry, kind, immovable on mission rules: "We don't break sim." Calls everyone by their surname on the radio. |
| **Tomoko Sato** | 45 | Grew up in Osaka, Japan; lives in Salt Lake City | Plant biologist at a university; runs the GreenHab (48 tomato plants, lettuce) | Patient and exact; measures everything in grams and millilitres; writes her numbers in a waterproof notebook. Quietly the best tester on the crew. |
| **Mateus Rocha** | 26 | Belo Horizonte, Brazil | Geology PhD student; rover driver | Fast, funny, makes bets, "just run it". Breaks things by accident and owns it straight away. Learns to test before he trusts. |
| **Lars Eriksen** | 71 | Tromsø, Norway | Retired embedded-systems engineer; wrote HABCON, the station controller, in C as a volunteer in 1998 | Answers once a sol by email at 19:00 station time. Short sentences, strong opinions ("Every byte is somebody's"), kind underneath. Never writes the code for you. |

**Fixed relationships:**
- **Ines, Hal, Tomoko and Mateus** are Crew 31 at Red Mesa for a ten-sol simulated mission. Hal hired Ines to wire the Hab; this is her first mission as crew.
- **Lars and the station:** Lars wrote HABCON for Hal's predecessor and still answers its questions. He and Ines have never met; she knows him only from his comments in the code.
- Narrated: Dr. Celeste Wren, the Altair Foundation's inspector (arrives Sol 10). The grant is $250,000 a year; the replacement controller board costs $1,200.

## Silver Pine (added 2026-10-24)

They lead **JavaScript: From Beginner to Interactive Apps** (three linked courses, "First Chair", "The Live Board", "Championship Weekend"; docs/originals/javascript-outline.md): Silver Pine Ski Hill, Alder Gap, Colorado, USA (a fictional town), winter 2026–27, US dollars. Nora, Mags, Rafa and Wes are castIds `nora`, `mags`, `rafa`, `wes`.

| Name | Age | Home | Life stage | Personality |
|---|---|---|---|---|
| **Nora Lindqvist** | 23 | Alder Gap, Colorado, USA (grew up there) | Lift operator and ticket-window cashier at Silver Pine for three winters. Built the hill's static website from a free HTML course; has never written JavaScript. Wants to be a developer and worries it's "too late to start". | Practical, dry, makes a list for everything, terrible at waiting. Talks to the chairlift ("Come on, Old Blue"). Learns fastest by breaking things on purpose. |
| **Mags Ellery** | 71 | Alder Gap, Colorado, USA | Owner of Silver Pine, which her parents opened in 1961 | Runs the hill from a clipboard and a landline. Stubborn about change, soft about people; invented Locals Tuesday ($20 tickets) and gives free hot chocolate to anyone who falls off the T-Bar. Says yes first and asks how later. |
| **Rafa Ortiz** | 34 | Alder Gap, Colorado, USA (from Pueblo) | Head of ski patrol. Six years as a software tester in Denver before he quit for the mountains and swore never to write code again. | Calm, exact, darkly funny; tests everything twice. Mentors Nora in the patrol hut, reluctantly at first. His question for every feature: "What does it do when someone types nothing?" |
| **Wes Ellery** | 15 | Alder Gap, Colorado, USA | Mags's grandson; high-school sophomore and snowboarder | Taps every button twice, reads nothing, breaks everything on his cracked phone, which makes him the best user tester on the mountain. Rides bib 13 (U16) at the Colorado Junior Freeride Championship. |

**Fixed relationships:**
- **Nora, Mags, Rafa and Wes** work (and ride) at Silver Pine. Nora built the static site; Rafa mentors her in JavaScript; Wes tests everything she builds; Mags sets the problems ("Make the website answer the phone").
- **The hill:** Old Blue (the 1961 double chair), the Ridge T-Bar, the Bunny Carpet, 14 trails (Schoolhouse, Lazy Elk, Bunny Hollow, Old Mill, Bluebird, Mags's Run, Big Sky, Aspen Alley, Lone Pine, Silver Streak, Rattlesnake, Ridgeline, Hermit Glade, The Chute). Tickets: $59 adult, $39 child (6–12), free under 6, $29 senior (70+), $20 for everyone on Locals Tuesday.
- **The championship:** the Colorado Junior Freeride Series moves its championship to Silver Pine on Saturday 13 March 2027 after its venue runs out of snow. The riders (Ava Brooks, Mateo Rossi, Isla Moreno and others) are names in the practice API, not characters.

## Cameroon (added 2026-10-14, founder)

These three join the shared cast. They first appear in Study Smarter with AI and can return in any Original.

| Name | Age | Home | Life stage | Personality | Best for |
|---|---|---|---|---|---|
| **Miracle** | 22 | Buea, Cameroon | Final-year Software Engineering student at the University of Buea. She volunteers as an online mentor for final-year school students. | Warm, organised, very direct ("show me your notes first"). She made every study mistake once and keeps a list of them. Her own final-year project and job hunt run in the background. | Study Smarter with AI (mentor), Get Hired, Get Ahead, Python for Beginners, Machine Learning for Beginners (mentor) |
| **Clinton** | 17 | Bamenda, Cameroon | Final year of secondary school; wants to study Computer Science | Loud, funny, runs every group chat, and is brilliant at organising people. He is tempted by shortcuts, but he keeps his drafts, and that saves him. | Study Smarter with AI, Speak Like a CEO, Get Hired, Get Ahead (lead) |
| **David** | 17 | Buea, Cameroon | Final year of secondary school; wants to study Medicine | Quiet and the best at Maths in the group. He explains numbers beautifully but freezes when he has to write an essay. | Study Smarter with AI, Clear Writing at Work |

**Fixed relationships:**
- Miracle mentors Kofi, Clinton and David as one online study group (weekly video call plus a group chat).
- Clinton and David go to the same school in Buea; Clinton moved there from Bamenda.
- Kofi meets Clinton and David through Miracle's group.
- **Kofi Goes Live (HTML & CSS for Beginners):** the summer after Study Smarter with AI, twelve weeks before Kofi starts university. Kofi makes beats on his phone as **Mensah Beats**; a small Accra event, Sound Up Saturdays, offers him a set and asks for his website, so he builds one. Miracle (just started at Afiya in Lagos) mentors him on video calls; Clinton ("Head of Quality, unpaid") and David are his first fans; Efua reviews his pages; Ama, his sister, tests them. Map markers count down from "12 weeks to uni" to "Launch night". The Intermediate level continues at university with JavaScript.
- **Order Up (React Native for Beginners, added 2026-10-22):** Theo builds an order-ahead app for Pho Real, his mum Linh's food truck in Austin, before the Eastside Food Truck Festival (fictional). Arjun, who met Theo on an online developers' forum, reviews his code on video calls from Bengaluru. Mai tests; Ray cooks. Prices in US dollars. Film 1 of a planned trilogy: Order Up: Rush Hour (full-stack) and Order Up: Opening Day (launch) are announced as in production.

## Course-only characters

These appear in one Original only and don't join the shared cast.

| Name | Course | Who |
|---|---|---|
| Efua | Study Smarter with AI (and HTML & CSS for Beginners) | Kofi's classmate in Accra. Top of the class, with famous handwritten notes; she doesn't trust AI. In HTML & CSS for Beginners she reviews Kofi's website with impeccable taste and no patience for ugly pages; her near-compliments are a running joke. |
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
| Rosa and Ernesto Hernández | AI Tools for Everyday Productivity | Lucía's parents in Oaxaca, married 35 years. Papá sings badly and cries at speeches; Mamá keeps every note he ever left on the fridge. Narrated. |
| Mateo | AI Tools for Everyday Productivity | Lucía's younger brother. Answers everything with a meme; excellent when a task is specific ("mariachi at 7 p.m."). Narrated. |
| Abuela, Tía Carmela | AI Tools for Everyday Productivity | Lucía's grandmother (89, leaves parties at 9) and great-aunt (84). Narrated. |
| Doña Lupe | AI Tools for Everyday Productivity | Runs Casa Lupe, a party venue in Oaxaca; her nephew double-books it. Narrated. |
| Mrs Ewane | Get Hired, Get Ahead | Head of Careers, University of Buea. Precise, kind, quizzes every student before helping; returns Comic Sans CVs unread. |
| Brenda Fon | Get Hired, Get Ahead | Njangi Pay's graduate recruiter (Douala). Busy and fair; met Clinton at the careers fair and reappears at his interview and offer. |
| Ngozi Bate | Get Hired, Get Ahead (Level 2) | Clinton's engineering manager at Njangi Pay. Direct, generous with earned praise, allergic to surprises. |
| Paul Tabi | Get Hired, Get Ahead (Level 2) | Senior developer at Njangi Pay. Knows everything, explains nothing, until Clinton earns it. |
| Ama | HTML & CSS for Beginners | Kofi's sister, 10, Osu (Accra). His "user tester": blunt, curious, finds bugs in thirty seconds ("if Ama can't find the play button, nobody can"). Wants her own section on his site ("Ama's corner"). |
| Theo Nguyen | React Native for Beginners (Order Up trilogy, lead) | 22, Austin, Texas. Just finished a coding bootcamp; knows JavaScript and a little TypeScript, has never shipped anything. Funny, fast, overconfident; codes at the food truck's window between orders. Builds Pho Real's order-ahead app. CastId `theo`. |
| Linh Nguyen | React Native for Beginners | 51, Theo's mum. Has run Pho Real, the family's pho food truck in Austin, for 12 years. Sharp, practical, allergic to anything that slows the line ("Paper never crashes"). Her approval is the real finish line. CastId `linh`. |
| Mai Nguyen | React Native for Beginners | 16, Theo's sister. Always filming, brutally honest tester ("this font is giving 2009"), the voice of every impatient customer. CastId `mai`. |
| Ray | React Native for Beginners | Pho Real's cook. Speaks only in order numbers. Narrated. |

## Decisions

- **Art style:** new characters are drawn in Ada's style (bold sticker look with a white outline), so the whole cast reads as one family in lessons and on social. Remi keeps his motion-explainer look there.
- **Who appears where:** each Original picks a lead and one or two supporting characters from the "Best for" column; the lead stays the same for the whole Track.
- **One fixed relationship per pair.** Once two characters meet, how they know each other never changes across Originals.
- **Pilot (AI at Work):** Ada leads. Lucía supports as the marketing lead at a client company Ada's startup works with (so Ada has someone to write to, present to, and impress). (Grace's life is now fixed by The Art of Small Talk: she works at Kinwell in Manchester and knows Ada as a contact.)
