import React, {Component} from 'react';
import Fade from 'react-reveal/Fade';
import FormData from '../../utiles/FormData';
import {validation} from '../../common/inputValidation';
import {dataPromotion} from '../../../firebase';

class Enroll extends Component {
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
    },
  };

  resetFormSuccess = (type) => {
    const newFormdata = {...this.state.formdata};

    for (let key in newFormdata) {
      newFormdata[key].value = '';
      newFormdata[key].valid = false;
      newFormdata[key].validationMessage = '';
    }

    this.setState({
      formError: false,
      formdata: newFormdata,
      formSucces: type ? 'Congratulations' : 'All ready on the database',
    });
    this.successeMessage();
  };

  successeMessage = () => {
    setTimeout(() => {
      this.setState({
        formSucces: '',
      });
    }, 2000);
  };

  updateForm = (element) => {
    const newFormdata = {...this.state.formdata};
    const newElement = {...newFormdata[element.id]};

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
      dataPromotion
        .orderByChild('email')
        .equalTo(dataToSubmit.email)
        .once('value')
        .then((snapshot) => {
          if (snapshot.val() === null) {
            dataPromotion.push(dataToSubmit);
            this.resetFormSuccess(true);
          } else {
            this.resetFormSuccess(false);
          }
        });
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={(event) => this.submitForm(event)}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              <FormData
                id={'email'}
                formdata={this.state.formdata.email}
                change={(element) => this.updateForm(element)}
              />

              {this.state.formError ? (
                <div className="error_label">Somethisg is wrong, try again</div>
              ) : null}
              <div className="success_label">{this.state.formSucces}</div>
              <button onClick={(event) => this.submitForm(event)}>
                Enroll
              </button>
              <div className="enroll_discl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
