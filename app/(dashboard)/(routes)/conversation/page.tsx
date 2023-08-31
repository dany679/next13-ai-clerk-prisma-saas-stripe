"use client";

import { Heading } from "@/components/Heading";
import BotAvatar from "@/components/bot-avatar";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/user-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";
import { toolsObjects } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CreateChatCompletionRequestMessage } from "openai/resources/chat/index.mjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
import { formSchema } from "./constants";
const ConversationPage = () => {
  const router = useRouter();
  const proModal = useProModal();

  const [messages, setMessages] = useState<
    CreateChatCompletionRequestMessage[]
  >([]);
  const page = toolsObjects.conversation;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      prompt: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmitting = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: CreateChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading.root>
        <Heading.icon
          Icon={page.icon}
          iconColor={page.color}
          bgColor={page.bgColor}
        />
        <Heading.title
          title={page.label}
          description="Our most advanced conversation model."
        />
      </Heading.root>
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitting)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              control={form.control}
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      required
                      {...field}
                      className="border-0 outline-none focus-visible:ring-0  focus-visible:ring-transparent 

                  "
                      disabled={isSubmitting}
                      placeholder="how do i calculate the radius of a circle?"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="col-span-12 lg:col-span-2 w-full"
              disabled={isSubmitting}
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4 px-4 lg:px-8 ">
        {isSubmitting && (
          <>
            <div className="p-8 rounded-lg w-full flex item-center justify-center bg-muted">
              <Loader />
            </div>
          </>
        )}
        {messages.length === 0 && !isSubmitting && (
          <Empty label={"No conversation started"} />
        )}
        <div className="flex flex-col-reverse gap-y-4 ">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "p-8 w-full items-start gap-x-8 rounded-lg",
                message.role === "user"
                  ? "bg-white border border-black/10"
                  : "bg-muted"
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <p className="text-sm"> {message.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
