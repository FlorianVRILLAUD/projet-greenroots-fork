const icone = document.querySelector('.burger');

icone.addEventListener("click", function (event) {
    event.preventDefault();
    const menu = document.getElementById("burger-menu");
    menu.classList.toggle("show");
    
})

const menu = document.getElementById('notification');
    
    if (menu) {
        menu.style.display = 'block';

        setTimeout(() => {
            menu.style.display = 'none';
        }, 5000);
    }