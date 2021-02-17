console.log('%c HI', 'color: firebrick')

let dogListUl = document.querySelector("#dog-breeds")
let dogSelect = document.getElementById('breed-dropdown')


document.addEventListener('DOMContentLoaded', function () {
    loadBreeds();
    loadImages();
    dogSelectDropdown();
    dogSelect.addEventListener("change", dogSelectDropdown());
});


function renderBreed(breed) {
    const li = document.createElement("li");
    li.textContent = breed;
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

function dogSelectDropdown() {
    dogSelect.addEventListener("change", (event) => {
        getFetch() 
        .then(data => {
            let dogBreedsArray = Object.keys(data.message)
            let filteredArray = dogBreedsArray.filter(breed => {
                return breed.startsWith(event.target.value);
            })

            dogListUl.innerHTML = " "

            return filteredArray.forEach((breed) => addBreed(breed))
            
    })
    
})
}

function addBreed(breed) {
    let li = document.createElement("li");
    li.innerText = breed;
    dogListUl.appendChild(li);
}

function getFetch() {
    return fetch("https://dog.ceo/api/breeds/list/all")
           .then(response => response.json())
}

function loadBreeds() {
        getFetch()
        .then(data => {
            Object.keys(data.message).forEach(breed => {
                renderBreed(breed);
            })
        })
}
