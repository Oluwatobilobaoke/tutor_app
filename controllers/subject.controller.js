const asyncHandler = require('express-async-handler');
const Category = require('../models/category.model');
const Subject = require('../models/subject.model');
const ErrorResponse = require('../_helpers/error-handler');

//Create a subject
exports.addSubject = asyncHandler(async (req, res, next) => {
    const { name, description } = req.body;

    const cat = await Category.findById(req.params.categoryId);
    if (!cat) return next(new ErrorResponse('Invalid category provided', 404));

    // Create subject
    const subject = await Subject.create({
        name,
        description,
        category: req.params.categoryId,
    });

    res.status(201).json({ success: true, data: subject });
});

// Get all subjects in a category by id
exports.getSubjects = asyncHandler(async (req, res, next) => {
    const subjects = await Subject.find({ category: req.params.categoryId }).populate(
        'category',
        '-_id -description -__v -createdAt'
    );

    res.status(200).json({ success: true, data: subjects });
});

// Get Subject in a Category by id
exports.getSubject = asyncHandler(async (req, res, next) => {
    const subject = await Subject.findOne({
        _id: req.params.subjectId,
        category: req.params.categoryId,
    }).populate('category', '-_id -description -__v -createdAt');

    res.status(200).json({ succes: true, data: subject });
});

// @desc      Update Subject in a Category by Id
exports.updateSubject = asyncHandler(async (req, res, next) => {
    const { name, description } = req.body;

    const cat = await Category.findById(req.params.categoryId);
    if (!cat) return next(new ErrorResponse('Invalid category provided', 404));

    const fieldToUpdate = {
        name,
        description,
    };
    const subject = await Subject.findByIdAndUpdate(
        req.params.subjectId,
        fieldToUpdate,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(201).json({ success: true, data: subject });
});

//Delete Subject in a Category by id
exports.deleteSubject = asyncHandler(async (req, res, next) => {
    const cat = await Category.findById(req.params.categoryId);
    if (!cat) return next(new ErrorResponse('Invalid category provided', 404));

    await Subject.findByIdAndDelete(req.params.subId);

    res.status(200).json({ success: true, data: {} });
});

//Search subject in a Category by name
exports.getSubjectsByName = asyncHandler(async (req, res, next) => {
    const { name } = req.query;
    const subjects = await Subject.find({ $text: { $search: name } }).sort({
        name: 1,
    });

    res.status(200).json({ success: true, data: subjects });
});
