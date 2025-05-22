
import { AppLayout } from "@/components/layout/app-layout";
import { UserProfileCard } from "@/components/profile/user-profile-card";
import { QuestionCard } from "@/components/qa/question-card";
import { getUserById, mockUsers } from "@/lib/mock-data";
import type { User } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { HelpCircle, MessageSquare } from "lucide-react";
import Link from "next/link";

interface UserProfilePageParams {
  userId: string;
}

export default function UserProfilePage({ params }: { params: UserProfilePageParams }) {
  const user: User | undefined = getUserById(params.userId);

  // Mock current user for "isCurrentUserProfile" check
  const currentUserId = mockUsers[0].id; // Assuming 'user1' is the logged-in user

  if (!user) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold">User not found</h1>
          <p className="text-muted-foreground mt-2">The profile you are looking for does not exist.</p>
           <Link href="/dashboard" className="mt-4 inline-block text-primary hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto py-8 px-2 sm:px-4">
        <UserProfileCard user={user} isCurrentUserProfile={user.id === currentUserId} />

        <Tabs defaultValue="questions" className="mt-8">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 md:mx-auto">
            <TabsTrigger value="questions">
              <HelpCircle className="mr-2 h-4 w-4" /> Questions ({user.questionsAsked?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="answers">
              <MessageSquare className="mr-2 h-4 w-4" /> Answers ({user.answersProvided?.length || 0})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="questions" className="mt-6">
            {user.questionsAsked && user.questionsAsked.length > 0 ? (
              <div className="grid gap-6">
                {user.questionsAsked.map((question) => (
                  <QuestionCard key={question.id} question={question} />
                ))}
              </div>
            ) : (
              <Alert>
                <HelpCircle className="h-4 w-4" />
                <AlertTitle>No Questions Yet</AlertTitle>
                <AlertDescription>
                  {user.name} has not asked any questions.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
          
          <TabsContent value="answers" className="mt-6">
            {user.answersProvided && user.answersProvided.length > 0 ? (
              <div className="space-y-6">
                {user.answersProvided.map((answer) => {
                  // Find the question this answer belongs to for context
                  const relatedQuestion = user.questionsAsked?.find(q => q.id === answer.questionId) || 
                                          mockUsers.flatMap(u => u.questionsAsked).find(q => q.id === answer.questionId); // Fallback search in all questions
                  return (
                    <Card key={answer.id}>
                      <CardHeader>
                        {relatedQuestion && (
                           <Link href={`/questions/${relatedQuestion.id}`} className="hover:underline">
                            <CardDescription className="text-sm">Answered on: <span className="font-medium text-primary">{relatedQuestion.title}</span></CardDescription>
                           </Link>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground/80 line-clamp-3">{answer.content}</p>
                      </CardContent>
                      <CardFooter>
                        <Link href={`/questions/${answer.questionId}#answer-${answer.id}`} className="text-sm text-primary hover:underline">
                          View full answer &rarr;
                        </Link>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Alert>
                <MessageSquare className="h-4 w-4" />
                <AlertTitle>No Answers Yet</AlertTitle>
                <AlertDescription>
                  {user.name} has not provided any answers.
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

