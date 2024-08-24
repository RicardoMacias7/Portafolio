function responsiveMenu() {
    var x = document.getElementById("nav")
    if (x.className === "") {
        x.className = "responsive";
    } else {
        x.className = "";
    }
}

/*===== Boton y función ir arriba =====*/
window.onscroll = function () {
    if (document.documentElement.scrollTop > 100) {
        document.querySelector('.go-top-container').classList.add('show');
    }
    else {
        document.querySelector('.go-top-container').classList.remove('show');
    }
}

document.querySelector('.go-top-container').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


function changeLanguage(language) {
    // Guarda el idioma seleccionado en localStorage
    localStorage.setItem('language', language);

    // Carga el archivo de traducción correspondiente
    fetch(`../language/${language}.json`)
        .then(response => response.json())
        .then(data => {
            applyTranslations(data);
        })
        .catch(error => console.error('Error al cargar el archivo de traducción:', error));
}

function applyTranslations(translations) {
    // Itera sobre cada clave en las traducciones y actualiza el contenido del elemento correspondiente
    for (const [key, value] of Object.entries(translations)) {
        const element = document.getElementById(key);
        if (element) {
            element.innerText = value;
        }
    }
}

// Event listeners para los clics en las banderas
document.querySelectorAll('.flags__item').forEach(item => {
    item.addEventListener('click', function () {
        const selectedLanguage = this.getAttribute('data-language');
        changeLanguage(selectedLanguage);
    });
});

// Aplica el idioma guardado en localStorage al cargar la página
window.addEventListener('DOMContentLoaded', (event) => {
    const savedLanguage = localStorage.getItem('language') || 'es'; // Idioma por defecto es español
    changeLanguage(savedLanguage);
});
// Función para actualizar el año en el pie de página
function updateFooterYear() {
    const year = new Date().getFullYear(); // Obtiene el año actual
    const footerText = `Copyright © ${year} | Codified by Ricardo Macias`;
    document.getElementById('copyright').innerText = footerText; // Actualiza el contenido del elemento con el id 'copyright'
}

// Llama a la función al cargar la página
window.addEventListener('DOMContentLoaded', (event) => {
    updateFooterYear();
});

function hideLoader() {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden'); // Añade la clase 'hidden' para ocultar el loader
}
