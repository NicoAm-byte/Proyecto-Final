function FilterGames() {
    const searchInput = document.getElementById('search-barr').value.toLowerCase();
    const gameList = document.getElementById('game-list');

    const allGames = [
        { name: "Honkai", url: "honkai/index.html" },
        { name: "Fnaf", url: "Fnaf/index.html" },
        { name: "..", url: "juego3.html" },
        { name: "..", url: "juego4.html" },
        { name: "..", url: "juego5.html" }
    ];

    const filteredGames = allGames.filter(game =>
        game.name.toLowerCase().includes(searchInput)
    );

    gameList.innerHTML = ''; // Limpiar los resultados previos

    if (filteredGames.length > 0 && searchInput) {
        gameList.style.display = 'block';
        filteredGames.forEach(game => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${game.url}">${game.name}</a>`;
            gameList.appendChild(li);
        });
    } else if (searchInput) {
        // Si no hay resultados y el campo no está vacío
        gameList.style.display = 'block';
        const li = document.createElement('li');
        li.textContent = "Contenido no encontrado";
        li.style.color = "gray"; // Personaliza el estilo del mensaje si quieres
        gameList.appendChild(li);
    } else {
        // Ocultar el menú si la búsqueda está vacía
        gameList.style.display = 'none';
    }
}
