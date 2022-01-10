'use strict';

/// VARIABLES GLOBALES ///
const resultSeries = document.querySelector ('.js_resultSeries');
const favSeries = document.querySelector ('.js_favSeries');
const searchInput = document.querySelector ('.js_searchInput');
const searchButton = document.querySelector ('.js_searchButton');
const resetButton = document.querySelector ('.js_resetButton');
const defaultImg = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

/// ARRAY ///

let allSeries = [];
let favorites = [];

/// FUNCIONES ///

// Fetch y ejecuta la función para print en el HTML

function getApiData (){
  let inputValue = searchInput.value;

  fetch(`https://api.jikan.moe/v3/search/anime?q=${inputValue}`)
    .then (response => response.json())
    .then (data => {
      allSeries = data.results;
      getPrintAllSeries ();
    });
}

// Función que imprime en el HTML

function printHtmlSeries (seriesArticle) {
  // console.log({seriesArticle});
  //Creo var para la clase de serie fav
  let classFav = '';
  //Creo nueva favSerieData para poder buscar el id de las series clicadas como favoritas
  let favSeriesData =  favorites.find(row => row.mal_id === seriesArticle.mal_id);
  //Creo comparativa si no está clicada, pintamela sin estilo, si no, con la clase de los favoritos
  if (favSeriesData === undefined) {
    classFav = '';
  } else {
    classFav = 'fav_style';
  }

  //Condicional si no tiene imagen predeterminada, que utilice la default, si no, que pinte las series con la info del api
  if (allSeries.image_url === null) {
    resultSeries.innerHTML += `<li class="js_add_favorites item_main ${classFav}" data-id="${seriesArticle.mal_id}">
    <img class="img_main" src="${defaultImg}" alt="Serie:${seriesArticle.title}"/>
    <p class="title">${seriesArticle.title}</p>
    </li>`;
  } else {
    resultSeries.innerHTML += `<li class="js_add_favorites item_main ${classFav}" data-id="${seriesArticle.mal_id}">
    <img class="img_main" src="${seriesArticle.image_url}" alt="Serie:${seriesArticle.title}"/>
    <p class="title">${seriesArticle.title}</p>
    </li>`;
  }
}

// Función con bucle para recorrer todo el array
// Constante / bucle y listener para el click a favoritos (al ser la función donde se recorren todas las series)

function getPrintAllSeries (){
  resultSeries.innerHTML='';
  for (const eachSerieData of allSeries) {
    printHtmlSeries (eachSerieData);
  }
  const allImg = document.querySelectorAll ('.js_add_favorites');
  for (const addToFavList of allImg) {
    addToFavList.addEventListener ('click', handleAddToFavList);
  }
}

//Función para es

function handleAddToFavList (event){
  const selectedSerieId = parseInt(event.currentTarget.dataset.id);

  // console.log(`Añadiendo a la lista + "${selectedSerieId}"`);
  // console.log(allSeries);
  // console.log(favorites);

  //Constante para buscar el id en las series, y que la guarde en una const
  const selectedSerieData = allSeries.find(row => row.mal_id === selectedSerieId);

  ///Constante para encontrar las series en el array y las guarde en otra constante para el ls

  const favSeriesData = favorites.find(row => row.mal_id === selectedSerieId);

  // console.log(favSeriesData);

  //Condicional para que, si se ha clicado en la serie, no vuelva a añadirse y en main se marque

  if (favSeriesData === undefined) {
    favorites.push (selectedSerieData);
  } else {
    alert ('Ya añadida a favoritos');
  }

  // Cambiar elemento clicado de color
  event.currentTarget.classList.add('fav_style');

  //Llamamos a las funciones:1La que imprime en la sección fav, las favoritas y para guardar en localStorage al estar donde se modifican
  setFavInLocalStorage ();
  renderFav ();
}

function renderFav (){
  favSeries.innerHTML = '';
  for (const eachFavItem of favorites) {
    renderFavItem (eachFavItem);
  }
}

function renderFavItem (eachFavItem) {
//Condicional si no tiene imagen predeterminada, que utilice la default, si no, que pinte los favs con la info del api
  if (favorites.image_url === null) {
    favSeries.innerHTML += `<li>
    <p>${eachFavItem.title}</p>
    <img class="img_fav" src="${defaultImg}" alt="Serie:${eachFavItem.title}"/>
    <i class="fas fa-times-circle remove-fav"></li>`;
  }else {
    favSeries.innerHTML += `<li>
    <p>${eachFavItem.title}</p>
    <img class="img_fav" src="${eachFavItem.image_url}" alt="Serie:${eachFavItem.title}"/>
    <i class="fas fa-times-circle remove-fav"></li>`;
  }
}

function handleClickSeries(event) {
  event.preventDefault();
  getApiData ();
}

//Función para guardar en el localStorage (se llama desde handleAddToFavList)

function setFavInLocalStorage (){
  //console.log('Guardaré en lS');
  localStorage.setItem ('fav-series', JSON.stringify(favorites) );
}

function getFavFromLocalStorage () {
  //console.log('Sacaré la lista');
  const savedFavContent = localStorage.getItem('fav-series');
  if (savedFavContent === null){
    favorites = [];
  } else {
    //console.log();
    favorites = JSON.parse(savedFavContent);
  }
  renderFav ();
}
//Llamamos a la función para coger datos del localS
getFavFromLocalStorage ();

//Función para borrar favoritos del lS
function handleClickReset (){
  localStorage.removeItem('fav-series');

  //Para que la página se recargue de nuevo y me borre las listas
  location.reload();
}

//Listeners

searchButton.addEventListener('click', handleClickSeries);
resetButton.addEventListener('click', handleClickReset);