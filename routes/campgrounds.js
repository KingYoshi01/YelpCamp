const express= require('express');
const multer = require('multer');
const campgrounds = require('../controllers/campgrounds');
const { storage } = require('../cloudinary');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

const router = express.Router();
const upload = multer({ storage });

router.route('/')
  .get(campgrounds.index)
  .post(isLoggedIn, upload.array('image'), validateCampground, campgrounds.createCampground);

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
  .get(campgrounds.showCampground)
  .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, campgrounds.updateCampground)
  .delete(isLoggedIn, isAuthor, campgrounds.destroyCampground);

router.get('/:id/edit', isLoggedIn, isAuthor, campgrounds.renderEditForm);

module.exports = router;