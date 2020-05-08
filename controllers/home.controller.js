const home = (req, res, next) => {
    res.status(200).json({ message: 'Welcome' });
};

module.exports = home;
