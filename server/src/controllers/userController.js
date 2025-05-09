import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/User.js';

// @desc    Fetch all users
// @route   GET api/users
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// @desc    Fetch single user
// @route   GET api/users/:id
// @access  Private
export const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Create a new user
// @route   POST api/users
// @access  Public
export const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, telephone } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
        res.status(404);
        throw new Error('User already exists');
    }
    const user = await User.create({ name, email, password, telephone });
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        telephone: user.telephone,
        token: generateToken(user._id)
    });
});

// @desc    Authenticate user & get token
// @route   POST api/users/login
// @access  Public
export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = User.findOne({ email });
    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            telephone: user.telephone,
            token: generateToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});
