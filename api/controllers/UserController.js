/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  // Index

  index: function (req, res) {
    User.find().populate('venuesList').exec(function(err, users) {
      if (req.isSocket){
        res.json({users: users});
      }
      else {
        // var sessionUser = req.session.User.id;
        res.view({
          users: users
        });
      }
    });
  },
  
  // Show

  show: function(req, res) {
    User.find().where({'id': req.param('id')}).populate('venuesList').exec(function(err, user) {
      if (req.isSocket){
        res.json({user: user});
      }
      else {
        res.view({
          user: user[0]
        });
      }
    });
  },

  // Edit

  edit : function (req, res, next) {
    User.findOne( req.param('id'), function foundUser( err, user ) {
      if (err) return next(err);
      if (!user) return next('User doesn\'t exist');
      
      res.view({
        user : user
      });
    });
  },

  update : function (req, res, next) {
    if (req.isSocket){
      res.json({user: user});
    }
    else {

      User.update( req.param('id'), req.params.all(), function userUpdate( err ) {
        if (err) {
          return res.redirect('/user/edit/' + req.param('id'));
        }

        res.redirect('/user');
      });
    }
  },
};

