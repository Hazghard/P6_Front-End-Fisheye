import { getAllPhotograph } from "../utils/services.js";
import { PhotographsCreation } from "../factories/photographsIndex.js";

/**
 * Fonction pour recuperer tous les photographes (sans medias associés) depuis un fichier JSON
 * @returns { object } AllPhotograph
 */
async function getPhotographers() {
    const AllPhotograph = await getAllPhotograph();
    return AllPhotograph;
}

/**
 * Permet la navigation par touche fleche gauche et droite dans la page index (depuis le logo et chaque photographe)
 */
function arrowIndexNavigation() {
    document.addEventListener("keyup", function (event) {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            let elements = document.querySelectorAll("[tabindex]");
            console.log("elements", elements);
            let currentIndex = Number(document.activeElement.getAttribute("tabindex")) - 1;
            console.log("currentIndex", currentIndex);



            if (currentIndex === undefined || currentIndex === null || currentIndex === -1) {
                elements[0].focus();
            }
            if (event.key === "ArrowRight" && currentIndex < elements.length - 1) {
                currentIndex += 1;
                console.log("going right");
                // Code à exécuter lorsque la touche flèche droite
                elements[currentIndex].focus();
            }
            if (event.key === "ArrowLeft" && currentIndex >= 1) {
                currentIndex -= 1;
                console.log("going left");
                // Code à exécuter lorsque la touche flèche gauche
                elements[currentIndex].focus();
            }
        }
    });
}


/**
 * Chef d'orchestre de l'execution du code // permet de generer les photographes dans le dom
 */
async function main() {

    // Récupère les données des photographes
    const photographers = await getPhotographers();
    // console.log("photographers main", photographers)

    // Créer les objets photographes par appel de class
    photographers.forEach(element => {
        const article = new PhotographsCreation(element);
        // console.log("article main", article)
        article.AppendDOM();
    });

    arrowIndexNavigation();
}

main();