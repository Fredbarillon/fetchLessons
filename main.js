const form1 = document.querySelector("#form1");
const form2 = document.querySelector("#form2");
const inputName = document.querySelector("#name");
const inputId = document.querySelector("#id");
const list = document.querySelector("#generationList");
const BASE_URL = "https://pokeapi.co/api/v2/";

let targetPokemon = null;

async function getPokemon(name) {
  const response = await fetch(BASE_URL + "pokemon/" + name);
  const data = await response.json();
  return data;
}

async function getPokemonById(id) {
  const response = await fetch(BASE_URL + "pokemon/" + id);
  const data = await response.json();
  return data;
}

async function getClosestPokemon(id, order) {
            const response = await fetch(BASE_URL + "pokemon/" + (id + order));
            const data = await response.json();
            return data;
}

async function getGeneration() {
    const response = await fetch(BASE_URL + "generation");
    const data = await response.json();
    // console.log(data);
    return data;
    
}
 
const selectOtherPokemon = ()=> {
    const previous = document.querySelector("#btnPrevious");
    const next = document.querySelector("#btnNext");
    previous.addEventListener("click", async () => { 
        if (targetPokemon.id > 1) {
            
            try {
                
                const order =-1;
                const data = await getClosestPokemon(targetPokemon.id, order);
                targetPokemon = storedPokemon(data);
                // console.log("previous:",targetPokemon);
            }catch (error) {
                console.error("Error fetching Pokemon :", error.message);
            }   
        }
    })

    next.addEventListener("click", async () => { 
        if (targetPokemon.id < 1025 ) {
            
            try {
                const order = 1;
                const data = await getClosestPokemon(targetPokemon.id, order);
                targetPokemon = storedPokemon(data);
                // console.log("next", targetPokemon);
            }catch (error) {
                console.error("Error fetching Pokemon :", error.message);
            }   
        }
    })
}

function storedPokemon(pokemon) {
  const name = pokemon.name;
  const weight = pokemon.weight;
  const height = pokemon.height;
  const types = pokemon.types.map(type => type.type.name).join(", ");
  const abilities = pokemon.abilities.map(ability => ability.ability.name).join(", ");
  const id = pokemon.id;
  targetPokemon = { name, weight, height, types, abilities, id };
  displayPokemon(targetPokemon);
  return targetPokemon
}

const displayPokemon = (pokemon) => {
    const table = document.querySelector("#tableBody2");
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${pokemon.id}</td>
    <td>${pokemon.name}</td>
    <td>${pokemon.weight}</td>
    <td>${pokemon.height}</td>
    <td>${pokemon.types}</td>
    <td>${pokemon.abilities}</td>
    `;
    table.appendChild(tr);
}

const displayList = async () => {
    const data= await getGeneration();
    const generationList = data.results;
    console.log(generationList);
    generationList.forEach((generation) => {
        const option = document.createElement("option");
        let i = 0;
        option.value = i++;
        option.textContent = generation.name;
        list.appendChild(option);
    });
}
displayList();

const findPokemonByName = ()=> {
    form1.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = inputName.value;
        if (name !== "") {
            try {
                const data = await getPokemon(name);
                targetPokemon = storedPokemon(data);
                // console.log(targetPokemon);   
            } catch (error) {
                console.error("Error fetching Pokemon :", error.message);
            }
            inputName.value = "";
        }
    })
}
    
const findPokemonById = () => {
    form2.addEventListener("submit", async (event) => {
        event.preventDefault();
        const id = inputId.value;
        if (id !== "") {
            try {
                const data = await getPokemonById(id);
                targetPokemon = storedPokemon(data);
                // console.log(targetPokemon);   
            } catch (error) {
                console.error("Error fetching Pokemon :", error.message);
            }
            inputId.value = "";
        }
    })
}
findPokemonByName();
findPokemonById();
selectOtherPokemon();
getGeneration();

// Il devra être possible de pouvoir accéder à la liste des pokédex de génération, d'en sélectionner un pour ensuite se voir proposer directement les pokémon de cette génération
list.addEventListener("click", async (event) => {
    // const generationId = event.target.value;
    // if (generationId) {
    //     try {
    //         const response = await fetch(BASE_URL + "generation/" + generationId);
    //         const data = await response.json();
    //         console.log(data);
    //         // targetPokemon = storedGeneration(data);
    //     } catch (error) {
    //         console.error("Error fetching Generation :", error.message);
    //     }
    // }
})

// const generation = [];
// function storedGeneration(generation) {
//     const generation = pokemon.name;
//     const weight = pokemon.weight;
//     const height = pokemon.height;
//     const types = pokemon.types.map(type => type.type.name).join(", ");
//     const abilities = pokemon.abilities.map(ability => ability.ability.name).join(", ");
//     const id = pokemon.id;
//     targetPokemon = { name, weight, height, types, abilities, id };
//     displayPokemon(targetPokemon);
//     return targetPokemon
//   }