/**
 * VenueController
 *
 * @description :: Server-side logic for managing venues
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  // Index

  index: function (req, res) {
    Venue.find().populate('venuesListedBy').populate('venuesCategories').sort('title asc').exec(function(err, venues) {
      if (req.isSocket){
        venues.forEach(function(venue){
          var venueCat = venue.venuesCategories.filter(function(item){
            return 'slack' in item;
          }).map(function(item){
            return item.slack;
          });
          venue.categories = venueCat.toString().replace(/\,/g," ");
        });
        res.json({venues: venues});
      }
      else {
        Category.find().sort('title asc').exec(function(err, categories){
          var sessionUser = req.user;
          var list = [];
          venues.forEach(function(venue){
            var venueCat = venue.venuesCategories.filter(function(item){
              return 'slack' in item;
            }).map(function(item){
              return item.slack;
            });
            venue.categories = venueCat.toString().replace(/\,/g," ");
          });
          if (sessionUser !== undefined) {
            for (var x = 0, leng = sessionUser[0].venuesList.length; x < leng; x++) {
              list.push(sessionUser[0].venuesList[x].id);
            }
            for (var i = 0, len = venues.length; i < len; i++) {
              if (list.indexOf(venues[i].id) != -1) {
                venues[i].favourite = true;
              }
            }
            res.view({
              venues: venues,
              categories: categories
            });
          } else {
            res.view({
              venues: venues,
              categories: categories
            });
          }
        });
      }
    });
  },
	
  // Show

  show: function(req, res) {
    Venue.find().where({'id': req.param('id')}).populate('venuesListedBy').populate('venuesCategories').exec(function(err, venue) {
      if (req.isSocket){
        res.json({venue: venue[0]});
      }
      else {
        res.view({
          venue: venue[0]
        });
      }
    });
  },

  // Edit

  edit : function (req, res, next) {
    Venue.findOne( req.param('id'), function foundVenue( err, venue ) {
      if (err) return next(err);
      if (!venue) return next('Venue doesn\'t exist');
      
      res.view({
        venue : venue
      });
    });
  },

  update : function (req, res, next) {
    if (req.isSocket){
      res.json({venue: venue});
    }
    else {

      Venue.update( req.param('id'), req.params.all(), function venueUpdate( err ) {
        if (err) {
          return res.redirect('/venue/edit/' + req.param('id'));
        }

        res.redirect('/venue');
      });
    }
  },
};

