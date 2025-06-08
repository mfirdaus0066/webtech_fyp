//use id to get the element

const currentPage = Number(window.location.pathname.match(/page(\d*)\.html$/)?.[1]) || 1;

const totalPage = 3;

function gotoPage(page)
{
    const pageName = page === 1 ? `index.html` : `page${page}.html`;
    window.location.href = pageName;
}

function nextPage()
{
    if(currentPage < totalPage)
    {
        gotoPage(currentPage + 1);
    }  
}

function prevPage()
{
    if(currentPage > 1)
    {
        gotoPage(currentPage - 1);
    }
}

//cats object for filter by state
const catData = [
{
    id : 1,
    Name: "Snowy",
    Age: "6 months",
    State: "Selangor",
    img: "../image/Snowy.jpg",
    Status: "Available",
},
{
    id : 2,
    Name: "Milo",
    Age: "2 years",
    State: "Johor",
    img: "../image/Gato.jpg",
    Status: "Adopted",
},
{
    id : 3,
    Name: "Ginger",
    Age: "3 years",
    State: "Penang",
    img: "../image/Ginger.jpg",
    Status: "Available",
},
{
    id : 4,
    Name: "Luna",
    Age: "4 months",
    State: "Selangor",
    img: "../image/Luna.jpg",
    Status: "Available",
},
{
    id : 5,
    Name: "Oreo",
    Age: "2 years",
    State: "Penang",
    img: "../image/Oreo.jpg",
    Status: "Adopted",
},
{
    id : 6,
    Name: "Bella",
    Age: "1.5 years",
    State: "Johor",
    img: "../image/Bella.jpg",
    Status: "Available",
},
{
    id : 7,
    Name: "Coco",
    Age: "5 months",
    State: "Penang",
    img: "../image/Coco.jpg",
    Status: "Available",
},
{
    id : 8,
    Name: "Simba",
    Age: "1 year",
    State: "Johor",
    img: "../image/Simba.JPG",
    Status: "Adopted",
},
{
    id : 9,
    Name: "Munchkin",
    Age: "6 months",
    State: "Selangor",
    img: "../image/Munchkin.jpg",
    Status: "Available",
},
{
    id : 10,
    Name: "Daisy",
    Age: "2 years",
    State: "Selangor",
    img: "../image/Daisy.jpg",
    Status: "Adopted",
},
];

const productContainer = document.getElementById("cat-cards");

//display all data


const stateLinks = document.querySelectorAll("#state a");
stateLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        const state = e.target.dataset.id;
        const catState = catData.filter(function(data){
            if(data.State === state){
                return data;
            }
        })
        if(state === "All"){
            displayCatData(catData);
        }else{
            displayCatData(catState);
        }
    });
});

//function display all data
function displayCatData(cats){
    let displayData = cats.map(function(cat_items){
        return `<div class="cat-info">
                    <a href="../html/Cat'sbio.html?catId=1"><img src="${cat_items.img}" alt="Cat image" width="200"></a>
                    <div><strong>Name:</strong> ${cat_items.Name} </div>
                    <div><strong>Age:</strong> ${cat_items.Age}</div>
                    <div><strong>State:</strong> ${cat_items.State}</div>
                    <div><strong>Status:</strong> ${cat_items.Status}</div>
                </div>
                `;
    
    });
    displayData = displayData.join("");
    productContainer.innerHTML = displayData;
}