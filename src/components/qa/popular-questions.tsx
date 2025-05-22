
import type { Question } from '@/types';
import { QuestionCard } from './question-card';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface PopularQuestionsProps {
  questions: Question[];
}

export function PopularQuestions({ questions }: PopularQuestionsProps) {
  if (!questions || questions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            Popular Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No popular questions available at the moment.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section aria-labelledby="popular-questions-title">
      <div className="flex items-center justify-between mb-6">
        <h2 id="popular-questions-title" className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <Sparkles className="h-7 w-7 text-primary" />
          Popular Questions
        </h2>
        <Button variant="outline" asChild>
          <Link href="/questions">View All Questions</Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </section>
  );
}
