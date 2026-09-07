'use client';

import { useState } from 'react';
import { MessageCircle, Send, Linkedin, Github, Calendar } from 'lucide-react';
import Link from 'next/link';
import FadeInSection from '@/components/FadeInSection';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Google Form submission URL
      const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSclOOd11nEkWkdpe9udp3G5P5xFyVJJc9DaSAMQTYgAuB3FlA/formResponse';
      
      // Prepare form data with Google Form entry IDs
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('entry.1189228940', formData.name);
      formDataToSubmit.append('entry.536347871', formData.email);
      formDataToSubmit.append('entry.512101171', formData.subject);
      formDataToSubmit.append('entry.108720042', formData.message);

      // Submit to Google Form
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formDataToSubmit,
        mode: 'no-cors'
      });
      
      // Show success message
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-6 pt-10 pb-16">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4">Contact</h1>
          <p className="text-base sm:text-lg md:text-xl font-light text-gray-300 mb-12">
            Get in touch with me
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <FadeInSection delay={0.1}>
            <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-8 shadow-xl shadow-white/20 transition-all duration-300">
            <h2 className="text-lg sm:text-xl md:text-2xl font-light mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-light text-gray-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  placeholder='eg : Sandami Upeksha'
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-white/50 transition-all font-light text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-light text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  placeholder='eg : sandamiupeksha@gmail.com'
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-white/50 transition-all font-light text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-light text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  placeholder='eg : Greeting'
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-white/50 transition-all font-light text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-light text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  placeholder='eg : Hey, nice job!'
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-white/50 transition-all font-light resize-none text-white placeholder-gray-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-3 border border-white rounded-full transition-all duration-300 font-light flex items-center justify-center gap-2 ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-white hover:text-black'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-center font-light">
                  ✓ Message sent successfully! Thank you for reaching out.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-center font-light">
                  Something went wrong. Please try again or email directly at desilvabkp@gmail.com
                </div>
              )}
            </form>
          </div>
        </FadeInSection>

          {/* Contact Information */}
          <div className="space-y-8">
            <FadeInSection delay={0.2}>
              <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-8 shadow-xl shadow-white/20 transition-all duration-300">
              <h2 className="text-lg sm:text-xl md:text-2xl font-light mb-6">Contact Information</h2>
              <div className="space-y-4 font-light">
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Email</h3>
                  <p className="text-white">praveend.23@cse.mrt.ac.lk</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Phone</h3>
                  <p className="text-white">+94 70 2241 222</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-1">Location</h3>
                  <p className="text-white">15/4 B, Sudharmarama Mawatha, Bowala, Kandy.</p>
                </div>
              </div>
            </div>
          </FadeInSection>

            <FadeInSection delay={0.3}>
              <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-8 shadow-xl shadow-white/20 transition-all duration-300">
              <h2 className="text-lg sm:text-xl md:text-2xl font-light mb-6">Social Media</h2>
              <div className="flex items-center justify-center gap-6">
                <motion.a
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://wa.me/94702241222"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                  title="WhatsApp"
                >
                  <MessageCircle size={28} className="text-white" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                  title="Telegram"
                >
                  <Send size={28} className="text-white" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.linkedin.com/in/praveen-de-silva-854a732a2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                  title="LinkedIn"
                >
                  <Linkedin size={28} className="text-white" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com/bkpdesilva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                  title="GitHub"
                >
                  <Github size={28} className="text-white" />
                </motion.a>
              </div>

              <div className="mt-8 pt-6 border-t border-white border-opacity-20 flex justify-center">
                <Link href="/calendar">
                  <button className="px-8 py-3 border border-white rounded-full transition-all duration-300 font-light flex items-center gap-2 hover:bg-white hover:text-black">
                    <Calendar size={18} />
                    See Calendar
                  </button>
                </Link>
              </div>
            </div>
          </FadeInSection>
          </div>
        </div>
      </div>
    </div>
  );
}
