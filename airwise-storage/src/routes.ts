
import express from 'express';
import path from 'path';

const router = express.Router();
router.get('/download/:file(*)', (req, res) => {
    const file = req.params.file;
    const fileLocation = path.join('./storage/', file);
    res.download(fileLocation, file);
});
export default router;