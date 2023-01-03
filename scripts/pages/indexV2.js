import { getAllPhotographeWithMedia } from "../utils/api-queries.js";
import { PhotographsCreation } from "../factories/photographsIndex.js";

async function getPhotographers() {
    let AllPhotographeWithMedia = await getAllPhotographeWithMedia();
    console.log("AllPhotographeWithMedia in main", AllPhotographeWithMedia);

    return AllPhotographeWithMedia; // j'ai un probleme a comprendre quand mettre return ou non
}


async function main() {

    // Récupère les données des photographes
    const photographers = await getPhotographers();
    console.log("photographers", photographers);
    console.log("PhotographsCreation", PhotographsCreation.AppendUserCardDOM());


    // Créer les objets photographes par appel de class
    photographers.forEach(element => {
        console.log("photographers element", element)

        const article = new PhotographsCreation(element);
        console.log("photographers article", article);
        // photographers.getUserCardDOM(article);
        // PhotographsCreation.AppendUserCardDOM(article);
        // console.log("PhotographsCreation", PhotographsCreation.AppendUserCardDOM());

    });
}

main();
