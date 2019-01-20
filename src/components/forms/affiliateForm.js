import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import swal from 'sweetalert';

class AffiliateForm extends React.Component {

    constructor() {
        super();

        this.state = {
            formData: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                company: '',
            },
            submitted: false,
        };

    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    };

    handleSubmit = (e) => {
        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });

        const data = {
            'email': this.state.formData.email,
            'firstname': this.state.formData.firstname,
            'lastname': this.state.formData.lastname,
            'password': this.state.formData.password,
            'company': {
                'name': this.state.formData.company
            }};

        fetch('https://gentle-beyond-76280.herokuapp.com/affiliates', {
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                'id': localStorage.getItem('id'),
            },
            body: JSON.stringify(data)
        })
        .then((resp) => resp.json())
        .then((data) => {
            if(data.Message != "Success") {
                const err = JSON.parse(data.Message.split('-')[1]);
                swal("Oh no!", JSON.parse(err).errors[0].message, "error");

            } else {
                swal("Good job!", "Affiliate added!", "success");
                this.props.methods.refreshAffiliates();
            }

        })
    };

    render() {
        const { formData, submitted } = this.state;
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <h2>Add new affiliate</h2>
                <TextValidator
                    className="w-60"
                    label="First name"
                    onChange={this.handleChange}
                    name="firstname"
                    value={formData.firstname}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <TextValidator
                    className="w-60"
                    label="Last Name"
                    onChange={this.handleChange}
                    name="lastname"
                    value={formData.lastname}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <TextValidator
                    className="w-60"
                    label="Email"
                    onChange={this.handleChange}
                    name="email"
                    value={formData.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                <br />
                <TextValidator
                    className="w-60"
                    type="password"
                    label="Password"
                    onChange={this.handleChange}
                    name="password"
                    value={formData.password}
                    validators={['required']}
                    errorMessages={['this field is required']}
                /><br />
                <TextValidator
                    className="w-60"
                    label="Company name"
                    onChange={this.handleChange}
                    name="company"
                    value={formData.company}
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <Button
                    className="w-60"
                    type="submit"
                    disabled={submitted}
                >
                    {
                        (submitted && 'Your form is submitted!')
                        || (!submitted && 'Submit')
                    }
                </Button>
            </ValidatorForm>
        );
    }
}

export default AffiliateForm;

