// ========================================
// CITAPLUS — SCRIPT PRINCIPAL PROPRE
// ========================================

let listeActuelle = [];
let indexCitation = 0;
let nomAuteur = "";
let pagePrecedente = "menu";
let historiquePages = [];

function retourGlobal() {

    if (historiquePages.length === 0) {
        return;
    }

    let pagePrecedente =
        historiquePages.pop();

    document
        .querySelectorAll(".page")
        .forEach(page => {
            page.classList.add("cache");
        });

    let page =
        document.getElementById(pagePrecedente);

    if (page) {
        page.classList.remove("cache");
    }

    window.scrollTo(0, 0);
}

// ========================================
// POINTS
// ========================================
if (localStorage.getItem("citaPlusVersion") !== "4") {
    localStorage.removeItem("philosophesDebloques");
    localStorage.removeItem("citationsDebloquees");
    localStorage.setItem("points", "20");
    localStorage.setItem("citaPlusVersion", "4");
}
let pointsStockes =
    localStorage.getItem("points");

let points =
    pointsStockes === null
        ? 20
        : Number(pointsStockes);

if (
    !Number.isFinite(points) ||
    points < 0
) {
    points = 20;

    localStorage.setItem(
        "points",
        points
    );
}


// ========================================
// PHILOSOPHES DÉBLOQUÉS
// ========================================

let philosophesStockes = [];

try {
    philosophesStockes =
        JSON.parse(
            localStorage.getItem("philosophesDebloques")
        );
} catch (e) {
    philosophesStockes = [];
}

if (!Array.isArray(philosophesStockes)) {
    philosophesStockes = [];
}


// Les 3 premiers sont gratuits
let philosophesDebloques = [
    ...new Set([
        "socrate",
        "platon",
        "aristote",
    ])
];


// ========================================
// CITATIONS DÉBLOQUÉES
// ========================================

let citationsStockees = {};

try {
    citationsStockees =
        JSON.parse(
            localStorage.getItem("citationsDebloquees")
        );
} catch (e) {
    citationsStockees = {};
}

if (
    !citationsStockees ||
    typeof citationsStockees !== "object" ||
    Array.isArray(citationsStockees)
) {
    citationsStockees = {};
}

let citationsDebloquees = citationsStockees;


// ========================================
// FAVORIS
// ========================================

let favoris = [];

try {
    let favorisStockes =
        JSON.parse(
            localStorage.getItem("mesFavoris")
        );

    if (Array.isArray(favorisStockes)) {
        favoris = favorisStockes;
    }

} catch (e) {
    favoris = [];
}


// ========================================
// SAUVEGARDES
// ========================================

function sauvegarderDeblocages() {

    localStorage.setItem(
        "philosophesDebloques",
        JSON.stringify(philosophesDebloques)
    );

    localStorage.setItem(
        "citationsDebloquees",
        JSON.stringify(citationsDebloquees)
    );
}


function sauvegarderFavoris() {

    localStorage.setItem(
        "mesFavoris",
        JSON.stringify(favoris)
    );
}


// ========================================
// PHILOSOPHE DÉBLOQUÉ ?
// ========================================

function philosopheEstDebloque(nom) {

    return philosophesDebloques.includes(nom);

}


// ========================================
// CITATION DÉBLOQUÉE ?
// ========================================

function citationEstDebloquee(nom, index) {

    // Les deux premières citations sont gratuites
    if (index < 2) {
        return true;
    }

    if (!Array.isArray(citationsDebloquees[nom])) {
        return false;
    }

    return citationsDebloquees[nom].includes(index);
}


// ========================================
// AFFICHER LES POINTS
// ========================================

function afficherPoints() {

    let valeur = Number(
        localStorage.getItem("points")
    );

    if (
        Number.isFinite(valeur) &&
        valeur >= 0
    ) {
        points = valeur;
    }

    let element =
        document.getElementById("points");

    if (element) {
        element.textContent = points;
    }
}


// ========================================
// AJOUTER DES POINTS
// ========================================

function ajouterPoints(nombre) {

    points += nombre;

    localStorage.setItem(
        "points",
        points
    );

    afficherPoints();
}


// ========================================
// RETIRER DES POINTS
// ========================================

function retirerPoints(nombre) {

    if (points < nombre) {
        return false;
    }

    points -= nombre;

    localStorage.setItem(
        "points",
        points
    );

    afficherPoints();

    return true;
}


// ========================================
// CACHER LES PAGES
// ========================================

function cacherPages(pageCible) {

    let pageActuelle =
        document.querySelector(".page:not(.cache)");

    // Ajouter l'ancienne page seulement
    // si on va réellement vers une autre page
    if (
        pageActuelle &&
        pageActuelle.id !== pageCible
    ) {

        historiquePages.push(
            pageActuelle.id
        );
    }

    document
        .querySelectorAll(".page")
        .forEach(page => {
            page.classList.add("cache");
        });

    let nouvellePage =
        document.getElementById(pageCible);

    if (nouvellePage) {
        nouvellePage.classList.remove("cache");
    }

    window.scrollTo(0, 0);
}
// ========================================
// ACCUEIL → MENU
// ========================================

function ouvrirMenu() {

    cacherPages("menu");

    let page =
        document.getElementById("menu");

    if (page) {
        page.classList.remove("cache");
    }
}


// ========================================
// OUVRIR PHILOSOPHES
// ========================================

function ouvrirPhilosophes() {

    cacherPages("philosophes");

    afficherListePhilosophes();
}


// ========================================
// LISTE DES PHILOSOPHES
// ========================================

function afficherListePhilosophes() {

    let container =
        document.getElementById(
            "listePhilosophes"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    let noms =
        Object.keys(philosophes);

    noms.forEach(nom => {

        let debloque =
            philosopheEstDebloque(nom);

        let nomAffiche =
            obtenirNomPhilosophe(nom);


        let bouton =
            document.createElement("button");

        bouton.className =
            debloque
                ? "philosophe-card"
                : "philosophe-card verrouille";

bouton.innerHTML = `
    <span class="philosophe-nom">
        ${debloque ? "🏛️" : "🔒"}
        ${nomAffiche}
    </span>

    <span class="philosophe-info">
        ${
            debloque
            ? "🔓 Débloqué"
            : "🔒 20 🪙 pour débloquer"
        }
    </span>
`;

        bouton.onclick = function() {
            choisirPhilosophe(nom);
        };

        container.appendChild(bouton);

    });
}


// ========================================
// NOMS DES PHILOSOPHES
// ========================================

function obtenirNomPhilosophe(nom) {

    let noms = {

        socrate: "Socrate",
        platon: "Platon",
        aristote: "Aristote",
        descartes: "René Descartes",
        confucius: "Confucius",
        epictete: "Épictète",
        seneca: "Sénèque",
        marc_aurele: "Marc Aurèle",
        nietzsche: "Friedrich Nietzsche",
        kant: "Emmanuel Kant",
        hegel: "Hegel",
        voltaire: "Voltaire",
        rousseau: "Jean-Jacques Rousseau",
        montesquieu: "Montesquieu",
        pascal: "Blaise Pascal",
        spinoza: "Baruch Spinoza",
        schopenhauer: "Arthur Schopenhauer",
        kierkegaard: "Søren Kierkegaard",
        simone_de_beauvoir:
            "Simone de Beauvoir",
        camus: "Albert Camus"

    };

    return noms[nom] || nom;
}


// ========================================
// CHOISIR UN PHILOSOPHE
// ========================================
function choisirPhilosophe(nom) {

    if (!philosophes[nom]) {
        return;
    }

    // Philosophe déjà débloqué
    if      (philosopheEstDebloque(nom)) {
        ouvrirListeCitations(nom);
        return;
    }

    // Philosophe verrouillé
ouvrirModalDeblocagePhilosophe(nom);
}
// ========================================
// MODALE DE DÉBLOCAGE D'UN PHILOSOPHE
// ========================================

function ouvrirModalDeblocagePhilosophe(nom) {

    // Supprimer une ancienne fenêtre si elle existe
    let ancienneModal = document.getElementById("modalDeblocage");

    if (ancienneModal) {
        ancienneModal.remove();
    }

    // Créer la fenêtre
    let modal = document.createElement("div");

    modal.id = "modalDeblocage";
    modal.className = "modal";

    modal.innerHTML = `
        <div class="modal-contenu">

            <h2>🔒 Philosophe verrouillé</h2>

            <p>
                Tu dois débloquer
                <strong>${obtenirNomPhilosophe(nom)}</strong>
                pour accéder à ses citations.
            </p>

            <p>
                <strong>🪙 Prix : 20 points</strong>
            </p>

            <button onclick="debloquerPhilosophe('${nom}')">
                🔓 Débloquer
            </button>

            <button
                class="btnAnnuler"
                onclick="fermerModalDeblocage()">
                Annuler
            </button>

        </div>
    `;

    document.body.appendChild(modal);
}
function fermerModalDeblocage() {

    let modal = document.getElementById("modalDeblocage");

    if (modal) {
        modal.remove();
    }
}
// ========================================
// MODALE DE DÉBLOCAGE D'UNE CITATION
// ========================================

function ouvrirModalDeblocageCitation(nom, index) {

    let ancienneModal =
        document.getElementById(
            "modalCitationDeblocage"
        );

    if (ancienneModal) {
        ancienneModal.remove();
    }

    let modal =
        document.createElement("div");

    modal.id =
        "modalCitationDeblocage";

    modal.className =
        "modal";

    modal.innerHTML = `
        <div class="modal-contenu">

            <h2>🔒 Citation verrouillée</h2>

            <p>
                Cette citation est verrouillée.
            </p>

            <p>
                <strong>🪙 Prix : 10 points</strong>
            </p>

            <button
                onclick="
                    debloquerCitation(
                        '${nom}',
                        ${index}
                    )
                "
            >
                🔓 Débloquer
            </button>

            <button
                class="btnAnnuler"
                onclick="
                    fermerModalCitationDeblocage()
                "
            >
                Annuler
            </button>

        </div>
    `;

    document.body.appendChild(modal);
}


function fermerModalCitationDeblocage() {

    let modal =
        document.getElementById(
            "modalCitationDeblocage"
        );

    if (modal) {
        modal.remove();
    }
}


function debloquerCitation(nom, index) {

    if (!philosophes[nom]) {
        return;
    }

    // Vérifier si la citation est déjà débloquée
    if (
        citationEstDebloquee(
            nom,
            index
        )
    ) {

        fermerModalCitationDeblocage();

        ouvrirCitation(
            nom,
            index
        );

        return;
    }

    // Vérifier les points
if (points < 10) {

    afficherNotification(
        "❌ Tu n'as pas assez de points."
    );

    return;
}

    // Retirer 10 points
    retirerPoints(10);

    // Créer la liste si elle n'existe pas
    if (
        !Array.isArray(
            citationsDebloquees[nom]
        )
    ) {

        citationsDebloquees[nom] = [];
    }

    // Ajouter cette citation
    if (
        !citationsDebloquees[nom].includes(index)
    ) {

        citationsDebloquees[nom].push(index);
    }

    // Sauvegarder
    sauvegarderDeblocages();

    // Fermer la fenêtre
    fermerModalCitationDeblocage();

    // Actualiser la liste
    ouvrirListeCitations(nom);

    // Message
    afficherNotification(
        "🔓 Citation débloquée ! -10 🪙"
    );
}
function debloquerPhilosophe(nom) {

    // Vérifier que le philosophe existe
    if (!philosophes[nom]) {
        return;
    }

    // Vérifier s'il est déjà débloqué
    if (philosopheEstDebloque(nom)) {
        fermerModalDeblocage();
        ouvrirListeCitations(nom);
        return;
    }

    // Vérifier les points
    if (points < 20) {

        afficherNotification(
            "❌ Tu n'as pas assez de points."
        );

        return;
    }

    // Retirer les 20 points
    retirerPoints(20);

    // Ajouter le philosophe aux philosophes débloqués
    philosophesDebloques.push(nom);

    // Éviter les doublons
    philosophesDebloques = [
        ...new Set(philosophesDebloques)
    ];

    // Sauvegarder
    sauvegarderDeblocages();

    // Fermer la fenêtre
    fermerModalDeblocage();

    // Actualiser la liste
    afficherListePhilosophes();

    // Ouvrir les citations du philosophe
    ouvrirListeCitations(nom);

    // Message
    afficherNotification(
        "🔓 " +
        obtenirNomPhilosophe(nom) +
        " est maintenant débloqué !"
    );
}


// ========================================
// LISTE DES CITATIONS
// ========================================

function ouvrirListeCitations(nom) {

    if (!philosophes[nom]) {
        return;
    }

    nomAuteur = nom;

    let titre =
        document.getElementById("titreListeCitations");

    if (titre) {
        titre.textContent =
            "📖 " + obtenirNomPhilosophe(nom);
    }

    let container =
        document.getElementById("listeCitationsContainer");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    philosophes[nom].forEach(
        (citation, index) => {

            let disponible =
                citationEstDebloquee(
                    nom,
                    index
                );

            let element =
                document.createElement("div");

            element.className =
                disponible
                    ? "citation-liste"
                    : "citation-liste verrouille";

            element.innerHTML = `
                <div class="numero-citation">
                    ${index + 1}
                </div>

                <div class="texte-citation-liste">
                    ${
                        disponible
                        ? "« " + citation + " »"
                        : "🔒 Citation verrouillée"
                    }
                </div>

                <div class="etat-citation">
                    ${
                        disponible
                        ? "Lire ➜"
                        : "🔒 10 🪙 pour débloquer"
                    }
                </div>
            `;

            element.onclick = function() {

                if (
                    citationEstDebloquee(
                        nom,
                        index
                    )
                ) {

                    ouvrirCitation(
                        nom,
                        index
                    );

                } else {

                    ouvrirModalDeblocageCitation(
                        nom,
                        index
                    );

                }

            };

            container.appendChild(element);
        }
    );

    cacherPages("listeCitations");
}


// ========================================
// OUVRIR UNE CITATION
// ========================================

function ouvrirCitation(nom, index) {

    if (!philosophes[nom]) {
        return;
    }

    // Vérifier que la citation est débloquée
    if (
        !citationEstDebloquee(
            nom,
            index
        )
    ) {

        ouvrirModalDeblocageCitation(
            nom,
            index
        );

        return;
    }

    nomAuteur = nom;

    listeActuelle =
        philosophes[nom];

    indexCitation =
        index;

    pagePrecedente =
        "listeCitations";

    afficherCitation();

    cacherPages("lecture");
}


// ========================================
// AFFICHER CITATION
// ========================================

function afficherCitation() {

    if (
        !listeActuelle ||
        !listeActuelle[indexCitation]
    ) {
        return;
    }

    let texte =
        document.getElementById(
            "citationTexte"
        );

    let auteur =
        document.getElementById(
            "auteur"
        );

    if (texte) {

        texte.textContent =
            "« " +
            listeActuelle[indexCitation] +
            " »";

    }

    if (auteur) {

        auteur.textContent =
            "— " +
            obtenirNomPhilosophe(
                nomAuteur
            );

    }

    let box =
        document.querySelector(
            "#lecture .citation-box"
        );

    if (box) {

        box.style.animation = "none";

        setTimeout(() => {

            box.style.animation =
                "apparition 0.5s ease";

        }, 10);

    }
}


// ========================================
// CITATION SUIVANTE
// ========================================
function citationSuivante() {

    if (
        indexCitation >=
        listeActuelle.length - 1
    ) {

        afficherNotification(
            "🏁 Dernière citation"
        );

        return;
    }

    let prochainIndex =
        indexCitation + 1;

    // Vérifier si la prochaine citation est débloquée
    if (
        !citationEstDebloquee(
            nomAuteur,
            prochainIndex
        )
    ) {

        ouvrirModalDeblocageCitation(
            nomAuteur,
            prochainIndex
        );

        return;
    }

    indexCitation =
        prochainIndex;

    afficherCitation();
}


// ========================================
// CITATION PRÉCÉDENTE
// ========================================

function citationPrecedente() {

    if (indexCitation <= 0) {

        afficherNotification(
            "🏁 Première citation"
        );

        return;
    }

    let precedentIndex =
        indexCitation - 1;

    if (
        !citationEstDebloquee(
            nomAuteur,
            precedentIndex
        )
    ) {

        ouvrirModalDeblocageCitation(
            nomAuteur,
            precedentIndex
        );

        return;
    }

    indexCitation =
        precedentIndex;

    afficherCitation();
}


// ========================================
// RETOUR À LA LISTE
// ========================================

function retourListe() {

    if (
        nomAuteur &&
        philosophes[nomAuteur]
    ) {

        ouvrirListeCitations(
            nomAuteur
        );

    } else {

        ouvrirPopulaires();

    }
}

// ========================================
// POPULAIRES
// ========================================

function ouvrirPopulaires() {

    cacherPages("populaires");

    let page =
        document.getElementById(
            "populaires"
        );

    if (page) {
        page.classList.remove("cache");
    }
}


function choisirCategorie(categorie) {

    if (
        typeof populaires === "undefined" ||
        !populaires[categorie]
    ) {

        afficherNotification(
            "Cette catégorie sera bientôt disponible."
        );

        return;
    }

    listeActuelle =
        populaires[categorie];

    indexCitation = 0;

    nomAuteur = categorie;

    afficherCitation();

cacherPages("lecture");
}


// ========================================
// FAVORIS
// ========================================

function ajouterFavori() {

    if (
        !listeActuelle ||
        !listeActuelle[indexCitation]
    ) {
        return;
    }

    let citation = {

        texte:
            listeActuelle[indexCitation],

        auteur:
            obtenirNomPhilosophe(
                nomAuteur
            )

    };


    if (
        favoris.some(
            f => f.texte === citation.texte
        )
    ) {

        afficherNotification(
            "⭐ Déjà dans tes favoris"
        );

        return;
    }

    favoris.push(citation);

    sauvegarderFavoris();

    afficherNotification(
        "❤️ Ajouté aux favoris"
    );
}


// ========================================
// OUVRIR FAVORIS
// ========================================

function ouvrirFavoris() {

    pagePrecedente =
        document.querySelector(
            ".page:not(.cache)"
        )?.id || "menu";

    cacherPages("favoris");

    let page =
        document.getElementById(
            "favoris"
        );

    if (page) {
        page.classList.remove("cache");
    }

    let liste =
        document.getElementById(
            "listeFavoris"
        );

    if (!liste) {
        return;
    }

    liste.innerHTML = "";

    if (favoris.length === 0) {

        liste.innerHTML =
            "<p>Aucun favori pour le moment ❤️</p>";

        return;
    }

    liste.innerHTML =
        "<h3>⭐ " +
        favoris.length +
        " favori(s)</h3>";

    favoris.forEach(
        (citation, index) => {

            liste.innerHTML += `

                <div class="citation-box">

                    <p>
                        « ${citation.texte} »
                    </p>

                    <h3>
                        — ${citation.auteur}
                    </h3>

                    <button
                        onclick="supprimerFavori(${index})"
                    >
                        🗑️ Supprimer
                    </button>

                </div>

            `;

        }
    );
}


// ========================================
// SUPPRIMER FAVORI
// ========================================

function supprimerFavori(index) {

    if (
        !favoris[index]
    ) {
        return;
    }

    favoris.splice(index, 1);

    sauvegarderFavoris();

    ouvrirFavoris();

    afficherNotification(
        "🗑️ Favori supprimé"
    );
}


// ========================================
// COPIER UNE CITATION
// ========================================

function copierCitation() {

    if (
        !listeActuelle ||
        !listeActuelle[indexCitation]
    ) {
        return;
    }

    let texte =
        "« " +
        listeActuelle[indexCitation] +
        " »\n\n— " +
        obtenirNomPhilosophe(
            nomAuteur
        );

    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(texte)
            .then(() => {

                afficherNotification(
                    "📋 Citation copiée"
                );

            })
            .catch(() => {

                afficherNotification(
                    "❌ Impossible de copier"
                );

            });

    } else {

        let zone =
            document.createElement(
                "textarea"
            );

        zone.value = texte;

        document.body.appendChild(zone);

        zone.select();

        document.execCommand("copy");

        zone.remove();

        afficherNotification(
            "📋 Citation copiée"
        );
    }
}


// ========================================
// QUIZ
// ========================================

let bonneAuteur = "";
let choixQuiz = [];


function ouvrirQuiz() {

    cacherPages("quiz");

    let page =
        document.getElementById(
            "quiz"
        );

    if (page) {
        page.classList.remove("cache");
    }

    creerQuestionQuiz();
}


function creerQuestionQuiz() {

    let noms =
        Object.keys(philosophes);

    if (noms.length < 3) {
        return;
    }

    let auteur =
        noms[
            Math.floor(
                Math.random() *
                noms.length
            )
        ];

    let citations =
        philosophes[auteur];

    let citation =
        citations[
            Math.floor(
                Math.random() *
                citations.length
            )
        ];

    bonneAuteur =
        auteur;

    let autres =
        noms.filter(
            n => n !== auteur
        );

    autres.sort(
        () => Math.random() - 0.5
    );

    choixQuiz = [
        auteur,
        autres[0],
        autres[1]
    ];

    choixQuiz.sort(
        () => Math.random() - 0.5
    );

    let question =
        document.getElementById(
            "question"
        );

    if (question) {

        question.textContent =
            "Qui a dit : « " +
            citation +
            " »";

    }

    let boutons =
        document.querySelectorAll(
            "#quiz button"
        );

    if (boutons.length >= 3) {

        boutons[0].textContent =
            obtenirNomPhilosophe(
                choixQuiz[0]
            );

        boutons[1].textContent =
            obtenirNomPhilosophe(
                choixQuiz[1]
            );

        boutons[2].textContent =
            obtenirNomPhilosophe(
                choixQuiz[2]
            );

    }
}


function verifierQuiz(numero) {

    let reponse =
        choixQuiz[numero];

    let resultat =
        document.getElementById(
            "resultat"
        );

    if (!resultat) {
        return;
    }

    if (reponse === bonneAuteur) {

        resultat.textContent =
            "✅ Bonne réponse !";

    } else {

        resultat.textContent =
            "❌ Mauvaise réponse. C'était " +
            obtenirNomPhilosophe(
                bonneAuteur
            );

    }

    setTimeout(() => {

        resultat.textContent = "";

        creerQuestionQuiz();

    }, 1500);
}


function reponse1() {
    verifierQuiz(0);
}


function reponse2() {
    verifierQuiz(1);
}


function reponse3() {
    verifierQuiz(2);
}


// ========================================
// PARAMÈTRES
// ========================================

function ouvrirParametres() {
    cacherPages("parametres");
}


// ========================================
// MODE SOMBRE
// ========================================

function modeSombre() {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "modeSombre",
        document.body.classList.contains("dark")
    );
}


// ========================================
// À PROPOS
// ========================================

function ouvrirApropos() {

    cacherPages("apropos");

    let page = document.getElementById("apropos");

    if (page) {
        page.classList.remove("cache");
    }
}


// ========================================
// MISE À JOUR
// ========================================

function ouvrirMiseAJour() {

    cacherPages("miseajour");

    let page = document.getElementById("miseajour");

    if (page) {
        page.classList.remove("cache");
    }
}


// ========================================
// RETOUR FAVORIS
// ========================================


function retourFavoris() {
    retourGlobal();
}


// ========================================
// NOTIFICATION
// ========================================

function afficherNotification(message) {

    let notif = document.getElementById("notification");

    if (!notif) {
        return;
    }

    notif.textContent = message;
    notif.style.display = "block";

    clearTimeout(window.timerNotification);

    window.timerNotification = setTimeout(() => {
        notif.style.display = "none";
    }, 2200);
}


// ========================================
// PARTAGER
// ========================================

function partagerApplication() {

    let texte =
        "Découvre CitaPlus 📖\n\n" +
        "Une citation pour bien commencer la journée.\n\n" +
        "Télécharge l'application et découvre de belles citations.";

    if (navigator.share) {

        navigator.share({
            title: "CitaPlus",
            text: texte
        });

    } else {

        afficherNotification(
            "📤 Partage non disponible"
        );

    }
}


// ========================================
// BONUS QUOTIDIEN
// ========================================

function verifierBonusJournalier() {

    let aujourdHui =
        new Date().toDateString();

    let dernierBonus =
        localStorage.getItem("dernierBonus");

    if (dernierBonus !== aujourdHui) {

        ajouterPoints(2);

        localStorage.setItem(
            "dernierBonus",
            aujourdHui
        );

        afficherNotification(
            "🎁 Bonus quotidien : +2 🪙"
        );
    }
}


// ========================================
// POINTS
// ========================================

// ========================================
// PREMIUM
// ========================================

function ouvrirPoints() {

    afficherNotification(
        "⭐ Premium bientôt disponible !"
    );

}


// ========================================
// DÉMARRAGE DE L'APPLICATION
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    async function() {

        try {
            await AdMob.initialize();
            console.log("AdMob initialisé");
        } catch (error) {
            console.error("Erreur initialisation AdMob :", error);
        }

        afficherPoints();

        // Restaurer le mode sombre
        if (
            localStorage.getItem("modeSombre") === "true"
        ) {
            document.body.classList.add("dark");
        }

        // Cacher toutes les pages
        document
            .querySelectorAll(".page")
            .forEach(page => {
                page.classList.add("cache");
            });

        // Afficher l'accueil
        let accueil =
            document.getElementById("accueil");

        if (accueil) {
            accueil.classList.remove("cache");
        }

    }
);
