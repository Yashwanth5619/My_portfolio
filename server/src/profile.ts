export interface Project {
  id?: string;
  title: string;
  description: string;
  category: 'Frontend' | 'Backend' | 'Full Stack' | 'AI';
  techStack: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
  liveUrlAdmin?: string;
  image: string;
  problemStatement: string;
  architecture: string;
  challenges: string;
  learnings: string;
  databaseDesign: string;
  apiEndpoints: string;
  futureImprovements: string;
}

export interface Skill {
  id?: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Databases' | 'Programming' | 'Tools' | 'AI';
  level: number;
  icon: string;
}

export interface Experience {
  id?: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
  type: 'Internship' | 'Freelance' | 'Leadership' | 'Volunteer';
  order: number;
}

export interface Achievement {
  id?: string;
  title: string;
  description: string;
  date: string;
  type: 'Contest' | 'Hackathon' | 'Certification' | 'Award' | 'OpenSource';
  link?: string;
  order: number;
}

export interface Certificate {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  pdfUrl: string;
  category: string;
  order: number;
}

export interface Blog {
  id?: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  category: string;
  date: string;
  published: boolean;
}

export interface ProfileData {
  personalInfo: {
    name: string;
    role: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    leetcode: string;
    codeforces: string;
    geeksforgeeks: string;
    codechef: string;
    hackerrank: string;
    shortIntro: string;
    careerGoal: string;
    bio: string;
    profileImage: string;
    resumeUrl: string;
    visitorCountStart: number;
  };
  education: Array<{
    degree: string;
    institution: string;
    duration: string;
    gpa: string;
    details: string;
  }>;
  areasOfInterest: string[];
  strengths: string[];
  softSkills: string[];
  languagesKnown: string[];
  funFacts: Array<{
    icon: string;
    fact: string;
  }>;
  services: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    text: string;
    avatar: string;
  }>;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  achievements: Achievement[];
  certificates: Certificate[];
  blogs: Blog[];
}

export const profileData: ProfileData = {
  personalInfo: {
    name: "Devireddy Yashwanth Reddy",
    role: "Computer Science Engineering Student | Full Stack Developer",
    email: "devireddyyashwanthreddy@gmail.com",
    phone: "+91-6281342560",
    location: "Telangana, India",
    linkedin: "https://www.linkedin.com/in/yashwanth-devireddy-5115a129a",
    github: "https://github.com/Yashwanth5619",
    leetcode: "https://leetcode.com/u/yashwanth_33/",
    codeforces: "https://codeforces.com/profile/yashwanth3322",
    geeksforgeeks: "https://www.geeksforgeeks.org/profile/devireddyyashwanthreddy",
    codechef: "https://www.codechef.com/users/yashwanth_red",
    hackerrank: "https://www.hackerrank.com/yashwanth_reddy",
    shortIntro: "Motivated Computer Science Engineering student with strong problem-solving skills in Java and hands-on experience in full-stack development using the MERN stack, skilled in building scalable, robust, and user-friendly web applications.",
    careerGoal: "Aspiring Software Engineer specializing in problem solving using Java along with full-stack MERN development, seeking to design and develop high-performance software applications.",
    bio: "I am a Computer Science Engineering student specializing in building clean, responsive web applications and solving complex algorithmic challenges. I have a strong foundation in Data Structures and Algorithms using Java, and hands-on experience with the MERN stack (MongoDB, Express, React, Node.js). I enjoy analytical problem-solving and continuously learning new system architectures.",
    profileImage: "/images/profile.png",
    resumeUrl: "/resume.pdf",
    visitorCountStart: 1042,
  },
  education: [
    {
      degree: "Bachelor of Technology in Computer Science and Engineering",
      institution: "Vardhaman College of Engineering, Shamshabad (JNTUH)",
      duration: "2023 - 2027",
      gpa: "9.49/10.0 CGPA",
      details: "Building core engineering fundamentals. Active studies in Data Structures, Analysis of Algorithms, DBMS, Operating Systems, Computer Networks, and Object-Oriented Programming."
    },
    {
      degree: "Intermediate Education in MPC",
      institution: "Narayana Junior College, Raviryala, RangaReddy (TGBIE)",
      duration: "2021 - 2023",
      gpa: "988 / 1000 Marks",
      details: "Focused on Mathematics, Physics, and Chemistry. Stood in top merit scores state-wide."
    },
    {
      degree: "Tenth Class Secondary School Education",
      institution: "Jaya High School, Suryapet (BSET)",
      duration: "2021",
      gpa: "10.0/10.0 CGPA",
      details: "Graduated with perfect academic honours."
    }
  ],
  areasOfInterest: [
    "Full-Stack Web Architectures",
    "Database Tuning & Optimization",
    "Competitive Coding & Algorithms",
    "Cloud Computing & API Gateways",
    "Object-Oriented System Design"
  ],
  strengths: [
    "Analytical Problem Solving",
    "RESTful API Architecture",
    "Responsive Layout Designing",
    "Dynamic Dashboards Integrations",
    "State Management",
    "Fast Technical Adaptation"
  ],
  softSkills: [
    "Consistency",
    "Teamwork",
    "Self-Motivated Learner",
    "Adaptability",
    "Problem-solving",
    "Leadership"
  ],
  languagesKnown: [
    "English (Professional)",
    "Telugu (Native)",
    "Hindi (Conversational)"
  ],
  funFacts: [
    {
      icon: "⚡",
      fact: "I solved over 330+ algorithm problems on LeetCode and 260+ on GeeksforGeeks."
    },
    {
      icon: "🎓",
      fact: "I maintained a CGPA of 9.49/10 through 6 semesters of B.Tech in Computer Science."
    },
    {
      icon: "🚀",
      fact: "I successfully qualified the GATE 2026 examination in Computer Science & Engineering."
    }
  ],
  services: [
    {
      title: "Software Engineering & DSA",
      description: "Solving complex algorithmic problems using Java and C, with a strong foundation in Data Structures, Algorithms, and Object-Oriented Programming (OOPS).",
      icon: "Code"
    },
    {
      title: "Full-Stack Web Development",
      description: "Building responsive, modern frontend interfaces in React.js paired with robust backend services in Node.js and Express.js (MERN stack).",
      icon: "Layout"
    },
    {
      title: "Database Management & Systems",
      description: "Designing schemas, relationships, and queries using relational MySQL and document-based MongoDB, ensuring data integrity.",
      icon: "Server"
    },
    {
      title: "Data Analytics & Power BI",
      description: "Creating interactive dashboards and data models in Power BI to analyze system trends, department attrition, and key metrics.",
      icon: "Sparkles"
    }
  ],
  testimonials: [
    {
      name: "Smart India Hackathon Team",
      role: "Collaborative Lead",
      company: "Smart India Hackathon (SIH)",
      text: "Yashwanth collaborated effectively within our team to develop prototypes, bringing strong coding skills in Java and React and structured problem-solving to the table.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    }
  ],
  skills: [
    { name: "Java", category: "Programming", level: 92, icon: "Code2" },
    { name: "C", category: "Programming", level: 85, icon: "Terminal" },
    { name: "Python", category: "Programming", level: 80, icon: "Terminal" },
    { name: "JavaScript", category: "Programming", level: 88, icon: "FileJson" },
    { name: "React.js", category: "Frontend", level: 90, icon: "React" },
    { name: "HTML", category: "Frontend", level: 95, icon: "FileCode" },
    { name: "CSS", category: "Frontend", level: 92, icon: "Paintbrush" },
    { name: "Bootstrap", category: "Frontend", level: 85, icon: "Grid" },
    { name: "Responsive Design", category: "Frontend", level: 95, icon: "Globe" },
    { name: "Node.js", category: "Backend", level: 85, icon: "Node" },
    { name: "Express.js", category: "Backend", level: 85, icon: "Server" },
    { name: "RESTful APIs", category: "Backend", level: 90, icon: "Cpu" },
    { name: "JWT Authentication", category: "Backend", level: 85, icon: "Shield" },
    { name: "Role-Based Access", category: "Backend", level: 88, icon: "Shield" },
    { name: "MySQL", category: "Databases", level: 85, icon: "Database" },
    { name: "MongoDB", category: "Databases", level: 88, icon: "Database" },
    { name: "Vercel", category: "Tools", level: 82, icon: "Layers" },
    { name: "Netlify", category: "Tools", level: 80, icon: "Layers" },
    { name: "Git", category: "Tools", level: 90, icon: "GitBranch" },
    { name: "GitHub", category: "Tools", level: 90, icon: "Github" },
    { name: "Power BI", category: "Tools", level: 80, icon: "Layers" },
    { name: "Postman", category: "Tools", level: 85, icon: "Send" },
    { name: "VS Code", category: "Tools", level: 92, icon: "Laptop" },
    { name: "Axios", category: "Tools", level: 88, icon: "Send" },
    { name: "Data Structures", category: "Programming", level: 92, icon: "GitCommit" },
    { name: "Algorithms", category: "Programming", level: 90, icon: "TrendingUp" },
    { name: "Object-Oriented Programming", category: "Programming", level: 88, icon: "Code2" },
    { name: "Database Management System", category: "Databases", level: 85, icon: "Database" }
  ],
  projects: [
    {
      title: "Medi-Care - Smart Healthcare & Doctor Appointment System",
      description: "A full-stack healthcare web application enabling patients to book appointments and doctors to manage schedules with role-based dashboards.",
      category: "Full Stack",
      techStack: ["React", "Node.js", "Express.js", "MongoDB", "Clerk", "Axios"],
      features: [
        "Designed and developed full-stack patient appointment booking workspaces",
        "Implemented secure authentication using Clerk with protected routes",
        "Built RESTful CRUD APIs using Node.js and Express.js to manage records",
        "Developed responsive and dynamic dashboards for patients and doctors",
        "Integrated Axios for efficient frontend-backend communication"
      ],
      githubUrl: "https://github.com/Yashwanth5619/Medicare",
      liveUrl: "https://medicare-frontend-z89f.onrender.com",
      liveUrlAdmin: "https://medicare-admin-mca6.onrender.com",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=450&fit=crop",
      problemStatement: "Patients struggle to view doctors' schedules and book slots without calling clinics. Clinics lack basic web dashboards to manage incoming patients, check appointment histories, and track doctor availability.",
      architecture: "Client built with React and integrated with Clerk Auth SDK. Axios dispatches requests to the Express.js API gateway. The backend maps routing layers and triggers database transactions against MongoDB, indexing appointment dates to avoid double booking.",
      challenges: "Double-booking slots under concurrent patient requests. Resolved by introducing database atomic locking and validation checks before writing appointment records.",
      learnings: "Mastered Clerk auth hooks, role validation guards in middleware, and MongoDB document indexing for date searches.",
      databaseDesign: "Collections include Users, Doctors, Appointments, and Schedules. Doctor schemas link to specific TimeSlots arrays, and Appointment documents map doctorId, patientId, status, and times.",
      apiEndpoints: `GET /api/doctors - List all doctors\nPOST /api/appointments/book - Book a time slot\nGET /api/appointments/history - Retrieve user bookings`,
      futureImprovements: "Add virtual online consults via WebRTC video calls and SMS text slot notifications."
    },
    {
      title: "BookStore - Online Book Store Platform",
      description: "A responsive e-commerce web platform for browsing, filtering, and purchasing books, featuring catalog searches, cart management, and seamless navigation.",
      category: "Frontend",
      techStack: ["React", "HTML", "CSS", "JavaScript", "React Router"],
      features: [
        "Developed a responsive online book store platform",
        "Implemented book listings with price, genre, and author filters",
        "Integrated interactive shopping cart functionality and summary structures",
        "Configured React Router for single-page application client-side navigation",
        "Designed mobile-first UI layouts for dynamic browsing and catalog search"
      ],
      githubUrl: "https://github.com/Yashwanth5619/BookStore",
      liveUrl: "https://github.com/Yashwanth5619/BookStore",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=450&fit=crop",
      problemStatement: "Book readers need a modern, fluid user interface to discover, filter, and buy books without page reload delays. Small bookstores require a clean client catalog presentation.",
      architecture: "A responsive client single page application built with React and styled with CSS flexbox/grid frameworks. Navigation is resolved by React Router client paths.",
      challenges: "Designing clean card filters that load books dynamically without lagging mobile viewports. Solved by implementing client-side pagination.",
      learnings: "Deepened knowledge in single page application routing, local state caching, CSS flexbox/grid media query layouts, and catalog filtering.",
      databaseDesign: "Conceptual schema containing Book (id, title, price, author, genre, description) and UserCart (id, items array, totalCost).",
      apiEndpoints: `GET /api/books - Retrieve book list\nPOST /api/orders/create - Submit purchase order details`,
      futureImprovements: "Integrate a real payment gateway (Razorpay) and translate local book reviews into multiple languages."
    },

    {
      title: "HR Employee Attrition Analysis Dashboard",
      description: "An interactive Power BI dashboard analyzing employee attrition trends, overtime impacts, job satisfaction metrics, and job role attrition across multiple departments.",
      category: "Frontend",
      techStack: ["Power BI", "Data Analytics", "Data Visualization", "Excel"],
      features: [
        "Built an interactive Power BI dashboard analyzing employee attrition across 4+ key factors",
        "Analyzed department-wise and job role-wise attrition trends to identify high-risk groups",
        "Visualized overtime impact on attrition, highlighting correlation between workload and turnover",
        "Assessed job satisfaction and work-life balance metrics to surface retention insights",
        "Designed dynamic filters and visuals enabling drill-down analysis for HR decision-making"
      ],
      githubUrl: "https://github.com/Yashwanth5619/HR-Employee-Attrition-Analysis",
      liveUrl: "https://github.com/Yashwanth5619/HR-Employee-Attrition-Analysis",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
      problemStatement: "HR departments struggle to identify leading indicators of employee turnover and workload burnouts due to fragmented spreadsheet logs. A centralized visual analysis is needed to identify high-risk roles.",
      architecture: "Designed data modeling workflows in Power BI. Imported and cleaned dataset structures containing employee records, department classifications, monthly salaries, and overtime metrics.",
      challenges: "Normalizing inconsistent data values and handling missing records in historical surveys. Solved by executing Power Query transformations and DAX calculations to standardize metric distributions.",
      learnings: "Mastered data parsing workflows, DAX modeling, and layout design optimization in Power BI.",
      databaseDesign: "Star schema data model linking facts (employee attrition, survey responses) with dimensions (departments, roles, salary groups).",
      apiEndpoints: "N/A (Power BI Dashboard)",
      futureImprovements: "Integrate real-time stream metrics using Azure Stream Analytics and apply machine learning models to forecast flight risks."
    }
  ],
  experiences: [
    {
      role: "Front-End Developer Intern",
      company: "InternPe (Online)",
      duration: "Aug 2025 - Sep 2025",
      description: [
        "Developed responsive and interactive web interfaces using HTML, CSS, JavaScript, and React.",
        "Built clean and well-structured UI layouts following modern design and mobile-first principles.",
        "Worked on real-world projects and implemented reusable component blocks to optimize loading speed."
      ],
      type: "Internship",
      order: 1
    }
  ],
  achievements: [
    {
      title: "Solved 334 Problems on LeetCode",
      description: "Mastered algorithmic patterns (Greedy, DFS, Two-Pointers, Binary Search) solving 334 problems in Java (144 Easy, 166 Medium, and 24 Hard).",
      date: "Active",
      type: "Contest",
      link: "https://leetcode.com/u/yashwanth_33/",
      order: 1
    },
    {
      title: "Qualified GATE 2026 (Computer Science and Engineering)",
      description: "Achieved qualified rank in the Graduate Aptitude Test in Engineering for Computer Science.",
      date: "2026",
      type: "Award",
      order: 2
    },
    {
      title: "Maintained a CGPA of 9.49/10",
      description: "Maintained a cumulative GPA of 9.49/10.0 through 6 semesters of B.Tech in Computer Science at Vardhaman College of Engineering.",
      date: "Active",
      type: "Award",
      order: 3
    },
    {
      title: "Smart India Hackathon SIH Participant",
      description: "Collaborated with team members to build custom prototypes under the mentorship of our institute's SPOC.",
      date: "2024",
      type: "Hackathon",
      order: 4
    },
    {
      title: "Multiple Web Development Credentials",
      description: "Earned certifications validating coding fundamentals from GeeksforGeeks, Intellipaat, and Great Learning.",
      date: "2024",
      type: "Award",
      order: 5
    }
  ],
  certificates: [
    {
      title: "Programming in Java",
      issuer: "NPTEL",
      date: "2024",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=350&fit=crop",
      pdfUrl: "/certificates/java_nptel.pdf",
      category: "Programming",
      order: 1
    },
    {
      title: "Structured Query Language (SQL)",
      issuer: "Intellipaat",
      date: "2026",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&h=350&fit=crop",
      pdfUrl: "/certificates/sql_intellipaat.pdf",
      category: "Databases",
      order: 2
    },
    {
      title: "Salesforce Certified Agentforce Specialist",
      issuer: "Trailhead",
      date: "2026",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=350&fit=crop",
      pdfUrl: "/certificates/agentforce_salesforce.pdf",
      category: "Tools",
      order: 3
    },
    {
      title: "Python Programming",
      issuer: "GeeksforGeeks",
      date: "2024",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=350&fit=crop",
      pdfUrl: "/certificates/python_gfg.pdf",
      category: "Programming",
      order: 4
    },
    {
      title: "Soft Skills",
      issuer: "GeeksforGeeks",
      date: "2026",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=350&fit=crop",
      pdfUrl: "/certificates/soft_skills_gfg.pdf",
      category: "Skills",
      order: 5
    },
    {
      title: "Critical Thinking in the AI Era",
      issuer: "HP LIFE",
      date: "2026",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&h=350&fit=crop",
      pdfUrl: "/certificates/critical_thinking_hp.pdf",
      category: "AI",
      order: 6
    },
    {
      title: "Problem Solving through Programming in C",
      issuer: "NPTEL",
      date: "2024",
      image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=500&h=350&fit=crop",
      pdfUrl: "/certificates/c_nptel.pdf",
      category: "Programming",
      order: 7
    },
    {
      title: "AWS Academy Graduate - Cloud Foundations",
      issuer: "AWS Academy",
      date: "2026",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=350&fit=crop",
      pdfUrl: "/certificates/aws_academy.pdf",
      category: "Tools",
      order: 8
    },
    {
      title: "AWS Academy Graduate - Data Engineering",
      issuer: "AWS Academy",
      date: "2026",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=350&fit=crop",
      pdfUrl: "/certificates/aws_data_eng.pdf",
      category: "Tools",
      order: 9
    },
    {
      title: "Time Management",
      issuer: "Infosys Springboard",
      date: "2025",
      image: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=500&h=350&fit=crop",
      pdfUrl: "/certificates/time_management_infosys.pdf",
      category: "Skills",
      order: 10
    }
  ],
  blogs: [
    {
      slug: "demystifying-crdt-collaborative-editors",
      title: "Demystifying CRDTs: How Collaborative Text Editors Work Under the Hood",
      description: "Ever wondered how Google Docs or Figma allow multiple users to edit the same file without edit conflicts? This blog dives deep into Conflict-free Replicated Data Types (CRDTs) and their comparison with Operational Transformation (OT).",
      date: "Jun 15, 2026",
      category: "Distributed Systems",
      tags: ["CRDT", "Distributed Systems", "WebSockets", "JavaScript"],
      published: true,
      content: `
# Demystifying CRDTs: How Collaborative Text Editors Work Under the Hood

When building tools like Google Docs, Figma, or my project DevArena, the biggest technical hurdle is **concurrency**. If two users type at the exact same position simultaneously, whose changes should win? How do we prevent text cursor hopping or document corruption?

For years, the gold standard was **Operational Transformation (OT)**, which is what Google Docs uses. However, OT is notoriously complex, requiring a central server to coordinate, re-sequence, and rewrite edits. 

In this article, we'll explore **Conflict-free Replicated Data Types (CRDTs)**, a modern decentralized alternative that makes collaborative editors far more resilient and easier to scale.

## The Core Concept: CRDT vs OT

A CRDT is a data structure that can be replicated across multiple network nodes. Nodes can update their local state independently without coordinating with a central coordinator. When nodes eventually sync, their states are guaranteed to converge mathematically to the exact same value.

There are two main styles of CRDTs:
1. **State-based (CvRDT):** Nodes send their entire state to other nodes. A merge function combines the incoming state with local state.
2. **Operation-based (CmRDT):** Nodes send logical operations (e.g., "Insert 'X' at index 4") to other nodes. The operations must be processed in a way that respects commutativity.

### Why is this better?
- **Serverless-friendly:** Because there is no need for a central sequencer to resolve conflict order, updates can travel peer-to-peer (via WebRTC, local Bluetooth, or simple WebSocket pub/sub).
- **Offline support:** You can write offline for three hours, reconnect, and merge your changes flawlessly.

## Using Yjs in Practice

Writing a custom text-based CRDT from scratch is mathematically challenging because insertions require tracking complex tree nodes. Thankfully, libraries like **Yjs** handle this heavy lifting.

To bind Yjs to a simple textarea in Next.js, we initialize a Yjs Document and connect it via WebSockets:

\`\`\`typescript
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

const doc = new Y.Doc();
const provider = new WebsocketProvider('wss://your-websocket-server.com', 'room-id', doc);
const ytext = doc.getText('codetext');

// Bind to editor edits
ytext.observe(event => {
  console.log("Text updated:", ytext.toString());
});
\`\`\`

In **DevArena**, I integrated this exact flow with Monaco Editor, achieving sub-100ms synchronization overheads.

## Conclusion

CRDTs are transforming peer-to-peer architectures. While they require slightly higher memory footprints to track metadata (tombstones, timestamps), the elimination of complex server sequencer logic makes them a massive win for modern collaborative software design.
      `
    }
  ]
};
