import { motion } from 'framer-motion';

interface Certification {
  name: string;
  issuer: string;
  date: string;
  icon: string;
}

const CertificationCard = ({ certification, index }: { certification: Certification; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    viewport={{ once: true }}
    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
  >
    <div className="flex items-center mb-4">
      <div className="flex-shrink-0">
        <span className="text-3xl" role="img" aria-label="certification icon">
          {certification.icon}
        </span>
      </div>
      <div className="ml-4">
        <h3 className="text-xl font-semibold text-secondary-accent">
          {certification.name}
        </h3>
        <p className="text-primary-accent">{certification.issuer}</p>
      </div>
    </div>
    <p className="text-gray-500">{certification.date}</p>
  </motion.div>
);

const Certifications = () => {
  const certifications: Certification[] = [
    {
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      date: '2024',
      icon: '☁️',
    },
    {
      name: 'MongoDB Certified Developer Associate',
      issuer: 'MongoDB',
      date: '2024',
      icon: '🗄️',
    },
    {
      name: 'Red Hat Certified System Administrator (RHCSA)',
      issuer: 'Red Hat',
      date: '2024',
      icon: '🎓',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-secondary-accent text-center mb-12">
          Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((certification, index) => (
            <CertificationCard
              key={certification.name}
              certification={certification}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Certifications; 