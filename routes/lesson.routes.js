const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const {
    admintoBookLesson,
    getAllLessons,
    getLessonById,
    updateLessonById,
    deleteLessonById,
} = require('../controllers/lesson.controller');

const router = express.Router();

router
    .route('/')
    .post(protect, authorize('admin'), admintoBookLesson)
    .get(protect, authorize('admin'), getAllLessons);

router
    .route('/:lessonId')
    .get(protect, authorize('admin'), getLessonById)
    .put(protect, authorize('admin'), updateLessonById)
    .delete(protect, authorize('admin'), deleteLessonById);

module.exports = router;
