let listeActuelle = [];
let indexCitation = 0;
let nomAuteur = "";
let favoris = [];
let pagePrecedente = "menu";
let points = Number(localStorage.getItem("points")) || 20;
function afficherPoints(){

    document.getElementById("points").innerHTML = points;

}
function ajouterPoints(nombre){

    points += nombre;

    localStorage.setItem("points", points);

    afficherPoints();

}
function retirerPoints(nombre){

    if(points >= nombre){

        points -= nombre;

        localStorage.setItem("points", points);

        afficherPoints();

        return true;

    }

    return false;

}




// Cacher toutes les pages

function cacherPages(){

document.querySelectorAll(".page").forEach(page=>{
page.classList.add("cache");
});

}

// Accueil vers menu

function ouvrirMenu(){

setTimeout(()=>{

cacherPages();

document.getElementById("menu").classList.remove("cache");

},50);

}

// Ouvrir philosophes

function ouvrirPhilosophes(){

setTimeout(()=>{

cacherPages();

document.getElementById("philosophes").classList.remove("cache");

},50);

}



// Ouvrir populaires

function ouvrirPopulaires(){

setTimeout(()=>{

cacherPages();

document.getElementById("populaires").classList.remove("cache");

},50);

}



// Choisir un philosophe

function choisirPhilosophe(nom){

listeActuelle = philosophes[nom];

indexCitation = 0;

nomAuteur = nom;

afficherCitation();

cacherPages();

document.getElementById("lecture").classList.remove("cache");

}



// Choisir une catégorie

function choisirCategorie(categorie){

listeActuelle = populaires[categorie];

indexCitation = 0;

nomAuteur = categorie;

afficherCitation();

cacherPages();

document.getElementById("lecture").classList.remove("cache");

}



// Afficher citation

function afficherCitation(){
  if(!listeActuelle[indexCitation]){
    return;
}
  let box = document.querySelector(".citation-box");

box.style.animation = "none";

setTimeout(()=>{

box.style.animation = "apparition 0.5s ease";

},10);

document.getElementById("citationTexte").innerHTML =
"« "+listeActuelle[indexCitation]+" »";


let auteurs = {
    socrate:"Socrate",
    platon:"Platon",
    aristote:"Aristote",
    confucius:"Confucius",
    camus:"Albert Camus",

    amour:"Amour",
    motivation:"Motivation",
    reussite:"Réussite",
    foi:"Foi",
    bonheur:"Bonheur",
    sagesse:"Sagesse",
    humour:"Humour"
};

document.getElementById("auteur").innerHTML =
"— " + auteurs[nomAuteur];

}



// Citation suivante

function citationSuivante(){

if(indexCitation < listeActuelle.length-1){

indexCitation++;

afficherCitation();

}

}



// Citation précédente

function citationPrecedente(){

if(indexCitation > 0){

indexCitation--;

afficherCitation();

}

}



// Ajouter favori

function ajouterFavori(){

let citation = {
    texte: listeActuelle[indexCitation],
    auteur: nomAuteur
};


if(favoris.some(f => f.texte === citation.texte)){

afficherNotification("Déjà dans les favoris ⭐ ");

return;

}


favoris.push(citation);

sauvegarderFavoris();

afficherNotification("Ajouté aux favoris ❤️");

}



// Copier citation

function copierCitation(){

let texte =
"« " + listeActuelle[indexCitation] + " »\n\n— " + nomAuteur;


if(navigator.clipboard){

navigator.clipboard.writeText(texte);

}else{

let zone = document.createElement("textarea");

zone.value = texte;

document.body.appendChild(zone);

zone.select();

document.execCommand("copy");

zone.remove();

}


afficherNotification("Citation copiée 📋");

}



// Quiz

function ouvrirQuiz(){

setTimeout(()=>{

cacherPages();

document.getElementById("quiz").classList.remove("cache");
creerQuestionQuiz();
},50);

}



// Paramètres

function ouvrirParametres(){

setTimeout(()=>{

cacherPages();

document.getElementById("parametres").classList.remove("cache");

},50);

}



// Favoris

function ouvrirFavoris(){
  pagePrecedente = document.querySelector(".page:not(.cache)").id;

cacherPages();

document.getElementById("favoris").classList.remove("cache");

let liste = document.getElementById("listeFavoris");

liste.innerHTML = "";


if(favoris.length === 0){

liste.innerHTML =
"<p>Aucun favori pour le moment ❤️</p>";

return;

}


liste.innerHTML =
"<h3>⭐ "+favoris.length+" favori(s)</h3>";

favoris.forEach((citation,index)=>{

liste.innerHTML +=

`
<div class="citation-box">

<p>« ${citation.texte} »</p>

<h3>— ${citation.auteur}</h3>

<button onclick="supprimerFavori(${index})">
🗑️ Supprimer
</button>

</div>
`;

});


}


// Mode sombre

function modeSombre(){

document.body.classList.toggle("dark");

}
// ----------------
// QUIZ CitaPlus automatique
// ----------------

let bonneAuteur = "";
let choixQuiz = [];


function creerQuestionQuiz(){

let noms = Object.keys(philosophes);


// Choisir un philosophe au hasard
let auteur =
noms[Math.floor(Math.random()*noms.length)];


// Choisir une citation au hasard
let citations =
philosophes[auteur];

let citation =
citations[Math.floor(Math.random()*citations.length)];


// Garder le vrai auteur
bonneAuteur = auteur;


// Prendre deux faux auteurs
let autres = noms.filter(n => n !== auteur);

autres.sort(()=>Math.random()-0.5);


choixQuiz = [
auteur,
autres[0],
autres[1]
];


// Mélanger les réponses
choixQuiz.sort(()=>Math.random()-0.5);


// Afficher la question

document.getElementById("question").innerHTML =
"Qui a dit : « "+citation+" »";


// Afficher les réponses

document.querySelectorAll("#quiz button")[0].innerHTML =
choixQuiz[0];

document.querySelectorAll("#quiz button")[1].innerHTML =
choixQuiz[1];

document.querySelectorAll("#quiz button")[2].innerHTML =
choixQuiz[2];

}



function verifierQuiz(numero){

let reponse =
choixQuiz[numero];


if(reponse === bonneAuteur){

document.getElementById("resultat").innerHTML =
"✅ Bonne réponse !";

}else{

document.getElementById("resultat").innerHTML =
"❌ Mauvaise réponse. C'était "+bonneAuteur;

}


setTimeout(()=>{

document.getElementById("resultat").innerHTML="";

creerQuestionQuiz();

},1500);

}



function reponse1(){

verifierQuiz(0);

}


function reponse2(){

verifierQuiz(1);

}


function reponse3(){

verifierQuiz(2);

}








// ----------------
// AFFICHER FAVORIS
// ----------------

function afficherFavoris(){

ouvrirFavoris();

}



// ----------------
// SAUVEGARDE FAVORIS
// ----------------

function sauvegarderFavoris(){

localStorage.setItem(
"mesFavoris",
JSON.stringify(favoris)
);

}



// Charger les favoris au démarrage

if(localStorage.getItem("mesFavoris")){

favoris = JSON.parse(
localStorage.getItem("mesFavoris")
);

}


function retourListe(){

cacherPages();

if(nomAuteur in philosophes){

document.getElementById("philosophes").classList.remove("cache");

}else{

document.getElementById("populaires").classList.remove("cache");

}

}
function ouvrirApropos(){

    cacherPages();

    document.getElementById("apropos").classList.remove("cache");

}
function ouvrirMiseAJour(){

    cacherPages();

    document.getElementById("miseajour").classList.remove("cache");

}
function supprimerFavori(index){

let confirmation = confirm("Supprimer cette citation des favoris ?");

if(confirmation){

favoris.splice(index,1);

sauvegarderFavoris();

ouvrirFavoris();

afficherNotification("Favori supprimé 🗑️");

}

}
function afficherNotification(message){

let notif = document.getElementById("notification");

notif.innerHTML = message;

notif.style.display = "block";


setTimeout(()=>{

notif.style.display = "none";

},500);

}

function partagerApplication(){

let texte =
"Découvre CitaPlus 📖\n\nUne citation pour bien commencer la journée.\n\nTélécharge l'application et découvre de belles citations.";


if(navigator.share){

navigator.share({
title:"CitaPlus",
text:texte
});

}else{


navigator.clipboard.writeText(texte);

afficherNotification("Texte de partage copié ✅");

}

}
// Retour automatique à l'accueil au démarrage
function retourFavoris(){

    cacherPages();

    document.getElementById(pagePrecedente).classList.remove("cache");

}
function verifierBonusJournalier(){

    let aujourd'hui = new Date().toDateString();
    let dernierBonus = localStorage.getItem("dernierBonus");

    if(dernierBonus !== aujourd'hui){

        ajouterPoints(2);

        localStorage.setItem("dernierBonus", aujourd'hui);

        afficherNotification("🎁 Bonus quotidien : +2 🪙");
       }
}




window.onload = function(){

    cacherPages();

    document.getElementById("accueil").classList.remove("cache");

    afficherPoints();

    let splash = document.getElementById("splash");

    if(splash){

        setTimeout(function(){

            splash.classList.add("disparaitre");

            setTimeout(function(){

                splash.style.display = "none";

            },600);

        },2000);

    }

};
    function ouvrirPoints(){

    let choix = confirm(
        "🎥 Regarder une publicité et gagner 10 points ?"
    );

    if(choix){

        ajouterPoints(10);

        afficherNotification("🎉 +10 points gagnés !");
    }

}
