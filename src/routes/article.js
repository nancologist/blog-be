const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'src/uploads/' });
const controller = require('../controllers/article');

router.post('/', upload.single('myImage'), controller.uploadImage);

module.exports = router;