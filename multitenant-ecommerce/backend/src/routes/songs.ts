import { Router } from 'express';
import { pool } from '../db';
import type { Song } from '../types';

const router = Router();

// Get all songs
router.get('/', async (req, res) => {
  try {
    const result = await pool.query<Song>('SELECT * FROM songs;');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;