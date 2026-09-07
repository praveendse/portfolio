import Link from 'next/link';
import { getAllSubjects } from '@/lib/learn';
import FadeInSection from '@/components/FadeInSection';

export const metadata = {
  title: 'Learn | Praveen De Silva',
  description: 'Study notes and things I\'m learning',
};

export default function LearnPage() {
  const subjects = getAllSubjects();

  return (
    <div className="container mx-auto px-6 pt-10 pb-16">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4">Learn</h1>
          <p className="text-base sm:text-lg md:text-xl font-light text-gray-300 mb-12">
            Study notes and things I&apos;m learning
          </p>
        </FadeInSection>

        {subjects.length === 0 ? (
          <FadeInSection>
            <p className="text-gray-400 font-light">
              No subjects yet. Add a folder under content/learn (e.g. content/learn/cs) with a markdown note inside.
            </p>
          </FadeInSection>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjects.map((subject, index) => (
              <FadeInSection key={subject.slug} delay={index * 0.05}>
                <Link href={`/learn/${subject.slug}`}>
                  <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-8 shadow-xl shadow-white/20 transition-all duration-300 hover:shadow-white/40 h-full">
                    <h2 className="text-xl sm:text-2xl font-light text-white mb-2">{subject.title}</h2>
                    {subject.description && (
                      <p className="text-gray-300 font-light mb-4">{subject.description}</p>
                    )}
                    <span className="text-sm text-gray-400 font-light">
                      {subject.noteCount} {subject.noteCount === 1 ? 'note' : 'notes'}
                    </span>
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
