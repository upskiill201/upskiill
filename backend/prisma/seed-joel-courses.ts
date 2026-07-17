import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Robust helper function to retry DB queries in case of connection dropouts or socket timeouts
async function runWithRetry<T>(fn: () => Promise<T>, retries = 5, delayMs = 1500): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (e: any) {
      if (i === retries - 1) throw e;
      console.warn(`⚠️ DB connection warning. Retrying in ${delayMs}ms... (Attempt ${i + 1}/${retries}). Error: ${e.message || e}`);
      await new Promise(r => setTimeout(r, delayMs));
    }
  }
  throw new Error('Max DB retries reached');
}

async function main() {
  // Rule 7 Check: Throw immediately if NODE_ENV is production
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SEEDING POLICY VIOLATION: Cannot run seed script in production environment!');
  }

  console.log('🌱 Seeding 5 free complete courses (5 modules, 5 lessons each) for Joel Ndakwe (upskiill201@gmail.com) with retry recovery...');

  // 1. Fetch or create the User Joel Ndakwe
  const email = 'upskiill201@gmail.com';
  const joel = await runWithRetry(() => prisma.user.upsert({
    where: { email },
    update: {
      fullName: 'Joel Ndakwe',
      hasCreatorAccess: true,
      hasStudentAccess: true,
      role: 'INSTRUCTOR',
    },
    create: {
      email,
      fullName: 'Joel Ndakwe',
      password: '$2b$10$T1VFY3vAxGsJk6/VCa1A4Osfu9d0BrjMnJeQloTiyWpvkfrBjfM62', // 'password123'
      role: 'INSTRUCTOR',
      hasCreatorAccess: true,
      hasStudentAccess: true,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&q=80',
    },
  }));

  console.log(`✅ Verified Instructor: ${joel.fullName} - ID: ${joel.id}`);

  // Create Profile if not exists
  await runWithRetry(() => prisma.profile.upsert({
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
  }));

  // 2. Define the 5 Courses data
  const coursesData = [
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
      published: false, // Draft (Not Published)
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

  // 3. Upsert courses (Rule 7 compliant - idempotent updates)
  for (const course of coursesData) {
    const c = await runWithRetry(() => prisma.course.upsert({
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
    }));

    console.log(`✅ Course upserted: "${c.title}" (ID: ${c.id})`);

    // 4. Create 5 modules (sections) and 5 lessons per module (total 25 lessons per course)
    for (const mod of course.modules) {
      const sectionId = `sec-${c.id}-m${mod.orderIndex + 1}`;
      
      const s = await runWithRetry(() => prisma.section.upsert({
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
      }));

      // 5 lessons per section -> total 25 lessons per course
      for (let lIdx = 1; lIdx <= 5; lIdx++) {
        const lessonNumber = mod.orderIndex * 5 + lIdx;
        const lessonId = `les-${c.id}-m${mod.orderIndex + 1}-l${lIdx}`;
        const lessonTitle = `Lesson ${lessonNumber}: Core Concepts & Execution`;
        const lessonDesc = `Deep dive and practical application exercises for Lesson ${lessonNumber} inside this course framework.`;

        // Define the content blocks fully matching expected builder frontend models
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

        // Define step completion state (all true so lessons show as fully validated)
        const stepCompletion = {
          learn: true,
          apply: true,
          reflect: true,
          deepen: true,
        };

        // Upsert Lesson
        await runWithRetry(() => prisma.lesson.upsert({
          where: { id: lessonId },
          update: {
            title: lessonTitle,
            shortDescription: lessonDesc,
            lessonType: 'video',
            orderIndex: lIdx - 1,
            isFreePreview: lIdx === 1 && mod.orderIndex === 0, // Free preview for first lesson
            durationMinutes: 15,
            status: 'published', // Published status
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
        }));

        // 5. Add at least 1 LessonResource row to satisfy resources.length > 0
        const resourceId = `res-${lessonId}`;
        await runWithRetry(() => prisma.lessonResource.upsert({
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
        }));
        
        // Add a 20ms cooling down delay between loop iterations to prevent PostgreSQL socket drops
        await new Promise(resolve => setTimeout(resolve, 20));
      }
    }
    console.log(`   └─ Successfully seeded 5 modules and 25 fully completed published lessons (Learn, Apply, Reflect, Deepen + Resources) for: "${course.title}"`);
  }

  // Enroll Joel Ndakwe in the three published seed courses
  console.log('📦 Enrolling Joel Ndakwe in the published seed courses...');
  const enrolledCourseSlugs = [
    'figma-ui-ux-essentials-zero-to-hero',
    'full-stack-web-development-modern-html-css-js',
    'startup-pitch-deck-design-presentation-blueprint'
  ];
  for (const slug of enrolledCourseSlugs) {
    const course = await prisma.course.findUnique({ where: { slug } });
    if (!course) {
      console.warn(`⚠️ Course with slug ${slug} not found for enrollment.`);
      continue;
    }
    const enrollmentId = `enroll-${joel.id}-${course.id}`;
    await runWithRetry(() => prisma.enrollment.upsert({
      where: {
        userId_courseId: {
          userId: joel.id,
          courseId: course.id,
        },
      },
      update: {
        progress: 15, // set a test progress
      },
      create: {
        id: enrollmentId,
        userId: joel.id,
        courseId: course.id,
        progress: 15,
        completedLessons: [],
      },
    }));
    console.log(`   └─ Successfully enrolled Joel Ndakwe in course: "${course.title}" (ID: ${course.id})`);
  }

  console.log('🎉 Seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
