function responsiveMenu() {
    var x = document.getElementById("nav")
    if (x.className === "") {
        x.className = "responsive";
    } else {
        x.className = "";
    }
}

//========================= Boton y función ir arriba =========================
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

//=========================CAMBIO DE IDIOMA =========================*/
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

// Event listeners para los clics en llos iconos.....
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


// =========================Función para actualizar el año en el pie de página=========================
function updateFooterYear() {
    const year = new Date().getFullYear(); // Obtiene el año actual
    const footerText = `Copyright © ${year} | Codified by Ricardo Macias`;
    document.getElementById('copyright').innerText = footerText; // Actualiza el contenido del elemento con el id 'copyright'
}

// Llama a la función al cargar la página
window.addEventListener('DOMContentLoaded', (event) => {
    updateFooterYear();
});


// Aplica el idioma guardado en localStorage al cargar la página
window.addEventListener('DOMContentLoaded', (event) => {
    const savedLanguage = localStorage.getItem('language') || 'es'; // Idioma por defecto es español
    changeLanguage(savedLanguage);
});

 //========================= Cv cambia los cv si segun el idioma selecionado =========================

 document.addEventListener("DOMContentLoaded", function() {
    const btnCv = document.getElementById("btn_cv");

    // URLs de los CVs en español e inglés
    const cvUrlEs = "https://drive.google.com/file/d/11QgH9SXJIw0RjI2SyhHDUzYBwqtvuMOV/view?usp=sharing"; // URL del CV en español
    const cvUrlEn = "https://drive.google.com/file/d/16i-gZMj-Nt1Rp2lnTo7P3pahN5mQVV1_/view?usp=sharing"; // URL del CV en inglés

    // Función para cambiar el enlace del CV según el idioma seleccionado
    function changeCvLink(language) {
        if (language === "es") {
            btnCv.href = cvUrlEs;
        } else if (language === "en") {
            btnCv.href = cvUrlEn;
        }
    }

    // Evento de cambio de idioma
    document.querySelectorAll('.flags__item').forEach(item => {
        item.addEventListener('click', function() {
            const selectedLanguage = this.getAttribute('data-language');
            changeCvLink(selectedLanguage);
        });
    });

    // Cambiar el enlace del CV cuando se cargue la página según el idioma actual
    const currentLanguage = document.querySelector('.flags__item.active').getAttribute('data-language');
    changeCvLink(currentLanguage);
});




// ==================== Loader =========================*/
window.addEventListener('load', () => {
    const contenedorLoader = document.querySelector('.container--loader');
    contenedorLoader.style.opacity = 0;
    contenedorLoader.style.visibility = 'hidden';
})

document.getElementById('contactForm').addEventListener('submit', function(event) {
    // Encuentra el reCAPTCHA
    const recaptcha = document.querySelector('div[data-netlify-recaptcha="true"] iframe');

    // Verifica si el reCAPTCHA no ha sido completado (se puede verificar si el iframe existe y está visible)
    if (recaptcha && recaptcha.style.visibility === 'hidden') {
        event.preventDefault(); // Previene el envío del formulario
        Swal.fire({
            title: "Error",
            text: "Por favor, verifica que no eres un robot.",
            icon: "error"
        });
    } else {
        // Si el reCAPTCHA ha sido completado, el formulario se envía
        this.submit();
    }
});
