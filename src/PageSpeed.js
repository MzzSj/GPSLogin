import express from 'express';
const app = express();

// Middleware to add delay to page routes
app.use((req, res, next) => {
    const delay = Math.random() * 1000; // Random delay between 0 and 1000 milliseconds
    setTimeout(next, delay);
});

// Route handlers
app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
