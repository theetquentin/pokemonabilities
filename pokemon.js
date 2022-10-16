let myApp = document.querySelector('#App');

const divPokemon = document.getElementById('ID__Pokemon');


const api_talent = "https://pokeapi.co/api/v2/ability/?limit=266&offset=0";
const api_pokemon = "https://pokeapi.co/api/v2/pokemon/";

let bool = true;
let boolKey = true;

const pokemonRandom = async () => {


    const response = await fetch("./pokemon_tout.json");
    const data = await response.json();
    // console.log(data);
    var talent_fr = [];
    var url = [];
    var talent_en = [];
    var pokemons = [];

    for (const item in data) {
        talent_fr.push(item);
        url.push(data[item][1]);
        talent_en.push(data[item][0]);
        pokemons.push(data[item][2])


    }
    // console.log(pokemons);

    var nb_talents = talent_fr.length;
    // génération d'un nombre compris entre 0 et le nombre de talents
    let numero_talent = Math.floor(Math.random() * nb_talents);


    for (let index = 0; index < talent_fr.length; index++) {
        // console.log(index);

        if (index === numero_talent) {
            document.getElementById("talent_en").innerHTML = talent_en[index];
            document.getElementById("talent_fr").innerHTML = talent_fr[index];
            var url_talent = url[index];

            // console.log(url_talent);


            var poke_desc = await pokemonDesc(url_talent);


            document.getElementById("description").innerHTML = poke_desc[0];

            const value = pokemons[index];

            const promises = value.map(async pokemon => {
                // console.log(pokemon);
                // console.log(pokemon.pokemon);
                var poke_card = pokemon.pokemon.name;
                var url = pokemon.pokemon.url;
                return creationPokes(poke_card, url);
            });
            return Promise.all(promises).then(() => {
                exception();
                return 'Ok';
            });

        }
    }
};


document.getElementById('random').addEventListener('click', () => {

    if (!bool) return;

    bool = false;

    removePokemons().then(() => {
        pokemonRandom().then(() => bool = true).catch(() => bool = true);
    });

});

var Recherche = "";


async function displayNames(value) {

    removeTalents();
    removePokemons();
    let nom_et_url = value.split('$$$');
    // console.log(value);
    input.value = nom_et_url[0];
    document.getElementById("talent_en").innerHTML = nom_et_url[1];


    const pokemons = JSON.parse(nom_et_url[3]);
    console.log(pokemons);
    var poke_talent_desc = await pokemonDesc(nom_et_url[2]);
    // console.log(poke_talent_desc);
    document.getElementById("description").innerHTML = poke_talent_desc[0];
    document.getElementById("talent_fr").innerHTML = poke_talent_desc[1];


    // var nom_poke = poke_talent_desc[2];
    for (let index = 0; index < pokemons.length; index++) {
        const poke_card = pokemons[index].pokemon.name;
        // console.log(poke_card);
        // console.log(pokemons[index].pokemon.url)
        const poke_url = pokemons[index].pokemon.url;
        await creationPokes(poke_card, poke_url);

    }
    exception();
}

async function autoComplete() {

    document.addEventListener("keyup", async (e) => {
        // console.log(e.key);
        removeTalents();

        const response = await fetch("./pokemon_tout.json");
        const data = await response.json();
        // console.log(data);

        for (const item in data) {
            talent_fr = item;
            url = data[item][1];
            talent_en = data[item][0];
            pokemon = data[item][2];


            if (
                (talent_fr.toLowerCase().startsWith(input.value.toLowerCase()) &&
                    input.value != "")
            ) {
                //create li element
                let listItem = document.createElement("li");
                //One common class name
                listItem.classList.add("list-items");
                listItem.classList.add("list-white");
                if(jour==false) listItem.classList.replace("list-white","list-black");
                listItem.style.cursor = "pointer";
                listItem.setAttribute("onclick", "displayNames('" + [talent_fr, talent_en, url, JSON.stringify(pokemon)].join('$$$') + "')");
                //Display matched part in bold
                let word = "<b>" + talent_fr.substr(0, input.value.length) + "</b>";
                word += talent_fr.substr(input.value.length);
                //display the value in array
                listItem.innerHTML = word;
                document.querySelector(".list").appendChild(listItem);

            }
        }


    });

}

autoComplete();


async function search(ele) {

    if (event.key === 'Enter' && boolKey) {
        boolKey = false;
        removePokemons();
        divPokemon.innerHTML = '';
        Recherche = ele.value;
        const response = await fetch("./pokemon_tout.json");
        const data = await response.json();
        // console.log(data);

        for (const item in data) {
            var talent_fr = item;
            var url = data[item][1];
            var talent_en = data[item][0];
            var poke_talent_desc = await pokemonDesc(url);
            var desc_fr = poke_talent_desc[0];
            var nom_poke = poke_talent_desc[2];
            var pokemons = data[item][2];

            if ((talent_en.toLowerCase() == Recherche.toLowerCase()) || talent_fr.toLowerCase() == Recherche.toLowerCase()) {
                document.getElementById("talent_en").innerHTML = talent_en;
                document.getElementById("talent_fr").innerHTML = talent_fr;
                document.getElementById("description").innerHTML = desc_fr;

                for (let index = 0; index < pokemons.length; index++) {
                    await creationPokes(pokemons[index].pokemon.name, pokemons[index].pokemon.url);
                }

                exception();

                removeTalents();

                boolKey = true;
            }
        }

    }


}






