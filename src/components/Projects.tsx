import { motion } from 'framer-motion';

interface Project {
  name: string;
  description: string;
  technologies: string[];
  github: string;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2 }}
    viewport={{ once: true }}
    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
  >
    <div className="p-6">
      <h3 className="text-xl font-semibold text-secondary-accent mb-3">
        {project.name}
      </h3>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-secondary-bg px-3 py-1 rounded-full text-sm text-primary-accent"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-primary-accent hover:text-secondary-accent transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.48 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
            clipRule="evenodd"
          />
        </svg>
        View on GitHub
      </a>
    </div>
  </motion.div>
);

const Projects = () => {
  const projects: Project[] = [
    {
      name: 'Agnishield',
      description: 'Machine learning-based system for detecting phishing URLs using advanced feature extraction and classification techniques.',
      technologies: ['Python', 'Machine Learning', 'scikit-learn', 'Feature Engineering'],
      github: 'https://github.com/sanchitmahajann/agnishield-backend',
    },
    {
      name: 'Writestart',
      description: 'A collaborative writing platform designed to help users improve their writing skills through AI-powered feedback and peer reviews.',
      technologies: ['React', 'Node.js', 'MongoDB', 'AI/ML'],
      github: 'https://github.com/sanchitmahajann/writestart',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-secondary-accent text-center mb-12">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Projects; 