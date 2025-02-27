# Dev Log App

A React application built with TypeScript and Vite, using Supabase as a backend service.

## Local Development

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- Supabase account for the backend

### Setup

1. Clone the repository
```bash
git clone <repository_url>
cd dev-log-app
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Environment variables
Copy the example environment file and fill in your Supabase credentials:
```bash
cp .env.example .env
```

Edit the `.env` file with your Supabase URL and anonymous key.

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

## Deployment

This project is configured for deployment on both Vercel and Netlify.

### Deploying to Vercel

1. Push your project to a Git provider (GitHub, GitLab, BitBucket)
2. Import your repository in Vercel
3. Set the following settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables: Add the same variables from your `.env` file

### Deploying to Netlify

1. Push your project to a Git provider (GitHub, GitLab, BitBucket)
2. Import your repository in Netlify
3. Use the following build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Environment Variables: Add the same variables from your `.env` file

The `netlify.toml` file in this project already contains the necessary configuration.

## Environment Variables

The following environment variables are required:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

Make sure to set these variables in your hosting provider's dashboard for production deployments.

## Tech Stack

- React 18
- TypeScript
- Vite
- Supabase
- React Router DOM
- React Icons
