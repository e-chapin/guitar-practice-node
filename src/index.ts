import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as path from 'path';

export const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT: number = Number(process.env.PORT) || 3001;

const REACT_BUILD_DIR = path.join(__dirname, 'public/react/react-gp');
app.use(express.static(REACT_BUILD_DIR));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});

// Import views
require('./api/practice-item')(app);
