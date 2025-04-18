const form = document.querySelector("form");
const input = document.querySelector("input");

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

async function getPokemon(name) {
  const response = await fetch(BASE_URL + name);
  const data = await response.json();
  return data;
}

function storePokemon(pokemon){
    const name = pokemon.name;
    const weight = pokemon.weight;
    const height = pokemon.height;
    const types = pokemon.types.map(type => type.type.name).join(", ");
    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(", ");
    const id = pokemon.id;
    return { name, weight, height, types, abilities, id };    

}

form.addEventListener("submit", async (event)=>{
    event.preventDefault()
    const name = input.value;
    try {
        const data = await getPokemon(name)
        const pokemon = storePokemon(data);
            console.log(pokemon);



            const table = document.querySelector("table tbody");
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
        } catch (error) {
            console.error("Error fetching Pokemon:", error);
        }
       
    input.value = ""; // Clear the input field after submission
});
