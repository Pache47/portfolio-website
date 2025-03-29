import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, MessageSquare, Flag, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const skills = [
    { name: 'Languages', icon: '💻', details: 'Python, C/C++, JavaScript, Java, HTML/CSS' },
    { name: 'Cloud/DevOps', icon: '☁️', details: 'Azure, Git/GitHub, Docker, Kubernetes' },
    { name: 'AI/ML', icon: '🤖', details: 'TensorFlow, PyTorch, Scikit-learn, LangChain' },
    { name: 'Databases', icon: '🗄️', details: 'SQL, MongoDB, REST APIs' },
    { name: 'Frameworks', icon: '⚡', details: 'React, Flask, Power Platform' },
    { name: 'Tools', icon: '🛠️', details: 'Postman, Figma, MS Copilot Studio, Agile' }
  ];

  const projects = [
    {
      title: 'Gesture-Controlled Feedback System',
      description: 'Designed and developed an innovative Kinect Azure-powered system enabling students to rate lectures in real time using hand gestures. The system bridges communication gaps between professors and students by providing actionable feedback and peer-learning insights.',
      tech: 'Kinect Azure SDK, Python, Figma',
      image: '/images/feedback-image.jpeg',
      demo: 'https://www.youtube.com/watch?v=lHmhwdEqd7k'
    },
    {
      title: 'eGROCERY Web Application',
      description: ' Authored an extensive SRS document detailing the software functionalities and servingas a critical reference for all stakeholders. Architected a robust backend infrastructure with the Flask. Designed a MongoDB database and implemented a comprehensive set of RESTful API endpoints for dynamic inventory and usermanagement',
      tech: 'Flask, HTML/CSS, JavaScript, Rest API, MongoDB',
      image: '/images/egroc.jpeg',
      github: 'https://github.com/jakobnunnendorf/SE_egrocery',
      demo: 'https://drive.google.com/file/d/10JtEzLYen67qOBw_krwoDxG74GgLh6Jt/view?usp=drive_link'
      
    },
    {
      title: 'Santorini Game Implementation with Design Patterns',
      description: 'Built a CLI version of the Santorini board game by applying design patterns (Strategy, Observer, Command) to create a modular and maintainable codebase. I have also incorporated an AI opponents with heuristic-based decision-making; implemented a scoring system and undo/redo functionality.',
      tech: 'Python',
      image: '/images/santorini.jpeg',
      github: 'https://github.com/Pache47/Santorini'
      
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-lg z-50 border-b border-sky-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-light text-sky-600"
            >
              Pache
            </motion.div>
            <div className="flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-light transition-colors ${
                    activeSection === section ? 'text-sky-600' : 'text-gray-500 hover:text-sky-600'
                  }`}
                >
                  {section}
                </button>
              ))}
              <Link
                to="/chat"
                className="text-sm font-light text-sky-600 hover:text-sky-700 flex items-center"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat with AI
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16">
        <div className="max-w-6xl mx-auto px-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl font-bold text-[#733D29]"
              >
                Hi, I'm Tsega Abebe
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl text-gray-600 font-light"
              >
                <TypeAnimation
                  sequence={[
                    'Software Developer',
                    2000,
                    'AI/ML Engineer',
                    2000,
                    'Solutions Architect',
                    2000,
                    'Tech Enthusiast',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-[#E67E22]"
                />
              </motion.div>
              
              {/* Social Links */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex space-x-6 pt-4"
              >
                <a href="https://www.linkedin.com/in/tsega-pache/" className="text-gray-600 hover:text-sky-600 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://github.com/Pache47" className="text-gray-600 hover:text-sky-600 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="mailto:tsega.abebe@u.yale-nus.edu.sg" className="text-gray-600 hover:text-sky-600 transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </motion.div>

              {/* Download CV Button */}
              <motion.button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/documents/Tsega Abebe_Resume.pdf';
                  link.download = 'Tsega Abebe_Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8 bg-[#E67E22] text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-[#D35400] transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download CV</span>
              </motion.button>
            </motion.div>

            {/* Right Column - Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-[400px] h-[400px] mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-[#E67E22] transform rotate-6"></div>
                <img
                  src="/images/img.jpeg"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-2 -right-2"
                >
                  <Flag className="w-8 h-8 text-[#E67E22]" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-20 bg-sky-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-light text-center mb-16 text-gray-800"
          >
            About Me
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-gray-600 font-light leading-relaxed">
                I am a passionate software developer with a strong foundation in mathematical and computational sciences. 
                My academic background combined with practical experience allows me to approach complex problems with both 
                analytical precision and creative solutions.
              </p>
              <p className="text-gray-600 font-light leading-relaxed">
                I thrive in environments where I can combine my technical expertise with innovative thinking to create 
                impactful solutions. My expertise spans across software engineering, cloud computing, AI/ML technologies, 
                solution architecture, and product management, with a particular interest in 
                building elegant products. 
              </p>
            </motion.div>

            {/* Right Column - Education */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-sky-50">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full bg-sky-50 flex items-center justify-center">
                    <img
                      src="/images/yale-nus-logo.png"
                      alt="Yale-NUS Logo"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-gray-800 mb-1">Yale-NUS College</h3>
                    <p className="text-gray-600 font-light">National University of Singapore</p>
                    <p className="text-sky-600 font-light mt-2">B.Sc. (Hons) Mathematical, Computational and Statistical Sciences</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-sky-50">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full bg-sky-50 flex items-center justify-center">
                    <img
                      src="/images/yale-logo2.png"
                      alt="Yale Logo"
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-gray-800 mb-1">Yale University</h3>
                    <p className="text-gray-600 font-light">Exchange Program</p>
                    <p className="text-sky-600 font-light mt-2">B.Sc. Computer Science</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-light text-center mb-16 text-gray-800"
          >
            Technical Expertise
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-sky-50"
              >
                <div className="text-4xl mb-4">{skill.icon}</div>
                <h3 className="text-xl font-light text-gray-800 mb-2">{skill.name}</h3>
                <p className="text-gray-600 font-light">{skill.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-light text-center mb-16 text-gray-800"
          >
            Featured Work
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="relative h-[400px] perspective-1000"
                onHoverStart={() => setFlippedCard(index)}
                onHoverEnd={() => setFlippedCard(null)}
              >
                <motion.div
                  animate={{ rotateY: flippedCard === index ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full relative preserve-3d"
                >
                  {/* Front of card */}
                  <div className="absolute w-full h-full backface-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl">
                      <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-xl font-light mb-2">{project.title}</h3>
                        <p className="text-sm text-gray-200">{project.tech}</p>
                      </div>
                    </div>
                  </div>
                  {/* Back of card */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white/90 backdrop-blur-sm rounded-xl p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-light mb-4 text-gray-800">{project.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                      <p className="text-sky-600 font-light">{project.tech}</p>
                    </div>
                    <div className="flex space-x-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 hover:text-sky-600"
                        >
                          <Github className="w-5 h-5 mr-2" />
                          Code
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 hover:text-sky-600"
                        >
                          <Flag className="w-5 h-5 mr-2" />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-sky-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-light text-center mb-16 text-gray-800"
          >
            Experience
          </motion.h2>
          <div className="space-y-8">
            {/* Robert Bosch Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-sky-50"
            >
              <div className="flex items-start space-x-6">
                <div className="w-20 h-20 rounded-full bg-sky-50 flex items-center justify-center flex-shrink-0">
                  <img
                    src="/images/bosch-logo.png"
                    alt="Robert Bosch Logo"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-light text-gray-800">AI/Cloud Engineer Intern</h3>
                      <p className="text-sky-600 font-light">Robert Bosch (SEA), Singapore</p>
                    </div>
                    <span className="text-gray-500 font-light">May 2024 – Present</span>
                  </div>
                  <ul className="space-y-3 text-gray-600 font-light">
                    <li className="flex items-start">
                      <span className="text-sky-600 mr-2">•</span>
                      Developing an agentic AI chatbot (Teams-integrated) leveraging Azure, Microsoft's Copilot Studio and Power Platform to automate demand workflows (~3000 weekly) via NLP/document uploads and enable real-time request tracking through RESTful APIs.
                    </li>
                    <li className="flex items-start">
                      <span className="text-sky-600 mr-2">•</span>
                      Architected and deployed a low-code automation solution that reduced document search time by 70% and estimated saving €500 monthly via OCR and advanced search integration.
                    </li>
                    <li className="flex items-start">
                      <span className="text-sky-600 mr-2">•</span>
                      Engineered parallel processing workflow in Power Automate, accelerating survey data processing by 40% for enterprise-scale datasets.
                    </li>
                    <li className="flex items-start">
                      <span className="text-sky-600 mr-2">•</span>
                      Created scalable prototypes (POCs) and technical documentation by collaborating with stakeholders to align solutions with enterprise needs, including researching and proposing a ticketing system to streamline support processes.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Yale-NUS Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-sky-50"
            >
              <div className="flex items-start space-x-6">
                <div className="w-20 h-20 rounded-full bg-sky-50 flex items-center justify-center flex-shrink-0">
                  <img
                    src="/images/yale-nus-logo.png"
                    alt="Yale-NUS Logo"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-light text-gray-800">Software Developer Intern</h3>
                      <p className="text-sky-600 font-light">Summer Research Program, Yale-NUS College</p>
                    </div>
                    <span className="text-gray-500 font-light">May 2023 – Jul 2023</span>
                  </div>
                  <ul className="space-y-3 text-gray-600 font-light">
                    <li className="flex items-start">
                      <span className="text-sky-600 mr-2">•</span>
                      Collaborated in constructing a publicly accessible database of over 150 spectral line detection for galaxies (Website).
                    </li>
                    <li className="flex items-start">
                      <span className="text-sky-600 mr-2">•</span>
                      Engineered a responsive and elegant pagination component for the database web interface. Enhanced user experience by dynamically loading galaxy datasets on demand, optimizing website speed and efficiency by 50%.
                    </li>
                    <li className="flex items-start">
                      <span className="text-sky-600 mr-2">•</span>
                      Integrated a feature leveraging JavaScript, enabling about 500 users to export search results in CSV format.
                    </li>
                    <li className="flex items-start">
                      <span className="text-sky-600 mr-2">•</span>
                      Guided CI/CD processes including rigorous testing, debugging, deployment, and maintenance of changes, ensuring seamless integration.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-light text-center mb-16 text-gray-800"
          >
            Let's Connect
          </motion.h2>
          <div className="flex justify-center space-x-8">
            <motion.a
              href="mailto:tsega.abebe@u.yale-nus.edu.sg"
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center space-y-2 text-gray-600 hover:text-sky-600"
            >
              <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                <Mail className="w-8 h-8" />
              </div>
              <span className="text-sm font-light">Email</span>
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/tsega-pache"
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center space-y-2 text-gray-600 hover:text-sky-600"
            >
              <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                <Linkedin className="w-8 h-8" />
              </div>
              <span className="text-sm font-light">LinkedIn</span>
            </motion.a>
            <motion.a
              href="https://github.com/Pache47"
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center space-y-2 text-gray-600 hover:text-sky-600"
            >
              <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
                <Github className="w-8 h-8" />
              </div>
              <span className="text-sm font-light">GitHub</span>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Portfolio;