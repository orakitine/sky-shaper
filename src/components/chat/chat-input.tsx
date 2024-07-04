"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useEnterSubmit } from "@/lib/use-enter-submit";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUp } from "lucide-react";

type ChatInputProps = {
  onSubmit: (message: string) => void;
};

type FormValues = {
  message: string;
};

export function ChatInput({ onSubmit }: ChatInputProps) {
  const { register, handleSubmit, watch, reset } = useForm<FormValues>();
  const { formRef, onKeyDown } = useEnterSubmit();

  const onSubmitHandler: SubmitHandler<FormValues> = (data) => {
    onSubmit(data.message);
    reset();
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="bottom-0 sticky flex flex-col gap-1.5 bg-background mx-auto px-4 py-2 w-full max-w-2xl">
        <div className="relative">
          <TextareaAutosize
            className="border-neutral-400 shadow-sm p-4 pr-16 border rounded-2xl w-full min-h-3 resize-none"
            autoFocus
            tabIndex={0}
            onKeyDown={onKeyDown}
            placeholder="Send a message."
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            rows={1}
            {...register("message", { required: true })}
          />
          <Button
            type="submit"
            size="icon"
            className="top-3 right-3 absolute w-8 h-8"
            disabled={!watch("message")}
          >
            <ArrowUp className="w-5 h-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
