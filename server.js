const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, './data/data.json');

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());

// Initialize data.json if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// API: Get all data
app.get('/api/data', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
});

// API: Add data
app.post('/api/data', (req, res) => {
    const { date, comment } = req.body;
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    const newEntry = { id: Date.now(), date, comment };
    data.push(newEntry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json(newEntry);
});

// API: Delete data
app.delete('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let data = JSON.parse(fs.readFileSync(DATA_FILE));
    data = data.filter(item => item.id !== id);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
});

// API: Edit data
app.put('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { date, comment } = req.body;
    let data = JSON.parse(fs.readFileSync(DATA_FILE));
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = { id, date, comment };
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        res.json(data[index]);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
