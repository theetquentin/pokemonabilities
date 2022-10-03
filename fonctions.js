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
    var nomFR = [];
    // console.log(nomPoke);
    if (nomPoke.includes("mr-mime-galar")) {
        nomFR = "M. Mime de Galar";
    }
    else {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + nomPoke);
        const data = await response.json();

        for (const item in data.names) {
            let pokemonFR = data.names[item]["language"];
            if (pokemonFR.name == "fr") {
                nomFR.push(data.names[item].name);
            }

        }
    }

    return await nomFR;
}


async function spritePokemon(url) {
    // var pokemon = api_pokemon + nom_poke;
    const response = await fetch(url);
    const data = await response.json();
    sprite = data["sprites"]["other"]["official-artwork"].front_default;

    return sprite;

}



async function creationPokes(poke_card, url) {
    //creation de la card
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


    // on rajoute un id avec le nom du pokemon en anglais 
    // pour supprimer les éléments gênants plus tard
    card.setAttribute("id", poke_card);

    var regex = /-(.*)/;
    var regex2 = /-(.*)-(.*)/;
    pas_suffixe_prefixe = poke_card;
    var suffixePoke = "";


    if (poke_card.includes("ho-oh") || poke_card.includes("mr-") || poke_card.includes("mime") || poke_card.includes("tapu") || poke_card.includes("nidoran-f") || poke_card.includes("nidoran-m")) {
        // certains pokémons ont des '-' dans leurs noms, ce ne sont pas des suffixes, 
        // si on les enlèves il n'y aura pas tout le nom donc le fetch produira une erreur.
    }
    else if (poke_card.match(regex)) {
        //on enlève le suffixe de chaque pokémon, comme les formes, méga évolution...
        var reg = pas_suffixe_prefixe.match(regex);
        suffixePoke = reg[1];
        // on stock dans une autre variable pour avoir le nom sans forme en français
        pas_suffixe_prefixe = poke_card.replace(regex, "");
    }

    var nom_fr = await pokemonFR(pas_suffixe_prefixe);



    // s'il y a une forme, on vérifie avec le nom anglais 
    // pour rajouter avec les différentes url compatible avec pokepedia
    if (poke_card.includes("alola")) {
        nom_fr = nom_fr + " d'Alola";
    }

    if (poke_card.includes("-primal")) {
        nom_fr = "Primo-" + nom_fr
    }

    if (poke_card.includes("gmax")) {
        nom_fr = nom_fr + " Gigamax";
    }
    if (poke_card.includes("-mega-")) {
        var reg = poke_card.match(regex2)
        // deux formes de méga x ou y, on doit les mettre en majuscule
        // pour que l'url pokepedia fonctionne
        prefixePoke = reg[2].toUpperCase()

        nom_fr = "Méga-" + nom_fr + " " + preffixePoke;

    }
    else if (poke_card.includes("-mega")) {
        nom_fr = "Méga-" + nom_fr;
    }


    if(poke_card.includes("mr-mime-galar")){

    }
    else if (poke_card.includes("galar") || poke_card.includes("hisui")) {
        var reg = poke_card.match(regex);
        // on va mettre en majuscule la première lettre de galar ou hisui
        suffixePoke = reg[1].charAt(0).toUpperCase() + reg[1].slice(1);

        nom_fr = nom_fr + " de " + suffixePoke;
    }

    let sprite = await spritePokemon(url);


    card.innerHTML = `<div class="card-header text-center">${nom_fr}</div>
    <a href="https://www.pokepedia.fr/${nom_fr}" target="_blank"><img src="${sprite}" class="card-img-bottom"></a>`


    divPokemon.appendChild(card);

    return Promise.resolve();

}

async function removeTalents() {
    //clear all the item
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
        item.remove();
    });
}
async function removePokemons() {

    return new Promise(resolve => {
        let list_pokemons = document.querySelectorAll(".list-pokemons");
        const lengthCopy = list_pokemons.length - 1;
        if (lengthCopy <= 0) resolve('ok');
        // while(list_pokemons.length>0){
        //     list_pokemons[0].remove();
        // }

        list_pokemons.forEach((item, index) => {
            item.remove();
            if (index === lengthCopy)
                resolve('ok');
        });
    })

}

function exception() {

    var blacklist = ["minior", "-defense", "-attack", "-speed", "-eternamax", "-origin", "totem", "gorging", "gulping", "starter", "female", "male", "eternal", "small", "large", "super", "cosplay", "busted"];
    let list_pokemons = document.querySelectorAll(".list-pokemons");
    // console.log(pokemons);
    list_pokemons.forEach((item) => {
        for (let index = 0; index < blacklist.length; index++) {
            const element = blacklist[index];
            // console.log(element);
            if (item.outerHTML.includes("minior-red")) {

            }
            else if (item.outerHTML.includes(element)) {
                item.remove();
            }
        }
    });
}
