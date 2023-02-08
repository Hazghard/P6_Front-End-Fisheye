
/**
 * Utilisation d'extends pour mise en pratique de la propriété, pourrait être directement dans la class PhotographsCreation
 */
export class DomConstruction {
    photographersSection = document.querySelector(".photographer_section");

    constructor() {
    }
    AppendDOM() {
        this.photographersSection.appendChild(this.article);
    }
}

/**
 * class permettant le construction de l'index par appel instancié de new photogrpah depuis l'indexV2
 */
export class PhotographsCreation extends DomConstruction {

    article = document.createElement("article");
    static tabCounterIndex = 2; // Déclaration en static pour que chaque instance de PhotographsCreation ai accès à la variable
    // si définie a 0 à un comportement bizarre pour le premier element de dom

    constructor(photograph) {

        super();
        this.article.setAttribute("role", `link to photographe ${photograph.name} page`);
        this.article.innerHTML = `
        <div class="photographer_section--divContainer">
            <a href="photographer.html?id=${photograph.id}"  tabindex="${PhotographsCreation.tabCounterIndex}">
                <img class="photographer_section--img media--Link" src="assets/photographers/${photograph.portrait}" alt="${photograph.name}"  aria-label="En savoir plus sûr ${photograph.name}">
            </a>
            <h2>${photograph.name}</h2>
        </div>
        <div>
            <h3>${photograph.city}, ${photograph.country}</h3>
            <p>${photograph.tagline}</p>
            <span>${photograph.price} €/jour</span>
        </div>
        `;
        PhotographsCreation.tabCounterIndex += 1;
    }
}