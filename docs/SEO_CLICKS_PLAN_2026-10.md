# SEO clicks plan — from Search Console, 2026-10-25

Source: 3-month Performance export (24 Jul – 23 Oct 2026). 610 clicks, 96.3K impressions, 0.6% CTR, average position 8.9. Query and page lists are capped at 1,000 rows.

## What the data said
- `/blog/skill-meaning-in-hindi-and-types` is 21% of all impressions (20.6K) at 0.09% CTR. Dictionary intent, not learners. Do not expand this topic.
- The winners are one cluster, learning to code by playing: easy-python-games, computer-science-games, sql-games, duolingo-for-python, coding-games-for-beginners (about 160 clicks).
- Comparison pages convert best: mimo-alternatives 5.26%, brilliant-alternatives 2.12%.
- Many on-topic queries sit on pages 3–5 ("python game" pos 45, "coding games python" pos 52, "pluralsight alternatives" pos 71).
- Small-country local pages click at 5–15% (/teach/ai/tanzania, /teach/coding/cameroon, /learn-coding/ethiopia) on tiny impressions.
- Brand search is tiny: "teyro" 565 impressions, 8.85% CTR.
- The app is gated: blog CTAs go to the `/#launch` notify-me form, so the real conversion is a waitlist sign-up.

## Shipped (branch feat/seo-clicks-plan)
1. Query-matched titles and descriptions on 12 pages (atl-skills-guide, skill-meaning-in-hindi, udemy-for-students, is-udemy-certificate-valid, easy-python-games, sql-games, duolingo-for-python, coding-games-for-beginners, udemy-vs-coursera, sites-like-coursera, best-coding-youtube-channels, brilliant-app-alternatives).
2. New hub post `learn-python-by-playing-games`, plus "Keep learning" / "Compare your options" link blocks wiring the gaming, AI and platform-comparison clusters together. The brilliant blog post now links to the registry comparison pages instead of competing with them.
3. New `/alternatives/pluralsight-alternatives` and `/alternatives/teyro-vs-pluralsight` from the competitor registry.
4. Blog CTA clicks fire a PostHog `blog_cta_click` event and remember the post; the notify-me form stores it as the sign-up `source` (`blog:<slug>`, 40 chars max). Waitlist rows now show which post produced them.
5. IndexNow: `frontend/scripts/seo/indexnow.mjs` and key file in `frontend/public/`. llms.txt lists the new pages.

## Founder to-dos (cannot be done from the repo)
- **After the next production deploy:** `node frontend/scripts/seo/indexnow.mjs` (use `--dry` first).
- **Bing Webmaster Tools:** sign in, choose "Import from Google Search Console". No code needed. Bing's index feeds ChatGPT search and Copilot.
- **Search Console API key** for `frontend/scripts/seo/gsc-opportunities.mjs` (setup steps in its header) so this report runs weekly without CSV exports.
- **Decide on translations.** France (1,035 impressions), Germany (3,344 at position 4.5), Japan and Portugal are close. Needs locale routing and hreflang. Not started.

## Prune candidates (on-topic check before touching)
High impressions, almost no clicks, not about Teyro's subjects: microsoft-pm-resume-keywords-and-skills (2.8K), benefits-of-reading-communication-skills-social-engagement (2.3K), best-certification-courses-for-commerce-students, vfx-and-3d-animation-courses-fees-and-career-guide, best-product-management-courses-in-india, security-plus-certification, basic-computer-course-fees. `ed-tech-for-skill-development-and-soft-skills` has 12.9K impressions at position 3.2 with 0 clicks; the queries look synthetic, so leave it.

## Measure
Re-export Performance on 2026-11-22 and compare CTR on the 12 rewritten pages, the python-games cluster, and waitlist `source` values starting `blog:`.
