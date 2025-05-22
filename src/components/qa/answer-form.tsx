
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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2 } from "lucide-react";
import type { Resource } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const answerFormSchema = z.object({
  content: z.string().min(20, { message: "Answer must be at least 20 characters." }).max(10000, { message: "Answer must not exceed 10000 characters." }),
  resources: z.array(z.object({
    type: z.enum(["youtube", "book", "link"]),
    title: z.string().min(3, { message: "Resource title must be at least 3 characters."}),
    url: z.string().url({ message: "Please enter a valid URL."}),
  })).optional(),
});

type AnswerFormValues = z.infer<typeof answerFormSchema>;

interface AnswerFormProps {
  questionId: string;
}

export function AnswerForm({ questionId }: AnswerFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<AnswerFormValues>({
    resolver: zodResolver(answerFormSchema),
    defaultValues: {
      content: "",
      resources: [],
    },
  });

  const { fields, append, remove } = useForm<any>({ // Using 'any' for react-hook-form's useFieldArray with nested structure
    control: form.control,
    name: "resources"
  }).fields;


  async function onSubmit(data: AnswerFormValues) {
    console.log("Answer data:", data, "for questionId:", questionId);
    toast({
      title: "Answer Submitted",
      description: "Your answer is being processed...",
    });

    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Answer Posted Successfully!",
      description: "Thank you for sharing your knowledge.",
    });
    form.reset();
    // In a real app, you might want to refresh the question page or optimistically update UI
    router.refresh(); 
  }

  return (
    <Card className="w-full shadow-lg mt-8">
      <CardHeader>
        <CardTitle className="text-xl">Provide an Answer</CardTitle>
        <CardDescription>Share your knowledge and help the question asker.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Answer</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a comprehensive and clear answer..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>Supporting Resources (Optional)</FormLabel>
              {fields.map((field, index) => (
                <div key={(field as any).id} className="mt-2 p-3 border rounded-md space-y-3">
                  <FormField
                    control={form.control}
                    name={`resources.${index}.type` as any}
                    render={({ field: nestedField }) => (
                      <FormItem>
                        <FormLabel>Resource Type</FormLabel>
                        <Select onValueChange={nestedField.onChange} defaultValue={nestedField.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select resource type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="youtube">YouTube Video</SelectItem>
                            <SelectItem value="book">Book/Article</SelectItem>
                            <SelectItem value="link">Other Link</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`resources.${index}.title` as any}
                    render={({ field: nestedField }) => (
                      <FormItem>
                        <FormLabel>Resource Title</FormLabel>
                        <FormControl><Input placeholder="e.g., Sahih Al-Bukhari Chapter on Faith" {...nestedField} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`resources.${index}.url` as any}
                    render={({ field: nestedField }) => (
                       <FormItem>
                        <FormLabel>Resource URL</FormLabel>
                        <FormControl><Input type="url" placeholder="https://example.com/resource" {...nestedField} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="button" variant="destructive" size="sm" onClick={() => remove(index)}>
                    <Trash2 className="h-4 w-4 mr-1" /> Remove Resource
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => append({ type: "link", title: "", url: "" })}
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Add Resource
              </Button>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">
                Post Answer
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
