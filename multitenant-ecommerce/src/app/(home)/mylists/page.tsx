"use client";

import { Card } from "@/components/ui/card";
import { Roboto_Condensed } from "next/font/google";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const poppins = Roboto_Condensed({
    subsets: ["latin"],
    weight: ["700"]
});

interface List {
  list_id: number;
  title: string;
  description: string;
  created_at: string;
  song_id: number;
  added_at: number;
  track_name: string;
  artists: string;
}

async function removeSong(songId: number, listId: number) {
  const res = await fetch(`http://localhost:4000/remove-songs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ songId, listId })
  });

  if(!res.ok) {
    throw new Error("Failed to remove from list.");
  }

  return res.json();
}

export default function ListsPage() {
  const [lists, setLists] = useState([]);
  const [user, setUser] = useState("");
  
  useEffect(() => {
    async function getLists(): Promise<List[]> {
      const user = localStorage.getItem("user");
      if(user) setUser(user);
      const res = await fetch("http://localhost:4000/lists-songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error("Failed to fetch lists");
      }

      setLists(data);

      return data;
    }

    getLists();
  })

  return (
    <div className="flex flex-col items-center py-10 px-8">
      <h1 className={cn("text-5xl pb-4", poppins.className)}>My List</h1>

      <Card className="flex flex-row gap-2 p-4 flex-wrap">
        {user ? (
          lists.length > 0 ? (
            lists.map((list: List) => (
              <div className="relative h-50 w-69 p-4 flex flex-col border-4" key={list.song_id}>
                  <strong className="text-2xl">{list.track_name}</strong>
                  <strong>{list.artists}</strong>
                  <Button onClick={() => removeSong(list.song_id, list.list_id)} className="absolute bottom-4 right-4">x</Button>
              </div>
            ))
          ) : (
            <Button variant="default" className="app">
              <Link href="/discover">
                Start Curating Your List
              </Link>
            </Button>          
          )
        ) : (
          <strong>Log In to Start Curating</strong>
        )}
      </Card>
    </div>
  );
}