// GET /api/test/all
// GET /api/test/user for loggedin users (user/tutor/admin)
// GET /api/test/tutor for tutor
// GET /api/test/admin for admin
const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const {
    getTutorByFirstName,
    getAllTutors,
    getTutorById,
    deactivateTutor,
    getAllTutorRegisteredSubjects,
} = require('../controllers/user.controller');

const router = express.Router();

router.route('/').get(protect, getTutorByFirstName);

router.route('/tutors').get(protect, authorize('admin'), getAllTutors);
router
    .route('/tutors/subjects')
    .get(protect, authorize('tutor'), getAllTutorRegisteredSubjects);

router
    .route('/tutors/:tutId')
    .get(protect, authorize('admin'), getTutorById)
    .put(protect, authorize('admin'), deactivateTutor);


module.exports = router;
