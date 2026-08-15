# 🚀 Yashwanth Reddy — Developer Portfolio

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" />
</p>

<p align="center">
  <strong>A modern, premium, and highly interactive developer portfolio built to showcase software engineering, projects, competitive programming, and technical expertise.</strong>
</p>

<p align="center">
  <a href="https://my-portfolio-ciew2iecy-yashwanth5619s-projects.vercel.app">🌐 Live Demo</a>
  •
  <a href="#-features">Features</a>
  •
  <a href="#-tech-stack">Tech Stack</a>
  •
  <a href="#-local-setup">Setup</a>
  •
  <a href="#-screenshots">Screenshots</a>
</p>

---

## 🌐 Live Demo

### 🚀 Portfolio

**[Visit My Portfolio](https://my-portfolio-ciew2iecy-yashwanth5619s-projects.vercel.app)**

Explore the complete interactive portfolio, including the developer terminal, algorithm sandbox, coding statistics, projects, skills, and more.

---

## 📌 About The Project

This project is my personal **full-stack developer portfolio**, designed to present my professional profile, technical skills, software projects, competitive programming journey, and development experience.

Instead of building a traditional static portfolio, I wanted to create an **interactive developer experience** where visitors can explore my work in multiple ways.

The portfolio combines:

* 💻 Software engineering
* 🧠 Data Structures & Algorithms
* 🏆 Competitive programming
* 📊 Data visualization
* 🎨 Modern UI/UX
* ⚡ Interactive web experiences
* 🗄️ Database-driven content management

---

# ✨ Features

## 🖥️ Interactive Developer Terminal

A built-in Unix-style terminal that allows visitors to explore the portfolio using commands.

```bash
help
about
skills
projects
experience
leetcode
github
contact
resume
clear
```

The terminal provides an alternative, developer-focused way to navigate through the portfolio.

---

## ⌘ Command Palette

A keyboard-driven command palette inspired by macOS Spotlight.

Open using:

```text
Ctrl + K
```

or

```text
Cmd + K
```

Users can quickly:

* 🔍 Search portfolio sections
* 🚀 Navigate to projects
* 🧠 Open the algorithm playground
* 💻 Open GitHub
* 🏆 Open LeetCode
* 📊 View coding statistics
* 📄 Download the resume
* 📬 Navigate to contact
* 🖥️ Launch the developer terminal

---

## 🧠 Algorithm Execution Sandbox

An interactive algorithm visualization environment that demonstrates algorithm execution step-by-step.

### Current capabilities

* 🔢 Array visualization
* 🔄 Step-by-step execution
* 🎯 Element comparisons
* 🔀 Swap animations
* 📝 Code-line highlighting
* ⚡ Real-time execution
* 📊 Algorithm state visualization

---

## 📊 Competitive Programming Dashboard

A dedicated section for showcasing competitive programming achievements and statistics.

### 🟠 LeetCode

* Problems solved
* Rating
* Difficulty distribution
* Contest performance
* Rating history

### 🔵 Codeforces

* Rating
* Contest performance
* Rank
* Rating history

### 🟢 GitHub

* Contribution activity
* Repository statistics
* Developer activity
* Contribution heatmap

Interactive charts make the statistics easier to understand and visually explore.

---

## 💻 Projects Showcase

A dedicated section for presenting software engineering projects.

Each project can include:

* 📌 Project title
* 📝 Project description
* 🛠️ Technologies used
* 💡 Key features
* 🔗 GitHub repository
* 🌐 Live demo
* 📸 Screenshots

---

## 🛠️ Admin Dashboard

A database-driven administration panel available at:

```text
/admin
```

The admin dashboard allows portfolio content to be managed without directly modifying the source code.

### Manage

* 📁 Projects
* 🧠 Skills
* 💼 Experience
* 🎓 Education
* 📝 Blog posts
* 🏆 Achievements
* 📬 Contact messages
* 📊 Portfolio information

---

## 📝 Dynamic Blog

The portfolio includes a dedicated blog section for sharing technical content about:

* Data Structures & Algorithms
* Java
* Web Development
* System Design
* Software Engineering
* Competitive Programming
* Development experiences

---

## 📱 Responsive Design

The portfolio is optimized for:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

The interface adapts to different screen sizes while preserving the core interactive experience.

---

# 🛠️ Tech Stack

## Frontend

| Technology    | Purpose                       |
| ------------- | ----------------------------- |
| Next.js       | Full-stack React framework    |
| React         | UI development                |
| TypeScript    | Type-safe development         |
| Tailwind CSS  | Styling and responsive design |
| Framer Motion | Animations and interactions   |

## Backend

| Technology             | Purpose               |
| ---------------------- | --------------------- |
| Next.js Server Actions | Server-side mutations |
| Next.js API Routes     | API endpoints         |
| Prisma ORM             | Database access       |

## Database

| Technology | Purpose                            |
| ---------- | ---------------------------------- |
| SQLite     | Local development database         |
| Prisma     | Database ORM and schema management |

## Visualization

| Technology            | Purpose                                 |
| --------------------- | --------------------------------------- |
| Recharts              | Interactive charts                      |
| Custom visualizations | Algorithm execution and UI interactions |

## Development Tools

* Git
* GitHub
* Docker
* ESLint
* npm

---

# 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │      Portfolio UI    │
                         └──────────┬───────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
       ┌──────▼──────┐       ┌──────▼──────┐       ┌──────▼──────┐
       │   Sections  │       │ Interactive │       │   Command   │
       │             │       │   Widgets   │       │   Palette   │
       └─────────────┘       └──────┬──────┘       └─────────────┘
                                    │
                         ┌──────────▼──────────┐
                         │     Data Service    │
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │       Prisma        │
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │        SQLite       │
                         └─────────────────────┘
```

---

# 📁 Project Structure

```text
├── prisma/
│   ├── schema.prisma
│   └── dev.db
│
├── src/
│   ├── app/
│   │   ├── actions/
│   │   ├── api/
│   │   ├── admin/
│   │   ├── blog/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── fonts.ts
│   │
│   ├── components/
│   │   ├── sections/
│   │   └── ui/
│   │
│   ├── data/
│   │   └── profile.ts
│   │
│   └── lib/
│       ├── db.ts
│       └── dataService.ts
│
├── public/
│   ├── images/
│   └── resume/
│
├── package.json
├── prisma.config.ts
├── .gitignore
└── README.md
```

> `.env` is intentionally excluded from the repository and should be created locally.

---

# 📸 Screenshots

## 🏠 Portfolio Home Page

<img width="1917" height="859" alt="Screenshot 2026-08-15 140405" src="https://github.com/user-attachments/assets/10e0faba-2ee5-428a-a935-9041c6f05c07" />

---

## 🖥️ Interactive Developer Terminal

<img width="1420" height="838" alt="Screenshot 2026-08-15 140538" src="https://github.com/user-attachments/assets/706f6d5d-8057-4646-96e3-ac00579de6b0" />


---

## 🧠 Algorithm Execution Sandbox

<img width="1495" height="851" alt="Screenshot 2026-08-15 140638" src="https://github.com/user-attachments/assets/583d4403-20c4-48f9-8a30-b5f40d843a5a" />


---

## 📊 Competitive Programming Dashboard

<img width="1908" height="681" alt="Screenshot 2026-08-15 140816" src="https://github.com/user-attachments/assets/6dd3dbea-a014-4dda-a00b-37f0e3717313" />


---

## 💻 Projects Section

<img width="1862" height="884" alt="Screenshot 2026-08-15 140758" src="https://github.com/user-attachments/assets/eefd7158-d83f-4b2a-89cb-05bc5c7a40d5" />


---


# 🎯 Project Goals

The goal of this project is to build a portfolio that demonstrates more than a collection of projects.

It combines:

```text
👨‍💻 Software Engineering
        +
🧠 Data Structures & Algorithms
        +
🏆 Competitive Programming
        +
📊 Data Visualization
        +
🎨 Modern UI/UX
        +
⚡ Interactive Web Experiences
```

The portfolio is designed to demonstrate **how I build, solve problems, and approach software engineering**.

---

# 👨‍💻 Author

## Yashwanth Reddy

**Software Developer | Problem Solver | Competitive Programmer**

* 💻 GitHub: [YOUR_GITHUB_URL](https://github.com/Yashwanth5619)
* 💼 LinkedIn: [YOUR_LINKEDIN_URL](https://www.linkedin.com/in/yashwanth-devireddy-5115a129a)
* 🌐 Portfolio: [Live Portfolio](https://my-portfolio-ciew2iecy-yashwanth5619s-projects.vercel.app)

---

# ⭐ Support

If you like this project or find the implementation useful, consider giving the repository a ⭐.

<p align="center">
  <strong>Built with ❤️, TypeScript, Next.js, and a lot of problem solving.</strong>
</p>
