import prisma from './db';
import { seedDatabase } from './seed';
import { profileData, Project, Skill, Experience, Achievement, Certificate, Blog } from './profile';

async function ensureSeeded() {
  try {
    const skillCount = await prisma.skill.count();
    if (skillCount === 0) {
      await seedDatabase();
    }
  } catch (err) {
    console.warn('ensureSeeded: Database might not be initialized or accessible. Using static fallbacks.', err);
  }
}

export async function getPersonalInfo() {
  try {
    await ensureSeeded();
    const count = await getVisitorCount();
    return {
      ...profileData.personalInfo,
      visitorCount: count
    };
  } catch (e) {
    return {
      ...profileData.personalInfo,
      visitorCount: profileData.personalInfo.visitorCountStart
    };
  }
}

export async function getSkills(): Promise<Skill[]> {
  try {
    await ensureSeeded();
    const dbSkills = await prisma.skill.findMany();
    if (dbSkills.length === 0) return profileData.skills;
    return dbSkills.map(s => ({
      id: s.id,
      name: s.name,
      category: s.category as Skill['category'],
      level: s.level,
      icon: s.icon
    }));
  } catch (e) {
    console.error('getSkills failed, returning fallback static data:', e);
    return profileData.skills;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    await ensureSeeded();
    const dbProjects = await prisma.project.findMany();
    if (dbProjects.length === 0) return profileData.projects;
    return dbProjects.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category as Project['category'],
      techStack: p.techStack.split(',').map(s => s.trim()).filter(Boolean),
      features: p.features.split('\n').map(s => s.trim()).filter(Boolean),
      githubUrl: p.githubUrl,
      liveUrl: p.liveUrl,
      liveUrlAdmin: p.liveUrlAdmin || undefined,
      image: p.image,
      problemStatement: p.problemStatement,
      architecture: p.architecture,
      challenges: p.challenges,
      learnings: p.learnings,
      databaseDesign: p.databaseDesign,
      apiEndpoints: p.apiEndpoints,
      futureImprovements: p.futureImprovements
    }));
  } catch (e) {
    console.error('getProjects failed, returning fallback static data:', e);
    return profileData.projects;
  }
}

export async function getExperiences(): Promise<Experience[]> {
  try {
    await ensureSeeded();
    const dbExperiences = await prisma.experience.findMany({
      orderBy: { order: 'asc' }
    });
    if (dbExperiences.length === 0) return profileData.experiences;
    return dbExperiences.map(e => ({
      id: e.id,
      role: e.role,
      company: e.company,
      duration: e.duration,
      description: e.description.split('\n').map(s => s.trim()).filter(Boolean),
      type: e.type as Experience['type'],
      order: e.order
    }));
  } catch (e) {
    console.error('getExperiences failed, returning fallback static data:', e);
    return profileData.experiences;
  }
}

export async function getAchievements(): Promise<Achievement[]> {
  try {
    await ensureSeeded();
    const dbAchievements = await prisma.achievement.findMany({
      orderBy: { order: 'asc' }
    });
    if (dbAchievements.length === 0) return profileData.achievements;
    return dbAchievements.map(a => ({
      id: a.id,
      title: a.title,
      description: a.description,
      date: a.date,
      type: a.type as Achievement['type'],
      link: a.link || undefined,
      order: a.order
    }));
  } catch (e) {
    console.error('getAchievements failed, returning fallback static data:', e);
    return profileData.achievements;
  }
}

export async function getCertificates(): Promise<Certificate[]> {
  try {
    await ensureSeeded();
    const dbCertificates = await prisma.certificate.findMany({
      orderBy: { order: 'asc' }
    });
    if (dbCertificates.length === 0) return profileData.certificates;
    return dbCertificates.map(c => ({
      id: c.id,
      title: c.title,
      issuer: c.issuer,
      date: c.date,
      image: c.image,
      pdfUrl: c.pdfUrl,
      category: c.category,
      order: c.order
    }));
  } catch (e) {
    console.error('getCertificates failed, returning fallback static data:', e);
    return profileData.certificates;
  }
}

export async function getBlogs(): Promise<Blog[]> {
  try {
    await ensureSeeded();
    const dbBlogs = await prisma.blog.findMany();
    if (dbBlogs.length === 0) return profileData.blogs;
    return dbBlogs.map(b => ({
      id: b.id,
      slug: b.slug,
      title: b.title,
      description: b.description,
      content: b.content,
      tags: b.tags.split(',').map(s => s.trim()).filter(Boolean),
      category: b.category,
      date: b.date,
      published: b.published
    }));
  } catch (e) {
    console.error('getBlogs failed, returning fallback static data:', e);
    return profileData.blogs;
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    await ensureSeeded();
    const dbBlog = await prisma.blog.findUnique({
      where: { slug }
    });
    if (!dbBlog) {
      const fallback = profileData.blogs.find(b => b.slug === slug);
      return fallback || null;
    }
    return {
      id: dbBlog.id,
      slug: dbBlog.slug,
      title: dbBlog.title,
      description: dbBlog.description,
      content: dbBlog.content,
      tags: dbBlog.tags.split(',').map(s => s.trim()).filter(Boolean),
      category: dbBlog.category,
      date: dbBlog.date,
      published: dbBlog.published
    };
  } catch (e) {
    const fallback = profileData.blogs.find(b => b.slug === slug);
    return fallback || null;
  }
}

export async function getVisitorCount(): Promise<number> {
  try {
    const visitor = await prisma.visitor.findUnique({
      where: { id: 'singleton' }
    });
    return visitor ? visitor.count : profileData.personalInfo.visitorCountStart;
  } catch (e) {
    return profileData.personalInfo.visitorCountStart;
  }
}

export async function incrementVisitorCount(): Promise<number> {
  try {
    const visitor = await prisma.visitor.upsert({
      where: { id: 'singleton' },
      update: { count: { increment: 1 } },
      create: { id: 'singleton', count: profileData.personalInfo.visitorCountStart + 1 }
    });
    return visitor.count;
  } catch (e) {
    console.error('incrementVisitorCount failed:', e);
    return profileData.personalInfo.visitorCountStart;
  }
}

export async function addContactMessage(name: string, email: string, subject: string, message: string) {
  try {
    const dbMessage = await prisma.message.create({
      data: { name, email, subject, message }
    });
    return { success: true, data: dbMessage };
  } catch (e) {
    console.error('addContactMessage failed:', e);
    return { success: true, fallback: true };
  }
}

export async function getAnalytics() {
  try {
    const dbAnalytics = await prisma.analytics.findMany();
    return dbAnalytics;
  } catch (e) {
    return [];
  }
}

export async function incrementPageAnalytics(path: string) {
  try {
    const analytics = await prisma.analytics.upsert({
      where: { path },
      update: { views: { increment: 1 } },
      create: { path, views: 1, clicks: 0 }
    });
    return analytics;
  } catch (e) {
    return null;
  }
}
