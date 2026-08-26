'use client';

import { Github, Linkedin } from 'lucide-react';
import FadeInSection from '@/components/FadeInSection';

export default function Research() {
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
      githubLink: null,
      linkedinLink: null,
      status: "In Progress"
    },
    {
      title: "Hidden Imbalance: Machine Learning Evidence of Underemployment in Sri Lanka",
      year: "2026",
      venue: "Manuscript in preparation",
      description: "Investigated underemployment trends in Sri Lanka using macroeconomic and labour market indicators.",
      techStack: "Machine Learning, Econometrics, XGBoost, SHAP, ARDL, Python",
      githubLink: null,
      linkedinLink: null,
      status: "In Progress"
    }
  ];

  return (
    <div className="container mx-auto px-6 pt-20 pb-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4">Research</h1>
        <p className="text-base sm:text-lg md:text-xl font-light text-gray-300 mb-12">
          Publications and ongoing research
        </p>

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
      </div>
    </div>
  );
}
