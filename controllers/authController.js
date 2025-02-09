// controllers/authController.js
import passport from 'passport';

const getLogin = (req, res) => {
  res.render('login', { error: req.flash('error') });
};

const postLogin = passport.authenticate('local', {
  successRedirect: '/tickets',
  failureRedirect: '/login',
  failureFlash: true
});

const logout = (req, res, next) => {
  req.logout(function(err) {
    if (err) return next(err);
    res.redirect('/login');
  });
};

export default { getLogin, postLogin, logout };