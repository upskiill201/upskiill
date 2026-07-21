import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Checking database student_profiles table structure ---');
  
  // Find any student profile
  const profile = await prisma.studentProfile.findFirst();
  
  if (profile) {
    console.log('✅ Success! Found a student profile record:');
    console.log({
      id: profile.id,
      userId: profile.userId,
      xp: (profile as any).xp,
      streakDays: (profile as any).streakDays,
      lives: (profile as any).lives,
      maxLives: (profile as any).maxLives,
      livesLastLostAt: (profile as any).livesLastLostAt,
    });
  } else {
    console.log('ℹ️ No student profiles exist yet in the database. Creating a test profile...');
    
    // Find a user to link
    const user = await prisma.user.findFirst();
    if (!user) {
      console.log('❌ Error: No users found in the database. Please register a user first.');
      return;
    }
    
    const newProfile = await prisma.studentProfile.create({
      data: {
        userId: user.id,
        xp: 15,
        streakDays: 2,
        lives: 5,
        maxLives: 5,
      }
    });
    
    console.log('✅ Created test student profile successfully:', newProfile);
  }
}

main()
  .catch((e) => {
    console.error('❌ Database check failed:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
