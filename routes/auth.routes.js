const express = require('express');
const { protect } = require('../middlewares/auth');
const {
    signUp,
    logIn,
    logOut,
    profile,
    updateProfile,
} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/logout', logOut);
router.get('/profile', protect, profile);
router.put('/updateprofie', protect, updateProfile);

module.exports = router;
