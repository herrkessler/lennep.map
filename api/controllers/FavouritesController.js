/**
 * FavouritesController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  // Index

  index: function(req, res) {

    if (req.isAuthenticated()) {
      User.find().where({'id': req.user[0].id}).populate('venuesList').exec(function(err, user) {
        if (req.isSocket){
          res.json({user: user});
        }
        else {
          res.view({
            user: user[0]
          });
        }
      });

    } else {
      var favs = req.param('favs');
      var favsArray = favs.split(',');
      favsArray.shift();

      Venue.find().where({id: favsArray}).populate('venuesCategories').exec(function(err, venues) {
        if (req.isSocket){
          res.json({venues: venues});
        }
        else {
          console.log(venues);
          res.view({
            venues: venues
          });
        }
      }); 
    }
  }
};