import { pool } from '../db';

export const createPracticeItem = (body: any) => {
  return new Promise(function (resolve, reject) {
    const { text, description, url, is_completed } = body.item;
    pool.query(
      'INSERT INTO practice_item (text, description, url, is_completed) VALUES ($1, $2, $3, $4) RETURNING *',
      [text, description, url, is_completed],
      (error: any, results: any) => {
        if (error) {
          reject(error);
        }
        resolve(`A new Practice Item has been added added: ${results.rows[0]}`);
      }
    );
  });
};

export const deletePracticeItem = (id: string) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      'DELETE FROM practice_item WHERE id = $1',
      [id],
      (error: any, rseults: any) => {
        if (error) {
          reject(error);
        }
        resolve('Practice Item Deleted');
      }
    );
  });
};

export const toggleComplete = (id: string, value: boolean) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      'UPDATE practice_item SET is_completed=$1 WHERE id=$2',
      [value, id],
      (error: any, rseults: any) => {
        if (error) {
          reject(error);
        }
        resolve('Practice Item Updated');
      }
    );
  });
};

export const updatePracticeItem = (body: any) => {
  return new Promise(function (resolve, reject) {
    const { id, text, description, url, is_completed } = body.item;
    pool.query(
      'UPDATE practice_item SET text=$1, description=$2, url=$3, is_completed=$4 WHERE id=$5',
      [text, description, url, is_completed, id],
      (error: any, results: any) => {
        if (error) {
          reject(error);
        }
        resolve(`Practice Item has been added update: ${results.rows[0]}`);
      }
    );
  });
};
