/**
* Venue.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

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
      defaultsTo: {lng: "", lat: ""}
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
    }

  }
};

