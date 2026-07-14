import { Project, InterestDomain, Achievement, FocusItem } from './types';

export const identity = {
  name: "Pritam Biswas",
  roles: [
    "App Developer",
    "Web Developer",
    "AI Explorer",
    "Cyber Security Learner",
    "Game Development Enthusiast"
  ],
  education: {
    degree: "B.Tech in Computer Science & Engineering (CSE)",
    institution: "Daffodil International University (DIU)",
    location: "Dhaka, Bangladesh"
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
  languagesAndCore: ["Python", "C", "Java", "HTML", "React"],
  toolsAndWorkflow: ["Git", "GitHub", "VS Code"]
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
    id: "student-management-system",
    title: "Student Management System",
    stack: ["Python", "Java"],
    summary: "A system for managing student information, attendance, courses, and academic results — built to streamline administrative and academic workflows for educational institutions.",
    detail: "Hands-on systems project covering database design, CRUD architecture, and user role management.",
    githubUrl: "https://github.com/pbs002-s"
  },
  {
    id: "movie-ticket-system",
    title: "Movie Ticket System",
    stack: ["Python", "Java"],
    summary: "A movie ticket booking platform featuring seat selection, show scheduling, and booking management — simulates a production-grade reservation system.",
    detail: "Implemented seat allocation logic and booking conflict handling.",
    githubUrl: "https://github.com/pbs002-s"
  },
  {
    id: "government-genz-web",
    title: "Government GenZ Web",
    stack: ["HTML", "Web Technologies"],
    summary: "A civic technology web platform making government services and information accessible for young citizens of Bangladesh.",
    detail: "User-first information architecture bridging government services and Gen Z audiences.",
    githubUrl: "https://github.com/pbs002-s"
  },
  {
    id: "ai-cluster",
    title: "AI Cluster",
    stack: ["Python", "Machine Learning"],
    summary: "Unsupervised clustering project to discover hidden patterns and groupings in data.",
    detail: "Explored K-Means clustering, dimensionality reduction for visualization, and cluster quality analysis.",
    githubUrl: "https://github.com/pbs002-s"
  }
];

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
    "Expanding the Government GenZ Web platform"
  ],
  exploring: [
    "Game development concepts and prototyping",
    "Open source contribution workflows",
    "Cloud computing basics (AWS/GCP fundamentals)"
  ]
};
