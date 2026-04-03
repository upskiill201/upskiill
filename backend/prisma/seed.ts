import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database — wiping old data first...');

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany({ where: { role: 'INSTRUCTOR' } });

  console.log('✅ Old data cleared.\n');

  // ─── INSTRUCTORS ──────────────────────────────────────────────────────────
  const alex = await prisma.user.create({
    data: {
      email: 'alex@upskiill.com',
      fullName: 'Alex Rivera',
      password: 'hashed_placeholder',
      role: 'INSTRUCTOR',
      avatarUrl:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&q=80',
    },
  });

  const sarah = await prisma.user.create({
    data: {
      email: 'sarah@upskiill.com',
      fullName: 'Sarah Chen',
      password: 'hashed_placeholder',
      role: 'INSTRUCTOR',
      avatarUrl:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&q=80',
    },
  });

  const marcus = await prisma.user.create({
    data: {
      email: 'marcus@upskiill.com',
      fullName: 'Marcus Johnson',
      password: 'hashed_placeholder',
      role: 'INSTRUCTOR',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80',
    },
  });

  console.log(`✅ Instructors: ${alex.fullName}, ${sarah.fullName}, ${marcus.fullName}\n`);

  // ─── COURSE 1: Product Design & UX ────────────────────────────────────────
  await prisma.course.create({
    data: {
      title: 'Advanced Product Design & UX Strategy',
      slug: 'advanced-product-design-ux-strategy',
      shortDescription:
        'Master the complete design lifecycle — from user research and wireframing to high-fidelity prototyping and handoff.',
      description:
        "Welcome to the most comprehensive course on Product Design and UX Strategy available online. This isn't just another tutorial on how to use software — it's a deep dive into the mindset, frameworks, and execution strategies used by the world's most successful tech companies.\n\nWe start with first principles: why do users behave the way they do? What makes an interface intuitive almost immediately? From there you'll build a complete design system, prototype a full mobile app, and leave with a portfolio project that's been tested with real users.\n\nBy the time you finish, you won't just 'know Figma' — you'll think like a designer.",
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
      whatYouWillLearn: [
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
      targetAudience: [
        {
          icon: 'FaUserGraduate',
          title: 'Complete Beginners',
          description: 'Zero design experience? Perfect. We start from absolute fundamentals.',
        },
        {
          icon: 'FaBriefcase',
          title: 'Product Managers',
          description: 'Learn to design, prototype and communicate ideas clearly to your team.',
        },
        {
          icon: 'FaLaptopCode',
          title: 'Frontend Developers',
          description: 'Bridge the gap. Understand the design process and collaborate better.',
        },
        {
          icon: 'FaPalette',
          title: 'Graphic Designers',
          description: 'Transition from print or brand design into the world of digital UX.',
        },
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
    },
  });

  // ─── COURSE 2: Full-Stack Next.js ─────────────────────────────────────────
  await prisma.course.create({
    data: {
      title: 'Full-Stack Next.js 15 Development',
      slug: 'fullstack-nextjs-15-development',
      shortDescription:
        'Build production-ready web applications using App Router, Server Actions, Prisma, and modern deployment pipelines.',
      description:
        "Learn modern full-stack web development by building a complete, high-performance SaaS platform from scratch. We cover the latest Next.js 15 features alongside standard industry practices — authentication, database design, payment integration, and CI/CD deployment.\n\nThis isn't a course about copying boilerplate. You'll understand every line of code you write and why it's there. We build a real product that you can show employers or ship to paying customers.\n\nBy the end, you'll be able to architect, build, and deploy any full-stack web application.",
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
      whatYouWillLearn: [
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
      targetAudience: [
        {
          icon: 'FaReact',
          title: 'React Developers',
          description: 'Ready to go beyond React and build production full-stack apps.',
        },
        {
          icon: 'FaCode',
          title: 'Junior Developers',
          description: 'Looking to level up from knowing JavaScript to shipping real products.',
        },
        {
          icon: 'FaBriefcase',
          title: 'Freelancers',
          description: 'Build client projects faster with a modern, deployment-ready stack.',
        },
        {
          icon: 'FaRocket',
          title: 'Startup Founders',
          description: 'Ship your MVP yourself — no agency needed.',
        },
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
    },
  });

  // ─── COURSE 3: Digital Marketing ──────────────────────────────────────────
  await prisma.course.create({
    data: {
      title: 'Digital Marketing Mastery 2025',
      slug: 'digital-marketing-mastery-2025',
      shortDescription:
        'Uncover the secrets to driving millions of organic and paid impressions — SEO, Google Ads, Meta Ads, and content strategy.',
      description:
        "Master the full digital marketing ecosystem. From SEO fundamentals to advanced paid advertising on Google and Meta, content strategy, email automation, and analytics — this bootcamp is built for real-world scale.\n\nYou'll walk away with live campaigns, proven swipe-file frameworks, and measurable results you can show any employer or client. We don't just teach theory — every module includes live screen recordings building and optimizing actual campaigns.\n\nMarketing is the highest-leverage skill in business. Let's make you dangerous at it.",
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
      whatYouWillLearn: [
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
      targetAudience: [
        {
          icon: 'FaStore',
          title: 'Small Business Owners',
          description: 'Get more customers online without hiring an agency.',
        },
        {
          icon: 'FaHandshake',
          title: 'Freelancers & Consultants',
          description: 'Learn to sell digital marketing services to clients.',
        },
        {
          icon: 'FaGraduationCap',
          title: 'Marketing Students',
          description: 'Add practical, real-world skills to your academic knowledge.',
        },
        {
          icon: 'FaRocket',
          title: 'Startup Founders',
          description: 'Generate leads and grow an audience from zero budget.',
        },
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
    },
  });

  // ─── COURSE 4: Python for Data Science ────────────────────────────────────
  await prisma.course.create({
    data: {
      title: 'Python for Data Science & Machine Learning',
      slug: 'python-data-science-machine-learning',
      shortDescription:
        'Go from zero to building real ML models — Python, NumPy, Pandas, Scikit-learn, and neural networks with TensorFlow.',
      description:
        "The most in-demand skill set in tech — all in one course. You'll start from Python basics and build your way up to training machine learning models, working with real Kaggle datasets, and deploying your models to production as REST APIs.\n\nTaught by an ex-Google data scientist with 10+ years of industry experience across FAANG companies, this course uses real datasets and real problems — not toy examples.\n\nData science can feel overwhelming. This course gives you a clear, structured path from beginner to job-ready.",
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
      whatYouWillLearn: [
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
      targetAudience: [
        {
          icon: 'FaUserGraduate',
          title: 'Absolute Beginners',
          description: 'Never coded before? We take you from hello world to ML models.',
        },
        {
          icon: 'FaChartLine',
          title: 'Data Analysts',
          description: 'Level up from Excel and SQL to Python and machine learning.',
        },
        {
          icon: 'FaBriefcase',
          title: 'Business Professionals',
          description: 'Use data to make better, evidence-based decisions at work.',
        },
        {
          icon: 'FaCode',
          title: 'Software Developers',
          description: 'Expand your skills into the fastest-growing area of tech.',
        },
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
    },
  });

  // ─── COURSE 5: Financial Freedom ──────────────────────────────────────────
  await prisma.course.create({
    data: {
      title: 'Financial Freedom Blueprint: Investing & Wealth',
      slug: 'financial-freedom-blueprint',
      shortDescription:
        'Build passive income streams, master the stock market, and create the financial independence you deserve.',
      description:
        "Most people spend their entire lives trading time for money. This course teaches you the systems, strategies, and mindset shifts used by financially free individuals to build lasting wealth.\n\nCovering stocks, ETFs, real estate, and passive income vehicles — this is the financial education your school never gave you. Every module is built around specific, actionable steps you can take this week — not abstract theory.\n\nYour financial freedom is a decision, not a circumstance. Make it today.",
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
      whatYouWillLearn: [
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
      targetAudience: [
        {
          icon: 'FaUserGraduate',
          title: 'Young Professionals',
          description: 'Start building wealth in your 20s and 30s — time is your biggest asset.',
        },
        {
          icon: 'FaBriefcase',
          title: 'Salaried Employees',
          description: 'Make your salary work harder for you with smart investing.',
        },
        {
          icon: 'FaStore',
          title: 'Business Owners',
          description: 'Move beyond trading time for money and build lasting wealth.',
        },
        {
          icon: 'FaHome',
          title: 'Aspiring Investors',
          description: 'Learn how to evaluate stocks, property, and alternative assets.',
        },
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
    },
  });

  // ─── COURSE 6: Deep Work Mastery ──────────────────────────────────────────
  await prisma.course.create({
    data: {
      title: 'Deep Work Mastery: Productivity & Focus Systems',
      slug: 'deep-work-mastery-productivity-focus',
      shortDescription:
        'Build the habits, systems, and environment that allow you to do 8 hours of work in 4 — and reclaim your time.',
      description:
        "In a world of constant distraction, the ability to focus deeply is your most valuable professional skill. The research is clear: people who can concentrate without distraction are producing the work that matters — and they're rare.\n\nThis course distills the best research from Cal Newport, James Clear, and the Huberman Lab into a practical, proven system. You'll redesign your work environment, calendar, and habits to produce your best output consistently — without burning out.\n\nFocus is a skill. It can be trained. Let's build it.",
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
      whatYouWillLearn: [
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
      targetAudience: [
        {
          icon: 'FaLaptopCode',
          title: 'Knowledge Workers',
          description: 'Developers, writers, designers who need sustained focus to produce great work.',
        },
        {
          icon: 'FaGraduationCap',
          title: 'Students',
          description: 'Study smarter, retain more, and achieve top results in less time.',
        },
        {
          icon: 'FaBriefcase',
          title: 'Managers & Leaders',
          description: 'Reclaim strategic thinking time buried under meetings and email.',
        },
        {
          icon: 'FaRocket',
          title: 'Entrepreneurs',
          description: 'Do the deep work that actually moves the needle in your business.',
        },
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
    },
  });

  console.log('🎉 All 6 courses seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
