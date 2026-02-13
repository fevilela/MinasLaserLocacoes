# Minas Laser Locações

## Overview

Minas Laser Locações is a Brazilian landing page / marketing website for a laser equipment rental company. The site is built as a single-page React application with a modern, high-tech visual design featuring neon accents, glass-morphism cards, and smooth animations. The primary goal is to showcase laser equipment for rent, blog posts, courses, and drive customer contact via WhatsApp.

The app also has a Gemini AI integration (API key configured via environment variable) that may be used for an AI-powered chat or assistant feature on the site.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend-Only SPA
- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite 6 with the `@vitejs/plugin-react` plugin
- **Styling:** Tailwind CSS loaded via CDN (`cdn.tailwindcss.com` in `index.html`), plus custom CSS animations defined inline in `index.html`
- **Icons:** Lucide React for all iconography
- **Fonts:** Google Fonts (Montserrat, Roboto, Great Vibes)
- **Entry Point:** `index.tsx` mounts `<App />` into a `#root` div
- **Main Component:** `App.tsx` contains the full single-page application logic

### Key Design Decisions

1. **Single-file architecture**: The entire app lives primarily in `App.tsx`. When adding features, continue building within this component or extract into clearly named component files at the root level.

2. **No backend/server**: This is a purely client-side application. There's no Express server, no database, and no API routes. Contact actions redirect to WhatsApp using a pre-configured phone number.

3. **WhatsApp integration**: Customer communication is handled via WhatsApp deep links (`wa.me`). The phone number is hardcoded as `5535999948797`.

4. **Type definitions**: All data types (Equipment, BlogPost, Course, Testimonial, etc.) are defined in `types.ts` at the root level.

5. **Path aliases**: `@/*` maps to the project root directory, configured in both `tsconfig.json` and `vite.config.ts`.

6. **Dev server**: Vite runs on port 3000, bound to `0.0.0.0` with all hosts allowed — appropriate for Replit deployment.

### Project Structure
```
/
├── App.tsx            # Main React application component
├── index.tsx          # React entry point / root renderer
├── index.html         # HTML shell with Tailwind CDN, fonts, custom CSS
├── types.ts           # TypeScript interfaces for data models
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
├── package.json       # Dependencies and scripts
└── metadata.json      # App metadata (name, description)
```

### Scripts
- `npm run dev` — Start Vite dev server on port 3000
- `npm run build` — Production build
- `npm run preview` — Preview production build

## External Dependencies

### NPM Packages
- **react / react-dom** (v19) — UI framework
- **lucide-react** (v0.563) — Icon library
- **vite** (v6) — Build tool and dev server
- **@vitejs/plugin-react** — React support for Vite
- **typescript** (~5.8) — Type checking

### CDN Dependencies
- **Tailwind CSS** — Loaded via `cdn.tailwindcss.com` in `index.html` (not installed as npm package)
- **Google Fonts** — Montserrat, Roboto, Great Vibes

### API Integrations
- **Google Gemini API** — API key is configured via `GEMINI_API_KEY` environment variable (set in `.env.local`). Exposed to client code as `process.env.GEMINI_API_KEY` and `process.env.API_KEY` through Vite's `define` config. Used for AI-powered features.
- **WhatsApp Business** — Deep linking to WhatsApp for customer contact (no API key needed, uses `wa.me` URLs with the business phone number)

### No Database
There is no database in this project. All content is likely hardcoded or defined inline in the React components. If a database is added later, consider a simple solution like SQLite with Drizzle ORM given the content-focused nature of the site.