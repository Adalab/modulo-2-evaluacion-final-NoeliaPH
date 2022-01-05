'use strict';

//const selection = document.querySelector('.js_selection');
const selectionList = document.querySelector('.js_selection_list');
const inputSelection = document.querySelector('.js_input');
const searchButton = document.querySelector('.js_search');
const favoriteList = document.querySelector('.js_selection_favorite');


let data=[]; // aquí voy a guardar las series
let favorite =[];

// traer, recoger, datos de api, esta funcion me permite hacer una petición al servidor. Recorro en bucle todos los datos del array y guardo datos en mi array data.
function getApiData(){ 
fetch(`https://api.jikan.moe/v3/search/anime?q=${inputSelection.value}`)
.then( (response) => response.json())
.then( (dataFromApi) => {
  data=[];
  for (const eachSerie of dataFromApi.results){
  data.push(eachSerie);
}});
renderSelection(data);
};
 // funcion preventDefault (para que no entre bucle en la busqueda) y llamo a la funcion dentro del Listener.
function handleClickSearch(event){
  event.preventDefault();
  getApiData();
}
//funcion que pinta la busqueda
function renderSelection(data) {
  selectionList.innerHTML = '';
  
  for (const dataSerie of data){
  const imgPlaceholder = image(dataSerie);
  selectionList.innerHTML += `
 <li class="js_add_serie" id="${dataSerie.mal_id}">  
            <img 
            src="${imgPlaceholder} " 
            class="js_img" 
            alt="Anime: ${dataSerie.title}"
            /> 
            <h2 class="js_title">${dataSerie.title}</h2>
        </li> 
        `; 
        const addResultList = document.querySelectorAll('.js_add_serie');
        //hago bucle para que recorra el array y escuche el evento cada serie seleccionada.
for (const eachResult of addResultList) {
  
  eachResult.addEventListener('click', handlerClickResults);
}
}};
// funcion para ver que imagen va a pintar.
function image (data){
  if (data.image_url === null){
  data.image_url = "https://via.placeholder.com/225x317/ffffff/666666/?text=TV";
} 
return(data.image_url);
}
//doy clase o la quito para incluir en mi lista de favoritos despues
function addFavoriteClass(event){
event.currentTarget.classList.toggle('border');
}
function objectFavorite(event){
 let favoriteObject = {};

favoriteObject.id=event.currentTarget.id;
favoriteObject.src=event.currentTarget.children[0].currentSrc;
favoriteObject.alt=event.currentTarget.children[0].alt;
favoriteObject.title=event.currentTarget.outerText;
return favoriteObject;
}

// en esta funcion le digo que elementos seleccionamos y de donde coge los datos
function addFavorite(event){
  const favoriteObject = objectFavorite(event);
const findFavorite = favorite.find(favItem => favItem.id === favoriteObject.id); //busco con find dentro de  mi array favorite si los id coinciden y me lo saque
if (findFavorite === undefined){
  favorite.push(favoriteObject);
}
printFavorites();

localStorage.setItem("favList", JSON.stringify(favorite));
}
//
function getLS(){
  if (JSON.parse(localStorage.getItem("favList"))!== null){
favorite = JSON.parse(localStorage.getItem("favList")); 
printFavorites();
} 
}
getLS();

//funion para dibujar en la pantalla los favoritos que están en mi array favorito.
function printFavorites(){ 
  favoriteList.innerHTML = '';
    for (const selectionFav of favorite){
      favoriteList.innerHTML += `
   <li class= id="${selectionFav.id}">  
              <img 
              src="${selectionFav.src} " 
              class="js_img_fav" 
              alt="Anime: ${selectionFav.alt}"
              /> 
              <h2 class="js_title">${selectionFav.title}</h2>
          </li> 
          `; 
  }
  };


// funcion que escucha los eventos cuando hago click en los elementos de la lista, los resalta.
function handlerClickResults(event){

addFavoriteClass(event);
addFavorite(event);
}








//<button class="js_add_serie" data-name="${dataSerie.title}" title="Añadir a favoritos>
/*function renderAllSelection(){
  selectionList.innherHTML = ''; 

for ( let i = 0; i < data.length; i++) {
 renderSelection(data[i]);   
}  
const addSerieList = document.querySelectorAll('js_add_serie');

for (const addSerie of addSerieList){
addSerie.addEventListener('click', handleAddToSerie);
}
}
/*
function handleAddToSerie(event){
//console.dir(event.currentTarget);
//console.dir(event.currentTarget.dataset.id)

const serieSelectedId = event.currentTarget.dataset.id;
console.log(data);
const selectedSerieData = data.find(row => row.mal_id === serieSelectedId);
console.log(selectedSerieData);
favorite.push(favorite);
renderFavorite();

}
function renderFavorite(){

}
renderAllSelection();*/

/* for of, hace lo mismo.
for (const eachSerie of data){
  renderSelection(eachSerie);
}
*/

//hasta aquí línea 62 del proyecto de clase

// OJO QUE NO SE DONDE VAAAAAAA, ultimo video día 1 primer video día 2
const selectedSerie = data.name;
data.find (serie => row.name === selectedSerie);


// Listeners

searchButton.addEventListener ('click', handleClickSearch);

