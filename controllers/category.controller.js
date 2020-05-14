const asyncHandler = require('express-async-handler');
const Category = require('../models/category.model');
const ErrorResponse = require('../_helpers/error-handler');

//Get all Categories
exports.getCategories = asyncHandler(async (req, res, next) => {
    const categories = await Category.find({});

    res.status(200).json({ success: true, payload: categories });
});

// Create A category
exports.addCategory = asyncHandler(async (req, res, next) => {
    const { name, description } = req.body;

    // Create category
    const category = await Category.create({ name, description });

    res.status(201).json({ success: true, payload: category });
});

//Update cCategory details

exports.updateCategory = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        name: req.body.name,
        description: req.body.description,
    };

    const category = await Category.findByIdAndUpdate(
        req.params.categoryId,
        fieldsToUpdate,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({ success: true, payload: category });
});

// Delete Category
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.categoryId);

    if (!category)
        return next(
            new ErrorResponse(`Category with id ${req.params.categoryId} not found!`, 404)
        );

    await category.remove();

    res.status(200).json({ success: true, payload: {} });
});
