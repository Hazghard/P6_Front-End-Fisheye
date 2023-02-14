export class MediaModal {

    actualMedia;
    atualMediaName;
    actualMediaIndex;
    actualMediaType;
    nextMedia;
    nextMediaType;
    mediaList;
    mediaClicked;
    photographURLId;
    prevMedia;
    elementsToModify;
    originalStyles = {};
    rightSliderBtn;
    leftSliderBtn;
    logoBaliseA;

    mainDomElem = document.querySelector("#main");

    constructor(mediaList, element, stopArrowNavigation) {
        //init des variables pour reset
        this.actualMedia = "";
        this.atualMediaName = "";
        this.actualMediaIndex = "";
        this.actualMediaType = "";
        this.nextMedia = "";
        this.nextMediaType = "";
        this.mediaList = "";
        this.mediaClicked = "";
        this.photographURLId = "";
        this.prevMedia = "";
        this.elementsToModify = "";
        this.originalStyles = {};
        this.rightSliderBtn = "";
        this.leftSliderBtn = "";
        this.logoBaliseA = "";


        //Recuperation des valeurs
        this.mediaList = mediaList;
        this.mediaClicked = element;
        this.actualMedia = element.src;
        this.stopArrowNavigation = stopArrowNavigation;
        this.logoBaliseA = document.querySelector(".logo--a");
        this.main();
        // console.log("this.mediaList", this.mediaList, "this.mediaClicked", this.mediaClicked, "this.actualMedia", this.actualMedia, mediaClickedArrowNavigationFlag);
        console.log("this.actualMedia", this.actualMedia);
    }
    /**
     * Chef d'orchestre
     */
    main() {
        this.modalCreation();
    }

    /**
     * Creation et initialisation de la modale media
     */
    modalCreation() {
        const mediaModal = document.createElement("div");
        this.atualMediaName = this.actualMedia.substring(this.actualMedia.lastIndexOf("/") + 1);
        // console.log("this.atualMediaName", this.atualMediaName);

        //identification du type de media
        this.actualMediaIndex = this.mediaList.findIndex(obj => obj.video === this.atualMediaName || obj.image === this.atualMediaName);
        // console.log("index", this.actualMediaIndex);

        this.actualMediaType = this.actualMediaIndex != undefined && this.actualMediaIndex != null ? (this.mediaList[this.actualMediaIndex].image ? "img" : "video controls") : null;
        // console.log("this.actualMediaType", this.actualMediaType);


        const medialModalTabIndex = Number(this.mediaList.length + 4);
        mediaModal.setAttribute("class", "modal--container");
        mediaModal.innerHTML = `
        <div class="carousel__Btn--Container">
            <em class="fa-solid fa-chevron-left carousel--Btn carousel--left" tabindex="${medialModalTabIndex + 2}"></em>
        </div>
        <div class="modal__media--Container">
            <${this.actualMediaType} src="${this.actualMedia}" aria-label="${this.mediaList[this.actualMediaIndex].title}" alt="${this.mediaList[this.actualMediaIndex].title}">
        </div>
        <div  class="carousel__Btn--Container">
            <em class="fa-solid fa-chevron-right carousel--Btn carousel--right" tabindex="${medialModalTabIndex + 3}"></em>
        </div>
        <img src="assets/icons/close.svg" class="mediaModal--close" tabindex="${medialModalTabIndex + 1}" alt="Button to close the media"/>
        `;

        this.mainDomElem.insertAdjacentElement("afterend", mediaModal);

        this.rightSliderBtn = document.querySelector(".fa-chevron-right");
        this.leftSliderBtn = document.querySelector(".fa-chevron-left");

        //Insertion du tab index pour le a du logo - sinon il est targetable par tabulation ou arrow nav
        this.logoBaliseA.setAttribute("tabindex", "-1");



        //DETECTION DES CLICS ET ARROW POUR MOUVEMENT CAROUSEL
        // eslint-disable-next-line no-unused-vars
        const carrouselClickSide = Array.from(document.querySelectorAll(".carousel__Btn--Container")).forEach(element => {
            element.addEventListener("click", event => {
                // console.log("event.target.classList.value", event.target.classList.value);
                event.target.classList.value.includes("carousel--left") ? this.mediaSlide(-1) : this.mediaSlide(+1);
            });

            //trigger touche enter
            element.addEventListener("keyup", event => {
                if (event.keyCode === 13) {
                    event.target.classList.value.includes("carousel--left") ? this.mediaSlide(-1) : this.mediaSlide(+1);
                }
            });
        });

        //Navigation par arrow keys
        document.addEventListener("keyup", event => {
            // console.log("event", event);
            if (event.key === 39 || event.key === 102 || event.key === "ArrowRight") {
                // Code à exécuter lorsque la touche flèche droite  || numpad 6 est relachée
                // console.log(this.rightSliderBtn);
                this.rightSliderBtn.focus();
                this.mediaSlide(+1);
            }
            if (event.key === 37 || event.key === 100 || event.key === "ArrowLeft") {
                // Code à exécuter lorsque la touche flèche gauche  || numpad 4  est relachée
                // console.log(this.leftSliderBtn);
                this.leftSliderBtn.focus();
                this.mediaSlide(-1);
            }
        });

        //mise du focus sur la croix (sinon en ne peux pas tab)
        document.querySelector(".mediaModal--close").focus();

        //trigger appuis sur enter de la croix de modale ou touche echap 
        document.querySelector(".mediaModal--close").addEventListener("keyup", event => {
            if (event.keyCode === 13 || event.key === "Escape" || event.key === "Esc") {
                this.closeMediaModal();
            }
        });
        document.querySelector(".mediaModal--close").addEventListener("click", () => {
            this.closeMediaModal();
        });

        //trigger si appuis sur echap pour fermeture
        document.addEventListener("keyup", event => {
            if (event.key === "Escape") {
                this.closeMediaModal();
            }
        });



        this.sliderBtnDisplay();
        this.tabIndexOriginalStateSave();
    }

    /**
     * Gestion du slide de media, l'event est recupéré depuis modalCreation(), ici il s'agit de trouver les media actuels et suivant (précedent ou suivant)
     * @param {Number} carrouselClickSide 
     */
    mediaSlide(carrouselClickSide) {


        this.atualMediaName = this.actualMedia.substring(this.actualMedia.lastIndexOf("/") + 1);
        this.actualMediaIndex = this.mediaList.findIndex(obj => obj.video === this.atualMediaName || obj.image === this.atualMediaName);

        // console.log("carrouselClickSide", carrouselClickSide);
        console.log("this.mediaList", this.mediaList, "this.actualMedia", this.actualMedia, "this.actualMediaIndex", this.actualMediaIndex, "this.mediaList.length", this.mediaList.length);
        if (carrouselClickSide === -1 && this.actualMediaIndex < this.mediaList.length) { console.log(-1); }
        if (carrouselClickSide === +1 && this.actualMediaIndex > 0) { console.log(+1); }


        if ((this.actualMediaIndex > 0 && this.actualMediaIndex < this.mediaList.length - 1) || ((this.actualMediaIndex == this.mediaList.length - 1) && (carrouselClickSide === -1)) || ((this.actualMediaIndex == 0) && (carrouselClickSide === +1))) {


            this.nextMedia = this.mediaList[this.actualMediaIndex + carrouselClickSide];
            this.nextMedia.image ? (this.nextMediaType = "img", this.nextMedia = this.nextMedia.image) : (this.nextMediaType = "video controls", this.nextMedia = this.nextMedia.video);
            this.photographURLId = new URL(location.href).searchParams.get("id");

            const modalMediaContainer = document.querySelector(".modal__media--Container");
            modalMediaContainer.innerHTML = `
                <${this.nextMediaType} src="./assets/images/${this.photographURLId}/${this.nextMedia}" class="mediaContent"></${this.nextMediaType}>
            `;

            this.actualMedia = `assets/images/${this.photographURLId}/${this.nextMedia}`;
            this.actualMediaIndex += carrouselClickSide;
            // console.log("actualMediaIndex", this.actualMediaIndex);

            this.sliderBtnDisplay();
        }
    }

    /**
     * Permet le diplay du next media
     */
    sliderBtnDisplay() {
        const mediaListLength = this.mediaList.length - 1;

        // console.log("actualMediaIndex", this.actualMediaIndex, "mediaListLength", mediaListLength);
        switch (this.actualMediaIndex) {
            case mediaListLength:
                // console.log("right none");
                this.rightSliderBtn.style.display = "none";
                break;

            case 0:
                // console.log("left none");
                this.leftSliderBtn.style.display = "none";
                break;

            default:
                // console.log("left right");
                this.leftSliderBtn.style.display = "block";
                this.rightSliderBtn.style.display = "block";
                break;
        }
    }

    /**
     * Déchargement de la modale par supression du dom
     * Peux être déclenché par appuis sur la croix (click ou selection par tyouche tab et appuis sur touche enter), ou appuis sur la touche echap
     */
    closeMediaModal() {
        const mediaModal = document.querySelector(".modal--container");
        mediaModal.remove();

        //Restauration des tabindex comme à l'origine
        for (let i = 0; i < this.elementsToModify.length; i++) {
            this.elementsToModify[i].style.pointerEvents = this.originalStyles[i].pointerEvents;
            this.elementsToModify[i].tabIndex = this.originalStyles[i].tabIndex;
        }

        //Remise du tab index pour le a du logo
        this.logoBaliseA.setAttribute("tabindex", "1");

        // opérations pour fermer la modale...
        this.stopArrowNavigation = false;

        //Permet de catcher l'evenement de fermeture et retourner la variable de flag
        const event = new CustomEvent("mediaModalClosed", { detail: this.stopArrowNavigation });
        document.dispatchEvent(event);
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