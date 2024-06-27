"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowUp, Menu, Plus } from "lucide-react";

export default function Component() {
  return (
    <div className="flex flex-col w-full h-screen">
      <header className="z-10 flex justify-start items-center gap-2 bg-background shadow shadow-gray-300 p-2 h-12">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            [Menu content]
          </SheetContent>
        </Sheet>
        <div className="flex items-center">
          <h1>SkyShaper</h1>
        </div>
      </header>
      <div className="flex flex-1">
        {/* Left */}
        <div className="flex-1 sm:w-full">
          <div className="flex flex-col h-full">
            {/* Chat */}
            <div className="flex-1 p-4 overflow-auto">[chat messages]</div>
            {/* Chat input */}
            <div className="p-4 border-t">
              <div className="relative">
                <TextareaAutosize
                  placeholder="Type your message..."
                  className="border-neutral-400 shadow-sm p-4 pr-16 border rounded-2xl w-full min-h-[48px] resize-none"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="top-3 right-3 absolute w-8 h-8"
                  disabled
                >
                  <ArrowUp className="w-4 h-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="sm:block hidden bg-background bg-slate-50 sm:w-96 back">
          <div className="flex flex-col h-full">
            <div className="flex-1 p-4 overflow-auto">[sidebar content]</div>
          </div>
        </div>
      </div>
    </div>
  );
}
