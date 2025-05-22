
import { AppLayout } from "@/components/layout/app-layout";
import { AskQuestionForm } from "@/components/qa/ask-question-form";

export default function AskQuestionPage() {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto py-8">
        <AskQuestionForm />
      </div>
    </AppLayout>
  );
}
