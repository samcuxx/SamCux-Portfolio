# Modern Next.js Portfolio

This is a modern portfolio website built with Next.js, featuring magnetic animations, custom UI components, and responsive design.

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## Features

- 🎨 Modern and clean design
- 🧲 Magnetic link animations
- 📱 Fully responsive
- 🎯 SEO optimized
- ⚡ Fast page loads
- 🔥 Custom UI components
- 🌐 Social media integration

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── shared/          # Shared components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   └── SocialLinks.tsx
│   └── ui/              # UI components
│       └── MagneticLink.tsx
├── public/              # Static assets
└── styles/              # Global styles
```

## Custom Components

- **MagneticLink**: Interactive link component with magnetic hover effect
- **Navbar**: Responsive navigation bar
- **Hero**: Main landing section
- **SocialLinks**: Social media links with animations

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
