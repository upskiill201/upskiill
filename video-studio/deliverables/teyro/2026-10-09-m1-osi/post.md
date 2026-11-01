# The OSI model, explained: Motion Explainer post kit

**Account:** Teyro
**Video file:** `osi-model-explained.mp4` (1080×1920, 30 fps, H.264 + AAC, 2:40). Download and upload manually; nothing is auto-posted.
**Cover:** `cover.jpg`. This is the title card ("OSI MODEL · EXPLAINED") over the two neon stacks. Pick it as the Reel cover.
**Hook archetype:** slow-motion of one second
**Narrator:** Liam (ElevenLabs) · **Host:** Remi
**QA:** see the table at the bottom

---

## Instagram

**Caption** (paste as-is)
```
Your photo crosses 5,000 km in about a second 🌍
This is everything that happens in that second 👇

7 · Application: the app says "send this photo to her"
6 · Presentation: it's compressed, then encrypted
5 · Session: phone and server open a conversation
4 · Transport: cut into numbered pieces (TCP)
3 · Network: each piece gets the final address (IP)
2 · Data link: a local label to reach the router (MAC)
1 · Physical: radio, copper, then light under the sea

Seven layers. Seven jobs. One second.

Send this to the friend who still thinks Wi-Fi is magic.
Learn coding and AI a few minutes a day on Teyro (link in bio).

Be honest: whose jollof was that, Nigeria or Ghana? 👀

#osimodel #networking #computerscience #learntocode #teyro
```

**Pinned comment**
```
Save this for your next networking exam. Quick one: your Wi-Fi shows full bars but nothing loads. Which layer do you check first? 👇
```

**Alt text**
```
Animated explainer: a jollof photo travels from a phone in Lagos to a phone in London through the seven layers of the OSI model, shown as glowing stacked planes, then crosses an undersea route and is unpacked in reverse.
```

---

## TikTok
**Caption**
```
OSI model explained: what happens in the 1 second your photo travels Lagos → London #osimodel #networking #learntocode #teyro
```
**Pinned comment**
```
Full bars but nothing loads: which layer do you check first? 👇
```

---

## Reply bank (first hour)
- **"What app is this?"** → It's Teyro: short coding and AI lessons, a few minutes a day. The link is in our bio.
- **"Encryption is really TLS, that's not layer 6!"** → Fair. Real protocols don't fit OSI perfectly (we say that in the video). TLS is usually taught under presentation/session, but in practice it sits between the app and TCP.
- **"Is 1,460 bytes always the size?"** → It's the usual size on Ethernet/Wi-Fi: 1,500 bytes minus 20 for the IP header and 20 for the TCP header. Other networks can differ.
- **"Does it work for beginners?"** → Yes. Teyro starts from zero and builds up in short daily lessons.
- **Jollof wars** → Stay neutral and playful: "The packets don't take sides 😅"

## Facts check
| Claim in video | Source (checked 2026-10-09) |
|---|---|
| OSI model has 7 layers (application … physical) | ISO/IEC 7498-1:1994 |
| Real internet uses a 4-layer TCP/IP model (link, internet, transport, application) | RFC 1122 §1.1.3 |
| Pieces of 1,460 bytes = 1,500 Ethernet payload − 20 IP − 20 TCP | RFC 894, RFC 791, RFC 9293 |
| TCP numbers pieces and re-sends lost ones; UDP doesn't | RFC 9293, RFC 768 |
| MAC = local 48-bit hardware address | IEEE 802 / EUI-48 |
| Lagos → London ≈ 5,000 km | great-circle distance 5,012 km (computed) |
| ≈ 206 pieces for a ~300 KB photo | computed; photo size is an illustrative example (labelled on screen) |
| IP 203.0.113.7, MAC values, "chat.example" | example values (TEST-NET-3 range, RFC 5737), labelled on screen |
| Route Lagos → Accra → Dakar → Canary Is. → Lisbon → London | illustrative route, labelled "not to scale" |
| Teyro: "a few minutes a day", "the fun way to finish learning coding and AI" | teyro.app (homepage title + FAQ) |

## QA (`pipeline/motion/qa.mjs`, 2026-10-09)
| Gate | Result |
|---|---|
| Length 2:00–2:58 | ✓ 2:40 |
| Visual events ≥ 1.5 / s | ✓ 1.63 / s (one every 0.61 s) |
| Longest still ≤ 2.5 s | ✓ 1.6 s |
| Near-still frames 55–80 % | ✓ 77 % |
| No hard cuts | ✓ none |
| Loudness −14 ±0.5 LUFS | ✓ −14.0 LUFS |
| LRA ≤ 3 LU | ✓ 1.5 LU |
| No silence ≥ 0.5 s | ✓ none |
