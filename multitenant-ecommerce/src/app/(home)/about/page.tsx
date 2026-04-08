import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Roboto_Condensed } from "next/font/google";

const poppins = Roboto_Condensed({
    subsets: ["latin"],
    weight: ["500"]
});

const Page = () => {
    return (
        <div className="flex flex-col items-center-safe text-center py-10">
            <span className={cn("text-5xl", poppins.className)}>OUR GOAL</span>
            <span className={cn("text-2xl space-y-2 py-2 px-16", poppins.className)}>
                In the original creation of curation., we aimed to develop a site where 
                people can track their tastes. Personally, I wanted to create a list of songs
                that I know how to play on the guitar. As someone with poor memory that is
                learning to play the guitar, a list of songs that I can play would serve as 
                a great source of motivation. We also thought about how cool sharing spotify
                wrapped is with our friends, so something like that would be enjoyable year 
                round. In the future, we hope to expand and allow you to create more lists, 
                search for your favorite songs, and share your lists with friends!
            </span>
            <div className="mt-20 space-y-2"> 
                <span className={cn("text-4xl", poppins.className)}>
                    Contact Us
                </span>
                <Textarea placeholder="Your Message Here" className="w-200 h-25"></Textarea>
                <Button variant="default" className="p-5 app">send</Button>
            </div>
        </div>
    );
};

export default Page;

// ./about