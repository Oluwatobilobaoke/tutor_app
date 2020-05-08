const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Please add a category name'] },
    description: { type: String },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Please provide a category'],
    },
    createdAt: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
});

subjectSchema.index({ name: 'text' });

//Make sure subject name are unique across categories
subjectSchema.index({ name: 1, category: 1 }, { unique: true });

module.exports = mongoose.model('Subject', subjectSchema);
