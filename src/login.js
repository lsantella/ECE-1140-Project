import React, { useCallback } from 'react'
import firebaseApp from './base';
import { Form, Button, Card } from 'react-bootstrap'
import './index.css'

function Login() {

	const handleLogin = useCallback(
		async event => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			console.log(email.value, password.value);
			try {
				await firebaseApp.auth().signInWithEmailAndPassword(email.value, password.value);
				console.log("logged in");
			} catch(error) { alert(error); }
		}
	);

	return (
		<div stlye={styles.centeredDiv}>
			<Card style={styles.loginCard}>
				<Card.Body>
					<Form onSubmit={handleLogin}>

						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control name="email" type="email" placeholder="Enter email" />
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control name="password" type="password" placeholder="Password" />
						</Form.Group>

						<div className="text-center">
							<Button variant="primary" type="submit">
								Log In
							</Button>
						</div>
						
					</Form>
				</Card.Body>
			</Card>
		</div>
	)
}

const styles = {
	loginCard: {
		width: "24rem",
		marginLeft: "auto", 
		marginRight: "auto", 
		borderRadius: "25px", 
		padding: "15px", 
		boxShadow: "0px 10px 25px #9E9E9E",
	},
	centeredDiv: {
		margin: "0",
		position: "absolute",
		top: "50%",
		msTransform: "translateY(-50%)",
		transform: "translateY(-50%)",
	}
}

export default Login
