const asyncHandler = require('express-async-handler');
const Lesson = require('../models/lesson.model');
const User = require('../models/user.model');
const ErrorResponse = require('../_helpers/error-handler');


// Admin Book Lesson
exports.admintoBookLesson = asyncHandler(async (req, res, next) => {
    const student = await User.findOne({ email: req.body.studentEmail });
    const tutor = await User.findOne({ email: req.body.tutorEmail });

    const lesson = await Lesson.create({
        student: student._id,
        tutor: tutor._id,
    });

    res.status(201).json({ success: true, payload: lesson });
});


// Student Book lesson
exports.studentToBookLesson = asyncHandler(async (req, res, next) => {
    const tutor = await User.findById(req.params.tutorId);

    // check if tutor exists
    if (!tutor._id) {
        return next(
            new ErrorResponse(`Tutor with id:${req.params.tutorId} does not exit!`, 404)
        );
    }

    // check if tutor is active
    if (!tutor.isActive) {
        return next(
            new ErrorResponse(`Tutor with id:${req.params.tutorId} is not active`, 404)
        );
    }

    // Book Lesson
    const student = await Lesson.create({
        tutor: req.params.tutorId,
        student: req.user._id,
    });

    res.status(201).json({ success: true, payload: student });
});

//Get all lessons

exports.getAllLessons = asyncHandler(async (req, res, next) => {
    const lessons = await Lesson.find({});

    res.status(200).json({ success: true, payload: lessons });
});

//Get Lesson by Id
exports.getLessonById = asyncHandler(async (req, res, next) => {
    const lesson = await Lesson.find({ _id: req.params.lessonId });

    res.status(200).json({ success: true, payload: lesson });
});

// Update Lesson by Id
exports.updateLessonById = asyncHandler(async (req, res, next) => {
    const { studentEmail, tutorEmail } = req.body;

    const student = await User.findOne({ email: studentEmail });
    const tutor = await User.findOne({ email: tutorEmail });

    const fieldToUpdate = {
        student: student._id,
        tutor: tutor._id,
    };
    const lesson = await Lesson.findByIdAndUpdate(
        req.params.lessonId,
        fieldToUpdate,
        {
            new: true,
            runValidators: true,
        }
    )
        .populate({ path: 'student', select: 'firstName lastName email' })
        .populate({ path: 'tutor', select: 'firstName lastName email' });

    res.status(200).json({ success: true, payload: lesson });
});

//Delete lesson by Id

exports.deleteLessonById = asyncHandler(async (req, res, next) => {
    await Lesson.findByIdAndDelete(req.params.lessonId);

    res.status(200).json({ success: true, payload: {} });
});