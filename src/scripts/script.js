//API endpoint --------------------------------------------
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

//Get Elements --------------------------------------------
const searchInput = getElement('.search-input'),
      searchButton = getElement('.search-button'),
      container = getElement('.container'),
      errorMessage = getElement('.error');

var pokeName, // Name or ID searched
    pokemon, // Receives the data returned from the API
    card; // HTML returned

    
// Request Function --------------------------------------------
// This fuction reduce the code for get the HTML Elements
function getElement(element){
    return document.querySelector(element);
}

function requestPokeInfo(url, name){
    fetch(url + name)
        .then(response => response.json())
        .then(data => {
            pokemon = data;
        })
        .catch(err => console.log(err));
}

// This function build the HTML showed;
function createCard () {
    card = `
      <div class="pokemon-picture">
        <img src="${pokemon.sprites.front_default}" alt="Sprite of ${pokemon.name}">
      </div>
      <div class="pokemon-info">
          <h1 class="name">Name: ${pokemon.name}</h1>
          <h2 class="number">Nº ${pokemon.id}</h2>
          <h3 class="type">Type: ${pokemon.types.map(item => ' ' + item.type.name).toString()}</h3>
          <h3 class="skill">Skills: ${pokemon.moves.map(item => ' ' + item.move.name).toString()}</h3>
          <h3 class="weight">Weight: ${pokemon.weight  / 10}kg</h3>
          <h3 class="height">Height: ${pokemon.height  / 10}m</h3>
      </div>`;
    return card;
  }

// This will start de app and call the methods;
function startApp(pokeName){
    requestPokeInfo(baseUrl, pokeName);

    // The function 'createCard()' will only start 2 seconds after the startApp function execution; 
    setTimeout(function(){
        if (pokemon.detail){
            errorMessage.style.display = 'block';
            container.style.display = 'none';
        }else{
            errorMessage.style.display = 'none';
            container.style.display = 'flex';
            container.innerHTML = createCard();
        }
    }, 2000)
}


searchButton.addEventListener('click', event => {
    event.preventDefault();
    pokeName = searchInput.value.toLowerCase();
    startApp(pokeName);
    container.classList.add('fade');

    setTimeout(() => {
        container.classList.remove('fade');
    }, 3000);
});