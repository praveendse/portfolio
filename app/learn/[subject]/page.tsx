import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getAllSubjects, getNotesForSubject, getSubject } from '@/lib/learn';
import FadeInSection from '@/components/FadeInSection';

export function generateStaticParams() {
  return getAllSubjects().map((subject) => ({ subject: subject.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: subjectSlug } = await params;
  const subject = getSubject(subjectSlug);
  if (!subject) return {};
  return {
    title: `${subject.title} | Learn | Praveen De Silva`,
    description: subject.description,
  };
}

export default async function SubjectPage({ params }: { params: Promise<{ subject: string }> }) {
  const { subject: subjectSlug } = await params;
  const subject = getSubject(subjectSlug);
  if (!subject) notFound();

  const notes = getNotesForSubject(subjectSlug);

  return (
    <div className="container mx-auto px-6 pt-10 pb-16">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8 font-light"
          >
            <ArrowLeft size={18} />
            Back to Learn
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4">{subject.title}</h1>
          {subject.description && (
            <p className="text-base sm:text-lg md:text-xl font-light text-gray-300 mb-12">{subject.description}</p>
          )}
        </FadeInSection>

        {notes.length === 0 ? (
          <FadeInSection>
            <p className="text-gray-400 font-light">No notes yet in this subject.</p>
          </FadeInSection>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notes.map((note, index) => (
              <FadeInSection key={note.slug} delay={index * 0.05}>
                <Link href={`/learn/${subjectSlug}/${note.slug}`}>
                  <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-8 shadow-xl shadow-white/20 transition-all duration-300 hover:shadow-white/40 h-full">
                    <h2 className="text-xl sm:text-2xl font-light text-white mb-2">{note.title}</h2>
                    {note.description && (
                      <p className="text-gray-300 font-light mb-4">{note.description}</p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-400 font-light">
                      {note.date && <span>{note.date}</span>}
                      {note.tags?.length > 0 && <span>{note.tags.join(' · ')}</span>}
                    </div>
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
