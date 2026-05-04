# Brandy's Task Progress

## Purpose
This file is the central location for task assignment and status tracking for Brandy. The Lead Developer will assign tasks here, and Brandy should update the status as they progress.

## How to use
- `[ ]` - Not Started
- `[/]` - In Progress
- `[x]` - Completed

## Active Tasks
- [ ] **Teyro Creator Documentation CMS** (Deadline: May 10th)
  - **Objective**: Build a high-performance, internal CMS for publishers to create and manage the documentation that supports Teyro Creators.
  - **Core Requirements**:
    1. **Authentication**: Secure Signup/Login for internal publishers. Use the existing `User` model with a `PUBLISHER` role if possible, or maintain separate administrative access.
    2. **Database Architecture**: 
       - Define a `Documentation` model in `prisma/schema.prisma`. 
       - Fields: `id`, `title`, `slug` (unique), `content` (Rich Text), `category` (Setup, Curriculum, Lesson, etc.), `authorId`, `published` (Boolean).
    3. **The Publisher Workspace**:
       - Create a `/publisher/dashboard` to manage the lifecycle of documents (Create, Edit, Delete, Archive).
    4. **The "Elite" Editor Interface**:
       - Implement a modern, block-based or rich-text editor (e.g., Tiptap, Lexical, or Gutenberg-style).
       - Features: Headings, bullet points, hyperlinks, image uploads (connect to the `course-thumbnails` Supabase bucket), and styled callout boxes.
    5. **UI/UX Consistency**: 
       - Must mirror the "Elite" Teyro aesthetic: clean whitespaces, high-contrast typography (Inter/Outfit), and the Teyro Blue design tokens.
  - **Outcome**: A functional system where our team can write the "Course Setup Guide" or "Writing Effective Outcomes" docs that the Creator Builder links to.
- [ ] Initializing your development environment

## Backlog
- [ ] Reviewing Teyro UI components

## Completed
- [x] Onboarding to the Teyro codebase
