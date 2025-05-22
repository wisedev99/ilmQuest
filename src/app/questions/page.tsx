
import { AppLayout } from "@/components/layout/app-layout";
import { QuestionCard } from "@/components/qa/question-card";
import { mockQuestions } from "@/lib/mock-data";
import type { Question } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { ListFilter, MessageSquarePlus, Search } from "lucide-react";

// In a real app, questions would be fetched and filtered server-side or client-side with pagination
const questions: Question[] = mockQuestions;

export default function QuestionsPage() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight">Browse Questions</h1>
          <Button asChild className="w-full sm:w-auto">
            <Link href="/questions/ask">
              <MessageSquarePlus className="mr-2 h-4 w-4" /> Ask a New Question
            </Link>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg bg-card">
          <div className="relative flex-1 w-full sm:max-w-sm">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search questions by keyword or tag..." className="pl-8 w-full" />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Select defaultValue="recent">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="unanswered">Unanswered</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full sm:w-auto">
              <ListFilter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        {questions.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-1"> {/* Single column for better readability */}
            {questions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No questions found.</p>
            <p className="mt-2">Be the first to ask a question!</p>
          </div>
        )}

        {/* Placeholder for Pagination */}
        {questions.length > 10 && (
           <div className="flex justify-center mt-8">
            <Button variant="outline" className="mr-2">Previous</Button>
            <Button variant="outline">Next</Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
