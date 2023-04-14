const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tokens: {
    type: Schema.Types.Mixed
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  prescriptions: [{
    type:Schema.Types.ObjectId,
    ref: 'Item',
  }]
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
