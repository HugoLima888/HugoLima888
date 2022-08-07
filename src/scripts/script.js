//API endpoint --------------------------------------------
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

//Get Elements --------------------------------------------
const getElement = document.querySelector.bind(document);
const searchInput = getElement('.search-input'),
      searchButton = getElement('.search-button'),
      container = getElement('.pokemon'),
      erroMessage = getElement('.error'); 

var pokeName, // Name or ID searched
    pokemon, // Receives the data returned from the API
    card; // HTML returned

//Functions ----------------------------------------------------
    
// Request Function --------------------------------------------
async function requestPokeInfo(url, name){
    await fetch(url + name)
        .then(response => response.json())
        .then(data => {
            pokemon = data;
        })
        .catch(err => console.log(err));
}

// This function build the HTML showed --------------------------------------------
function createCard () {
    card = `
      <div class="pokemon-picture">
        <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
      </div>
      <div class="pokemon-info">
          <h1 class="name">${pokemon.name}</h1>
          <font class="number">Nº ${pokemon.id} - Type: ${pokemon.types.map(item => ' ' + item.type.name).toString()}</font>
          <h3 class="skill">Skills: ${pokemon.moves.map(item => ' ' + item.move.name).toString()}</h3>
          <h3 class="weight">Weight: ${pokemon.weight  / 10}kg</h3>
          <h3 class="height">Height: ${pokemon.height  / 10}m</h3>
      </div>`;
    return card;
  }

// This will start de app and call the methods -------------------------------------------------------
async function startApp(pokeName){
    await requestPokeInfo(baseUrl, pokeName);

    if (pokemon.detail){
        erroMessage.style.display = 'block';
        container.style.display = 'none';
    }else{
        erroMessage.style.display = 'none';
        container.style.display = 'flex';
        container.innerHTML = createCard();
    }
}

//Add Events -----------------------------------------------------------------------------------------
searchButton.addEventListener('click', event => {
    event.preventDefault();
    pokeName = searchInput.value.toLowerCase();
    searchInput.value = '';
    startApp(pokeName);
    container.classList.add('fade');

    // Reset the fade efecct - remove the fade class--------------------------------------------------
    setTimeout(() => {
        container.classList.remove('fade');
    }, 2000);
});
