import { Project, InterestDomain, Achievement, FocusItem } from './types';

export const identity = {
  name: "Pritam Biswas",
  roles: [
    "App & Web Developer",
    "Full-Stack Software Engineer",
    "AI Explorer & ML Enthusiast",
    "Competitive Programmer",
    "Cyber Security Learner"
  ],
  education: {
    degree: "B.Tech in Computer Science & Engineering (CSE)",
    institution: "Daffodil International University (DIU)",
    location: "Dhaka, Bangladesh"
  },
  location: "Dhaka, Bangladesh",
  email: "pritam020s2@gmail.com",
  github: "https://github.com/pbs002-s",
  leetcode: "https://leetcode.com/u/Pritam_002/",
  codeforces: "https://codeforces.com/profile/Pritam-580",
  portfolio: "https://pritam-biswas-portfolio.netlify.app",
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
  intro: "CSE student at Daffodil International University, building real-world software across web, mobile, and AI. Currently sharpening full-stack skills with React.js, Laravel, and Spring Boot, while exploring cyber security fundamentals and machine learning. I approach technology as a craft — driven by curiosity, consistency, and a commitment to continuous improvement.",
  outro: "The most powerful engineers are those who build, break, and learn relentlessly. Focused on creating resilient systems, elegant user interfaces, and automated intelligent tools that solve practical problems.",
  openTo: [
    "Software Engineering & Full-Stack Developer internships",
    "Open source collaboration on web platforms and AI tools",
    "Hackathons and competitive programming contests (LeetCode & Codeforces)",
    "Mentorship, research, and collaborative tech projects"
  ]
};

export const techStack = {
  languagesAndCore: ["Java", "Python", "C", "JavaScript", "TypeScript", "PHP", "HTML", "CSS"],
  frameworks: ["React.js", "Next.js", "Laravel", "Spring Boot", "Tailwind CSS"],
  databasesAndDevOps: ["Docker", "Redis", "PostgreSQL", "MySQL", "Linux"],
  toolsAndWorkflow: ["Git", "GitHub", "VS Code", "Postman"]
};

export const skillIcons = [
  "https://skillicons.dev/icons?i=java,python,c,js,react,nextjs,html,css&theme=dark&perline=8",
  "https://skillicons.dev/icons?i=laravel,php,docker,redis,postgres,mysql&theme=dark&perline=8",
  "https://skillicons.dev/icons?i=spring,git,github,vscode,linux&theme=dark&perline=8"
];

export const githubWidgets = {
  stats: "https://github-stats-extended.vercel.app/api?username=pbs002-s&show_icons=true&theme=midnight-purple&hide_border=true&bg_color=0D0D1A&title_color=00E559&icon_color=00E559&text_color=E2E8F0",
  streak: "https://github-readme-streak-stats-eight.vercel.app?user=pbs002-s&theme=midnight-purple&hide_border=true&background=0D0D1A&ring=00E559&fire=00E559&currStreakLabel=00E559",
  activityGraph: "https://github-readme-activity-graph.vercel.app/graph?username=pbs002-s&bg_color=0D0D1A&color=00E559&line=00E559&point=38BDF8&area=true&area_color=00E55915&hide_border=true&radius=12"
};

export const areasOfInterest: InterestDomain[] = [
  {
    domain: "Web & Full-Stack Engineering",
    status: "Active",
    details: "React.js, Next.js, Laravel, Spring Boot, REST APIs"
  },
  {
    domain: "App Development",
    status: "Active",
    details: "Cross-platform mobile applications & desktop tools"
  },
  {
    domain: "Artificial Intelligence & NLP",
    status: "Exploring",
    details: "Language models, clustering algorithms, conversational bots"
  },
  {
    domain: "Cyber Security",
    status: "Learning",
    details: "Network security, authentication, ethical hacking concepts"
  },
  {
    domain: "Cloud & DevOps",
    status: "Learning",
    details: "Docker containers, Redis caching, CI/CD automation"
  },
  {
    domain: "Competitive Programming",
    status: "Active",
    details: "LeetCode & Codeforces — algorithms, dynamic programming, graphs"
  }
];

export const featuredProjects: Project[] = [
  {
    id: "bhashabot",
    title: "BhashaBot",
    repoName: "BhashaBot",
    stack: ["Python", "NLP", "AI", "FastAPI"],
    summary: "An intelligent multilingual AI chatbot engine designed for natural language translation, dialect understanding, and contextual query processing.",
    detail: "Trained on conversational datasets with neural text parsing and low-latency API response pipelines for cross-language communication.",
    githubUrl: "https://github.com/pbs002-s/BhashaBot",
    featured: true
  },
  {
    id: "diu-routine",
    title: "DIU Routine",
    repoName: "diu-routine",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    summary: "A smart academic timetable and exam schedule manager tailored for Daffodil International University students and faculty.",
    detail: "Features real-time section filtering, conflict detection, offline schedule caching, and clean calendar export interfaces.",
    githubUrl: "https://github.com/pbs002-s/diu-routine",
    featured: true
  },
  {
    id: "opengovtbd",
    title: "OpenGovtBD",
    repoName: "OpenGovtBD",
    stack: ["React", "Laravel", "MySQL", "REST API"],
    summary: "Open governance and public data transparency platform providing searchable citizen records, administrative metrics, and civic analytics.",
    detail: "Implements role-based access control, structured database indexing, and interactive data visualization for national civic datasets.",
    githubUrl: "https://github.com/pbs002-s/OpenGovtBD",
    featured: true
  },
  {
    id: "nagorik-setu",
    title: "Nagorik Setu",
    repoName: "nagorik-setu",
    stack: ["React", "Spring Boot", "PostgreSQL", "Docker"],
    summary: "A digital citizen bridge portal facilitating direct citizen-to-administration communication, public grievance filing, and utility tracking.",
    detail: "Built on an enterprise-ready Spring Boot backend with microservice-friendly containerization and audited security protocols.",
    githubUrl: "https://github.com/pbs002-s/nagorik-setu",
    featured: true
  },
  {
    id: "student-management-system",
    title: "Student Management System",
    repoName: "student-management-system",
    stack: ["Python", "Java", "MySQL"],
    summary: "A comprehensive academic information system for student records, enrollment tracking, course administration, and performance reporting.",
    detail: "Hands-on systems architecture covering relational database normalization, CRUD workflows, and administrative dashboards.",
    githubUrl: "https://github.com/pbs002-s"
  },
  {
    id: "movie-ticket-system",
    title: "Movie Ticket System",
    repoName: "movie-ticket-system",
    stack: ["Python", "Java", "Database Design"],
    summary: "A production-simulated movie reservation platform featuring interactive hall seating layouts, showtime scheduling, and automated seat locks.",
    detail: "Engineered collision-free concurrency logic for real-time seat reservations and automated receipt generation.",
    githubUrl: "https://github.com/pbs002-s"
  },
  {
    id: "government-genz-web",
    title: "Government GenZ Web",
    repoName: "Government-GenZ-Web",
    stack: ["HTML", "JavaScript", "CSS3", "Civic Tech"],
    summary: "Youth-oriented civic engagement portal bridging digital government services, student scholarships, and national initiatives.",
    detail: "Designed with modern UI aesthetics, accessible information hierarchy, and responsive interaction patterns.",
    githubUrl: "https://github.com/pbs002-s"
  },
  {
    id: "ai-cluster",
    title: "AI Cluster",
    repoName: "AI-Cluster",
    stack: ["Python", "Machine Learning", "Scikit-Learn"],
    summary: "Unsupervised machine learning laboratory discovering latent clusters and multidimensional patterns across high-volume datasets.",
    detail: "Implemented K-Means clustering, PCA dimensionality reduction plots, and elbow-method inertia evaluation pipelines.",
    githubUrl: "https://github.com/pbs002-s"
  }
];

export const achievements: Achievement[] = [
  {
    title: "Science Fair Winner",
    description: "First place, 3 consecutive years at institutional science & tech innovation competitions",
    authority: "Institutional"
  },
  {
    title: "Digital Bangladesh Certificate",
    description: "Government-issued certificate honoring commitment and technical contributions to national digital transformation",
    authority: "Government of Bangladesh"
  },
  {
    title: "National Science Fair Certificate",
    description: "Recognized at the national level for scientific methodology, prototype development, and presentation",
    authority: "Government of Bangladesh"
  },
  {
    title: "Government Participation Certificates",
    description: "Multiple awards and acknowledgments for academic, civic and community-driven technology initiatives",
    authority: "Civic & Government Initiatives"
  },
  {
    title: "Consistent Problem Solver Badge",
    description: "Committed to continuous algorithmic practice on LeetCode and Codeforces with deep focus on clean code and efficiency",
    authority: "Self-driven"
  }
];

export const currentFocus: FocusItem = {
  learning: [
    "React.js & Next.js — full-stack modern web architecture",
    "Laravel & Spring Boot — robust backend APIs and enterprise services",
    "Docker & Redis — containerization and caching microservices",
    "Cyber Security fundamentals & ethical testing methods",
    "Data Structures & Algorithms for competitive programming"
  ],
  building: [
    "BhashaBot — multilingual AI translation and conversational NLP engine",
    "DIU Routine — smart timetable scheduler for university peers",
    "OpenGovtBD & Nagorik Setu — open civic technology platforms",
    "Real-world full-stack web applications with React + Spring Boot"
  ],
  exploring: [
    "Machine learning clustering and deep learning architectures",
    "Open source contribution workflows and distributed systems",
    "Cloud infrastructure and deployment automation (AWS/Docker)"
  ]
};
