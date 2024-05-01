document.addEventListener("DOMContentLoaded", () => {
    const modifyContainer = document.querySelector(".modify-container")
    
    if(modifyContainer) {
        console.log("script modify chargé")

        let pokemon

        async function fetchPokemon(id) {
            const res = await fetch(`/cartes/${id}`, {
                method: 'GET' 
            });
            pokemon = await res.json();
            console.log(pokemon);
            }
        async function getPokemons() {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');
            await fetchPokemon(id);
        }

        getPokemons().then(() => {
            let inputId = document.querySelector("#id")
                inputId.value = pokemon._id

            let inputNom = document.querySelector("#nom")
                inputNom.value = pokemon.nom

            let inputType = document.querySelector("#type")
                inputType.value = pokemon.type

            let inputImage = document.querySelector("#imageSrc")
                inputImage.value = pokemon.imageSrc;



           const form = document.getElementById("modifyForm");
           const id = document.getElementById("id").value;

           form.addEventListener("submit", function (event) {
             event.preventDefault();

            const nom = document.getElementById("nom").value;
            const type = document.getElementById("type").value;
            const imageSrc = document.getElementById("imageSrc").value;

            const data = {
                    nom: nom,
                    type: type,
                    imageSrc: imageSrc
                    };

             const url = `/cartes/${id}`;

            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(data) // 
            })
            .then(response => {
                if (response.ok) {
                    console.log('Carte modifiée avec succès !');
                    window.location.href = '/';

                } else {
                    console.error('Erreur lors de la modification de la carte');
                }
            })
            .catch(error => {
                console.error('Erreur lors de la modification de la carte:', error);
            });

           });     

        })


        



    };


});
