let myApp = document.querySelector('#App');

const divPokemon = document.getElementById('ID__Pokemon');

const api_talent = "https://pokeapi.co/api/v2/ability/?limit=266&offset=0";
const api_pokemon = "https://pokeapi.co/api/v2/pokemon/";



const pokemonRandom = async () => {
    removePokemons();
    const response = await fetch("./pokemon_fr.json");
    const data = await response.json();
    // console.log(data);
    var talent_fr = [];
    var url = [];
    var talent_en = [];

    for (const item in data) {
        talent_fr.push(item);
        url.push(data[item][1]);
        talent_en.push(data[item][0]);


    }
    var nb_talents = Object.keys(talent_fr).length;
    // génération d'un nombre compris entre 0 et le nombre de talents
    numero_talent = Math.floor(Math.random() * nb_talents);
    // on va prendre ce numero comme index de la liste des urls des talents
    var url_talent = url[numero_talent];
    // console.log(talent_fr[numero_talent]);
    // console.log(urlTalent);
    let counter = -1;


    const i = setInterval(function () {
        counter++;

        // on va changer de talent jusqu'à ce que le compteur tombe sur le même numero de talent
        // cela va créer une petite animation où le texte change en interval 

        document.getElementById("talent_en").innerHTML = talent_en[counter];
        document.getElementById("talent_fr").innerHTML = talent_fr[counter];
        // console.log(counter);

        if (counter === numero_talent) {
            clearInterval(i);
            const pokemons_desc = async () => {
                var poke_desc = await pokemonDesc(url_talent);

                document.getElementById("description").innerHTML = poke_desc[0];
                var pokemons = poke_desc[2];
                for (let index = 0; index < pokemons.length; index++) {
                    const poke_card = pokemons[index];
                    // console.log(poke_card);

                    await creationPokes(poke_card);

                }
                exception();
            }
            pokemons_desc();
        }
    }, 10);


};



const pokemonAbilities2 = async () => {
    const response = await fetch(api_talent);
    const data = await response.json();


    var all = [];
    for (const item in data.results) {
        all.push(data.results[item]);
        // let talent = data.results[item]
        // tableau.push(talent.name);
        // tableauDesc.push(talent.url);
    }
    // var nbTalents = Object.keys(tableau).length;
    return await all;
}




random.onclick = () => {
    divPokemon.innerHTML = '';
    removePokemons();
    pokemonRandom();

}

var Recherche = "";
let input = document.getElementById("cherche");

async function displayNames(value) {

    removeTalents();
    removePokemons();
    nom_et_url = value.split(',');
    // console.log(value);
    input.value = nom_et_url[0];
    document.getElementById("talent_en").innerHTML = nom_et_url[1];

    var poke_talent_desc = await pokemonDesc(nom_et_url[2]);
    // console.log(poke_talent_desc);
    document.getElementById("description").innerHTML = poke_talent_desc[0];
    document.getElementById("talent_fr").innerHTML = poke_talent_desc[1];


    var nom_poke = poke_talent_desc[2];
    for (let index = 0; index < nom_poke.length; index++) {
        const poke_card = nom_poke[index];

        await creationPokes(poke_card);

    }
    exception();
}



// async function DictionnaireFrançais() {
//     var nom_et_url = await pokemonAbilities2();
//     var nom_url = new Map();
//     var fr = new Map();
//     var tout = new Map();
//     var test = [];
//     compte=0;
//     for (let index = 0; index < nom_et_url.length; index++) {
//         nom_url.set(nom_et_url[index].name, nom_et_url[index].url);
//     }


//     for (var [key, value] of nom_url) {
//         const response = await fetch(value);
//         const data = await response.json();

//         // console.log(key);

//         if (key == data.name) {
//             // console.log("pareil", value[0]);

//             test.push(data.pokemon);


//         }

//         for (const item in data.names) {

//             if (data.names[item]["language"].name == "fr") {
//                 fr.set(data.names[item].name, [key, value,test[compte]]);
//                 compte++;
//             }
//         }
//     }
//     // console.log(nom_et_url);
//     // console.log(nom_url);
//     // console.log(fr);
//     // console.log(test);
//     // console.log(tout);
//     // // console.log(pokemons);
//     // // console.log(fr);


//         console.dir(fr);
//         const obj = Object.fromEntries(fr);
//         console.log(obj)

//         var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
//         var downloadAnchorNode = document.createElement('a');
//         downloadAnchorNode.setAttribute("href", dataStr);
//         downloadAnchorNode.setAttribute("download", "pokemon_fr.json");
//         document.body.appendChild(downloadAnchorNode); // required for firefox
//         downloadAnchorNode.click();
//         downloadAnchorNode.remove();
// }
// DictionnaireFrançais();

async function autoComplete() {


    document.addEventListener("keyup", async (e) => {
        // console.log(e.key);
        removeTalents();
        removePokemons();
        const response = await fetch("./pokemon_fr.json");
        const data = await response.json();
        // console.log(data);

        for (const item in data) {
            talent_fr = item;
            url = data[item][1];
            talent_en = data[item][0];


            if (
                (talent_fr.toLowerCase().startsWith(input.value.toLowerCase()) &&
                    input.value != "")
            ) {
                //create li element
                let listItem = document.createElement("li");
                //One common class name
                listItem.classList.add("list-items");
                listItem.style.cursor = "pointer";
                listItem.setAttribute("onclick", "displayNames('" + [talent_fr, talent_en, url] + "')");
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


    if (event.key === 'Enter') {
        removePokemons();
        divPokemon.innerHTML = '';
        Recherche = ele.value;
        const response = await fetch("./pokemon_fr.json");
        const data = await response.json();
        // console.log(data);

        for (const item in data) {
            var talent_fr=item;
            var url=data[item][1];
            var talent_en=data[item][0];
            var poke_talent_desc = await pokemonDesc(url);
            var desc_fr = poke_talent_desc[0];
            var nom_poke = poke_talent_desc[2];

            if ((talent_en.toLowerCase() == Recherche.toLowerCase()) || talent_fr.toLowerCase() == Recherche.toLowerCase()) {
                document.getElementById("talent_en").innerHTML = talent_en;
                document.getElementById("talent_fr").innerHTML = talent_fr;
                document.getElementById("description").innerHTML = desc_fr;

                for (let index = 0; index < nom_poke.length; index++) {
                    const poke_card = nom_poke[index];

                    await creationPokes(poke_card);
                }
            }
        }

    }
    removeTalents();

    exception();


}






