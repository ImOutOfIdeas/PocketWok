const buy = document.getElementById("buy");
const modal = document.getElementById("modal");
const dim = document.getElementById("dim");

// Show modal with buy button
buy.addEventListener("click", () => {
    if (dim.style.display = "none") {
        dim.style.display = "block";
    } else dim.style.display = "none";
})

// Close modal on background click
dim.addEventListener('click', e => {
    if(e.target === e.currentTarget) {
        dim.style.display = "none";
    }
});