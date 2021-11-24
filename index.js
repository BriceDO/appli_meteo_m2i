let temperature = document.getElementById('temperature');
let btnCity = document.getElementById('sendCity');
let latitude = document.getElementById('latitude');
let longitude = document.getElementById('longitude');
let inputVille = document.getElementById('inputVille');
let cadreHeure = document.getElementById('cadreEnglobant');
let villeNom = document.getElementById('ville');

let ENDPOINT = 'http://api.openweathermap.org/data/2.5/forecast?&exclude=minutely&units=metric&lang=fr&appid=c6ef9babe707141b81f2f6ff31362a9c';

/**
 * Fonction qui va faire appel à l'API
 */
function appelAPI(event) {

    let ville = document.getElementById('inputVille');
    let url = ENDPOINT + "&q=" + ville.value;
    event.preventDefault();
    fetch(url)
    .then((response) => {
        if(response.ok) {
            return response.json();
        }
    })
    .then((data) => {
        console.log(data);
        villeNom.textContent = data.city.name;
        longitude.textContent = data.city.coord.lon;
        latitude.textContent = data.city.coord.lat;
        return data;
    })
    .then((creationCadre))
    .catch((error) => {
        alert('y\'a une erreur ! ' +error);
    })
}

/**
 * Fonction qui va créer de l'HTML.
 * Va afficher un cadre pour toutes les 3 heures
 * Avec les informations date, heure, météo et icone
 */

function creationCadre(data) {

    // On écrase les anciens cadres
    cadreHeure.innerHTML = "";

    for (let i = 0; i < data.list.length; i++) {
        
        // Création d'un cadre info qui sera dans le cadre englobant
        let cadreInfoHeure = document.createElement('div');
        cadreInfoHeure.setAttribute('class', 'cadreInfoHeure');
        cadreHeure.appendChild(cadreInfoHeure);

        // Création d'un p qui sera dans le cadre info et contiendra un span avec l'heure
        let pHeure = document.createElement('p');
        pHeure.setAttribute('class', 'pHeure');
        pHeure.textContent = "Date et heure : ";
        cadreInfoHeure.append(pHeure);

        // Création d'un span qui contiendra l'heure qui sera dans le cadreHeure
        let spanHeure = document.createElement('span');
        pHeure.append(spanHeure);
        spanHeure.textContent = data.list[i].dt_txt;

        // Création d'un balise p qui sera dans le cadre info et contiendra un span avec la température
        let pTemp = document.createElement('p');
        pTemp.setAttribute('class', 'pTemps');
        pTemp.textContent = "Température : ";
        cadreInfoHeure.append(pTemp);
        
        // Création d'une balise span température
        let spanTemp = document.createElement('span');
        spanTemp.textContent = data.list[i].main.temp;
        pTemp.append(spanTemp);

        // Création d'une balise img pour l'icone
        let icone = document.createElement('img');
        icone.setAttribute('src', 'http://openweathermap.org/img/wn/'+data.list[i].weather[0].icon+'.png')
        cadreInfoHeure.append(icone);
        
    }
}

//appelAPI();

btnCity.addEventListener('click', appelAPI);