const express = require('express');
const { addTeacher, getFavouriteTeacher } = require('../controllers/teacher');
const router = express.Router();
const auth = require('../middleware/authentication');

router.route('/addTeacher').post(addTeacher);
router.route('/favouriteTeacher').get(getFavouriteTeacher);

module.exports = router;
