# Yashwanth Reddy Developer Portfolio Website

A world-class, premium, modern, responsive, and highly interactive developer portfolio website. Built using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Prisma ORM with SQLite**.

This site is optimized to showcase software engineering expertise, competitive programming results (LeetCode & Codeforces), database data-structures modeling, and clean system architectures.

---

## 🚀 Special Premium Features

1. **Interactive Developer Terminal Console (`Ctrl+K` integration / button):** A retro Unix shell simulator allowing tech recruiters to type commands like `help`, `about`, `skills`, `projects`, and `contact` directly.
2. **Algorithm Execution Sandbox:** A custom interactive visualizer that runs JavaScript Bubble Sort algorithms step-by-step, highlighting matching code lines and executing color-coded comparisons in real-time.
3. **Command Palette (`Ctrl+K` or `Cmd+K`):** A macOS-style Spotlight search allowing users to search pages, launch widgets, download resumes, or open coding profiles using keyboard navigation.
4. **Dynamic Analytics Tracker & Coding Stats:** Recharts radar capabilities grids, LeetCode Guardian rating logs, Codeforces Specialists bar charts, and a dynamic GitHub contribution heatmap.
5. **Code-Free Admin Control Panel (`/admin`):** An administrative dashboard to add, edit, or delete projects, compose blogs, configure skills, update timeline events, and view incoming recruiter contact messages without touching code.

---

## 📁 Project Folder Structure

```text
├── prisma/
│   ├── schema.prisma       # SQLite database model definition
│   └── dev.db              # Local SQLite database file (generated after push)
├── src/
│   ├── app/
│   │   ├── actions/        # NextJS Server Actions for Admin CRUD calls
│   │   ├── api/            # API Route endpoints for Contact and Analytics
│   │   ├── blog/           # Dynamic Markdown blog detail page routes
│   │   ├── admin/          # Admin CRUD control panel dashboard page
│   │   ├── globals.css     # Glassmorphic utilities, custom scrollbars, animations
│   │   ├── layout.tsx      # Main layout wrappers, context providers, tracking scripts
│   │   ├── page.tsx        # Homepage rendering and server-side data fetching
│   │   └── fonts.ts        # Optimized Google Fonts loader config (Inter, Poppins, JetBrains)
│   ├── components/
│   │   ├── sections/       # Horizontal scroll sections (Hero, About, Projects, etc.)
│   │   └── ui/             # Core widgets (Terminal, Sandbox, Command Palette, Navbar)
│   ├── data/
│   │   └── profile.ts      # Centralized configurations & initial seed fallback database
│   └── lib/
│       ├── db.ts           # Prisma client provider singleton
│       └── dataService.ts  # Database access layer with static fallbacks
└── package.json            # Node dependencies
```

---

## 🛠️ Local Setup Instructions

### 1. Prerequisites
Ensure you have **Node.js v20+** and **npm** installed.

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Initialize the Database
This portfolio uses a local file-based SQLite database. Execute the following commands to generate client types and set up the tables:
```bash
# Push schema to SQLite
npx prisma db push

# Generate client types
npx prisma generate
```
*Note: The website is built with a **fail-safe dual-data model**. If the database is empty or connection fails, the site automatically reads from `src/data/profile.ts` and seeds the database automatically in the background on first load.*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✍️ Customization Guide

All personal information, experiences, achievements, and initial projects are centralized inside:
👉 `src/data/profile.ts`

To personalize this portfolio, update the fields inside `profileData` in this file. The changes will automatically seed into your database on the next reload!

To configure the Admin Control Panel password:
1. Create a `.env` file in the root directory.
2. Add: `ADMIN_PASSWORD=your_custom_secure_password`
*(If no environment variable is provided, the dashboard defaults to password `admin123`).*

---

## 🛳️ Deployment Guide

### Vercel / Netlify
1. Connect your Git repository.
2. Set Build Command: `npx prisma generate && next build`
3. Set Output Directory: `.next`
4. Set environment variables (e.g. `ADMIN_PASSWORD` or database connection strings if migrating from SQLite).

### Docker Integration
To run this in a container, use the provided Docker instructions.
A simple `Dockerfile` configuration:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```
