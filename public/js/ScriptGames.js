function FilterGames() {
    const searchInput = document.getElementById('search-barr').value.toLowerCase();
    const gameList = document.getElementById('game-list');
    const allGames = [
        { name: "Honkai", url: "honkai/index.html" },
        { name: "Fnaf", url: "Fnaf/index.html" },
        { name: "Juego 3", url: "juego3.html" },
        { name: "Juego 4", url: "juego4.html" },
        { name: "Juego 5", url: "juego5.html" }
        // Puedes agregar más juegos aquí
    ];

    // Filtrar los juegos según la búsqueda
    const filteredGames = allGames.filter(game => game.name.toLowerCase().includes(searchInput));

    // Limpiar los resultados anteriores
    gameList.innerHTML = '';

    if (filteredGames.length > 0 && searchInput.length > 0) {
        // Mostrar el menú desplegable
        gameList.style.display = 'block';

        // Agregar los resultados filtrados a la lista
        filteredGames.forEach(game => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${game.url}">${game.name}</a>`;
            gameList.appendChild(li);
        });
    } else {
        // Ocultar el menú si no hay resultados o si la búsqueda está vacía
        gameList.style.display = 'none';
    }
}