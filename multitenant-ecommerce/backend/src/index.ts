import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { pool } from "./db";
import authRouter from "./routes/auth";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);

interface Song {
  id: number;
  track_id: string;
  artists: string;
  album_name: string | null;
  track_name: number | null;
  popularity: number | null;
  duration_ms: number | null;
  explicit: boolean | false;
  danceability: number | null;
  energy: number | null;
  musical_key: number | null;
  loudness: number | null;
  mode: number | null;
  speechiness: number | null;
  acousticness: number | null;
  instrumentalness: number | null;
  liveness: number | null;
  valence: number | null;
  tempo: number | null;
  time_signature: number | null;
  track_genre: string | null;
}

/* Function to fetch all songs from database */
async function getSongs(genre: string): Promise<Song[]> {
  const result = await pool.query<Song>(
    "SELECT * FROM songs WHERE track_genre = $1 LIMIT 50;",
    [genre]
  );

  return result.rows;
}

app.get("/songs", async (req, res) => {
  const genre = String(req.query.genre) || "acoustic";
  const songs = await getSongs(genre);
  res.json(songs);
});

interface Genre {
  id: number;
  name: string;
}

/* Function to fetch all songs from database */
async function getGenres(): Promise<Genre[]> {
  const result = await pool.query<Genre>(
    "SELECT * FROM genres;"
  );

  return result.rows;
}

app.get("/genres", async (req, res) => {
  const genres = await getGenres();
  res.json(genres);
});

interface List {
  id: number;
  user_id: number;
  title: string;
  description: string;
  created_at: number;
}

/* Function to get lists */
async function getLists(user: string | null): Promise<List[]> {
  const userId = user;
  if(!userId) {
    return [];
  }
  const result = await pool.query<List>(
    "SELECT * FROM lists WHERE user_id = $1 LIMIT 5;",
    [userId]
  );

  return result.rows;
}

app.post("/lists", async (req, res) => {
  const user = JSON.parse(req.body.user);
  const lists = await getLists(user.id);
  res.json(lists);
});

/* Function to get lists and songs in lists */
async function getListsSongs(user: string | null): Promise<List[]> {
  const userId = user;
  if(!userId) {
    return [];
  }
  const result = await pool.query<List>(
    "SELECT * FROM lists INNER JOIN list_songs ON lists.id = list_songs.list_id INNER JOIN songs ON list_songs.song_id = songs.id WHERE lists.user_id = $1;",
    [userId]
  );

  return result.rows;
}

app.post("/lists-songs", async (req, res) => {
  const user = JSON.parse(req.body.user);
  const lists = await getListsSongs(user.id);
  res.json(lists);
});

/* Function to add songs to lists */
async function addSongs(songId: number, listId: number): Promise<Song[]> {
  const result = await pool.query<Song>(
    "INSERT INTO list_songs (list_id, song_id) VALUES ($1, $2);",
    [listId, songId]
  );

  return result.rows;
}

app.post("/add-songs", async (req, res) => {
  const songId = Number(req.body.songId);
  const listId = Number(req.body.listId);

  await addSongs(songId, listId);

  res.json({ success: true });
});

/* Function to remove songs from lists */
async function removeSongs(songId: number, listId: number): Promise<Song[]> {
  const result = await pool.query<Song>(
    "DELETE FROM list_songs WHERE list_id = $1 AND song_id = $2;",
    [listId, songId]
  );

  return result.rows;
}

app.post("/remove-songs", async (req, res) => {
  const songId = Number(req.body.songId);
  const listId = Number(req.body.listId);

  await removeSongs(songId, listId);

  res.json({ success: true });
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});