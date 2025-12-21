<p align="center">
    <img src="/app/icon.svg" align="center" width="20%">
</p>
<p align="center"><h1 align="center">NextDEV: Your AI Developer</h1></p>
<p align="center">
	<em><code>An innovative web application that leverages artificial intelligence to generate, edit, and export beautiful web designs from natural language descriptions. Built with modern web technologies to provide a seamless design-to-code experience.</code></em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/last-commit/777anishsingh/NextDev?style=default&logo=git&logoColor=white&color=7d00ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/777anishsingh/NextDev?style=default&color=7d00ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/777anishsingh/NextDev?style=default&color=7d00ff" alt="repo-language-count">
</p>
<p align="center"><!-- default option, no dependency badges. -->
</p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>
<br>

## 🚀 Features

- **AI Design Generation**: Describe your desired web page in plain English and watch as AI creates stunning designs
- **Interactive Playground**: Edit and refine generated designs in real-time with an intuitive interface
- **Code Export**: Export your designs as clean, production-ready code
- **Project Management**: Organize and manage multiple design projects in your personal workspace
- **Authentication**: Secure user authentication powered by Clerk
- **Pricing Tiers**: Flexible pricing with free tier and unlimited access plans
- **Responsive Design**: All generated designs are mobile-first and fully responsive
- **Modern UI**: Built with Radix UI components and Tailwind CSS for a polished experience

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **Lucide React** - Beautiful icons

### Backend & Database
- **Next.js API Routes** - Serverless API endpoints
- **Clerk** - Authentication and user management
- **Drizzle ORM** - Type-safe database operations
- **Neon** - Serverless PostgreSQL database
- **ImageKit** - Image optimization and management

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Type checking
- **Tailwind CSS** - Styling
- **Drizzle Kit** - Database migrations

## 📋 Prerequisites

Before running this application, make sure you have:
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager
- A Clerk account for authentication
- A Neon database instance
- An ImageKit account for image handling

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone github.com/777anishsingh/NextDev
   cd NextDev
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Database
   DATABASE_URL=your_neon_database_url

   # ImageKit
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_imagekit_endpoint
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key

   # AI Service (if applicable)
   AI_API_KEY=your_ai_service_api_key
   ```

4. **Set up the database**
   ```bash
   # Generate and run migrations
   npx drizzle-kit generate
   npx drizzle-kit push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage

### Creating a Design
1. Visit the homepage and describe your desired web page in the input field
2. Choose from pre-built suggestions or enter your own prompt
3. Click the arrow button to generate your design
4. The AI will create a beautiful, responsive web page based on your description

### Editing in Playground
1. Navigate to the generated design in the playground
2. Use the interactive tools to modify elements, colors, and layout
3. Preview changes in real-time
4. Export your final design as code

### Managing Projects
1. Access your workspace to view all projects
2. Organize designs by categories
3. Track usage and credits
4. Export multiple designs at once

## 🏗️ API Routes

The application includes several API endpoints:

- `/api/projects` - Project management (CRUD operations)
- `/api/chats` - AI chat interactions for design generation
- `/api/frames` - Design frame management
- `/api/users` - User profile and settings
- `/api/ai-model` - AI model interactions

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint for code quality
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 👨‍💻 Developer

Built with ❤️ by [Anish Singh Butola](https://github.com/777anishsingh)

- **GitHub**: [@777anishsingh](https://github.com/777anishsingh)
- **LinkedIn**: [Anish Singh Butola](https://www.linkedin.com/in/777anishsingh)
- **Email**: 777anish.singh@gmail.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React framework
- [Clerk](https://clerk.com) - Authentication platform
- [Neon](https://neon.tech) - Serverless PostgreSQL
- [Radix UI](https://www.radix-ui.com) - Component library
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [ImageKit](https://imagekit.io) - Image optimization

---

**Star this repository** ⭐ if you find it helpful!
