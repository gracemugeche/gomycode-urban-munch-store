# Urban Munch Store - Client

A modern React + TypeScript food delivery application with Clerk authentication and role-based access control.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Clerk account for authentication

### Environment Setup

1. **Copy environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Configure environment variables in `.env`:**
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

3. **Get your Clerk keys:**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com/)
   - Create a new application or use existing one
   - Copy the **Publishable Key** from the API Keys section
   - Set up user roles in Clerk's public metadata

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔐 Authentication & Roles

This app uses **Clerk** for authentication with three user roles:
- **User**: Regular customers (default)
- **Worker**: Staff members (can access admin dashboard and manage products/delivery)
- **Admin**: Full access (can manage users, orders, and all admin features)

### Setting User Roles in Clerk

In your Clerk dashboard, set user roles via public metadata:
```json
{
  "role": "admin"  // or "worker" or "user"
}
```

## 🏗️ Architecture

### Authentication Flow
1. **Clerk Provider**: Handles authentication state
2. **Custom AuthContext**: Syncs Clerk users with backend MongoDB
3. **RoleRoute**: Protects routes based on user roles
4. **Fallback Handling**: Uses Clerk data if backend sync fails

### Key Features
- ✅ **Resilient Authentication**: Works even if backend is down
- ✅ **Role-Based Access**: Different dashboards for users/workers/admins  
- ✅ **Error Handling**: Graceful fallbacks and user feedback
- ✅ **Loading States**: Proper loading indicators during auth checks

## 🐛 Fixed Issues

### Authentication Bugs Resolved:
1. **Missing Environment Variables**: Added `.env` setup with validation
2. **Backend Dependency**: Added fallback to Clerk-only authentication
3. **Race Conditions**: Improved loading state handling
4. **Error Handling**: Better error recovery and user feedback
5. **TypeScript Issues**: Fixed missing properties and null checks

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, Cart)
├── hooks/              # Custom hooks
├── pages/              # Page components
│   ├── admin/          # Admin-only pages
│   └── ...
├── routes/             # Routing configuration
├── services/           # API service layer
└── types/              # TypeScript type definitions
```

## 🛠️ Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🔧 Configuration

### Vite Configuration
Basic Vite setup with React plugin. Extend `vite.config.ts` for custom needs.

### ESLint Configuration  
Configured for React + TypeScript with strict rules. Extend `eslint.config.js` for project-specific rules.
