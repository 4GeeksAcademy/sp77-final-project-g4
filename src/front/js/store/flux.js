const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            demo: [
                { title: "FIRST", background: "white", initial: "white" },
                { title: "SECOND", background: "white", initial: "white" }
            ],
            message: null,
            isAuthenticated: false,
            user: null,
            errorMessage: null,
            favoriteTeams: [], // Lista de equipos favoritos
            favoritePlayers: [], // Lista de jugadores favoritos
            players: [] // Jugadores de un equipo específico
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            getMessage: async () => {
                const uri = `${process.env.BACKEND_URL}/api/hello`;
                const options = { method: 'GET' };
                const response = await fetch(uri, options);
                if (!response.ok) {
                    console.log("Error loading message from backend", response.status);
                    return;
                }
                const data = await response.json();
                setStore({ message: data.message });
                return data;
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((element, i) => {
                    if (i === index) element.background = color;
                    return element;
                });
                setStore({ demo: demo });
            },
            login: async (username, password) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ username, password })
                    });
                    if (!response.ok) throw new Error("Credenciales incorrectas");
                    const data = await response.json();
                    setStore({
                        isAuthenticated: true,
                        user: data.user,
                        errorMessage: null
                    });
                    console.log("Login exitoso", data);
                } catch (error) {
                    setStore({
                        isAuthenticated: false,
                        user: null,
                        errorMessage: error.message
                    });
                    console.log("Error en login:", error.message);
                }
            },
            logout: () => {
                setStore({
                    isAuthenticated: false,
                    user: null,
                    errorMessage: null
                });
                console.log("Logout exitoso");
            },
            addFavoriteTeam: (team) => {
                const store = getStore();
                const isFavorite = store.favoriteTeams.some(favTeam => favTeam.id === team.id);
                if (!isFavorite) {
                    setStore({
                        favoriteTeams: [...store.favoriteTeams, team]
                    });
                    console.log("Equipo agregado a favoritos", team);
                } else {
                    console.log("Este equipo ya está en favoritos.");
                }
            },
            toggleFavoriteTeam: (team) => {
                const store = getStore();
                const isFavorite = store.favoriteTeams.some(favTeam => favTeam.id === team.id);
                if (isFavorite) {
                    // Si ya es favorito, lo eliminamos
                    setStore({
                        favoriteTeams: store.favoriteTeams.filter(favTeam => favTeam.id !== team.id)
                    });
                    console.log("Equipo eliminado de favoritos", team);
                } else {
                    setStore({
                        favoriteTeams: [...store.favoriteTeams, team]
                    });
                    console.log("Equipo agregado a favoritos", team);
                }
            },
            fetchPlayersByTeam: async (teamId) => {
                try {
                    // Construimos la URL del backend con el ID del equipo
                    const response = await fetch(`${process.env.BACKEND_URL}/api/teams/${teamId}/players`);
                    
                    if (!response.ok) {
                        throw new Error(`Error al obtener jugadores: ${response.statusText}`);
                    }
            
                    // Convertimos la respuesta a JSON
                    const data = await response.json();
                    
                    // Guardamos los jugadores obtenidos en el estado global
                    setStore({ players: data.players });
                    console.log("Jugadores obtenidos:", data.players);
                } catch (error) {
                    // Manejamos y mostramos el error
                    console.error("Error al obtener jugadores:", error.message);
                }
            },
            addFavoritePlayer: (player) => {
                const store = getStore();
                const isFavorite = store.favoritePlayers.some(favPlayer => favPlayer.id === player.id);
                if (!isFavorite) {
                    setStore({
                        favoritePlayers: [...store.favoritePlayers, player]
                    });
                    console.log("Jugador agregado a favoritos", player);
                } else {
                    console.log("Este jugador ya está en favoritos.");
                }
            },
            removeFavoritePlayer: (player) => {
                const store = getStore();
                setStore({
                    favoritePlayers: store.favoritePlayers.filter(favPlayer => favPlayer.id !== player.id)
                });
                console.log("Jugador eliminado de favoritos", player);
            }
        }
    };
};

export default getState;
