import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import swal from 'sweetalert';

class AffiliateForm extends React.Component {

    constructor() {
        super();

        this.state = {
            formData: {
                api_key: ''
            },
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = (e) => {
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                key: this.state.formData.api_key
            })

        })
            .then((resp) => resp.json())
        .then((resp) =>{
            console.log(resp);

            console.log(resp.key);
            localStorage.setItem("id", resp.key);

            swal("Good job!", "You logged in!", "success").then(() => {

                this.props.methods.changeLoggedIn();

            });

        }).catch((error) => {
            console.log(error);
        });
        //this.props.methods.changeLoggedIn();
    };

    render() {
        const { formData, submitted } = this.state;
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <h2>API form</h2>
                <TextValidator
                    className="w-60"
                    label="Api key"
                    onChange={this.handleChange}
                    name="api_key"
                    value={formData.api_key}
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

/*

{
  "firstname": "John323",
  "lastname": "Doe",
  "email": "John.Doeweq2012e@tapfiliate.com",
  "password": "password1234",
  "company": {
    "name": "Tapfiliate"
  }
}

 */