/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    // Attributes

    firstName: {
      type: 'string'
    },

    lastName: {
      type: 'string'
    }, 

    userName: {
      type: 'string',
      required: true,
    },

    admin: {
      type: 'boolean',
      defaultsTo: false
    },

    email: {
      type: 'string',
      email: true,
      required: true, 
      unique: true
    },

    encryptedPassword: {
      type: 'string'
    },

    confirmed: {
      type: 'boolean',
      defaultsTo: false
    },

    // Associations

    venuesList: {
      collection: 'venue',
      via: 'venuesListedBy',
      dominant: true
    },

    post: {
      model: 'post'
    }
  }
};

