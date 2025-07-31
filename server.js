const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./db/db');
const createTables = require('./db/createTables');
const routes = require('./routes/index'); // import your routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

createTables(); 

app.use('/api', routes); 

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
