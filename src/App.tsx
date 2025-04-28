import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'About', to: 'about' },
    { title: 'Projects', to: 'projects' },
    { title: 'Experience', to: 'experience' },
    { title: 'Certifications', to: 'certifications' },
  ];

  return (
    <div className="bg-primary-bg min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="hero" smooth={true} duration={500} className="cursor-pointer">
              <span className="text-secondary-accent font-bold text-xl">SM</span>
            </Link>
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    smooth={true}
                    duration={500}
                    className="text-secondary-accent hover:text-primary-accent cursor-pointer transition-colors"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="about" className="py-20">
          <About />
        </section>
        <section id="projects" className="py-20 bg-secondary-bg">
          <Projects />
        </section>
        <section id="experience" className="py-20">
          <Experience />
        </section>
        <section id="certifications" className="py-20 bg-secondary-bg">
          <Certifications />
        </section>
      </main>

      {/* Contact Bar */}
      <Contact />
    </div>
  );
}

export default App;
