import prisma from './db';
import { profileData } from './profile';

export async function seedDatabase() {
  try {
    const skillCount = await prisma.skill.count();
    if (skillCount > 0) {
      return { success: true, message: 'Already seeded' };
    }

    console.log('Seeding SQLite database with default profile settings...');

    // Seed Skills
    for (const skill of profileData.skills) {
      await prisma.skill.create({
        data: {
          name: skill.name,
          category: skill.category,
          level: skill.level,
          icon: skill.icon,
        },
      });
    }

    // Seed Projects
    for (const project of profileData.projects) {
      await prisma.project.create({
        data: {
          title: project.title,
          description: project.description,
          category: project.category,
          techStack: project.techStack.join(', '),
          features: project.features.join('\n'),
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl,
          liveUrlAdmin: project.liveUrlAdmin || null,
          image: project.image,
          problemStatement: project.problemStatement,
          architecture: project.architecture,
          challenges: project.challenges,
          learnings: project.learnings,
          databaseDesign: project.databaseDesign,
          apiEndpoints: project.apiEndpoints,
          futureImprovements: project.futureImprovements,
        },
      });
    }

    // Seed Experiences
    for (const exp of profileData.experiences) {
      await prisma.experience.create({
        data: {
          role: exp.role,
          company: exp.company,
          duration: exp.duration,
          description: exp.description.join('\n'),
          type: exp.type,
          order: exp.order,
        },
      });
    }

    // Seed Achievements
    for (const ach of profileData.achievements) {
      await prisma.achievement.create({
        data: {
          title: ach.title,
          description: ach.description,
          date: ach.date,
          type: ach.type,
          link: ach.link || null,
          order: ach.order,
        },
      });
    }

    // Seed Certificates
    for (const cert of profileData.certificates) {
      await prisma.certificate.create({
        data: {
          title: cert.title,
          issuer: cert.issuer,
          date: cert.date,
          image: cert.image,
          pdfUrl: cert.pdfUrl,
          category: cert.category,
          order: cert.order,
        },
      });
    }

    // Seed Blogs
    for (const blog of profileData.blogs) {
      await prisma.blog.create({
        data: {
          slug: blog.slug,
          title: blog.title,
          description: blog.description,
          content: blog.content,
          tags: blog.tags.join(', '),
          category: blog.category,
          date: blog.date,
          published: blog.published,
        },
      });
    }

    // Seed Visitor singleton
    await prisma.visitor.upsert({
      where: { id: 'singleton' },
      update: { count: profileData.personalInfo.visitorCountStart },
      create: { id: 'singleton', count: profileData.personalInfo.visitorCountStart },
    });

    console.log('Database seeded successfully!');
    return { success: true, message: 'Seeded successfully' };
  } catch (error) {
    console.error('Seeding failed:', error);
    return { success: false, error };
  }
}
export default seedDatabase;
