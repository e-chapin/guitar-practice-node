import express, { response } from 'express';
import bodyParser from 'body-parser';
import { pool } from './db';
import cors from 'cors';

import {
  createPracticeItem,
  deletePracticeItem,
  toggleComplete,
  updatePracticeItem
} from './practice_item_model';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port: number = 3001;
const message: string = 'Hello world!';

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

app.get('/', (req, res) => {
  res.status(200).send(message);
});

app.get('/api/practice-item', (req, response) => {
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

app.post('/api/practice-item', (req, res) => {
  createPracticeItem(req.body)
    .then((response: any) => {
      res.status(200).send(response);
    })
    .catch((error: any) => {
      res.status(500).send(error);
    });
});

app.delete('/api/practice-item', (req, res) => {
  deletePracticeItem(req.body.id)
    .then((response: any) => {
      res.status(200).send(response);
    })
    .catch((error: any) => {
      res.status(500).send(error);
    });
});

app.post('/api/practice-item/complete', (req, res) => {
  toggleComplete(req.body.id, req.body.is_completed)
    .then((response: any) => {
      res.status(200).send(response);
    })
    .catch((error: any) => {
      res.status(500).send(error);
    });
});

app.post('/api/practice-item/update', (req, res) => {
  updatePracticeItem(req.body)
    .then((response: any) => {
      res.status(200).send(response);
    })
    .catch((error: any) => {
      res.status(500).send(error);
    });
});
