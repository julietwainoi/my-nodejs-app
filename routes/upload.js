import express from 'express';
import multer from 'multer';
import mongoose from '../config/db.js';
import File from '../models/file.js'; // Import your File model
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save to 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
});

const upload = multer({ storage });

// Route to serve the HTML form
router.get('/upload-form', (req, res) => {
    res.sendFile(path.join(path.resolve(), 'public', 'upload-form.html')); // Serve the form from public folder
});

// File upload route
router.post('/file', upload.single('file'), async (req, res) => {
    try {
        const { originalname, path: filePath } = req.file;

        const newFile = new File({
            title: originalname,  // using the original name of the file
            filePath,             // using the path where the file is stored
            //uploadedAt: new Date() // current timestamp
        })

        const savedFile = await newFile.save();
        res.status(201).json({ message: 'File uploaded successfully', file: savedFile });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

export default router;
