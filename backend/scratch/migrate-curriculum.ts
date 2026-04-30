import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrate() {
  console.log('🚀 Starting Curriculum Migration (JSON -> Relational)...');

  const courses = await prisma.course.findMany({
    where: {
      curriculum: {
        not: []
      }
    }
  });

  console.log(`Found ${courses.length} courses to investigate.`);

  for (const course of courses) {
    const curriculum = course.curriculum as any[];
    if (!curriculum || !Array.isArray(curriculum)) {
      console.log(`Skipping Course: ${course.title} (No valid JSON curriculum)`);
      continue;
    }

    console.log(`\nProcessing Course: ${course.title}...`);

    // Check if sections already exist to prevent duplicates
    const existingSections = await prisma.section.count({
      where: { courseId: course.id }
    });

    if (existingSections > 0) {
      console.log(`  - Skipping: Relational sections already exist for this course.`);
      continue;
    }

    for (let sIdx = 0; sIdx < curriculum.length; sIdx++) {
      const sectionData = curriculum[sIdx];
      
      console.log(`  - Creating Section: ${sectionData.title}`);
      
      const newSection = await prisma.section.create({
        data: {
          title: sectionData.title || 'Untitled Section',
          orderIndex: sIdx,
          courseId: course.id
        }
      });

      const lessons = sectionData.lessons || [];
      for (let lIdx = 0; lIdx < lessons.length; lIdx++) {
        const lessonData = lessons[lIdx];
        
        console.log(`    - Creating Lesson: ${lessonData.title}`);
        
        await prisma.lesson.create({
          data: {
            title: lessonData.title || 'Untitled Lesson',
            videoUrl: lessonData.videoUrl || null,
            durationMinutes: lessonData.durationMinutes || 0,
            isFreePreview: lessonData.isFreePreview || false,
            orderIndex: lIdx,
            sectionId: newSection.id
          }
        });
      }
    }
    console.log(`✅ Successfully migrated: ${course.title}`);
  }

  console.log('\n✨ Migration Complete!');
}

migrate()
  .catch((e) => {
    console.error('❌ Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
