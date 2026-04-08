"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Roboto_Condensed } from "next/font/google";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

const poppins = Roboto_Condensed({
    subsets: ["latin"],
    weight: ["500"]
});


interface Song {
  id: number;
  track_name: string | null;
  artists: string;
  album_name: string | null;
}

interface Genre {
  id: number;
  name: string;
}

interface List {
  id: number;
  title: string;
}

async function addToList(songId: number, listId: number) {
  const res = await fetch(`http://localhost:4000/add-songs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ songId, listId })
  });

  if (!res.ok) {
    throw new Error("Failed to add to list.");
  }

  return res.json();
}

export default function SongsPage() {
  const [lists, setLists] = useState([]);
  const [user, setUser] = useState("");
  const [songs, setSongs] = useState([]);
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function getSongs(): Promise<Song[]> {
      const res = await fetch(`http://localhost:4000/songs?genre=${genre}`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to fetch songs");
      }

      setSongs(data);

      return data;
    }
    getSongs();
  }, [genre])

  useEffect(() => {
    async function getLists(): Promise<List[]> {
      const user = localStorage.getItem("user");
      if(user) setUser(user);
      const res = await fetch("http://localhost:4000/lists", {
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
  }, [])

  useEffect(() => {
    async function getGenres(): Promise<Genre[]> {
      const res = await fetch("http://localhost:4000/genres", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch genres");
      }

      const data = await res.json();

      setGenres(data);

      return data;
    }

    getGenres();
  }, [])

  return (
    <div className="flex flex-col items-center py-10 px-8">
      <h1 className={cn("text-5xl pb-4", poppins.className)}>DISCOVER</h1>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="bg-white px-4 py-2 rounded">
            Discover by Genre ↓
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            {genres.map((genre: Genre) => (
              <DropdownMenuItem
                key={genre.id}
                onClick={() => setGenre(genre.name)}
              >
                {genre.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ul className="flex flex-row gap-2 py-4 flex-wrap">
        {songs.map((song: Song) => (
          <Card className="relative h-50 w-71 p-4 flex flex-col" key={song.id}>
            <strong>{song.track_name}</strong>
            <div>
              {song.artists}
              {song.album_name && ` (${song.album_name})`}
            </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="absolute bottom-4 right-4">
                +
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="">
              <DropdownMenuGroup>
                {user ? (
                  lists.map((list: List) => (
                    <DropdownMenuItem
                      key={list.id}
                      onClick={() => addToList(song.id, list.id)}
                    >
                      {list.title}
                    </DropdownMenuItem>
                  )) ) : ( 
                    <DropdownMenuLabel>
                      Login to Start Curating
                    </DropdownMenuLabel>
                  )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          </Card>
        ))}
      </ul>
    </div>
  );
}