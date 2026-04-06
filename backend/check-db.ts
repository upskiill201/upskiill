const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDB() {
  try {
    const allCourses = await prisma.course.findMany();
    console.log(`Found ${allCourses.length} TOTAL courses in the table.`);
    
    const courses = await prisma.course.findMany({ where: { published: true } });
    console.log(`Found ${courses.length} published courses.`);
    
    const students = await prisma.user.findMany({ where: { role: 'STUDENT' } });
    console.log(`Found ${students.length} students.`);
    
    for (const student of students) {
      const enrollments = await prisma.enrollment.findMany({ where: { userId: student.id } });
      console.log(`Student ${student.email} is enrolled in ${enrollments.length} courses.`);
    }
  } catch (err) {
    console.error('Error checking DB:', err);
  } finally {
    await prisma.$disconnect();
  }
}

checkDB();
