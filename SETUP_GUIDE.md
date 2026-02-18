# StayFloow Setup Guide

This guide helps you set up Firebase and Builder.io for your StayFloow application.

## 📋 Project Structure

```
code/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Homepage (/)
│   │   ├── accueil/
│   │   │   └── page.tsx       # Welcome page (/accueil)
│   │   └── blog/
│   │       ├── page.tsx       # Blog listing (/blog)
│   │       └── [slug]/
│   │           └── page.tsx   # Dynamic blog post (/blog/un-article)
│   ├── components/
│   │   ├── header.tsx         # Navigation header
│   │   ├── footer.tsx         # Footer with links
│   │   └── builder-page.tsx   # Builder.io integration component
│   ├── lib/
│   │   ├── firebase.ts        # Firebase initialization
│   │   ├── blog-data.ts       # Blog posts (can be replaced with Firestore)
│   │   └── builder.ts         # Builder.io configuration
│   └── hooks/
│       └── use-auth.ts        # Firebase authentication hook
└── .env.example               # Environment variables template
```

## 🔥 Firebase Setup

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the steps
3. Enable these services:
   - Authentication (Email/Password, Google, etc.)
   - Firestore Database
   - Storage (for images)

### 2. Get Your Firebase Configuration
1. In Firebase Console, go to Project Settings (gear icon)
2. Under "Your apps", click on the web app icon (</>) or create a new web app
3. Copy the firebaseConfig object
4. Extract these values:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

### 3. Set Environment Variables
Add these to your environment (using DevServerControl or .env.local):

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 🏗️ Builder.io Setup

### 1. Create a Builder.io Account
1. Go to [Builder.io](https://builder.io)
2. Sign up for a free account
3. Create a new space

### 2. Get Your API Key
1. Go to [Builder.io Account Settings](https://builder.io/account/space)
2. Find "API Key" and copy it

### 3. Set Environment Variable
```
NEXT_PUBLIC_BUILDER_API_KEY=your_builder_api_key
```

### 4. Create Builder.io Models (Optional)
You can create custom models in Builder.io for:
- `page` - For custom page content
- `blog-post` - For blog post layouts
- Any other custom content types

## 📄 Pages Overview

### Homepage (/)
- Modern hero section with search functionality
- Features showcase section
- Featured properties grid
- Call-to-action section
- Responsive design for mobile/tablet/desktop

### Welcome Page (/accueil)
- French welcome page with detailed information
- About section
- Benefits showcase
- How it works section
- Statistics
- Featured blog posts
- Final call-to-action

### Blog Listing (/blog)
- Grid layout for all blog posts
- Featured post highlight
- Category filtering
- Newsletter signup
- Search and filtering support

### Blog Post (/blog/un-article)
- Dynamic routing with slug
- Full Markdown support
- Author information
- Related posts suggestions
- Social sharing buttons
- Call-to-action to browse properties

## 🔐 Authentication Hook Usage

Use the `useAuth` hook in client components:

```tsx
'use client';

import { useAuth } from '@/hooks/use-auth';

export function MyComponent() {
  const { user, loading, error, logout } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  );
}
```

## 📝 Blog Content Management

### Using Local Data
Blog posts are currently stored in `src/lib/blog-data.ts`. You can:
1. Edit the `blogPosts` array directly
2. Add new posts with the `BlogPost` interface
3. Posts are automatically sorted by date

### Migrating to Firestore
To move blog posts to Firestore:
1. Create a `blog-posts` collection in Firestore
2. Update `src/lib/blog-data.ts` to fetch from Firestore:

```tsx
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export async function getAllBlogPosts() {
  const querySnapshot = await getDocs(collection(db, 'blog-posts'));
  return querySnapshot.docs.map(doc => doc.data() as BlogPost);
}
```

## 🎨 Using Builder.io for Content

### Edit Pages Visually
1. In Builder.io, create a `page` model
2. Edit pages visually without coding
3. The pages will automatically load Builder content if available

### Example: Dynamic Homepage
You can replace the static homepage with Builder content:

```tsx
// src/app/page.tsx
import { BuilderPage } from '@/components/builder-page';
import Home from './home-fallback';

export default function HomePage() {
  return <BuilderPage model="page" fallback={<Home />} />;
}
```

## 📱 Responsive Design

All pages are built with:
- Mobile-first approach
- Tailwind CSS utilities
- Radix UI components (accessible)
- Media queries for different breakpoints
- Touch-friendly interface elements

## 🚀 Deployment

### Cloudflare Pages (Current Setup)
The project is configured for Cloudflare Pages deployment:
1. Push your code to GitHub
2. Connect your repo to Cloudflare Pages
3. Set environment variables in Cloudflare
4. Deploy automatically on push

### Environment Variables on Cloudflare
Add all Firebase and Builder.io keys to your Cloudflare Pages project settings.

## 🔗 Navigation Structure

```
/ (Homepage)
├── /search (Search properties)
├── /cars (Car rental)
├── /circuits (Tours)
├── /accueil (Welcome/About)
├── /blog (Blog listing)
│   └── /blog/un-article (Example post)
├── /login (User login)
├── /signup (User signup)
└── /contact (Contact form)
```

## 📚 Useful Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Builder.io Documentation](https://www.builder.io/c/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI Components](https://www.radix-ui.com)

## 🐛 Troubleshooting

### Firebase Connection Issues
- Verify API keys are correct
- Check Firebase project settings
- Ensure Firestore is enabled
- Check CORS settings in Firebase

### Builder.io Not Loading
- Verify API key is set correctly
- Check browser console for errors
- Ensure model names match in Builder.io
- Clear browser cache and reload

### Styling Issues
- Clear Tailwind CSS cache: `npm run build`
- Verify Tailwind config includes all paths
- Check CSS class names in components

## 📞 Support

For issues:
1. Check the component documentation
2. Review Firebase/Builder.io docs
3. Check browser console for errors
4. Create an issue in your repository
