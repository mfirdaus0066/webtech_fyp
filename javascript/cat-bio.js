function openPopup() {
    document.getElementById("overlay").classList.remove("hidden");
    document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
    document.getElementById("overlay").classList.add("hidden");
    document.getElementById("popup").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", function () {
    
    fetch('../JSON/cat-data.json')
        .then(response => response.json())
        .then(data => 
            {
                const cats = data;
            
            

                const params = new URLSearchParams(window.location.search);
                const id = params.get("catId");

                if (id && cats[id]) {
                    showCatBio(id, cats);
                    moreCats(id, cats);
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

            })
});