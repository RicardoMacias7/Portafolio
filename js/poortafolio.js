function responsiveMenu() {
    var x = document.getElementById("nav")
    if (x.className === "") {
        x.className = "responsive";
    } else {
        x.className = "";
    }
}


// ====================================================================== Loader ====================================================================================================*/
window.addEventListener('load', () => {
    const contenedorLoader = document.querySelector('.container--loader');
    contenedorLoader.style.opacity = 0;
    contenedorLoader.style.visibility = 'hidden';
})



//======================================================== Boton y función ir arriba ====================================================================================================
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



//==========================================================CAMBIO DE IDIOMA ====================================================================================================*/
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



// ==================================================Función para actualizar el año en el pie de página===========================================================================
function updateFooterYear() {
    const year = new Date().getFullYear(); // Obtiene el año actual
    const footerText = `Copyright © ${year} | Codified by Ricardo Macias`;
    document.getElementById('copyright').innerText = footerText; // Actualiza el contenido del elemento con del id en este caso 'copyright'
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



 //========================================================== Cv cambia los cv si segun el idioma selecionado ===========================================================================
 document.addEventListener("DOMContentLoaded", function() {
    const btnCv = document.getElementById("btn_cv");
    const titlePresentacion = document.getElementById("title_presentacion");

    // URLs de los CVs
    const cvUrlEs = "https://drive.google.com/file/d/11QgH9SXJIw0RjI2SyhHDUzYBwqtvuMOV/view?usp=sharing"; // CV en español
    const cvUrlEn = "https://drive.google.com/file/d/16i-gZMj-Nt1Rp2lnTo7P3pahN5mQVV1_/view?usp=sharing"; // CV en inglés

    // Función para cambiar el enlace del CV según el idioma seleccionado
    function changeCvLink(language) {
        if (language === "es") {
            btnCv.href = cvUrlEs;
        } else if (language === "en") {
            btnCv.href = cvUrlEn;
        }
    }

    // Función para cambiar solo el texto fuera del span
    function changeTitle(language) {
        const spanContent = titlePresentacion.querySelector("span").outerHTML;
        let textContent = "";

        if (language === "es") {
            textContent = `Soy ${spanContent}, Desarrollador de Software`;
        } else if (language === "en") {
            textContent = `I am ${spanContent}, Software Developer`;
        }

        titlePresentacion.innerHTML = textContent;
    }

    // Evento de cambio de idioma
    document.querySelectorAll('.flags__item').forEach(item => {
        item.addEventListener('click', function() {
            const selectedLanguage = this.getAttribute('data-language');
            // Guardar el idioma seleccionado en localStorage
            localStorage.setItem('language', selectedLanguage);
            changeCvLink(selectedLanguage);
            changeTitle(selectedLanguage);
        });
    });

    // Cambiar el enlace del CV y el texto del título cuando se cargue la página según el idioma actual
    const currentLanguage = localStorage.getItem('language') || 'es'; // Obtiene el idioma actual o usa 'es' como predeterminado
    changeCvLink(currentLanguage);
    changeTitle(currentLanguage);
});



// ============================================= Mensaje personalizado al enviar el formulario ===========================================================================
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir el envío estándar del formulario

    const form = event.target;
    const formData = new FormData(form);

    // Convierte el FormData en una cadena de consulta
    const formEncoded = new URLSearchParams(formData).toString();

    // Envía el formulario a Netlify
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formEncoded,
    })
    .then(response => {
        if (response.ok) {
            // Muestra un mensaje de éxito si la respuesta es exitosa
            Swal.fire({
                title: "¡Excelente!",
                text: "El mensaje fue enviado exitosamente.",
                icon: "success",
            });
            form.reset(); // Limpia el formulario después del envío
        } else {
            // Si hay un error en la respuesta
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al enviar el formulario.",
                icon: "error",
            });
        }
    })
    .catch(error => {
        // Si ocurre un error en la solicitud fetch
        Swal.fire({
            title: "Error",
            text: "Hubo un problema al enviar el formulario.",
            icon: "error",
        });
        console.error("Error al enviar el formulario:", error);
    });
});

// ============================================= Cambiar animacion al estar el dispositivo está en modo responsivo ===========================================================================

function updateAos() {
    const containerFoto = document.querySelector('#sobremi .contenedor-foto');
    if (window.innerWidth <= 800) { // Define el ancho máximo para dispositivos móviles
        containerFoto.setAttribute('data-aos', 'zoom-in');
    } else {
        containerFoto.setAttribute('data-aos', 'fade-right');
    }
}

// Llamar a la función al cargar la página
updateAos();

// Llamar a la función cada vez que se cambia el tamaño del dispositivo
window.addEventListener('resize', updateAos);