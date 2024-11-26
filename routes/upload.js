import express from 'express';
const router = express.Router();

// Handle file uploads (use POST method)
router.post('/upload', (req, res) => {
    console.log('File upload route hit');
    // Logic for file upload goes here
    res.send('File uploaded successfully');
});

export default router;
