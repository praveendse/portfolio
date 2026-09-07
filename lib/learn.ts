import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const NOTES_DIR = path.join(process.cwd(), 'content', 'learn');

export interface SubjectMeta {
  slug: string;
  title: string;
  description: string;
  noteCount: number;
}

export interface NoteMeta {
  subject: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export interface Note extends NoteMeta {
  content: string;
}

function titleFromSlug(slug: string): string {
  const words = slug.split(/[-_]/).filter(Boolean);
  if (words.length === 1 && words[0].length <= 4) return words[0].toUpperCase();
  return words.map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
}

function readSubjectMeta(subjectSlug: string): { title: string; description: string } {
  const metaPath = path.join(NOTES_DIR, subjectSlug, '_meta.json');
  if (fs.existsSync(metaPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      return {
        title: data.title ?? titleFromSlug(subjectSlug),
        description: data.description ?? '',
      };
    } catch {
      // fall through to default
    }
  }
  return { title: titleFromSlug(subjectSlug), description: '' };
}

function readNoteFile(subjectSlug: string, filename: string): Note {
  const slug = filename.replace(/\.md$/, '');
  const filePath = path.join(NOTES_DIR, subjectSlug, filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  return {
    subject: subjectSlug,
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    date: data.date ?? '',
    tags: data.tags ?? [],
    content,
  };
}

function listSubjectSlugs(): string[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export function getAllSubjects(): SubjectMeta[] {
  return listSubjectSlugs()
    .map((slug) => {
      const meta = readSubjectMeta(slug);
      const noteCount = getNotesForSubject(slug).length;
      return { slug, noteCount, ...meta };
    })
    .filter((subject) => subject.noteCount > 0)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getSubject(subjectSlug: string): SubjectMeta | null {
  const dir = path.join(NOTES_DIR, subjectSlug);
  if (!fs.existsSync(dir)) return null;
  const meta = readSubjectMeta(subjectSlug);
  return { slug: subjectSlug, noteCount: getNotesForSubject(subjectSlug).length, ...meta };
}

export function getNotesForSubject(subjectSlug: string): NoteMeta[] {
  const dir = path.join(NOTES_DIR, subjectSlug);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const { content: _content, ...meta } = readNoteFile(subjectSlug, file);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNote(subjectSlug: string, noteSlug: string): Note | null {
  const filePath = path.join(NOTES_DIR, subjectSlug, `${noteSlug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return readNoteFile(subjectSlug, `${noteSlug}.md`);
}
