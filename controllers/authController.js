// controllers/authController.js
const passport = require('passport');

exports.getLogin = (req, res) => {
  res.render('login', { error: req.flash('error') });
};

exports.postLogin = passport.authenticate('local', {
  successRedirect: '/tickets',
  failureRedirect: '/login',
  failureFlash: true
});

exports.logout = (req, res, next) => {
  req.logout(function(err) {
    if (err) return next(err);
    res.redirect('/login');
  });
};


export default { getLogin, postLogin, logout };