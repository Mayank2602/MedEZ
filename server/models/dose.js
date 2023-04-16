const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoseSchema = new Schema({
  date: {
    type: Number,
    required:true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  list: [{
    type: String,
  }]
});

const Dose = mongoose.model("Dose", DoseSchema);
module.exports = Dose;
