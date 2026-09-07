'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Navigation */}
      <nav className="relative px-6 py-6 flex items-center justify-center">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link 
            href="/" 
            className={`hover:text-white transition-colors ${isActive('/') ? 'border-b border-white pb-1' : ''}`}
          >
            HOME
          </Link>
          <Link 
            href="/skills" 
            className={`hover:text-white transition-colors ${isActive('/skills') ? 'border-b border-white pb-1' : ''}`}
          >
            SKILLS
          </Link>
          <Link
            href="/work"
            className={`hover:text-white transition-colors ${isActive('/work') ? 'border-b border-white pb-1' : ''}`}
          >
            WORK
          </Link>
          <Link
            href="/achievements"
            className={`hover:text-white transition-colors ${isActive('/achievements') ? 'border-b border-white pb-1' : ''}`}
          >
            ACHIEVEMENTS
          </Link>
          <Link
            href="/activities"
            className={`hover:text-white transition-colors ${isActive('/activities') ? 'border-b border-white pb-1' : ''}`}
          >
            ACTIVITIES
          </Link>
          <Link
            href="/learn"
            className={`hover:text-white transition-colors ${isActive('/learn') ? 'border-b border-white pb-1' : ''}`}
          >
            LEARN
          </Link>
          <Link
            href="/contact"
            className={`hover:text-white transition-colors ${isActive('/contact') ? 'border-b border-white pb-1' : ''}`}
          >
            CONTACT
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden absolute right-6 top-1/2 -translate-y-1/2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 backdrop-blur-sm bg-opacity-30 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Sidebar */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: isMenuOpen ? 0 : '100%' }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 right-0 h-full w-64 z-50 bg-gradient-to-br from-[#415a77]/70 via-[#000000] to-[#000000] border-l border-white/10 md:hidden"
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end p-6">
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={28} className="hover:text-white transition-colors" />
            </button>
          </div>
          
          {/* Menu Links */}
          <div className="flex flex-col space-y-6 px-8 pt-8">
            {['/', '/skills', '/work', '/achievements', '/activities', '/learn', '/contact'].map((path, index) => {
              const labels = ['HOME', 'SKILLS', 'WORK', 'ACHIEVEMENTS', 'ACTIVITIES', 'LEARN', 'CONTACT'];
              return (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link 
                    href={path} 
                    className={`text-xl hover:text-white transition-colors pb-2 block ${isActive(path) ? 'border-b border-white' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {labels[index]}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 border border-[#415a77] bg-[#415a77]/30 backdrop-blur-md rounded-full hover:bg-[#415a77]/50 hover:border-[#415a77] transition-all duration-300 shadow-lg shadow-[#415a77]/30 group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      )}
    </>
  );
}
