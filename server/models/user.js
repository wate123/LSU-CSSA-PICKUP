const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// define the Index model schema
const UserSchema = new mongoose.Schema({
    email: {type: String, index: { unique: true }},
    password: String,
    name: {type: String, default: ""},
    sex: String,
    hometown: String,
    school: String,
    degree: String,
    arriveDateTime: Date,
    arriveAirport: String,
    luggage: String,
    friends: String,
    sleep: String,
    phone: String,
    social: String,
    toVolunteer: {type: String, default: ""},
    toCssa: {type: String, default: ""},
    joinMail: Boolean,
    reauth: Boolean,
    status: Array,
    accepted: {type: Boolean, default: false, index: true},
    isVolunteer: Boolean,
    major: String,
    car: String,
    contact: String,
    volunteerEmail: String,
    isNewRequest: Boolean,
    reset_password_token: String,
    reset_password_expires: Date
});

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};


/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});


module.exports = mongoose.model('User', UserSchema);
