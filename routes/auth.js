import express from 'express';
const router = express.Router();

// Define a route for authentication (e.g., login)
router.post('/login', (req, res) => {
    res.send('Login route');
});

export default router;
