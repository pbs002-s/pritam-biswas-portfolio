<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=20&duration=2600&pause=900&color=00E559&center=true&vCenter=true&width=560&height=30&lines=%3E+booting+pritam_console...;%3E+loading+modules%3A+react%2C+vite%2C+tailwind;%3E+render+engine%3A+framer-motion;%3E+status%3A+ONLINE_" alt="terminal boot animation" />

<br/>

<img src="https://img.shields.io/badge/STATUS-ONLINE-00E559?style=flat-square&labelColor=09090b" alt="status" />
<img src="https://img.shields.io/badge/BUILD-VITE_6-09090b?style=flat-square&labelColor=09090b&color=1A1B1E&logo=vite&logoColor=00E559" alt="vite" />
<img src="https://img.shields.io/badge/UI-REACT_19-09090b?style=flat-square&labelColor=09090b&color=1A1B1E&logo=react&logoColor=38BDF8" alt="react" />
<img src="https://img.shields.io/badge/LANG-TYPESCRIPT-09090b?style=flat-square&labelColor=09090b&color=1A1B1E&logo=typescript&logoColor=38BDF8" alt="typescript" />
<img src="https://img.shields.io/badge/STYLE-TAILWIND_CSS-09090b?style=flat-square&labelColor=09090b&color=1A1B1E&logo=tailwindcss&logoColor=00E559" alt="tailwind" />
<img src="https://img.shields.io/badge/DEPLOY-NETLIFY-09090b?style=flat-square&labelColor=09090b&color=1A1B1E&logo=netlify&logoColor=00E559" alt="netlify" />

<h1>PRITAM_BISWAS<span style="color:#00E559">_</span></h1>
<p><code>CSE_CONSOLE // PORTFOLIO_v1.0.4</code></p>

<a href="https://pritam-biswas-portfolio.netlify.app/"><b>→ LIVE_DEMO</b></a>
&nbsp;·&nbsp;
<a href="#getting-started"><b>RUN_LOCALLY</b></a>
&nbsp;·&nbsp;
<a href="#connect"><b>CONNECT</b></a>

</div>

<br/>

## `> overview`

A dark, minimal, terminal-inspired portfolio console — built as a node-based interface rather than a scrolling landing page. Every section (Home, About, Projects, Achievements, Contact) is a "module" you jump into from a persistent system sidebar, styled like an engineering dashboard: monospace labels, live status dots, animated skill meters, and a rotating typing tagline.

No templated hero banners, no stock gradients — just a black-and-green console built around one idea: **treat a portfolio like a running system, not a brochure.**

<br/>

<!--
  📸 ADD PREVIEW HERE
  Drop a screen recording or screenshot at: docs/preview.gif
  then uncomment the line below.
  <div align="center"><img src="docs/preview.gif" width="90%" alt="portfolio preview" /></div>
-->

<br/>

## `> features`

- **System-console navigation** — persistent sidebar + floating dock, active module highlighted in signal green
- **Typing identity line** — rotating role tagline (`App Developer` → `AI Explorer` → `Cyber Security Learner` ...) with a live blinking cursor
- **Animated skill meters** — proficiency bars that fill on module entry, not on page load
- **Console gallery** — multi-portrait slideshow styled as a tracked camera feed (`TRACKING_OK` / frame labels)
- **Live project modules** — expandable cards for each build, tagged by stack
- **Achievements board** — certificate/recognition grid with authority tags
- **One-click contact** — copy-to-clipboard email, direct links to GitHub, LeetCode, Codeforces, Facebook, Instagram
- **Fully responsive** — sidebar collapses to a mobile drawer, grid reflows down to a single column

<br/>

## `> stack`

| Layer | Choice |
|---|---|
| Framework | React 19 + Vite 6 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Motion | Framer Motion (`motion`) |
| Routing | React Router 7 |
| Icons | Lucide React |
| Fonts | Inter (UI) · JetBrains Mono (system/labels) |
| Deploy | Netlify |

<br/>

## `> design tokens`

<div align="center">

| Token | Value | |
|---|---|---|
| `background` | `#09090B` | ⬛ |
| `surface` | `#1A1B1E` | ◼ |
| `primary` | `#00E559` | 🟩 |
| `accent` | `#38BDF8` | 🟦 |
| `text-primary` | `#FFFFFF` | ⬜ |
| `text-secondary` | `#A1A1AA` | ◻ |
| `border` | `#27272A` | ▪ |

Radius: `20px` cards/controls · `9999px` pills — spacing base `8px`

</div>

<br/>

## `> module map`

Site structure mirrors the actual sidebar — Home is the hub every other module branches from:

```mermaid
flowchart LR
    H((HOME)) --> A[ABOUT]
    H --> P[PROJECTS]
    H --> AC[ACHIEVEMENTS]
    H --> C[CONTACT]
    P -.-> C
    AC -.-> C

    style H fill:#00E559,stroke:#09090b,color:#09090b
    style A fill:#1A1B1E,stroke:#27272A,color:#fff
    style P fill:#1A1B1E,stroke:#27272A,color:#fff
    style AC fill:#1A1B1E,stroke:#27272A,color:#fff
    style C fill:#1A1B1E,stroke:#27272A,color:#fff
```

<br/>

## `> stack composition`

```mermaid
pie showData
    title core dependencies (illustrative)
    "React + Router" : 35
    "Tailwind CSS" : 25
    "Framer Motion" : 20
    "Lucide Icons" : 10
    "TypeScript config" : 10
```

<br/>

## `> getting started`

**Prerequisites:** Node.js ≥ 18

```bash
# clone
git clone https://github.com/pbs002-s/pritam-biswas-portfolio.git
cd pritam-biswas-portfolio

# install
npm install

# run dev server
npm run dev

# production build
npm run build
npm run preview
```

<br/>

## `> project structure`

```
├── src/
│   ├── assets/images/       portrait & media assets
│   ├── components/
│   │   ├── Navigation.tsx   sidebar + mobile drawer
│   │   └── TerminalPanel.tsx
│   ├── pages/
│   │   └── Home.tsx
│   ├── data.ts               all real content — identity, projects, achievements
│   ├── types.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vite.config.ts
└── netlify.toml
```

<br/>

## `> connect`
<a id="connect"></a>

<p align="center">
<a href="mailto:pritam020s2@gmail.com"><img src="https://img.shields.io/badge/EMAIL-09090b?style=for-the-badge&logo=gmail&logoColor=00E559" /></a>
<a href="https://github.com/pbs002-s"><img src="https://img.shields.io/badge/GITHUB-09090b?style=for-the-badge&logo=github&logoColor=ffffff" /></a>
<a href="https://leetcode.com/u/Pritam_002"><img src="https://img.shields.io/badge/LEETCODE-09090b?style=for-the-badge&logo=leetcode&logoColor=FFA116" /></a>
<a href="https://codeforces.com/profile/Pritam-580"><img src="https://img.shields.io/badge/CODEFORCES-09090b?style=for-the-badge&logo=codeforces&logoColor=1F8ACB" /></a>
</p>

<p align="center">
<a href="https://www.facebook.com/pbs.020"><img src="https://img.shields.io/badge/FACEBOOK-09090b?style=for-the-badge&logo=facebook&logoColor=1877F2" /></a>
<a href="https://www.instagram.com/swagoto_pritom"><img src="https://img.shields.io/badge/INSTAGRAM-09090b?style=for-the-badge&logo=instagram&logoColor=E4405F" /></a>
</p>

<br/>

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=500&size=14&duration=3000&pause=1200&color=A1A1AA&center=true&vCenter=true&width=460&height=24&lines=%22consistency+beats+talent+when+talent+doesn%27t+work+consistently.%22" alt="closing line" />

<br/><br/>

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=14&duration=2000&pause=99999&color=27272A&center=true&vCenter=true&width=300&height=20&lines=%3E+connection_terminated._" alt="shutdown" />

</div>
