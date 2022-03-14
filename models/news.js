const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const newsSchema = new Schema({
  title: { type: String, required: [true, 'Nie podano tytułu!'] },
  description: { type: String, required: [true, 'Nie podano treści artykułu!'] },
  created: { type: Date, default: Date.now }
});



module.exports = mongoose.model('News', newsSchema);
