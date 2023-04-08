const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  drugs: [{
    type: String
  }],
  type: {
    type: String,
    required: true,
  }
});

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;