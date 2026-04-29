# Teyro Production Principles

> **Last updated:** 2026-04-29

This document outlines the core production principles that must be followed when developing the Teyro platform. These principles ensure consistency, maintainability, and quality across the codebase.

## Core Development Principles

### 1. STRICT BACKEND URL RULE
All frontend fetch calls MUST use `https://upskiill-backend.onrender.com` ALWAYS. 
NEVER point to the local backend on `localhost:3001` ever, even during local development and testing.

### 2. STRICT BRANCHING RULE
All work must always be pushed to a new branch to facilitate Pull Requests (PR), Code Reviews, and optimization BEFORE merging into the main branch. Direct pushes to the main branch are strictly prohibited.

### 3. STRICT COMPONENT SYSTEM RULE
All UI components use the established design system with 10px rounded corners, 48px input height, and brand colors. New pages MUST utilize the shared component library (`components/ui/*` and `components/features/*`) to maintain design coherence across the entire application. DO NOT create custom styles that deviate from established patterns.

### 4. COMPONENT REUSE PRINCIPLE
Before creating any new UI component, developers MUST check if an existing component in the shared library meets the requirements:
- Check `components/ui/` for base UI components (Button, Input, Modal, etc.)
- Check `components/features/` for feature-specific components (CourseCard, ReviewCard, etc.)
- Reuse existing components whenever possible to maintain consistency
- Only create new components when no existing component can fulfill the requirements

### 5. SEEDING POLICY
Do NOT run `deleteMany()` at the start of the seeder as a default. Use `upsert()` or existence checks for core test data (Instructors & Students) to ensure we update what exists and preserve history instead of wiping the DB on every build.

### 6. LOGO ASSET PRINCIPLE
The official Teyro logo asset is located at: `frontend/public/Teyro Logo.png`
All references to the logo in the application must use this specific asset path.

## Design System Principles

### 7. ESTABLISHED ICON SYSTEM
Only TWO icon libraries are used across the entire Teyro codebase:
- **Lucide React** (`lucide-react`): For all UI & form icons
- **React Icons FA6** (`react-icons/fa`): For feature, brand & social icons

No other icon libraries are permitted. No emojis should be used as icons in components.

### 8. COMPONENT LIBRARY STANDARDS
All new pages and features MUST use the shared component library to maintain design coherence:
- Always use existing components before creating new ones
- Follow established border-radius patterns (10px for buttons/inputs, 12px for cards)
- Use established icon libraries
- Preview all new components on `/components` route
- Follow 8px base unit spacing (8, 16, 24, 32, 48, 64)

### 9. AUTHENTICATION & AUTHORIZATION
- JWTs must be stored in `httpOnly` secure cookies (7-day expiry)
- Use `credentials: 'include'` on all auth fetches
- Implement proper route protection middleware
- Enforce strict role-based access control (STUDENT, INSTRUCTOR, ADMIN)

### 10. RESPONSIVE DESIGN REQUIREMENTS
- All new components must be mobile-responsive
- Implement proper viewport scaling with `clamp()` for fluid typography
- Use established breakpoints for mobile/desktop layouts
- Test all layouts on multiple device sizes

## Backend Integration Principles

### 11. API INTEGRATION STANDARDS
- All frontend pages must fetch from production backend (`https://upskiill-backend.onrender.com`)
- Implement proper error handling for all API calls
- Use environment variables for API configuration
- Implement proper loading states and error boundaries

### 12. DATABASE ARCHITECTURE
- Use Prisma ORM for all database operations
- Implement proper data validation and sanitization
- Follow established database schema patterns
- Use proper indexing and query optimization

### 13. SECURITY BEST PRACTICES
- Never expose sensitive data in client-side code
- Implement proper CORS configuration
- Use secure cookie storage for authentication
- Implement proper input validation and sanitization
- Follow security guidelines for payment processing

### 14. PERFORMANCE OPTIMIZATION
- Implement proper caching strategies
- Optimize image loading and serving
- Use code splitting for large components
- Implement proper loading states and skeleton screens
- Optimize bundle sizes and minimize re-renders

## Additional Implementation Guidelines

### 15. TESTING REQUIREMENTS
- All new features must include appropriate unit tests
- Implement end-to-end testing for critical user flows
- Test all authentication flows thoroughly
- Verify cross-browser compatibility

### 16. DOCUMENTATION STANDARDS
- All new components must be documented
- Update relevant documentation when making changes
- Maintain clear and concise code comments
- Follow the established codebase documentation structure