import express from 'express';
import path from 'path';
var router = express.Router();
router.get('/:file(*)', function (req, res) {
    var file = req.params.file;
    var fileLocation = path.join('./storage/', file);
    res.download(fileLocation, file);
});
