import express from 'express';
import * as path from 'path';

import {
  createPracticeItem,
  deletePracticeItem,
  toggleComplete,
  updatePracticeItem
} from '../models/practice_item';

import { pool } from '../db';

const REACT_BUILD_DIR = path.join(__dirname, 'public/react/react-gp');

console.log(REACT_BUILD_DIR);

module.exports = function (app: express.Application) {
  app.get('/', (req, res) => {
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV !== 'production') {
      res.status(200).send('Running in dev mode, use React Server directly.');
    } else {
      res.sendFile('index.html', { root: REACT_BUILD_DIR });
    }
  });

  app.get('/api/practice-item', (req, response) => {
    // todo: move this to model
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
};
