// Global variable to store the map instance and marker
let currentMap;
let currentMarker;

// This function is automatically called by the Google Maps API script
function initMap() {
    // You can optionally create a default map here, but we'll create it
    // dynamically when the popup opens for better control.
    console.log("Google Maps API loaded.");
}

function openPopup() {
    document.getElementById("overlay").classList.remove("hidden");
    document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
    document.getElementById("overlay").classList.add("hidden");
    document.getElementById("popup").classList.add("hidden");

    const userInput = document.getElementsByClassName("user-input");

    for (let i = 0; i < userInput.length; i++) {
        userInput[i].value = "";
    }
}

// New functions for the map popup
function openMapPopup(lat, lng, catName) {
    document.getElementById("mapOverlay").classList.remove("hidden");
    document.getElementById("mapPopup").classList.remove("hidden");

    const mapOptions = {
        center: { lat: lat, lng: lng }, // Center map on cat's coordinates
        zoom: 15, // Adjust zoom level as needed
    };

    const mapDiv = document.getElementById("map");
    // Ensure the map container is visible before initializing the map
    // (Google Maps API can behave oddly if the div is hidden when initialized)
    mapDiv.style.visibility = 'visible'; // Or ensure it's not hidden by the 'hidden' class

    // Initialize the map if it hasn't been initialized or if the div is cleared
    if (!currentMap || !mapDiv.querySelector('.gm-style')) { // Check if map is already rendered in the div
        currentMap = new google.maps.Map(mapDiv, mapOptions);
    } else {
        // If map already exists, just recenter it
        currentMap.setCenter({ lat: lat, lng: lng });
        currentMap.setZoom(15);
    }

    // Clear previous marker if any
    if (currentMarker) {
        currentMarker.setMap(null);
    }

    // Add a marker for the cat's location
    currentMarker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: currentMap,
        title: catName,
        zoom: 20,
    });
    console.log(`Map opened for ${catName} at Lat: ${lat}, Lng: ${lng}`);

    // Adjust map center after popup is fully rendered, if necessary
    // This can help with map rendering issues when a popup is animated
    setTimeout(() => {
        if (currentMap) {
            currentMap.setCenter({ lat: lat, lng: lng });
            currentMap.setZoom(20);
        }
    }, 100);
}

function closeMapPopup() {
    document.getElementById("mapOverlay").classList.add("hidden");
    document.getElementById("mapPopup").classList.add("hidden");
    // Optionally clear map content to prevent rendering issues if reusing popup
    // document.getElementById("map").innerHTML = ''; // This will destroy the map instance
    // currentMap = null; // Reset map instance
}


document.addEventListener("DOMContentLoaded", function () {

    fetch('../JSON/cat-data.json')
        .then(response => response.json())
        .then(data => {
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

                // Get existing overlay and popup elements (email form related)
                const existingOverlay = document.getElementById("overlay");
                const existingPopup = document.getElementById("popup");

                // Get map overlay and popup elements (new)
                const mapOverlay = document.getElementById("mapOverlay");
                const mapPopup = document.getElementById("mapPopup");


                // Clear content but re-append the hidden popups
                actionBtnSection.innerHTML = ''; // Clear existing buttons
                actionBtnSection.appendChild(existingOverlay); // Re-append email overlay
                actionBtnSection.appendChild(existingPopup);   // Re-append email popup
                actionBtnSection.appendChild(mapOverlay);      // Re-append map overlay
                actionBtnSection.appendChild(mapPopup);        // Re-append map popup


                // Adopt button
                if (cat.status === "Available") {
                    const adoptButton = document.createElement("button");
                    adoptButton.textContent = "Adopt Now";
                    adoptButton.onclick = openPopup; // Triggers email form popup
                    actionBtnSection.insertBefore(adoptButton, existingOverlay);
                }

                else if (cat.status === "Adopted") {
                    const adoptButton = document.createElement("button");
                    adoptButton.textContent = "Adopt Now";
                    adoptButton.onclick = function () { window.alert("This cat has already been adopted") };
                    actionBtnSection.insertBefore(adoptButton, existingOverlay);
                }

                // Location button (now opens the map popup)
                // Check if lat/lng are available, not just if 'address' property exists
                if (cat.lat && cat.lng) { // Changed condition to check for lat/lng
                    const locationButton = document.createElement("button");
                    locationButton.textContent = "Location";
                    locationButton.classList.add("location-button");
                    locationButton.addEventListener("click", function () {
                        // Pass latitude, longitude, and cat name to the new map popup function
                        openMapPopup(cat.lat, cat.lng, cat.name);
                    });
                    actionBtnSection.insertBefore(locationButton, existingOverlay); // Insert before email overlay
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