import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create a dummy instructor
  const instructor = await prisma.user.upsert({
    where: { email: 'alex@upskiill.com' },
    update: {},
    create: {
      email: 'alex@upskiill.com',
      fullName: 'Alex Rivera',
      password: 'hashed_password_placeholder', // Dummy password for seeder
      role: 'INSTRUCTOR',
      avatarUrl:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop',
    },
  });

  console.log('Instructor created:', instructor.email);

  // 2. Create sample premium courses
  const course1 = await prisma.course.create({
    data: {
      title: 'Advanced Product Design & UX Strategy',
      slug: 'advanced-product-design-ux-strategy',
      shortDescription:
        'Master the complete design lifecycle, from user research and wireframing to high-fidelity prototyping.',
      description:
        "Welcome to the most comprehensive course on Product Design and UX Strategy available online. This isn't just another tutorial on how to use software. It's a deep-dive into the mindset, frameworks, and execution strategies used by the world's most successful tech companies.",
      thumbnailUrl:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop',
      price: 499,
      originalPrice: 799,
      published: true,
      category: 'Design',
      level: 'All Levels',
      duration: '12h 30m',
      rating: 4.9,
      reviewsCount: 3254,
      studentsCount: 15400,
      instructorId: instructor.id,
      whatYouWillLearn: [
        'Conduct deep user research and translate insights into actionable product features.',
        'Master Auto-Layout, Components, and Design Systems in Figma.',
        'Build clickable, high-fidelity prototypes for stakeholder testing.',
        'Understand behavioral psychology and how it drives user conversions.',
      ],
      requirements: [
        'No prior coding experience required.',
        'A Mac or PC with an internet connection.',
        'Basic familiarity with Figma or similar design tools is helpful, but not mandatory.',
      ],
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Full-Stack Next.js 14 Development',
      slug: 'fullstack-nextjs-14-development',
      shortDescription:
        'Build production-ready web applications using App Router, Server Actions, and Prisma.',
      description:
        'Learn modern web development by building a complete, high-performance web platform from scratch. We cover the latest features of Next.js alongside standard industry practices.',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
      price: 350,
      originalPrice: 500,
      published: true,
      category: 'Development',
      level: 'Intermediate',
      duration: '18h 0m',
      rating: 4.8,
      reviewsCount: 1200,
      studentsCount: 8900,
      instructorId: instructor.id,
      whatYouWillLearn: [
        'Build full-stack applications with Next.js App Router.',
        'Implement robust authentication systems.',
        'Interact with databases safely using Prisma ORM.',
      ],
      requirements: [
        'Solid understanding of JavaScript & React basics.',
        'Familiarity with foundational web concepts.',
      ],
    },
  });

  const course3 = await prisma.course.create({
    data: {
      title: 'Digital Marketing Mastery',
      slug: 'digital-marketing-mastery',
      shortDescription:
        'Uncover the secrets to driving millions of organic and paid impressions.',
      description:
        'Master SEO, PPC, and social media algorithms in this extensive marketing bootcamp geared towards massive scale growth.',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
      price: 199,
      originalPrice: 299,
      published: true,
      category: 'Marketing',
      level: 'Beginner',
      duration: '8h 45m',
      rating: 4.7,
      reviewsCount: 852,
      studentsCount: 4200,
      instructorId: instructor.id,
      whatYouWillLearn: [
        'Scale advertising campaigns effectively.',
        'Utilize advanced SEO techniques for 1st page ranking.',
      ],
      requirements: ['A laptop or tablet and a willingness to learn.'],
    },
  });

  console.log(
    'Seeded top courses:',
    course1.title,
    course2.title,
    course3.title,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
