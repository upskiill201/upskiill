# Behind the tap #2, tap to pay: post kit

**Account:** Teyro
**Video file:** `tap-to-pay.mp4` (1080×1920, 30 fps, H.264 + AAC, 44.2 s). Download and upload manually; nothing is auto-posted.
**Cover:** `cover.jpg` (full hook line + the 1 · 6 · 2s · $0 card)
**Hook type:** Number + curiosity ("One coffee. Six stops. Two seconds. And zero money moved.")
**CTA type:** Search Teyro ("Want to build stuff like this, one lesson a day? Head to Teyro.")
**Series:** "Behind the tap" #2 (after the Like-button video)

---

## Instagram

**Caption**
```
One coffee. Six stops. Two seconds. And zero money moved.

What happens when you tap to pay:
1. Face ID unlocks a separate chip, a vault the rest of your phone can't read
2. Inside: not your card number, but a stand-in that only works on that phone. It signs this one purchase, so a copy is useless
3. The reader talks over NFC, which only reaches about 4 cm
4. The shop's bank reads the first digits and sends it to Visa
5. Visa swaps the stand-in back and an AI checks 500+ signals in about 1 millisecond
6. Your bank checks the fraud score and your balance, and says yes

The beep is a promise. The real money moves later, in a batch called settlement.

Send this to the friend who still thinks tap to pay is less safe than a card.
Want to build stuff like this, one lesson a day? Head to Teyro (teyro.app).

Which stop surprised you most, 1 to 6?

#fintech #howitworks #coding #techexplained #teyro
```

**Pinned comment**
```
Which stop surprised you most, 1 to 6? 👇 Next "Behind the tap": what should we follow?
```

**Alt text**
```
Animated host Ada follows a tap-to-pay coffee purchase through six stops: Face ID and the phone's secure chip, a one-phone stand-in card number that signs the purchase, the NFC reader, the shop's bank, Visa's fraud AI, and your bank's approval, then explains that money only moves later in settlement.
```

---

## TikTok

**Caption** (≤ 150 characters)
```
What happens in the 2 seconds after you tap to pay? Spoiler: no money moves. #fintech #applepay #tech #coding #teyro
```

**Pinned comment**
```
Which stop surprised you most, 1 to 6?
```

---

## Reply bank (for the first hour of comments)
- **"So is tap to pay safer than my card?"** → Your real card number never leaves the phone, and every tap gets a one-time signature, so a copied tap is useless. That's a big part of why it's considered very secure.
- **"Does Android work the same?"** → Same idea (a stand-in number plus a one-time code), but Android often keeps it in secure software rather than a separate chip. This video follows an iPhone.
- **"When does the money actually move?"** → At settlement: the shop's bank and yours settle up in batches, usually within a day or so.
- **"Where do I learn to build stuff like this?"** → Teyro's coding track: short daily lessons where you write real code. teyro.app

## Facts check
| Claim in video | Source (checked 2026-10-09) |
|---|---|
| Face ID unlocks a separate chip the rest of the phone can't read | [Apple Pay security overview](https://support.apple.com/101554): Device Account Number in the Secure Element, "isolated from" iOS |
| Not your card number, but a stand-in for this phone | Same page: Apple and the device never send the actual card number; a Device Account Number is used |
| Signs this one purchase, so a copy is dead | Same page: a "transaction-specific dynamic security code"; EMV cryptograms include the amount and a transaction counter, so a replay fails |
| NFC reaches ~4 cm | EMV contactless operating range (up to ~4 cm) |
| Shop's bank reads the first digits, sees Visa, passes it on | Card routing by the leading digits (BIN/IIN) |
| Visa swaps the stand-in for your real number | Visa Token Service de-tokenizes before the issuer authorizes |
| AI checks 500+ signals in ~1 ms; fraud score | [Visa press release (2019)](https://investor.visa.com/news/news-details/2019/Visa-Prevents-Approximately-25-Billion-in-Fraud-Using-Artificial-Intelligence/default.aspx): Visa Advanced Authorization, 500+ risk attributes, about one millisecond; score 1–99 |
| Six stops / ~2 seconds | The six stops in this video; "real time ≈" clock on screen is approximate |
| No money moved; settlement later in a batch | Authorization moves no funds; clearing and settlement run later in batches |
| Card/token numbers, $4.50, Corner Café, score 4, $1,240 balance | **Illustrative only** |
| **Changed from the original script** | "80,000 messages a second" cut (Visa's 10-K says "more than 65,000"); 258 billion transactions cut for length (true: 257.5B in FY2025); missing "Stop 2" added (the vault); hook says "six stops" because the script names five systems |
