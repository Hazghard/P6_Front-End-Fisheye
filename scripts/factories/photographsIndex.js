class AppendChild {
    constructor() {
    }

    AppendCardDOM(query, element) {
        const photographersSection = document.querySelector(query);

        photographersSection.appendChild(element);
    }
}

export class PhotographsCreation extends AppendChild {
    article = document.createElement('article');
    div = document.createElement('div');
    img = document.createElement('img');
    h2 = document.createElement('h2');
    h3 = document.createElement('h3')
    p = document.createElement('p');
    span = document.createElement('span');

    constructor(photograph) {
        super()
        console.log("photograph", photograph);

        // CREATION DES NODES
        this.div.setAttribute("class", "photographer_section--divContainer");

        this.img.setAttribute("src", photograph.picture)
        this.img.setAttribute("class", "photographer_section--img")

        this.h2.textContent = photograph.name;

        this.h3.textContent = photograph.city + ", " + photograph.country;

        this.p.textContent = photograph.tagline;

        this.span.textContent = photograph.price + " €/jour"

        //MISE EN ORDRES DES NODES
        this.div.appendChild(this.img);
        this.article.appendChild(this.div);
        this.article.appendChild(this.h2);
        this.article.appendChild(this.h3);
        this.article.appendChild(this.p);
        this.article.appendChild(this.span);

        console.log('this :: ', this)
    }

    AppendCardDOM(query = ".photographer_section") {
        const photographersSection = document.querySelector(query);

        photographersSection.appendChild(this.article);
    }
}
