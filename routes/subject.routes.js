const express = require('express');
const { protect } = require('../middlewares/auth');
const { getSubjectsByName } = require('../controllers/subject.controller');

const router = express.Router();

router.route('').get(protect, getSubjectsByName);

module.exports = router;
