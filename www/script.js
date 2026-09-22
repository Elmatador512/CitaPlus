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

    // MESSAGES : retour exactement à la position du message
    if (
        pagePrecedente === "listeMessages" &&
        typeof window.positionRetourMessages !== "undefined"
    ) {

        let position =
            window.positionRetourMessages;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                window.scrollTo(0, position);
            });
        });

        return;
    }

    // CITATIONS
    if (
        pagePrecedente === "listeCitations" &&
        typeof window.positionRetourCitations !== "undefined"
    ) {

        let position =
            window.positionRetourCitations;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                window.scrollTo(0, position);
            });
        });

        return;
    }

    // PHILOSOPHES
    if (
        pagePrecedente === "philosophes" &&
        typeof window.positionRetourPhilosophes !== "undefined"
    ) {

        let position =
            window.positionRetourPhilosophes;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                window.scrollTo(0, position);
            });
        });

        return;
    }

    // CATÉGORIES MESSAGES
    if (
        pagePrecedente === "messages" &&
        typeof window.positionRetourCategoriesMessages !== "undefined"
    ) {

        let position =
            window.positionRetourCategoriesMessages;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                window.scrollTo(0, position);
            });
        });

        return;
    }

    // RETOUR NORMAL
    window.scrollTo(0, 0);
}


// ========================================
// COMPORTEMENT NORMAL
// ========================================

window.scrollTo(0, 0);

// ========================================
// POINTS — TEST AVEC SAUVEGARDE
// ========================================

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
        "20"
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


// Les 3 premiers sont gratuits + déblocages sauvegardés
let philosophesDebloques = [
    ...new Set([
        "socrate",
        "platon",
        "aristote",
        ...philosophesStockes
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
    if (
        philosopheEstDebloque(nom)
    ) {
window.positionRetourPhilosophes = window.scrollY;
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
// ========================================
// DÉBLOQUER UNE CITATION
// ========================================
function debloquerCitation(nom, index) {

    if (!philosophes[nom]) {
        return;
    }

    // Citation déjà débloquée
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

    // Mémoriser la position
    let positionScroll =
        window.scrollY;

    // Retirer 10 points
    retirerPoints(10);

    // Créer la liste si nécessaire
    if (
        !Array.isArray(
            citationsDebloquees[nom]
        )
    ) {

        citationsDebloquees[nom] = [];
    }

    // Ajouter la citation
    if (
        !citationsDebloquees[nom].includes(index)
    ) {

        citationsDebloquees[nom].push(index);
    }

    // Sauvegarder
    sauvegarderDeblocages();

    // Fermer la fenêtre
    fermerModalCitationDeblocage();

    // ========================================
    // SI ON EST EN MODE LECTURE
    // ========================================
    if (
    !document
        .getElementById("lecture")
        ?.classList.contains("cache")
) {

    indexCitation = index;

    afficherCitation();

    afficherNotification(
        "🔓 Citation débloquée ! -10 🪙"
    );

    return;
}

    // ========================================
    // SI ON EST DANS LA LISTE VERTICALE
    // ========================================
    ouvrirListeCitations(nom);
    // Restaurer exactement la position
    requestAnimationFrame(() => {

        window.scrollTo(
            0,
            positionScroll
        );

    });

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
        return;
    }

    // Vérifier les points
    if (points < 20) {

        afficherNotification(
            "❌ Tu n'as pas assez de points."
        );

        return;
    }

    // Mémoriser la position
    let positionScroll =
        window.scrollY;

    // Retirer les 20 points
    retirerPoints(20);

    // Ajouter le philosophe
    philosophesDebloques.push(nom);

    // Éviter les doublons
    philosophesDebloques = [
        ...new Set(philosophesDebloques)
    ];

    // Sauvegarder
    sauvegarderDeblocages();

    // Fermer la fenêtre
    fermerModalDeblocage();

    // Actualiser la liste des philosophes
    afficherListePhilosophes();

    // Restaurer la position
    requestAnimationFrame(() => {

        window.scrollTo(
            0,
            positionScroll
        );

    });

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
        document.getElementById(
            "titreListeCitations"
        );

    if (titre) {
        titre.textContent =
            "📖 " + obtenirNomPhilosophe(nom);
    }

    let container =
        document.getElementById(
            "listeCitationsContainer"
        );

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

                window.positionRetourCitations =
                    window.scrollY;

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
// CITATION / MESSAGE SUIVANT
// ========================================

function citationSuivante() {

    if (
        !listeActuelle ||
        indexCitation >= listeActuelle.length - 1
    ) {

        

        afficherNotification(
            "🏁 Dernier élément"
        );

        return;
    }

    let prochainIndex =
        indexCitation + 1;

    // ========================================
    // SI ON EST DANS LES MESSAGES
    // ========================================
    if (
        typeof messages !== "undefined" &&
        messages[nomAuteur] === listeActuelle
    ) {

        if (
            !messageEstDebloque(
                nomAuteur,
                prochainIndex
            )
        ) {

            ouvrirModalDeblocageMessage(
                nomAuteur,
                prochainIndex
            );

            return;
        }

        indexCitation =
            prochainIndex;

        afficherMessage();

        return;
    }

    // ========================================
    // SI ON EST DANS LES CITATIONS
    // ========================================
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
// ÉLÉMENT PRÉCÉDENT
// ========================================

function citationPrecedente() {

    if (indexCitation <= 0) {

        afficherNotification(
            "🏁 Premier élément"
        );

        return;
    }

    let precedentIndex =
        indexCitation - 1;

    // ========================================
    // SI ON EST DANS LES MESSAGES
    // ========================================

    if (window.modeLectureMessage === true) {

        if (
            !messageEstDebloque(
                nomAuteur,
                precedentIndex
            )
        ) {

            ouvrirModalDeblocageMessage(
                nomAuteur,
                precedentIndex
            );

            return;
        }

        indexCitation =
            precedentIndex;

        afficherMessage();

        return;
    }

    // ========================================
    // SI ON EST DANS LES CITATIONS
    // ========================================

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

    // ========================================
    // MESSAGES TOUCHANTS
    // ========================================

    if (
        nomAuteur &&
        typeof messages !== "undefined" &&
        messages[nomAuteur]
    ) {

        let categorie =
            nomAuteur;

        let position =
            window.positionRetourMessages || 0;

        setTimeout(() => {

            ouvrirListeMessages(
                categorie
            );

            requestAnimationFrame(() => {

                window.scrollTo(
                    0,
                    position
                );

            });

        }, 50);

        return;
    }


    // ========================================
    // CITATIONS D'UN PHILOSOPHE
    // ========================================

    if (
        nomAuteur &&
        philosophes[nomAuteur]
    ) {

        let nom =
            nomAuteur;

        let position =
            window.positionRetourCitations || 0;

        setTimeout(() => {

            ouvrirListeCitations(
                nom
            );

            requestAnimationFrame(() => {

                window.scrollTo(
                    0,
                    position
                );

            });

        }, 50);

        return;
    }


    // ========================================
    // RETOUR AUX POPULAIRES
    // ========================================

    ouvrirPopulaires();
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
// MESSAGES TOUCHANTS
// ========================================

function ouvrirMessages() {

    cacherPages("messages");

}


// ========================================
// MESSAGE DÉBLOQUÉ ?
// ========================================

function messageEstDebloque(categorie, index) {

    // Les 2 premiers messages sont gratuits
    if (index < 2) {
        return true;
    }

    let stock =
        localStorage.getItem("messagesDebloques");

    let messagesDebloques = {};

    try {
        messagesDebloques =
            JSON.parse(stock) || {};
    } catch (e) {
        messagesDebloques = {};
    }

    if (
        !Array.isArray(
            messagesDebloques[categorie]
        )
    ) {
        return false;
    }

    return messagesDebloques[categorie]
        .includes(index);
}


// ========================================
// SAUVEGARDER LES MESSAGES DÉBLOQUÉS
// ========================================

function sauvegarderMessagesDebloques(
    messagesDebloques
) {

    localStorage.setItem(
        "messagesDebloques",
        JSON.stringify(
            messagesDebloques
        )
    );
}


// ========================================
// CHOISIR UNE CATÉGORIE DE MESSAGE
// ========================================

function choisirCategorieMessage(categorie) {

    if (
        typeof messages === "undefined" ||
        !messages[categorie]
    ) {
        afficherNotification(
            "Cette catégorie sera bientôt disponible."
        );
        return;
    }

    // Mémoriser la position dans la liste des catégories
    window.positionRetourCategoriesMessages =
        window.scrollY;

    nomAuteur = categorie;

    ouvrirListeMessages(categorie);
}

// ========================================
// AFFICHER LA LISTE DES MESSAGES
// ========================================

function ouvrirListeMessages(categorie) {

    if (
        typeof messages === "undefined" ||
        !messages[categorie]
    ) {
        return;
    }

    let titre =
        document.getElementById(
            "titreListeMessages"
        );

    if (titre) {

        titre.textContent =
            "❤️ " +
            categorie;
    }

    let container =
        document.getElementById(
            "listeMessagesContainer"
        );

    if (!container) {
        return;
    }

    container.innerHTML = "";

    messages[categorie].forEach(
        (message, index) => {

            let disponible =
                messageEstDebloque(
                    categorie,
                    index
                );
console.log("MESSAGE", index, "DÉBLOQUÉ =", disponible);
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
                        ? "« " + message + " »"
                        : "🔒 Message verrouillé"
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

                // Mémoriser exactement
                // la position du message
                window.positionRetourMessages =
                    window.scrollY;

                if (
                    messageEstDebloque(
                        categorie,
                        index
                    )
                ) {

                    ouvrirMessage(
                        categorie,
                        index
                    );

                } else {

                    ouvrirModalDeblocageMessage(
                        categorie,
                        index
                    );

                }

            };

            container.appendChild(element);

        }
    );

    cacherPages("listeMessages");
}


// ========================================
// MODALE DE DÉBLOCAGE D'UN MESSAGE
// ========================================

function ouvrirModalDeblocageMessage(
    categorie,
    index
) {

    let ancienneModal =
        document.getElementById(
            "modalMessageDeblocage"
        );

    if (ancienneModal) {
        ancienneModal.remove();
    }

    let modal =
        document.createElement("div");

    modal.id =
        "modalMessageDeblocage";

    modal.className =
        "modal";

    modal.innerHTML = `

        <div class="modal-contenu">

            <h2>🔒 Message verrouillé</h2>

            <p>
                Ce message est verrouillé.
            </p>

            <p>
                <strong>
                    🪙 Prix : 10 points
                </strong>
            </p>

            <button
                onclick="
                    debloquerMessage(
                        '${categorie}',
                        ${index}
                    )
                "
            >
                🔓 Débloquer
            </button>

            <button
                class="btnAnnuler"
                onclick="
                    fermerModalDeblocageMessage()
                "
            >
                Annuler
            </button>

        </div>

    `;

    document.body.appendChild(modal);
}


// ========================================
// FERMER MODALE MESSAGE
// ========================================

function fermerModalDeblocageMessage() {

    let modal =
        document.getElementById(
            "modalMessageDeblocage"
        );

    if (modal) {
        modal.remove();
    }
}

// ========================================
// DÉBLOQUER UN MESSAGE
// ========================================

function debloquerMessage(
    categorie,
    index
) {console.log(
    "DÉBLOCAGE MESSAGE → catégorie:",
    categorie,
    "index reçu:",
    index
);

    if (
        typeof messages === "undefined" ||
        !messages[categorie] ||
        !messages[categorie][index]
    ) {
        return;
    }

    // ========================================
    // SI DÉJÀ DÉBLOQUÉ
    // ========================================

    if (
        messageEstDebloque(
            categorie,
            index
        )
    ) {

        fermerModalDeblocageMessage();

        ouvrirMessage(
            categorie,
            index
        );

        return;
    }

    // ========================================
    // VÉRIFIER LES POINTS
    // ========================================

    if (points < 10) {

        afficherNotification(
            "❌ Tu n'as pas assez de points."
        );

        return;
    }

    // ========================================
    // CONSERVER LA POSITION
    // ========================================

    let positionScroll =
        window.scrollY;

    // ========================================
    // RETIRER LES POINTS
    // ========================================

    retirerPoints(10);

    // ========================================
    // RÉCUPÉRER LES DÉBLOCAGES
    // ========================================

    let messagesDebloques = {};

    try {

        messagesDebloques =
            JSON.parse(
                localStorage.getItem(
                    "messagesDebloques"
                )
            ) || {};

    } catch (e) {

        messagesDebloques = {};

    }

    if (
        !Array.isArray(
            messagesDebloques[categorie]
        )
    ) {

        messagesDebloques[categorie] = [];

    }

    if (
        !messagesDebloques[categorie]
            .includes(index)
    ) {

        messagesDebloques[categorie]
            .push(index);

    }

    sauvegarderMessagesDebloques(
        messagesDebloques
    );

    // ========================================
    // FERMER LA MODALE
    // ========================================

    fermerModalDeblocageMessage();

    // ========================================
    // SI ON ÉTAIT EN LECTURE
    // ========================================

if (
    !document
        .getElementById("lecture")
        ?.classList.contains("cache")
) {

    nomAuteur = categorie;

    listeActuelle =
        messages[categorie];

    indexCitation = index;

    afficherMessage();

    afficherNotification(
        "🔓 Message débloqué ! -10 🪙"
    );

    return;
}

    // ========================================
    // SI ON ÉTAIT DANS LA LISTE
    // ========================================

    ouvrirListeMessages(categorie);

    requestAnimationFrame(() => {

        window.scrollTo(
            0,
            positionScroll
        );

    });

    afficherNotification(
        "🔓 Message débloqué ! -10 🪙"
    );
}
// ========================================
// ACTUALISER L'AFFICHAGE APRÈS DÉBLOCAGE
// ========================================

function actualiserListeApresDeblocage() {

    if (
        nomAuteur &&
        typeof messages !== "undefined" &&
        messages[nomAuteur]
    ) {

        ouvrirListeMessages(nomAuteur);
        return;
    }

    if (
        nomAuteur &&
        typeof philosophes !== "undefined" &&
        philosophes[nomAuteur]
    ) {

        ouvrirListeCitations(nomAuteur);
    }
}
// ========================================
// OUVRIR UN MESSAGE
// ========================================

function ouvrirMessage(
    categorie,
    index
) {

    if (
        typeof messages === "undefined" ||
        !messages[categorie]
    ) {
        return;
    }

    if (
        !messageEstDebloque(
            categorie,
            index
        )
    ) {

        ouvrirModalDeblocageMessage(
            categorie,
            index
        );

        return;
    }

    listeActuelle =
        messages[categorie];
window.modeLectureMessage = true;
    indexCitation =
        index;

    nomAuteur =
        categorie;

    afficherMessage();

    cacherPages("lecture");
}


// ========================================
// AFFICHER UN MESSAGE
// ========================================

function afficherMessage() {

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
            "❤️ Message touchant";

    }
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
// NOTIFICATION / CONFIRMATION
// ========================================

function afficherNotification(message) {

    // Supprimer une ancienne fenêtre
    let ancienne =
        document.getElementById(
            "notificationConfirmation"
        );

    if (ancienne) {
        ancienne.remove();
    }

    // Créer la fenêtre
    let modal =
        document.createElement("div");

    modal.id =
        "notificationConfirmation";

    modal.className =
        "modal";

    modal.innerHTML = `

        <div class="modal-contenu">

            <p>
                ${message}
            </p>

            <button
                onclick="
                    document
                        .getElementById(
                            'notificationConfirmation'
                        )
                        ?.remove();
                "
            >
                OK
            </button>

        </div>

    `;

    document.body.appendChild(modal);
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
            "🎁 Bonus quotidien : +3 🪙"
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
function ouvrirPubPoints() {

    // La publicité récompensée sera appelée ici
    afficherNotification(
        "📺 Regarde une vidéo pour gagner des points !"
    );

}

// ========================================
// DÉMARRAGE DE L'APPLICATION
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

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
// ========================================
// BONUS QUOTIDIEN
// ========================================

function obtenirDateBonus() {
    const maintenant = new Date();

    const annee = maintenant.getFullYear();
    const mois = String(maintenant.getMonth() + 1).padStart(2, "0");
    const jour = String(maintenant.getDate()).padStart(2, "0");

    return annee + "-" + mois + "-" + jour;
}


function bonusQuotidien() {

    const aujourdHui = obtenirDateBonus();

    const dernierBonus =
        localStorage.getItem("dateDernierBonus");

    // Vérification d'un changement d'heure vers le passé
    const maintenant = Date.now();

    const derniereHeure = parseInt(
        localStorage.getItem("heureDernierBonus") || "0"
    );

    if (derniereHeure > 0 && maintenant < derniereHeure) {

        afficherMessageBonus(
            "⚠️ Heure modifiée",
            "L'heure de l'appareil semble avoir été modifiée. Le bonus est temporairement bloqué.",
            "OK"
        );

        return;
    }

    // Mémoriser l'heure actuelle
    localStorage.setItem(
        "heureDernierBonus",
        maintenant
    );

    // Bonus déjà récupéré aujourd'hui
    if (dernierBonus === aujourdHui) {

        afficherMessageBonus(
            "🎁 Bonus quotidien",
            "Tu as déjà récupéré ton bonus aujourd'hui. Reviens demain !",
            "OK"
        );

        return;
    }

    // Confirmation
    afficherConfirmationBonus();
}


// ========================================
// CONFIRMATION DU BONUS
// ========================================

function afficherConfirmationBonus() {

    const ancienne = document.getElementById("fenetreBonus");

    if (ancienne) {
        ancienne.remove();
    }

    const fenetre = document.createElement("div");

    fenetre.id = "fenetreBonus";

    fenetre.innerHTML = `
        <div class="bonus-overlay">

            <div class="bonus-fenetre">

                <div class="bonus-icone">
                    🎁
                </div>

                <h2>Bonus quotidien</h2>

                <p>
                    Tu peux récupérer
                    <strong>+3 points</strong>
                    pour aujourd'hui.
                </p>

                <div class="bonus-boutons">

                    <button
                        class="bonus-annuler"
                        onclick="fermerBonus()">
                        Annuler
                    </button>

                    <button
                        class="bonus-confirmer"
                        onclick="confirmerBonus()">
                        Obtenir +3 points
                    </button>

                </div>

            </div>

        </div>
    `;

    document.body.appendChild(fenetre);
}


// ========================================
// CONFIRMER LE BONUS
// ========================================

function confirmerBonus() {

    const aujourdHui = obtenirDateBonus();

    // Double vérification
    const dernierBonus =
        localStorage.getItem("dateDernierBonus");

    if (dernierBonus === aujourdHui) {

        fermerBonus();

        afficherMessageBonus(
            "🎁 Bonus quotidien",
            "Tu as déjà récupéré ton bonus aujourd'hui. Reviens demain !",
            "OK"
        );

        return;
    }

    // Récupérer les points actuels
    let points = parseInt(
        localStorage.getItem("points") || "20"
    );

    // Ajouter 3 points
    points += 3;

    // Sauvegarder
    localStorage.setItem("points", points);

    localStorage.setItem(
        "dateDernierBonus",
        aujourdHui
    );

    localStorage.setItem(
        "heureDernierBonus",
        Date.now()
    );

    fermerBonus();

    // Actualiser l'affichage des points
    if (typeof afficherPoints === "function") {
        afficherPoints();
    }

    // Message de confirmation
    afficherMessageBonus(
        "🎉 Bonus obtenu !",
        "<strong>+3 points</strong> ont été ajoutés à ton compte.",
        "OK"
    );
}


// ========================================
// FERMER LA CONFIRMATION
// ========================================

function fermerBonus() {

    const fenetre =
        document.getElementById("fenetreBonus");

    if (fenetre) {
        fenetre.remove();
    }
}


// ========================================
// MESSAGE FINAL
// ========================================

function afficherMessageBonus(titre, message, bouton) {

    const ancienne =
        document.getElementById("fenetreBonus");

    if (ancienne) {
        ancienne.remove();
    }

    const fenetre = document.createElement("div");

    fenetre.id = "fenetreBonus";

    fenetre.innerHTML = `
        <div class="bonus-overlay">

            <div class="bonus-fenetre">

                <div class="bonus-icone">
                    🎁
                </div>

                <h2>${titre}</h2>

                <p>${message}</p>

                <button
                    class="bonus-ok"
                    onclick="fermerBonus()">
                    ${bouton}
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(fenetre);
}