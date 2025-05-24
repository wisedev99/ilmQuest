
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/contexts/i18n-provider";
import { Send } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(2000, {message: "Message must not exceed 2000 characters."}),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const { t, isLoaded } = useI18n();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    // In a real app, you would send this data to a backend or Genkit flow
    console.log("Contact form data:", data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: t('aboutPage.formSuccessTitle'),
      description: t('aboutPage.formSuccessDescription'),
    });
    form.reset(); 
  }

  if (!isLoaded) {
    return <p>Loading form...</p>; // Or a skeleton loader
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('aboutPage.formNameLabel')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('aboutPage.formNamePlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('aboutPage.formEmailLabel')}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={t('aboutPage.formEmailPlaceholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('aboutPage.formSubjectLabel')}</FormLabel>
              <FormControl>
                <Input placeholder={t('aboutPage.formSubjectPlaceholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('aboutPage.formMessageLabel')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('aboutPage.formMessagePlaceholder')}
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" className="min-w-[150px]">
            <Send className="mr-2 h-4 w-4" /> {t('aboutPage.formSendButton')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
