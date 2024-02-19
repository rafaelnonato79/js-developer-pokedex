const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {

    return `
        <li class="pokemon ${pokemon.type}" onclick="mostrarDialogo(event)" type="button">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
       
    `
    
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function fecharDialogo() {
    const dialog = document.getElementById('dialogo');   
    dialog.close();
}

function mostrarDialogo(event) {
    const pokemonName = event.currentTarget.querySelector('.name').textContent;
    const pokemonNumber = event.currentTarget.querySelector('.number').textContent;
    const pokemonTypes = event.currentTarget.querySelectorAll('.types li');
    const pokemonPhoto = event.currentTarget.querySelector('.detail img').src;

    


    const dialog = document.getElementById('dialogo');
    const dialogPokemonName = dialog.querySelector('.pokemonName');
    const dialogPokemonNumber = dialog.querySelector('.pokemonNumber');
    const dialogPokemonTypes = dialog.querySelector('.pokemonTypes');
    const dialogPokemonPhoto = dialog.querySelector('.pokemonPhoto');

     // Limpar qualquer conteúdo anterior
     dialogPokemonTypes.innerHTML = '';

    // Exibir o nome do Pokémon no diálogo
    dialogPokemonName.textContent = pokemonName;
    dialogPokemonNumber.textContent = pokemonNumber;
    dialogPokemonPhoto.src = pokemonPhoto;
    pokemonTypes.forEach((type) => {
        const li = document.createElement('li');
        li.textContent = type.textContent;
        dialogPokemonTypes.appendChild(li);
    });

    dialog.showModal();
}

