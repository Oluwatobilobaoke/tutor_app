const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a category name'],
        unique: true,
    },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// Cascade delete subjects when a category is deleted
categorySchema.pre('remove', async function (next) {
    console.log(`Subjects being removed from category ${this._id}-${this.name}`);
    await this.model('Subject').deleteMany({ category: this._id });
    next();
});

module.exports = mongoose.model('Category', categorySchema);
