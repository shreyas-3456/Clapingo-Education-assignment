const express = require('express');
const {
	addTeacher,
	getFavouriteTeacher,
	deleteFavouriteTeacher,
} = require('../controllers/teacher');
const router = express.Router();
const auth = require('../middleware/authentication');

router.route('/addTeacher').post(addTeacher);
router
	.route('/favouriteTeacher')
	.get(getFavouriteTeacher)
	.patch(deleteFavouriteTeacher);

module.exports = router;
