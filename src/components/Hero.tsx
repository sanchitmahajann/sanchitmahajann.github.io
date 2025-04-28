import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Content */}
      <div className="relative z-10 text-center px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-secondary-accent mb-4 drop-shadow-lg">
            Sanchit Mahajan
          </h1>
          <h2 className="text-xl md:text-2xl text-primary-accent mb-8 drop-shadow">
            Full Stack Developer
          </h2>
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="inline-block bg-secondary-accent text-white px-8 py-3 rounded-full hover:bg-primary-accent transition-colors cursor-pointer"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero; 