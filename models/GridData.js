const mongoose = require("mongoose");

const GridDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  data: { type: Array, required: true },
  mergedCells: { type: Array, default: [] }, // 👈 Ensure mergedCells are stored
});

module.exports = mongoose.model("GridData", GridDataSchema);
