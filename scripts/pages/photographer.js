import { getAllPhotographWithMedia } from "../utils/services.js";
import { PhotographPage } from "../factories/photographPage.js";



/**
 * Fonction pour generer la page photographes (avec execution de recuperation de medias associés au photographe depuis un fichier JSON)
 */
async function mainPhotograph() {
    const AllPhotographWithMedia = await getAllPhotographWithMedia();
    // console.log("AllPhotographWithMedia", AllPhotographWithMedia);
    new PhotographPage(AllPhotographWithMedia);
}

mainPhotograph();