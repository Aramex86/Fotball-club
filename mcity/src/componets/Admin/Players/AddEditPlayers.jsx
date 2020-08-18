import React, { Component } from 'react';
import AdminLayout from '../../../HOC/AdminLayout';

import FormField from '../../utiles/FormData';
import { validation } from '../../common/inputValidation';
import { dataPlayers, dataBase,  firebase } from '../../../firebase';
//import { firebaseLooper, reverseArray } from '../../common/ConvertFunction';
import Fileuploader from '../../common/Fileuploader';

class AddEditPlayers extends Component {
	state = {
		playerId: '',
		formType: '',
		formError: false,
		formSucces: '',
		defaultImg: '',
		formdata: {
			name: {
				element: 'input',
				value: '',
				config: {
					label: 'Player Name',
					name: 'name_input',
					type: 'text',
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: true,
			},
			lastname: {
				element: 'input',
				value: '',
				config: {
					label: 'Player Last Name',
					name: 'lastname_input',
					type: 'text',
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: true,
			},
			number: {
				element: 'input',
				value: '',
				config: {
					label: 'Player Number',
					name: 'number_input',
					type: 'text',
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: true,
			},
			position: {
				element: 'select',
				value: '',
				config: {
					label: 'Select a position',
					name: 'select_position',
					type: 'select',
					options: [
						{ key: 'Keeper', value: 'Keeper' },
						{ key: 'Defence', value: 'Defence' },
						{ key: 'Midfield', value: 'Midfield' },
						{ key: 'Striker', value: 'Striker' },
					],
				},
				validation: {
					required: true,
				},
				valid: false,
				validationMessage: '',
				showLabel: false,
			},
			image: {
				element: 'image',
				value: '',
				validation: { required: true },
				valid: false,
			},
		},
	};

	updateForm = (element, content = '') => {
		const newFormdata = { ...this.state.formdata };
		const newElement = { ...newFormdata[element.id] };

		if (content === '') {
			newElement.value = element.event.target.value;
		} else {
			newElement.value = content;
		}

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
			if (this.state.formType === 'Edit Player') {
				dataBase
					.ref(`players/${this.state.playerId}`)
					.update(dataToSubmit)
					.then(() => {
						this.successForm();
					})
					.catch((e) => {
						this.setState({ formError: true });
					});
			} else {
				dataPlayers
					.push(dataToSubmit)
					.then(() => {
						this.props.history.push('/admin_players');
					})
					.catch((e) => {
						this.setState({
							formError: true,
						});
					});
			}
		} else {
			this.setState({
				formError: true,
			});
		}
	};

	updateFields = (player, playerId, formType, defaultImg) => {
		const newFormdata = { ...this.state.formdata };

		for (let key in newFormdata) {
			newFormdata[key].value = player[key];
			newFormdata[key].valid = true;
		}
		this.setState({
			playerId,
			defaultImg,
			formType,
			formdata: newFormdata,
		});
	};

	successForm = (message) => {
		this.setState({
			formSucces: message,
		});
		setTimeout(() => {
			this.setState({
				formSucces: '',
			});
		}, 2000);
	};
	componentDidMount() {
		const playerId = this.props.match.params.id;
		if (!playerId) {
			this.setState({
				formType: 'Add Player',
			});
		} else {
			dataBase
				.ref(`players/${playerId}`)
				.once('value')
				.then((snapshop) => {
					const playerdData = snapshop.val();

					firebase
						.storage()
						.ref('players')
						.child(playerdData.image)
						.getDownloadURL()
						.then((url) => {
							this.updateFields(playerdData, playerId, 'Edit player', url);
						})
						.catch((e) => {
							this.updateFields({ ...playerdData, image: '' }, playerId, 'Edit player', '');
						});
				});
		}
	}
	resetImage = () => {
		const newFormdata = { ...this.state.formdata };
		newFormdata['image'].value = '';
		newFormdata['image'].valid = false;
		this.setState({
			defaultImg: '',
			formdata: newFormdata,
		});
	};
	storefileName = (filename) => {
		this.updateForm({ id: 'image' }, filename);
	};

	render() {
		return (
			<AdminLayout>
				<div className="editplayers_dialog_wrapper">
					<h2>{this.state.formType}</h2>
					<div>
						<form onSubmit={(event) => this.submitForm(event)}>
							<Fileuploader
								dir="players"
								tag={'Player image'}
								defaultImg={this.state.defaultImg}
								defaultImgName={this.state.formdata.value}
								resetImage={() => this.resetImage()}
								fileName={(filename) => this.storefileName(filename)}
							></Fileuploader>

							<FormField
								id={'name'}
								formdata={this.state.formdata.name}
								change={(element) => this.updateForm(element)}
							/>
							<FormField
								id={'lastname'}
								formdata={this.state.formdata.lastname}
								change={(element) => this.updateForm(element)}
							/>
							<FormField
								id={'number'}
								formdata={this.state.formdata.number}
								change={(element) => this.updateForm(element)}
							/>
							<FormField
								id={'position'}
								formdata={this.state.formdata.position}
								change={(element) => this.updateForm(element)}
							/>
						</form>
						<div className="success_label">{this.state.formSucces}</div>
						{this.state.formError ? <div className="error_label">Something is wrong</div> : ''}
						<div className="admin_submit">
							<button onClick={(event) => this.submitForm(event)}>{this.state.formType}</button>
						</div>
					</div>
				</div>
			</AdminLayout>
		);
	}
}

export default AddEditPlayers;
