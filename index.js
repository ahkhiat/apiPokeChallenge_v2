const express = require('express')
const app = express()
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_PATH)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

const cartePokemonSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  type: { type: String, required: true },
  imageSrc: { type: String, required: true }
});

const CartePokemonModel = mongoose.model('CartePokemon', cartePokemonSchema);


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.post('/', function (req, res) {
  const newPokemon = new CartePokemon(req.body);
  try {
    newPokemon.save();
    console.log('Nouveau Pokémon enregistré avec succès !');
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du Pokémon :", error);
  }
  

})





class CartePokemon {
  static cartesPokemon = new Map();

  constructor(nom, type, imageSrc) {
    this.id = CartePokemon.getNextId();
    this.nom = nom;
    this.type = type;
    this.imageSrc = imageSrc;
    
    if (CartePokemon.cartesPokemon.has(this.id)) {
      throw new Error('Une carte avec cet ID existe déjà.');
    }
    
    CartePokemon.cartesPokemon.set(this.id, this);
  }

  static getNextId() {
    console.log(CartePokemon.cartesPokemon.size + 1);
    return CartePokemon.cartesPokemon.size + 1;
    
  }
}


