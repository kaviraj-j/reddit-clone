"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { CreateCommunity } from "./CreateCommunityModal";

const followedSubreddits = [
  { name: "TypeScript", href: "/r/typescript" },
  { name: "UnixPorn", href: "/r/unixporn" },
  { name: "Anime", href: "/r/anime" },
];

export default function ResponsiveSidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const Sidebar = () => (
    <div className="flex h-screen w-64 flex-col overflow-y-auto border-r px-4 py-8 text-white bg-black mr-2">
      <ScrollArea className="flex-grow">
        <nav className="flex flex-col space-y-1 mb-1">
          <CreateCommunity />
          {followedSubreddits.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-700"
            >
              {item.name}
            </a>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block">
        <Sidebar />
      </aside>

      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="fixed left-4 top-4 z-40 lg:hidden bg-black"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-black">
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-4 bg-black"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6" />
              {/* <span className="sr-only">Close sidebar</span> */}
            </Button>
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
