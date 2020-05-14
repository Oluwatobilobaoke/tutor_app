const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const {
    getTutorByFirstName,
    getAllTutors,
    getTutorById,
    deactivateTutor,
    getAllTutorRegisteredSubjects,
    make_A_Tutor_An_Admin,
    adminSignUpasTutor,
} = require('../controllers/user.controller');

const { studentToBookLesson } = require('../controllers/lesson.controller');

const router = express.Router();

router.route('/').get(protect, getTutorByFirstName);

router.route('/tutors').get(protect, authorize('admin'), getAllTutors);
router
    .route('/tutors/subjects')
    .get(protect, authorize('tutor'), getAllTutorRegisteredSubjects);

router
    .route('/tutors/:tutorId')
    .get(protect, authorize('admin'), getTutorById)
    .put(protect, authorize('admin'), deactivateTutor);

router
    .route('/tutors/:tutorId/book')
    .post(protect, authorize('student'), studentToBookLesson);

router
    .route('/tutors/:tutorId/become-an-admin')
    .put(protect, authorize('admin'), make_A_Tutor_An_Admin);

router
    .route('/become-tutor').put(protect, authorize('admin'), adminSignUpasTutor);


module.exports = router;
