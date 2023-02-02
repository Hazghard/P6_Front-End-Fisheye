import { MediaModal } from "../utils/mediaModal.js";

/**
 * Class permettant de generer la page du photographe
 */
export class PhotographPage {

    AllPhotographWithMedia; //Array with all photogrpahs and Media objects
    photographURLId; //url id parameter
    photographMedia; //Photograph
    mediaToPage; //only photograph's media
    photographPageHeader = document.querySelector(".photograph-header");
    photographMain = document.querySelector("main");
    filterSection = document.createElement("div");
    mediaSection = document.createElement("section");
    stopArrowNavigation = false;

    filters = ["Popularite", "Date", "Titre"];

    constructor(AllPhotographWithMedia) {
        this.AllPhotographWithMedia = AllPhotographWithMedia;
        this.photographURLId = new URL(location.href).searchParams.get("id");
        this.photographMedia = this.AllPhotographWithMedia.find(element => element.id == this.photographURLId);
        this.mediaToPage = this.photographMedia.media;

        this.main();
    }


    /**
     * Chef d'orchestre de la generation de page
     */
    main() {
        /**
         * Mise à jour du tri de la liste des media
         */
        this.arraySort();
        /**
         * Construction de la page
         */
        this.photagraphPageConstruct();
        /**
         * Insertion des media dans la main
         */
        this.mediaBuilder();
        /**
         * Generation du footer
         */
        this.photographFooter();
        /**
         * Mise à jour en fonction du trigger de filter
         */
        this.filterChange();
        /**
         * Generation de la modale de contact sur clic bouton
         */
        this.contactConstruct();
        /**
         * Recuperation du media clické pour instancier une modale media
         */
        this.mediaClickModal();
        /**
         * Recuperation de likes et mises a jours
         */
        this.likesUpdate();
        /**
         * Gestion de la navigation sur la page photographe
         */
        this.arrowPhotographNavigation();
    }

    photagraphPageConstruct() {
        // console.log(this.AllPhotographWithMedia, this.photographURLId, this.photographMedia, this.mediaToPage);

        //changement du nom de page
        document.title = this.photographMedia.name;

        //implémentation du header
        this.photographPageHeader.innerHTML = `
            <div class="photograph-header--txtWrapper">
                <h1>${this.photographMedia.name}</h1>
                <div>
                    <h2>${this.photographMedia.city}, ${this.photographMedia.country}</h2>
                    <p>${this.photographMedia.tagline}</p>
                </div>
            </div>
            <button class="contact_button tabIndexToSwitch" onclick="displayModal()" tabindex="2" aria-label="Contact Me">Contactez-moi</button>
            <img src="../assets/photographers/${this.photographMedia.portrait}" class="photograph-header--img" alt="${this.photographMedia.name}" aria-label="${this.photographMedia.name}">
        `;

        //creation de la partie filter
        this.filterSection.setAttribute("class", "section-filter--container");
        this.filterSection.innerHTML = `

            <label for="orderFilter">Trier par</label>

            <select name="pets" id="orderFilter" class="filters--select tabIndexToSwitch" tabindex="3" aria-label="${this.filters[0]}">
                    <option value="${this.filters[0]}">${this.filters[0]}</option>
                    <option value="${this.filters[1]}">${this.filters[1]}</option>
                    <option value="${this.filters[2]}">${this.filters[2]}</option>
            </select>
        `;
        this.photographMain.appendChild(this.filterSection);

        //ajout du main media
        this.mediaSection.setAttribute("class", "section-media--container");
        this.mediaSection.innerHTML = "";
        this.photographMain.appendChild(this.mediaSection);
    }
    mediaBuilder() {
        let tabCounterPhotographPage = 4;
        this.mediaSection.innerHTML = "";
        this.mediaToPage.forEach(element => {
            // console.log("element", element);
            let mediaType = "";
            let media = "";
            element.image ? (mediaType = "img", media = element.image) : (mediaType = "video", media = element.video);
            let mediaSectionContent = document.createElement("article");

            mediaSectionContent.innerHTML = `
                <div class="media--container" >
                    <${mediaType} src="../assets/images/${element.photographerId}/${media}" class="mediaContent tabIndexToSwitch" tabindex="${tabCounterPhotographPage}" aria-label="${element.title}" alt="${element.title}"></${mediaType}>
                    ${mediaType === "video" ? "<div class='videoIcon--container'><i class='fa-solid fa-play'></i></div>" : ""}
                </div>
                <div class="mediaSection--txt">
                    <h2>${element.title}</h2>
                    <div aria-label="likes">
                        <span>${element.likes}</span>
                        <i class="fa-solid fa-heart" mediaid="${element.id}"></i>
                    </div>
                </div>
            `;
            this.mediaSection.appendChild(mediaSectionContent);
            // console.log(mediaSectionContent)
            tabCounterPhotographPage += 1;
        });
    }
    photographFooter() {
        let photographFooter = document.createElement("footer");

        let photographLikesNb = this.mediaToPage.reduce((total, element) => total += element.likes, 0);
        // console.log(photographLikesNb);

        photographFooter.innerHTML = `
            <div class="likes--container">
                <p>${photographLikesNb}</p>
                <i class="fa-solid fa-heart"></i>
            </div>
            <p>${this.photographMedia.price} €/jour</p>
        `;
        this.photographMain.insertAdjacentElement("afterend", photographFooter);
    }
    filterChange() {
        const selectedFilterOption = document.querySelector("select");
        // console.log(selectedFilterOption);
        selectedFilterOption.addEventListener("change", event => {
            console.log(event);
            let filterValue = selectedFilterOption.value;
            this.arraySort(filterValue);
            this.mediaBuilder();
        });
    }
    arraySort(filterValue) {
        switch (filterValue) {
            case this.filters[0]:
                this.mediaToPage.sort((a, b) => a.likes - b.likes);
                console.log(this.filters[0]);
                break;
            case this.filters[1]:
                this.mediaToPage.sort((a, b) => new Date(a.date) - new Date(b.date));
                console.log(this.filters[1]);
                break;
            case this.filters[2]:
                this.mediaToPage.sort((a, b) => a.title.localeCompare(b.title));
                console.log(this.filters[2]);
                break;
            default:
                this.mediaToPage.sort((a, b) => a.likes - b.likes);
        }

        // console.log("mediaToPage", this.mediaToPage)
    }
    contactConstruct() {
        let contactContainer = document.querySelector(".contact__form--Container");
        contactContainer.innerHTML += `
        <h3>${this.photographMedia.name}</h3>
        <div>
            <label for="prenom">Prénom</label>
            <input id="prenom" type="text" name="firstname">
        </div>
        <div>
            <label for="nom">Nom</label>
            <input id="nom" type="text" name="lastname">
        </div>
        <div>
            <label for="email">Email</label>
            <input id="email" type="email" name="email">
        </div>
        <div>
            <label for="message">Votre Message</label>
            <textarea id="message" name="message"></textarea>
        </div>
        <button class="contact_button buttonFormSubmit">Envoyer</button>
        `;

        let buttonFormSubmit = document.querySelector(".buttonFormSubmit");
        // console.log(buttonFormSubmit);

        buttonFormSubmit.addEventListener("click", event => {
            event.preventDefault();
            const getAllInputs = Array.from(document.querySelectorAll("textarea, input"));
            const getAllInputsAnswers = {};

            getAllInputs.forEach(element => {
                getAllInputsAnswers[element.name] = element.value;
            });
            // console.log(getAllInputsAnswers);
        });
    }
    mediaClickModal() {
        const allPageMedia = Array.from(document.querySelectorAll(".mediaContent"));

        allPageMedia.forEach(element => {
            element.addEventListener("click", () => {
                this.stopArrowNavigation = true;
                element.blur();
                console.log("modale loading");

                new MediaModal(this.mediaToPage, element, this.stopArrowNavigation);
                document.addEventListener("mediaModalClosed", event => {
                    this.stopArrowNavigation = event.detail;
                    console.log("this.mediaClickedArrowNavigationFlag", this.stopArrowNavigation);
                });
            }
                //Amelioration : envoyer directement les réfs de media pour ne pas avoir a chercher dans m'instance modale quel media on affiche.
            );

            element.addEventListener("keyup", event => {
                if (event.keyCode === 13) {
                    this.stopArrowNavigation = true;
                    element.blur();
                    console.log("modale loading");

                    new MediaModal(this.mediaToPage, element, this.stopArrowNavigation);
                    document.addEventListener("mediaModalClosed", event => {
                        this.stopArrowNavigation = event.detail;
                        console.log("this.stopArrowNavigation", this.stopArrowNavigation);
                    });
                }
                //Amelioration : envoyer directement les réfs de media pour ne pas avoir a chercher dans m'instance modale quel media on affiche.
            });
        });

    }

    /**
     * 
     */
    likesUpdate() {
        const getAllLikesBtn = Array.from(document.querySelectorAll(".fa-heart"));
        getAllLikesBtn.forEach(item => {
            item.addEventListener("click", event => {

                let alreadyLiked = false;
                const likedIcon = event.target;

                // if (likedIcon.classList)
                // console.log("likedIcon.classList", likedIcon.classList);
                for (let i = 0; i < likedIcon.classList.length; i++) {
                    if (likedIcon.classList[i] === "liked")
                        alreadyLiked = true;
                }

                if (!alreadyLiked) {
                    //ajout de la classe liked au coeur
                    likedIcon.classList.value += " liked";

                    console.log("mediaToPage", this.mediaToPage);

                    let likedMediaID = Number(event.target.attributes.mediaid.value);
                    // console.log("likedMediaID", likedMediaID, typeof (likedMediaID));
                    //recuperation de l'objet du media
                    let likedMediaIndex = this.mediaToPage.findIndex(obj => obj.id == likedMediaID);
                    // console.log("likedMediaIndex", likedMediaIndex);

                    //ajout du like dans l'objet
                    this.mediaToPage[likedMediaIndex].likes += 1;


                    // console.log("mediaToPage", this.mediaToPage);

                    //maj du spam likes du media
                    let span = event.target.parentNode.querySelector("span");
                    let spanValue = Number(span.textContent);
                    span.textContent = spanValue + 1;

                    //supression du footer et reajout
                    document.querySelector("footer").remove();
                    this.photographFooter();
                }
            });
        });
    }
    arrowPhotographNavigation() {
        if (!this.stopArrowNavigation) {
            console.log("Navigation authorized");
            console.log("this.stopArrowNavigation in arrowPhotographNavigation", this.stopArrowNavigation);

            document.addEventListener("keydown", function (event) {
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                    let elements = document.querySelectorAll("[tabindex]");
                    console.log("elements", elements);
                    let currentIndex = Number(document.activeElement.getAttribute("tabindex")) - 1;
                    // console.log("currentIndex", currentIndex);
                    // console.log("document.activeElement.tagName", document.activeElement.tagName);

                    if (currentIndex === undefined || currentIndex === null || currentIndex === -1) {
                        elements[0].focus();
                    }
                    if (event.key === "ArrowRight" && currentIndex < elements.length - 1) {
                        event.preventDefault();
                        currentIndex += 1;
                        console.log("currentIndex", currentIndex);
                        console.log("going right");
                        // Code à exécuter lorsque la touche flèche droite
                        elements[currentIndex].focus();
                    }
                    if (event.key === "ArrowLeft" && currentIndex >= 1) {
                        event.preventDefault();
                        currentIndex -= 1;
                        console.log("currentIndex", currentIndex);
                        console.log("going left");
                        // Code à exécuter lorsque la touche flèche gauche
                        elements[currentIndex].focus();
                    }
                    console.log("currentIndex end", currentIndex);

                }
            });
        }
        else {
            console.log("Navigation forbidden");
        }
    }
}