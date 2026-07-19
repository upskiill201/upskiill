import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // STRICT RULE CHECK: Every seed script must check NODE_ENV and throw if 'production'
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SEEDING POLICY VIOLATION: Cannot run seed script in production environment!');
  }

  console.log('🌱 Seeding learning outcomes (whatYouWillLearn) for courses created by Joel Ndakwe (upskiill201@gmail.com)...');

  // 1. Fetch Joel
  const joel = await prisma.user.findFirst({
    where: {
      email: {
        in: ['upskiill201@gmail.com', 'upskiill201@gamil.com']
      }
    }
  });

  if (!joel) {
    console.error('❌ User upskiill201@gmail.com not found in database.');
    return;
  }

  console.log(`✅ Found User: ${joel.fullName} (${joel.email}) - ID: ${joel.id}`);

  // 2. Fetch all courses (both published and draft) by this user
  const courses = await prisma.course.findMany({
    where: {
      instructorId: joel.id
    },
    include: {
      sections: {
        include: {
          lessons: true
        }
      }
    }
  });

  console.log(`📚 Found ${courses.length} courses to update.`);

  let totalUpdatedLessons = 0;

  for (const course of courses) {
    console.log(`\n📖 Processing course: "${course.title}" (${course.published ? 'published' : 'draft'})`);
    
    // Choose outcomes template based on course title
    const titleLower = course.title.toLowerCase();
    let getOutcomes: (lessonTitle: string) => string[];

    if (titleLower.includes('figma') || titleLower.includes('design') || titleLower.includes('ui/ux')) {
      getOutcomes = (lessonTitle: string) => [
        `Define visual hierarchy - Learn scaling and typography matching ${lessonTitle}`,
        `Master modern toolsets - Practice canvas styling and layouts in Figma`,
        `Design consistent assets - Build color and button component libraries`,
        `Implement responsive constraints - Align cards and grids for different devices`,
        `Build interactive prototypes - Add transitions and micro-interactions for ${lessonTitle}`
      ];
    } else if (titleLower.includes('web') || titleLower.includes('html') || titleLower.includes('js') || titleLower.includes('development') || titleLower.includes('coding')) {
      getOutcomes = (lessonTitle: string) => [
        `Understand semantic structure - Write clean DOM markup for ${lessonTitle}`,
        `Style layouts with Flex/Grid - Build clean responsive rows and columns`,
        `Write functional logic - Declare variables, loops, and conditions for ${lessonTitle}`,
        `Manipulate document nodes - Handle user click, scroll, and submit events`,
        `Fetch and display external data - Integrate public REST APIs and services`
      ];
    } else if (titleLower.includes('startup') || titleLower.includes('pitch') || titleLower.includes('business')) {
      getOutcomes = (lessonTitle: string) => [
        `Construct a strong hook - Engage investors from the very first slide`,
        `Outline core market problems - Define user pain points clearly for ${lessonTitle}`,
        `Model pricing structures - Present margins, costs, and revenue models`,
        `Map competitive landscapes - Highlight unique business advantages`,
        `Deliver a convincing call to action - Share your financial ask for ${lessonTitle}`
      ];
    } else {
      getOutcomes = (lessonTitle: string) => [
        `Understand core fundamentals - Learn key definitions and terms of ${lessonTitle}`,
        `Analyze real-world scenarios - Study practical industry examples of the topic`,
        `Master step-by-step techniques - Build your skills through interactive guides`,
        `Apply concepts to challenges - Practice with quizzes matching ${lessonTitle}`,
        `Reflect on learning outcomes - Consolidate your knowledge and next steps`
      ];
    }

    for (const section of course.sections) {
      console.log(`  📂 Section: "${section.title}"`);
      for (const lesson of section.lessons) {
        const outcomes = getOutcomes(lesson.title);
        
        const currentBlocks: any = lesson.contentBlocks ? (typeof lesson.contentBlocks === 'string' ? JSON.parse(lesson.contentBlocks) : lesson.contentBlocks) : {};
        const currentLearn = Array.isArray(currentBlocks.learn) ? currentBlocks.learn : [];
        const filteredLearn = currentLearn.filter((b: any) => b.type !== 'whatYouWillLearn');
        filteredLearn.push({ type: 'whatYouWillLearn', value: outcomes });
        
        const updatedBlocks = {
          ...currentBlocks,
          learn: filteredLearn
        };

        await prisma.lesson.update({
          where: { id: lesson.id },
          data: {
            contentBlocks: updatedBlocks
          }
        });
        
        console.log(`    ✅ Updated Lesson: "${lesson.title}" with 5 learning outcomes.`);
        totalUpdatedLessons++;
      }
    }
  }

  console.log(`\n🎉 Done! Successfully updated ${totalUpdatedLessons} lessons with learning outcomes.`);
}

main()
  .catch(e => {
    console.error('❌ Error seeding learning outcomes:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
