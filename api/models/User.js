var gravatar = require('gravatar');

var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' },

    firstName: {
      type: 'string'
    },

    lastName: {
      type: 'string'
    },

    admin: {
      type: 'boolean',
      defaultsTo: false
    },

    confirmed: {
      type: 'boolean',
      defaultsTo: false
    },

    gravatarURL: {
      type: 'string'
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

  },

  beforeCreate: function(values, next) {
    values.gravatarURL = gravatar.url(values.email, {s: '100', r: 'x', d: 'retro'}, false);
    next();
  }
};

module.exports = User;
