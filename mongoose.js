const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  collectorsCount: Number,

  facts: [{
        amount: { type: Number, required: true, default: 1 },
        hatColor: { type: String, lowercase: true, trim: true },
  }],
  steps: [String],
})

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;