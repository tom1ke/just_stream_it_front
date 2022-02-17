getBestMovie()
    .then(response => {
        console.log("Best Movie : OK");
        console.log(response);
    })
    .catch(error => {
        console.log("Best Movie : Error");
        console.error(error);
    });

getMostRated()
    .then(response => {
        console.log("Most Rated : OK");
        console.log(response);
    })
    .catch(error => {
        console.log("Most Rated : Error");
        console.error(error);
    });

async function getBestMovie() {
    let response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7&page=1");
    response = await response.json();
    let filmImage = await response.results[0].image_url;
    return document.getElementById("best-image").src = filmImage;
}

async function getMostRated() {
    let response = await fetch("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=7&page=1");
    response = await response.json();
    console.log(response);
    let filmList = response.results;
    let index = 0;
    for(let film in filmList) {
        let filmImage = await document.createElement("img");
        let imageIndex = `image${index}`;
        index += 1
        await filmImage.setAttribute("id", imageIndex);
        document.getElementById(imageIndex).src = film.image_url;
    }
}