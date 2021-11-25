let temperature = document.getElementById('temperature');
let btnCity = document.getElementById('sendCity');
let latitude = document.getElementById('latitude');
let longitude = document.getElementById('longitude');
let inputVille = document.getElementById('inputVille');
let cadreHeure = document.getElementById('cadreEnglobant');
let villeNom = document.getElementById('ville');
let header = document.getElementById('header');

let ENDPOINT = 'http://api.openweathermap.org/data/2.5/forecast?&exclude=minutely&units=metric&lang=fr&appid=c6ef9babe707141b81f2f6ff31362a9c';

/**
 * Fonction qui va faire appel à l'API
 */
function appelAPI(event) {

    // Je cible la ville donnée en input 
    let ville = document.getElementById('inputVille');
    // Et la rajoute en paramètre de mon ENDPOINT
    let url = ENDPOINT + "&q=" + ville.value;
    // J'interdis le rechargement de page
    event.preventDefault();
    
    // Le premier then va retourner la réponse en json
    fetch(url)
    .then((response) => {
        if(response.ok) {
            return response.json();
        }
    })
    // Le deuxième then va remplir le cadre ville
    .then((data) => {
        console.log(data);
        villeNom.textContent = data.city.name+", "+data.city.country;
        longitude.textContent = data.city.coord.lon;
        latitude.textContent = data.city.coord.lat;
        return data;
    })
    // Le troisième then va créer tous les cadres informations
    .then((creationCadre))
    // Si erreur du fetch
    .catch((error) => {
        console.log("y'a une erreur !"+error);
    })
}

/**
 * Fonction qui va créer de l'HTML.
 * Va afficher un cadre pour toutes les 3 heures
 * Avec les informations date, heure, météo et icone
 */

function creationCadre(data) {

    // On écrase les anciens cadres au cas où il y en a déjà
    cadreHeure.innerHTML = "";

    for (let i = 0; i < data.list.length; i++) {
        
        // Création d'un cadre info qui sera dans le cadre englobant
        let cadreInfoHeure = document.createElement('div');
        cadreInfoHeure.setAttribute('class', 'cadreInfoHeure');
        cadreHeure.appendChild(cadreInfoHeure);

        // Création d'un p qui sera dans le cadre info et contiendra un span avec l'heure
        let pHeure = document.createElement('p');
        pHeure.setAttribute('class', 'pHeure');
        cadreInfoHeure.append(pHeure);

        // Création d'un span qui contiendra l'heure qui sera dans le cadreHeure
        let spanHeure = document.createElement('span');
        pHeure.append(spanHeure);
        spanHeure.textContent = filtreHeure(data.list[i].dt_txt);

        // Création d'un balise p qui sera dans le cadre info et contiendra un span avec la température
        let pTemp = document.createElement('p');
        pTemp.setAttribute('class', 'pTemps');
        pTemp.textContent = "Température : ";
        cadreInfoHeure.append(pTemp);
        
        // Création d'une balise span température
        let spanTemp = document.createElement('span');
        spanTemp.textContent = Math.round(data.list[i].main.temp)+"°. Météo : "+data.list[i].weather[0].description;
        pTemp.append(spanTemp);

        // Création d'une balise img pour l'icone
        let icone = document.createElement('img');
        icone.setAttribute('src', 'http://openweathermap.org/img/wn/'+data.list[i].weather[0].icon+'.png')
        cadreInfoHeure.append(icone);
        
    }
}

/**
 * Fonction qui va modifier la date reçue par une date au format français
 */
function filtreHeure(date) {

    // let maDate = new Date(date);
    // maDate.toLocaleDateString('fr-FR', {day: 'numeric', month: 'numeric', year: 'numeric'});
    // console.log(maDate);
    // return maDate;

     // Je fais un tableau qui va contenir uniquement la date complète
     let tabDateComplete = date.split(' ')[0];

         // A partir de ce tableau, je vais extraire le jour, mois, année
         let annee = tabDateComplete.split('-')[0];
         let mois = tabDateComplete.split('-')[1];
         let jour = tabDateComplete.split('-')[2];

     // Je fais un tableau qui va contenir uniquement l'heure;
     let tabHeureComplete = date.split(' ')[1];

         // A partir de ce tableau, je récupère uniquement l'heure
         let heure = tabHeureComplete.split(':')[0];
         heure = isThereAZero(heure);

     // Je return la syntaxe complète
     return "Le "+jour+"/"+mois+"/"+annee+" pour "+heure+"h."
}

/**
 * Fonction qui va enlever le 0 à une heure
 * si par exemple il affiche normalement 09,
 * il doit afficher 9
 * Ne va pas affecter minuit (00h)
 */

function isThereAZero(heure) {

    // Si mon heure comporte un zéro et qu'il n'est pas 00 
    if (heure.split('')[0] == '0' && heure != '00') {

        // Je prends seulement le deuxième chiffre
         maNvHeure = heure.split('')[1];

         // return
         console.log(maNvHeure);
         return maNvheure;
    }
}

isThereAZero();

/**
 * Fonction qui va alerter l'utilisateur si aucune ville n'a été entrée
 * mais qu'il appuie sur le bouton rechercher
 */

function alerteInput() {
    
    if (ville.value == "" || null || undefined) {

        let msgAlerte = document.createElement('p');
        msgAlerte.textContent = "Attention, input vide ou incorrect ! Réésayez !";
        msgAlerte.className('msgAlerte');
        header.after(msgAlerte);
        return;

    }

}

// Je rajoute l'appel à l'API et le filtreHeure au clique du bouton recherche
btnCity.addEventListener('click', alerteInput);
btnCity.addEventListener('click', appelAPI);