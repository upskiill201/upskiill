# Claude Code Configuration

This document outlines the coding standards and practices for the Teyro project. These guidelines ensure consistency and quality across the codebase.

## Project Structure

The project follows a monorepo structure with the following organization:

```
upskiill/
├── frontend/
│   ├── app/           # Next.js app router pages
│   ├── components/      # Reusable UI components
|   |   ├── ui/        # Base UI components (Button, Input, etc.)
│   │   ├── features/   # Feature components
│   │   └── homepage/    # Homepage-specific components
│   └── public/       # Static assets
└── backend/
```

## Claude Code Guidelines

### Core Principles
1. All new code must follow the established design system
2. Reuse existing components when possible
3. Follow the production principles outlined in PRODUCTION_PRINCIPLES.md
4. Maintain strict separation between frontend and backend concerns
5. Use the shared component library for consistency

### Frontend Standards
- All UI components should use the shared design system
- Reuse existing components from the component library
- Follow established patterns for component creation

### Backend Standards
- Follow NestJS conventions
- Use the established API patterns
- Implement proper error handling and validation

### General Guidelines
- Use existing components when possible rather than creating new ones
- Follow the established production principles in @/docs/PRODUCTION_PRINCIPLES.md
- Maintain consistency with existing code patterns
- Ensure all changes follow the established design system

### File Location
This file is located at `frontend/CLAUDE.md` and contains project-specific configuration for Claude Code.