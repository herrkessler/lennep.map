module.exports = function(req, res, next) {

  Venue.find().where({'id': req.param('id')}).exec(function findOneCB(err,venue){

    if (req.user[0].id == venue[0].owner) {
      return next();
    }

    return res.forbidden('You are not permitted to perform this action.');
  });

};
