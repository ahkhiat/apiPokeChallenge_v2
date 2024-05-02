document.addEventListener("DOMContentLoaded", () => {
    const homeContainer = document.querySelector(".home-container")

    if(homeContainer) {

    

        console.log('main.js chargé')

        document.getElementById('onePoke').addEventListener('submit', function(event) {
            event.preventDefault(); 
            const nomPokemon = document.getElementById('nomCarte').value;
        
            window.location.href = '/cartes/' + encodeURIComponent(nomPokemon);
        });

        /* ---------- fetch the JSON response of get all pokemons function ---------- */

        let pokemons

        async function fetchPokemons() {
            const res = await fetch("/cartes", {
                method: 'GET' 
            });
            pokemons = await res.json();
            console.log("pokemons :", pokemons);
            }
        async function getPokemons() {
            await fetchPokemons();
        }

        getPokemons().then(() => {

            /* ---------------------------- generate a table ---------------------------- */
        // let tableBody = document.querySelector("#pokemonList");

        // pokemons.forEach(pokemon => {
        //     console.log(pokemon)
        //     let tableRow = document.createElement("tr");
            
        //     let tableCell1 = document.createElement("td");
        //         tableCell1.innerText = pokemon.nom;
        //     tableRow.appendChild(tableCell1);

        //     let tableCell2 = document.createElement("td");
        //         tableCell2.innerText = pokemon.type;
        //     tableRow.appendChild(tableCell2);

        //     let tableCell3 = document.createElement("td");
        //         tableCell3.innerText = pokemon.imageSrc;
        //     tableRow.appendChild(tableCell3);

        // tableBody.appendChild(tableRow)
        // })

        /* --------------------------- generate pretty Css cards --------------------------- */
            let container = document.querySelector("#container");

            pokemons.forEach(pokemon => {
                let cardContainer = document.createElement("div");
                    cardContainer.classList.add("card-container")

                let card = document.createElement("div")
                    card.classList.add("card")
                
                let cardImage = document.createElement("div");
                    cardImage.classList.add("card-image")
                let image = document.createElement("img")
                    image.setAttribute("src", pokemon.imageSrc)
                cardImage.appendChild(image)
                card.appendChild(cardImage)

                let cardText = document.createElement("div");
                    cardText.classList.add("card-text");
                let titleh3 = document.createElement("h3");
                    titleh3.innerText = pokemon.nom;
                cardText.appendChild(titleh3);

                let type = document.createElement("p");
                    type.innerText = pokemon.type;
                cardText.appendChild(type);

                card.appendChild(cardText);

                cardContainer.appendChild(card);
                container.appendChild(cardContainer);

                let btnContainer = document.createElement("div");
                    btnContainer.classList.add("btn-container")

                let btnM = document.createElement("button");
                    btnM.classList.add("btn");
                    btnM.classList.add("btn-secondary");
                    btnM.classList.add("btn-sm");
                    btnM.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';

                let linkM = document.createElement("a");
                    linkM.setAttribute("href", "/modify.html?id=" + pokemon._id)
                linkM.appendChild(btnM);

                btnContainer.appendChild(linkM);

                let btnD = document.createElement("button");
                    btnD.classList.add("btn");
                    btnD.classList.add("btn-danger");
                    btnD.classList.add("btn-sm");
                    btnD.classList.add("deleteBtn");
                    btnD.setAttribute("id", pokemon._id);
                    btnD.innerHTML = '<i class="fa-solid fa-trash"></i>';
                
                // let linkD = document.createElement("a");
                    // linkD.setAttribute("href", "/cartes/" + pokemon._id) 
                // linkD.appendChild(btnD)

                btnContainer.appendChild(btnD);

                cardContainer.appendChild(btnContainer);

            })
            /* ------------------------ end of forEach container ------------------------ */
    
            const btnD = document.querySelectorAll('.deleteBtn');

            btnD.forEach(btn => {
                btn.addEventListener('click', function(event) {
                    event.preventDefault(); 

                    const id = this.getAttribute('id'); 

                    const url = `/cartes/${id}`;
                    if (confirm("Etes-vous certain de supprimer cette carte ?")) {
                        fetch(url, {
                        method: "DELETE",
                        })
                        .then((response) => {
                            if (response.ok) {
                            console.log("Carte supprimée avec succès !");
                            window.location.reload();
                            } else {
                            console.error("Erreur lors de la suppression de la carte");
                            }
                        })
                        .catch((error) => {
                            console.error("Erreur lors de la suppression de la carte:", error);
                        });

                    }
                    
                });
            })

            

        }) ;
        /* ------------------------- end of .then() container ------------------------ */

        let dbz

        async function fetchDbz() {
            const res = await fetch("/cartes/dbz", {
                method: 'GET' 
            });
            dbz = await res.json();
            console.log("dbz cards :" ,dbz);
            }
        async function getDbz() {
            await fetchDbz();
        }

        getDbz().then(() => {
            let dbzContainer = document.querySelector("#dbz_container");

            dbz.forEach(db => {
                let cardContainer = document.createElement("div");
                    cardContainer.classList.add("card-container")

                let card = document.createElement("div")
                    card.classList.add("card")
                
                let cardImage = document.createElement("div");
                    cardImage.classList.add("card-image")
                let image = document.createElement("img")
                    image.setAttribute("src", db.imageSrc)
                cardImage.appendChild(image)
                card.appendChild(cardImage)

                let cardText = document.createElement("div");
                    cardText.classList.add("card-text");
                let titleh3 = document.createElement("h3");
                    titleh3.innerText = db.nom;
                cardText.appendChild(titleh3);

                let type = document.createElement("p");
                    type.innerText = db.type;
                cardText.appendChild(type);

                card.appendChild(cardText);

                cardContainer.appendChild(card);
                dbzContainer.appendChild(cardContainer);

                let btnContainer = document.createElement("div");
                    btnContainer.classList.add("btn-container")

                let btnM = document.createElement("button");
                    btnM.classList.add("btn");
                    btnM.classList.add("btn-secondary");
                    btnM.classList.add("btn-sm");
                    btnM.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';

                let linkM = document.createElement("a");
                    linkM.setAttribute("href", "/modify.html?id=" + db._id)
                linkM.appendChild(btnM);

                btnContainer.appendChild(linkM);

                let btnD = document.createElement("button");
                    btnD.classList.add("btn");
                    btnD.classList.add("btn-danger");
                    btnD.classList.add("btn-sm");
                    btnD.classList.add("deleteBtn");
                    btnD.setAttribute("id", db._id);
                    btnD.innerHTML = '<i class="fa-solid fa-trash"></i>';
                
                // let linkD = document.createElement("a");
                    // linkD.setAttribute("href", "/cartes/" + pokemon._id) 
                // linkD.appendChild(btnD)

                btnContainer.appendChild(btnD);

                cardContainer.appendChild(btnContainer);

            })
            /* ------------------------ end of forEach container ------------------------ */
    
            const btnD = document.querySelectorAll('.deleteBtn');

            btnD.forEach(btn => {
                btn.addEventListener('click', function(event) {
                    event.preventDefault(); 

                    const id = this.getAttribute('id'); 

                    const url = `/cartes/dbz/${id}`;
                    if (confirm("Etes-vous certain de supprimer cette carte ?")) {
                        fetch(url, {
                        method: "DELETE",
                        })
                        .then((response) => {
                            if (response.ok) {
                            console.log("Carte supprimée avec succès !");
                            window.location.reload();
                            } else {
                            console.error("Erreur lors de la suppression de la carte");
                            }
                        })
                        .catch((error) => {
                            console.error("Erreur lors de la suppression de la carte:", error);
                        });

                    }
                    
                });
            })

            

        })
    }
})