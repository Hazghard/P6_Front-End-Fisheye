function photographerFactory(data) {

    const { name, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const div = document.createElement('div');
        div.setAttribute("class", "photographer_section--divContainer")
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("class", "photographer_section--img")
        const h2 = document.createElement('h2');
        h2.textContent = name;


        div.appendChild(img);
        article.appendChild(div);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}