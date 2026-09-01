# Teyro SEO & AI Content Optimization Guide (SEO + GEO + Conversion)

This document is the **standard operating procedure (SOP)** for writing, structuring, and optimizing all blog posts for Teyro. It synthesizes official guidelines from **Google Search Central**, **SEMrush**, **Bynder**, **Siteimprove**, and modern **Generative Engine Optimization (GEO)** principles for ranking on Google AI Overviews, Perplexity, and ChatGPT Search.

---

## 🎯 Primary Goal of Every Blog Post
1. **Rank #1 on Google** and get cited by **AI Answer Engines (Perplexity, ChatGPT, Gemini, Google AI Overviews)**.
2. **Educate & Provide Immediate Value** to solve the user's specific search intent without fluff.
3. **Convert Organic Search Traffic into Active App Users** via the onboarding flow (`/onboarding/0`).

---

## 📏 Word Count & Scope Standards

| Post Type | Target Word Count | Purpose |
| :--- | :--- | :--- |
| **Standard Comprehensive Guide** | **1,500 – 2,500 words** | High-ranking topical authority, in-depth subtopics, detailed examples, and actionable steps. |
| **Ultimate Pillar / Head-Term Guide** | **2,500 – 3,500+ words** | Complete domain overview covering all cluster keywords, comparison tables, and skill trees. |
| **Direct Answer / Snippet Block** | **40 – 60 words** | Crisp definition placed right below the H1 or major H2 to capture Google Featured Snippets and AI citation blocks. |

---

## 🚀 The 3-Point Conversion Funnel Architecture

Every blog post must follow this conversion sequence:

### 1. Early Teyro Hook (First 150 Words) ⛔ Mandatory
- Immediately validate the reader's problem / search query.
- Introduce the primary keyword in the first 2 sentences.
- **Contextually introduce [Teyro](/onboarding/0)** as the solution:
  > *"With gamified micro-learning platforms like [Teyro](/onboarding/0), you can master in-demand [Topic] skills in just 15 minutes of daily practice."*

### 2. Duolingo-Style Gamified Learning Section
- Break down the roadmap into **Levels 1–3 (Novice, Builder, Pro)** with **XP Milestones** and **Daily Streak Goals**.
- Contrast 15-minute daily micro-learning against 40-hour exhausting video lectures.
- Highlight Teyro's bite-sized, interactive approach to learning programming, AI, business, and study habits.

### 3. Bottom-of-Post CTA to `/onboarding/0` ⛔ Mandatory
- Conclude with a strong "The Bottom Line" summary.
- The closing CTA block must have `href: /onboarding/0` and clear action copy (`Start Learning Free`, `Claim Your Free Account`).

---

## 🧠 Dual-Ranking Optimization (Google SEO + AI / GEO)

### 1. Generative Engine Optimization (GEO) & Featured Snippets
* **Direct Answer Formula:** Start key sections with a 40–60 word declarative statement answering the question directly before expanding.
* **Structured Data Tables:** Use Markdown tables comparing skills, salaries, tools, and timelines. AI models parse tables with high citation priority.
* **Q&A Headings:** Phrase subheadings as natural language questions (matching Google "People Also Ask").

### 2. Google E-E-A-T (Experience, Expertise, Authoritativeness, Trust)
* **Concrete Examples:** Include real code snippets, calculations, formulas, or step-by-step case studies rather than vague generalizations.
* **Structured FAQ:** Every post frontmatter must have 3–5 high-volume PAA questions with concise 40–80 word answers for `FAQPage` schema.
* **Author Attribution:** Set `authorSlug: teyro-team` for verified author metadata.

---

## 🔗 Internal Linking Mesh Rules

Every new post must maintain healthy link equity:
1. **Link to 2–4 Related Blog Posts:** E.g., link to `/blog/best-skills-to-learn-in-2026`, `/blog/duolingo-for-python`, `/blog/how-to-improve-our-learning-skill`.
2. **Link to Core App Features:** Link naturally to `/onboarding/0` (Onboarding), `/explore` (Course Catalog), or specific interactive tool pages.
3. **Descriptive Anchor Text:** Never use generic "click here". Use keyword-rich anchors like `[Duolingo for Python](/blog/duolingo-for-python)` or `[spaced repetition techniques](/blog/spaced-repetition-how-to-study-smarter)`.

---

## 📋 Complete MDX Frontmatter Template

Save every post as `frontend/content/blog/<keyword-slug>.mdx`:

```mdx
---
title: "Catchy Keyword-Frontloaded Title Under 60 Chars"
description: "High-CTR meta description between 145-158 characters containing the primary keyword and a clear value proposition."
publishedDate: "2026-09-01"
updatedDate: "2026-09-01"
category: skill-building                       # study-techniques | language-learning | productivity-focus | ai-learning | exam-prep | skill-building
tags: [primary keyword, secondary keyword, related entity]
authorSlug: teyro-team
draft: false
cta:
  title: "Level Up Your Skills 15 Minutes a Day"
  text: "Master in-demand skills through bite-sized interactive quests, streaks, and leaderboards on Teyro."
  href: /onboarding/0
  label: "Start Learning for Free"
faq:
  - question: "High-volume People Also Ask question?"
    answer: "Direct 40-70 word answer directly addressing the query for Google snippet and AI extraction."
  - question: "Second related question?"
    answer: "Direct 40-70 word answer with clear factual precision."
---

Opening hook addressing the primary keyword immediately. Introduce [Teyro](/onboarding/0) within the first two paragraphs as the gamified 15-minute daily solution.

---

## Direct Answer: [Topic] at a Glance (40-60 Word Snippet + Table)

[Direct answer text for Google AI Overviews]

| Category | Skills / Tools | Time to Learn | Outcome |
| :--- | :--- | :--- | :--- |
| **Pillar 1** | Example tools | 2–4 weeks | Practical result |

---

## [H2 Section 1: In-Depth Breakdown]

Detailed, authoritative explanations with code blocks, real-world examples, and internal links to related guides like [related post](/blog/slug).

---

## Duolingo-Style Roadmap: Master [Topic] in 15 Minutes a Day

```
[Level 1: Novice (0–500 XP)]    ──> 15 min daily micro-lessons + Syntax drills
               │
               ▼
[Level 2: Builder (500–1500 XP)] ──> Real-world mini projects + Daily Streaks
               │
               ▼
[Level 3: Pro (1500+ XP)]        ──> Portfolio deployment & client acquisition
```

---

## The Bottom Line

Final wrap-up summarizing the main takeaway and encouraging the reader to start their daily streak today.
```

---

## ✅ Pre-Publish Quality Checklist
- [ ] Primary keyword is in the URL slug, Title Tag, Meta Description, H1, and first 100 words.
- [ ] Word count meets or exceeds **1,500 words**.
- [ ] Early Teyro hook links to `[Teyro](/onboarding/0)` in the opening introduction.
- [ ] Frontmatter `cta.href` points to `/onboarding/0`.
- [ ] At least 1 comparison table and 1 Duolingo-style ASCII Skill Roadmap included.
- [ ] 3–5 FAQ items included in frontmatter for Google FAQ Schema.
- [ ] At least 2–4 contextual internal links to other blog posts.
- [ ] Verified valid category in `frontend/lib/blog/categories.ts`.
