import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const SECRET_KEY = 'your-secret-key';

// Mock user data (in a real app, you'd use a database)
const users = [{ username: 'testuser', password: 'password123' }];

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Protected route example
router.get('/protected', (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.json({ message: 'Welcome to the protected route!', user: decoded });
    });
});

export default router;
