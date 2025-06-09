//use id to get the element

const currentPage = Number(window.location.pathname.match(/page(\d*)\.html$/)?.[1]) || 1;
const totalPage = 3;

function gotoPage(page) {
    const pageName = page === 1 ? `index.html` : `page${page}.html`;
    window.location.href = pageName;
}

function nextPage() {
    if (currentPage < totalPage) {
        gotoPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 1) {
        gotoPage(currentPage - 1);
    }
}

// Allowed states only
const allowedStates = ["Selangor", "Pahang", "Terengganu"];

const catData = [
    {
        id: 1,
        Name: "Snowy",
        Age: "6 months",
        State: "Selangor",
        img: "../image/Snowy.jpg",
        Status: "Available",
    },
    {
        id: 2,
        Name: "Milo",
        Age: "2 years",
        State: "Pahang", // replaced Johor
        img: "../image/Gato.jpg",
        Status: "Adopted",
    },
    {
        id: 3,
        Name: "Ginger",
        Age: "3 years",
        State: "Terengganu", // replaced Penang
        img: "../image/Ginger.jpg",
        Status: "Available",
    },
    {
        id: 4,
        Name: "Luna",
        Age: "4 months",
        State: "Selangor",
        img: "../image/Luna.jpg",
        Status: "Available",
    },
    {
        id: 5,
        Name: "Oreo",
        Age: "2 years",
        State: "Terengganu", // replaced Penang
        img: "../image/Oreo.jpg",
        Status: "Adopted",
    },
    {
        id: 6,
        Name: "Bella",
        Age: "1.5 years",
        State: "Pahang", // replaced Johor
        img: "../image/Bella.jpg",
        Status: "Available",
    },
    {
        id: 7,
        Name: "Coco",
        Age: "5 months",
        State: "Selangor", // replaced Penang
        img: "../image/Coco.jpg",
        Status: "Available",
    },
    {
        id: 8,
        Name: "Pudding",
        Age: "2 months",
        State: "Terengganu", // replaced Johor
        img: "../image/Pudding.JPG",
        Status: "Adopted",
    },
    {
        id: 9,
        Name: "Mochi",
        Age: "6 months",
        State: "Selangor",
        img: "../image/Mochi.jpg",
        Status: "Available",
    },
    {
        id: 10,
        Name: "Daisy",
        Age: "2 years",
        State: "Terengganu",
        img: "../image/Daisy.jpg",
        Status: "Adopted",
    },
];

// Load DOM elements
const productContainer = document.getElementById("cat-cards");
const stateLinks = document.querySelectorAll("#state a");

// Add filter event listeners
stateLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault(); // prevent page reload
        const state = e.target.dataset.id;

        if (state === "All") {
            displayCatData(catData);
        } else {
            const filtered = catData.filter(cat => cat.State === state);
            displayCatData(filtered);
        }
    });
});

// Display cat cards
function displayCatData(cats) {
    const html = cats.map(cat => `
        <div class="cat-info">
            <a href="../html/Cat'sbio.html?catId=${cat.id}">
                <img src="${cat.img}" alt="${cat.Name} the cat" width="200">
            </a>
            <div><strong>Name:</strong> ${cat.Name}</div>
            <div><strong>Age:</strong> ${cat.Age}</div>
            <div><strong>State:</strong> ${cat.State}</div>
            <div><strong>Status:</strong> ${cat.Status}</div>
        </div>
    `).join("");
    productContainer.innerHTML = html;
}
