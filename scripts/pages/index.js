import { getAllPhotographeWithMedia } from "../utils/api-queries.js";

async function getPhotographers() {

    let AllPhotographeWithMedia = await getAllPhotographeWithMedia();
    // return AllPhotographeWithMedia;
    let photographers = await PhotographsCreation();

}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        console.log('photographerModel', photographerModel)

        // console.log("photographerModel", photographerModel);
        const userCardDOM = photographerModel.getUserCardDOM();
        // console.log("userCardDOM", userCardDOM);
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();

    // Display les datas des photographes
    displayData(photographers);
};

init();
