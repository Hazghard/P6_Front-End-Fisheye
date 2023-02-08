// import ListJson from "../../data/photographers.json" assert { type: "json" }; // ne fonctionne pas sur firefox
let listJson = "";
/**
 * permet d'aller recuperer les datas du fichier JSON
 * @returns listJson 
 */
async function getJSONinfo() {
    try {
        const response = await fetch("../../data/photographers.json");
        listJson = await response.json();
        return listJson;

    }
    catch (err) {
        console.log(err);
    }
}

/**
 * array contenant la liste des photographes SANS media associés
 * @returns photographers
 */
export async function getAllPhotograph() {
    try {

        await getJSONinfo();

        let photographers = listJson.photographers; //récupère les photographes du fichier json
        // console.log("photographers", photographers);
        return photographers;

    }
    catch (error) {
        console.log(error);
    }
}

/**
 * array contenant la liste des photographes AVEC media associés
 * @returns photographers
 */
export async function getAllPhotographWithMedia() {
    try {

        await getJSONinfo();

        let photographers = listJson.photographers; //récupère les photographes du fichier json
        let mediaList = listJson.media; //récupère les médias du fichier json
        photographers = photographers.map(photographerItem => {
            return {
                ...photographerItem, //on reprends le photographerItem au complet
                media: [
                    ...(photographerItem?.media ?? []), // si photographerItem.media existe on le reprend sinon on le créer en un array
                    ...mediaList.filter(mediaItem => mediaItem.photographerId === photographerItem.id) // puis on insert dans la clé média les item qui répondent à la callback
                ],
            };
        });

        // console.log("photographers in getAllPhotographeWithMedia", photographers)

        return photographers;

    }
    catch (error) {
        console.log(error);
    }
}
























