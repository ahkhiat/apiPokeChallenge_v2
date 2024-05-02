const express = require('express')
const app = express()
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_PATH)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

/* -------------------- we must specify the static folder ------------------- */
app.use(express.static('public'));


const Pokemon = require ('./models/Pokemon');
const Dbz = require ('./models/Dbz')

app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


/* --------------------------- create Pokemon card -------------------------- */
app.post('/cartes', function (req, res, next) {
  // const newPokemon = new Pokemon(req.body);
  const { nom, type, imageSrc } = req.body;
  const newPokemon = new Pokemon({
    nom: nom,
    type: type,
    imageSrc: imageSrc
  })

  newPokemon.save()
  .then(() => res.redirect('/'))
  .catch(error => res.status(400).json({ error }));
})
/* --------------------------- create Dbz card -------------------------- */
app.post('/cartes/dbz', function (req, res, next) {
  const { nom, type, imageSrc } = req.body;
  const newDbz = new Dbz({
    nom: nom,
    type: type,
    imageSrc: imageSrc
  })

  newDbz.save()
  .then(() => res.redirect('/'))
  .catch(error => res.status(400).json({ error }));
})

/* -------------------------- get all Pokemon cards ------------------------- */
app.get('/cartes', function (req, res, next) {
  Pokemon.find()
  .then(pokemons => res.status(200).json(pokemons))
  .catch(error => res.status(400).json({ error }));})
/* -------------------------- get all Dbz cards ------------------------- */
app.get('/cartes/dbz', function (req, res, next) {
  Dbz.find()
  .then(dbzcard => res.status(200).json(dbzcard))
  .catch(error => res.status(400).json({ error }));})


/* -------------------------- get one Pkemon by id -------------------------- */
app.get('/cartes/:id', function (req, res, next) {
  Pokemon.findOne({ _id: req.params.id })
  .then(pokemon => {
    if(!pokemon) {
      return res.status(404).json({ message: "Aucun Pokemon avec cet id"})
    }
    res.status(200).json(pokemon)
  })
  .catch(error => res.status(400).json({ error }));})
/* -------------------------- get one dbz by id -------------------------- */
app.get('/cartes/dbz/:id', function (req, res, next) {
  Dbz.findOne({ _id: req.params.id })
  .then(dbzcard => {
    if(!dbzcard) {
      return res.status(404).json({ message: "Aucun dbz avec cet id"})
    }
    res.status(200).json(dbzcard)
  })
  .catch(error => res.status(400).json({ error }));})

/* ---------------------- get one Pokemon card by name ---------------------- */
app.get('/cartes/:nom', function (req, res, next) {
  Pokemon.findOne({ nom: req.params.nom })
  .then(pokemon => {
    if(!pokemon) {
      return res.status(404).json({ message: "Aucun Pokemon avec ce nom"})
    }
    res.status(200).json(pokemon)
  })
  .catch(error => res.status(400).json({ error }));})

/* ---------------------- update Pokemon --------------------- */
app.put('/cartes/:id', function (req, res, next) {
  console.log(req.body);
  Pokemon.updateOne({ _id: req.params.id }, { ...req.body,  _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Carte modifiée avec succès !'}))
  .catch(error => res.status(400).json({ error }));

})

/* ------------------------------- delete card ------------------------------ */
app.delete('/cartes/:id', function (req, res, next) {
  Pokemon.findOne({ _id: req.params.id})
  .then(pokemon => {
        Pokemon.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Votre carte a été supprimée avec succès !'}))
        .catch(error => res.status(400).json({ error }));
    
  })
  .catch(error => res.status(500).json({ error }));

})


// class CartePokemon {
//   static cartesPokemon = new Map();

//   constructor(nom, type, imageSrc) {
//     this.id = CartePokemon.getNextId();
//     this.nom = nom;
//     this.type = type;
//     this.imageSrc = imageSrc;
    
//     if (CartePokemon.cartesPokemon.has(this.id)) {
//       throw new Error('Une carte avec cet ID existe déjà.');
//     }
    
//     CartePokemon.cartesPokemon.set(this.id, this);
//   }

//   static getNextId() {
//     console.log(CartePokemon.cartesPokemon.size + 1);
//     return CartePokemon.cartesPokemon.size + 1;
    
//   }
// }

module.exports = app;


