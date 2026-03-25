// ─── Portfolio Data ───────────────────────────────────────────────────────

export const personal = {
  name: "Satish",
  fullName: "Satish Raut",
  title: "Data Science Enthusiast & Full Stack Developer",
  tagline:
    "Building intelligent products at the intersection of ML, AI, and web development.",
  bio: "Data Science undergraduate exploring Machine Learning, Generative AI, and full-stack development. Passionate about creating intelligent web applications.",
  email: "satishraut1822005@gmail.com",
  location: "India 🇮🇳",
  avatarUrl: "/images/avatar.jpg",
  resumeUrl: "/Satish General CV.pdf",
  yearsOfExperience: 1,
  about: {
    headline:
      "Data Science specialist exploring ML, GenAI, and full-stack development",
    summary:
      "I'm an undergraduate student specializing in Data Science with a strong passion for Machine Learning, Generative AI, and building intelligent applications. While my core expertise is in data science, I'm actively learning full-stack web development to bridge the gap between backend ML systems and user-facing applications.",
    background:
      "My journey began with data analysis and machine learning. Now, I'm expanding into full-stack development to create end-to-end intelligent products. I'm particularly interested in MLOps, Deep Learning, and applying GenAI concepts to solve real-world problems through web applications.",
    valueProposition: [
      {
        title: "Machine Learning & GenAI",
        description:
          "Building ML models, working with generative AI concepts, and exploring deep learning architectures. Focused on creating intelligent backends for data-driven applications.",
      },
      {
        title: "Full Stack Development",
        description:
          "Learning modern web development with React and Node.js to create complete applications. Building skills in frontend development while maintaining strong data processing capabilities.",
      },
      {
        title: "Intelligent Product Building",
        description:
          "Passionate about combining data science and web development to create products that leverage ML/AI. Exploring MLOps practices and best practices for deploying intelligent systems.",
      },
    ],
    approach:
      "I believe the future is in intelligent applications that combine beautiful UIs with powerful ML backends. I'm committed to becoming a developer who can bridge the gap between data science and product engineering, creating systems that are both smart and user-friendly.",
  },
};

export const socials = [
  { label: "GitHub", url: "https://github.com/Satish-Raut", icon: "FaGithub" },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/satish-raut12/",
    icon: "FaLinkedin",
  },
  {
    label: "LeetCode",
    url: "https://leetcode.com/u/__Satish__/",
    icon: "SiLeetcode",
  },
];

/* ══════════════════════════════════════════════════════════
   SKILL CATEGORIES
   logo: https://cdn.simpleicons.org/{slug}/{hex-color}
══════════════════════════════════════════════════════════ */
export const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#8b5cf6",
    icon: "🎨",
    skills: [
      { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
      {
        name: "JavaScript",
        logo: "https://cdn.simpleicons.org/javascript/F7DF1E",
      },
      {
        name: "TypeScript",
        logo: "https://cdn.simpleicons.org/typescript/3178C6",
      },
      { name: "HTML5", logo: "https://cdn.simpleicons.org/html5/E34F26" },
      { name: "CSS3", logo: "https://cdn.simpleicons.org/css3/1572B6" },
      {
        name: "Tailwind CSS",
        logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
      },
      {
        name: "Framer Motion",
        logo: "https://cdn.simpleicons.org/framer/ffffff",
      },
      { name: "Vite", logo: "https://cdn.simpleicons.org/vite/646CFF" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "#10b981",
    icon: "🛠️",
    skills: [
      { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/339933" },
      { name: "Express", logo: "https://cdn.simpleicons.org/express/ffffff" },
      { name: "Python", logo: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" },
      { name: "REST APIs", logo: "https://cdn.simpleicons.org/postman/FF6C37" },
    ],
  },
  {
    id: "ml",
    label: "ML & Data Science",
    color: "#f59e0b",
    icon: "🧠",
    skills: [
      {
        name: "Scikit-learn",
        logo: "https://cdn.simpleicons.org/scikitlearn/F7931E",
      },
      { name: "NumPy", logo: "https://cdn.simpleicons.org/numpy/013243" },
      { name: "Pandas", logo: "https://cdn.simpleicons.org/pandas/150458" },
      { name: "Jupyter", logo: "https://cdn.simpleicons.org/jupyter/F37626" },
      { name: "OpenCV", logo: "https://cdn.simpleicons.org/opencv/5C3EE8" },
      {
        name: "Matplotlib",
        logo: "https://cdn.simpleicons.org/matplotlib/ffffff",
      },
    ],
  },
  {
    id: "database",
    label: "Databases",
    color: "#ec4899",
    icon: "🗄️",
    skills: [
      {
        name: "PostgreSQL",
        logo: "https://cdn.simpleicons.org/postgresql/4169E1",
      },
      { name: "MongoDB", logo: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "MySQL", logo: "https://cdn.simpleicons.org/mysql/4479A1" },
      { name: "Redis", logo: "https://cdn.simpleicons.org/redis/FF4438" },
      { name: "Firebase", logo: "https://cdn.simpleicons.org/firebase/FFCA28" },
      { name: "Supabase", logo: "https://cdn.simpleicons.org/supabase/3ECF8E" },
      { name: "Prisma", logo: "https://cdn.simpleicons.org/prisma/ffffff" },
      {
        name: "Drizzle",
        logo: "https://raw.githubusercontent.com/drizzle-team/drizzle-orm/main/misc/readme/logo-github-sq-dark.svg",
      },
    ],
  },
  {
    id: "tools",
    label: "Tools & DevOps",
    color: "#3b82f6",
    icon: "🔧",
    skills: [
      { name: "Git", logo: "https://cdn.simpleicons.org/git/F05032" },
      { name: "GitHub", logo: "https://cdn.simpleicons.org/github/ffffff" },
      { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
      { name: "Linux", logo: "https://cdn.simpleicons.org/linux/FCC624" },
      {
        name: "VS Code",
        logo: "https://cdn.simpleicons.org/visualstudiocode/007ACC",
      },
      { name: "Figma", logo: "https://cdn.simpleicons.org/figma/F24E1E" },
      { name: "Postman", logo: "https://cdn.simpleicons.org/postman/FF6C37" },
      { name: "Vercel", logo: "https://cdn.simpleicons.org/vercel/ffffff" },
      { name: "Netlify", logo: "https://cdn.simpleicons.org/netlify/00C7B7" },
      { name: "AWS", logo: "https://cdn.simpleicons.org/amazonaws/FF9900" },
    ],
  },
];

// Flat list kept for Footer marquee / other uses
export const skills = skillCategories.flatMap((c) =>
  c.skills.map((s) => s.name),
);

export const techStack = [
  "React",
  "Node.js",
  "Python",
  "TensorFlow",
  "MongoDB",
  "PostgreSQL",
  "Tailwind CSS",
  "Framer Motion",
  "Git",
  "Docker",
  "FastAPI",
  "Next.js",
];

export const projects = [
  {
    id: 1,
    title: "Scalable URL Shortener with Analytics & Authentication",
    description:
      "A production-ready URL shortening platform that enables users to generate, manage, and track shortened links with secure authentication. Built using Prisma ORM and MySQL, the system ensures efficient redirection, persistent storage, and a seamless user experience with a modern React frontend.",
    tags: [
      "React",
      "Node.js",
      "Express",
      "MySQL",
      "Prisma",
      "Drizzle",
      "Tailwind",
      "Aiven Database",
      "JWT",
    ],
    liveUrl: "https://url-shortner-by-satishdev.vercel.app",
    githubUrl: "https://github.com/Satish-Raut/URL-Shortner-With-MySQL-Prisma",
    imageUrl: "/images/projectPic1.png",
    featured: true,
  },
  {
    id: 2,
    title: "CinemaFriend – AI-Powered Movie Discovery Platform",
    description:
      "A Netflix-inspired movie browsing platform enhanced with AI-powered search and recommendations. Users can explore trending movies and get personalized suggestions using natural language queries, powered by OpenAI integration. Built with a responsive UI and optimized API handling for seamless user experience.",
    tags: ["React", "Tailwind", "Gemini API", "TMDB API", "Redux", "Firebase"],
    liveUrl: "https://cinemafriend.netlify.app",
    githubUrl: "https://github.com/Satish-Raut/Netflix-GPT",
    imageUrl: "/images/projectPic2.png",
    featured: true,
  },
  {
    id: 3,
    title: "Rasoi Mitra – Real-Time Recipe & Cooking Assistant",
    description:
      "A real-time cooking assistant platform that helps users discover recipes, share cooking ideas, and interact with others instantly. Built with Socket.io for live communication, the app enables collaborative recipe discussions and dynamic content updates, delivering an engaging and community-driven cooking experience.",
    tags: ["React", "Redux Toolkit", "Swiggy API", "Tailwind", "CORS"],
    liveUrl: "https://rasoimitra.netlify.app",
    githubUrl: "https://github.com/Satish-Raut/RasoiMitra",
    imageUrl: "/images/projectPic3.png",
    featured: true,
  },
  {
    id: 4,
    title: "Digital Behavior Analytics – Social Media vs Productivity Insights",
    description:
      "An interactive data analytics dashboard that analyzes the impact of social media usage on user productivity. Built with Python and Streamlit, the application provides data-driven insights through visualizations, helping users understand behavioral patterns and optimize their daily habits.",
    tags: [
      "Python",
      "Pandas",
      "NumPy",
      "Sickit Learn",
      "Matplotlib",
      "Seaborn",
      "Streamlit",
      "Jupyter Notebook",
    ],
    liveUrl: "https://digital-behavior-analytics.streamlit.app/",
    githubUrl:
      "https://github.com/Satish-Raut/Social-Media-Behavior-Productivity-Analysis",
    imageUrl: "/images/projectPic4.png",
    featured: false,
  },
  {
    id: 5,
    title: "Customer Sentiment & Sales Analytics Dashboard on Mobile Phones",
    description:
      "A comprehensive business intelligence dashboard that analyzes mobile product reviews and sales data to uncover customer sentiment and its impact on revenue. Built using Power BI, the project integrates sentiment analysis with interactive visualizations to help stakeholders make data-driven decisions.",
    tags: [
      "Power BI",
      "Python",
      "Pandas",
      "Data Analysis",
      "Data Visualization",
      "Sentiment Analysis",
    ],
    liveUrl:
      "https://app.powerbi.com/view?r=eyJrIjoiNGRhZGUwN2MtNzNjNi00MWFkLWE0YWQtM2NkNDg0ODVhOWFhIiwidCI6ImUxNGU3M2ViLTUyNTEtNDM4OC04ZDY3LThmOWYyZTJkNWE0NiIsImMiOjEwfQ%3D%3D",
    githubUrl:
      "https://github.com/Satish-Raut/Mobile-Customer-Reviews-Sentiment-Sales-Analytics-Dashboard",
    imageUrl: "/images/projectPic5.png",
    featured: true,
  },
  {
    id: 6,
    title: "Optimized Data Fetching with TanStack Query",
    description:
      "A frontend-focused application demonstrating efficient server-state management using TanStack Query. The project showcases optimized data fetching, caching, background updates, and improved UI responsiveness, highlighting modern best practices for handling asynchronous data in React applications.",
    tags: [
      "React",
      "TanStack Query",
      "JavaScript",
      "API Integration",
      "Tailwind",
      "Pagination",
      "React Router",
    ],
    liveUrl: "https://tanstackquerypractice.netlify.app",
    githubUrl: "https://github.com/Satish-Raut/Tanstack-Query-Learning-Project",
    imageUrl: "/images/projectPic6.png",
    featured: false,
  },
  {
    id: 7,
    title: "Catch Pokémon – Interactive Pokémon Explorer",
    description:
      "An interactive web application that allows users to explore and catch Pokémon using real-time data from a public API. The project demonstrates dynamic UI updates, API integration, and engaging user interactions, providing a gamified experience for browsing Pokémon data.",
    tags: ["React", "JavaScript", "API Integration", "HTML", "Tailwind"],
    liveUrl: "https://github.com/Satish-Raut/Catch-Pokemon",
    githubUrl: "https://github.com/Satish-Raut/Catch-Pokemon",
    imageUrl: "/images/projectPic7.png",
    featured: false,
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
