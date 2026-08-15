import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { profileData } from './profile';
import prisma from './db';
import { 
  getPersonalInfo, getSkills, getProjects, 
  getExperiences, getAchievements, getCertificates, 
  getBlogs, getBlogBySlug, addContactMessage,
  incrementPageAnalytics, getAnalytics, incrementVisitorCount
} from './dataService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Middleware
app.use(cors({ origin: '*' })); // Allow requests from all origins (Vite local & deployed hosts)
app.use(express.json());

// Password Protection Middleware for Admin endpoints
const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || authHeader !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, error: 'Authentication failed. Unauthorized access.' });
  }
  next();
};

// ----------------------------------------------------
// PUBLIC API ENDPOINTS
// ----------------------------------------------------

app.get('/api/profile', async (req, res) => {
  try {
    const personalInfo = await getPersonalInfo();
    const skills = await getSkills();
    const projects = await getProjects();
    const experiences = await getExperiences();
    const achievements = await getAchievements();
    const certificates = await getCertificates();
    const blogs = await getBlogs();
    const { services, testimonials, education, areasOfInterest, strengths, softSkills, languagesKnown, funFacts } = profileData;

    res.json({
      success: true,
      data: {
        personalInfo,
        skills,
        projects,
        experiences,
        achievements,
        certificates,
        blogs,
        services,
        testimonials,
        education,
        areasOfInterest,
        strengths,
        softSkills,
        languagesKnown,
        funFacts
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await getProjects();
    res.json({ success: true, data: projects });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await getBlogs();
    res.json({ success: true, data: blogs });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const blog = await getBlogBySlug(req.params.slug);
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }
    res.json({ success: true, data: blog });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required.' });
    }
    const result = await addContactMessage(name, email, subject, message);
    res.json({ success: true, result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/analytics', async (req, res) => {
  try {
    const { path, isNewVisitor } = req.body;
    if (!path) {
      return res.status(400).json({ success: false, error: 'Path is required' });
    }
    await incrementPageAnalytics(path);
    let count = null;
    if (isNewVisitor) {
      count = await incrementVisitorCount();
    }
    res.json({ success: true, visitorCount: count });
  } catch (error: any) {
    res.status(500).json({ success: false });
  }
});

// ----------------------------------------------------
// SECURE ADMIN ENDPOINTS (Requires Authorization Header)
// ----------------------------------------------------

app.post('/api/admin/verify', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: 'Invalid password' });
  }
});

app.get('/api/admin/data', authMiddleware, async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    const skills = await prisma.skill.findMany();
    const experiences = await prisma.experience.findMany({ orderBy: { order: 'asc' } });
    const achievements = await prisma.achievement.findMany({ orderBy: { order: 'asc' } });
    const certificates = await prisma.certificate.findMany({ orderBy: { order: 'asc' } });
    const blogs = await prisma.blog.findMany();
    const analytics = await prisma.analytics.findMany();
    const messages = await prisma.message.findMany({ orderBy: { date: 'desc' } });

    res.json({
      success: true,
      data: {
        projects,
        skills,
        experiences,
        achievements,
        certificates,
        blogs,
        analytics,
        messages
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Projects CRUD
app.post('/api/admin/projects', authMiddleware, async (req, res) => {
  try {
    const project = req.body;
    const data = {
      title: project.title,
      description: project.description,
      category: project.category,
      techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack,
      features: Array.isArray(project.features) ? project.features.join('\n') : project.features,
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
    };

    let result;
    if (project.id) {
      result = await prisma.project.update({ where: { id: project.id }, data });
    } else {
      result = await prisma.project.create({ data });
    }
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/admin/projects/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Skills CRUD
app.post('/api/admin/skills', authMiddleware, async (req, res) => {
  try {
    const skill = req.body;
    const data = {
      name: skill.name,
      category: skill.category,
      level: parseInt(skill.level),
      icon: skill.icon,
    };
    let result;
    if (skill.id) {
      result = await prisma.skill.update({ where: { id: skill.id }, data });
    } else {
      result = await prisma.skill.create({ data });
    }
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/admin/skills/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.skill.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Certificates CRUD
app.post('/api/admin/certs', authMiddleware, async (req, res) => {
  try {
    const cert = req.body;
    const data = {
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date,
      image: cert.image,
      pdfUrl: cert.pdfUrl,
      category: cert.category,
      order: parseInt(cert.order || '0'),
    };
    let result;
    if (cert.id) {
      result = await prisma.certificate.update({ where: { id: cert.id }, data });
    } else {
      result = await prisma.certificate.create({ data });
    }
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/admin/certs/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.certificate.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Blogs CRUD
app.post('/api/admin/blogs', authMiddleware, async (req, res) => {
  try {
    const blog = req.body;
    const data = {
      slug: blog.slug,
      title: blog.title,
      description: blog.description,
      content: blog.content,
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags,
      category: blog.category,
      date: blog.date,
      published: blog.published !== false,
    };
    let result;
    if (blog.id) {
      result = await prisma.blog.update({ where: { id: blog.id }, data });
    } else {
      result = await prisma.blog.create({ data });
    }
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/admin/blogs/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.blog.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Experiences CRUD
app.post('/api/admin/experiences', authMiddleware, async (req, res) => {
  try {
    const exp = req.body;
    const data = {
      role: exp.role,
      company: exp.company,
      duration: exp.duration,
      description: Array.isArray(exp.description) ? exp.description.join('\n') : exp.description,
      type: exp.type,
      order: parseInt(exp.order || '0'),
    };
    let result;
    if (exp.id) {
      result = await prisma.experience.update({ where: { id: exp.id }, data });
    } else {
      result = await prisma.experience.create({ data });
    }
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/admin/experiences/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.experience.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Achievements CRUD
app.post('/api/admin/achievements', authMiddleware, async (req, res) => {
  try {
    const ach = req.body;
    const data = {
      title: ach.title,
      description: ach.description,
      date: ach.date,
      type: ach.type,
      link: ach.link || null,
      order: parseInt(ach.order || '0'),
    };
    let result;
    if (ach.id) {
      result = await prisma.achievement.update({ where: { id: ach.id }, data });
    } else {
      result = await prisma.achievement.create({ data });
    }
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/admin/achievements/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.achievement.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Messages actions
app.delete('/api/admin/messages/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.message.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.patch('/api/admin/messages/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const result = await prisma.message.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start listening
app.listen(PORT, () => {
  console.log(`Express REST API server listening at http://localhost:${PORT}`);
});
