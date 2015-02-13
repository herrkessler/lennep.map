var geocoder = require('geocoder');

module.exports = {

  attributes: {

    //  Attributes

    title: {
      type: 'string',
      required: true,
    },

    street: {
      type: 'string'
    },

    zip: {
      type: 'string'
    },

    town: {
      type: 'string'
    },

    location: {
      type: 'json',
      defaultsTo: {lng: '', lat: ''}
    },

    gallery: {
      type: 'array',
      defaultsTo: ['/images/avatar.png']
    },

    owner: {
      type: 'string'
    },

    confirmed: {
      type: 'boolean',
      defaultsTo: false
    },

    // Associations

    venuesListedBy:{
      collection: 'user',
      via: 'venuesList'
    },

    venuesCategories:{
      collection: 'category',
      via: 'venuesList'
    },
  },

  beforeCreate: function(values, next) {
    var fullAdress = values.street+','+values.zip+','+values.town;
    geocoder.geocode(fullAdress, function ( err, data ) {
      if (err) {
        next();
      } else {
        values.location.lat = data.results[0].geometry.location.lat;
        values.location.lng = data.results[0].geometry.location.lng;
        next();
      }
    });
  }
};

