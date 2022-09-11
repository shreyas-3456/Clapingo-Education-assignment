const Teacher = require('../models/Teacher');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

const addTeacher = async (req, res) => {
	let findTeacher = await Teacher.findOne({ name: req.body.name });

	if (findTeacher) {
		const alreadyAddExists = await Teacher.findOne({
			$and: [{ _id: findTeacher._id }, { favourite: req.user.userId }],
		});
		if (alreadyAddExists) {
			throw new BadRequestError('Already selected as the favourite teacher');
		}
		await Teacher.findByIdAndUpdate(findTeacher._id, {
			$push: { favourite: req.user.userId },
		});
		findTeacher = await Teacher.findOne({ name: req.body.name }); //see if updated
		res.status(StatusCodes.ACCEPTED).json({ findTeacher });
	} else {
		const teacher = await Teacher.create({
			name: req.body.name,
			favourite: [req.user.userId],
		});
		res.status(StatusCodes.CREATED).json({ teacher });
	}
};
const getFavouriteTeacher = async (req, res) => {
	const favouriteTeacher = await Teacher.aggregate([
		{
			$project: {
				_id: 0,
				name: 1,
				maxLength: { $max: { $size: '$favourite' } },
			},
		},
		{
			$sort: { maxLength: -1 },
		},
		{
			$limit: 1,
		},
	]);
	res.status(StatusCodes.OK).json({
		message: `The favourite teacher is ${favouriteTeacher[0].name} as ${favouriteTeacher[0].maxLength} learners love him !!`,
	});
};

module.exports = {
	addTeacher,
	getFavouriteTeacher,
};
