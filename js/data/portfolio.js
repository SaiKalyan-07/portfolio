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
  role:        'Software Engineer',
  subtitle:    'Building Scalable Web Solutions',
  description: 'AI and Data Science graduate with hands-on experience building responsive web applications using React.js, Node.js, and modern JavaScript. Passionate about scalable, user-centric frontend systems and full-stack development.',
  email:       'skravikumar2004@gmail.com',
  phone:       '+91 7305467190',
  location:    'Chennai, India',
  status:      'Open to new opportunities',
  linkedin:    'https://www.linkedin.com/in/saikalyan04',
  github:      'https://github.com/SaiKalyan-07',
  resume:      'assets/SaiKalyan_Resume.pdf',
  profileImg:  'assets/profile.jpg',
  initials:    'SK',
  about: `AI and Data Science graduate with hands-on experience developing responsive web
    applications and modern frontend systems using React.js, JavaScript, HTML, and CSS.
    Skilled in building modular and scalable UI architectures, integrating RESTful APIs,
    and optimizing frontend performance for data-driven applications. Passionate about
    building scalable, user-centric web applications while improving performance and usability.`,
};

// ── About Highlights ──────────────────────────────────────────────────────────
export const HIGHLIGHTS = [
  {
    icon: 'fab fa-react',
    text: 'Shipped production React apps with Redux, routing, and real-time WebSocket features',
    sub:  'React.js · Redux Toolkit · WebSocket',
  },
  {
    icon: 'fas fa-server',
    text: 'Built and consumed RESTful APIs using Node.js, Express, and JWT authentication',
    sub:  'Node.js · Express.js · JWT Auth',
  },
  {
    icon: 'fas fa-shield-alt',
    text: 'Developed a phishing detection ML model with FastAPI serving real-time predictions',
    sub:  'Python · Scikit-learn · FastAPI',
  },
  {
    icon: 'fas fa-graduation-cap',
    text: 'B.Tech in AI & Data Science — strong foundation in ML, data pipelines, and algorithms',
    sub:  'KCG College of Technology · 2021–2025',
  },
  {
    icon: 'fas fa-database',
    text: 'Worked with both SQL and NoSQL databases across multiple production-grade projects',
    sub:  'MongoDB · MySQL · Data modelling',
  },
  {
    icon: 'fas fa-briefcase',
    text: 'Internship experience building cross-browser UIs and integrating APIs at scale',
    sub:  'The Brand Hypothesis · Chennai',
  },
];


// ── About Stats ───────────────────────────────────────────────────────────────
export const ABOUT_STATS = [
  { value: '1+',  label: 'Year Experience',    icon: 'fas fa-briefcase'    },
  { value: '3',   label: 'Projects Shipped',   icon: 'fas fa-rocket'       },
  { value: '7',   label: 'Certifications',     icon: 'fas fa-certificate'  },
  { value: '10+', label: 'Technologies',       icon: 'fas fa-layer-group'  },
];

// ── Skills ────────────────────────────────────────────────────────────────────
export const SKILLS = [
  {
    category: 'Programming Languages',
    items: [
      { icon: 'devicon-javascript-plain colored', label: 'JavaScript', type: 'devicon' },
      { icon: 'devicon-typescript-plain colored', label: 'TypeScript', type: 'devicon' },
      {
        type: 'svg', label: 'Python',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="32" height="32"><linearGradient id="py1" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#5A9FD4"/><stop offset="1" stop-color="#306998"/></linearGradient><linearGradient id="py2" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientUnits="userSpaceOnUse" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"><stop offset="0" stop-color="#FFD43B"/><stop offset="1" stop-color="#FFE873"/></linearGradient><path fill="url(#py1)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V68.38c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"/><path fill="url(#py2)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"/></svg>`,
      },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    items: [
      { icon: 'devicon-react-original colored',    label: 'React.js',     type: 'devicon' },
      { icon: 'devicon-nodejs-plain colored',      label: 'Node.js',      type: 'devicon' },
      { icon: 'devicon-express-original',          label: 'Express.js',   type: 'devicon' },
      { icon: 'devicon-tailwindcss-plain colored', label: 'Tailwind CSS', type: 'devicon' },
      { icon: 'devicon-redux-original colored',    label: 'Redux Toolkit',type: 'devicon' },
      { icon: 'devicon-angularjs-plain colored',   label: 'Angular',      type: 'devicon' },
    ],
  },
  {
    category: 'Databases',
    items: [
      { icon: 'devicon-mongodb-plain colored',   label: 'MongoDB', type: 'devicon' },
      { icon: 'devicon-mysql-original colored',   label: 'MySQL',   type: 'devicon' },
    ],
  },
  {
    category: 'Tools & Technologies',
    items: [
      { icon: 'devicon-git-plain colored',     label: 'Git',      type: 'devicon' },
      { icon: 'devicon-github-original',       label: 'GitHub',   type: 'devicon' },
      { icon: 'devicon-postman-plain colored', label: 'Postman',  type: 'devicon' },
      { icon: 'devicon-linux-plain colored',   label: 'Linux',    type: 'devicon' },
      { icon: 'devicon-jest-plain colored',    label: 'Jest',     type: 'devicon' },
      { icon: 'devicon-docker-plain colored',  label: 'Docker',   type: 'devicon' },
      {
        type: 'svg', label: 'Vite',
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 410 404" width="32" height="32"><defs><linearGradient id="vt1" x1="-.02" y1="-.02" x2="1" y2="1"><stop offset="0" stop-color="#41D1FF"/><stop offset="1" stop-color="#BD34FE"/></linearGradient><linearGradient id="vt2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF3CAC"/><stop offset=".5" stop-color="#784BA0"/><stop offset="1" stop-color="#2B86C5"/></linearGradient></defs><path fill="url(#vt1)" d="M399.641 59.525l-183.998 329.02c-3.756 6.707-13.559 6.72-17.33.022L10.982 59.547c-4.049-7.217 2.676-15.616 10.764-13.276l184.954 52.49a10.26 10.26 0 005.488.021l181.483-52.518c8.07-2.335 14.78 6.04 10.97 13.26z"/><path fill="url(#vt2)" d="M292.61 1.044l-142.77 27.562a5.086 5.086 0 00-4.1 5.065l-2.215 184.644a5.09 5.09 0 006.027 5.01l39.933-8.253a5.09 5.09 0 016.068 5.765l-11.857 57.688a5.09 5.09 0 006.337 5.94l24.654-7.49a5.09 5.09 0 016.35 5.94l-18.84 91.246c-1.178 5.707 6.441 8.823 9.63 3.965l2.131-3.289 117.157-233.97a5.09 5.09 0 00-4.64-7.497l-41.122 7.985a5.09 5.09 0 01-5.81-6.602l26.851-82.069a5.09 5.09 0 00-4.978-6.629z"/></svg>`,
      },
      { icon: 'fas fa-key',                    label: 'JWT Auth', type: 'fa'      },
    ],
  },
];

// ── Projects ──────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id:          'devconnect',
    title:       'DevConnect',
    icon:        'fas fa-users-cog',
    description: 'Full-stack developer collaboration platform enabling real-time networking and project collaboration. Built with React, Vite, Tailwind CSS, and Redux Toolkit on the frontend, with Node.js/Express REST APIs, JWT authentication, and WebSocket-based real-time messaging on the backend.',
    tech:        ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'WebSocket', 'Redux Toolkit'],
    links: [
      { label: 'Frontend', url: 'https://github.com/SaiKalyan-07/devconnect-frontend' },
      { label: 'Backend',  url: 'https://github.com/SaiKalyan-07/devconnect-backend' },
    ],
  },
  {
    id:          'streamhub',
    title:       'StreamHub',
    icon:        'fas fa-play-circle',
    description: 'Scalable video streaming web application integrating the YouTube Data API for real-time content. Features debounced search with Redux-based caching, lazy loading, dynamic routing, recursive nested comments, and simulated live chat functionality.',
    tech:        ['React.js', 'Redux Toolkit', 'React Router', 'Tailwind CSS', 'YouTube API'],
    links: [
      { label: 'Code', url: 'https://github.com/SaiKalyan-07/streamhub' },
    ],
  },
  {
    id:          'phishshield',
    title:       'PhishShield AI',
    icon:        'fas fa-shield-alt',
    description: 'Machine learning solution for phishing detection with automated data ingestion, validation, and preprocessing using Python and KNN-Imputer. FastAPI REST endpoints support real-time phishing prediction with asynchronous CSV input handling and trained Scikit-learn model integration.',
    tech:        ['Python', 'Scikit-learn', 'FastAPI', 'MongoDB'],
    links: [
      { label: 'Code', url: 'https://github.com/SaiKalyan-07/phish-shield-ai' },
    ],
  },
];

// ── Experience ────────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    role:     'Frontend Developer Intern',
    company:  'The Brand Hypothesis',
    period:   'Sep 2025 – Nov 2025',
    location: 'Chennai, Tamil Nadu',
    bullets: [
      'Built responsive, cross-browser compatible web interfaces using React.js, HTML, CSS, and JavaScript, delivering scalable UI components across desktop and mobile platforms',
      'Integrated RESTful APIs to enable dynamic, data-driven frontend features with efficient client–server communication and seamless data rendering',
      'Designed modular React component architecture with reusable UI patterns and optimized rendering strategies, improving maintainability and frontend performance',
    ],
  },
];

// ── Education ─────────────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    degree:      'B.Tech Artificial Intelligence and Data Science',
    institution: 'KCG College of Technology, Chennai',
    period:      '2021 – 2025',
    icon:        'fas fa-graduation-cap',
    iconClass:   'graduation-cap',
    scoreLabel:  'CGPA',
    score:       7.4,
    scoreMax:    10.0,
    scoreClass:  'cgpa-counter',
    decimals:    1,
    barWidth:    '74%',
  },
  {
    degree:      'Higher Secondary Certificate (CBSE) — CS & Mathematics',
    institution: 'Kendriya Vidyalaya, Minambakkam, Chennai',
    period:      '2020 – 2021',
    icon:        'fas fa-school',
    iconClass:   'school',
    scoreLabel:  'Score',
    score:       94,
    scoreMax:    null,
    scoreClass:  'score-counter',
    decimals:    0,
    barWidth:    '94%',
    barClass:    'hsc-progress',
  },
  {
    degree:      'Secondary School Leaving Certificate (CBSE)',
    institution: 'Kendriya Vidyalaya, Minambakkam, Chennai',
    period:      '2018 – 2019',
    icon:        'fas fa-school',
    iconClass:   'school',
    scoreLabel:  'Score',
    score:       82,
    scoreMax:    null,
    scoreClass:  'score-counter',
    decimals:    0,
    barWidth:    '82.8%',
    barClass:    'sslc-progress',
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