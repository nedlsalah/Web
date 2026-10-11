# NEDLSALAH — Personal Website

Bilingual (English / Arabic) personal website for NEDLSALAH — Digital Marketing Specialist,
Web Developer & Designer. Static HTML/CSS/JS with **no build step required** to run, deploy or
edit. Designed as a single homepage plus four articles, two legal pages and a custom 404.

- **Live base URL (deployment target):** `https://nedlsalah.github.io/web/`
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
  (`:root[data-theme=dark]` — `#0d0d0f` background with cyan `#3cc1da` accent; light theme:
  `#f4f1ea` with teal `#0e7488`). The page scrollbar follows the brand accent
  (`scrollbar-color` + `::-webkit-scrollbar`, same block).
- **New work card:** copy an existing `.wk-card` block and set `data-cat` to `web`, `design`,
  `photo` or `video` so the filters pick it up.
