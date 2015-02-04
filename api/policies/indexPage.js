/**
 * Show different index pages to logged in User.
 */

module.exports = function(req, res, ok) {
  if (req.user !== undefined) {
    res.redirect('/venue');
  } else {
    return ok();
  }
};