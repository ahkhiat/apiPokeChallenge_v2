const mongoose = require('mongoose');

const carteDbzSchema =  mongoose.Schema({
    nom: { type: String, required: true },
    type: { type: String, required: true },
    imageSrc: { type: String, required: true }
  }, { collection: 'carteDbz' });


module.exports = mongoose.model('Dbz', carteDbzSchema);