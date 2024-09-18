const icone = document.querySelector('.burger');
const menu = document.getElementById("burger-menu")

icone.addEventListener("click", function (event) {
    event.preventDefault();
    const menu = document.getElementById("burger-menu");
    menu.classList.toggle("show");
    
});

document.addEventListener("click", function (event) {
    if (!menu.contains(event.target) && !icone.contains(event.target)) {
        menu.classList.remove("show");
    }
});

window.addEventListener("scroll", function () {
    if (menu.classList.contains("show")) {
        menu.classList.remove("show");
    }
});

const menu = document.getElementById('notification');
    
    if (menu) {
        menu.style.display = 'block';

        setTimeout(() => {
            menu.style.display = 'none';
        }, 5000);
    }