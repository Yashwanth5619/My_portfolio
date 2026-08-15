# 🚀 Yashwanth Reddy — Developer Portfolio

A modern, premium, and highly interactive developer portfolio designed to showcase my **software engineering skills, projects, competitive programming journey, technical expertise, and development experience**.

The portfolio goes beyond a traditional personal website by including an **interactive developer terminal, algorithm execution sandbox, coding statistics dashboard, command palette, and database-driven admin panel**.

---

## 🚀 Live Demo

🔗 **Portfolio:** [YOUR_PORTFOLIO_URL](my-portfolio-ciew2iecy-yashwanth5619s-projects.vercel.app)


---

## 📌 Project Overview

This portfolio is built as a full-stack web application to represent my professional profile, technical skills, software projects, competitive programming achievements, and development journey.

Instead of creating a simple static portfolio, the project focuses on providing an **interactive developer experience**.

Visitors can explore my work, view coding statistics, interact with a terminal, execute algorithms visually, navigate using a command palette, and explore different aspects of my technical journey.

---

## ✨ Features

### 🖥️ Interactive Developer Terminal

A built-in Unix-style terminal that allows visitors to interact with the portfolio using commands.

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

The terminal provides an alternative and interactive way to explore my portfolio.

---

### ⌘ Command Palette

A keyboard-driven command palette inspired by macOS Spotlight.

Open it using:

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
* 🧠 Open algorithm playground
* 💻 Open GitHub
* 🏆 Open LeetCode
* 📊 View coding statistics
* 📄 Download resume
* 📬 Open contact section
* 🖥️ Launch developer terminal

---

### 🧠 Algorithm Execution Sandbox

An interactive algorithm visualization environment that demonstrates how algorithms execute step-by-step.

The sandbox provides:

* 🔢 Array visualization
* 🔄 Step-by-step execution
* 🎯 Comparisons
* 🔀 Swapping animations
* 📝 Code-line highlighting
* ⚡ Real-time execution
* 📊 Algorithm state visualization

Currently focused on **Bubble Sort**, with support designed for adding more algorithms in the future.

---

### 📊 Competitive Programming Dashboard

A dedicated section for showcasing competitive programming achievements and statistics.

#### 🟠 LeetCode

* Problems solved
* Rating
* Difficulty distribution
* Contest performance
* Rating history

#### 🔵 Codeforces

* Rating
* Contest performance
* Rank
* Rating history

#### 🟢 GitHub

* Contribution activity
* Repository statistics
* Developer activity
* Contribution heatmap

Interactive charts are used to make the statistics easier to understand.

---

### 💻 Projects Showcase

A dedicated project section displaying my software engineering work.

Each project can include:

* 📌 Project title
* 📝 Description
* 🛠️ Technologies used
* 💡 Key features
* 🔗 GitHub repository
* 🌐 Live demo
* 📸 Project screenshots

---

### 🛠️ Admin Dashboard

A database-driven admin panel available at:

```text
/admin
```

The dashboard allows portfolio content to be managed without modifying the source code.

Administrators can manage:

* 📁 Projects
* 🧠 Skills
* 💼 Experience
* 🎓 Education
* 📝 Blog posts
* 🏆 Achievements
* 📬 Contact messages
* 📊 Portfolio information

---

### 📝 Dynamic Blog

A dedicated blog section for publishing technical content related to:

* Data Structures & Algorithms
* Java
* Web Development
* System Design
* Software Engineering
* Competitive Programming
* Development experiences

---

### 📱 Responsive Design

The portfolio is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📟 Tablet

The interface adapts to different screen sizes while maintaining the interactive experience.

---

## 🛠️ Tech Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Framer Motion**

### Backend

* **Next.js Server Actions**
* **Next.js API Routes**
* **Prisma ORM**

### Database

* **SQLite**
* Prisma

### Data Visualization

* **Recharts**
* Custom interactive visualizations

### Tools & Development

* **Git**
* **GitHub**
* **Docker**
* **ESLint**
* **npm**

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │      Portfolio UI    │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
       ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
       │   Sections  │  │ Interactive │  │   Command   │
       │             │  │   Widgets   │  │   Palette   │
       └─────────────┘  └─────────────┘  └─────────────┘
                               │
                    ┌──────────▼───────────┐
                    │     Data Service     │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │       Prisma         │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │       SQLite         │
                    └──────────────────────┘
```

---

## 📁 Project Structure

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
├── prisma/
├── .env
└── README.md
```

---

## 📸 Screenshots

### 🏠 Portfolio Home Page

<img width="1886" height="851" alt="Portfolio Home Page" src="YOUR_SCREENSHOT_URL" />

### 🖥️ Interactive Developer Terminal

<img width="1886" height="851" alt="Developer Terminal" src="YOUR_SCREENSHOT_URL" />

### 🧠 Algorithm Execution Sandbox

<img width="1886" height="851" alt="Algorithm Sandbox" src="YOUR_SCREENSHOT_URL" />

### 📊 Competitive Programming Dashboard

<img width="1886" height="851" alt="Coding Statistics" src="YOUR_SCREENSHOT_URL" />

### 💻 Projects Section

<img width="1886" height="851" alt="Projects Section" src="YOUR_SCREENSHOT_URL" />

### 🛠️ Admin Dashboard

<img width="1886" height="851" alt="Admin Dashboard" src="YOUR_SCREENSHOT_URL" />

---

## ⚙️ Local Setup

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL

cd YOUR_REPOSITORY_NAME
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL="file:./dev.db"
ADMIN_PASSWORD="your_secure_password"
```

> ⚠️ Never commit your `.env` file or expose production credentials.

### 4. Initialize Database

```bash
npx prisma db push
```

Generate Prisma Client:

```bash
npx prisma generate
```

### 5. Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🎨 Customization

Personal information is centralized inside:

```text
src/data/profile.ts
```

You can customize:

* 👤 Personal information
* 💻 Technical skills
* 🚀 Projects
* 💼 Experience
* 🎓 Education
* 🏆 Achievements
* 🔗 Social profiles
* 📊 Coding profiles
* 📄 Resume information

---

## 🗺️ Roadmap

* [x] Modern responsive portfolio
* [x] Interactive developer terminal
* [x] Command palette
* [x] Project showcase
* [x] Admin dashboard
* [x] Database integration
* [x] Algorithm visualization
* [x] Coding statistics
* [ ] More algorithm visualizations
* [ ] BFS / DFS visualizer
* [ ] Dijkstra visualizer
* [ ] Data structure playground
* [ ] Automated GitHub statistics
* [ ] Automated LeetCode statistics
* [ ] Automated Codeforces statistics
* [ ] Advanced analytics
* [ ] Technical blog
* [ ] PostgreSQL production support
* [ ] Automated CI/CD

---

## 🎯 Project Goals

The goal of this project is to build a portfolio that demonstrates more than just a collection of projects.

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

The portfolio is designed to demonstrate **how I build, solve problems, and think as a software developer**.

---

## 👨‍💻 Author

### Yashwanth Reddy

**Software Developer | Problem Solver | Competitive Programmer**

* 💻 GitHub: [YOUR_GITHUB_URL](YOUR_GITHUB_URL)
* 🧠 LeetCode: [YOUR_LEETCODE_URL](YOUR_LEETCODE_URL)
* 🏆 Codeforces: [YOUR_CODEFORCES_URL](YOUR_CODEFORCES_URL)
* 💼 LinkedIn: [YOUR_LINKEDIN_URL](YOUR_LINKEDIN_URL)
* 🌐 Portfolio: [YOUR_PORTFOLIO_URL](YOUR_PORTFOLIO_URL)

---

## ⭐ Support

If you like this project or find the implementation useful, consider giving the repository a ⭐.

<p align="center">
  <strong>Built with ❤️, TypeScript, Next.js, and a lot of problem solving.</strong>
</p>
