
import Link from 'next/link';
import type { Question } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, ThumbsUp, UserCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const timeAgo = formatDistanceToNow(new Date(question.createdAt), { addSuffix: true });
  const answerCount = question.answers?.length || 0;
  
  // Calculate total upvotes for the question from its answers
  const totalUpvotes = question.answers?.reduce((sum, ans) => sum + (ans.upvotes || 0), 0) || 0;

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <Link href={`/questions/${question.id}`} className="hover:underline">
          <CardTitle className="text-lg md:text-xl">{question.title}</CardTitle>
        </Link>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground pt-1">
          <Link href={`/profile/${question.author.id}`} className="flex items-center hover:underline">
            <Avatar className="h-6 w-6 mr-1.5">
              <AvatarImage src={question.author.avatarUrl} alt={question.author.name} data-ai-hint="person" />
              <AvatarFallback>
                {question.author.avatarUrl ? question.author.name.charAt(0).toUpperCase() : <UserCircle size={16}/>}
              </AvatarFallback>
            </Avatar>
            <span>{question.author.name}</span>
          </Link>
          <span>&bull;</span>
          <span>{timeAgo}</span>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3">
          {question.content}
        </CardDescription>
        {question.tags && question.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {question.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          <span>{answerCount} {answerCount === 1 ? 'Answer' : 'Answers'}</span>
        </div>
        <div className="flex items-center gap-1">
          <ThumbsUp className="h-4 w-4" />
          <span>{totalUpvotes} Upvotes</span>
        </div>
      </CardFooter>
    </Card>
  );
}
