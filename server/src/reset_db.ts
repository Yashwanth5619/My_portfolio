import prisma from './db';
import { seedDatabase } from './seed';

async function run() {
  try {
    console.log('Clearing existing database tables...');
    await prisma.certificate.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.project.deleteMany();
    await prisma.experience.deleteMany();
    await prisma.achievement.deleteMany();
    await prisma.blog.deleteMany();
    
    console.log('Re-seeding database from updated profile.ts...');
    await seedDatabase();
    
    console.log('Database successfully updated and re-seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to reset and seed database:', error);
    process.exit(1);
  }
}

run();
