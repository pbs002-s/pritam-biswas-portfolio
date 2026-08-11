import { Project, InterestDomain, Achievement, FocusItem } from './types';

export const identity = {
  name: "Pritam Biswas",
  roles: [
    "App Developer",
    "Web Developer",
    "AI Explorer",
    "Competitive Programmer",
    "Cyber Security Learner"
  ],
  education: {
    degree: "B.Tech in Computer Science & Engineering (CSE)",
    institution: "Daffodil International University (DIU)",
    location: "Dhaka, Bangladesh",
    year: "2nd Year",
    expectedGraduation: "2028"
  },
  location: "Dhaka, Bangladesh",
  email: "pritam020s2@gmail.com",
  github: "https://github.com/pbs002-s",
  leetcode: "https://leetcode.com/u/Pritam_002",
  codeforces: "https://codeforces.com/profile/Pritam-580",
  facebook: "https://www.facebook.com/pbs.020",
  instagram: "https://www.instagram.com/swagoto_pritom",
  githubUsername: "pbs002-s",
  leetcodeUsername: "Pritam_002",
  codeforcesUsername: "Pritam-580",
  facebookUsername: "pbs.020",
  instagramUsername: "swagoto_pritom",
  closingQuote: "Consistency beats talent when talent doesn't work consistently."
};

export const aboutCopy = {
  intro: "CSE student at Daffodil International University with a strong passion for building real-world software across mobile apps, web platforms, artificial intelligence, and cyber security. I approach technology not just as a subject of study but as a craft — driven by curiosity, consistency, and a commitment to continuous improvement.",
  outro: "Currently focused on sharpening full stack development skills with React.js while deepening understanding of AI concepts and security fundamentals. The most powerful engineers are those who build, break, and learn relentlessly — that's the philosophy behind every project.",
  openTo: [
    "Internship opportunities in Software Engineering, App Development, or AI",
    "Open source collaboration on beginner to intermediate projects",
    "Hackathons and competitive programming contests",
    "Mentorship and peer learning communities in tech"
  ]
};

export const techStack = {
  languagesAndCore: ["Python", "JavaScript/TypeScript", "Java", "React", "Node.js/Express"],
  alsoUsing: ["Kotlin", "Jetpack Compose", "Spring Boot", "Tailwind CSS", "HTML/CSS", "C"],
  engineeringPractices: ["Git/GitHub", "Debugging", "CRUD Architecture", "Role-Based Access", "REST APIs"],
  aiAndAutomation: ["GPT-4o & Gemini API", "n8n Workflow Automation", "K-Means Clustering & PCA"],
  toolsAndWorkflow: ["VS Code", "Android Studio", "MySQL", "Linux"]
};

export const areasOfInterest: InterestDomain[] = [
  {
    domain: "App Development",
    status: "Active",
    details: "Building mobile and desktop applications"
  },
  {
    domain: "Web Development",
    status: "Learning",
    details: "HTML, React.js — growing rapidly"
  },
  {
    domain: "Artificial Intelligence",
    status: "Exploring",
    details: "ML concepts, clustering, pattern recognition"
  },
  {
    domain: "Cyber Security",
    status: "Learning",
    details: "Fundamentals, ethical hacking concepts"
  },
  {
    domain: "Game Development",
    status: "Exploring",
    details: "Concepts and prototyping"
  },
  {
    domain: "Competitive Programming",
    status: "Active",
    details: "LeetCode, Codeforces — consistent practice"
  }
];

export const featuredProjects: Project[] = [
  {
    id: "bhashabot",
    title: "BhashaBot — AI Multilingual Messenger Auto-Reply",
    stack: ["n8n", "GPT-4o", "JavaScript", "Webhooks"],
    summary: "Automated Facebook Messenger support with an n8n workflow that detects customer language across 18 languages — including native Bangla/Banglish — using a single GPT-4o call to return reply, sentiment, intent, lead data, and a human-handoff flag.",
    detail: "One-webhook, one-decision-point architecture that auto-routes refunds, complaints, and emergencies to a human instead of an AI-generated response.",
    githubUrl: "https://github.com/pbs002-s/BhashaBot",
    year: "2025–Present"
  },
  {
    id: "takar-hisab",
    title: "Takar Hisab — Full-Stack Student Finance Tracker",
    stack: ["React", "TypeScript", "Node.js", "Express", "Gemini API"],
    summary: "A React + TypeScript + Node.js/Express finance app with expense/income tracking, an EMI/loan calculator, a bill-splitter, live currency conversion, and a conversational AI budget assistant powered by Gemini.",
    detail: "Offline-first localStorage persistence with a server-side AI proxy and CSV/JSON export-import.",
    githubUrl: "https://github.com/pbs002-s/student-finance-tracker",
    year: "2025"
  },
  {
    id: "diu-routine",
    title: "DIU Routine — Offline Android Class Scheduler",
    stack: ["Kotlin", "Jetpack Compose", "Gemini Vision", "Room"],
    summary: "A native Kotlin/Jetpack Compose Android app that scans uploaded routine PDFs/DOCX with Gemini Vision to auto-extract dates, times, rooms, and course codes into a fully offline timetable.",
    detail: "Smart pre-class reminders and on-device attendance/study-streak tracking using Room for local persistence.",
    githubUrl: "https://github.com/pbs002-s/diu-routine",
    year: "2025"
  },
  {
    id: "nagorik-setu",
    title: "Nagorik Setu (OpenGovtBD) — Government–Citizen Engagement Platform",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    summary: "A role-based civic platform with three distinct dashboards — Citizen, Officer, Super Admin — for complaints, civic polls, discussions, and an e-services directory.",
    detail: "Full bilingual (English/বাংলা) UI and a Ctrl+K command palette for instant cross-role navigation.",
    githubUrl: "https://github.com/pbs002-s/OpenGovtBD",
    year: "2024–2025",
    featured: true
  },
  {
    id: "student-management-system",
    title: "Student Management System",
    stack: ["Python", "Java"],
    summary: "A CRUD student-records system with role-based access — managing student information, attendance, courses, and academic results for educational institutions.",
    detail: "Hands-on systems project covering database design, CRUD architecture, and user role management.",
    githubUrl: "https://github.com/pbs002-s",
    year: "2024"
  },
  {
    id: "movie-ticket-system",
    title: "Movie Ticket System",
    stack: ["Python", "Java"],
    summary: "A movie ticket booking platform with seat-selection and booking-conflict logic — simulates a production-grade reservation system.",
    detail: "Implemented seat allocation logic and booking conflict handling.",
    githubUrl: "https://github.com/pbs002-s",
    year: "2024"
  }
];

export const mostLikedProject = featuredProjects.find((p) => p.featured) ?? featuredProjects[0];

export const achievements: Achievement[] = [
  {
    title: "Science Fair Winner",
    description: "First place, 3 consecutive years at institutional science fairs",
    authority: "Institutional"
  },
  {
    title: "Digital Bangladesh Certificate",
    description: "Government-issued certificate honoring commitment and contributions to the national digital landscape",
    authority: "Government of Bangladesh"
  },
  {
    title: "National Science Fair Certificate",
    description: "Recognized at the national level for innovation and scientific presentation",
    authority: "Government of Bangladesh"
  },
  {
    title: "Government Participation Certificates",
    description: "Multiple awards and acknowledgments for academic, civic and developmental participation",
    authority: "Government and Civic Initiatives"
  },
  {
    title: "Consistent Learner Badge",
    description: "Committed to continuous self-improvement across software engineering, algorithms, and AI fundamentals",
    authority: "Self-driven"
  }
];

export const currentFocus: FocusItem = {
  learning: [
    "React.js — components, hooks, state management",
    "Cyber Security fundamentals and ethical hacking concepts",
    "Artificial Intelligence — supervised and unsupervised learning",
    "Data Structures & Algorithms for competitive programming"
  ],
  building: [
    "Real-world full stack web projects with React.js",
    "AI-powered mini tools and automation scripts",
    "Growing BhashaBot into a full multi-channel support product"
  ],
  exploring: [
    "Game development concepts and prototyping",
    "Open source contribution workflows",
    "Cloud computing basics (AWS/GCP fundamentals)"
  ]
};
