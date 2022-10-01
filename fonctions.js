const pokemonDesc = async (urlTalent) => {
    const response = await fetch(urlTalent);
    const data = await response.json();

    var desc = "";
    talent_fr = "";
    var nomPokes = [];

    for (const item in data.flavor_text_entries) {
        if (data.flavor_text_entries[item]["language"].name == "fr" && data.flavor_text_entries[item]["version_group"].name == "sword-shield") {
            // document.getElementById("description").innerHTML = data.flavor_text_entries[item].flavor_text;
            desc = data.flavor_text_entries[item].flavor_text;
        }

    }
    for (const item in data.names) {
        if (data.names[item]["language"].name == "fr") {
            talent_fr = data.names[item].name;
        }

    }

    for (const elem in data.pokemon) {
        nomPokes.push(data.pokemon[elem]["pokemon"].name);


        // let newPokemon = document.createElement("h4");

    }

    return await [desc, talent_fr, nomPokes];
}

const pokemonFR = async (nomPoke) => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + nomPoke);
    const data = await response.json();
    var nomFR = [];
    for (const item in data.names) {
        let pokemonFR = data.names[item]["language"];
        if (pokemonFR.name == "fr") {
            nomFR.push(data.names[item].name);
        }

    }
    return await nomFR;
}


async function spritePokemon(new_sprite, nom_poke) {
    var pokemon = api_pokemon + nom_poke;
    const response = await fetch(pokemon);
    const data = await response.json();
    sprite = data["sprites"]["other"]["official-artwork"].front_default;

    new_sprite.src = sprite;

}

async function creationPokes(poke_card){
    let card = document.createElement("div");
    card.classList.add("list-pokemons");
    card.classList.add("card");
    card.classList.add("col-lg-2");
    card.classList.add("col-md-3");
    card.classList.add("col-sm-7");
    card.classList.add("col-8");
    card.classList.add("p-0");
    card.classList.add("m-2");
    card.classList.add("bg-light");
    card.classList.add("bg-opacity-25");
    let newPokemon = document.createElement("div");
    newPokemon.classList.add("card-header");

    newPokemon.classList.add("text-center");

    card.setAttribute("id", poke_card);

    var regex = /-(.*)/;
    nomPoke2 = poke_card;
    var suffixePoke = "";
    // console.log(poke_card);

    if (poke_card.includes("tapu") || poke_card.includes("nidoran-f") || poke_card.includes("nidoran-m")) {
        // console.log(poke_card);

    }
    else if (poke_card.match(regex)) {
        var reg = nomPoke2.match(regex);
        suffixePoke = reg[1];

        nomPoke2 = poke_card.replace(regex, "");
    }

    var nom_fr = await pokemonFR(nomPoke2);


    let new_sprite = document.createElement("img");

    new_sprite.src = spritePokemon(new_sprite, poke_card);

    newPokemon.innerHTML += nom_fr;



    let lien = document.createElement("a");

    lien.href = "https://www.pokepedia.fr/" + nom_fr

    lien.target = "_blank";


    new_sprite.classList.add("card-img-bottom");

    divPokemon.appendChild(card);
    card.appendChild(newPokemon);
    card.appendChild(lien);
    lien.appendChild(new_sprite);

    
    
}

async function removeTalents() {
    //clear all the item
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
        item.remove();
    });
}
async function removePokemons() {

    let pokemons = document.querySelectorAll(".list-pokemons");
    pokemons.forEach((item) => {
        item.remove();
    });

}

function exception(){
    var regex = /-(.*)/;
    var suffixePoke = "";
    var blacklist = ["-origin","totem", "gorging", "gulping", "starter", "female", "male", "eternal", "small", "large", "super", "cosplay","busted"];
    var forms = ["-mega", "-gmax", "-hisui", "-alola", "galar"];
    let pokemons = document.querySelectorAll(".list-pokemons");
    // console.log(pokemons);
    pokemons.forEach((item) => {
        for (let index = 0; index < blacklist.length; index++) {
            const element = blacklist[index];
            // console.log(element);
            if (item.outerHTML.includes(element)) {
                item.remove();
            }

        }
        for (let index = 0; index < forms.length; index++) {
            const element = forms[index];

            if (item.outerHTML.includes(element)) {
                var nom = item.id;
                // console.log(nom);
                var reg = nom.match(regex);
                suffixePoke = reg[1];
                item.children[0].innerHTML = suffixePoke + " " + item.children[0].innerHTML;
            }
        }
    });
}
