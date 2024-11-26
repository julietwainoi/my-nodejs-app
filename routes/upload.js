import express from 'express';
import formidable from 'formidable';
import File from '../models/file.js';

const router = express.Router();

router.post('/', (req, res, next) => {
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }

        // Save file info to the database
        const file = new File({
            title: fields.title,
            filePath: files.someExpressFiles.filepath,
        });

        try {
            const savedFile = await file.save();
            res.json({ message: 'File uploaded successfully!', file: savedFile });
        } catch (dbErr) {
            next(dbErr);
        }
    });
});

export default router;
