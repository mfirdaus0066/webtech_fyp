function openPopup() {
    document.getElementById("overlay").classList.remove("hidden");
    document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
    document.getElementById("overlay").classList.add("hidden");
    document.getElementById("popup").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", function () {
    const cats = {
        1: { name: "Snowy", age: "4 months", breed: "British Shorthair", color: "Light brown & white", place: "Selangor", image: "../image/Snowy.jpg", status: "Available", address: "https://maps.app.goo.gl/ipyoSrkXGwYMEZm17" },
        2: { name: "Milo", age: "2 years", breed: "American Shorthair", color: "Grey Tabby", place: "Pahang", image: "../image/Gato.jpg", status: "Adopted" },
        3: { name: "Ginger", age: "3 years", breed: "Domestic Shorthair", color: "Orange Tabby", place: "Selangor", image: "../image/Ginger.jpg", status: "Available" },
        4: { name: "Luna", age: "1 year", breed: "Domestic Shorthair", color: "Black", place: "Selangor", image: "../image/Luna.jpg", status: "Available" },
        5: { name: "Oreo", age: "1 year", breed: "Maine Coon", color: "Black Tortie with White", place: "Terengganu", image: "../image/Oreo.jpg", status: "Adopted" },
        6: { name: "Bella", age: "6 months", breed: "Turkish Angora", color: "Solid white", place: "Selangor", image: "../image/Bella.jpg", status: "Available" },
        7: { name: "Coco", age: "3 months", breed: "Domestic Long Hair", color: "Light brown", place: "Selangor", image: "../image/Coco.jpg", status: "Available" },
        8: { name: "Pudding", age: "2 months", breed: "Domestic Long Hair", color: "Grey and white", place: "Terengganu", image: "../image/Pudding.jpg", status: "Adopted" },
        9: { name: "Mochi", age: "2 months", breed: "Munchkin", color: "Orange and white", place: "Selangor", image: "../image/Mochi.jpg", status: "Available" },
        10: { name: "Daisy", age: "2 years", breed: "Siberian", color: "White", place: "Terengganu", image: "../image/Daisy.jpg", status: "Available" },
        11: { name: "Bastet", age: "6 months", breed: "Bengal", color: "Brown spotted", place: "Terengganu", image: "../image/Bastet.jpg", status: "Available" },
        12: { name: "Maybank", age: "1 year", breed: "Longhaired Abyssinian", color: "Ruddy ticked", place: "Selangor", image: "../image/Maybank.jpg", status: "Available" },
        13: { name: "Ziggy", age: "3 years", breed: "Cornish Rex", color: "Black and White", place: "Pahang", image: "../image/Ziggy.jpg", status: "Available" },
        14: { name: "Lulu", age: "3 years", breed: "Foreign Longhair", color:"Shiny solid black", place: "Pahang", image: "../image/Lulu.jpg", status: "Adopted" },
        15: { name: "Ali", age: "1 year", breed: "Savannah", color:"Brown Spotted Tabby", place: "Pahang", image: "../image/Ali.jpg", status: "Available" },
    };

    const params = new URLSearchParams(window.location.search);
    const id = params.get("catId");

    if (id && cats[id]) {
        showCatBio(id);
        moreCats(id);
    } else {
        moreCats(null);
    }

    function showCatBio(catId) {
        const cat = cats[catId];
        if (!cat) return;

        document.getElementById("intro").innerHTML = `${cat.name} Biodata`;
        document.getElementById("cat-name").innerHTML = `<strong>Name:</strong> ${cat.name}`;
        document.getElementById("cat-age").innerHTML = `<strong>Age:</strong> ${cat.age}`;
        document.getElementById("cat-breed").innerHTML = `<strong>Breed:</strong> ${cat.breed}`;
        document.getElementById("cat-color").innerHTML = `<strong>Color:</strong> ${cat.color}`;
        document.getElementById("cat-loc").innerHTML = `<strong>Place:</strong> ${cat.place}`;
        document.querySelector(".cat-image").src = cat.image;

        const actionBtnSection = document.getElementById("action-btn");

        const existingOverlay = document.getElementById("overlay");
        const existingPopup = document.getElementById("popup");

        // Clear and append overlay/popup
        actionBtnSection.innerHTML = '';
        actionBtnSection.appendChild(existingOverlay);
        actionBtnSection.appendChild(existingPopup);

        // Adopt button
        const adoptButton = document.createElement("button");
        adoptButton.textContent = "Adopt Now";
        adoptButton.onclick = openPopup;
        actionBtnSection.insertBefore(adoptButton, existingOverlay);

        // Location button (if available)
        if (cat.address) {
            const locationButton = document.createElement("button");
            locationButton.textContent = "Location";
            locationButton.classList.add("location-button");
            locationButton.addEventListener("click", function () {
                window.open(cat.address, '_blank');
            });
            actionBtnSection.insertBefore(locationButton, existingOverlay);
        }
    }

    function moreCats(currentCatId) {
        const suggestion = document.getElementById("cat-cards");
        suggestion.innerHTML = "<h3>Discover More Cats</h3>";

        const otherCats = Object.entries(cats).filter(([key]) => key !== String(currentCatId));

        // Shuffle
        for (let i = otherCats.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [otherCats[i], otherCats[j]] = [otherCats[j], otherCats[i]];
        }

        const limitShow = otherCats.slice(0, 10);

        limitShow.forEach(([id, cat]) => {
            const card = document.createElement("div");
            card.className = "cat-info";
            card.innerHTML = `
                <a href="../html/Cat'sbio.html?catId=${id}">
                    <img src="${cat.image}" alt="${cat.name} image" class="cat-image">
                </a>
                <div><strong>Name:</strong> ${cat.name}</div>
                <div><strong>Age:</strong> ${cat.age}</div>
                <div><strong>State:</strong> ${cat.place}</div>
                <div><strong>Status:</strong> ${cat.status}</div>`;
            suggestion.appendChild(card);
        });
    }
});