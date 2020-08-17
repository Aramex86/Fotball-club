import React, { Component } from 'react';
import FormField from '../../componets/utiles/FormData';
import { validation } from '../../componets/common/inputValidation';
import { firebase } from '../../firebase';

class SingIn extends Component {
	state = {
		formError: false,
		formSucces: '',
		formdata: {
			email: {
				element: 'input',
				value: '',
				config: {
					name: 'email_input',
					type: 'email',
					placeholder: 'Enter you email',
				},
				validation: {
					required: true,
					email: true,
				},
				valid: false,
				validationMessage: '',
			},
			password: {
				element: 'input',
				value: '',
				config: {
					name: 'password_input',
					type: 'password',
					placeholder: 'Enter you password',
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
			},
		},
	};

	updateForm = (element) => {
		const newFormdata = { ...this.state.formdata };
		const newElement = { ...newFormdata[element.id] };

		newElement.value = element.event.target.value;

		let validData = validation(newElement);
		newElement.valid = validData[0];
		newElement.validationMessage = validData[1];

		newFormdata[element.id] = newElement;

		this.setState({
			formError: false,
			formdata: newFormdata,
		});
	};

	submitForm = (event) => {
		event.preventDefault();

		let dataToSubmit = {};
		let formIsValid = true;

		for (let key in this.state.formdata) {
			dataToSubmit[key] = this.state.formdata[key].value;
			formIsValid = this.state.formdata[key].valid && formIsValid;
		}

		if (formIsValid) {
			firebase
				.auth()
				.signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
				.then(() => {
					this.props.history.push('/dashboard');
				})
				.catch((error) => {
					this.setState({
						formError: true,
					});
				});
		} else {
			this.setState({
				formError: true,
			});
		}
	};

	render() {
		return (
			<div className="container">
				<div className="signin_wrapper" style={{ margin: '100px' }}>
					<h2>Please Login</h2>
					<form onSubmit={(event) => this.submitForm(event)}>
						<FormField
							id={'email'}
							formdata={this.state.formdata.email}
							change={(element) => this.updateForm(element)}
						/>
						<FormField
							id={'password'}
							formdata={this.state.formdata.password}
							change={(element) => this.updateForm(element)}
						/>
						{this.state.formError ? <div className="error_label">Somethisg is wrong, try again</div> : null}
						<button onClick={(event) => this.submitForm(event)}>Sign in</button>
					</form>
				</div>
			</div>
		);
	}
}

export default SingIn;
