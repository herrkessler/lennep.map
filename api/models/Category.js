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

    icon: {
      type: 'string',
      defaultsTo: '/images/icon.png'
    },

    // Associations

    venuesList:{
      collection: 'venue',
      via: 'venuesCategories'
    }

  }
};

