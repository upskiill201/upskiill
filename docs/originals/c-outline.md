# C for Beginners — "Ten Sols on Red Mesa"

> Outline for a Teyro Original (docs/ORIGINALS_PLAYBOOK.md). Track slug `c-for-beginners`, `runner: 'c'`.
> **Status: draft (2026-10-24).** Founder asked for the whole Beginner course; full length (10 chapters × 20 lessons).

## The course

| | |
|---|---|
| **Title** | C for Beginners |
| **Subtitle** | Ten Sols on Red Mesa: a dead controller, a desert habitat, and the C that keeps the mission alive |
| **Category** | Coding |
| **Shape** | Full length: 10 chapters × 20 lessons (200 lessons). Checkpoints at 5, 10, 15; lesson 20 is each chapter's Unit Challenge. Chapter 10's challenge is the Final Challenge. |
| **Starting point** | Total beginners. Never written code in any language. Nothing to install: a real C compiler runs in the browser. |
| **End outcome** | Write, compile and debug complete C programs that read input, make decisions, loop, use functions, arrays, strings, pointers, structs, dynamic memory and files. |
| **Runner** | xcc, a small C compiler built to WebAssembly (`frontend/public/c`), the same build in the browser and in `npm run originals`. |

## The story

Red Mesa Research Station is a (fictional) Mars-analog habitat in the desert near Hanksville, Utah: a two-storey round "Hab", a greenhouse (the GreenHab), a small observatory and two rovers. Crews live there for weeks as if they were on Mars: suits outside, rationed water, one email window a day to "Mission Support". Days are counted in sols, like on Mars.

On Sol 1 of a ten-sol mission, a power surge kills HABCON, the station controller a volunteer wrote in C in 1998. The backup board boots to a blank console. It runs one thing: C programs. Ines, the crew engineer, has wired every circuit in the Hab and has never written a line of code. The replacement board ($1,200) won't arrive until Sol 10, the same day the sponsor's inspector does. If the simulation breaks (alarms that don't work, water nobody can count, a crew that has to "go outside unsuited"), the Altair Foundation won't renew the station's $250,000 grant.

Each chapter is one sol. Each problem the crew hits on that sol is what the chapter's C solves. Lars, who wrote HABCON 26 years ago, answers once a sol by email from Tromsø.

**It is a simulation, and the course says so.** Nobody is in physical danger: the door opens. What's at stake is the mission, the plants, the station's funding, and Ines proving she can do it.

### Cast (new; docs/originals/CAST.md "Red Mesa")

| Name | castId | Who |
|---|---|---|
| **Ines Moreau** | `ines` | 31, Montréal, Canada. Crew engineer, an electrician by trade; wired the Hab two summers ago. Never programmed. Labels every wire, keeps a pencil behind her ear, reads manuals cover to cover, panics quietly and then makes a checklist. Lead. |
| **Hal Brennan** | `hal` | 62, Green River, Utah. Station director and mission commander; retired U.S. Air Force aircraft mechanic. Runs the station on checklists and duct tape. Dry, kind, immovable on mission rules ("We don't break sim"). |
| **Tomoko Sato** | `tomoko` | 45, grew up in Osaka, now a plant biologist at a Salt Lake City university. Runs the GreenHab: 48 tomato plants, lettuce, and a lot of numbers. Patient, exact, measures everything. |
| **Mateus Rocha** | `mateus` | 26, Belo Horizonte, Brazil. Geology PhD student, rover driver. Fast, funny, makes bets, breaks things by accident, "just run it". Learns to test before he trusts. |
| **Lars Eriksen** | `lars` | 71, Tromsø, Norway. Retired embedded-systems engineer who wrote HABCON in C as a volunteer in 1998. "Mission Support" by email, once a sol at 19:00 station time: short, opinionated, kind underneath. "Every byte is somebody's." Mentor. |
| Dr. Celeste Wren | (narrated) | The Altair Foundation's inspector. Arrives Sol 10. |

Money is in US dollars. Science readings are metric (litres, °C, ppm), as the station's instruments are.

### Chapter map (markers = sols)

| # | Marker | Chapter | The sol's problem | The C |
|---|---|---|---|---|
| 1 | Sol 1 | The Board Goes Dark | HABCON dies; the backup board shows a blinking cursor | What C is, compiling, `main`, `printf`, `\n`, errors, comments, `#include` |
| 2 | Sol 2 | Counting What's Left | Nobody knows how much water and oxygen are left | Variables, `int`, `double`, `char`, arithmetic, `%`, casts, `const`, `sizeof`, overflow |
| 3 | Sol 3 | Alarms That Think | The CO₂ alarm needs to decide for itself | `scanf`, `if`/`else`, comparisons, `&&` `||` `!`, `switch`, `?:` |
| 4 | Sol 4 | Every Sixty Seconds | A rover battery must be watched all day | `while`, `for`, `do`/`while`, `break`, `continue`, nested loops, accumulators |
| 5 | Sol 5 | Lars's Rules | The controller is one 300-line `main`; Lars sends rules | Functions, parameters, `return`, prototypes, scope, `math.h`, `rand`, recursion |
| 6 | Sol 6 | A Day of Readings | 1,440 sensor readings a day | Arrays, indexing, sum/average/min/max, bounds, arrays in functions, search, sort, 2D arrays |
| 7 | Sol 7 | Words on the Wire | The radio log and the crew messages | Strings, `'\0'`, `%s`, `fgets`, `string.h`, `ctype.h`, `sprintf`, arrays of strings |
| 8 | Sol 8 | Inside the Memory Map | Lars's old memory map of the board | Addresses, pointers, `*` and `&`, `swap`, pointers and arrays, `NULL`, `const` |
| 9 | Sol 9 | Everything in Its Place | The supply inventory is chaos | `struct`, `typedef`, arrays of structs, `->`, nested structs, `enum` |
| 10 | Sol 10 | The Storm and the Inspector | A dust storm and Dr. Wren arrive together | `malloc`, `free`, `realloc`, files (`fopen`, `fprintf`, `fgets`), debugging, undefined behaviour; the final controller |

### Lesson titles

**Chapter 1 · Sol 1 · The Board Goes Dark** — goal: write, compile and run a C program that prints a report, and fix the errors the compiler finds.
1. The board goes dark · 2. Meet C · 3. Inside a C program · 4. printf and the new line · 5. **Checkpoint:** First words on the console · 6. Compile, then run · 7. The semicolon rule · 8. Reading compiler errors · 9. Escape sequences · 10. **Checkpoint:** The status report · 11. Comments for humans · 12. Many lines, one program · 13. Spaces, indents and style · 14. Printing numbers with %d · 15. **Checkpoint:** The banner · 16. return 0 and exit codes · 17. Headers and #include · 18. Typos C won't forgive · 19. The status board · 20. **Unit Challenge:** First email to Lars

**Chapter 2 · Sol 2 · Counting What's Left** — goal: store, calculate and print readings with the right types.
1. A box called a variable · 2. Declare, then assign · 3. Naming things well · 4. Whole-number arithmetic · 5. **Checkpoint:** The morning count · 6. Integer division and the remainder · 7. Decimals with double · 8. Mixing int and double · 9. Characters with char · 10. **Checkpoint:** The water log · 11. Changing a value · 12. Constants that never change · 13. Lining up the numbers · 14. How big is a type? · 15. **Checkpoint:** Tomoko's seed count · 16. When numbers overflow · 17. Order of operations · 18. The value you forgot to set · 19. The water budget · 20. **Unit Challenge:** How many sols are left?

**Chapter 3 · Sol 3 · Alarms That Think** — goal: read input and make the program choose what to do.
1. The CO₂ alarm · 2. Reading a number with scanf · 3. if and comparisons · 4. if and else · 5. **Checkpoint:** The first alarm · 6. = is not == · 7. else if: green, amber, red · 8. And, or: && and || · 9. Not, true and false · 10. **Checkpoint:** The airlock check · 11. Braces, always · 12. switch for menus · 13. break and fall-through · 14. Reading decimals and letters · 15. **Checkpoint:** The crew menu · 16. Did scanf work? · 17. The ?: shortcut · 18. Edges of a range · 19. The alarm panel · 20. **Unit Challenge:** The alarm that cried wolf

**Chapter 4 · Sol 4 · Every Sixty Seconds** — goal: repeat work with loops and summarise what they find.
1. Watching the battery · 2. while loops · 3. Counting with a loop · 4. for loops · 5. **Checkpoint:** The countdown · 6. Adding it all up · 7. Off by one · 8. Loops that never end · 9. do ... while · 10. **Checkpoint:** The charge log · 11. break: stop early · 12. continue: skip one · 13. Loops inside loops · 14. Read until done · 15. **Checkpoint:** The rover route · 16. Highest and lowest · 17. Counting what matches · 18. Tracing a loop by hand · 19. The battery monitor · 20. **Unit Challenge:** The rover that ran dry

**Chapter 5 · Sol 5 · Lars's Rules** — goal: split a program into small functions that each do one job.
1. One main, 300 lines · 2. Your first function · 3. Parameters · 4. return · 5. **Checkpoint:** Lars's first rule · 6. Prototypes · 7. Local variables and scope · 8. Globals, and why Lars hates them · 9. Functions get copies · 10. **Checkpoint:** The unit converter · 11. Functions that call functions · 12. Yes-or-no functions · 13. The math library · 14. Random numbers · 15. **Checkpoint:** The dice game · 16. Recursion · 17. The base case · 18. One job each · 19. Rebuilding the controller · 20. **Unit Challenge:** Lars's code review

**Chapter 6 · Sol 6 · A Day of Readings** — goal: store many values in arrays and process them.
1. 1,440 readings · 2. Arrays and index 0 · 3. Filling an array · 4. Looping over an array · 5. **Checkpoint:** The hourly readings · 6. Sum and average · 7. Highest, lowest, and when · 8. Out of bounds · 9. How long is an array? · 10. **Checkpoint:** The temperature day · 11. Arrays into functions · 12. Functions that change arrays · 13. Searching an array · 14. Filtering into a new array · 15. **Checkpoint:** The water readings · 16. Bubble sort · 17. Grids: 2D arrays · 18. Rows and columns · 19. The daily report · 20. **Unit Challenge:** The greenhouse grid

**Chapter 7 · Sol 7 · Words on the Wire** — goal: read, build, compare and change text.
1. The radio log · 2. The secret '\0' · 3. Printing strings · 4. Reading a word · 5. **Checkpoint:** Call signs · 6. Reading a whole line · 7. strlen · 8. strcpy and strcat · 9. Comparing strings · 10. **Checkpoint:** The password door · 11. Walking a string · 12. Upper case, lower case, digits · 13. Counting letters and words · 14. Building messages with sprintf · 15. **Checkpoint:** The message builder · 16. Text into numbers · 17. Lists of strings · 18. Strings that overflow · 19. The radio log formatter · 20. **Unit Challenge:** The garbled transmission

**Chapter 8 · Sol 8 · Inside the Memory Map** — goal: use pointers to share and change data.
1. Every value has an address · 2. Pointer variables · 3. Following a pointer · 4. Changing through a pointer · 5. **Checkpoint:** The address book · 6. swap() · 7. Returning two answers · 8. scanf's & explained · 9. Arrays are addresses · 10. **Checkpoint:** The pointer quiz · 11. Pointer arithmetic · 12. Walking with a pointer · 13. Strings as pointers · 14. NULL · 15. **Checkpoint:** The buffer · 16. const and pointers · 17. Pointer bugs · 18. Drawing memory · 19. The sensor buffer · 20. **Unit Challenge:** Lars's memory map

**Chapter 9 · Sol 9 · Everything in Its Place** — goal: model real things with structs and enums.
1. The inventory mess · 2. Your first struct · 3. Starting values · 4. typedef · 5. **Checkpoint:** The crew card · 6. Arrays of structs · 7. Structs into functions · 8. Pointers to structs and -> · 9. Updating a record · 10. **Checkpoint:** The supply shelf · 11. Structs inside structs · 12. enum · 13. switch on an enum · 14. Finding a record · 15. **Checkpoint:** The rover log · 16. Sorting records · 17. Designing a type · 18. A neat report · 19. The station inventory · 20. **Unit Challenge:** The supply drop

**Chapter 10 · Sol 10 · The Storm and the Inspector** — goal: manage memory and files, and debug a complete program.
1. The storm warning · 2. malloc · 3. free · 4. Arrays sized at run time · 5. **Checkpoint:** The storm buffer · 6. realloc · 7. When malloc says no · 8. Writing a file · 9. Reading it back · 10. **Checkpoint:** The mission log · 11. File modes · 12. When a file won't open · 13. Line by line to the end · 14. Programs in parts · 15. **Checkpoint:** The log reader · 16. Debugging like Lars · 17. C's traps · 18. Where C goes next · 19. The final controller · 20. **Final Challenge:** The inspector's test

**Level project (Deepen in the Final Challenge):** install a C compiler (gcc or clang) on your own computer and build the final controller there.

## Runner notes for authors

- Every lesson has a Try it live card or a Write and run exercise; most have both. Typed code stays under ~5 lines (playbook §7); longer programs come as a starter with gaps.
- Write and run checks are `outputIncludes`, `outputEquals` and `codeIncludes` only (no `expr` in C).
- Input lines (`stdin`) appear in the output where the program reads them, like a terminal: `Age? 31`.
- `rand()` is the C standard's sample generator (`srand(1)` by default) and `time(NULL)` is fixed per run, so output is the same every run. Don't promise "different every time".
- In this runner `int` and `long` are 4 bytes, `double` 8, pointers 4. Teach `sizeof(int)` and `sizeof(double)`; don't print `sizeof(long)` or pointer sizes, and never check printed addresses.
- Whole-number literals above 4294967295 are refused (the runner explains why). Build big numbers by multiplying.
- Files live only for one run: a program writes a file and reads it back in the same run.

## Sources

- C's origin: Dennis M. Ritchie, "The Development of the C Language" (HOPL-II, 1993): developed at Bell Labs 1969–1973, named after B; used to rewrite Unix in 1973. Kernighan & Ritchie, *The C Programming Language* (1978).
- Standards: ANSI X3.159-1989 (C89), ISO/IEC 9899:1999 (C99), :2011 (C11), :2018 (C17), :2024 (C23).
- Mars sol length 24 h 39 min 35 s (NASA). Analog stations (e.g. the Mars Society's MDRS near Hanksville, Utah) are the inspiration; Red Mesa is fictional.
