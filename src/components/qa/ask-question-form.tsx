
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const askQuestionFormSchema = z.object({
  title: z.string().min(10, { message: "Title must be at least 10 characters." }).max(150, { message: "Title must not exceed 150 characters." }),
  content: z.string().min(20, { message: "Question details must be at least 20 characters." }).max(5000, { message: "Question details must not exceed 5000 characters." }),
  tags: z.string().optional().transform(val => val ? val.split(',').map(tag => tag.trim()).filter(tag => tag) : []),
});

type AskQuestionFormValues = z.infer<typeof askQuestionFormSchema>;

export function AskQuestionForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<AskQuestionFormValues>({
    resolver: zodResolver(askQuestionFormSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  async function onSubmit(data: AskQuestionFormValues) {
    console.log("Question data:", data);
    toast({
      title: "Question Submitted",
      description: "Your question is being processed...",
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Question Posted Successfully!",
      description: "You will be notified when an answer is provided.",
    });
    // In a real app, redirect to the newly created question page
    // router.push(`/questions/${newQuestionId}`);
    router.push("/questions"); 
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Ask a New Question</CardTitle>
        <CardDescription>Share your query with the community and Ulama.</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Guidelines for Asking</AlertTitle>
          <AlertDescription>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Be clear and specific in your question.</li>
              <li>Provide necessary context or background.</li>
              <li>Maintain respectful language.</li>
              <li>Check if a similar question has already been asked.</li>
            </ul>
          </AlertDescription>
        </Alert>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., What is the ruling on fasting while traveling?" {...field} />
                  </FormControl>
                  <FormDescription>
                    A concise summary of your question.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Question</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain your question in detail. Provide any relevant background information..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Elaborate on your query to help others understand and answer effectively.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., fiqh, salah, ramadan" {...field} onChange={e => field.onChange(e.target.value)} value={Array.isArray(field.value) ? field.value.join(', ') : ''} />
                  </FormControl>
                  <FormDescription>
                    Comma-separated tags to categorize your question.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit">
                Post Question
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
