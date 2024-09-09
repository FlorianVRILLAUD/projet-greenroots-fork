const icone = document.querySelector('.burger');

icone.addEventListener("click", function (event) {
    event.preventDefault();
    const menu = document.getElementById("burger-menu");
    menu.classList.toggle("show");
    
})
