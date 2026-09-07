import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const NOTES_DIR = path.join(process.cwd(), 'content', 'learn');

export interface NoteMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export interface Note extends NoteMeta {
  content: string;
}

function readNoteFile(filename: string): Note {
  const slug = filename.replace(/\.md$/, '');
  const filePath = path.join(NOTES_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    date: data.date ?? '',
    tags: data.tags ?? [],
    content,
  };
}

export function getAllNotes(): NoteMeta[] {
  if (!fs.existsSync(NOTES_DIR)) return [];

  return fs
    .readdirSync(NOTES_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const { content: _content, ...meta } = readNoteFile(file);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNote(slug: string): Note | null {
  const filePath = path.join(NOTES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return readNoteFile(`${slug}.md`);
}
