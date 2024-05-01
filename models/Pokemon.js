const mongoose = require('mongoose');

const cartePokemonSchema =  mongoose.Schema({
    nom: { type: String, required: true },
    type: { type: String, required: true },
    imageSrc: { type: String, required: true }
  }, { collection: 'cartepokemons' });


module.exports = mongoose.model('Pokemon', cartePokemonSchema);

