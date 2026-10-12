# NEDLSALAH — Personal Website

Bilingual (English / Arabic) personal website for NEDLSALAH — Digital Marketing Specialist,
Web Developer & Designer. Static HTML/CSS/JS with **no build step required** to run, deploy or
edit. Designed as a single homepage, two legal pages and a custom 404.

- **Live base URL (deployment target):** `https://nedlsalah.github.io/Web/`
- **License:** Apache License 2.0 (see `LICENSE`)

---

## 1. Contents

```
NEDLSALAH-Website/
├── index.html                 # Homepage (hero + 8 numbered sections)
├── 404.html                   # Custom not-found page (GitHub Pages serves it for any URL)
├── robots.txt                 # Crawl rules + sitemap pointer
├── sitemap.xml                # 3 URLs, lastmod 2026-10-12
├── README.md                  # This file
├── LICENSE                    # Apache 2.0
├── css/
│   └── styles.css             # All styles (dark/light themes, EN/AR + RTL, responsive)
├── js/
│   ├── i18n.js                # All EN + AR strings (data-i18n / data-i18n-aria dictionaries)
│   ├── site.js                # Shared: language, theme, menu, reveals, cursor, motion
│   ├── home.js                # Homepage-only: typing line, services, work filters
│   └── enhance.js             # Homepage motion enhancement (loaded after vendor libs)
├── legal/
│   ├── privacy-policy.html
│   └── terms-of-use.html
├── fonts/                     # Self-hosted woff2 (Bricolage Grotesque, Geist, IBM Plex Sans Arabic)
├── img/                       # Photos, work cards (img/work/), OG image, favicons (img/favicon/)
└── vendor/                    # gsap, ScrollTrigger, lenis, split-type (local, no CDN)
```

Homepage sections, in order: Hero → Services (01) → Selected Work (02) → About (03) →
Process (04) → Professional Experience (05) → Skills & Toolkit (06) → Certifications
(07) → Contact (08) → Footer. The same 01–08 numbering is used in the desktop
navigation and the mobile menu. There is **no blog/insights section**: the four article
pages that once existed under `articles/`, together with their images, have been removed,
so the site is now the homepage, the two legal pages and the custom 404.

## 2. Running locally

Any static file server works. Because `404.html` uses root-absolute `/Web/…` links (it is
served for URLs at *any* depth), a server that mirrors the GitHub Pages mount point behaves
exactly like production:

```
<server-root>/Web/  →  this folder
```

Opening `index.html` directly from disk also works; only deep-URL 404 behaviour needs a server.

## 3. Deployment (GitHub Pages)

Upload the folder contents as-is (repo `Web`, branch `main`, `/root`). Every internal link
is **relative**, so the site also works from any sub-path. `404.html` is the exception: it uses
`/Web/`-prefixed links on purpose, because GitHub Pages can serve it under arbitrarily deep
URLs where relative links would resolve incorrectly.

`sitemap.xml` and `robots.txt` reference the canonical host
`https://nedlsalah.github.io/Web/`; update them if the domain changes.

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
  layout) and self-hosted Arabic type.
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
  practice, as requested by the owner. The hero introduction is the owner-supplied summary:
  "Digital Marketing Specialist and Web Developer with 7+ years of experience in digital
  advertising, WordPress development, SEO, content creation, photography, and video production.
  Skilled in Meta and Google Ads, AI-powered content creation, and delivering projects from
  concept to completion."
- **Selected Work:** 7 project cards link to live sites (sanhansoiree.com, avenirenergy.me,
  riskonex.com, nobilis-premier.com, hakimacoaching.com, fincastra.com, napa.ae) and 3 outbound
  portfolio cards — **Photography** (`photos.app.goo.gl/fsxX5cDCLViCtxLZ7`), **Video**
  (`photos.app.goo.gl/USEzX2LLwj4FP4Q19`) and **Graphic Design** (`behance.net/nedlsalah`) —
  with matching All / Websites / Design / Photography / Video filters. All three portfolio cards
  now carry a cover image (`img/work/behance.webp`, `img/work/photography.webp`,
  `img/work/video.webp`), taken from the owner's own public portfolio pages.
- **No blog/articles section.** The four article pages and their images were removed at the
  owner's request; their old URLs now return the custom 404, and `sitemap.xml` lists only the
  homepage and the two legal pages.
- **Intentionally not published:** the CV phone number (on file with the owner, never published
  to this repository) and the certification badge PDF. Only the email address
  (`nedlsalah@gmail.com`) is public.
- The original site description mentioned "7+ years"; this is consistent with the CV timeline
  (first role 08/2019) and is used unchanged.

## 7. SEO & structured data

Every page has its own `<title>` and meta description in **both languages** (switched with the
language toggle), a canonical URL under `https://nedlsalah.github.io/Web/`, Open Graph +
Twitter tags, and JSON-LD: `Person` + `WebSite` on the homepage, `WebPage` on the legal pages.
`sitemap.xml` lists the 3 indexable URLs; `robots.txt` allows crawling and points at the sitemap;
`404.html` carries `noindex`.

## 8. Accessibility (WCAG 2.2 AA)

- Text/background contrast verified programmatically in dark **and** light themes, English and
  Arabic — 45 text/background pairs on the homepage and 12–13 on each inner page, all passing AA.
  Brand accent: cyan `#3cc1da` (dark) / teal `#0e7488` (light); there are no gold/yellow colours
  anywhere in the UI.
- One `h1` per page, no heading-level jumps, no duplicate IDs, every image has `alt`, every
  button has an accessible name; the page has no form controls (contact is `mailto:` links).
- Full keyboard support: skip link, visible focus rings, hamburger with `aria-expanded`,
  menu `inert` when closed, `aria-pressed` on filters.
- All interactive targets ≥ 24 px (WCAG 2.2 SC 2.5.8); smallest text ≥ 11.5 px.
- Motion can be turned off globally; language state announced via `lang`/`dir` attributes.

## 9. Testing performed (2026-10-12)

All tests were run locally against a server that mirrors the GitHub Pages `/Web/` mount.

| Suite | Result |
|---|---|
| Playwright functional suite (home + 2 legal pages + deep 404) | **126 / 126 checks passed** — no console errors, EN↔AR + theme switching with persistence, 10 work cards (all with cover images) + 5 filters with `aria-pressed`, contact verified as email-only (`mailto:` to `nedlsalah@gmail.com`, no form, no "sent" claims), keyboard/menu behaviour, nav numbering 01–08, `noopener` on all `target="_blank"`, hero lead = owner's summary, first-person voice (no "we"), no Education block |
| Responsive matrix (3 pages × EN/AR × 1440/1280/768/390/320 px) | **No horizontal overflow in any of the 30 combinations** |
| 404 behaviour | Deep missing URL → HTTP 404, styled page, `noindex`, links stay under `/Web/` |
| Article removal | The 4 old article URLs → HTTP 404; every `article-*` image file → HTTP 404 |
| `/Web/` re-base | No `/nwebsite/` reference in any shipped file; sitemap lists 3 URLs; canonical/OG use `/Web/` |
| Accessibility audit (contrast, tap targets, images, IDs, headings, labels, alt, font sizes, nav overlap) | **PASS**, dark + light + Arabic |
| Lighthouse — homepage (mobile, simulated throttling, local server) | Performance **94**, Accessibility **100**, Best Practices **100**, SEO **100** — LCP 2.9 s, CLS 0, TBT 0 ms |

## 10. Limitations (stated honestly)

- **There is no form and no mail backend.** Contact happens through `mailto:` links to
  `nedlsalah@gmail.com`; whether a visitor's mail arrives depends on their own email client, as
  with any mailto link.
- The three portfolio links point off-site — two **Google Photos album links**
  (`photos.app.goo.gl/…`) and the **Behance** profile. They were supplied by the site owner; the
  album contents and their long-term availability are outside this repository's control. The
  card cover images are the owner's own public profile/album cover art.
- Lighthouse was run on **localhost**, not the production URL — compression, cache headers and
  CDN behaviour (flagged by Lighthouse) are provided by GitHub Pages and cannot be measured here.
  Homepage performance scored 94 in the latest run (91–94 across rounds: run-to-run variance on
  localhost).
- CSS/JS are shipped **unminified on purpose** so the site can be edited directly; the Lighthouse
  "minify" flags are advisory.
- Browser testing used **Chromium (Playwright)** only; other engines were not exercised.
- Translations live in `js/i18n.js`; adding a new string requires adding it to *both* the `en`
  and `ar` dictionaries (the build validation used during development checks this).

## 11. Editing cheat-sheet

- **Homepage copy:** `index.html` (each translatable element carries `data-i18n="key"`).
- **Arabic text:** `js/i18n.js` — find the same key under `ar:`.
- **Legal pages:** plain HTML in `legal/`; each page contains both languages (`.langblock` swap).
- **Contact address:** search-and-replace `nedlsalah@gmail.com` in `index.html` (mailto links)
  — there is no form or endpoint to configure.
- **Colours / fonts:** CSS custom properties at the top of `css/styles.css`
  (`:root[data-theme=dark]` — `#0d0d0f` background with cyan `#3cc1da` accent; light theme:
  `#f4f1ea` with teal `#0e7488`). The page scrollbar follows the brand accent
  (`scrollbar-color` + `::-webkit-scrollbar`, same block).
- **New work card:** copy an existing `.wk-card` block, add a `16:10` image inside
  `<span class="wk-shot">…</span>` (e.g. a 1280×800 WebP in `img/work/`) and set `data-cat` to
  `web`, `design`, `photo` or `video` so the filters pick it up.
