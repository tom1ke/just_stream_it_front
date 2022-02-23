

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
               return document.getElementById("best-image").src = json.image_url,
                   document.getElementById("best-title").innerText = json.title,
                   document.getElementById("best-description").innerText = json.description;
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

const modal = document.getElementsByClassName("modal");
const modalOpen = document.getElementsByClassName("image");
const modalClose = document.getElementsByClassName("modal__wrapper--close")[0];

modalOpen.onclick = function () {
    modal.style.display = "block";
}

modalClose.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// let modal = null
//
// const openModal = function (e) {
//     e.preventDefault()
//     const target = document.querySelector(e.target.getAttribute("href"))
//     target.style.display = null
//     modal = target
//     modal.addEventListener("click", closeModal)
//     modal.querySelector(".modal__wrapper--close").addEventListener("click", closeModal)
//     modal.querySelector(".modal__wrapper--stop").addEventListener("click", stopPropagation)
// }
//
// const closeModal = function (e) {
//     if (modal === null) return
//     e.preventDefault()
//     modal.style.display = "none"
//     modal.removeEventListener("click", closeModal)
//     modal.querySelector(".modal__wrapper--close").removeEventListener("click", closeModal)
//     modal = null
// }
//
// const stopPropagation = function (e) {
//     e.stopPropagation()
// }
// document.querySelectorAll("image").forEach(a => {
//     a.addEventListener("click", openModal)
// })
//
// window.addEventListener("keydown", function (e) {
//     if (e.key === "Escape" || e.key === "Esc") {
//         closeModal(e)
//     }
// })