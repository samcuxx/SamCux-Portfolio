# Personal Portfolio Website

A modern, full-stack personal portfolio website built with Next.js, featuring a dynamic admin panel for content management and a beautiful, responsive design.

## ✨ Features

### Frontend

- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Dark/Light Theme**: Toggle between dark and light modes
- **Project Showcase**: Display your projects with images, descriptions, and links
- **Photo Gallery**: Showcase your photography or visual work
- **About Section**: Tell your story with dynamic content management
- **Contact Form**: Integrated contact form with email notifications
- **Smooth Animations**: Enhanced user experience with smooth transitions

### Admin Panel

- **Content Management**: Full CRUD operations for all content
- **Project Management**: Add, edit, and delete projects with image uploads
- **Photo Management**: Upload and organize photos for your gallery
- **About Me Editor**: Update your personal information and bio
- **Contact Settings**: Configure contact information and form settings
- **Experience & Education**: Manage your professional background
- **Tech Stack Management**: Showcase your skills and technologies
- **Social Links**: Manage your social media presence

### Technical Features

- **Authentication**: Secure GitHub OAuth integration
- **File Uploads**: Image upload functionality for projects and photos
- **Form Handling**: Contact form with Web3Forms integration
- **Real-time Database**: Convex backend for instant data updates
- **Type Safety**: Full TypeScript implementation
- **Modern Styling**: Tailwind CSS for responsive design

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Convex
- **Authentication**: GitHub OAuth
- **Forms**: Web3Forms for contact submissions
- **UI Components**: Custom components with Lucide icons
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- Convex account
- GitHub OAuth app (for admin access)
- Web3Forms account (for contact form)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd SamCux-Portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Convex
   CONVEX_DEPLOYMENT=your-convex-deployment
   NEXT_PUBLIC_CONVEX_URL=your-convex-url

   # GitHub OAuth
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Set up Convex**

   ```bash
   npx convex dev
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (frontend)/        # Public portfolio pages
│   ├── admin/             # Admin panel pages
│   └── api/               # API routes
├── components/            # Reusable React components
│   ├── Admin/            # Admin panel components
│   ├── Contact/          # Contact form components
│   ├── Home/             # Homepage components
│   ├── Photos/           # Photo gallery components
│   ├── Projects/         # Project showcase components
│   └── ui/               # UI utility components
├── convex/               # Convex backend functions
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## 🔧 Configuration

### Admin Access

1. Set up GitHub OAuth in your GitHub Developer Settings
2. Add your GitHub username to the Convex auth configuration
3. Access the admin panel at `/admin` after authentication

### Contact Form

1. Create a Web3Forms account at [web3forms.com](https://web3forms.com)
2. Get your API key
3. Configure it in the admin panel under Contact settings

### Customization

- Update colors in `tailwind.config.ts`
- Modify components in the `components/` directory
- Add new admin features in `app/admin/`

## 📱 Pages

- **Home** (`/`): Landing page with hero section
- **About** (`/about`): Personal information and bio
- **Projects** (`/projects`): Project showcase
- **Photos** (`/photos`): Photo gallery
- **Contact** (`/contact`): Contact form and information
- **Admin Panel** (`/admin`): Content management (requires authentication)

## 🚀 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

For other platforms, ensure you have:

- Node.js 18+ runtime
- Environment variables configured
- Convex deployment set up

## 📧 Contact

Feel free to reach out if you have any questions or suggestions!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
