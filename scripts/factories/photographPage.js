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
    filterSection = document.createElement("section");
    mediaSection = document.createElement("section");
    stopArrowNavigation;
    elementsToModify;
    originalStyles = {};


    filters = ["Popularité", "Date", "Titre"];

    constructor(AllPhotographWithMedia) {
        this.AllPhotographWithMedia = AllPhotographWithMedia;
        this.photographURLId = new URL(location.href).searchParams.get("id");
        this.photographMedia = this.AllPhotographWithMedia.find(element => element.id == this.photographURLId);
        this.mediaToPage = this.photographMedia.media;
        this.stopArrowNavigation = false;


        this.main();
    }


    /**
     * Chef d'orchestre de la generation de page
     */
    main() {

        this.arraySort();
        this.photagraphPageConstruct();
        this.mediaBuilder();
        this.photographFooter();
        this.filterChange();
        this.contactConstruct();
        this.mediaClickModal();
        this.likesUpdate();
        this.arrowPhotographNavigation();
    }

    /**
     * Construction de la page photographe par insertion dans le domaine des élements pricnipaux
     */
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
            <button class="contact_button tabIndexToSwitch" tabindex="2" aria-label="Contactez-moi">Contactez-moi</button>
            <img src="assets/photographers/${this.photographMedia.portrait}" class="photograph-header--img" alt="${this.photographMedia.name}" aria-label="${this.photographMedia.name}">
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


        // Captation d'event sur le bouton d'ouverture de la modale de contact
        document.querySelector(".contact_button").addEventListener("click", () => {
            this.openContactModal();
        });
        document.querySelector(".contact_button").addEventListener("keyup", event => {
            if (event.keyCode === 13) {
                this.openContactModal();
            }
        });
    }

    /**
     *  Iteration sur les media pour insertion de chacun dans le main
     */
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
                    <${mediaType} src="assets/images/${element.photographerId}/${media}" class="mediaContent tabIndexToSwitch" tabindex="${tabCounterPhotographPage}" aria-label="${element.title}" alt="${element.title}"></${mediaType}>
                    ${mediaType === "video" ? "<div class='videoIcon--container'><em class='fa-solid fa-play'></em></div>" : ""}
                </div>
                <div class="mediaSection--txt">
                    <h2>${element.title}</h2>
                    <div aria-label="likes">
                        <span>${element.likes}</span>
                        <em class="fa-solid fa-heart tabIndexToSwitch" mediaid="${element.id}" tabindex="${tabCounterPhotographPage + 1}"></em>
                    </div>
                </div>
            `;
            this.mediaSection.appendChild(mediaSectionContent);
            // console.log(mediaSectionContent)
            tabCounterPhotographPage += 2;
        });
    }

    /**
     *  Creation et insertion du footer
     */
    photographFooter() {
        let photographFooter = document.createElement("footer");

        let photographLikesNb = this.mediaToPage.reduce((total, element) => total += element.likes, 0);
        // console.log(photographLikesNb);

        photographFooter.innerHTML = `
            <div class="likes--container">
                <p>${photographLikesNb}</p>
                <em class="fa-solid fa-heart"></em>
            </div>
            <p>${this.photographMedia.price} €/jour</p>
        `;
        this.photographMain.insertAdjacentElement("afterend", photographFooter);
    }

    /**
     * Fonction servant à catcher le changement de filtre, réorginisation du tableau de medias, puis execution de mediaBuilder par remise à zero et regeneration
     * Le tableau de media est réarangé dans l'odre en fonction du critère filtre selectionné 
     */
    filterChange() {
        const selectedFilterOption = document.querySelector("select");
        // console.log(selectedFilterOption);
        selectedFilterOption.addEventListener("change", event => {
            console.log(event);
            let filterValue = selectedFilterOption.value;
            this.arraySort(filterValue);
            this.mediaBuilder();
            this.mediaClickModal();
            this.likesUpdate();
        });
    }

    /**
     * Tri de l'array en fonction du param de filtre
     * @param {*} filterValue 
     */
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

    /**
     * Generation de la modale contact
     */
    contactConstruct() {

        // this.tabIndexOriginalStateSave();

        let contactContainer = document.querySelector("#contact_modal");
        contactContainer.innerHTML = `
        <div class="modal">
            <header>
            <h2>Contactez-moi</h2>
            <img src="assets/icons/close.svg" class="btn--contact__close" alt="Button to close contact form" tabindex="1"/>
            </header>
            <form class="contact__form--Container">
                <h3>${this.photographMedia.name}</h3>
                <div>
                    <label for="prenom">Prénom</label>
                    <input id="prenom" type="text" name="firstname" aria-label="Indiquez votre prénom" tabindex="2">
                </div>
                <div>
                    <label for="nom">Nom</label>
                    <input id="nom" type="text" name="lastname" aria-label="Indiquez votre nom" tabindex="3">
                </div>
                <div>
                    <label for="email">Email</label>
                    <input id="email" type="email" name="email" aria-label="Entrez votre adresse mail" tabindex="4">
                </div>
                <div>
                    <label for="message">Votre Message</label>
                    <textarea id="message" name="message" aria-label="Entrez votre message" tabindex="5"></textarea>
                </div>
                <button class="contact_button buttonFormSubmit" tabindex="">Envoyer</button>
        
            </form>
        </div>
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
            console.log(getAllInputsAnswers);
        });

        // Captation d'event sur la croix de modale de contact
        document.querySelector(".btn--contact__close").addEventListener("click", () => {
            this.closeContactModal();
        });
        document.querySelector(".btn--contact__close").addEventListener("keyup", event => {
            if (event.keyCode === 13) {
                this.closeContactModal();
            }
        });

    }

    /**
     * Capatation du click sur un media puis tranfert vers la modale permettant de créer la mediaModale
     */
    mediaClickModal() {
        const allPageMedia = Array.from(document.querySelectorAll(".mediaContent"));

        allPageMedia.forEach(element => {
            element.addEventListener("click", () => {
                console.log(this.stopArrowNavigation);
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
     * Capatation des click ou appuis sur enter depuis un coeur
     */
    likesUpdate() {
        const getAllLikesBtn = Array.from(document.querySelectorAll(".fa-heart"));
        getAllLikesBtn.forEach(item => {
            item.addEventListener("click", event => {
                this.updateLikes(event);
            });

            item.addEventListener("keydown", event => {
                if (event.keyCode === 13) {
                    this.updateLikes(event);
                }
            });
        });
    }


    /**
    * Update des likes des photos et globaux du photographe suite a captation de click sur un coeur ou appuy sur enter
    * @param {*} event 
    */
    updateLikes(event) {
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
    }

    /**
     * Gestion de la navigation par touche arrow (et celles du numpad)
     */
    arrowPhotographNavigation() {
        document.addEventListener("keydown", (event) => {
            if (!this.stopArrowNavigation) {
                console.log("Navigation authorized");
                // console.log("this.stopArrowNavigation in arrowPhotographNavigation", this.stopArrowNavigation);

                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                    let elements = document.querySelectorAll("[tabindex]");
                    // console.log("elements", elements);
                    let currentIndex = Number(document.activeElement.getAttribute("tabindex")) - 1;
                    // console.log("currentIndex", currentIndex);
                    // console.log("document.activeElement.tagName", document.activeElement.tagName);

                    if (currentIndex === undefined || currentIndex === null || currentIndex === -1) {
                        elements[0].focus();
                    }
                    if (event.key === "ArrowRight" && currentIndex < elements.length - 1) {
                        event.preventDefault();
                        currentIndex += 1;
                        // console.log("currentIndex", currentIndex);
                        // console.log("going right");
                        // Code à exécuter lorsque la touche flèche droite
                        elements[currentIndex].focus();
                    }
                    if (event.key === "ArrowLeft" && currentIndex >= 1) {
                        event.preventDefault();
                        currentIndex -= 1;
                        // console.log("currentIndex", currentIndex);
                        // console.log("going left");
                        // Code à exécuter lorsque la touche flèche gauche
                        elements[currentIndex].focus();
                    }
                    // console.log("currentIndex end", currentIndex);

                }
            }
            else {
                console.log("Navigation forbidden");
            }
        });
    }
    /**
     * Chargement de la modale de contact
     */
    openContactModal() {
        this.stopArrowNavigation = true;
        this.tabIndexOriginalStateSave();
        const modal = document.getElementById("contact_modal");
        modal.style.display = "block";

        //trigger si appuis sur echap pour fermeture
        document.addEventListener("keyup", event => {
            if (event.key === "Escape") {
                this.closeContactModal();
            }
        });
    }

    /**
     * Déchargement de la modale par supression du dom
     * Peux être déclenché par appuis sur la croix (click ou selection par tyouche tab et appuis sur touche enter), ou appuis sur la touche echap
     */
    closeContactModal() {

        const modal = document.getElementById("contact_modal");
        modal.style.display = "none";

        //Restauration des tabindex comme à l'origine
        for (let i = 0; i < this.elementsToModify.length; i++) {
            this.elementsToModify[i].style.pointerEvents = this.originalStyles[i].pointerEvents;
            this.elementsToModify[i].tabIndex = this.originalStyles[i].tabIndex;
        }

        //Remise du tab index pour le a du logo
        // this.logoBaliseA.setAttribute("tabindex", "1");

        // opérations pour fermer la modale...
        this.stopArrowNavigation = false;
    }
    /**
     * Fonction de sauvegarde des tabindex pour navigation uniquement dans la modale
     */
    tabIndexOriginalStateSave() {
        // Sélection des éléments à modifier
        this.elementsToModify = document.querySelectorAll(".tabIndexToSwitch");
        // console.log("this.elementsToModify", this.elementsToModify);

        // Stockage de l'état d'origine des éléments
        for (let i = 0; i < this.elementsToModify.length; i++) {
            this.originalStyles[i] = {
                pointerEvents: this.elementsToModify[i].style.pointerEvents,
                tabIndex: this.elementsToModify[i].tabIndex
            };
        }
        // Appliquer les propriétés de style pour empêcher la navigation
        for (let i = 0; i < this.elementsToModify.length; i++) {
            this.elementsToModify[i].style.pointerEvents = "none";
            this.elementsToModify[i].tabIndex = -1;
        }
    }
}