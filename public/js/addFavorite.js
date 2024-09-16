document.addEventListener('DOMContentLoaded', function() {
    let formFav = document.querySelector('.formFav');

    if (formFav) {
        formFav.addEventListener('submit', async function(event) {
            event.preventDefault();

            const favFormData = Object.fromEntries(new FormData(formFav));

            try {
                await fetch('/add-favorite', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(favFormData),
                });

            } catch (error) {
                console.error(error);
            }
        });
    }

});

const notification = document.getElementById('notification');
    
    if (notification) {
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    }