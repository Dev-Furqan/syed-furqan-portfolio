import {
  Atom,
  Boxes,
  Braces,
  Cable,
  ChartNoAxesCombined,
  CheckCircle2,
  Code2,
  Cpu,
  Gauge,
  Globe2,
  Layers3,
  LayoutGrid,
  MonitorSmartphone,
  Rocket,
  SearchCheck,
  ServerCog,
  ShoppingCart,
  Sparkles,
  Workflow,
} from 'lucide-react';

export const highlights = [
  { value: 'MERN', label: 'full-stack architecture' },
  { value: 'WP', label: 'custom WordPress systems' },
  { value: 'Woo', label: 'commerce funnels' },
  { value: 'UX', label: 'high-conversion interfaces' },
];

export const skills = [
  {
    group: 'Frontend Engineering',
    icon: MonitorSmartphone,
    items: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Three.js', 'Responsive UI'],
  },
  {
    group: 'MERN Backend',
    icon: ServerCog,
    items: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST APIs', 'Auth Flows', 'Deployment'],
  },
  {
    group: 'WordPress Commerce',
    icon: ShoppingCart,
    items: ['WooCommerce', 'Theme Customization', 'Elementor', 'Plugin Setup', 'Payments', 'Speed Optimization'],
  },
  {
    group: 'Growth & Quality',
    icon: ChartNoAxesCombined,
    items: ['SEO', 'Performance', 'Accessibility', 'Conversion UX', 'Analytics', 'Technical Audits'],
  },
];

export const techStack = [
  { label: 'React', icon: Atom },
  { label: 'Node', icon: Cpu },
  { label: 'MongoDB', icon: Boxes },
  { label: 'Tailwind', icon: Layers3 },
  { label: 'GSAP', icon: Sparkles },
  { label: 'WordPress', icon: Globe2 },
  { label: 'WooCommerce', icon: ShoppingCart },
  { label: 'SEO', icon: SearchCheck },
];

export const experience = [
  {
    role: 'Founder & Developer',
    company: 'Nexus Blend Studio',
    period: 'Current',
    points: [
      'Builds polished business websites, ecommerce stores, and custom MERN applications.',
      'Focuses on conversion-led UI, fast loading experiences, and maintainable engineering.',
    ],
  },
  {
    role: 'MERN Stack Developer',
    company: 'Independent Projects',
    period: 'Modern Web',
    points: [
      'Ships API-driven React applications with reusable components and production deployment paths.',
      'Connects frontend workflows to Express APIs, MongoDB models, and clean validation layers.',
    ],
  },
  {
    role: 'WordPress & WooCommerce Specialist',
    company: 'Client Commerce Builds',
    period: 'Commerce',
    points: [
      'Creates responsive WordPress sites, WooCommerce stores, checkout flows, and landing pages.',
      'Improves website speed, SEO foundations, product presentation, and lead generation paths.',
    ],
  },
];

export const projects = [
  {
    title: 'Nexus Blend Studio',
    category: 'Creative Agency Website',
    summary:
      'Modern creative agency website with premium UI, responsive layouts, smooth interactions, and performance-focused frontend architecture.',
    stack: ['React.js', 'Next.js', 'Tailwind'],
    url: 'https://nexusblendstudio.online',
    thumbnail: '/projects/nexusblend.png',
    accent: 'cyan',
  },
  {
    title: 'Torvix Chauffeur',
    category: 'Premium Chauffeur Service Website',
    summary:
      'Luxury chauffeur service website focused on elegant booking experience, responsive layouts, and premium visual presentation.',
    stack: ['WordPress', 'Custom UI/UX'],
    url: 'https://torvixchauffeurksa.com',
    thumbnail: '/projects/torvix-chauffeur.png',
    accent: 'coral',
  },
  {
    title: 'Blush Baby',
    category: 'eCommerce Beauty Store',
    summary:
      'Modern beauty and skincare ecommerce store optimized for conversions, mobile shopping experience, and premium product presentation.',
    stack: ['Shopify', 'WooCommerce'],
    url: 'https://blushbaby.store',
    thumbnail: '/projects/blush-baby.png',
    accent: 'mint',
  },
  {
    title: 'Publishing Heaven',
    category: 'Custom eBooks Platform',
    summary:
      'Custom landing-based publishing platform designed for lead generation, responsive performance, and conversion optimization.',
    stack: ['Custom PHP', 'Lead Generation'],
    url: 'https://publishing-lp1.thepublishingheaven.com',
    thumbnail: '/projects/publishing-heaven.png',
    accent: 'violet',
  },
  {
    title: 'Zex Skin',
    category: 'SEO-Based Skincare Blog',
    summary:
      'SEO-optimized skincare blog focused on organic traffic growth, content structure, speed optimization, and modern UI.',
    stack: ['WordPress', 'SEO'],
    url: 'https://zexskin.com',
    thumbnail: '/projects/zex-skin.png',
    accent: 'cyan',
  },
  {
    title: 'This Is Magma',
    category: 'Interactive Premium Website',
    summary:
      'High-end immersive interactive website experience featuring cinematic animations, motion effects, and premium scrolling interactions.',
    stack: ['Modern Frontend', 'Motion Design'],
    url: 'https://thisismagma.com',
    thumbnail: '/projects/this-is-magma.png',
    accent: 'coral',
  },
  {
    title: 'MediConnect AI',
    category: 'AI Healthcare Platform',
    summary:
      'Modern AI-powered healthcare platform with clean dashboards, responsive UI, and intelligent workflow presentation.',
    stack: ['React', 'Node.js', 'AI Integration'],
    url: 'https://mediconnectai.com',
    thumbnail: '/projects/mediconnect-ai.png',
    accent: 'mint',
  },
  {
    title: 'Try Fit Track',
    category: 'Fitness Tracking Platform',
    summary:
      'Modern fitness and activity tracking platform with responsive layouts, user-focused dashboards, and clean UI systems.',
    stack: ['React', 'MERN Stack'],
    url: 'https://tryfittrack.com',
    thumbnail: '/projects/try-fit-track.png',
    accent: 'violet',
  },
];

export const services = [
  {
    title: 'MERN Web Applications',
    icon: Braces,
    description: 'Custom React frontends, Express APIs, MongoDB schemas, admin flows, and deployment-ready architecture.',
    outcomes: ['Reusable component systems', 'REST API integration', 'Production deployment'],
  },
  {
    title: 'WordPress Websites',
    icon: LayoutGrid,
    description: 'Fast, responsive WordPress builds for businesses that need a clean brand presence and simple content control.',
    outcomes: ['Custom layouts', 'Plugin configuration', 'SEO structure'],
  },
  {
    title: 'WooCommerce Stores',
    icon: ShoppingCart,
    description: 'Product pages, cart and checkout improvements, payment setup, performance cleanup, and mobile commerce polish.',
    outcomes: ['Conversion-focused UX', 'Payment readiness', 'Speed improvements'],
  },
  {
    title: 'Frontend Motion Systems',
    icon: Workflow,
    description: 'Premium interaction design with smooth animation, 3D scenes, scroll choreography, and accessible fallbacks.',
    outcomes: ['GSAP timelines', 'Framer transitions', 'Three.js visuals'],
  },
];

export const process = [
  { title: 'Diagnose', copy: 'Clarify goals, audience, conversion paths, content, and technical constraints.', icon: SearchCheck },
  { title: 'Design', copy: 'Shape a polished interface system with hierarchy, responsive rules, and motion intent.', icon: Layers3 },
  { title: 'Build', copy: 'Ship clean frontend and backend code with deployment, forms, SEO, and performance in mind.', icon: Code2 },
  { title: 'Optimize', copy: 'Tighten speed, accessibility, analytics, and the details that make the product feel premium.', icon: Gauge },
];

export const contactReasons = [
  { label: 'MERN app', icon: Cable },
  { label: 'WordPress site', icon: Globe2 },
  { label: 'WooCommerce store', icon: ShoppingCart },
  { label: 'Frontend polish', icon: CheckCircle2 },
  { label: 'Launch support', icon: Rocket },
];
