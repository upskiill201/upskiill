import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SEEDING POLICY VIOLATION: Cannot run seed script in production!');
  }

  console.log('🌱 Seeding database — updating existing records or creating new ones...');

  // Note: We no longer wipe all data at the start. 
  // We use upserts to ensure we update what exists and add what is missing.

  // ─── INSTRUCTORS ──────────────────────────────────────────────────────────
  const alex = await prisma.user.upsert({
    where: { email: 'alex@upskiill.com' },
    update: {
      fullName: 'Alex Rivera',
      password: '$2b$10$T1VFY3vAxGsJk6/VCa1A4Osfu9d0BrjMnJeQloTiyWpvkfrBjfM62', // 'password123'
      role: 'INSTRUCTOR',
      avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&q=80',
    },
    create: {
      email: 'alex@upskiill.com',
      fullName: 'Alex Rivera',
      password: '$2b$10$T1VFY3vAxGsJk6/VCa1A4Osfu9d0BrjMnJeQloTiyWpvkfrBjfM62',
      role: 'INSTRUCTOR',
      avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&q=80',
    },
  });

  const sarah = await prisma.user.upsert({
    where: { email: 'sarah@upskiill.com' },
    update: {
      fullName: 'Sarah Chen',
      password: '$2b$10$T1VFY3vAxGsJk6/VCa1A4Osfu9d0BrjMnJeQloTiyWpvkfrBjfM62',
      role: 'INSTRUCTOR',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80',
    },
    create: {
      email: 'sarah@upskiill.com',
      fullName: 'Sarah Chen',
      password: '$2b$10$T1VFY3vAxGsJk6/VCa1A4Osfu9d0BrjMnJeQloTiyWpvkfrBjfM62',
      role: 'INSTRUCTOR',
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80',
    },
  });

  const marcus = await prisma.user.upsert({
    where: { email: 'marcus@upskiill.com' },
    update: {
      fullName: 'Marcus Johnson',
      password: '$2b$10$T1VFY3vAxGsJk6/VCa1A4Osfu9d0BrjMnJeQloTiyWpvkfrBjfM62',
      role: 'INSTRUCTOR',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80',
    },
    create: {
      email: 'marcus@upskiill.com',
      fullName: 'Marcus Johnson',
      password: '$2b$10$T1VFY3vAxGsJk6/VCa1A4Osfu9d0BrjMnJeQloTiyWpvkfrBjfM62',
      role: 'INSTRUCTOR',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80',
    },
  });

  const student = await prisma.user.upsert({
    where: { email: 'student@upskiill.com' },
    update: {
      fullName: 'Jane Student',
      password: '$2b$10$T1VFY3vAxGsJk6/VCa1A4Osfu9d0BrjMnJeQloTiyWpvkfrBjfM62',
      role: 'STUDENT',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80',
    },
    create: {
      email: 'student@upskiill.com',
      fullName: 'Jane Student',
      password: '$2b$10$T1VFY3vAxGsJk6/VCa1A4Osfu9d0BrjMnJeQloTiyWpvkfrBjfM62',
      role: 'STUDENT',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=80',
    },
  });

  console.log(`✅ Instructors: ${alex.fullName}, ${sarah.fullName}, ${marcus.fullName}`);
  console.log(`✅ Student: ${student.fullName}\n`);

  console.log('📦 Upserting Course 1...');
  // ─── COURSE 1: Product Design & UX ────────────────────────────────────────
  const course1Data = {
      title: 'Advanced Product Design & UX Strategy',
      slug: 'advanced-product-design-ux-strategy',
      shortDescription:
        'Master the complete design lifecycle — from user research and wireframing to high-fidelity prototyping and handoff.',
      description: `Welcome to the most comprehensive course on Product Design and UX Strategy available online. This isn't just another tutorial on how to use software — it is a deep dive into the mindset, frameworks, and execution strategies used by the world's most successful tech companies.

> "Great design isn't just what it looks like and feels like. Design is how it works. Our aim is to bridge the gap between aesthetic beauty and functional brilliance in every digital interface."

### The Journey from Beginner to Expert

We start by breaking down the psychological drivers of user behavior. Why do users click? What makes an interface almost completely intuitive? From there, we move into wireframing, building a robust component library, and eventually establishing a full-fledged design system out of nothing. You will build actual, testable app prototypes that feel real to users.

### Key Highlights:

- Build a professional portfolio from day one layout sizing.
- Post-course community exclusively for pro tier students to review your work.
- Advanced Figma techniques: variants, auto-layout, and dynamic variables.
- Usability testing guide: how to recruit early users and scale your research efforts.`,
      thumbnailUrl:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
      price: 499,
      originalPrice: 799,
      published: true,
      category: 'Design',
      level: 'All Levels',
      duration: '22h 30m',
      rating: 4.9,
      reviewsCount: 3254,
      studentsCount: 15400,
      instructorId: alex.id,
      outcomes: [
        'Conduct deep user research and translate insights into actionable product features.',
        'Master Auto-Layout, Components, and Design Systems in Figma.',
        'Build clickable, high-fidelity prototypes for stakeholder testing.',
        'Understand behavioral psychology and how it drives conversions.',
        'Create pixel-perfect design handoffs for engineering teams.',
        'Build a professional portfolio that gets you hired.',
        'Conduct usability tests and iterate based on real feedback.',
        'Apply design thinking to solve complex product challenges.',
      ],
      requirements: [
        'No prior coding experience required — this is 100% design focused.',
        'A Mac or PC with an internet connection.',
        'Figma (free tier is sufficient to start the course).',
        'Access to Adobe Creative Cloud is helpful, but not required.',
        'A passion for creating great user experiences.',
      ],
      curriculum: [
        {
          title: 'Section 1: Foundations of UX Strategy',
          lessonCount: 5,
          totalDuration: '58m',
          lessons: [
            { index: 1, title: 'Welcome & Course Overview', duration: '4:15', isFreePreview: true },
            { index: 2, title: 'What is UX Strategy?', duration: '12:30', isFreePreview: true },
            { index: 3, title: 'The Double Diamond Design Process', duration: '18:45' },
            { index: 4, title: 'Understanding Business Goals vs. User Goals', duration: '13:20' },
            { index: 5, title: 'Setting Up Your Figma Workspace', duration: '9:10' },
          ],
        },
        {
          title: 'Section 2: User Research & Empathy',
          lessonCount: 6,
          totalDuration: '1h 18m',
          lessons: [
            { index: 1, title: 'Introduction to User Research', duration: '8:00', isFreePreview: true },
            { index: 2, title: 'Crafting Effective Interview Questions', duration: '14:30' },
            { index: 3, title: 'Conducting User Interviews (Live Demo)', duration: '22:15' },
            { index: 4, title: 'Synthesizing Findings: Affinity Mapping', duration: '16:40' },
            { index: 5, title: 'Creating User Personas That Actually Work', duration: '11:25' },
            { index: 6, title: 'Journey Mapping & Pain Point Identification', duration: '5:10' },
          ],
        },
        {
          title: 'Section 3: Wireframing & Information Architecture',
          lessonCount: 5,
          totalDuration: '1h 5m',
          lessons: [
            { index: 1, title: 'Low-Fidelity Wireframing Principles', duration: '10:00' },
            { index: 2, title: 'Structuring Navigation & IA', duration: '15:30' },
            { index: 3, title: 'Wireframing a Mobile App from Scratch', duration: '24:00' },
            { index: 4, title: 'Getting Stakeholder Feedback on Wireframes', duration: '9:45' },
            { index: 5, title: 'Transitioning from Lo-Fi to Hi-Fi', duration: '5:45' },
          ],
        },
        {
          title: 'Section 4: High-Fidelity Design & Prototyping',
          lessonCount: 6,
          totalDuration: '1h 52m',
          lessons: [
            { index: 1, title: 'Mastering Figma Components & Variants', duration: '20:15' },
            { index: 2, title: 'Building a Design System from Zero', duration: '28:00' },
            { index: 3, title: 'Advanced Auto-Layout Techniques', duration: '18:30' },
            { index: 4, title: 'Creating Interactive Prototypes', duration: '22:45' },
            { index: 5, title: 'Micro-Interactions & Motion Design', duration: '14:20' },
            { index: 6, title: 'Preparing a Pixel-Perfect Developer Handoff', duration: '8:10' },
          ],
        },
        {
          title: 'Section 5: Usability Testing & Portfolio',
          lessonCount: 4,
          totalDuration: '55m',
          lessons: [
            { index: 1, title: 'Planning and Running Usability Tests', duration: '16:00' },
            { index: 2, title: 'Analyzing Results & Iterating on Design', duration: '14:30' },
            { index: 3, title: 'Building a Portfolio That Gets You Hired', duration: '19:00' },
            { index: 4, title: "Career Paths in UX — What's Next", duration: '5:30' },
          ],
        },
      ],
  };

  const course1 = await prisma.course.upsert({
    where: { slug: course1Data.slug },
    update: course1Data,
    create: course1Data,
  });
  console.log('✅ Course 1 upserted.');

  console.log('📦 Upserting Course 2...');
  // ─── COURSE 2: Full-Stack Next.js ─────────────────────────────────────────
  const course2Data = {
    title: 'Full-Stack Next.js 15 Development',
    slug: 'fullstack-nextjs-15-development',
    shortDescription:
      'Build production-ready web applications using App Router, Server Actions, Prisma, and modern deployment pipelines.',
    description: `Learn modern full-stack web development by building a complete, high-performance SaaS platform from scratch. We cover the latest Next.js 15 features alongside standard industry practices — authentication, database design, payment integration, and CI/CD deployment.

> "To truly understand web development today, you need to build across the entire stack. Knowing just the frontend or just the database leaves you dependent on others. This course makes you dangerous across the whole stack."

### Beyond Boilerplate

This isn't a course about copying boilerplate. You'll understand every line of code you write and why it's there. We build a real product that you can show employers or ship to paying customers.

### Key Highlights:

- Build a real, scalable product piece by piece in every single lesson.
- Master React Server Components (RSC) and dramatically improve your web app's speed.
- Deploy to Vercel and set up automated preview links via GitHub Actions.
- Build your own authentication system with completely secure, httpOnly cookies and JWTs.`,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    price: 350,
    originalPrice: 549,
    published: true,
    category: 'Development',
    level: 'Intermediate',
    duration: '28h 15m',
    rating: 4.8,
    reviewsCount: 2187,
    studentsCount: 11200,
    instructorId: sarah.id,
    outcomes: [
      'Build full-stack applications with Next.js 15 App Router.',
      'Use React Server Components and Server Actions effectively.',
      'Design and query relational databases with Prisma ORM.',
      'Implement secure JWT & cookie-based authentication from scratch.',
      'Deploy to production on Vercel with proper CI/CD pipelines.',
      'Write type-safe code throughout with TypeScript.',
      'Integrate Stripe for real payment processing.',
      'Profile and optimize Core Web Vitals for production.',
    ],
    requirements: [
      'Solid understanding of JavaScript fundamentals (arrays, objects, async/await).',
      'Basic familiarity with React — hooks, state, and props.',
      'No Next.js experience required — we start from zero.',
      'A computer with Node.js 18+ installed.',
    ],
    curriculum: [
      {
        title: 'Section 1: Next.js 15 & App Router Deep Dive',
        lessonCount: 5,
        totalDuration: '1h 10m',
        lessons: [
          { index: 1, title: "Welcome! What We're Building", duration: '5:00', isFreePreview: true },
          { index: 2, title: 'App Router vs. Pages Router Explained', duration: '14:30', isFreePreview: true },
          { index: 3, title: 'File-Based Routing & Layouts', duration: '18:45' },
          { index: 4, title: 'Server vs. Client Components', duration: '22:00' },
          { index: 5, title: 'Environment Setup & Project Scaffolding', duration: '9:45' },
        ],
      },
      {
        title: 'Section 2: Data Fetching & Server Actions',
        lessonCount: 6,
        totalDuration: '1h 40m',
        lessons: [
          { index: 1, title: 'Fetching Data in Server Components', duration: '16:20' },
          { index: 2, title: 'Streaming & Suspense Boundaries', duration: '18:00' },
          { index: 3, title: 'Caching Strategies in Next.js 15', duration: '20:30' },
          { index: 4, title: 'Introduction to Server Actions', duration: '14:15' },
          { index: 5, title: 'Building Optimistic UI with Server Actions', duration: '22:00' },
          { index: 6, title: 'Error Handling & Error Boundaries', duration: '9:00' },
        ],
      },
      {
        title: 'Section 3: Database Design with Prisma & PostgreSQL',
        lessonCount: 5,
        totalDuration: '1h 25m',
        lessons: [
          { index: 1, title: 'Prisma Schema Design Fundamentals', duration: '20:00' },
          { index: 2, title: 'Migrations & Seed Data Strategies', duration: '15:30' },
          { index: 3, title: 'Advanced Prisma Queries & Relations', duration: '24:45' },
          { index: 4, title: 'Connection Pooling for Production', duration: '12:00' },
          { index: 5, title: 'Database Indexes for Performance', duration: '13:45' },
        ],
      },
      {
        title: 'Section 4: Authentication & Authorization',
        lessonCount: 5,
        totalDuration: '1h 30m',
        lessons: [
          { index: 1, title: 'Cookie-Based Auth vs. JWT Explained', duration: '14:00' },
          { index: 2, title: 'Building Signup & Login Endpoints', duration: '22:30' },
          { index: 3, title: 'HttpOnly Cookies & CSRF Protection', duration: '18:00' },
          { index: 4, title: 'Protecting Routes with Middleware', duration: '16:30' },
          { index: 5, title: 'Role-Based Access Control (RBAC)', duration: '19:00' },
        ],
      },
      {
        title: 'Section 5: Deployment, CI/CD & Performance',
        lessonCount: 4,
        totalDuration: '58m',
        lessons: [
          { index: 1, title: 'Deploying to Vercel — Full Walkthrough', duration: '18:00' },
          { index: 2, title: 'GitHub Actions for CI/CD Pipelines', duration: '16:30' },
          { index: 3, title: 'Core Web Vitals & Performance Tuning', duration: '14:30' },
          { index: 4, title: 'Monitoring Production with Sentry', duration: '9:00' },
        ],
      },
    ],
  };

  const course2 = await prisma.course.upsert({
    where: { slug: course2Data.slug },
    update: course2Data,
    create: course2Data,
  });

  console.log('✅ Course 2 upserted.');

  console.log('📦 Upserting Course 3...');
  // ─── COURSE 3: Digital Marketing ──────────────────────────────────────────
  const course3Data = {
    title: 'Digital Marketing Mastery 2025',
    slug: 'digital-marketing-mastery-2025',
    shortDescription:
      'Uncover the secrets to driving millions of organic and paid impressions — SEO, Google Ads, Meta Ads, and content strategy.',
    description: `Master the full digital marketing ecosystem. From SEO fundamentals to advanced paid advertising on Google and Meta, content strategy, email automation, and analytics — this bootcamp is built for real-world scale.

> "A great product with zero distribution is a dead product. Distribution is arguably the most important skill in modern business, and digital marketing is the key to unlocking consistent, scalable growth."

### Scaling What Works

You'll walk away with live campaigns, proven swipe-file frameworks, and measurable results you can show any employer or client. We don't just teach theory — every module includes live screen recordings building and optimizing actual campaigns right before your eyes.

### Key Highlights:

- Unlock premium SEO templates used by leading marketing agencies.
- Real case studies where we show how $1000 was converted into $50,000 via Meta Ads.
- Hands-on workshops analyzing real-time Google Analytics 4 properties.
- Automate repetitive marketing tasks using Zapier and AI workflows.`,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    price: 199,
    originalPrice: 349,
    published: true,
    category: 'Marketing',
    level: 'Beginner',
    duration: '14h 45m',
    rating: 4.7,
    reviewsCount: 1852,
    studentsCount: 8900,
    instructorId: marcus.id,
    outcomes: [
      'Rank on page 1 of Google using proven on-page and off-page SEO techniques.',
      'Run profitable Google Search & Display ad campaigns.',
      'Build scalable Facebook and Instagram ad funnels.',
      'Create a content calendar and grow organic social media following.',
      'Automate email marketing sequences with 40%+ open rates.',
      'Track every campaign using Google Analytics 4 and UTM parameters.',
    ],
    requirements: [
      'A laptop or tablet and a willingness to learn.',
      'No marketing experience required — we start from the basics.',
      'A Google account and a Facebook/Meta personal account.',
    ],
    curriculum: [
      {
        title: 'Section 1: The Digital Marketing Landscape',
        lessonCount: 4,
        totalDuration: '45m',
        lessons: [
          { index: 1, title: 'Introduction to Digital Marketing in 2025', duration: '6:30', isFreePreview: true },
          { index: 2, title: 'The Marketing Funnel: TOFU, MOFU, BOFU', duration: '14:00', isFreePreview: true },
          { index: 3, title: 'Understanding Your Ideal Customer Avatar', duration: '16:45' },
          { index: 4, title: 'Setting SMART Marketing Goals & KPIs', duration: '7:45' },
        ],
      },
      {
        title: 'Section 2: Search Engine Optimization (SEO)',
        lessonCount: 6,
        totalDuration: '1h 32m',
        lessons: [
          { index: 1, title: "How Google's Algorithm Works", duration: '12:00' },
          { index: 2, title: 'Keyword Research with Ahrefs & SEMrush', duration: '20:30' },
          { index: 3, title: 'On-Page SEO: Title Tags, Meta, Headers', duration: '18:00' },
          { index: 4, title: 'Technical SEO: Site Speed & Core Vitals', duration: '16:30' },
          { index: 5, title: 'Link Building Strategies That Work', duration: '14:00' },
          { index: 6, title: 'Local SEO for Business Owners', duration: '11:00' },
        ],
      },
      {
        title: 'Section 3: Paid Advertising (Google & Meta)',
        lessonCount: 6,
        totalDuration: '1h 48m',
        lessons: [
          { index: 1, title: 'Google Search Ads Fundamentals', duration: '18:00' },
          { index: 2, title: 'Writing High-Converting Ad Copy', duration: '14:30' },
          { index: 3, title: 'Bidding Strategies & Budget Management', duration: '16:00' },
          { index: 4, title: 'Meta Ads Manager Deep Dive', duration: '22:00' },
          { index: 5, title: 'Retargeting & Lookalike Audiences', duration: '18:30' },
          { index: 6, title: 'Reading Your Dashboard & Optimizing', duration: '19:00' },
        ],
      },
      {
        title: 'Section 4: Content & Email Marketing',
        lessonCount: 5,
        totalDuration: '1h 10m',
        lessons: [
          { index: 1, title: 'Building a Content Strategy That Scales', duration: '15:00' },
          { index: 2, title: 'Writing Content That Ranks AND Converts', duration: '18:30' },
          { index: 3, title: 'Email List Building from Zero', duration: '14:00' },
          { index: 4, title: 'Designing Automated Email Sequences', duration: '13:30' },
          { index: 5, title: 'Analytics: Measuring What Matters', duration: '9:00' },
        ],
      },
    ],
  };

  const course3 = await prisma.course.upsert({
    where: { slug: course3Data.slug },
    update: course3Data,
    create: course3Data,
  });

  console.log('✅ Course 3 upserted.');

  console.log('📦 Upserting Course 4...');
  // ─── COURSE 4: Python for Data Science ────────────────────────────────────
  const course4Data = {
    title: 'Python for Data Science & Machine Learning',
    slug: 'python-data-science-machine-learning',
    shortDescription:
      'Go from zero to building real ML models — Python, NumPy, Pandas, Scikit-learn, and neural networks with TensorFlow.',
    description: `The most in-demand skill set in tech — all in one course. You'll start from Python basics and build your way up to training machine learning models, working with real Kaggle datasets, and deploying your models to production as REST APIs.

> "Data is the new oil, but without the refinery capabilities, it's virtually useless. Python and its rich ecosystem of libraries give you the power to find the gold buried deep within complex data."

### Taught by Industry Veterans

Taught by an ex-Google data scientist with over 10 years of industry experience across FAANG companies, this course uses real datasets and real problems — no toy examples. Data science can feel overwhelming, but this structured curriculum gives you a clear path from beginner to job-ready.

### Key Highlights:

- Train your first Neural Network using Google's TensorFlow.
- Master Pandas techniques to clean and manipulate data 100x faster than Excel.
- Learn how to visualize relationships using Matplotlib and Seaborn.
- Complete a Capstone project tackling an active Kaggle competition.`,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    price: 279,
    originalPrice: 449,
    published: true,
    category: 'Data Science',
    level: 'Beginner',
    duration: '32h 0m',
    rating: 4.9,
    reviewsCount: 4120,
    studentsCount: 22500,
    instructorId: sarah.id,
    outcomes: [
      'Master Python from scratch including OOP and data structures.',
      'Manipulate and analyze data at scale with NumPy and Pandas.',
      'Visualize complex datasets with Matplotlib and Seaborn.',
      'Build and evaluate supervised and unsupervised ML models.',
      'Implement neural networks using TensorFlow and Keras.',
      'Work with real-world datasets from Kaggle competitions.',
      'Deploy machine learning models as REST APIs.',
      'Understand statistics and probability for data science.',
    ],
    requirements: [
      'No prior programming experience required.',
      'A computer with Python 3.10+ and VS Code installed.',
      'Basic algebra and high school level math is sufficient.',
    ],
    curriculum: [
      {
        title: 'Section 1: Python Programming Fundamentals',
        lessonCount: 6,
        totalDuration: '1h 25m',
        lessons: [
          { index: 1, title: 'Welcome & Environment Setup', duration: '7:00', isFreePreview: true },
          { index: 2, title: 'Variables, Data Types & Operators', duration: '16:30', isFreePreview: true },
          { index: 3, title: 'Control Flow: if, for, while', duration: '18:00' },
          { index: 4, title: 'Functions, Scope & Lambdas', duration: '20:15' },
          { index: 5, title: 'Lists, Dicts, Sets & Tuples', duration: '14:30' },
          { index: 6, title: 'Object-Oriented Python (OOP)', duration: '8:45' },
        ],
      },
      {
        title: 'Section 2: Data Analysis with NumPy & Pandas',
        lessonCount: 5,
        totalDuration: '1h 35m',
        lessons: [
          { index: 1, title: 'NumPy Arrays & Broadcasting', duration: '20:00' },
          { index: 2, title: 'Pandas DataFrames: Load, Clean, Explore', duration: '24:30' },
          { index: 3, title: 'GroupBy, Merge & Pivot Tables', duration: '18:00' },
          { index: 4, title: 'Handling Missing Data & Outliers', duration: '16:30' },
          { index: 5, title: 'Exploratory Data Analysis Project', duration: '16:00' },
        ],
      },
      {
        title: 'Section 3: Data Visualization',
        lessonCount: 4,
        totalDuration: '58m',
        lessons: [
          { index: 1, title: 'Matplotlib: Lines, Bars, Scatterplots', duration: '16:00' },
          { index: 2, title: 'Seaborn: Statistical Visualizations', duration: '14:30' },
          { index: 3, title: 'Plotly: Interactive Dashboards', duration: '18:00' },
          { index: 4, title: 'Storytelling with Data', duration: '9:30' },
        ],
      },
      {
        title: 'Section 4: Machine Learning with Scikit-Learn',
        lessonCount: 6,
        totalDuration: '2h 10m',
        lessons: [
          { index: 1, title: 'Supervised vs. Unsupervised Learning', duration: '12:00' },
          { index: 2, title: 'Linear & Logistic Regression', duration: '24:30' },
          { index: 3, title: 'Decision Trees & Random Forests', duration: '22:00' },
          { index: 4, title: 'Support Vector Machines', duration: '18:30' },
          { index: 5, title: 'Model Evaluation: Accuracy, Precision, Recall', duration: '20:00' },
          { index: 6, title: 'Feature Engineering & Hyperparameter Tuning', duration: '13:00' },
        ],
      },
      {
        title: 'Section 5: Deep Learning & Deployment',
        lessonCount: 5,
        totalDuration: '1h 45m',
        lessons: [
          { index: 1, title: 'Neural Networks: How They Actually Work', duration: '22:00' },
          { index: 2, title: 'Building CNNs with TensorFlow/Keras', duration: '26:00' },
          { index: 3, title: 'Transfer Learning with Pre-Trained Models', duration: '18:30' },
          { index: 4, title: 'Deploying ML Models with FastAPI', duration: '20:30' },
          { index: 5, title: 'Capstone Project Walkthrough', duration: '18:00' },
        ],
      },
    ],
  };

  const course4 = await prisma.course.upsert({
    where: { slug: course4Data.slug },
    update: course4Data,
    create: course4Data,
  });

  console.log('✅ Course 4 upserted.');

  console.log('📦 Upserting Course 5...');
  // ─── COURSE 5: Financial Freedom ──────────────────────────────────────────
  const course5Data = {
    title: 'Financial Freedom Blueprint: Investing & Wealth',
    slug: 'financial-freedom-blueprint',
    shortDescription:
      'Build passive income streams, master the stock market, and create the financial independence you deserve.',
    description: `Most people spend their entire lives trading time for money. This course teaches you the systems, strategies, and mindset shifts used by financially free individuals to build lasting, multi-generational wealth.

> "Wealth isn't about making a lot of money; it's about making your money make a lot of money while you sleep. The sooner you start building asset structures, the sooner you find freedom."

### Escaping the Rat Race

Covering stocks, ETFs, real estate, and passive income vehicles — this is the financial education your school never gave you. Every module is built around specific, actionable steps you can take this week — not abstract theory or "get rich quick" schemes.

### Key Highlights:

- Build your own tax-efficient "lazy portfolio" utilizing ETFs.
- Decode and interpret the real estate market cycles for Buy-to-Let opportunities.
- Learn to manage risk properly during market downturns.
- Establish alternative streams of income that don't trade your time for money.`,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop',
    price: 149,
    originalPrice: 249,
    published: true,
    category: 'Business & Finance',
    level: 'All Levels',
    duration: '10h 20m',
    rating: 4.8,
    reviewsCount: 2983,
    studentsCount: 18700,
    instructorId: marcus.id,
    outcomes: [
      'Understand how money, compounding, and wealth generation actually works.',
      'Build a personalized investment strategy based on your risk profile.',
      'Invest in index funds, ETFs, and dividend stocks with confidence.',
      'Analyze real estate opportunities and understand leverage.',
      'Create multiple streams of passive income.',
      'Reduce tax liability legally through smart financial structures.',
    ],
    requirements: [
      'No financial background required — completely beginner-friendly.',
      'A willingness to take control of your financial future.',
      'A smartphone or computer to access a brokerage account.',
    ],
    curriculum: [
      {
        title: 'Section 1: Wealth Mindset & Money Fundamentals',
        lessonCount: 5,
        totalDuration: '52m',
        lessons: [
          { index: 1, title: 'Why 95% of People Never Build Wealth', duration: '9:00', isFreePreview: true },
          { index: 2, title: 'The Power of Compound Interest (Visual Demo)', duration: '14:30', isFreePreview: true },
          { index: 3, title: 'Tracking Net Worth & Setting Financial Goals', duration: '12:00' },
          { index: 4, title: 'Budgeting Systems: 50/30/20 & Zero-Based', duration: '10:30' },
          { index: 5, title: 'Emergency Funds & Eliminating High-Interest Debt', duration: '6:00' },
        ],
      },
      {
        title: 'Section 2: Stock Market Investing',
        lessonCount: 6,
        totalDuration: '1h 28m',
        lessons: [
          { index: 1, title: 'How the Stock Market Works', duration: '14:00' },
          { index: 2, title: 'Index Funds & ETFs: The Lazy Way to Wealth', duration: '16:30' },
          { index: 3, title: 'Analyzing Individual Stocks (Fundamentals)', duration: '20:00' },
          { index: 4, title: 'Dollar-Cost Averaging Strategy', duration: '10:00' },
          { index: 5, title: 'How to Use a Brokerage Account', duration: '14:30' },
          { index: 6, title: 'Tax-Advantaged Accounts: IRA, 401k, ISA', duration: '13:00' },
        ],
      },
      {
        title: 'Section 3: Real Estate & Alternative Investments',
        lessonCount: 4,
        totalDuration: '58m',
        lessons: [
          { index: 1, title: 'Buy-to-Let: Numbers, Financing & ROI', duration: '18:30' },
          { index: 2, title: 'REITs: Real Estate Without the Headaches', duration: '12:00' },
          { index: 3, title: 'Crypto, Gold & Commodities — Diversification', duration: '16:00' },
          { index: 4, title: 'Building a Balanced Portfolio Across Asset Classes', duration: '11:30' },
        ],
      },
      {
        title: 'Section 4: Creating Passive Income Streams',
        lessonCount: 5,
        totalDuration: '1h 5m',
        lessons: [
          { index: 1, title: 'The 7 Streams of Income Explained', duration: '10:00' },
          { index: 2, title: 'Dividend Investing for Monthly Cash Flow', duration: '16:30' },
          { index: 3, title: 'Digital Products & Online Courses as Assets', duration: '14:00' },
          { index: 4, title: 'Rental Income Automation Systems', duration: '13:30' },
          { index: 5, title: 'Your 10-Year Wealth Plan — Building It Now', duration: '11:00' },
        ],
      },
    ],
  };

  const course5 = await prisma.course.upsert({
    where: { slug: course5Data.slug },
    update: course5Data,
    create: course5Data,
  });

  console.log('✅ Course 5 upserted.');

  console.log('📦 Upserting Course 6...');
  // ─── COURSE 6: Deep Work Mastery ──────────────────────────────────────────
  const course6Data = {
    title: 'Deep Work Mastery: Productivity & Focus Systems',
    slug: 'deep-work-mastery-productivity-focus',
    shortDescription:
      'Build the habits, systems, and environment that allow you to do 8 hours of work in 4 — and reclaim your time.',
    description: `In a world of constant distraction, the ability to focus deeply is your most valuable professional skill. The research is clear: people who can concentrate without distraction are producing the work that matters — and they're rare.

> "Deep work is not a buzzword; it's the superpower of the 21st century economy. When you learn to protect your attention, you take control of your career and your life."

### Building Unbreakable Habits

This course distills the best research from Cal Newport, James Clear, and the Huberman Lab into a practical, proven system. You'll redesign your work environment, calendar, and habits to produce your best output consistently — without burning out.

### Key Highlights:

- Discover your daily chronotype and schedule focused work accordingly.
- Use advanced time-blocking templates to schedule tasks securely.
- Learn the "Shutdown Ritual" to properly disconnect from your work day mentally.
- Identify the subtle digital addictions that waste up to 4 hours of your day.`,
    thumbnailUrl:
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop',
    price: 89,
    originalPrice: 149,
    published: true,
    category: 'Personal Development',
    level: 'All Levels',
    duration: '8h 0m',
    rating: 4.9,
    reviewsCount: 5421,
    studentsCount: 31000,
    instructorId: alex.id,
    outcomes: [
      'Eliminate digital distractions and achieve flow states on demand.',
      'Design a work schedule that maximizes your peak cognitive hours.',
      'Apply the Deep Work protocol to produce world-class output.',
      'Use time-blocking and the Weekly Review system for maximum clarity.',
      'Build atomic habits that compound over months and years.',
      'Create a distraction-free digital and physical environment.',
    ],
    requirements: [
      'No prior knowledge needed — open mind required.',
      'A notebook and pen for completing the exercises.',
      'Commitment to implementing what you learn immediately.',
    ],
    curriculum: [
      {
        title: 'Section 1: The Science of Focus & Deep Work',
        lessonCount: 5,
        totalDuration: '52m',
        lessons: [
          { index: 1, title: "What is Deep Work and Why It's Rare", duration: '8:30', isFreePreview: true },
          { index: 2, title: 'The Neuroscience of Attention & Flow States', duration: '14:00', isFreePreview: true },
          { index: 3, title: 'Digital Minimalism: Auditing Your Tools', duration: '12:30' },
          { index: 4, title: 'Structuring Your 4 Deep Work Blocks Per Day', duration: '10:00' },
          { index: 5, title: 'Session 1 Challenge: Your First Deep Work Day', duration: '7:00' },
        ],
      },
      {
        title: 'Section 2: Time Architecture & Scheduling Systems',
        lessonCount: 5,
        totalDuration: '58m',
        lessons: [
          { index: 1, title: 'Time-Blocking: The Ultimate Calendar Method', duration: '14:30' },
          { index: 2, title: 'The Weekly Review Ritual (Full Template)', duration: '12:00' },
          { index: 3, title: 'Task Management: GTD vs. Eat The Frog', duration: '10:30' },
          { index: 4, title: 'Managing Email Without Email Managing You', duration: '11:00' },
          { index: 5, title: 'Saying No: Protecting Your Attention Capital', duration: '10:00' },
        ],
      },
      {
        title: 'Section 3: Habits, Recovery & Long-Term Performance',
        lessonCount: 5,
        totalDuration: '1h 8m',
        lessons: [
          { index: 1, title: 'Atomic Habits Applied to Deep Work', duration: '16:00' },
          { index: 2, title: 'Sleep Optimization for Cognitive Performance', duration: '14:30' },
          { index: 3, title: 'Exercise, Nutrition & Brain Performance', duration: '13:00' },
          { index: 4, title: 'Avoiding Burnout: Sustainable Intensity', duration: '12:30' },
          { index: 5, title: 'Your 90-Day Deep Work Transformation Plan', duration: '12:00' },
        ],
      },
    ],
  };

  const course6 = await prisma.course.upsert({
    where: { slug: course6Data.slug },
    update: course6Data,
    create: course6Data,
  });

  console.log('✅ Course 6 upserted.');

  console.log('📦 Seeding Enrollments...');
  // Auto-enrollments removed: users enroll manually via Explore page catalog.

  console.log('🌱 Seeding Joel Ndakwe (upskiill201@gmail.com) test courses...');
  const joel = await prisma.user.upsert({
    where: { email: 'upskiill201@gmail.com' },
    update: {
      fullName: 'Joel Ndakwe',
      hasCreatorAccess: true,
      hasStudentAccess: true,
      role: 'INSTRUCTOR',
    },
    create: {
      email: 'upskiill201@gmail.com',
      fullName: 'Joel Ndakwe',
      password: '$2b$10$T1VFY3vAxGsJk6/VCa1A4Osfu9d0BrjMnJeQloTiyWpvkfrBjfM62', // 'password123'
      role: 'INSTRUCTOR',
      hasCreatorAccess: true,
      hasStudentAccess: true,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80',
    },
  });

  await prisma.profile.upsert({
    where: { userId: joel.id },
    update: {
      avatarUrl: joel.avatarUrl,
      niche: 'Design',
      teachingStyle: 'Gamified & Interactive',
    },
    create: {
      userId: joel.id,
      avatarUrl: joel.avatarUrl,
      niche: 'Design',
      teachingStyle: 'Gamified & Interactive',
    },
  });

  const joelCourses = [
    {
      id: 'c1-joel',
      title: 'Figma UI/UX Essentials: Zero to Hero',
      slug: 'figma-ui-ux-essentials-zero-to-hero',
      shortDescription: 'Master the complete design lifecycle in Figma — components, auto-layout, prototyping, and developer handoff.',
      description: 'Learn the industry-standard UI/UX design tool from scratch. This course guides you from basic shapes to building full-scale design systems and responsive component libraries. You will construct high-fidelity interactive prototypes ready for user testing.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
      price: 0,
      originalPrice: 99,
      published: true, // Published
      category: 'Design',
      subcategory: 'UI/UX Design',
      level: 'Beginner',
      duration: '12h 30m',
      creatorTimeWeekly: '2-4 hours',
      subtitle: 'Build interactive prototypes and high-fidelity wireframes.',
      language: 'English',
      skills: ['Figma', 'UI Design', 'UX Prototyping', 'Component Libraries', 'Auto-Layout'],
      requirements: ['Basic computer skills and an internet connection'],
      outcomes: [
        'Create fully interactive app prototypes with modern animations',
        'Master auto-layout and constraints for responsive UI cards',
        'Deliver developer-ready Figma handoffs with clean specs'
      ],
      instructorId: joel.id,
      modules: [
        { title: 'Module 1: Figma Basics & Vector Network', orderIndex: 0 },
        { title: 'Module 2: Layout Systems, Grids & Alignment', orderIndex: 1 },
        { title: 'Module 3: Components, Variants & Properties', orderIndex: 2 },
        { title: 'Module 4: Advanced Auto-Layout & Constraints', orderIndex: 3 },
        { title: 'Module 5: Prototyping, Micro-Interactions & Handoff', orderIndex: 4 }
      ]
    },
    {
      id: 'c2-joel',
      title: 'Full-Stack Web Development: Modern HTML, CSS & JS',
      slug: 'full-stack-web-development-modern-html-css-js',
      shortDescription: 'Learn HTML5, CSS3 Grid/Flexbox, responsive design, and ES6 JavaScript to build live web projects.',
      description: 'Start your coding career by building solid foundations in web technologies. You will learn semantic markup, modern responsive CSS layouts, and logical DOM manipulation with vanilla JavaScript. You will build and host 3 real responsive websites.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=800&auto=format&fit=crop',
      price: 0,
      originalPrice: 149,
      published: true, // Published
      category: 'Development',
      subcategory: 'Web Development',
      level: 'Beginner',
      duration: '15h 45m',
      creatorTimeWeekly: '5+ hours',
      subtitle: 'Master vanilla frontend coding with hands-on labs.',
      language: 'English',
      skills: ['HTML5', 'CSS3 Flexbox & Grid', 'JavaScript ES6', 'Responsive Web Design', 'DOM Manipulation'],
      requirements: ['No prior programming experience required'],
      outcomes: [
        'Build mobile-first, responsive landing pages from scratch',
        'Add rich interactive modules using JavaScript click/scroll events',
        'Deploy production websites to free cloud hosting platforms'
      ],
      instructorId: joel.id,
      modules: [
        { title: 'Module 1: Semantic Markup & HTML5 Foundations', orderIndex: 0 },
        { title: 'Module 2: Advanced Layout with Flexbox & CSS Grid', orderIndex: 1 },
        { title: 'Module 3: JavaScript ES6 Core Concepts', orderIndex: 2 },
        { title: 'Module 4: DOM Manipulation & Event Handling', orderIndex: 3 },
        { title: 'Module 5: Working with APIs & Hosting Your App', orderIndex: 4 }
      ]
    },
    {
      id: 'c3-joel',
      title: 'Startup Pitch Deck: Design & Presentation Blueprint',
      slug: 'startup-pitch-deck-design-presentation-blueprint',
      shortDescription: 'Discover the visual and narrative framework used by elite startups to raise pre-seed and seed venture capital.',
      description: 'An expert-led blueprint for designing and writing slide decks that convert. You will learn the exact 10-slide narrative arch, from problem definition to market size, business models, and the final VC financial ask.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
      price: 0,
      originalPrice: 79,
      published: true, // Published
      category: 'Business',
      subcategory: 'General',
      level: 'Intermediate',
      duration: '8h 20m',
      creatorTimeWeekly: '0-2 hours',
      subtitle: 'Craft narratives and slide decks that secure VC backing.',
      language: 'English',
      skills: ['Pitch Decks', 'Venture Capital', 'Startup Narrative', 'Presentation Design', 'Business Modeling'],
      requirements: ['A rough startup concept or initial business outline'],
      outcomes: [
        'Design a high-converting 10-slide investor pitch deck',
        'Deliver a confident presentation answering tough partner questions',
        'Explain pre-seed valuation models and investment terms clearly'
      ],
      instructorId: joel.id,
      modules: [
        { title: 'Module 1: The Narrative Arc & Problem Hook', orderIndex: 0 },
        { title: 'Module 2: Market Sizing (TAM/SAM/SOM) & Competition', orderIndex: 1 },
        { title: 'Module 3: Business Models & Product Unit Economics', orderIndex: 2 },
        { title: 'Module 4: Slides Design & Visual Styling', orderIndex: 3 },
        { title: 'Module 5: Pitch Delivery & Answering VCs Q&A', orderIndex: 4 }
      ]
    },
    {
      id: 'c4-joel',
      title: 'AI Product Management: Building LLM Applications',
      slug: 'ai-product-management-building-llm-applications',
      shortDescription: 'Write intelligent PRDs, evaluate API options, and design conversational UIs for machine learning products.',
      description: 'Learn how to transition from traditional software management to AI product leadership. This course covers LLM integration strategies, conversational user design, context management, prompt engineering basics, and cost/latency modeling.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop',
      price: 0,
      originalPrice: 129,
      published: false, // Draft (Not Published)
      category: 'IT & Software',
      subcategory: 'General',
      level: 'Intermediate',
      duration: '10h 0m',
      creatorTimeWeekly: '2-4 hours',
      subtitle: 'Manage intelligent software lifecycles with LLM services.',
      language: 'English',
      skills: ['Product Management', 'Artificial Intelligence', 'LLM Integration', 'Conversational UX', 'PRD Structuring'],
      requirements: ['Basic understanding of software product cycles (Agile/Scrum)'],
      outcomes: [
        'Write robust Product Requirements Documents (PRDs) for AI features',
        'Assess performance, cost, and safety benchmarks of LLM providers',
        'Design intuitive chatbot user interactions and safety guardrails'
      ],
      instructorId: joel.id,
      modules: [
        { title: 'Module 1: Introduction to AI PM & Machine Learning', orderIndex: 0 },
        { title: 'Module 2: Prompt Engineering & Context Windows', orderIndex: 1 },
        { title: 'Module 3: Designing Chatbots & Conversational UX', orderIndex: 2 },
        { title: 'Module 4: Writing AI/ML Product Requirement Docs', orderIndex: 3 },
        { title: 'Module 5: LLM APIs, Latency & Cost Optimization', orderIndex: 4 }
      ]
    },
    {
      id: 'c5-joel',
      title: 'No-Code Mobile Apps: Launch Without Programming',
      slug: 'no-code-mobile-apps-launch-without-programming',
      shortDescription: 'Design, database-model, and publish custom iOS and Android mobile apps visually using visual tools.',
      description: 'Build functional native mobile applications without coding. You will learn database relationship building, user authentication configurations, interactive UI logic, and step-by-step Apple App Store & Google Play publishing.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
      price: 0,
      originalPrice: 89,
      published: false,
      category: 'Development',
      subcategory: 'Mobile Apps',
      level: 'Beginner',
      duration: '7h 30m',
      creatorTimeWeekly: '2-4 hours',
      subtitle: 'Visually develop database-driven native mobile apps.',
      language: 'English',
      skills: ['No-Code Development', 'Adalo / Glide', 'Visual Database Design', 'App Store Publishing'],
      requirements: ['No prior programming experience required'],
      outcomes: [
        'Design and deploy database-driven native mobile apps visually',
        'Wire user sign-ups, forms, and relation tables without SQL',
        'Publish native app bundles ready for iOS and Android app stores'
      ],
      instructorId: joel.id,
      modules: [
        { title: 'Module 1: No-Code Ecosystem & Interface Building', orderIndex: 0 },
        { title: 'Module 2: Visual Databases & Relational Schemas', orderIndex: 1 },
        { title: 'Module 3: User Authentication & Security Settings', orderIndex: 2 },
        { title: 'Module 4: Form Actions, Logic & Interactive Flows', orderIndex: 3 },
        { title: 'Module 5: Apple App Store & Google Play Publishing', orderIndex: 4 }
      ]
    },
  ];

  for (const course of joelCourses) {
    const c = await prisma.course.upsert({
      where: { slug: course.slug },
      update: {
        title: course.title,
        description: course.description,
        shortDescription: course.shortDescription,
        thumbnailUrl: course.thumbnailUrl,
        price: course.price,
        originalPrice: course.originalPrice,
        published: course.published,
        category: course.category,
        subcategory: course.subcategory,
        level: course.level,
        duration: course.duration,
        creatorTimeWeekly: course.creatorTimeWeekly,
        subtitle: course.subtitle,
        language: course.language,
        skills: course.skills,
        requirements: course.requirements,
        outcomes: course.outcomes,
        instructorId: course.instructorId,
      },
      create: {
        id: course.id,
        title: course.title,
        slug: course.slug,
        description: course.description,
        shortDescription: course.shortDescription,
        thumbnailUrl: course.thumbnailUrl,
        price: course.price,
        originalPrice: course.originalPrice,
        published: course.published,
        category: course.category,
        subcategory: course.subcategory,
        level: course.level,
        duration: course.duration,
        creatorTimeWeekly: course.creatorTimeWeekly,
        subtitle: course.subtitle,
        language: course.language,
        skills: course.skills,
        requirements: course.requirements,
        outcomes: course.outcomes,
        instructorId: course.instructorId,
      },
    });

    console.log(`✅ Joel Course upserted: "${c.title}"`);

    for (const mod of course.modules) {
      const sectionId = `sec-${c.id}-m${mod.orderIndex + 1}`;
      
      const s = await prisma.section.upsert({
        where: { id: sectionId },
        update: {
          title: mod.title,
          orderIndex: mod.orderIndex,
        },
        create: {
          id: sectionId,
          title: mod.title,
          orderIndex: mod.orderIndex,
          courseId: c.id,
        },
      });

      for (let lIdx = 1; lIdx <= 5; lIdx++) {
        const lessonNumber = mod.orderIndex * 5 + lIdx;
        const lessonId = `les-${c.id}-m${mod.orderIndex + 1}-l${lIdx}`;
        const lessonTitle = `Lesson ${lessonNumber}: Core Concepts & Execution`;
        const lessonDesc = `Deep dive and practical application exercises for Lesson ${lessonNumber} inside this course framework.`;

        const contentBlocks = {
          learn: [
            {
              id: `blk-${lessonId}-learn-vid`,
              type: 'videoUrl',
              value: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
            },
            {
              id: `blk-${lessonId}-learn-aud`,
              type: 'audioUrl',
              value: '',
            },
            {
              id: `blk-${lessonId}-learn-txt`,
              type: 'text',
              value: `<p>Welcome to Lesson ${lessonNumber}. In this session, you will learn the foundational workflow paradigms. Review the guidelines below.</p>`,
            },
          ],
          apply: [
            {
              type: 'mcqActivity',
              value: {
                scenario: `You are working on a project task corresponding to Lesson ${lessonNumber} specifications.`,
                passingScore: 70,
                allowRetries: true,
                difficultyLevel: 'medium',
                questions: [
                  {
                    id: `q_1_${lessonId}`,
                    questionText: `What is the primary best practice recommended for Lesson ${lessonNumber}?`,
                    options: [
                      { id: `opt_1_${lessonId}`, text: 'Following standard visual hierarchy and structures', misconception: '' },
                      { id: `opt_2_${lessonId}`, text: 'Ignoring design tokens and formatting models', misconception: 'Misconception: Design consistency is critical.' }
                    ],
                    correctOptionId: `opt_1_${lessonId}`,
                    explanation: 'Consistency in hierarchy ensures usability and product success.'
                  }
                ]
              }
            }
          ],
          reflect: [
            {
              type: 'reflectActivity',
              value: {
                prompt: `Reflecting on Lesson ${lessonNumber}, how will you incorporate this workflow directly into your personal design operations?`,
                type: 'open',
                openConfig: {
                  useStarters: true,
                  starters: [
                    { id: `s_1_${lessonId}`, text: 'I think this model...' },
                    { id: `s_2_${lessonId}`, text: 'I will start adopting this by...' }
                  ],
                  minWordCount: 20,
                  required: true,
                  peerVisibility: false,
                  allowComments: false,
                  allowAttachments: false
                },
                guidedConfig: {
                  questions: [{ id: `q_guid_1_${lessonId}`, text: 'Summarize the core benefit.' }],
                  minWordCountPerQuestion: 10,
                  required: true,
                  allowAttachments: false
                }
              }
            }
          ],
          deepen: [
            {
              type: 'deepenActivity',
              value: {
                collectionTitle: 'Best Practices Guide',
                collectionDescription: `Deepen your knowledge on Lesson ${lessonNumber} with official documentation references.`,
                resourceSettings: {
                  makeRequired: true,
                  trackCompletion: true,
                  allowDownloads: true,
                  openInNewTab: true
                },
                recommendedNextStep: { type: 'continue' },
                showLearningPathSuggestions: false,
                learningPathSuggestions: []
              }
            }
          ]
        };

        const stepCompletion = {
          learn: true,
          apply: true,
          reflect: true,
          deepen: true,
        };

        await prisma.lesson.upsert({
          where: { id: lessonId },
          update: {
            title: lessonTitle,
            shortDescription: lessonDesc,
            lessonType: 'video',
            orderIndex: lIdx - 1,
            isFreePreview: lIdx === 1 && mod.orderIndex === 0,
            durationMinutes: 15,
            status: 'published',
            contentBlocks,
            stepCompletion,
          },
          create: {
            id: lessonId,
            title: lessonTitle,
            shortDescription: lessonDesc,
            lessonType: 'video',
            orderIndex: lIdx - 1,
            isFreePreview: lIdx === 1 && mod.orderIndex === 0,
            durationMinutes: 15,
            status: 'published',
            sectionId: s.id,
            contentBlocks,
            stepCompletion,
          },
        });

        const resourceId = `res-${lessonId}`;
        await prisma.lessonResource.upsert({
          where: { id: resourceId },
          update: {
            title: 'Official Technical Reference Specifications',
            type: 'link',
            storageUrl: 'https://teyro.com/resources/specification-sheet',
            displayOrder: 0,
          },
          create: {
            id: resourceId,
            lessonId,
            title: 'Official Technical Reference Specifications',
            type: 'link',
            storageUrl: 'https://teyro.com/resources/specification-sheet',
            displayOrder: 0,
          }
        });
      }
    }
  }

  console.log('🎉 All courses seeded successfully!');

  console.log('🎡 Seeding Lucky Spin segments...');
  const segments = [
    { id: 'seg-0', segmentIndex: 0, rewardType: 'COINS', amountMin: 50, amountMax: 50, rarityTier: 'common', weight: 30, colorKey: '#3B82F6' },
    { id: 'seg-1', segmentIndex: 1, rewardType: 'XP', amountMin: 20, amountMax: 20, rarityTier: 'common', weight: 20, colorKey: '#EC4899' },
    { id: 'seg-2', segmentIndex: 2, rewardType: 'COINS', amountMin: 100, amountMax: 100, rarityTier: 'uncommon', weight: 15, colorKey: '#EAB308' },
    { id: 'seg-3', segmentIndex: 3, rewardType: 'HEARTS', amountMin: 1, amountMax: 1, rarityTier: 'common', weight: 15, colorKey: '#22C55E' },
    { id: 'seg-4', segmentIndex: 4, rewardType: 'XP', amountMin: 50, amountMax: 50, rarityTier: 'uncommon', weight: 10, colorKey: '#A855F7' },
    { id: 'seg-5', segmentIndex: 5, rewardType: 'COINS', amountMin: 200, amountMax: 200, rarityTier: 'rare', weight: 4, colorKey: '#EF4444' },
    { id: 'seg-6', segmentIndex: 6, rewardType: 'XP', amountMin: 100, amountMax: 100, rarityTier: 'rare', weight: 5, colorKey: '#3B82F6' },
    { id: 'seg-7', segmentIndex: 7, rewardType: 'STREAK_FREEZE', amountMin: 1, amountMax: 1, rarityTier: 'rare', weight: 1, colorKey: '#EAB308' },
  ];

  for (const seg of segments) {
    await prisma.spinWheelSegment.upsert({
      where: { id: seg.id },
      update: seg,
      create: seg,
    });
  }
  console.log('✅ Lucky Spin segments seeded.');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

