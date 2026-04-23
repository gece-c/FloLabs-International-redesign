export type Project = {
  slug: string;
  name: string;
  summary: string;
  details: string[];
};

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blogs" },
  { href: "/internships", label: "Internships" },
];

export const projects: Project[] = [
  {
    slug: "moodchanger",
    name: "MoodChanger",
    summary:
      "An AI-powered platform designed to enhance emotional well-being using advanced models to analyze user input.",
    details: [
      "AI-powered emotional well-being platform.",
      "Uses advanced models to analyze user inputs.",
      "Generates personalized guidance from the analysis.",
    ],
  },
  {
    slug: "caipo",
    name: "CAIPO",
    summary:
      "Chief Artificial Intelligence Productivity Officer, a wearable AI concept for audio/video capture and productivity workflows.",
    details: [
      "Chief Artificial Intelligence Productivity Officer.",
      "Wearable AI technology with audio and video capture.",
      "Supports note-taking and productivity-focused workflows.",
    ],
  },
  {
    slug: "flo-studios",
    name: "Flo Studios",
    summary:
      "A creative hub that brings together UX/UI design, multimedia production, and marketing collaboration.",
    details: [
      "Creative and innovation hub.",
      "Brings together UX/UI designers, multimedia creators, and marketers.",
      "Built to support collaborative product storytelling.",
    ],
  },
  {
    slug: "flo-travel",
    name: "Flo Travel",
    summary:
      "AI-assisted travel planning for flights, hotels, trips, and activities in a single planning workflow.",
    details: [
      "AI-assisted travel planning.",
      "Helps plan flights, hotels, and activities.",
      "Designed to personalize end-to-end trip experiences.",
    ],
  },
];

export const verticals = [
  {
    title: "Education",
    text: "Experiential learning through programs and internships that build practical, real-world skills.",
  },
  {
    title: "Healthcare",
    text: "AI-driven insights that support smarter diagnostics and personalized care solutions.",
  },
  {
    title: "Travel",
    text: "A personalized AI travel platform and chatbot for tailored travel experiences.",
  },
  {
    title: "Space",
    text: "AI solutions for space exploration, education, research, and sustainable development.",
  },
];

export const methodology = [
  "Recorded Meetings",
  "Brainwriting Exercises",
  "Advanced AI Tools",
  "Industry Experts",
  "Hands-on Projects",
];
