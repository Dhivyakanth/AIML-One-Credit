# My Design Portfolio

## Overview
This project is a modern, dynamic, and animation-rich personal design portfolio. It is designed to showcase skills, experience, projects, and education with a premium, interactive user experience. The site features a vibrant emerald green theme, 3D tilt effects, magnetic interactions, staggered text reveals, and scroll-triggered animations.

## Tech Stack
- **Framework & Libraries**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **UI Components & Primitives**: Shadcn UI, Radix UI Primitives, Lucide React
- **Animations**: Framer Motion
- **State Management & Data Fetching**: TanStack React Query, React Hook Form (with Zod validation)
- **Routing**: React Router DOM
- **Tooling & Code Quality**: ESLint, Vitest (Testing framework), Prettier
- **Utilities**: `clsx`, `tailwind-merge`, `date-fns`, Sonner (for customized toasts)

## Project Structure
- `/src/pages/`
  - `Index.tsx`: The main landing page encompassing all scrollable sections.
  - `NotFound.tsx`: The 404 error page.
- `/src/components/`
  - **Sections**: `Hero`, `Skills`, `Experience`, `Projects`, `Education`, `Contact`.
  - **Global/UI Effects**: 
    - `CustomCursor`: Custom magnetic cursor replacing the default browser cursor.
    - `Starfield`: A global animated starfield background.
    - `BackToTop`: A scroll-to-top utility component.
  - **ui/**: Reusable Shadcn UI blocks such as avatars, dialogs, progress bars, toast alerts, etc.
- `/src/App.tsx`: The root React component maintaining global providers (`Toaster`, `TooltipProvider`, `QueryClientProvider`) and defining routing context.
- `/src/index.css`: The main CSS entry point containing Tailwind layout directives and base color schemes (e.g., emerald green theme layout variables).

## Key Features & User Experience
1. **Interactive Sections (Scroll-Driven Shuffle Effect)**: `Index.tsx` employs Framer Motion's `useScroll` and `useTransform` to add gentle 3D rotations, scaling, and fading visual shifts to each section dynamically as the user scrolls.
2. **Elevated Micro-interactions**: Smooth magnetic states attached to buttons, `CustomCursor` hover scales, and vibrant form entry states.
3. **Immersive Atmosphere**: Featuring a background `Starfield` rendering stars interactively to provide an elegant, premium backdrop layer.
4. **Responsive Integrity**: Meticulously defined layouts crafted with Tailwind CSS for consistent performance across mobile, tablet, and desktop environments.

## Available Command Scripts
From the root directory, you can run:

- `npm run dev` or `npx vite`: Start the local development server.
- `npm run build`: Compile the application bundle for production.
- `npm run lint`: Run ESLint to analyze code structure and enforce typescript standards.
- `npm run test`: Run the local Vitest testing suite.
