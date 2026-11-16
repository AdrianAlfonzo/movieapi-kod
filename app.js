const searchBtn = document.getElementById('searchBtn');
const movieInput = document.getElementById('movieInput');
const resultContainer = document.getElementById('resultContainer');

// Clave y URL base de la API pública (OMDb API)
const API_KEY = 'trilogy'; // Clave de prueba pública estándar
const BASE_URL = 'https://www.omdbapi.com/';

// Evento click en el botón de búsqueda
searchBtn.addEventListener('click', () => {
    const query = movieInput.value.trim();
    if (query !== '') {
        buscarPelicula(query);
    } else {
        mostrarError("Por favor, escribe el nombre de una película.");
    }
});

// También permitir buscar presionando la tecla "Enter"
movieInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Función asíncrona para consultar la API usando fetch()
async function buscarPelicula(nombrePelicula) {
    // Mostrar estado de carga dinámico
    resultContainer.innerHTML = `<p>Buscando película...</p>`;

    try {
        const respuesta = await fetch(`${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(nombrePelicula)}`);
        
        // Validar si la conexión de red fue exitosa
        if (!respuesta.ok) {
            throw new Error("Error de conexión con el servidor.");
        }

        const datos = await respuesta.json();

        // Validar si la API encontró la película
        if (datos.Response === "False") {
            mostrarError("Película no encontrada.");
            return;
        }

        // Mostrar los resultados requeridos en el DOM
        mostrarResultado(datos);

    } catch (error) {
        console.error("Error:", error);
        mostrarError("Hubo un error de conexión. Verifica tu red e intenta de nuevo.");
    }
}

// Función para renderizar los datos en pantalla de forma dinámica
function mostrarResultado(pelicula) {
    resultContainer.innerHTML = `
        <div class="movie-card">
            <h2>${pelicula.Title}</h2>
            <p><strong>Año de lanzamiento:</strong> ${pelicula.Year}</p>
            <p><strong>Sinopsis:</strong> ${pelicula.Plot}</p>
        </div>
    `;
}

// Función auxiliar para mostrar errores de forma limpia
function mostrarError(mensaje) {
    resultContainer.innerHTML = `<p class="error-message">${mensaje}</p>`;
}