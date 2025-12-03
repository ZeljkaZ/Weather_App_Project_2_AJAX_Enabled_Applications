const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from parent directory (frontend)
app.use(express.static(path.join(__dirname, '..')));

// API proxy endpoint for current weather
app.get('/api/weather', async (req, res) => {
    try {
        const { q, lat, lon, units } = req.query;
        
        let url = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.API_KEY}&units=${units || 'metric'}`;
        
        if (q) {
            url += `&q=${q}`;
        } else if (lat && lon) {
            url += `&lat=${lat}&lon=${lon}`;
        } else {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const fetch = (await import('node-fetch')).default;
        const response = await fetch(url);
        const data = await response.json();
        
        res.json(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// API proxy endpoint for forecast
app.get('/api/forecast', async (req, res) => {
    try {
        const { q, lat, lon, units } = req.query;
        
        let url = `https://api.openweathermap.org/data/2.5/forecast?appid=${process.env.API_KEY}&units=${units || 'metric'}`;
        
        if (q) {
            url += `&q=${q}`;
        } else if (lat && lon) {
            url += `&lat=${lat}&lon=${lon}`;
        } else {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const fetch = (await import('node-fetch')).default;
        const response = await fetch(url);
        const data = await response.json();
        
        res.json(data);
    } catch (error) {
        console.error('Error fetching forecast:', error);
        res.status(500).json({ error: 'Failed to fetch forecast data' });
    }
});

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});