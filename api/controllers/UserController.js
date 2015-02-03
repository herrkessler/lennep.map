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
    Users.find().where({'id': req.param('id')}).populate('venuesList').exec(function(err, user) {
      if (req.isSocket){
        res.json({user: user});
      }
      else {
        res.view({
          user: user
        });
      }
    });
  }
	
};

