import type { Skill, JourneyItem } from '../interfaces/AboutInterfaces';

export const mockBio = [
    'I\'m a passionate Full Stack Developer with a love for creating digital experiences that solve real problems. My journey in programming started with curiosity and has evolved into a deep passion for crafting elegant, efficient solutions.',
    'I have experience in both frontend and backend development, working with modern technologies like React, Node.js, PHP, and MySQL. I enjoy the entire development process, from conceptualizing user interfaces to architecting robust backend systems.',
    'When I\'m not coding, I\'m usually learning about new technologies, contributing to open source projects, or thinking about innovative ways to improve user experiences. My goal is to continuously grow as a developer and contribute to projects that make a meaningful impact.'
];

export const mockSkills: Skill[] = [
    {
        icon: '🧩',
        name: 'Problem Solving',
        description: 'Analytical thinking and creative solutions'
    },

    {
        icon: '🤝',
        name: 'Teamwork',
        description: 'Collaborative development and communication'
    },
    {
        icon: '🎨',
        name: 'Creativity',
        description: 'Innovative design and user experiences'
    },
    {
        icon: '⚡',
        name: 'Adaptability',
        description: 'Quick learning and technology adaptation'
    },

    {
        icon: '💻',
        name: 'Passion for Code',
        description: 'Continuous improvement and clean code'
    },
    {
        icon: '🚀',
        name: 'Full Stack',
        description: 'Frontend to backend development'
    }
];

export const mockJourney: JourneyItem[] = [
    {
        month: '10/02',
        title: 'Started Coding Journey',
        description: 'Discovered my passion for web development'
    },
    {
        month: '28/05',
        title: 'Frontend Focus',
        description: 'Mastered React, JavaScript, and modern CSS'
    },
    {
        month: '28/07',
        title: 'Full Stack Developer',
        description: 'Expanded to backend with Node.js and databases'
    },
    {
        month: '25/09',
        title: 'Started my Laravel journey',
        description: 'Discovered the power and elegance of Laravel'
    },
    {
        month: '02/12',
        title: 'Integrating Prisma ORM',
        description: 'Started exploring Prisma with TypeScript for robust and type-safe database access.'
    }
];