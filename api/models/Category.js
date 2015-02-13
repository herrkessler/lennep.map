/**
* Category.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    // Attributes

    title: {
      type: 'string',
      required: true,
    },

    slack: {
      type: 'string'
    },

    icon: {
      type: 'string',
      defaultsTo: '/images/icon.png'
    },

    // Associations

    venuesList:{
      collection: 'venue',
      via: 'venuesCategories'
    }

  },

  beforeCreate: function(values, next) {
    values.slack = values.title.toLowerCase();
    next();
  }
};

