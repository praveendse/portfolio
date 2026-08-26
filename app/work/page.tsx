'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github, VideoOff, Linkedin } from 'lucide-react';
import FadeInSection from '@/components/FadeInSection';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDE_STORAGE_KEY = 'work-current-slide';

export default function Work() {
  const [currentSlide, setCurrentSlide] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const saved = sessionStorage.getItem(SLIDE_STORAGE_KEY);
    return saved !== null ? Number(saved) : 0;
  });
  const totalSlides = 2;

  useEffect(() => {
    sessionStorage.setItem(SLIDE_STORAGE_KEY, String(currentSlide));
  }, [currentSlide]);

  const projects = [
    {
      title: "CoupleCore",
      problem: "Relationship companion app whose core innovation is an AI problem-solving tool that learns from each couple's own history of past issues and resolutions to generate tailored, context-aware guidance.",
      features: [
        "AI problem-solving tool personalized to each couple",
        "Learns from each couple's history of past issues and resolutions",
        "Context-aware, tailored guidance generation",
        "Firebase Cloud Functions backend with LLM integration"
      ],
      techStack: "Flutter, Firebase, Cloud Functions, LLM Integration",
      liveLink: null,
      githubLink: "https://github.com/bkpdesilva/proj-couplecore",
      linkedinLink: null,
      status: "In Progress",
      type: "Individual"
    },
    // {
    //   title: "CoupleCoreAI",
    //   problem: "AI-powered relationship assistant that analyzes couple problems and provides personalized solutions using machine learning.",
    //   features: [
    //     "Text-based problem input",
    //     "ML-powered category prediction (Chores, Finances, Affection)",
    //     "Personalized solution suggestions",
    //     "User feedback system",
    //     "MongoDB logging for analysis"
    //   ],
    //   techStack: "React, Vite, TailwindCSS, Node.js, Express, FastAPI, Python, scikit-learn, MongoDB",
    //   liveLink: "https://couplecore-ai.vercel.app/", // Update with your actual Vercel URL
    //   githubLink: "https://github.com/praveen-de-silva/Proj_AIPoweredProblemSolver", // Update with your actual GitHub URL
    //   linkedinLink: "https://www.linkedin.com/posts/praveen-de-silva-854a732a2_se-datascience-ai-activity-7411021923201216512-a6Ua?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEkg6AABOq2dXdWOGUX3vzM4-Jm8Pzn8mAg",
    //   status: "Completed"
    // },
    {
      title: "Dog vs Cat Specifier",
      problem: "Predicts whether an uploaded image is a dog or a cat using deep learning.",
      features: [
            "Uploads image",
            "Runs TensorFlow model",
            "Displays prediction result",
            "Shows confidence score"
      ],
      techStack: "Python, TensorFlow, Streamlit",
      liveLink: "https://dogcatspecifierpds.streamlit.app/",
      githubLink: "https://github.com/username/weather-app",
      linkedinLink: "https://www.linkedin.com/posts/praveen-de-silva-854a732a2_ml-ai-datascience-activity-7411013210624987136-2-i9?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEkg6AABOq2dXdWOGUX3vzM4-Jm8Pzn8mAg",
      status: "Completed"
    },
    {
      title: "B-Trust MBMS",
      problem: "Designed and implemented a PostgreSQL-based micro-banking system with automated interest calculations, ACID-compliant transactions and role-based access control.",
      features: [
        "Role-driven dashboards (Admin, Manager, Agent)",
        "Automated interest accrual for Savings and FD via scheduled jobs",
        "ACID-compliant transactions and role-based access control",
        "REST APIs with optimized, indexed database queries"
      ],
      techStack: "PostgreSQL, Express.js, React, Node.js, TypeScript",
      liveLink: null,
      githubLink: "https://github.com/microbanking-system/DBMS_Microbanking_System",
      linkedinLink: "https://www.linkedin.com/posts/praveen-de-silva-854a732a2_webdev-dbms-ts-activity-7410811630453874688--ZWZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEkg6AABOq2dXdWOGUX3vzM4-Jm8Pzn8mAg",
      status: "Completed",
      type: "Group"
    },
    {
      title: "EcoEYE - SLIOT'26 (Semi-Finalist)",
      problem: "Developed an IoT energy-management system to detect occupancy from CCTV feeds and trigger zone-based control of building appliances.",
      features: [
        "Occupancy detection from CCTV feeds using YOLOv8-n",
        "Zone-based automated appliance control",
        "Embedded integration with ESP32 and Arduino",
        "React-based monitoring dashboard"
      ],
      techStack: "Python, OpenCV, YOLO-v8-n, Raspberry Pi, ESP32, Arduino, React",
      liveLink: null,
      githubLink: "https://github.com/Maleesha-K/EcoEYE",
      linkedinLink: "https://lnkd.in/p/g8Exh9Jt",
      status: "Completed",
      type: "Group"
    },
    {
      title: "RPAL Interpreter",
      problem: "Implemented a complete 6-stage interpreter pipeline for RPAL.",
      features: [
        "Lexical analysis and tokenization",
        "AST construction and standardization",
        "CSE machine execution",
        "Web-based interactive demo"
      ],
      techStack: "C++, Python, HTML/CSS, Render",
      liveLink: "https://rpal-web.onrender.com",
      githubLink: "https://github.com/bkpdesilva/proj-rpal",
      linkedinLink: "https://lnkd.in/p/gJYTmKCX",
      status: "Completed",
      type: "Group"
    },
    {
      title: "Draftly - Lawyer-in-the-Loop Legal Workflow Platform",
      problem: "Legal workflow platform for Sri Lankan practice that turns unstructured client documents into a verified, evidence-linked matter record with deterministic checks, grounded legal search, and reviewable drafting. Supervised by Dr. Nisansa de Silva.",
      features: [
        "Document ingestion via Google Document AI",
        "RAG-based grounded legal search",
        "Deterministic compliance checks",
        "Evidence-linked matter records",
        "Local LLM-assisted drafting"
      ],
      techStack: "Google Document AI, RAG, NLP, Full-Stack Web, Local LLM",
      liveLink: null,
      githubLink: null,
      linkedinLink: null,
      status: "In Progress",
      type: "Group"
    },
    {
      title: "Flower Exchange - Order Matching Engine",
      problem: "Trading exchange with a price-time-priority order matching engine and both CLI and web interfaces, built on SOLID design principles. Developed in a selective LSEG C++ workshop offered to 25 students from the batch.",
      features: [
        "Price-time-priority order matching engine",
        "CLI and Web UI interfaces",
        "REST API",
        "Built on SOLID design principles"
      ],
      techStack: "C++17, OOP / SOLID, REST API, Web UI",
      liveLink: null,
      githubLink: "https://github.com/praveen-de-silva/Course_CPP_LSEG/tree/main/FP",
      linkedinLink: null,
      status: "Completed",
      type: "Individual"
    },
    {
      title: "Driver Safety MS - SLIOT'25",
      problem: "System for make the driver taks easier and safe. This brings us to the FINAL round of this competition.",
      features: [
        "Digital documentation handelling",
        "Driver intoxication detection",
        "Driver drowsiness (sleep) detection",
        "NFC card scanning for easy identification"
      ],
      techStack: "Python, IoT, Arduino",
      liveLink: null,
      githubLink: "https://github.com/KeshRD/Driver-Sleep-detector",
      linkedinLink: "https://www.linkedin.com/posts/thashira-devindu-49a1b6349_sliotchallenge2025-iot-sltmobitel-ugcPost-7309617829874434048-ljBo?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEkg6AABOq2dXdWOGUX3vzM4-Jm8Pzn8mAg",
      status: "Completed"
    },
    {
      title: "Moonscake E-Commerce Platform",
      problem: "Full-stack web application for a private cake business.",
      features: [
        "Product catalog management",
        "Shopping cart functionality",
        "Secure payment via reciept photo transfering",
        "Order tracking system"
      ],
      techStack: "React, Node.js, MongoDB, Express, Stripe",
      liveLink: null,
      githubLink: null,
      linkedinLink: null,
      status: "In Progress"
    },
    {
      title: "My Portfolio - 02",
      problem: "Modern responsive portfolio website built as a professional digital presence to showcase projects, skills, and achievements to potential employers and collaborators.",
      features: [
        "Responsive design with dark theme",
        "Interactive project showcase with filtering",
        "Skills carousel with progress indicators",
        "Contact form with validation"
        // "Smooth animations and transitions" 
      ],
      techStack: "Next.js, React, TypeScript, Tailwind CSS, Lucide Icons",
      liveLink: "https://praveendesilva.cse23.org/",
      githubLink: "https://github.com/bkpdesilva/portfolio",
      linkedinLink: "https://www.linkedin.com/posts/praveen-de-silva-854a732a2_proud-to-announce-the-completion-of-my-activity-7410786064627494914-xONa?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEkg6AABOq2dXdWOGUX3vzM4-Jm8Pzn8mAg",
      status: "Completed"
    },
    {
      title: "My Portfolio - 01",
      problem: "Static site for my career purpose.",
      features: [
        "Creative UI",
        "Easy maanageble"
      ],
      techStack: "HTML, CSS, JS",
      liveLink: "https://relaxed-mermaid-821c62.netlify.app",
      githubLink: "https://github.com/praveen-de-silva/MyProjects",
      linkedinLink: "https://www.linkedin.com/posts/praveen-de-silva-854a732a2_proud-to-announce-the-completion-of-my-activity-7410786064627494914-xONa?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEkg6AABOq2dXdWOGUX3vzM4-Jm8Pzn8mAg",
      status: "Completed"
    }
  ];

  const research = [
    {
      title: "Pre-Match ODI Win Probability Prediction: Role-Based Feature Engineering and Training Data Analysis for Sri Lanka Cricket",
      year: "2026",
      venue: "Proceedings of the Undergraduate Research Symposium 2026, Dept. of Computer Engineering, University of Jaffna (ISBN: 978-624-6150-99-0)",
      description: "Developed and evaluated five machine-learning classifiers using historical cricket data for pre-match win-probability prediction. Engineered role-based features that improved performance over aggregate baselines by up to 20.86 percentage points. Achieved 71.30% accuracy and 0.78 ROC-AUC with Random Forest; selected as 1 of 6 podium presenters at the Undergraduate Research Symposium 2026.",
      techStack: "Python, scikit-learn, XGBoost, pandas, Feature Engineering, Cricsheet",
      githubLink: "https://github.com/bkpdesilva/research-cric-win-pred",
      linkedinLink: "https://www.linkedin.com/posts/praveen-de-silva-854a732a2_research-ml-sportsanalytics-activity-7491761594604101632-mQ9G",
      status: "Published"
    },
    {
      title: "Physics-Informed, GAN-Augmented Graph Neural Networks for Multi-Horizon Dengue Forecasting",
      year: "2026",
      venue: "Ongoing research, University of Moratuwa",
      description: "Building a spatio-temporal GNN to forecast weekly, district-level dengue incidence across Sri Lanka, enhanced with an epidemic-mechanistic (SEIR-SEI) physics-informed loss, conditional GAN-based augmentation to data scarcity, and a learned adaptive graph capturing unobserved inter-district transmission.",
      techStack: "PyTorch Geometric, Spatio-Temporal GNNs (GCN/GAT), Physics-Informed Learning, GANs",
      githubLink: "https://github.com/",
      linkedinLink: null,
      status: "In Progress"
    },
    {
      title: "Hidden Imbalance: Machine Learning Evidence of Underemployment in Sri Lanka",
      year: "2026",
      venue: "Manuscript in preparation",
      description: "Investigated underemployment trends in Sri Lanka using macroeconomic and labour market indicators.",
      techStack: "Machine Learning, Econometrics, XGBoost, SHAP, ARDL, Python",
      githubLink: "https://github.com/Januda-lelwala/Reaserch_DS",
      linkedinLink: null,
      status: "In Progress"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getTitle = () => {
    switch (currentSlide) {
      case 0: return "Projects";
      case 1: return "Research";
      default: return "Projects";
    }
  };

  const getSubtitle = () => {
    switch (currentSlide) {
      case 0: return "Featured work and personal projects";
      case 1: return "Publications and ongoing research";
      default: return "Featured work and personal projects";
    }
  };

  return (
    <div className="container mx-auto px-6 pt-20 pb-16 relative">
      {/* Slider Controls - Fixed Position */}
      <div className="absolute top-10 right-6 flex items-center space-x-4 text-lg z-10">
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
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4"
            >
              {getTitle()}
            </motion.h1>
            <motion.p
              key={`subtitle-${currentSlide}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl font-light text-gray-300"
            >
              {getSubtitle()}
            </motion.p>
          </div>
        </FadeInSection>

        <AnimatePresence mode="wait">
          {/* Slide 0 - Projects */}
          {currentSlide === 0 && (
            <motion.div
              key="slide-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-8">
                {projects.map((project, index) => (
                  <FadeInSection key={index} delay={index * 0.05}>
                    <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-8 shadow-xl shadow-white/20 transition-all duration-300">
                      {/* Title and Status */}
                      <div className="flex justify-between items-start mb-4 text-2xl font-light mb-6 text-black border-b border-white border-opacity-20 pb-3">
                        <h2 className="text-2xl sm:text-2xl md:text-3xl font-light text-white">
                          {project.title}
                        </h2>
                        <span className="flex items-center gap-2 shrink-0">
                          {project.type && (
                            <span className="px-2 py-0.5 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-light border border-blue-500 text-blue-400 bg-gradient-to-r from-blue-500/20 to-cyan-500/20">
                              {project.type}
                            </span>
                          )}
                          <span className={`px-2 py-0.5 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-light border ${
                            project.status === 'Completed'
                              ? 'border-green-500 text-green-400 bg-gradient-to-r from-green-500/20 to-emerald-500/20'
                              : project.status === 'In Progress'
                              ? 'border-orange-500 text-orange-400 bg-gradient-to-r from-orange-500/20 to-amber-500/20'
                              : 'border-white border-opacity-20 text-white bg-white bg-opacity-10'
                          }`}>
                            {project.status}
                          </span>
                        </span>
                      </div>

                      {/* Problem Statement */}
                      <div className="mb-6">
                        <h3 className="text-sm font-light text-gray-400 mb-2">Problem Statement</h3>
                        <p className="text-gray-200 font-light leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <h3 className="text-sm font-light text-gray-400 mb-3">Key Features</h3>
                        <ul className="space-y-2">
                          {project.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="text-gray-200 font-light flex items-start"
                            >
                              <span className="text-white mr-2">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-6 pb-6 relative">
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
                        <h3 className="text-sm font-light text-gray-400 mb-2">Tech Stack</h3>
                        <p className="text-white font-light">
                          {project.techStack}
                        </p>
                      </div>

                      {/* Links */}
                      <div className="flex flex-wrap gap-4">
                        {project.liveLink ? (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-white font-light hover:text-gray-300 transition-colors"
                          >
                            <ExternalLink size={18} />
                            <span>Live Demo</span>
                          </a>
                        ) : (
                          <span className="flex items-center space-x-2 text-gray-400 font-light">
                            <VideoOff size={18} />
                            <span>Demo not available</span>
                          </span>
                        )}

                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-white font-light hover:text-gray-300 transition-colors"
                          >
                            <Github size={18} />
                            <span>Github</span>
                          </a>
                        )}

                        {project.linkedinLink && (
                          <a
                            href={project.linkedinLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-white font-light hover:text-blue-400 transition-colors"
                          >
                            <Linkedin size={18} />
                            <span>LinkedIn Post</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </motion.div>
          )}

          {/* Slide 1 - Research */}
          {currentSlide === 1 && (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-8">
                {research.map((item, index) => (
                  <FadeInSection key={index} delay={index * 0.05}>
                    <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-8 shadow-xl shadow-white/20 transition-all duration-300">
                      {/* Title and Status */}
                      <div className="flex justify-between items-start mb-4 text-2xl font-light mb-6 text-black border-b border-white border-opacity-20 pb-3">
                        <h2 className="text-2xl sm:text-2xl md:text-3xl font-light text-white">
                          {item.title}
                        </h2>
                        <span className="flex items-center gap-2 shrink-0">
                          {item.year && (
                            <span className="text-gray-400 text-xs sm:text-sm font-light">
                              {item.year}
                            </span>
                          )}
                          <span className={`px-2 py-0.5 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-light border ${
                            item.status === 'Published'
                              ? 'border-blue-500 text-blue-400 bg-gradient-to-r from-blue-500/20 to-cyan-500/20'
                              : item.status === 'Completed'
                              ? 'border-green-500 text-green-400 bg-gradient-to-r from-green-500/20 to-emerald-500/20'
                              : item.status === 'In Progress'
                              ? 'border-orange-500 text-orange-400 bg-gradient-to-r from-orange-500/20 to-amber-500/20'
                              : 'border-white border-opacity-20 text-white bg-white bg-opacity-10'
                          }`}>
                            {item.status}
                          </span>
                        </span>
                      </div>

                      {/* Venue */}
                      <p className="text-gray-400 italic font-light mb-4">
                        {item.venue}
                      </p>

                      {/* Description */}
                      <div className="mb-6">
                        <h3 className="text-sm font-light text-gray-400 mb-2">Details</h3>
                        <p className="text-gray-200 font-light leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-6 pb-6 relative">
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
                        <h3 className="text-sm font-light text-gray-400 mb-2">Tech Stack</h3>
                        <p className="text-white font-light">
                          {item.techStack}
                        </p>
                      </div>

                      {/* Links */}
                      <div className="flex flex-wrap gap-4">
                        {item.githubLink && (
                          <a
                            href={item.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-white font-light hover:text-gray-300 transition-colors"
                          >
                            <Github size={18} />
                            <span>Github</span>
                          </a>
                        )}

                        {item.linkedinLink && (
                          <a
                            href={item.linkedinLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-white font-light hover:text-blue-400 transition-colors"
                          >
                            <Linkedin size={18} />
                            <span>LinkedIn Post</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
