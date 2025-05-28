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