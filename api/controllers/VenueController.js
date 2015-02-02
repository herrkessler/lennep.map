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
        // var sessionUser = req.session.User.id;
        res.view({
          venues: venues
        });
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
  },
};

