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

/*---------FORMULARIO-------- */

const translations = {
    es: {
        nombreObligatorio: "El campo nombre es obligatorio.",
        emailObligatorio: "El campo email es obligatorio.",
        emailInvalido: "Por favor, ingresa un correo electrónico válido.",
        asuntoObligatorio: "El campo asunto es obligatorio.",
        mensajeObligatorio: "El campo mensaje es obligatorio.",
        successTitle: "¡Excelente!",
        successText: "El mensaje fue enviado exitosamente.",
        errorTitle: "Error",
        errorText: "Hubo un problema al enviar el formulario."
    },
    en: {
        nombreObligatorio: "The name field is required.",
        emailObligatorio: "The email field is required.",
        emailInvalido: "Please enter a valid email address.",
        asuntoObligatorio: "The subject field is required.",
        mensajeObligatorio: "The message field is required.",
        successTitle: "Excellent!",
        successText: "The message was sent successfully.",
        errorTitle: "Error",
        errorText: "There was a problem submitting the form."
    }
};

let currentLang = 'es'; // Idioma por defecto

document.querySelectorAll('.flags__item').forEach(item => {
    item.addEventListener('click', () => {
        currentLang = item.getAttribute('data-language');
        translatePage(currentLang);
    });
});

function translatePage(lang) {
    // Aquí puedes agregar más lógica para traducir otros elementos de la página si es necesario
}

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    clearErrors();

    const fields = {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        asunto: document.getElementById('asunto').value.trim(),
        mensaje: document.getElementById('mensaje').value.trim()
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasError = false;

    for (const [fieldId, value] of Object.entries(fields)) {
        if (value === "" || (fieldId === 'email' && !emailRegex.test(value))) {
            showError(fieldId, fieldId === 'email' && value !== "" ? 'emailInvalido' : `${fieldId}Obligatorio`);
            hasError = true;
        }
    }

    if (!hasError) {
        // Envío del formulario usando Fetch API
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(fields).toString()
        })
        .then(() => {
            Swal.fire({
                title: translations[currentLang].successTitle,
                text: translations[currentLang].successText,
                icon: "success"
            });
            // Limpiar formulario
            document.getElementById('contactForm').reset();
        })
        .catch(error => {
            Swal.fire({
                title: translations[currentLang].errorTitle,
                text: translations[currentLang].errorText,
                icon: "error"
            });
            console.error("Form submission error:", error);
        });
    } else {
        Swal.fire({
            title: translations[currentLang].errorTitle,
            text: translations[currentLang].errorText,
            icon: "error"
        });
    }
});

function showError(fieldId, errorKey) {
    const errorElement = document.getElementById(`error-${fieldId}`);
    errorElement.innerText = translations[currentLang][errorKey];
    errorElement.style.display = 'block';
    document.getElementById(fieldId).style.borderColor = 'red';
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(msg => {
        msg.style.display = 'none';
        msg.innerText = '';
    });
    document.querySelectorAll('input, textarea').forEach(field => field.style.borderColor = '');
}

/* ===== Loader =====*/
window.addEventListener('load', () => {
    const contenedorLoader = document.querySelector('.container--loader');
    contenedorLoader.style.opacity = 0;
    contenedorLoader.style.visibility = 'hidden';
})