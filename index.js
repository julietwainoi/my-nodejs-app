import express from 'express';
import mongoose from './config/db.js'; // Import database connection
import uploadRoutes from './routes/upload.js';
import authRoutes from './routes/auth.js';
import path from 'path';

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(path.resolve(), 'public'))); // Serve static files

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads')); // Serve files from the uploads folder

app.use(express.static(path.join(path.resolve(), 'public'))); // Serve other static files
// Root route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Server!</h1>');
});

// Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
