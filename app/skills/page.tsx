'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FadeInSection from '@/components/FadeInSection';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDE_STORAGE_KEY = 'skills-current-slide';

export default function Skills() {
  const [currentSlide, setCurrentSlide] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const saved = sessionStorage.getItem(SLIDE_STORAGE_KEY);
    return saved !== null ? Number(saved) : 0;
  });
  const totalSlides = 3;

  useEffect(() => {
    sessionStorage.setItem(SLIDE_STORAGE_KEY, String(currentSlide));
  }, [currentSlide]);

  const skills = [
    {
      category: "Programming Languages",
      items: ["Python", "SQL", "C++", "C", "Java", "TypeScript", "Dart", "JavaScript"]
    },
    {
      category: "Frameworks & Libraries",
      items: ["React", "Next.js", "Node.js", "FastAPI", "Flutter", "PyTorch Geometric", "scikit-learn", "XGBoost", "HTML/CSS", "Tailwind CSS"]
    },
    {
      category: "Database",
      items: ["PostgreSQL", "MongoDB", "Firebase"]
    },
    {
      category: "Tools & Technologies",
      items: ["Google Cloud", "Docker", "Git", "VS Code", "Figma", "Adobe Creative Suite"]
    },
    {
      category: "Engineering Skills",
      items: ["CAD Design", "Circuit Design", "Data Analysis", "Problem Solving"]
    }
  ];

  const languages = [
    { name: "Sinhala", level: 95 },
    { name: "English", level: 80, duolingo: 81 },
    { name: "Tamil", level: 30 },
    { name: "Japanese", level: 5,duolingo: 5  }
  ];

  const softSkills = [
    "Teamwork", "Leadership", "Friendship", "Communication", 
    "Problem Solving", "Time Management", "Adaptability", "Creativity"
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getSubtitle = () => {
    switch(currentSlide) {
      case 0: return "Academic journey and achievements";       // Education
      case 1: return "Technical expertise and capabilities";   // Tech Skills
      case 2: return "Languages and interpersonal abilities";  // Languages
      default: return "Academic journey and achievements";
    }
  };

  return (
    <div className="container mx-auto px-6 pt-10 pb-16 relative">
      {/* Slider Controls - Fixed Position */}
      <div className="absolute top-4 right-6 flex items-center space-x-4 text-lg z-10">
        <button onClick={prevSlide} className="hover:text-white transition-colors">
          <ChevronLeft size={24} />
        </button>
        <span className="text-2xl sm:text-3xl md:text-4xl font-light">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="text-gray-400">/ {String(totalSlides).padStart(2, '0')}</span>
        <button onClick={nextSlide} className="hover:text-white transition-colors">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <div className="mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4"
            >
              Skills
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl font-light text-gray-300">
              {getSubtitle()}
            </motion.p>
          </div>
        </FadeInSection>

       

        {/* Slide 0 - Education */}
        <AnimatePresence mode="wait">
        {currentSlide === 0 && (
          <motion.div
            key="slide-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
            
            {/* University */}
            <FadeInSection delay={0.1}>
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-8 shadow-xl shadow-white/20"
              >
              <h2 className="text-lg sm:text-xl md:text-2xl font-light mb-6 text-white border-b border-white border-opacity-20 pb-3">
                University Education
              </h2>
              <div className="font-light space-y-3">
                <h3 className="text-base sm:text-lg md:text-xl text-white mb-2">Computer Science Engineering</h3>
                <h4 className="text-sm sm:text-base md:text-lg text-gray-300 mb-2">University of Moratuwa</h4>
                <p className="text-gray-400 text-sm mb-3">Since March 2024</p>
                <div className="space-y-2">
                  <p className="text-gray-300">CGPA: <span className="text-white font-normal">3.56</span></p>
                  <p className="text-gray-300">Dean&apos;s List: <span className="text-white font-normal">Semester 1 (GPA 4.00), Semester 2 (GPA 3.82)</span></p>
                </div>
              </div>
              </motion.div>
            </FadeInSection>


            {/* School Education */}
            <FadeInSection delay={0.2}>
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-8 shadow-xl shadow-white/20"
              >
              <h2 className="text-lg sm:text-xl md:text-2xl font-light mb-6 text-white border-b border-white border-opacity-20 pb-3">
                School Education
              </h2>
              <div className="space-y-4 font-light">
                <div>
                  <h4 className="text-base sm:text-lg md:text-xl text-gray-300 mb-2">Kingswood College Kandy</h4>
                  <p className="text-gray-400 text-sm mb-4">2008 - 2022</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm sm:text-base md:text-lg text-white mb-2">GCE O/L (2019)</h4>
                    <p className="text-gray-300">Obtained <span className="text-white font-normal">9 As</span> (including Tamil)</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm sm:text-base md:text-lg text-white mb-2">GCE A/L (2022)</h4>
                    <p className="text-gray-300">Physical Science Stream</p>
                    <p className="text-gray-300">Obtained <span className="text-white font-normal">3 As</span></p>
                    <p className="text-gray-300">Z-Score: <span className="text-white font-normal">2.5895</span> | IR: <span className="text-white font-normal">152</span></p>
                  </div>
                </div>
              </div>
              </motion.div>
            </FadeInSection>

            {/* Diploma */}
            <FadeInSection delay={0.3}>
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-8 shadow-xl shadow-white/20"
              >
              <h2 className="text-lg sm:text-xl md:text-2xl font-light mb-6 text-white border-b border-white border-opacity-20 pb-3">
                Diploma in IT and English
              </h2>
              <div className="font-light">
                <h4 className="text-base sm:text-lg md:text-xl text-gray-300 mb-2">ESOFT Metro Campus Kandy</h4>
                <p className="text-gray-400 text-sm mb-4">March 2023 - January 2024</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm sm:text-base md:text-lg text-white mb-2">Diploma in IT</h4>
                    <p className="text-gray-300">Overall Grade: <span className="text-white font-normal">Distinction</span></p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm sm:text-base md:text-lg text-white mb-2">Diploma in English</h4>
                    <p className="text-gray-300">Overall Grade: <span className="text-white font-normal">Distinction</span></p>
                  </div>
                </div>
            </motion.div>
            </FadeInSection>

            
          </div>
          </motion.div>
        )}

         {/* Slide 1 - Technical Skills */}
          {currentSlide === 1 && (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                {skills.map((skillSet, index) => (
                  <FadeInSection key={index} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-8 shadow-xl shadow-white/20 hover:shadow-white/30 transition-all duration-300"
                    >
                      <h2 className="text-lg sm:text-xl md:text-2xl font-light mb-6 text-white border-b border-white border-opacity-20 pb-3">
                        {skillSet.category}
                      </h2>
                      <div className="flex flex-wrap gap-3">
                        {skillSet.items.map((skill, skillIndex) => (
                          <motion.span 
                            key={skillIndex}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-light hover:bg-white/20 transition-all duration-200 cursor-pointer"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </FadeInSection>
                ))}
              </div>
            </motion.div>
          )}

        {/* Slide 2 - Languages & Soft Skills */}
        {currentSlide === 2 && (
          <motion.div
            key="slide-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              {/* Languages */}
              <FadeInSection delay={0.1}>
                <motion.div 
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-8 shadow-xl shadow-white/20"
                >
              <h2 className="text-lg sm:text-xl md:text-2xl font-light mb-6 text-white border-b border-white border-opacity-20 pb-3">
                Languages
              </h2>
              <div className="space-y-6">
                {languages.map((lang, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-light text-sm sm:text-base md:text-lg">{lang.name}</span>
                        {lang.duolingo && (
                          <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                            <span className="text-sm">🦉</span>
                            <span className="text-white font-light text-sm">Duolingo: {lang.duolingo}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-gray-400 font-light">{lang.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-gray-500 via-gray-200 to-gray-400 h-3 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-white/30"
                        style={{ width: currentSlide === 2 ? `${lang.level}%` : '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              </motion.div>
            </FadeInSection>

            {/* Soft Skills */}
            <FadeInSection delay={0.2}>
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-8 shadow-xl shadow-white/20"
              >
              <h2 className="text-lg sm:text-xl md:text-2xl font-light mb-6 text-white border-b border-white border-opacity-20 pb-3">
                Other Skills
              </h2>
              <div className="flex flex-wrap gap-3 mb-8">
                {softSkills.map((skill, index) => (
                  <motion.span 
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-light hover:bg-white/20 transition-all duration-200 cursor-pointer"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
              
              {/* Skill Icons/Visuals */}
              <div className="grid grid-cols-4 gap-4 pt-6 border-t border-white border-opacity-20">
                <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                  <span className="text-4xl">🤝</span>
                </div>
                <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                  <span className="text-4xl">💡</span>
                </div>
                <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                  <span className="text-4xl">🎯</span>
                </div>
                <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                  <span className="text-4xl">⚡</span>
                </div>
                <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                  <span className="text-4xl">🚀</span>
                </div>
                <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                  <span className="text-4xl">💬</span>
                </div>
                <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                  <span className="text-4xl">🎨</span>
                </div>
                <div className="aspect-square bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                  <span className="text-4xl">⏱️</span>
                </div>
              </div>
              </motion.div>
            </FadeInSection>
          </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}
