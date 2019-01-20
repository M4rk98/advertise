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

    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    };

    handleSubmit = (e) => {
        fetch("http://gentle-beyond-76280.herokuapp.com/login", {
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                key: this.state.formData.api_key
            })

        })
        .then((resp) => resp.json())
        .then((resp) =>{

            localStorage.setItem("id", resp.key);

            fetch("http://gentle-beyond-76280.herokuapp.com/affiliates/", {
                headers: {
                    id: localStorage.getItem('id'),
                }
            })
            .then((resp) => resp.json())
            .then((resp) => {
                if(resp.failed != null) {
                    swal("Oh no!", "Wrong API key!", "error");
                } else {
                    swal("Good job!", "You logged in!", "success").then(() => {
                        this.props.methods.refreshAffiliates();
                    })

                }
            })

        })
    };

    render() {
        const { formData, submitted } = this.state;
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <h2>API Key authentication</h2>
                <h4 className="fw2">Please give us your API key</h4>
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
