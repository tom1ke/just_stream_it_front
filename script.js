

fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7&page=1")
    .then(response => {
        return response.json();
    })
    .then(json => {
        return document.getElementById("best-image").src = json.results[0].image_url;
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
        filmList.forEach(function(film) {
            let imageURL = film.image_url;
            let filmImage = document.createElement("img");
            filmImage.setAttribute("src", [imageURL]);
            filmImage.setAttribute("class", ["image"])
            filmContainer.appendChild(filmImage);
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
            filmList.forEach(function(film) {
                let imageURL = film.image_url;
                let filmImage = document.createElement("img");
                filmImage.setAttribute("src", [imageURL]);
                filmImage.setAttribute("class", ["image"])
                filmContainer.appendChild(filmImage);
            })
        })
        .catch(error => {
            console.error(error);
        })
}

getCategory("fantasy")
getCategory("sci-fi")
getCategory("animation")