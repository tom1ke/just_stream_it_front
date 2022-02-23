

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
                console.log(json);
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


getCategory("fantasy")
getCategory("sci-fi")
getCategory("animation")


function generateModal (htmlId, filmURL) {
    const modal = document.getElementById("modal");
    const modalOpen = document.getElementById(htmlId);
    const modalClose = document.getElementsByClassName("modal__wrapper--close")[0];

    modalOpen.onclick = function () {
        modal.style.display = "block";
        fetch(filmURL)
            .then(response => {
                return response.json();
            })
            .then(json => {
                document.getElementById("modal-image").src = json.image_url;
                document.getElementById("modal-title").innerText = json.title;
                document.getElementById("modal-genre").innerText = json.genres;
                document.getElementById("modal-date").innerText = json.year;
                document.getElementById("modal-rated").innerText = json.rated;
                document.getElementById("modal-score").innerText = `${json.imdb_score}/10`;
                document.getElementById("modal-director").innerText = `Réalisateur : ${json.directors}`;
                document.getElementById("modal-actors").innerText = `Casting : ${json.actors}`;
                document.getElementById("modal-duration").innerText = `Durée : ${json.duration}mn`;
                document.getElementById("modal-origin").innerText = json.countries;
                document.getElementById("modal-boxoffice").innerText = json.worldwide_gross_income;
                document.getElementById("modal-description").innerText = `Résumé : ${json.long_description}`;
            })
            .catch(error => {
                console.error(error);
            })
    }

    modalClose.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}