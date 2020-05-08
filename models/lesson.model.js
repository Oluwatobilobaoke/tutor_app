const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
    {
        student: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
        tutor: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

// prevent user from booking the same lesson twice
lessonSchema.index({ student: 1, tutor: 1 }, { unique: true });

lessonSchema.pre('find', function () {
    this.populate({
        path: 'student',
        select: 'firstName lastName email',
    }).populate({ path: 'tutor', select: 'firstName lastName email subjects' });
});

module.exports = mongoose.model('Lesson', lessonSchema);
