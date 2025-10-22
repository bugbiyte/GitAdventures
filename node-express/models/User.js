// models/User.js
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcryptjs');               // ✅ add this

const userSchema = new mongoose.Schema({
  email: {
    type: String, required: true, unique: true, lowercase: true, trim: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  // We're storing the *hash* here. (Min length is moot for a hash, but harmless.)
  passwordHash: { type: String, required: true, minlength: 6 },
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });

// (Optional) noisy for prod—remove if you like
userSchema.post('save', function (doc, next) {
  console.log('New user was created & saved', { id: doc._id, email: doc.email });
  next();
});

userSchema.pre('save', async function (next) {
  // ✅ only re-hash if the password was changed
  if (!this.isModified('passwordHash')) return next();
  const salt = await bcrypt.genSalt(12);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

module.exports = mongoose.model('User', userSchema);
