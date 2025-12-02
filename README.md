# Showcase Portfolio - Bor Klessens

Een moderne, interactieve portfolio website gebouwd met Next.js, TypeScript en Tailwind CSS. Deze website toont de projecten, vaardigheden en ervaring van een frontend developer.

## 🚀 Features

- **Responsive Design**: Volledig responsive voor alle schermformaten
- **Interactieve Animaties**: Typewriter effecten, hover animaties en scroll-gebaseerde animaties
- **Project Slider**: Interactieve slider met swipe, mouse drag en keyboard navigatie
- **Modern UI/UX**: Moderne design met purple/blue gradient thema
- **Performance**: Geoptimaliseerd met Next.js Image component en client-side rendering waar nodig

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12.23.24
- **React**: 19.2.0

## 📁 Project Structuur

```
ShowcasePortfolio/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Home pagina
│   ├── about/
│   │   └── page.tsx          # About pagina
│   ├── projects/
│   │   └── page.tsx         # Projects pagina
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
│
├── components/               # React componenten
│   ├── shared/              # Gedeelde componenten
│   │   ├── Header.tsx      # Navigatie header
│   │   ├── Footer.tsx       # Footer sectie
│   │   └── BackgroundParticles.tsx  # Achtergrond animatie
│   │
│   ├── home/                # Home pagina componenten
│   │   ├── HomeHero.tsx     # Hero sectie
│   │   └── HomeSkills.tsx   # Skills sectie
│   │
│   ├── about/               # About pagina componenten
│   │   ├── AboutHero.tsx    # Hero sectie
│   │   ├── AboutContent.tsx # About me content
│   │   └── AboutServices.tsx # Services sectie
│   │
│   └── projects/            # Projects pagina componenten
│       ├── ProjectsHero.tsx # Hero sectie
│       └── ProjectSlider.tsx # Project slider
│
└── public/                  # Statische assets
    ├── heroimg_quality.png  # Hero afbeelding
    ├── profile.png          # Profiel foto
    ├── fixtheux.png         # Project afbeeldingen
    ├── webdevelopment.png
    ├── webdevelopment3d.png
    └── icon*.png            # Icon afbeeldingen
```

## 🎨 Pagina's

### Home (`/`)
- Hero sectie met typewriter animatie
- Skills sectie met iconen
- Work/Projects sectie
- Work Experience timeline
- Contact sectie

### About (`/about`)
- Hero sectie met "ABOUT ME" titel
- About me content met profiel foto
- Services sectie met 3 service kaarten
- Contact informatie

### Projects (`/projects`)
- Hero sectie met "FRONT END DEVELOPER" titel
- Interactieve project slider met:
  - Swipe navigatie (touch)
  - Mouse drag navigatie
  - Keyboard navigatie (pijltjestoetsen)
  - Slide indicators
  - Project details (titel, beschrijving, tags, links)

## 🚦 Getting Started

### Vereisten

- Node.js 18+ 
- npm, yarn, pnpm of bun

### Installatie

1. Clone de repository:
```bash
git clone <repository-url>
cd ShowcasePortfolio
```

2. Installeer dependencies:
```bash
npm install
# of
yarn install
# of
pnpm install
```

3. Start de development server:
```bash
npm run dev
# of
yarn dev
# of
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in je browser

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build voor productie
- `npm run start` - Start productie server
- `npm run lint` - Run ESLint

## 🎯 Componenten Overzicht

### Shared Components

**Header**
- Navigatie met actieve pagina highlighting
- Taal switcher (NL/EN)
- Responsive design met mobile menu

**Footer**
- Contact informatie
- Navigatie links
- Social media links

**BackgroundParticles**
- Animated background particles
- Client-side rendering om hydration mismatches te voorkomen

### Home Components

**HomeHero**
- Typewriter animatie voor titel
- Floating animatie
- Text glow effect
- Call-to-action buttons

**HomeSkills**
- Skills sectie met iconen
- Hover animaties
- Scroll-based visibility

### About Components

**AboutHero**
- Hero sectie met typewriter effect
- "MY PROJECTS" button

**AboutContent**
- Profiel foto met hover effect
- About me tekst
- Contact informatie
- Download portfolio button

**AboutServices**
- 3 service kaarten (Web Development, Design, UI & UX Design)
- Hover animaties en effects

### Projects Components

**ProjectsHero**
- Hero sectie met typewriter animatie
- Wavy divider naar slider sectie

**ProjectSlider**
- Interactieve slider met meerdere projecten
- Touch, mouse en keyboard navigatie
- Smooth transitions en animaties
- Project details weergave

## 🎨 Styling

De website gebruikt Tailwind CSS voor styling met een custom color scheme:
- Primary: Purple (`#a855f7`, `#7c3aed`)
- Secondary: Blue (`#3b82f6`)
- Background: Black to Purple gradient

Custom fonts:
- Kanit (voor headings)
- JetBrains Mono (voor body tekst)

## 🔧 Development

### Code Structuur

De code is georganiseerd per pagina met componenten in aparte mappen:
- Elke pagina heeft zijn eigen componenten map
- Gedeelde componenten staan in `components/shared/`
- TypeScript wordt gebruikt voor type safety

### Best Practices

- Client components gebruiken waar interactiviteit nodig is (`"use client"`)
- Server components waar mogelijk voor betere performance
- Hydration mismatches voorkomen door client-side rendering voor dynamische content
- Responsive design met Tailwind breakpoints

## 📦 Deployment

### Vercel (Aanbevolen)

1. Push je code naar GitHub
2. Importeer het project in Vercel
3. Vercel detecteert automatisch Next.js en configureert de build
4. Deploy!

### Andere Platforms

De website kan worden gedeployed op elke platform die Next.js ondersteunt:
- Netlify
- AWS Amplify
- Railway
- etc.

Build commando: `npm run build`
Start commando: `npm run start`

## 📄 Licentie

Dit project is privé eigendom.

## 👤 Auteur

**Bor Klessens**
- Email: B.klessens@student.fontys.nl
- Phone: 0622554478
- Location: Professor Goossenslaan 1, 5612 EM Tilburg

---

Gemaakt met ❤️ met Next.js en TypeScript
