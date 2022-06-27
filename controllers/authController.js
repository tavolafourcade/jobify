/* eslint-disable import/extensions */
import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';

const register = async (req, res) => {
  // CHECK FOR EMPTY VALUES IN THE CONTROLLER
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values ');
  }

  // It will look for the user with this specific email
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError('Email already in use');
  }
  // In req.body all the values will be located, and send them into MongoDB
  const user = await User.create({ name, email, password });

  // Invoking a JWT method and assign it to a variable
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({
      user: {
        email: user.email,
        lastName: user.lastName,
        location: user.location,
        name: user.name,
      },
      token,
      location: user.location,
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // If user doesn't write email or password
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new BadRequestError('Invalid email or password');
  }

  // If the user exists, we can compare the password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError('Invalid password');
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
  const {
    email, name, lastname, location,
  } = req.body;
  if (!email || !name || !lastname || !location) {
    throw new BadRequestError('Please provide all values');
  }
  // Once I have the user, I can update it
  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;
  user.lastname = lastname;
  user.location = location;
  await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export { register, login, updateUser };
