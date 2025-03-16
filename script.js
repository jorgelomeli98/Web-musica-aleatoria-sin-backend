const LASTFM_API_KEY = 'e6c289f077cc89659447f004df55cc20'; // Aqui va al Key de la Api de Last.fm
const YOUTUBE_SEARCH_URL = 'https://www.youtube.com/results?search_query=';

// 🔹 Lista de géneros para buscar artistas aleatorios
const generos = ['rock', 'pop', 'hip-hop', 'jazz', 'electronic', 'indie', 'classical', 'reggae', 'metal', 'blues', 'experimental', 'psychedelic', 
    'progressive metal', 'latin', 'math rock', 'shoegaze', 'avant-garde', 'progressive', 'post rock', 'all', 'funk', 'poptron', 'alternative', 'mexico', 'soca', 'salsa', 
    'romo', 'ska', 'rave', 'spanish'
];

// 🔹 Obtener un género aleatorio
function obtenerGeneroAleatorio() {
    return generos[Math.floor(Math.random() * generos.length)];
}

// 🔹 Obtener un artista aleatorio desde Last.fm
async function obtenerArtistaAleatorio() {
    const genero = obtenerGeneroAleatorio();
    const url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${genero}&api_key=${LASTFM_API_KEY}&format=json&limit=300`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const artistas = data.topartists.artist;
        const artistaAleatorio = artistas[Math.floor(Math.random() * artistas.length)];
        return artistaAleatorio.name;
    } catch (error) {
        console.error('Error al obtener artista:', error);
        return null;
    }
}

// 🔹 Obtener una canción de un artista desde Last.fm
async function obtenerCancionDeArtista(artista) {
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(artista)}&api_key=${LASTFM_API_KEY}&format=json&limit=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const canciones = data.toptracks.track;
        if (canciones.length === 0) return null;

        const cancionAleatoria = canciones[Math.floor(Math.random() * canciones.length)];
        return `${cancionAleatoria.artist.name} - ${cancionAleatoria.name}`;
    } catch (error) {
        console.error('Error al obtener canción de Last.fm:', error);
        return null;
    }
}

// 🔹 Evento al hacer clic en el botón
document.getElementById('load-music').addEventListener('click', async () => {
    const artista = await obtenerArtistaAleatorio();
    if (!artista) return;

    const cancion = await obtenerCancionDeArtista(artista);
    if (!cancion) return;

    console.log(`🔹 Buscando en YouTube: ${cancion}`);

    // 🔹 Redirigir a la búsqueda de la canción en YouTube
    window.open(`${YOUTUBE_SEARCH_URL}${encodeURIComponent(cancion)}`, '_blank');
});
