# Dhivyakanth P - Personal Design Portfolio

A modern, dynamic, and animation-rich personal design portfolio showcasing skills, experience, projects, and education with a premium, interactive user experience. The site features a vibrant emerald green theme, 3D tilt effects, magnetic interactions, staggered text reveals, and scroll-triggered animations.

## 🚀 Features

- **Interactive Sections**: Scroll-driven shuffle effects using Framer Motion
- **Elevated Micro-interactions**: Smooth magnetic buttons, custom cursor effects, and vibrant form states
- **Immersive Atmosphere**: Animated starfield background for an elegant, premium experience
- **Responsive Design**: Carefully crafted layouts for consistent performance across mobile, tablet, and desktop
- **Performance Optimized**: Lazy loading components, efficient resource management, and smooth animations
- **Modern UI/UX**: Built with shadcn/ui components for a clean, accessible interface

## 💻 Tech Stack

- **Framework & Libraries**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **UI Components & Primitives**: Shadcn UI, Radix UI Primitives, Lucide React
- **Animations**: Framer Motion
- **State Management & Data Fetching**: TanStack React Query, React Hook Form (with Zod validation)
- **Routing**: React Router DOM
- **Tooling & Code Quality**: ESLint, Vitest (Testing framework)
- **Utilities**: `clsx`, `tailwind-merge`, `date-fns`, Sonner (for customized toasts)

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn UI components
│   ├── Hero.tsx         # Hero section
│   ├── Skills.tsx       # Skills section
│   ├── Experience.tsx   # Experience section
│   ├── Projects.tsx     # Projects section
│   ├── Education.tsx    # Education section
│   ├── Contact.tsx      # Contact section
│   ├── CustomCursor.tsx # Custom magnetic cursor
│   ├── Starfield.tsx    # Animated starfield background
│   └── BackToTop.tsx    # Scroll-to-top utility
├── pages/
│   ├── Index.tsx        # Main landing page
│   └── NotFound.tsx     # 404 error page
├── assets/              # Static assets (images, icons)
├── hooks/               # Custom React hooks
└── lib/                 # Utility functions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone <YOUR_REPOSITORY_URL>
```

2. Navigate to the project directory:
```bash
cd my-design-portfolio
```

3. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun run dev
```

5. Open your browser and visit `http://localhost:5173`

## 🧪 Available Scripts

From the root directory, you can run:

- `npm run dev` - Start the local development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to analyze code structure
- `npm run test` - Run the testing suite
- `npm run test:watch` - Run tests in watch mode

## 🎨 Key Features & User Experience

1. **Interactive Sections (Scroll-Driven Shuffle Effect)**: Dynamic 3D rotations, scaling, and fading visual shifts to each section as the user scrolls using Framer Motion's `useScroll` and `useTransform`.

2. **Elevated Micro-interactions**: Smooth magnetic states attached to buttons, custom cursor hover effects, and vibrant form entry states.

3. **Immersive Atmosphere**: Background starfield rendering stars interactively to provide an elegant, premium backdrop layer.

4. **Responsive Integrity**: Meticulously defined layouts crafted with Tailwind CSS for consistent performance across mobile, tablet, and desktop environments.

5. **Performance Optimized**: Lazy loading components, efficient resource management, and optimized animations for smooth user experience.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About the Author

**Dhivyakanth P** - Aspiring Full Stack Developer & AI Engineer crafting intelligent, scalable systems with React, Node.js, and modern AI/ML frameworks.

Connect with me:
- [LinkedIn](https://www.linkedin.com/in/dhivyakanth-p-7a308b251/)
- [Email](mailto:dhivyakanth2005@gmail.com)

---

Built with ❤️ using modern web technologies.
