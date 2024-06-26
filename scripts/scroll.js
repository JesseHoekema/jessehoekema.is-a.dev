
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScroll() {
        sections.forEach((section) => {
            if (isInViewport(section) && !section.classList.contains('fade-in')) {
                section.classList.add('fade-in');
            }
        });
    }

    // Voeg een event listener toe voor het scrollen
    window.addEventListener('scroll', handleScroll);

    // Voer de handleScroll-functie uit wanneer de pagina geladen is
    handleScroll();
});
