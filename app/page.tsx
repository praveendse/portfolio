'use client';

import FadeInSection from '@/components/FadeInSection';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-16 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 md:gap-12 items-start">
            {/* Left - Image, Header Content and Contact */}
            <FadeInSection delay={0.2}>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <Image
                  src="/images/profile-05.png"
                  alt="Praveen De Silva"
                  width={288}
                  height={288}
                  priority
                  className="w-64 h-64 sm:w-72 sm:h-72 rounded-full object-cover border-2 border-white shadow-2xl mb-8"
                />
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-2">
                  Praveen De Silva
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg font-light text-pink-200 mb-8">
                  Bsc Eng (hons) - University of Moratuwa (UG)
                </p>

                <Link href="/contact">
                  <button className="px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 font-light">
                    Contact Me
                  </button>
                </Link>
              </div>
            </FadeInSection>

            {/* Right - About Me */}
            <FadeInSection delay={0.4}>
              <div className="relative h-[32rem] flex items-center justify-center">
                <div className="bg-opacity-5 rounded-lg p-8 border-opacity-20 w-full h-full flex flex-col justify-center">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-6">About Me</h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-200 font-light leading-relaxed mb-4 text-justify">
                   Computer Science and Engineering undergraduate at the University of Moratuwa specializing in Data Science and Engineering, with experience in Python, SQL, machine learning, and data analytics.
                  </p>              
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </div>
  );
}
