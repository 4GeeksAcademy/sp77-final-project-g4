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
            favoriteTeams: [], // Favoritos de equipos
            favoritePlayers: [], // Favoritos de jugadores
            teamPlayers: [],
            playerStats: []
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
                        errorMessage: null,
                        isAuthenticated: true,
                        user: data.user,
                        errorMessage: null
                    });
                    console.log("Login exitoso", data);
                } catch (error) {
                    setStore({
                        isAuthenticated: false,
                        user: null,
                        errorMessage: error.message,
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
                    errorMessage: null,
                    isAuthenticated: false,
                    user: null,
                    errorMessage: null
                });
                console.log("Logout exitoso");
            },
            // addFavorite: (team) => {
            //     const store = getStore();
            //     // Check if the team is already in favorites by full_name
            //     if (!store.favoriteTeams.some(fav => fav.full_name === team.full_name)) {
            //         // If not, add it to the favorites
            //         setStore({ favoriteTeams: [...store.favoriteTeams, team] });
            //     }
            // },
            // removeFavorite: (team) => {
            //     const store = getStore();
            //     // Remove the team from favorites by full_name
            //     setStore({
            //         favoriteTeams: store.favoriteTeams.filter(fav => fav.full_name !== team.full_name)
            //     });
            // },

            addFavorite: (newFavorite) => {
                const store = getStore();
                console.log(getStore().favoriteTeams)
                // Verificar si el equipo ya está en favoritos
                const duplicate = store.favoriteTeams.some((team) => team.full_name === newFavorite.full_name);
                if (duplicate) return; // Salir si ya está en la lista
            
                // Agregar el nuevo equipo a los favoritos
                
                console.log(newFavorite)
                const updatedFavoriteTeams = [...store.favoriteTeams, newFavorite];
                console.log(updatedFavoriteTeams)
                // Actualizar el estado y guardar en localStorage
                setStore({ favoriteTeams: updatedFavoriteTeams });
                // setStore({ favoriteTeams: [...getStore().favoriteTeams, newFavorite]})
                localStorage.setItem("favoriteTeams", JSON.stringify(updatedFavoriteTeams));
            },

            removeFavorite: (item) => {
                console.log('Item a eliminar:', item);  // Verifica que item tiene full_name correctamente
                const updatedFavoriteTeams = getStore().favoriteTeams.filter(team => {
                    console.log('Comparando con el equipo:', team);  // Verifica cada equipo en el arreglo
                    console.log('full_name en el equipo:', team.full_name);
                    console.log('full_name en item:', item.full_name);
                    return team.full_name !== item.full_name;  // Compara full_name
                });
            
                console.log('Equipos actualizados:', updatedFavoriteTeams);  // Verifica el nuevo estado de favoritos
            
                setStore({ favoriteTeams: updatedFavoriteTeams });
                localStorage.setItem("favoriteTeams", JSON.stringify(updatedFavoriteTeams));
            },

            getTeamPlayers: async (id) => {
                console.log("Fetching players for team:", id);
                try {
                  const uri = `${process.env.BACKEND_URL}api/teams/${id}`;
                  const response = await fetch(uri);
                  if (!response.ok) {
                    throw new Error("Failed to fetch players.");
                  }
                  const data = await response.json();
              
                  // Verificar si los datos son diferentes para evitar actualizaciones innecesarias
                  const store = getStore();
                  if (JSON.stringify(store.teamPlayers) !== JSON.stringify(data)) {
                    setStore({ teamPlayers: data }); // Actualiza solo si hay cambios
                  }
                } catch (error) {
                  console.error("Error fetching team players:", error);
                }
            },
            getPlayerStats: async (id) => {
                console.log("Fetching stats for player:", id);
                try {
                    const uri = `${process.env.BACKEND_URL}api/players/${id}`; // Asegúrate de que la URL esté correcta
                    const response = await fetch(uri);
            
                    if (!response.ok) {
                        throw new Error(`Failed to fetch player stats. Status: ${response.status}`);
                    }
            
                    const data = await response.json();
            
                    // Verificar si los datos son diferentes para evitar actualizaciones innecesarias
                    const store = getStore();
                    
                    // Usar un método de comparación adecuado para los datos (puede ser por ID o algo más específico)
                    if (JSON.stringify(store.playerStats) !== JSON.stringify(data)) {
                        setStore({ playerStats: data }); // Actualiza solo si hay cambios
                    }
            
                    console.log("Player stats fetched successfully", data);
            
                } catch (error) {
                    console.error("Error fetching player stats:", error);
                    // Considera manejar el error de forma más visible, por ejemplo, mostrando un mensaje al usuario
                }
            }            
        },
    };
};
export default getState;