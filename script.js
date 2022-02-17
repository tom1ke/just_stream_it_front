

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
            filmContainer.appendChild(filmImage);
        })
    })
    .catch(error => {
        console.error(error);
    })

fetch("http://localhost:8000/api/v1/titles/?genre=fantasy&page_size=7&page=1")
    .then(response => {
        return response.json();
    })
    .then(json => {
        let filmContainer = document.getElementById("fantasy-images");
        let filmList = json.results;
        filmList.forEach(function(film) {
            let imageURL = film.image_url;
            let filmImage = document.createElement("img");
            filmImage.setAttribute("src", [imageURL]);
            filmContainer.appendChild(filmImage);
        })
    })
    .catch(error => {
        console.error(error);
    })

fetch("http://localhost:8000/api/v1/titles/?genre=sci-fi&page_size=7&page=1")
    .then(response => {
        return response.json();
    })
    .then(json => {
        let filmContainer = document.getElementById("sci-fi-images");
        let filmList = json.results;
        filmList.forEach(function(film) {
            let imageURL = film.image_url;
            let filmImage = document.createElement("img");
            filmImage.setAttribute("src", [imageURL]);
            filmContainer.appendChild(filmImage);
        })
    })
    .catch(error => {
        console.error(error);
    })

fetch("http://localhost:8000/api/v1/titles/?genre=animation&page_size=7&page=1")
    .then(response => {
        return response.json();
    })
    .then(json => {
        let filmContainer = document.getElementById("animation-images");
        let filmList = json.results;
        filmList.forEach(function(film) {
            let imageURL = film.image_url;
            let filmImage = document.createElement("img");
            filmImage.setAttribute("src", [imageURL]);
            filmContainer.appendChild(filmImage);
        })
    })
    .catch(error => {
        console.error(error);
    })