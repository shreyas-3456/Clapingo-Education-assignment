const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please provide name'],
		minlength: 3,
		maxlength: 50,
		unique: true,
	},
	favourite: {
		type: Array,
		required: true,
	},
});

module.exports = mongoose.model('Teacher', TeacherSchema);
