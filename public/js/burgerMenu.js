const icone = document.querySelector('.burger');

icone.addEventListener("click", function (event) {
    event.preventDefault();
    const menu = document.getElementById("burger-menu");
    menu.classList.toggle("show");
    
})

const notification = document.getElementById('notification');
    
    if (notification) {
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    }