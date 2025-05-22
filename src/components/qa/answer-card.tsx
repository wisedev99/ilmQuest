
import type { Answer } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, UserCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ResourceLink } from '@/components/shared/resource-link';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface AnswerCardProps {
  answer: Answer;
}

export function AnswerCard({ answer }: AnswerCardProps) {
  const timeAgo = formatDistanceToNow(new Date(answer.createdAt), { addSuffix: true });

  return (
    <Card className="mb-6 shadow-sm bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href={`/profile/${answer.author.id}`}>
              <Avatar className="h-10 w-10">
                <AvatarImage src={answer.author.avatarUrl} alt={answer.author.name} data-ai-hint="person scholar" />
                <AvatarFallback>
                  {answer.author.avatarUrl ? answer.author.name.charAt(0).toUpperCase() : <UserCircle size={24}/>}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link href={`/profile/${answer.author.id}`} className="font-semibold text-foreground hover:underline">
                {answer.author.name}
              </Link>
              <div className="text-xs text-muted-foreground">
                <span>Answered {timeAgo}</span>
                {answer.author.userType === "Ulama" && (
                  <Badge variant="outline" className="ml-2 border-primary text-primary">Ulama</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">{answer.content}</p>
        {answer.resources && answer.resources.length > 0 && (
          <div className="mt-4 space-y-2 pt-3 border-t">
            <h4 className="text-sm font-semibold text-muted-foreground">Supporting Resources:</h4>
            {answer.resources.map((resource) => (
              <ResourceLink key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2 pt-3">
        {/* Placeholder for voting actions */}
        <Button variant="ghost" size="sm" aria-label="Upvote">
          <ThumbsUp className="h-4 w-4 mr-1" /> {answer.upvotes}
        </Button>
        <Button variant="ghost" size="sm" aria-label="Downvote">
          <ThumbsDown className="h-4 w-4 mr-1" /> {answer.downvotes}
        </Button>
      </CardFooter>
    </Card>
  );
}
