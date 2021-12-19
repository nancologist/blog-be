const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'src/uploads/' });
const controller = require('../controllers/article');

router.post('/', controller.postArticle)

router.post('/post-image', upload.single('myImage'), controller.uploadImage);

module.exports = router;