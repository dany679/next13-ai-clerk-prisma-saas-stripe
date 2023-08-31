"use client";

import { Heading } from "@/components/Heading";
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
import { toolsObjects } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
import { formSchema } from "./constants";
const MusicPage = () => {
  const router = useRouter();
  const proModal = useProModal();

  const [music, setMusic] = useState<string | null>(
    "/replicate-prediction-jvlsnvme3jbhvdyoz62barakza-0.wav"
  );
  const page = toolsObjects.music;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      prompt: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmitting = async (values: z.infer<typeof formSchema>) => {
    // return;
    try {
      setMusic(null);

      const response = await axios.post("/api/music", values);
      console.log(response.data.audio);

      setMusic(response.data.audio);

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
          description="My apologies, unfortunately replicate update the price, this page will not long generate new songs"
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
                      disabled={true}
                      placeholder="Piano solo"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className=" col-span-12 lg:col-span-2 w-full"
              disabled={true}
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
        <p className="text-sm text-muted-foreground ">
          song generate by replicate so you can check.
        </p>
        <p className="text-sm text-muted-foreground ">
          prompt: game music intro 5 seconds.
        </p>

        {!music && !isSubmitting && <Empty label={"No music generated."} />}
        <div className="flex flex-col-reverse gap-y-4 ">
          {music && (
            <audio controls className=" rounded-full w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
