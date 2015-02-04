/**
 * VenueController
 *
 * @description :: Server-side logic for managing venues
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  // Index

  index: function (req, res) {
    Venue.find().populate('venuesListedBy').populate('venuesCategories').exec(function(err, venues) {
      if (req.isSocket){
        res.json({venues: venues});
      }
      else {
        var sessionUser = req.user;
        var list = [];

        if (sessionUser !== undefined) {

          for (var x = 0, leng = sessionUser[0].venuesList.length; x < leng; x++) {
            list.push(sessionUser[0].venuesList[x].id);
          }

          for (var i = 0, len = venues.length; i < len; i++) {
            if (list.indexOf(venues[i].id) != -1) {
              venues[i]['favourite'] = true;
            }
          }
          res.view({
            venues: venues
          });
        } else {
          res.view({
            venues: venues
          });
        }
      }
    });
  },
	
  // Show

  show: function(req, res) {
    Venue.find().where({'id': req.param('id')}).populate('venuesListedBy').populate('venuesCategories').exec(function(err, venue) {
      if (req.isSocket){
        res.json({venue: venue});
      }
      else {
        res.view({
          venue: venue
        });
      }
    });
  }
};

