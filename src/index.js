console.log('%c HI', 'color: firebrick')

const dogListUl = document.querySelector("#dog-breeds")


document.addEventListener('DOMContentLoaded', function () {
    loadBreeds();
    loadImages();
});


function renderBreed(breed) {
    const li = document.createElement("li");
    li.textContent = breed;
    const dogListUl = document.querySelector("#dog-breeds");
    dogListUl.append(li);
    li.addEventListener("click", updateColor);
}

function updateColor(event) {
    if (event.target.matches("li")) {
        event.target.style.color = "red"
    }
}


function renderImage(imageUrl) {
    const imageContainer = document.querySelector("#dog-image-container")
    const img = document.createElement("img")
    img.src = imageUrl
    imageContainer.append(img)
}

function loadImages() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(response => response.json())
        .then(data => {
        const images = data.message
    
        images.forEach(imageUrl => {
            renderImage(imageUrl);
    })
})
}

let dogSelect = document.getElementById('breed-dropdown')
console.log(dogSelect)


function loadBreeds() {
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(data => {
            Object.keys(data.message).forEach(breed => {
                renderBreed(breed);
            })
        })
}
