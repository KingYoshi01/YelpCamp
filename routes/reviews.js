const express = require('express');
const reviews = require('../controllers/reviews');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

const router = express.Router({ mergeParams: true });

router.post('/', isLoggedIn, validateReview, reviews.createReview);

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, reviews.destroyReview);

module.exports = router;