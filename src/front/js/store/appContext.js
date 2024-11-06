import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		// Inicializa el estado con los valores de `getState`
		const [state, setState] = useState(() =>
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: { ...state.store, ...updatedStore },
						store: { ...state.store, ...updatedStore },
						actions: { ...state.actions }
					})
			})
		);

		// Ejecuta una acción al cargar el componente (si tienes alguna en flux.js)
		useEffect(() => {
			// Si tienes una acción inicial, llámala aquí.
			// Ejemplo: state.actions.getInitialData();
		}, []);

		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};


	return StoreWrapper;
};

export default injectContext;
