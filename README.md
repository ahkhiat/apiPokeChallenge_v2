# ApiPokeChallenge #

Le HTML était fourni, il a été très peu modifié.

le backend a été developpé avec Express

les données sont stockées sur MongoDb

## Configurations ##

### Dépendances ###
Pour installer les dépendances, taper :
```npm install```

### Base de données ###
Pour la connexion à la base de données :
prendre le fichier **.env.sample**
retirer l'extension **.sample** (pour ne garder uniquement **.env**)
et remplacer les **xxxx** par son adresse MongoDb (qui doit contenir son nom d'utilisateur et son password associé, ainsi que le nom de la table)
Pour lancer son serveur, taper :
```nodemon start```

### Lancement ###
L'application sera accessible sur :
[http://localhost:3000](http://localhost:3000)

## Application ##

Le CRUD pour les cartes Pokemons est fonctionnel à 100%

Pour les cartes DBZ, seul l'Add et la lecture de toutes les cartes fonctionnent.
L'Update et le Delete n'ont pas été developpés.