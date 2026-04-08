export interface User {
  id: number;
  username: string;
  email: string;
}

export interface List {
  id: number;
  user_id: number;
  title: string;
  description?: string;
}

export interface Song {
  id: number;
  title: string;
  artist: string;
  album?: string;
  genre_id?: number;
  duration?: number;
}