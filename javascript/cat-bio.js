function openPopup()
{
    document.getElementById("overlay").classList.remove("hidden");
    document.getElementById("popup").classList.remove("hidden");
}

function closePopup()
{
    document.getElementById("overlay").classList.add("hidden");
    document.getElementById("popup").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", function () {
    const cats = {

        1:{ name: "snowy", age: "4 months", breed: "british Short hair", color: "Light brown & white", place: "Selangor", image: "../image/Snowy.jpg", status: "Available", address: "https://maps.app.goo.gl/ipyoSrkXGwYMEZm17" },

        2:{ name: "Milo", age: "2 years", breed: "American Shorthair", color: "Grey tabby", place: "Johor", image: "../image/Gato.jpg", status: "Adopted", address: "https://maps.app.goo.gl/3WH2yJWFLejHuY1T8"},

        3:{ name: "Ginger", age: "3 year", breed: "siamese", color: "orange", place: "penang", image: "../image/Ginger.jpg", status: "Available", address: "https://maps.app.goo.gl/nCj2yTp6kZ4pr2gY9" },

        4:{ name: "Lune", age: "4 months", breed: "ragdoll", color: "black", place: "Selangor", image: "../image/Luna.jpg", status: "Available", address: "https://maps.app.goo.gl/ipyoSrkXGwYMEZm17" },

        5:{ name: "oreo", age: "2 years", breed: "burmese", color: "calico", place: "Penang", image: "../image/Oreo.jpg", status: "Adopted", address: "https://maps.app.goo.gl/nCj2yTp6kZ4pr2gY9" },

        6:{ name: "Bella", age: "1.5 year", breed: "scottish fold", color: "white", place: "Johor", image: "../image/Bella.jpg", status: "Available", address: "https://maps.app.goo.gl/3WH2yJWFLejHuY1T8" },

        7:{ name: "coco", age: "5 months", breed: "sphynx", color: "brown", place: "Penang", image: "../image/Coco.jpg", status: "Available", address: "https://maps.app.goo.gl/nCj2yTp6kZ4pr2gY9" },

        8:{ name: "Simba", age: "1 years", breed: "sphynx", color: "brown", place: "Johor", image: "../image/Simba.jpg", status: "Adopted", address: "https://maps.app.goo.gl/3WH2yJWFLejHuY1T8" },

        9:{ name: "munchkin", age: "6 months", breed: "munchkin", color: "brown", place: "Selangor", image: "../image/Munchkin.jpg", status: "Available", address: "https://maps.app.goo.gl/ipyoSrkXGwYMEZm17" },

        10:{ name: "Daisy", age: "2 years", breed: "sphynx", color: "brown", place: "Selangor", image: "../image/Daisy.jpg", status: "Available", address: "https://maps.app.goo.gl/ipyoSrkXGwYMEZm17" }
    }

    const params = new URLSearchParams(window.location.search);
    const id = params.get("catId");//getting the id from our image url

     if (id && cats[id])//run the function
    {
        showCatBio(id);
        moreCats(id);
    }
    else{
        moreCats(null);
    }

    function showCatBio(catId)//accessing the cat info
    {
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
        
        // Clear any existing buttons
        // Keep the overlay and popup elements
        const existingOverlay = document.getElementById("overlay");
        const existingPopup = document.getElementById("popup");

        actionBtnSection.innerHTML = ''; 
        actionBtnSection.appendChild(existingOverlay); 
        actionBtnSection.appendChild(existingPopup);   

        //Create Adopt Now button
        const adoptButton = document.createElement("button");
        adoptButton.textContent = "Adopt Now";
        adoptButton.onclick = openPopup; 
        actionBtnSection.insertBefore(adoptButton, existingOverlay); 

        //Create Location button
        const mapUrl = `${(cat.address)}`;
        const locationButton = document.createElement("button"); 
        locationButton.textContent = "Location";
        locationButton.classList.add("location-button"); 

        //When click the button
        locationButton.addEventListener('click', function() {
            window.open(mapUrl, '_blank'); 
        });

        actionBtnSection.insertBefore(locationButton, existingOverlay)
        
    
    }

    function moreCats(currentcatId)
    {
        const suggestion = document.getElementById("cat-cards");
        suggestion.innerHTML = "<h3>Discover More Cats</h3>";

        //removing the current cat from the list
        const othercats = Object.entries(cats).filter(([key]) => key !== String(id));

        //shuffle the cat suggestion
        for (let i =othercats.length - 1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * (i + 1));
            [othercats[i], othercats[j]] = [othercats[j], othercats[i]];
        }

    const limitShow = othercats.slice(0,10);

    // display more cat suggestions
    limitShow.forEach(([id, cat]) => 
    {
        const card = document.createElement("div");
        card.className = "cat-info";
        card.innerHTML =
            `<a href="../html/Cat'sbio.html?catId=${id}">
                <img src="${cat.image}" alt="${cat.name} image" class="cat-image">
            </a>
          <div><strong>Name:</strong> ${cat.name} </div>
          <div><strong>Age:</strong> ${cat.age} </div>
          <div><strong>State:</strong> ${cat.place}</div>
          <div><strong>Status:</strong> ${cat.status}</div>`;

          suggestion.appendChild(card);
    });

    }
});

