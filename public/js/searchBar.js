const searchBar = document.querySelector('.searchbar');
const searchForm = document.querySelector('.searchform');


searchBar.addEventListener('submit', async function(event) {
    
    const searchFormData = Object.fromEntries(new FormData(searchForm));

    try {
        await fetch('/recherche', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(searchFormData),
        })
    } catch (error) {
        console.error(console.error)
    }
    
})
