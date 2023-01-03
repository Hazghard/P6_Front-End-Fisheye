export class PhotographsCreation {

    constructor(photograph) {
        console.log("photograph", photograph);

        // CREATION DES NODES
        const article = document.createElement('article');
        const div = document.createElement('div');
        div.setAttribute("class", "photographer_section--divContainer");

        const img = document.createElement('img');
        img.setAttribute("src", photograph.picture)
        img.setAttribute("class", "photographer_section--img")

        const h2 = document.createElement('h2');
        h2.textContent = photograph.name;

        const h3 = document.createElement('h3');
        h2.textContent = photograph.city + ", " + photograph.country;

        const p = document.createElement('p');
        p.textContent = photograph.tagline;

        const span = document.createElement('span');
        span.textContent = photograph.price + " €/jour"



        //MISE EN ORDRES DES NODES
        div.appendChild(img);
        article.appendChild(div);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(span);

        return (article);

    }
    AppendUserCardDOM(article) {
        const photographersSection = document.querySelector(".photographer_section");
        photographersSection.appendChild(article);
    }
}