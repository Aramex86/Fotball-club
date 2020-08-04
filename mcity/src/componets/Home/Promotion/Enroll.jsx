import React, {Component} from 'react';
import Fade from 'react-reveal/Fade';
import FormData from '../../utiles/FormData';

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
  submitForm = () => {};

  render() {
    return (
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={(event) => this.submitForm(event)}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
                <FormData id={'email'} formdata={this.state.formdata}/>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}

export default Enroll;
