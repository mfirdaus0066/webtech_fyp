function catDisplay(currentPage)
{
    const display = document.getElementById("cat-cards");
    const catLimit = 10;
    const start = (currentPage - 1) * catLimit;
    const end = start + catLimit;

    const limitDisplay = allCats.slice(start, end);
    const productContainer = document.getElementById("cat-cards");

    productContainer.innerHTML = "";

    displayCat.forEach ()

};