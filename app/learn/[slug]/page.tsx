import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { ArrowLeft } from 'lucide-react';
import { getAllNotes, getNote } from '@/lib/learn';
import FadeInSection from '@/components/FadeInSection';

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: `${note.title} | Praveen De Silva`,
    description: note.description,
  };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  return (
    <div className="container mx-auto px-6 pt-20 pb-16">
      <div className="max-w-3xl mx-auto">
        <FadeInSection>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-8 font-light"
          >
            <ArrowLeft size={18} />
            Back to Learn
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light mb-2">{note.title}</h1>
          {note.description && (
            <p className="text-base sm:text-lg font-light text-gray-300 mb-2">{note.description}</p>
          )}
          <div className="flex items-center gap-3 text-sm text-gray-400 font-light mb-10">
            {note.date && <span>{note.date}</span>}
            {note.tags?.length > 0 && <span>{note.tags.join(' · ')}</span>}
          </div>
        </FadeInSection>

        <FadeInSection delay={0.1}>
          <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-lg p-8 shadow-xl shadow-white/20">
            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {note.content}
              </ReactMarkdown>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
