const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const {
    addCategory,
    updateCategory,
    deleteCategory,
    getCategories,
} = require('../controllers/category.controller');

const {
    tutorRegisterSubject,
    deleteRegisteredSubject,
} = require('../controllers/user.controller');

const {
    addSubject,
    getSubjects,
    getSubject,
    updateSubject,
    deleteSubject,
} = require('../controllers/subject.controller');

const router = express.Router();

router
    .route('/')
    .post(protect, authorize('admin'), addCategory)
    .get(protect, getCategories);
router
    .route('/:categoryId')
    .put(protect, authorize('admin'), updateCategory)
    .delete(protect, authorize('admin'), deleteCategory);

router
    .route('/:categoryId/subjects')
    .post(protect, authorize('admin'), addSubject)
    .get(protect, getSubjects);

router
    .route('/:categoryId/subjects/:subjectId')
    .get(protect, getSubject)
    .put(protect, authorize('admin'), updateSubject)
    .delete(protect, authorize('admin'), deleteSubject);

router
    .route('/:categoryId/subjects/:subjectId/register')
    .put(protect, authorize('tutor'), tutorRegisterSubject);

router
    .route('/:categoryId/subjects/:subjectId/delete')
    .put(protect, authorize('tutor'), deleteRegisteredSubject);

module.exports = router;
