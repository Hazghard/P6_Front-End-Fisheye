// // PATTERN CLASSIQUE

// class Creator {
//     createProduct(type) {
//       // La méthode createProduct est déclarée dans l'interface abstraite,
//       // mais c'est aux sous-classes de décider quel type d'objet créer.
//       throw new Error("La méthode createProduct n'est pas implémentée");
//     }
//   }
  
//   class ConcreteCreatorA extends Creator {
//     createProduct(type) {
//       if (type === "typeA") {
//         return new ProductA();
//       } else if (type === "typeB") {
//         return new ProductB();
//       } else {
//         throw new Error("Type de produit non valide");
//       }
//     }
//   }
  
//   class ConcreteCreatorB extends Creator {
//     createProduct(type) {
//       if (type === "typeC") {
//         return new ProductC();
//       } else if (type === "typeD") {
//         return new ProductD();
//       } else {
//         throw new Error("Type de produit non valide");
//       }
//     }
//   }
  
//   class Product {
//     // ...
//   }
  
//   class ProductA extends Product {
//     // ...
//   }
  
//   class ProductB extends Product {
//     // ...
//   }
  
//   class ProductC extends Product {
//     // ...
//   }
  
//   class ProductD extends Product {
//     // ...
//   }



// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------





// // Créez une interface de création abstraite qui définit une méthode de création pour les objets. 
// // Appeler cette interface PhotographFactory et définir une méthode createPhotograph :

// interface PhotographFactory {
//     createPhotograph(
//       AllPhotographWithMedia,
//       photographURLId,
//       photographMedia,
//       mediaToPage,
//       photographPageHeader,
//       photographMain,
//       filterSection,
//       mediaSection,
//       filters
//     ): Photograph;
//   }

// //   Créez une classe concrète qui implémente l'interface de création abstraite 
// //   et qui définit la logique de création des objets. 
// //   Appeler cette classe ConcretePhotographFactory et définir une méthode createPhotograph 
// //   qui crée et retourne un objet de type Photograph :


//   class ConcretePhotographFactory implements PhotographFactory {
//     createPhotograph(
//       AllPhotographWithMedia,
//       photographURLId,
//       photographMedia,
//       mediaToPage,
//       photographPageHeader,
//       photographMain,
//       filterSection,
//       mediaSection,
//       filters
//     ) {
//       return new Photograph(
//         AllPhotographWithMedia,
//         photographURLId,
//         photographMedia,
//         mediaToPage,
//         photographPageHeader,
//         photographMain,
//         filterSection,
//         mediaSection,
//         filters
//       );
//     }
//   }

// //   Modifiez la classe Photograph pour qu'elle prenne en charge la dépendance de la factory 
// //   au lieu de créer directement l'objet. 
// //   Ajoutez un constructeur à la classe Photograph qui prend en paramètre une instance de PhotographFactory 
// //   et utilise cette instance pour créer l'objet :

// class Photograph {
//     AllPhotographWithMedia; //Array with all photogrpahs and Media objects
//     photographURLId; //url id parameter
//     photographMedia; //Photograph
//     mediaToPage; //only photograph's media
//     photographPageHeader;
//     photographMain;
//     filterSection;
//     mediaSection;
//     filters = ["Popularite", "Date", "Titre"];
  
//     constructor(
//       factory: PhotographFactory,
//       AllPhotographWithMedia,
//       photographURLId,
//       photographMedia,
//       mediaToPage,
//       photographPageHeader,
//       photographMain,
//       filterSection,
//       mediaSection,
//       filters
//     ) {
//       this.AllPhotographWithMedia = AllPhotographWithMedia;
//       this.photographURLId = photographURLId;
//       this.photographMedia = photographMedia;
//       this.mediaToPage = mediaToPage;
//       this.photographPageHeader = photographPageHeader;
//       this.photographMain = photographMain;
//       this.filterSection = filterSection;
//       this.mediaSection = mediaSection;
//       this.filters = filters;
//     }
//   }

// //   Utiliser la classe ConcretePhotographFactory pour créer des objets de type Photograph de manière centralisée 
// //   et sans avoir à gérer la logique de création.

// const factory = new ConcretePhotographFactory();
// const photograph = factory.createPhotograph(
//   AllPhotographWithMedia,
//   photographURLId,
//   photographMedia,
//   mediaToPage,
//   photographPageHeader,
//   photographMain,
//   filterSection,
//   mediaSection,
//   filters
// );



// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------
// // -----------------------------------------------------------------------------------------------------------------------


// export class PhotographPage {
//     AllPhotographWithMedia; //Array with all photogrpahs and Media objects
//     photographURLId; //url id parameter
//     photographMedia; //Photograph
//     mediaToPage; //only photograph's media
//     photographPageHeader = document.querySelector(".photograph-header");
//     photographMain = document.querySelector("main");
//     filterSection = document.createElement("div");
//     mediaSection = document.createElement("section");
//     filters = ["Popularite", "Date", "Titre"];

//     constructor(AllPhotographWithMedia) {
//         this.AllPhotographWithMedia = AllPhotographWithMedia;
//         this.photographURLId = new URL(location.href).searchParams.get('id');
//         this.photographMedia = this.AllPhotographWithMedia.find(element => element.id == this.photographURLId);
//         this.mediaToPage = this.photographMedia.media;
//         this.ArraySort();
//     }

//     PhotagraphPageConstruct() {
//         console.log(this.AllPhotographWithMedia, this.photographURLId, this.photographMedia, this.mediaToPage);

//         //implémentation du header
//         this.photographPageHeader.innerHTML = `
//             <div class="photograph-header--txtWrapper">
//                 <h1>${this.photographMedia.name}</h1>
//                 <div>
//                     <h2>${this.photographMedia.city}, ${this.photographMedia.country}</h2>
//                     <p>${this.photographMedia.tagline}</p>
//                 </div>
//             </div>
//             <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
//             <img src="../assets/photographers/${this.photographMedia.portrait}" class="photograph-header--img">
//         `

//         //creation de la partie filter
//         this.filterSection.setAttribute("class", "section-filter--container");
//         this.filterSection.innerHTML = `

//             <label for="orderFilter">Trier par</label>

//             <select name="pets" id="orderFilter">
//                 <option value="${this.filters[0]}">${this.filters[0]}
//                 <i class="fa-solid fa-chevron-up"></i>
//                 </option>
//                 <option value="${this.filters[1]}">${this.filters[1]}</option>
//                 <option value="${this.filters[2]}">${this.filters[2]}</option>
//             </select>
//         `
//         this.photographMain.appendChild(this.filterSection);

//         //ajout du main media
//         this.mediaSection.setAttribute("class", "section-media--container");
//         this.mediaSection.innerHTML = ``;
//         this.photographMain.appendChild(this.mediaSection);
//     }

//     MediaBuilder() {
//         this.mediaSection.innerHTML = ``;
//         this.mediaToPage.forEach(element => {
//             let mediaType = "




















