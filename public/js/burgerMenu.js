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

const notification = document.getElementById('notification');
    
    if (notification) {
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    }