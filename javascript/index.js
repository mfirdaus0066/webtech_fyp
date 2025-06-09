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

function warning()
{
    window.alert("do not disturb the cat!");
}

// Allowed states only
const allowedStates = ["Selangor", "Pahang", "Terengganu"];

fetch('../JSON/cat-index.json')
    .then(response => response.json())
    .then( data =>
        {
            const catData = data;

            // Load DOM elements
            const productContainer = document.getElementById("cat-cards");
            const stateLinks = document.querySelectorAll("#state a");

            // Add filter event listeners
            stateLinks.forEach(link => {
                link.addEventListener("click", (e) => {
                    e.preventDefault(); // prevent page reload
                    const state = e.target.dataset.id;

                    
                        const filtered = catData.filter(cat => cat.State === state);
                        displayCatData(filtered);
                    
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
        })
