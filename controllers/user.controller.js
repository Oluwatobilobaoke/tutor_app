const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const ErrorResponse = require('../_helpers/error-handler');

// Search Tutor by FirstName
exports.getTutorByFirstName = asyncHandler(async (req, res, next) => {
    const { name } = req.query;

    const tutors = await User.find({
        $text: { $search: name },
        role: 'tutor',
    }).sort({
        name: 1,
    });
    res.status(200).json({ success: true, payload: tutors });
});

//Get all tutors
exports.getAllTutors = asyncHandler(async (req, res, next) => {
    const tutors = await User.find({ role: 'tutor' });

    res.status(200).json({ success: true, payload: tutors });
});

//Get Tutor by Id
exports.getTutorById = asyncHandler(async (req, res, next) => {
    const tutor = await User.findById(req.params.tutorId);

    if (tutor.role !== 'tutor')
        return next(new ErrorResponse('user is not a tutor', 400));

    res.status(200).json({ success: true, payload: tutor });
});

//Deactivate Tutor
exports.deactivateTutor = asyncHandler(async (req, res, next) => {
    const tutor = await User.findOneAndUpdate(
        { _id: req.params.tutorId, role: 'tutor' },
        { isActive: false },
        { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, payload: tutor });
});

// Register Tutor to take a subject
exports.tutorRegisterSubject = asyncHandler(async (req, res, next) => {
    const subject = await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: { subjects: req.params.subId },
        },
        { new: true, runValidators: true }
    ).populate('subjects');

    res.status(200).json({ success: true, payload: subject });
});

//Get all subjects Tutor Registered for
exports.getAllTutorRegisteredSubjects = asyncHandler(async (req, res, next) => {
    const subjectss = await User.find({ _id: req.user._id })
        .populate('subjects')
        .select('subjects');

    res.status(200).json({ success: true, payload: subjectss[0].subjects });
});

//Delete registered subject by Tutor
exports.deleteRegisteredSubject = asyncHandler(async (req, res, next) => {
    const subjects = await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull: { subjects: req.params.subId },
        },
        { new: true }
    );

    res.status(200).json({ success: true, payload: subjects });
});

// Admin making a tutor an Admin
exports.make_A_Tutor_An_Admin = asyncHandler(async (req, res, next) => {
    const tutor = await User.findOneAndUpdate(
        { _id: req.params.tutorId, role: 'tutor' },
        { isAdmin: true },
        { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, payload: tutor });
});


// Admin Signup as a tutor
exports.adminSignUpasTutor = asyncHandler(async (req, res, next) => {
    const tutor = await User.findOneAndUpdate(
        { _id: req.user._id, isAdmin: true },
        { role: 'tutor' },
        { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, payload: tutor });
});

