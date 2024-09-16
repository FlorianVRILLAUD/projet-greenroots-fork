const header = document.querySelector('header'); 
let lastScrollTop = 0; 

function handleScroll() {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}

window.addEventListener('scroll', handleScroll);

header.addEventListener('mouseover', () => {
    header.classList.remove('hide');
});

header.addEventListener('mouseleave', () => {
    if (window.scrollY > lastScrollTop) {
        header.classList.add('hide');
    }
});
