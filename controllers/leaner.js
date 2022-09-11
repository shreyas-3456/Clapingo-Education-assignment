const { StatusCodes } = require('http-status-codes');
const Leaner = require('../models/Lerner');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
	const leaner = await Leaner.create({ ...req.body });
	const token = leaner.createJWT();

	res.status(StatusCodes.CREATED).json({ user: { name: leaner.name }, token });
};
const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestError('Please provide email and passowrd');
	}
	const leaner = await Leaner.findOne({ email });
	if (!leaner) {
		throw new UnauthenticatedError('Invalid credentials');
	}

	// compare password
	const isPasswordCorrect = await leaner.matchedPassword(password);

	if (!isPasswordCorrect) {
		throw new UnauthenticatedError('Invalid credentials');
	}

	const token = leaner.createJWT();
	res.status(StatusCodes.OK).json({ user: { name: leaner.name }, token });
};

module.exports = {
	register,
	login,
};
