const form1 = document.querySelector("#form1");
const form2 = document.querySelector("#form2");
const inputName = document.querySelector("#name");
const inputId = document.querySelector("#id");

const BASE_URL = "https://pokeapi.co/api/v2/";

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

async function getClosestPokemon(pokemon, order) {
            const response = await fetch(BASE_URL + "pokemon/" + (pokemon.id + order));
            const data = await response.json();
            return data;
}
 
const selectPokemon = (pokemon)=> {
    const pokemon = pokemon
    const previous = document.querySelector("#btnPrevious");
    const next = document.querySelector("#btnNext");
    previous.addEventListener("click", async () => { 
        try {
            const order =-1;
            const data = await getClosestPokemon(pokemon, order);
            const pokemon = storePokemon(data);
            console.log(pokemon);
        }catch (error) {
            console.error("Error fetching Pokemon :", error.message);
        }   
    })
    next.addEventListener("click", async () => { 
        try {
            const order = 1;
            const data = await getClosestPokemon(order);
            const pokemon = storePokemon(data);
            console.log(pokemon);
        }catch (error) {
            console.error("Error fetching Pokemon :", error.message);
        }   
    })
}

function storePokemon(pokemon) {
  const name = pokemon.name;
  const weight = pokemon.weight;
  const height = pokemon.height;
  const types = pokemon.types.map(type => type.type.name).join(", ");
  const abilities = pokemon.abilities.map(ability => ability.ability.name).join(", ");
  const id = pokemon.id;
  displayPokemon(pokemon);
  selectPokemon(pokemon);
  return { name, weight, height, types, abilities, id };
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

const findPokemonByName = ()=> {
    form1.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = inputName.value;
        if (name !== "") {
            try {
                const data = await getPokemon(name);
                const pokemon = storePokemon(data);
                console.log(pokemon);
                
                
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
                const pokemon = storePokemon(data);
                console.log(pokemon);
                
                
            } catch (error) {
                console.error("Error fetching Pokemon :", error.message);
            }
            inputId.value = "";
        }
    })
}
findPokemonByName();
findPokemonById();