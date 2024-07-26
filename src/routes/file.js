var express = require('express');
const router = express.Router();
const FileController = require('../app/controllers/FileController');

router.get('/', FileController.getdata);
router.post('/', FileController.uploadMiddleware, FileController.pushfile);

module.exports = router;

