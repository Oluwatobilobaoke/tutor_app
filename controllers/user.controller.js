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
    res.status(200).json({ success: true, data: tutors });
});

//Get all tutors
exports.getAllTutors = asyncHandler(async (req, res, next) => {
    const tutors = await User.find({ role: 'tutor' });

    res.status(200).json({ success: true, data: tutors });
});

//Get Tutor by Id
exports.getTutorById = asyncHandler(async (req, res, next) => {
    const tutor = await User.findById(req.params.tutId);

    if (tutor.role !== 'tutor')
        return next(new ErrorResponse('user is not a tutor', 400));

    res.status(200).json({ success: true, data: tutor });
});

//Deactivate Tutor
exports.deactivateTutor = asyncHandler(async (req, res, next) => {
    const tutor = await User.findOneAndUpdate(
        { _id: req.params.tutId, role: 'tutor' },
        { isActive: false },
        { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: tutor });
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

    res.status(200).json({ success: true, data: subject });
});

//Get all subjects Tutor Registered for
exports.getAllTutorRegisteredSubjects = asyncHandler(async (req, res, next) => {
    const subjectss = await User.find({ _id: req.user._id })
        .populate('subjects')
        .select('subjects');

    res.status(200).json({ success: true, data: subjectss[0].subjects });
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

    res.status(200).json({ success: true, data: subjects });
});
