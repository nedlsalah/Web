# NEDLSALAH — Personal Website

Bilingual (English / Arabic) personal website for NEDLSALAH — Digital Marketing Specialist,
Web Developer & Designer. Static HTML/CSS/JS with **no build step required** to run, deploy or
edit. Designed as a single homepage plus four articles, two legal pages and a custom 404.

- **Live base URL (deployment target):** `https://nedlsalah.github.io/nwebsite/`
- **License:** Apache License 2.0 (see `LICENSE`)

---

## 1. Contents

```
NEDLSALAH-Website/
├── index.html                 # Homepage (hero + 8 numbered sections)
├── 404.html                   # Custom not-found page (GitHub Pages serves it for any URL)
├── robots.txt                 # Crawl rules + sitemap pointer
├── sitemap.xml                # 7 URLs, lastmod 2026-10-08
├── README.md                  # This file
├── LICENSE                    # Apache 2.0
├── css/
│   └── styles.css             # All styles (dark/light themes, EN/AR + RTL, responsive)
├── js/
│   ├── i18n.js                # All EN + AR strings (data-i18n / data-i18n-aria dictionaries)
│   ├── site.js                # Shared: language, theme, menu, reveals, cursor, motion
│   ├── home.js                # Homepage-only: typing line, services, work filters
│   └── enhance.js             # Homepage motion enhancement (loaded after vendor libs)
├── articles/
│   ├── digital-presence.html
│   ├── wordpress-landing-pages.html
│   ├── content-systems.html
│   └── seo-basics.html
├── legal/
│   ├── privacy-policy.html
│   └── terms-of-use.html
├── fonts/                     # Self-hosted woff2 (Bricolage Grotesque, Geist, IBM Plex Sans Arabic)
├── img/                       # Photos, work cards, article/OG images, favicons (img/favicon/)
└── vendor/                    # gsap, ScrollTrigger, lenis, split-type (local, no CDN)
```

Homepage sections, in order: Hero → Services (01) → Selected Work (02) → About (03) →
Process (04) → Professional Experience (05) → Skills & Toolkit (06) → Certifications
(07) → Contact (08) → Footer. The same 01–08 numbering is used in the desktop
navigation and the mobile menu. There is **no blog/insights section** on the homepage; the four
articles remain published at their stable URLs under `articles/` (still in `sitemap.xml` and
linked from `404.html`).

## 2. Running locally

Any static file server works. Because `404.html` uses root-absolute `/nwebsite/…` links (it is
served for URLs at *any* depth), a server that mirrors the GitHub Pages mount point behaves
exactly like production:

```
<server-root>/nwebsite/  →  this folder
```

Opening `index.html` directly from disk also works; only deep-URL 404 behaviour needs a server.

## 3. Deployment (GitHub Pages)

Upload the folder contents as-is (repo `nwebsite`, branch `main`, `/root`). Every internal link
is **relative**, so the site also works from any sub-path. `404.html` is the exception: it uses
`/nwebsite/`-prefixed links on purpose, because GitHub Pages can serve it under arbitrarily deep
URLs where relative links would resolve incorrectly.

`sitemap.xml` and `robots.txt` reference the canonical host
`https://nedlsalah.github.io/nwebsite/`; update them if the domain changes.

## 4. Contact — email only (no form)

There is **no contact form** by design. Every contact path points straight at the address:

- the large `nedlsalah@gmail.com` link in the Contact section,
- the **Send Email** button (`mailto:` with no pre-filled subject),
- the email tile, footer and mobile-menu links.

All of them open the visitor's own email app addressed to `nedlsalah@gmail.com`. Nothing on the
page ever claims a message was "sent" — nothing is submitted anywhere, so no submission can fail
silently. To change the address, search-and-replace `nedlsalah@gmail.com` across the shipped
files (`index.html` and `js/i18n.js`). There are no secrets in client code; the site ships no
server-side code at all.

## 5. Language, theme and motion

- **EN / AR toggle** (`EN / AR` button) switches `lang` and `dir` while staying on the current
  page and keeping your theme; **theme toggle** switches dark/light; **motion toggle** in the
  footer disables all animation.
- Preferences persist in `localStorage` (`site-lang`, `site-theme`, `site-motion-v2`) and are
  applied by a small pre-paint script in `<head>`, so there is no flash of wrong theme/language.
- Arabic uses full RTL with CSS logical properties throughout (no `left/right` shortcuts in
  layout), self-hosted Arabic type, and Arabic numerals in article reading-time text.
- Without JavaScript the site renders fully readable (reveal animations only apply when the
  `fx` class is present) — JS adds motion, it does not gate content.

## 6. Content sources and documented discrepancies

The **CV is the source of truth** for facts. Nothing was invented: no fabricated awards, stats,
testimonials, clients or dates anywhere on the site.

- **Professional Experience shows 10 numbered highlights**, introduced by the line "A consistent
  history of results across UAE agencies and corporate environments." These are statements of
  work performed (social strategy, short-form video/Reels, Meta + Google Ads, design
  collaboration, WordPress builds, client requirements, brand identity refresh, SEO, end-to-end
  delivery) — not roles with invented dates. The role-by-role history (CV: MIP Agency
  05/2025–present, Maven Agency 08/2024–04/2025, Al Afiya Group 11/2021–07/2024, Freelance
  08/2019–10/2021; brief only: Kiatoo 04/2021–05/2021, Noroda Media 12/2020–03/2021, freelance
  overlapping both) is documented here rather than displayed, because the brief replaced the
  dated timeline. Nothing was invented for either version.
- **Certifications match the CV exactly** — 5 certificates (Google 2021, Udacity
  2020, OpenClassrooms 2020, Coursera 2019, Microsoft 2019). The 2 education entries
  (Associate Degree in Software Development, 2019; High School Diploma — Science, 2014)
  were removed from the site at the owner's request and are documented here instead.
- **The voice is first person, singular, everywhere** ("I", never "we") — this is a solo
  practice, as requested by the owner. The hero introduction is the owner-supplied CV
  summary (7+ years across agency, in-house and freelance roles in the UAE; Meta Ads and
  Google Ads; WordPress and landing pages; short-form video, photography and graphic
  content; on-page SEO and early-stage AEO; AI tools for ideation and copywriting).
- **Selected Work:** 7 project cards link to live sites (sanhansoiree.com, avenirenergy.me,
  riskonex.com, nobilis-premier.com, hakimacoaching.com, fincastra.com, napa.ae) and 3 outbound
  portfolio cards — **Photography** (`photos.app.goo.gl/fsxX5cDCLViCtxLZ7`), **Video**
  (`photos.app.goo.gl/USEzX2LLwj4FP4Q19`) and **Graphic Design** (`behance.net/nedlsalah`) —
  with matching All / Websites / Design / Photography / Video filters.
- **Reading times are computed, not guessed** — from the actual word counts of each article
  (200 wpm English, 180 wpm Arabic, rounded to the nearest minute) and kept in sync between the
  article pages and the homepage cards.
- **Intentionally not published:** the CV phone number (on file with the owner, never published
  to this repository) and the certification badge PDF. Only the email address
  (`nedlsalah@gmail.com`) is public.
- The original site description mentioned "7+ years"; this is consistent with the CV timeline
  (first role 08/2019) and is used unchanged.

## 7. SEO & structured data

Every page has its own `<title>` and meta description in **both languages** (switched with the
language toggle), a canonical URL under `https://nedlsalah.github.io/nwebsite/`, Open Graph +
Twitter tags (article pages use their own `img/article-*.png`), and JSON-LD:
`Person` + `WebSite` on the homepage, `BlogPosting` on each article, `WebPage` on legal pages.
`sitemap.xml` lists the 7 indexable URLs; `robots.txt` allows crawling and points at the sitemap;
`404.html` carries `noindex`.

## 8. Accessibility (WCAG 2.2 AA)

- Text/background contrast verified programmatically in dark **and** light themes, English and
  Arabic (45+ pairs per combination) — all pass AA. Brand accent: cyan `#3cc1da` (dark) /
  teal `#0e7488` (light); there are no gold/yellow colours anywhere in the UI.
- One `h1` per page, no heading-level jumps, no duplicate IDs, every image has `alt`, every
  button has an accessible name; the page has no form controls (contact is `mailto:` links).
- Full keyboard support: skip link, visible focus rings, hamburger with `aria-expanded`,
  menu `inert` when closed, `aria-pressed` on filters.
- All interactive targets ≥ 24 px (WCAG 2.2 SC 2.5.8); smallest text ≥ 11.5 px.
- Motion can be turned off globally; language state announced via `lang`/`dir` attributes.

## 9. Testing performed (2026-10-08)

All tests were run locally against a server that mirrors the GitHub Pages `/nwebsite/` mount.

| Suite | Result |
|---|---|
| Playwright functional suite (7 pages + deep 404) | **142 / 142 checks passed** — no console errors, EN↔AR + theme switching with persistence, all 4 article URLs → HTTP 200, 10 work cards + 5 filters with `aria-pressed`, contact verified as email-only (`mailto:` to `nedlsalah@gmail.com`, no form, no "sent" claims), keyboard/menu behaviour, nav numbering 01–08, `noopener` on all `target="_blank"`, hero lead = owner's CV summary, first-person voice (no "we"), no Education block |
| Responsive matrix (3 pages × EN/AR × 1440/1280/768/390/320 px) | **No horizontal overflow in any of the 30 combinations** |
| 404 behaviour | Deep missing URL → HTTP 404, styled page, `noindex`, links stay under `/nwebsite/` |
| Accessibility audit (contrast, tap targets, images, IDs, headings, labels, alt, font sizes, nav overlap) | **PASS**, dark + light + Arabic |
| Lighthouse — homepage (mobile, simulated throttling, local server) | Performance **91** (two runs), Accessibility **100**, Best Practices **100**, SEO **100** — CLS 0, TBT 0 ms, LCP 3.4 s (the long owner-supplied hero lead is the LCP text) |
| Lighthouse — article page (same conditions) | Performance **98**, Accessibility **100**, Best Practices **100**, SEO **100** — LCP 2.3 s, CLS 0 |

## 10. Limitations (stated honestly)

- **There is no form and no mail backend.** Contact happens through `mailto:` links to
  `nedlsalah@gmail.com`; whether a visitor's mail arrives depends on their own email client, as
  with any mailto link.
- The two portfolio links are **Google Photos album links** (`photos.app.goo.gl/…`). They were
  supplied by the site owner; the album contents and their long-term availability are outside
  this repository's control.
- Lighthouse was run on **localhost**, not the production URL — compression, cache headers and
  CDN behaviour (flagged by Lighthouse) are provided by GitHub Pages and cannot be measured here.
  Homepage performance scored 91 across two throttled runs (run-to-run variance on localhost).
- CSS/JS are shipped **unminified on purpose** so the site can be edited directly; the Lighthouse
  "minify" flags are advisory.
- Browser testing used **Chromium (Playwright)** only; other engines were not exercised.
- Translations live in `js/i18n.js`; adding a new string requires adding it to *both* the `en`
  and `ar` dictionaries (the build validation used during development checks this).

## 11. Editing cheat-sheet

- **Homepage copy:** `index.html` (each translatable element carries `data-i18n="key"`).
- **Arabic text:** `js/i18n.js` — find the same key under `ar:`.
- **Articles / legal pages:** plain HTML in `articles/` and `legal/`; each page contains both
  languages (`.langblock` swap on legal/article pages).
- **Contact address:** search-and-replace `nedlsalah@gmail.com` in `index.html` (mailto links)
  — there is no form or endpoint to configure.
- **Colours / fonts:** CSS custom properties at the top of `css/styles.css`
  (`:root[data-theme=dark]` — `#0d0d0f` background with cyan `#3cc1da` accent; light theme:
  `#f4f1ea` with teal `#0e7488`). The page scrollbar follows the brand accent
  (`scrollbar-color` + `::-webkit-scrollbar`, same block).
- **New work card:** copy an existing `.wk-card` block and set `data-cat` to `web`, `design`,
  `photo` or `video` so the filters pick it up.
