"use strict";

const selection = document.querySelector(".js_selection_list");
const inputSearch = document.querySelector(".js_input");
const buttonSearch = document.querySelector(".js_search"); // no se si va el puesto o este: js_input - hay que poner un escuchador para que el boton buscar me de el resultado que busco.
const favoriteList = document.querySelector(".js_favorite");
const errorImg = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";

let data = []; //array donde guardar mis datos de las series
let favorites = [];

function fetchFunction() {
  fetch(`https://api.jikan.moe/v3/search/anime?q=${inputSearch.value}`)
    .then((response) => response.json())
    .then((dataFromApi) => {
      data = dataFromApi.results;
      renderAllSection(); //fuera de la funcion se ejecuta cuando se carga la pagina, así solo se ejecuta cuando me responda el servidor.
    });
}

function renderSection(dataSerie) {
  // funcion que me pinta, como si estuviera en HTML, los datos que necesito que aparezcan en pantalla
  if (data.image_url === null) {
    selection.innerHTML += `
            <li class="js_add_serie data-id="${dataSerie.mal_id}">
            <img
            class="js_img" 
            src="${errorImg}" 
            alt="Anime:${dataSerie.title}"/>
            <h2 class="title">${dataSerie.title}</h2>
            </li>`;
  } else {
    selection.innerHTML += `
            <li class="js_add_serie data-id="${dataSerie.mal_id}">
            <img
            class="js_img" 
            src="${dataSerie.image_url}" 
            alt="Anime:${dataSerie.title}"/>
            <h2 class="title">${dataSerie.title}</h2>
            </li>`;
  }
}
/*Recorro el array con un bucle - const, bucle y listener para escuchar el click a favorites */
function renderAllSection() {
  selection.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    renderSection(data[i]);
  }
  const seriesLists = document.querySelectorAll(".js_add_serie");
  for (const eachseriesList of seriesLists) {
    eachseriesList.addEventListener("click", handleSearchSerie);
}
}

function handleSearchSerie(e) {
  const selectedSerieID = e.currentTarget.dataset.id;
  const selectedSerieData = data.find((row) => row.mal_id === selectedSerieID); // busca en cada fila de data una cuyo nombre sea = a mi vble y me devuelve el objeto con toda esa fila y sino, null - me interesa guardar en vble.
  const serieFavData = favorites.find (row => row.mal_id === selectedSerieID);
// si ya está clickado no se añada otra vez
  if (serieFavData === undefined){
   favorites.push(selectedSerieData);   
  }else{
      console.log("Pues ya estaría");
  }
  e.currentTarget.classList.toggle('border');
  renderFavorites();
}

function renderFavorites() {
  favoriteList.innerHTML = ""; // primero lo vacío
  for (const favoriteItem of favorites);
  renderFavoriteItem();
}

function renderFavoriteItem(favoriteItem) {
    if (favorites.image_url === null) {
        selection.innerHTML += `
                <li class="js_add_serie data-id="${favoriteItem.mal_id}">
                <img
                class="js_img" 
                src="${errorImg}" 
                alt="Anime:${favoriteItem.title}"/>
                <h2 class="title">${favoriteItem.title}</h2>
                </li>`;
      } else {
        selection.innerHTML += `
                <li class="js_add_serie data-id="${favoriteItem.mal_id}">
                <img
                class="js_img" 
                src="${favoriteItem.image_url}" 
                alt="Anime:${favoriteItem.title}"/>
                <h2 class="title">${favoriteItem.title}</h2>
                </li>`;
      }
/*  favoriteList.innerHTML += `
<li class="data-id="${favoriteItem.mal_id}">  
            <img 
            src="${favoriteItem.image_url}" 
            class="js_img" 
            alt="Anime: ${favoriteItem.title}"
            /> 
            <h2 class="js_title">${favoriteItem.title}</h2>
        </li> `;*/
}

function handlerButtonSearch(e) {
  e.preventDefault();
  fetchFunction();
}

buttonSearch.addEventListener("click", handlerButtonSearch);
