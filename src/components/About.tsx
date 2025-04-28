import { motion } from 'framer-motion';

const TechStack = ({ tech, index }: { tech: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white rounded-lg shadow-md p-3 text-center hover:shadow-lg transition-shadow"
  >
    {tech}
  </motion.div>
);

const About = () => {
  const techStack = [
    'React.js',
    'Next.js',
    'Tailwind CSS',
    'Node.js',
    'Express',
    'FastAPI',
    'Django',
    'JavaScript',
    'Python',
    'Bash',
    'MongoDB',
    'PostgreSQL',
    'Docker',
    'Podman',
    'Linux',
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
          About Me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Professional Summary */}
          <div>
            <h3 className="text-2xl font-semibold text-primary-accent mb-4">
              Professional Summary
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              A passionate Full-Stack Developer with expertise in modern web technologies
              and system administration. Certified as a Red Hat System Administrator,
              I bring a unique blend of development and operational skills to create
              robust, scalable solutions.
            </p>

            {/* Education */}
            <div className="mt-8">
              <h3 className="text-2xl font-semibold text-primary-accent mb-4">
                Education
              </h3>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="font-semibold text-secondary-accent">
                  SRM Institute of Science and Technology
                </h4>
                <p className="text-gray-600 mt-2">
                  B. Tech in Computer Science
                  <br />
                  Specialization in Cyber Security
                </p>
                <p className="text-gray-500 mt-2">Sept 2022 – Present</p>
                <p className="text-primary-accent font-semibold mt-2">GPA: 8.71</p>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-2xl font-semibold text-primary-accent mb-6">
              Tech Stack
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {techStack.map((tech, index) => (
                <TechStack key={tech} tech={tech} index={index} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About; 