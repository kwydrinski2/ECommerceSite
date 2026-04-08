import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Roboto_Condensed } from "next/font/google"; 
import '../globals.css';
import Link from "next/link";

// show button 'elevated' if user not logged in

const poppins = Roboto_Condensed({
    subsets: ["latin"],
    weight: ["700"]
});

export function getUser() {
    const user = localStorage.getItem("user");
    return user;
}

export default function Home() {
  return (
    <div className="py-1">
      <div className="flex flex-row gap-x-25 px-12">
        <div className="flex flex-col gap-y-2 py-5">
          <span className={cn("text-8xl font-semibold text-fuchsia-700 app", poppins.className)}>
            select.
          </span>
          <span className={cn("text-8xl font-semibold text-amber-700 indent-68 app", poppins.className)}>            
            discover.
          </span>
          <span className={cn("text-8xl font-semibold text-emerald-700 indent-136 app", poppins.className)}>
            collect.
          </span>
          <span className={cn("text-9xl font-semibold items-center-safe app tracking-wider", poppins.className)}>
            your favorites.
          </span>
          <Button variant="default" className="app mt-6">
            <Link href="/discover">
              Start Discovering
            </Link>
          </Button>
        </div>

        <div className="py-7">
          <Card className="py-16 space-y-7 h-128 w-120 text-center">
            <div className="space-y-2 flex flex-col">
              <span className={cn("text-5xl font-semibold text-rose-600", poppins.className)}>TOP HITS</span>
              <span className={cn("text-2xl font-semibold", poppins.className)}>on curation.</span>
            </div>
            <span className={cn("text-3xl font-semibold px-4", poppins.className)}>
              1. 505 - Artic Monkeys
            </span>
            <span className={cn("text-3xl font-semibold px-4", poppins.className)}>
              2. Ain't It Fun - Paramore
            </span>
            <span className={cn("text-3xl font-semibold px-4", poppins.className)}>
              3. Basket Case - Green Day
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
}
