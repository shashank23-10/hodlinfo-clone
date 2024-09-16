const express = require('express');
const axios = require('axios');
const pool = require('./db');

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS) from the public directory
app.use(express.static('public'));

// Route to fetch data from the API and store it in PostgreSQL
app.get('/fetch-and-store', async (req, res) => {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = Object.values(response.data).slice(0, 10);

    // Clear existing data
    await pool.query('DELETE FROM tickers');

    // Insert new data
    for (const ticker of tickers) {
      await pool.query(
        'INSERT INTO tickers (name, last, buy, sell, volume, base_unit) VALUES ($1, $2, $3, $4, $5, $6)',
        [ticker.name, ticker.last, ticker.buy, ticker.sell, ticker.volume, ticker.base_unit]
      );
    }

    res.send('Data fetched and stored successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from API.');
  }
});

// Route to get stored data and send it to the frontend
app.get('/api/tickers', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM tickers');
      console.log(result.rows); // Log the data to check if it retrieves correctly
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching data from database:', error);
      res.status(500).send('Error fetching data from database.');
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
