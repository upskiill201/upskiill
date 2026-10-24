# Stop adding symbols to your password: Motion Explainer post kit

**Account:** Teyro
**Video file:** `stop-adding-symbols.mp4` (1080×1920, 30 fps, H.264 + AAC, 2:50). Download and upload manually; nothing is auto-posted.
**Cover:** `cover.jpg`. Frame 0 = the hook: "STOP ADDING SYMBOLS · if you don't want to get hacked" with a STOP stamp on `P@ssw0rd!`.
**Hook:** "Stop adding symbols to your password if you don't want to get hacked." (founder pick, "Stop doing X" template)
**Narrator:** Liam (ElevenLabs) · **Host:** Remi
**QA:** see the table at the bottom

---

## Instagram

**Caption** (paste as-is)
```
Stop adding symbols to your password 🔐
P@ssw0rd ticks every box. It's leaked over 6 million times 👇

1 · Sites don't keep your password, they keep a hash
2 · Hackers steal the hashes, then guess
3 · One gaming GPU: ~22 billion guesses a second
4 · They start with leaked lists, and your ! is already in there
5 · Salt: same password, different hash
6 · Slow hashes (bcrypt) cut guessing to ~184 thousand a second
7 · What works: length. Four random words, at least 15 characters

Don't be clever. Be long.

Send this to the friend whose password ends in "!".
Learn coding and AI a few minutes a day on Teyro (link in bio).

Be honest: does your password end with a symbol? 👀

#cybersecurity #passwords #infosec #learntocode #teyro
```

**Pinned comment**
```
Save this and change one password today. Quick poll: how many of your passwords are the SAME one? 1, 2-5, or "all of them"? 👇
```

**Alt text**
```
Animated explainer: a password typed into a sign-up form goes through a blender-style hash, sits in a database, gets stolen in a breach and attacked by a gaming GPU, then is protected by salt and slow hashing; the twist shows four random words beating symbols.
```

---

## TikTok
**Caption**
```
Stop adding symbols to your password: here's how hackers really crack them #cybersecurity #passwords #learntocode #teyro
```
**Pinned comment**
```
Does your password end with a symbol? Be honest 👇
```

---

## Reply bank (first hour)
- **"What app is this?"** → It's Teyro: short coding and AI lessons, a few minutes a day. The link is in our bio.
- **"So symbols are bad?"** → Not bad, just not the thing that saves you. Predictable symbols (P@ss, !, 1) are in every cracker's rules. Length and randomness are what count. NIST now tells sites not to force symbol rules.
- **"22 billion a second? Source?"** → Public hashcat benchmark on one RTX 4090, SHA-256. Against bcrypt the same card does ~184 thousand. That gap is why good sites hash slowly.
- **"Four words gets cracked by a dictionary attack!"** → Only if they're predictable. Truly random words from a 7,776-word list = 7,776⁴ ≈ 3.66 quadrillion combos. "correct horse battery staple" is NOT random anymore: it's leaked 4,173 times.
- **"Just use a password manager"** → Yes, exactly what we say at the end: a different password everywhere.
- **"Does it work for beginners?"** → Yes. Teyro starts from zero and builds up in short daily lessons.

## Facts check
| Claim in video | Source (checked 2026-10-09) |
|---|---|
| P@ssw0rd leaked 6,421,042×; 123456 210,461,208×; password 52,372,427×; correct horse battery staple 4,173× | Have I Been Pwned, Pwned Passwords range API |
| Sites shall not force composition (symbol) rules; min 15 characters; people turn "password" into "Password1!" | NIST SP 800-63B rev 4 (Aug 2025) |
| Passwords must be salted and hashed; hashing is one-way; salts defeat pre-made (rainbow) tables; fast hashes like SHA-256 unsuitable; use bcrypt / Argon2 | OWASP Password Storage Cheat Sheet; NIST SP 800-63B |
| One gaming GPU ≈ 22 billion SHA-256 guesses/s; ≈ 184,000 bcrypt guesses/s | hashcat v6.2.6 benchmark, RTX 4090 (Chick3nman gist); bcrypt at the benchmark's low cost setting |
| 7,776-word list; 4 words ≈ 3.66 quadrillion | EFF large wordlist (counted); 7,776⁴ computed |
| ≈ 2 days (fast hash) vs ≈ 630 years (slow hash) to try every combination | computed from the benchmark above, labelled on screen |
| Hashes on screen (b03ddf3c…, 5e884898…, salted values) | real SHA-256 outputs; emails and salts are examples |
| Teyro: coding lessons, "a few minutes a day" | teyro.app + teyro.app/features (2026-10-09) |

## QA (`pipeline/motion/qa.mjs`, 2026-10-09)
| Gate | Result |
|---|---|
| Length 2:00–2:58 | ✓ 2:50 |
| Visual events ≥ 1.5 / s | ✓ 2.31 / s (one every 0.43 s) |
| Longest still ≤ 2.5 s | ✓ 1.7 s |
| Near-still frames 55–80 % | ✓ 76 % |
| No hard cuts | ✓ none |
| Loudness −14 ±0.5 LUFS | ✓ −14.0 LUFS |
| LRA ≤ 3 LU | ✓ 1.6 LU |
| No silence ≥ 0.5 s | ✓ none |
