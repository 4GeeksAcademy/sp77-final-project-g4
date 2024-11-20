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
            players: [] // Lista de jugadores (sin equipo específico)
        },
        actions: {
            // Obtener todos los jugadores
            getPlayers: async () => {
                const uri = `${process.env.BACKEND_URL}/api/player_list`; 
                try {
                    const response = await fetch(uri);
                    const options = { method: 'GET' };
                    if (!response.ok) {
                        throw new Error("No se pudieron cargar los jugadores.");
                    }
                    const data = await response.json();
                    setStore({ players: data }); 
                } catch (error) {
                    console.log("Error al cargar jugadores:", error.message);
                }
            },

            // Agregar un jugador a los favoritos
            addFavoritePlayer: (newFavorite) => {
                const duplicate = getStore().favoritePlayers.some((fav) => fav.id === newFavorite.id);
                if (duplicate) return; // Si el jugador ya está en favoritos, no lo agregamos de nuevo
                
                const updatedFavorites = [...getStore().favoritePlayers, newFavorite];
                setStore({ favoritePlayers: updatedFavorites });
                localStorage.setItem("favoritePlayers", JSON.stringify(updatedFavorites)); // Guardamos en localStorage
            },

            // Eliminar un jugador de los favoritos
            removeFavoritePlayer: (player) => {
                const updatedFavorites = getStore().favoritePlayers.filter(fav => fav.id !== player.id);
                setStore({ favoritePlayers: updatedFavorites });
                localStorage.setItem("favoritePlayers", JSON.stringify(updatedFavorites)); // Guardamos en localStorage
            },

            // Agregar un equipo a los favoritos
            addFavoriteTeam: (newFavorite) => {
                const duplicate = getStore().favoriteTeams.some((fav) => fav.id === newFavorite.id);
                if (duplicate) return; // Si el equipo ya está en favoritos, no lo agregamos de nuevo
                
                const updatedFavorites = [...getStore().favoriteTeams, newFavorite];
                setStore({ favoriteTeams: updatedFavorites });
                localStorage.setItem("favoriteTeams", JSON.stringify(updatedFavorites)); // Guardamos en localStorage
            },

            // Eliminar un equipo de los favoritos
            removeFavoriteTeam: (team) => {
                const updatedFavorites = getStore().favoriteTeams.filter(fav => fav.id !== team.id);
                setStore({ favoriteTeams: updatedFavorites });
                localStorage.setItem("favoriteTeams", JSON.stringify(updatedFavorites)); // Guardamos en localStorage
            },

            // Función para obtener el mensaje de bienvenida (como ejemplo)
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

            // Cambiar el color de fondo en el demo (como ejemplo)
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((element, i) => {
                    if (i === index) element.background = color;
                    return element;
                });
                setStore({ demo: demo });
            },

            // Función de login
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

            // Función de logout
            logout: () => {
                setStore({
                    isAuthenticated: false,
                    user: null,
                    errorMessage: null
                });
                console.log("Logout exitoso");
            },
        },
    };
};

export default getState;
