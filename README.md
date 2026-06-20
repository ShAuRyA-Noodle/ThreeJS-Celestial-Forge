<div align="center">

# 🥛 ThreeJS Celestial Forge · SPYLT

**A scroll-driven, cinematic landing-page experience. A pixel-faithful recreation of the Awwwards SOTD winning site for SPYLT, fused with a Three.js WebGL hero and GSAP scroll storytelling.**

[![Three.js](https://img.shields.io/badge/Three.js-r128-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![CodeQL](https://img.shields.io/badge/CodeQL-security--extended-2088FF?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ShAuRyA-Noodle/ThreeJS-Celestial-Forge/actions)

[📁 Source Code](https://github.com/ShAuRyA-Noodle/ThreeJS-Celestial-Forge) &nbsp;·&nbsp;
[🐛 Report Bug](https://github.com/ShAuRyA-Noodle/ThreeJS-Celestial-Forge/issues) &nbsp;·&nbsp;
[✨ Request Feature](https://github.com/ShAuRyA-Noodle/ThreeJS-Celestial-Forge/issues)

</div>

---

## 📖 Table of Contents

- [✨ About The Project](#-about-the-project)
- [🎯 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔒 Security](#-security)
- [🙏 Acknowledgements](#-acknowledgements)
- [👨‍💻 Author](#-author)

---

## ✨ About The Project

> *"Live life to the fullest. Shatter boredom and embrace your inner kid."* (SPYLT)

This project is a creative front-end build that recreates the award-winning [SPYLT](https://spylt.com) website, a lactose-free, protein-packed, caffeinated chocolate milk brand that won **Awwwards Site of the Day (SOTD)**.

It was built as a deep-dive learning exercise in real-time web rendering and motion design. The shipped page is a single, hand-tuned HTML build that drives a **Three.js WebGL hero** (particle fields and a procedurally lit can), **GSAP ScrollTrigger** scroll choreography, clip-path section transitions, and **Lenis** smooth scrolling. A parallel **React + Vite** component tree lives under `src/` as a structured reference implementation of the same sections.

### 🏆 About the Original Brand

| | |
|---|---|
| 🗓️ Founded | 2022, Lehi, Utah, USA |
| 👤 Founder | Josh Mendenhall |
| 🏆 Won | New York MilkLaunch 2022 Competition |
| 🤝 Acquired by | Built Brands |
| 🌐 Website Award | Awwwards Site of the Day |
| 🛒 Available at | Kroger, Albertsons, H-E-B |
| 💪 Protein | 20g per can |
| ⚡ Caffeine | 60mg standard, 140mg Max |
| 🍫 Flavours | Chocolate, Strawberry, Cookies & Cream |

---

## 🎯 Features

```text
✅  Three.js WebGL hero with particle fields and lit geometry
✅  GSAP ScrollTrigger-powered scroll animations
✅  Lenis smooth-scroll integration
✅  Clip-path geometric section transitions
✅  Scroll-driven text reveal effects
✅  Bold, cinematic full-viewport sections
✅  Interactive product showcase
✅  Optimised images and videos in /public
✅  React + Vite component reference under src/
✅  Clean, section-based architecture
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| 🌌 **3D / WebGL** | Three.js r128 | Real-time hero rendering |
| 🎬 **Animation** | GSAP 3 + ScrollTrigger | Cinematic scroll motion |
| 🪶 **Smooth Scroll** | Lenis | Inertial scrolling |
| ⚛️ **Framework** | React 19 | Component reference tree |
| ⚡ **Build Tool** | Vite 6 | Dev server and bundler |
| 🎨 **Styling** | Tailwind CSS v4 | Utility-first styling |
| 📱 **Responsive** | react-responsive | Breakpoint handling |
| 🚀 **Deployment** | Vercel | Edge-optimised hosting |

---

## 📁 Project Structure

```text
SPLYT/
│
├── 📄 index.html                # Shipped build: Three.js + GSAP + Lenis hero page
├── 📄 vite.config.js            # Vite + Tailwind configuration
├── 📄 eslint.config.js          # ESLint rules
├── 📄 package.json              # Dependencies and scripts
│
├── 📂 public/                   # Static assets (fonts, images, videos)
│
└── 📂 src/                       # React + Vite reference implementation
    ├── 📄 main.jsx              # React DOM entry point
    ├── 📄 App.jsx               # Root component and layout
    ├── 📄 index.css             # Global styles and CSS variables
    │
    ├── 📂 components/           # Reusable UI building blocks
    │   ├── ClipPathTitle.jsx
    │   ├── FlavourSlider.jsx
    │   ├── FlavourTitle.jsx
    │   ├── Navbar.jsx
    │   └── VideoPin.jsx
    │
    ├── 📂 sections/             # Full-page scroll sections
    │   ├── BenefitSection.jsx
    │   ├── FlavourSection.jsx
    │   ├── FooterSection.jsx
    │   ├── HeroSection.jsx
    │   ├── MessageSection.jsx
    │   ├── NutritionSection.jsx
    │   └── TestimonialSection.jsx
    │
    └── 📂 constants/            # Site-wide content and data
```

---

## 🚀 Getting Started

### Prerequisites

You will need Node.js and npm installed on your local machine.

```bash
node  >= 18.0.0
npm   >= 9.0.0
```

### Install and Run

```bash
# 1. Clone the repository
git clone https://github.com/ShAuRyA-Noodle/ThreeJS-Celestial-Forge.git

# 2. Enter the app directory
cd ThreeJS-Celestial-Forge/SPLYT

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev

# 5. Build for production
npm run build

# 6. Preview the production build
npm run preview
```

The CDN scripts in `index.html` (GSAP, ScrollTrigger, Three.js, Lenis) are pinned with Subresource Integrity (SRI) hashes, so they are verified at load time.

---

## 🔒 Security

- **CodeQL** `security-extended` runs on every push, pull request, and weekly.
- **Dependabot** weekly updates, with `semver-major` bumps held for manual review.
- **SRI** on all third-party CDN scripts.
- Branch protection on `main`: required CodeQL check, linear history, no force-push, no deletion.

See [SECURITY.md](SECURITY.md) for the disclosure policy.

---

## 🙏 Acknowledgements

| Resource | Purpose |
|---|---|
| [SPYLT](https://spylt.com) | Original brand and design |
| [Awwwards](https://awwwards.com) | Design recognition |
| [Three.js](https://threejs.org/docs) | WebGL rendering |
| [GSAP](https://gsap.com/docs) | Animation engine |
| [Lenis](https://lenis.darkroom.engineering) | Smooth scrolling |
| [Codrops](https://tympanus.net/codrops) | Frontend inspiration |
| [Frontend Horse](https://frontend.horse) | Creative breakdowns |

---

## 👨‍💻 Author

**Shaurya Punj**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/shaurya-punj-2287513b3/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ShAuRyA-Noodle)

<div align="center">

> ⚠️ **Disclaimer:** Educational purposes only. All brand assets and original design belong to **SPYLT / Built Brands**. Not an official SPYLT product.

**Found this helpful? Drop a ⭐, it genuinely means a lot.**

*Made with care and way too much chocolate milk 🥛*

</div>
