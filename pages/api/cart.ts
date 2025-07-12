import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from '@neondatabase/serverless';

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
});

async function query(text: string, params?: any[]) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows;
  } finally {
    client.release();
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId as string;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });

  // CREATE TABLE IF NOT EXISTS
  await query(`CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    price TEXT NOT NULL,
    link TEXT NOT NULL,
    image TEXT NOT NULL,
    UNIQUE(user_id, link)
  )`);

  if (req.method === 'GET') {
    const items = await query('SELECT * FROM cart_items WHERE user_id = $1', [userId]);
    console.log(`Found ${items.length} items for user ${userId}`);
    return res.status(200).json(items);
  }

  if (req.method === 'POST') {
    const { title, price, link, image } = req.body;
    if (!title || !price || !link || !image) return res.status(400).json({ error: 'Missing product fields' });

    await query(`INSERT INTO cart_items (user_id, title, price, link, image)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (user_id, link) DO NOTHING`,
      [userId, title, price, link, image]);
    return res.status(201).json({ message: 'Item added' });
  }

  if (req.method === 'DELETE') {
    const { link } = req.body;
    if (!link) return res.status(400).json({ error: 'Missing link' });
    await query('DELETE FROM cart_items WHERE user_id = $1 AND link = $2', [userId, link]);
    return res.status(200).json({ message: 'Item removed' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
