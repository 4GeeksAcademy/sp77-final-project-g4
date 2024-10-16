import React, { useState } from 'react';

const LoginForm = ({ onClose }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log('Logging in with', username, password);
		// Aquí puedes hacer el fetch o axios post para enviar los datos al backend
	};

	const inputStyle = {
		padding: "10px",
		margin: "10px 0",
		border: "1px solid #ccc",
		borderRadius: "5px",
		width: "100%",
		boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
		fontSize: "16px",
	};

	const buttonStyle = {
		backgroundColor: "#007bff",
		color: "white",
		fontWeight: "bold",
		border: "none",
		padding: "10px 20px",
		borderRadius: "5px",
		cursor: "pointer",
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
		transition: "background-color 0.3s, transform 0.3s",
	};

	const buttonHoverStyle = {
		backgroundColor: "#0056b3",
		transform: "scale(1.05)",
	};

	const [isHovered, setIsHovered] = useState(false);

	return (
		<div style={{ padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<input 
					type="text" 
					placeholder="Username" 
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required 
					style={inputStyle} 
				/>
				<input 
					type="password" 
					placeholder="Password" 
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required 
					style={inputStyle} 
				/>
				<button
					type="submit"
					style={{
						...buttonStyle,
						...(isHovered ? buttonHoverStyle : {}),
					}}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					Login
				</button>
			</form>
			<button onClick={onClose} style={{ marginTop: "10px", border: "none", background: "transparent", cursor: "pointer", color: "#007bff" }}>
				Close
			</button>
		</div>
	);
};

export default LoginForm;
