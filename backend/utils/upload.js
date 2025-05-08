import multer from 'multer';
import path from 'path';
import fs from 'fs';
import __dirname from '../utils/pathUtils.js';

const uploadDir = path.join(__dirname, '.', 'backend', 'uploads');
console.log("UploadDir = ", uploadDir)

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// Removendo o filtro de tipo de arquivo
const upload = multer({ 
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // Limite de 100MB por arquivo
    }
});

export default upload;