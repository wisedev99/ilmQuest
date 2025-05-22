
import type { Resource } from '@/types';
import { Youtube, BookOpen, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

interface ResourceLinkProps {
  resource: Resource;
}

export function ResourceLink({ resource }: ResourceLinkProps) {
  const Icon = resource.type === 'youtube' ? Youtube : resource.type === 'book' ? BookOpen : LinkIcon;
  
  return (
    <Link
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 p-2 rounded-md hover:bg-accent/10 transition-colors border border-transparent hover:border-accent/30"
    >
      <Icon className="h-5 w-5 text-primary" />
      <span className="text-sm text-foreground hover:underline">{resource.title}</span>
    </Link>
  );
}
