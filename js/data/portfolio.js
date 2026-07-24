/**
 * portfolio.js
 * Single source of truth for all portfolio content.
 *
 * To update your portfolio:
 *   - Add a project → push to PROJECTS array
 *   - Add a skill   → push to the right SKILLS category
 *   - Add a cert    → push to CERTIFICATIONS array
 *   - Change any text → edit here, nowhere else
 *
 * Nothing in index.html or any other file needs to change.
 */

// ── Personal Info ─────────────────────────────────────────────────────────────
export const PERSONAL = {
  name:        'Sai Kalyan',
  fullName:    'Sai Kalyanaraman',
  email:       'skravikumar2004@gmail.com',
  phone:       '+91 7305467190',
  location:    'Chennai, India',
  status:      'Open to new opportunities',
  linkedin:    'https://www.linkedin.com/in/saikalyan04',
  github:      'https://github.com/SaiKalyan-07',
  resume:      'assets/SaiKalyan_Resume.pdf',
  profileImg:  'assets/profile.png',
  initials:    'SK',
};

// ── Hero role line (typewriter loop) ──────────────────────────────────────────
export const ROLE_PHRASES = [
  'Building full-stack web applications',
  'Working with AI & LLMs',
  'Solving problems with code',
];

// ── About ──────────────────────────────────────────────────────────────────────
export const ABOUT = {
  overview: `I'm an Associate Web Developer at X Factor, building full-stack features end-to-end. Hands-on experience with AI and LLMs — from predictive models to LLM-powered chat systems — alongside full-stack web development, from building responsive interfaces to designing and securing backend APIs. When I'm not coding, I'm exploring AI frameworks and experimenting with the latest tech. Lifelong learner, product builder, and someone who genuinely enjoys solving hard problems.`,
};

// ── Location & Availability ──────────────────────────────────────────────────
export const LOCATION = {
  country: 'India',
  status:  'Open to new opportunities',
};

// ── Skills ────────────────────────────────────────────────────────────────────
export const SKILLS = [
  {
    category: 'Languages',
    color: '#3b82f6',
    items: [
      { icon: 'devicon-javascript-plain colored', label: 'JavaScript', type: 'devicon' },
      { icon: 'devicon-typescript-plain colored', label: 'TypeScript', type: 'devicon' },
      { icon: 'devicon-html5-plain colored',      label: 'HTML',       type: 'devicon' },
      { icon: 'devicon-css3-plain colored',        label: 'CSS',        type: 'devicon' },
      // In the 'Languages' category, replace the Python entry:
{ icon: 'assets/icons/python.webp', label: 'Python', type: 'local' },
      { icon: 'devicon-mysql-plain colored',       label: 'SQL',        type: 'devicon' },
    ],
  },
  {
    category: 'Frameworks, Libraries & Tools',
    color: '#f59e0b',
    items: [
      { icon: 'devicon-react-original colored',    label: 'React.js',              type: 'devicon' },
      { icon: 'devicon-redux-original colored',    label: 'Redux Toolkit',         type: 'devicon' },
      { icon: 'devicon-tailwindcss-plain colored', label: 'Tailwind CSS',          type: 'devicon' },
      { icon: 'devicon-vitejs-plain colored',      label: 'Vite',                  type: 'devicon' },
      { icon: 'devicon-nodejs-plain colored',      label: 'Node.js',               type: 'devicon' },
      { icon: 'devicon-express-original',          label: 'Express.js',            type: 'devicon' },
      { icon: 'devicon-fastapi-plain colored',     label: 'FastAPI',               type: 'devicon' },
      { icon: 'devicon-flask-original',            label: 'Flask',                 type: 'devicon' },
      { icon: 'socketdotio', color: '00ff88',      label: 'Socket.io',             type: 'simpleicon' },
      { icon: 'postman',     color: 'FF6C37',      label: 'Postman',               type: 'simpleicon' },
      { icon: 'devicon-jest-plain colored',        label: 'Jest',                  type: 'devicon' },
      { icon: 'testinglibrary', color: 'E33332',   label: 'React Testing Library', type: 'simpleicon' },
    ],
  },
  {
    category: 'Databases',
    color: '#22c55e',
    items: [
      { icon: 'devicon-mongodb-plain colored',    label: 'MongoDB',    type: 'devicon' },
      { icon: 'devicon-mysql-original colored',   label: 'MySQL',      type: 'devicon' },
      { icon: 'devicon-postgresql-plain colored', label: 'PostgreSQL', type: 'devicon' },
    ],
  },
  {
    category: 'DevOps & Deployment',
    color: '#a855f7',
    items: [
      { icon: 'devicon-git-plain colored',            label: 'Git',           type: 'devicon' },
      { icon: 'devicon-github-original',              label: 'GitHub',        type: 'devicon' },
      { icon: 'devicon-docker-plain colored',         label: 'Docker',        type: 'devicon' },
      // In the 'DevOps & Deployment' category, replace the AWS entry:
      { icon: 'assets/icons/aws.webp', label: 'AWS (EC2, S3)', type: 'local' },
      { icon: 'fas fa-infinity',                      label: 'CI/CD',         type: 'fa' },
      { icon: 'mlflow', color: '0194E2',              label: 'MLflow',        type: 'simpleicon' },
    ],
  },
];
// ── Projects ──────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id:    'devconnect',
    title: 'DevConnect',
    bullets: [
      'Architected and developed a full-stack developer collaboration platform using React.js, Node.js, Express.js, and MongoDB, enabling real-time networking, project sharing, and developer collaboration.',
      'Built a modular and responsive frontend using React.js with Vite, Tailwind CSS, and Redux Toolkit, implementing reusable component architecture and efficient global state management.',
      'Developed secure backend services with Node.js and Express.js, designing RESTful APIs with JWT authentication and implementing WebSocket-based real-time communication for collaboration features.',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Vite', 'Tailwind CSS', 'Redux Toolkit'],
    links: [
      { label: 'Frontend', url: 'https://github.com/SaiKalyan-07/devconnect-frontend' },
      { label: 'Backend',  url: 'https://github.com/SaiKalyan-07/devconnect-backend' },
    ],
  },
  {
    id:    'stockradar',
    title: 'StockRadar',
    bullets: [
      'Built an autonomous NSE/BSE paper-trading assistant with dual-provider LLM orchestration (Claude-first, GPT-4 fallback), real-time news sentiment, and earnings-signal ingestion for 7-day forecasting.',
      'Implemented an XGBoost/LightGBM ensemble on technical indicators and regime signals, with pre-trade safety rails and an agentic tool-use loop.',
      'Developed an LLM-powered chatbot for stock conversations, investment support queries, and portfolio suggestions.',
    ],
    tech: ['Python', 'Flask', 'React.js', 'PostgreSQL'],
    links: [
      { label: 'Code', url: 'https://github.com/SaiKalyan-07/StockRadar' },
    ],
  },
  {
    id:    'alumni-network',
    title: 'Alumni Network',
    bullets: [
      'Engineered Alumni Network, a fully responsive alumni networking platform using React.js, Firebase Realtime Database, and Google OAuth, enabling alumni and students to build profiles, search for peers by batch or department, and establish meaningful professional connections.',
      'Enhanced UI experience with GSAP-powered animations and transitions, implemented lazy loading for images and components, and optimized assets by converting them to WebP format, resulting in a smoother, faster-loading interface across devices.',
      'Leveraged Redux for state management and minimized redundant API calls, providing seamless navigation and interactivity across views, while improving platform efficiency through code splitting.',
    ],
    tech: ['React.js', 'Redux', 'Firebase', 'Google OAuth', 'GSAP'],
    links: [],
  },
];

// ── Experience ────────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    role:     'Associate Web Developer',
    company:  'X Factor',
    logo:     'assets/logos/x-factor.jpg',
    period:   'Dec 2025 – Present',
    location: 'Chennai, Tamil Nadu',
    bullets: [
      'Developed a custom content management system using React.js, Node.js, Express.js, and MongoDB, significantly reducing dependency on manual code changes for routine content updates.',
      'Built and maintained full-stack features using React and Redux Toolkit on the frontend, alongside Node.js, Express.js, and MongoDB on the backend.',
      'Optimized frontend performance using Vite, code-splitting, and image optimization techniques to reduce load times and improve responsiveness.',
      'Collaborated closely with the team to design responsive, cross-device layouts, ensuring a consistent and polished user experience across desktop and mobile platforms.',
    ],
  },
];

// ── Education ─────────────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    degree:      'B.Tech Artificial Intelligence and Data Science',
    institution: 'KCG College of Technology, Chennai',
    logo:        'assets/logos/kcg.png',
    period:      '2021 – 2025',
    scoreText:   'CGPA: 7.4 / 10',
  },
  {
    degree:      'Higher Secondary Certificate (CBSE) — CS & Mathematics',
    institution: 'Kendriya Vidyalaya, Minambakkam, Chennai',
    logo:        'assets/logos/kvm.jpg',
    period:      '2020 – 2021',
    scoreText:   'Percentage: 94%',
  },
  {
    degree:      'Secondary School Leaving Certificate (CBSE)',
    institution: 'Kendriya Vidyalaya, Minambakkam, Chennai',
    logo:        'assets/logos/kvm.jpg',
    period:      '2018 – 2019',
    scoreText:   'Percentage: 82.8%',
  },
];

// ── Certifications ────────────────────────────────────────────────────────────
// glowClass options: namastedev-glow | udemy-glow | nptel-glow | infosys-glow
// direction: top-left | top-right | left | right | bottom-left | bottom-right | bottom
export const CERTIFICATIONS = [
  {
    title:     'Namaste React',
    issuer:    'NamasteDev',
    year:      '2024',
    icon:      'fab fa-react',
    glowClass: 'namastedev-glow',
    glowStyle: 'conic-gradient(#ff6b35,#ff8c42,#ff6b35)',
    direction: 'top-left',
  },
  {
    title:     'The Web Developer Bootcamp 2025',
    issuer:    'Udemy',
    year:      '2025',
    icon:      'fas fa-laptop-code',
    glowClass: 'udemy-glow',
    glowStyle: 'conic-gradient(#a435f0,#8710d8,#a435f0)',
    direction: 'top-right',
  },
  {
    title:     'Namaste DSA',
    issuer:    'NamasteDev',
    year:      '2024',
    icon:      'fas fa-project-diagram',
    glowClass: 'namastedev-glow',
    glowStyle: 'conic-gradient(#ff6b35,#ff8c42,#ff6b35)',
    direction: 'left',
  },
  {
    title:     'Namaste Node.js',
    issuer:    'NamasteDev',
    year:      '2024',
    icon:      'fab fa-node-js',
    glowClass: 'namastedev-glow',
    glowStyle: 'conic-gradient(#ff6b35,#ff8c42,#ff6b35)',
    direction: 'right',
  },
  {
    title:     'Python for Data Science',
    issuer:    'NPTEL',
    year:      '2024',
    icon:      'fas fa-chart-line',
    glowClass: 'nptel-glow',
    glowStyle: 'conic-gradient(#007cc3,#0099e6,#007cc3)',
    direction: 'bottom-left',
  },
  {
    title:     'Complete Data Science, ML, DL and NLP Bootcamp',
    issuer:    'Udemy',
    year:      '2025',
    icon:      'fas fa-brain',
    glowClass: 'udemy-glow',
    glowStyle: 'conic-gradient(#a435f0,#8710d8,#a435f0)',
    direction: 'bottom-right',
  },
  {
    title:     'Programming Fundamentals using Python',
    issuer:    'Infosys Springboard',
    year:      '2024',
    icon:      'fas fa-code',
    glowClass: 'infosys-glow',
    glowStyle: 'conic-gradient(#007cc3,#20b2aa,#007cc3)',
    direction: 'bottom',
  },
];

