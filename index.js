


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


