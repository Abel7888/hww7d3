const pokemonName = document.querySelector('.the_pname');
const pokemonNumber = document.querySelector('.poki__num');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};
// pokemon data link for abiltites and types
//const abilitiesObject = pokemon.abilities
//for (let x = 0; x <= abilitiesObject.length-1; x ++) {
    //const abilityItem = document.createElement('li');
    //const abilityUrl = document.createElement('a');
      //abilityItem.classList.add('pokemon-ability')
      //abilityItem.innerHTML = abilitiesObject[x].ability.name;
      //abilityUrl.innerHTML = ' - see ability';
      //abilityUrl.href = abilitiesObject[x].ability.url;
      //abilityList.appendChild(abilityItem); 
      //abilityItem.appendChild(abilityUrl);                }

//const typesObject = pokemon.types
  //for (let x = 0; x <= typesObject.length-1; x ++) {
    //const typeItem = document.createElement('li');
      //typeItem.classList.add('pokemon-ability')
      //typeItem.innerHTML = typesObject[x].type.name;
      //typeList.appendChild(typeItem);     }})});


const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}


form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);