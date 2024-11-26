import mongoose from 'mongoose';

const FileSchema = new mongoose.Schema({
    title: { type: String, required: true },
    filePath: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model('File', FileSchema);