import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Roboto_Condensed } from "next/font/google"; 
import '../globals.css';

// show button 'elevated' if user not logged in

const poppins = Roboto_Condensed({
    subsets: ["latin"],
    weight: ["700"]
});

export default function Home() {
  return (
    <div className="py-1">
      <div className="flex flex-row gap-x-34 px-24">
        <div className="flex flex-col gap-y-8 py-10">
          <span className={cn("text-7xl font-semibold text-fuchsia-600 app", poppins.className)}>
            select.
          </span>
          <span className={cn("text-7xl font-semibold text-amber-600 indent-42 app", poppins.className)}>            
            discover.
          </span>
          <span className={cn("text-7xl font-semibold text-emerald-600 indent-84 app", poppins.className)}>
            collect.
          </span>
          <span className={cn("text-8xl font-semibold items-center-safe app", poppins.className)}>
            your favorites.
          </span>
          <Button variant="default" className="app">
            Get Started
          </Button>
        </div>

        <div className="py-4">
          <Card className="py-16 space-y-7 h-128 w-160 text-center">
            <div className="space-y-2 flex flex-col">
              <span className={cn("text-5xl font-semibold text-rose-600", poppins.className)}>TOP HITS</span>
              <span className={cn("text-2xl font-semibold", poppins.className)}>on curation.</span>
            </div>
            <span className={cn("text-4xl font-semibold", poppins.className)}>
              1. Something by Someone
            </span>
            <span className={cn("text-4xl font-semibold", poppins.className)}>
              2. Something by Someone Else Longer
            </span>
            <span className={cn("text-4xl font-semibold", poppins.className)}>
              3. Something by Someone
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
}
