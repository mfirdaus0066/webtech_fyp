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