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

//filter by state
const catData = [
{
    id : 1,
    Name: "Snowy",
    Age: 2,
    State: "Selangor",
    img: "../html/Cat'sbio.html",
},
{
    id : 2,
    Name: "Milo",
    Age: 1,
    State: "Johor",
    img: "../image/Gato.jpg",
},
{
    id : 3,
    Name: "Ginger",
    Age: 3,
    State: "Penang",
    img: "../image/Ginger.jpg",
},
{
    id : 4,
    Name: "Luna",
    Age: "4 months",
    State: "Selangor",
    img: "../image/Luna.jpg",
},
{
    id : 5,
    Name: "Oreo",
    Age: 2,
    State: "Penang",
    img: "../image/Oreo.jpg",
},
{
    id : 6,
    Name: "Bella",
    Age: 1.5,
    State: "Johor",
    img: "../image/Bella.jpg",
},
{
    id : 7,
    Name: "Coco",
    Age: "5 months",
    State: "Perak",
    img: "../image/Coco.jpg",
},
{
    id : 8,
    Name: "Simba",
    Age: 1,
    State: "Sarawak",
    img: "../image/Simba.jpg",
},
{
    id : 9,
    Name: "Munchkin",
    Age: "6 months",
    State: "Kelantan",
    img: "../image/Munchkin.jpg",
},
{
    id : 10,
    Name: "Daisy",
    Age: 2,
    State: "Negeri Sembilan",
    img: "../image/Daisy.jpg",
},
{
    id : 11,
    Name: "Snowy the snower",
    Age: 200,
    State: "Selangor",
    img : "../image/Sillycat.jpg",
},
{
    id : 12,
    Name: "Milo and Ribena",
    Age: 1,
    State: "Johor",
    img : "../image/Gato.jpg",
},
]
