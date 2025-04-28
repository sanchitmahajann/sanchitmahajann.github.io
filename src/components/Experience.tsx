import { motion } from 'framer-motion';

interface Experience {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
}

const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    viewport={{ once: true }}
    className="bg-white rounded-lg shadow-lg p-6 relative"
  >
    <div className="absolute top-6 -left-3 w-6 h-6 bg-primary-accent rounded-full border-4 border-white" />
    <h3 className="text-xl font-semibold text-secondary-accent mb-2">
      {experience.title}
    </h3>
    <h4 className="text-primary-accent font-medium mb-2">{experience.company}</h4>
    <p className="text-gray-500 mb-4">{experience.period}</p>
    <ul className="list-disc list-inside text-gray-600 space-y-2">
      {experience.responsibilities.map((responsibility, idx) => (
        <li key={idx}>{responsibility}</li>
      ))}
    </ul>
  </motion.div>
);

const Experience = () => {
  const experiences: Experience[] = [
    {
      title: 'Vice President',
      company: 'Liftoff',
      period: 'Oct 2023 – Present',
      responsibilities: [
        'Lead technical initiatives and project management',
        'Mentor team members in software development best practices',
        'Drive innovation and technical excellence in project delivery',
      ],
    },
    {
      title: 'Summer Industrial Trainee',
      company: 'Intel Unnati Industrial Training Program',
      period: 'May 2024 – July 2024',
      responsibilities: [
        'Participate in intensive industrial training program',
        'Work on real-world projects using cutting-edge technologies',
        'Collaborate with industry professionals and fellow trainees',
      ],
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
          Experience
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200" />
          
          {/* Experience cards */}
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div
                key={experience.title}
                className={`flex ${
                  index % 2 === 0 ? 'justify-end' : 'justify-start'
                } relative`}
              >
                <div className="w-full md:w-5/12">
                  <ExperienceCard experience={experience} index={index} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Experience; 