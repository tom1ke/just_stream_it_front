
/*
Requête API pour alimenter la section "Meilleur film"
Conversion de l'objet retourné en données json
Image, titre et description vers éléments HTML associés
Appel de la fonction generateModal() pour générer la fenêtre modale associée
*/
fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7&page=1")
    .then(response => {
        return response.json();
    })
    .then(json => {
        fetch(json.results[0].url)
            .then(response => {
               return response.json();
            })
            .then(json => {
                let filmURL = json.url;
                document.getElementById("best-image").src = json.image_url;
                document.getElementById("best-title").innerText = json.title;
                document.getElementById("best-description").innerText = json.description;
                (generateModal("best-button", filmURL));
            })
            .catch(error => {
                console.error(error);
            })
    })
    .catch(error => {
        console.error(error);
    })


/*
Requête API pour alimenter la section "Films les mieux notés"
Conversion de l'objet retourné en données json
Génération des balises HTML <img> alimentées par les urls des images
Appel de la fonction generateModal() pour générer la fenêtre modale associée
 */
fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7&page=1")
    .then(response => {
        return response.json();
    })
    .then(json => {
        let filmContainer = document.getElementById("most-rated-images");
        let filmList = json.results;
        let index = 0;
        filmList.forEach(function(film) {
            let filmURL = film.url;
            let imageURL = film.image_url;
            let filmImage = document.createElement("img");
            filmImage.setAttribute("src", [imageURL]);
            filmImage.setAttribute("class", ["image"])
            filmImage.setAttribute("id", [`most-rated-image-${index}`]);
            filmContainer.appendChild(filmImage);
            generateModal(filmImage.id, filmURL);
            index += 1;
        })
    })
    .catch(error => {
        console.error(error);
    })


/*
Fonction pour alimenter une catégorie avec une requête API
category : catégorie concernée par la requête API

Conversion de l'objet retourné en json
Génération des balises HTML <img> alimentées par les urls des images
Appel de la fonction generateModal() pour générer la fenêtre modale associée
 */
function getCategory(category) {
    fetch(`http://localhost:8000/api/v1/titles/?genre=${category}&page_size=7&page=1`)
        .then(response => {
            return response.json();
        })
        .then(json => {
            let filmContainer = document.getElementById(`${category}-images`);
            let filmList = json.results;
            let index = 0;
            filmList.forEach(function(film) {
                let filmURL = film.url;
                let imageURL = film.image_url;
                let filmImage = document.createElement("img");
                filmImage.setAttribute("src", [imageURL]);
                filmImage.setAttribute("class", ["image"]);
                filmImage.setAttribute("id", [`${category}-image-${index}`]);
                filmContainer.appendChild(filmImage);
                generateModal(filmImage.id, filmURL);
                index += 1
            })
        })
        .catch(error => {
            console.error(error);
        })
}


/*
Appel de la fonction getCategory() pour alimenter les sections "Fantaisie", "Science-fiction" et "Animation"
 */
getCategory("fantasy")
getCategory("sci-fi")
getCategory("animation")


/*
Fonction de génération de la fenêtre modale
htmlId : ID de l'élément HTML cliqué
filmURL : URL correspondant à l'élément cliqué pour effectuer la requête API et alimenter la fenêtre modale

Les données retournées (converties en json) sont insérées dans les éléments HTML correspondants
La donnée "worldwide_gross_income" n'est visible que si elle est présente dans les données récupérées

Modification des attributs CSS pour afficher/cacher la fenêtre modale en fonction de l'action utilisateur
 */
function generateModal (htmlId, filmURL) {
    const modal = document.getElementById("modal");
    const modalOpen = document.getElementById(htmlId);
    const modalClose = document.getElementsByClassName("modal__wrapper--close")[0];
    const body = document.querySelector("body")

    modalOpen.onclick = function () {
        modal.style.display = "flex";
        body.style.overflow = "hidden";
        fetch(filmURL)
            .then(response => {
                return response.json();
            })
            .then(json => {
                document.getElementById("modal-image").src = json.image_url;
                document.getElementById("modal-title").innerText = json.original_title;
                document.getElementById("modal-genre").innerText = json.genres;
                document.getElementById("modal-date").innerText = json.year;
                document.getElementById("modal-rated").innerText = json.rated;
                document.getElementById("modal-score").innerText = `${json.imdb_score}/10`;
                document.getElementById("modal-director").innerText = `Réalisateur : ${json.directors}`;
                document.getElementById("modal-actors").innerText = `Casting : ${json.actors}`;
                document.getElementById("modal-duration").innerText = `Durée : ${json.duration}mn`;
                document.getElementById("modal-origin").innerText = json.countries;
                document.getElementById("modal-description").innerText = `Résumé : ${json.long_description}`;
                document.getElementById("modal-boxoffice").innerText = json.worldwide_gross_income;
                if (json.worldwide_gross_income != null) {
                    return document.getElementById("modal-boxoffice").innerText =
                        `Box-office : ${json.worldwide_gross_income}$`;
                }
            })
            .catch(error => {
                console.error(error);
            })
    }

    modalClose.onclick = function () {
        modal.style.display = "none";
        body.style.overflow = "auto";
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            body.style.overflow = "auto";
        }
    }
}


/*
Fonction de génération du carousel
carouselContainer : élément HTML correspondant au conteneur du carousel d'une catégorie
imageContainer : élément HTML correspondant au contenuer des images d'une catégorie

Création des éléments HTML bouton gauche et droit

Définition du comportement du carousel en fonction de l'action utilisateur
 */
function generateCarousel(carouselContainer, imageContainer) {
    carouselContainer = document.getElementById(carouselContainer)
    imageContainer = document.getElementById(imageContainer);
    const leftButton = document.createElement("button");
    const rightButton = document.createElement("button");
    leftButton.setAttribute("class", ["left-button scroll-button"]);
    leftButton.innerText = "<";
    rightButton.setAttribute("class", ["right-button scroll-button"]);
    rightButton.innerText = ">";
    carouselContainer.appendChild(leftButton);
    carouselContainer.appendChild(rightButton);
    let scrollAmount = 0;

    leftButton.onclick = function () {
        imageContainer.scrollTo({
            top: 0,
            left: (scrollAmount -= 200),
            behavior: "smooth"
        });
        if(scrollAmount < 0) {
        scrollAmount = 0
        }
    }

    rightButton.onclick = function () {
        if(scrollAmount <= imageContainer.scrollWidth - imageContainer.clientWidth) {
            imageContainer.scrollTo({
                top: 0,
                left: (scrollAmount += 200),
                behavior: "smooth"
            })
        }
    }
}


/*
Appel de la fonction generateCarousel() pour générer les carousels de chaque catégorie
 */
generateCarousel("most-rated-carousel", "most-rated-images")
generateCarousel("fantasy-carousel", "fantasy-images")
generateCarousel("sci-fi-carousel", "sci-fi-images")
generateCarousel("animation-carousel", "animation-images")
