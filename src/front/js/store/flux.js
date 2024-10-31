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
            errorMessage: null
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
                    const response = await fetch("url back", {
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
            }
        }
    };
};

export default getState;
