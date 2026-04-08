import { Router } from 'express';
import { pool } from '../db';
import type { List } from '../types';

const router = Router();

// Get lists by user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query<List>(
      'SELECT * FROM lists WHERE user_id = $1;',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

export default router;