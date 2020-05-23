import express from 'express';
import { pool } from './db';

const app = express();
const port: number = 3001;
const message: string = 'Hello world!';

app.get('/', (req, res) => {
  res.status(200).send(message);
});

app.get('/api/practice-items/all', (req, response) => {
  pool.query(
    'SELECT * FROM practice_item ORDER BY id ASC',
    (err: any, res: any) => {
      if (err) {
        response.status(500).send(err);
      } else {
        response.status(200).send(res.rows);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
