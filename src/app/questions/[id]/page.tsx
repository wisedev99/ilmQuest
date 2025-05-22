
import { AppLayout } from "@/components/layout/app-layout";
import { getQuestionById, getUserById, mockUsers } from "@/lib/mock-data"; // Assuming mockUsers is exported for Ulama check
import type { Question } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AnswerCard } from "@/components/qa/answer-card";
import { AnswerForm } from "@/components/qa/answer-form";
import { Separator } from "@/components/ui/separator";
import { format } from 'date-fns';
import Link from "next/link";
import { MessageSquare, UserCircle } from "lucide-react";
import { UserType } from "@/lib/constants"; // Import UserType

interface QuestionPageParams {
  id: string;
}

// This component would ideally be a server component fetching data.
// For now, using mock data.
export default function QuestionPage({ params }: { params: QuestionPageParams }) {
  const question: Question | undefined = getQuestionById(params.id);

  // Mock current user - in a real app, this would come from auth context
  const currentUser = mockUsers.find(u => u.id === 'user2'); // Assuming Sheikh Omar (Ulama) is logged in

  if (!question) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold">Question not found</h1>
          <p className="text-muted-foreground mt-2">The question you are looking for does not exist or has been removed.</p>
          <Link href="/questions" className="mt-4 inline-block text-primary hover:underline">
            Back to all questions
          </Link>
        </div>
      </AppLayout>
    );
  }

  const canAnswer = currentUser && currentUser.userType === UserType.Ulama;

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">{question.title}</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground pt-2">
              <Link href={`/profile/${question.author.id}`} className="flex items-center hover:underline">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={question.author.avatarUrl} alt={question.author.name} data-ai-hint="person" />
                  <AvatarFallback>
                    {question.author.avatarUrl ? question.author.name.charAt(0).toUpperCase() : <UserCircle size={20}/>}
                  </AvatarFallback>
                </Avatar>
                <span>{question.author.name}</span>
              </Link>
              <span>&bull;</span>
              <span>Asked on {format(new Date(question.createdAt), 'MMM d, yyyy')}</span>
            </div>
            {question.tags && question.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {question.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">{question.content}</p>
          </CardContent>
        </Card>

        <Separator className="my-8" />

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
            {question.answers.length} {question.answers.length === 1 ? "Answer" : "Answers"}
          </h2>
          {question.answers.length > 0 ? (
            question.answers.map((answer) => (
              <AnswerCard key={answer.id} answer={answer} />
            ))
          ) : (
            <p className="text-muted-foreground">No answers yet. Be the first to provide one if you are an Ulama!</p>
          )}
        </div>

        {canAnswer && (
          <>
            <Separator className="my-8" />
            <AnswerForm questionId={question.id} />
          </>
        )}
      </div>
    </AppLayout>
  );
}
