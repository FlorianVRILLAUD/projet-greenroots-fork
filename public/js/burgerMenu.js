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

const menuNotif = document.getElementById('notification');
    
    if (menuNotif) {
        menuNotif.style.display = 'block';

        setTimeout(() => {
            menuNotif.style.display = 'none';
        }, 5000);
    }