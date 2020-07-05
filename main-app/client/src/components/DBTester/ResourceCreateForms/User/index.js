import React, {useState} from "react";
import {createResource} from '../utils/api-call';
import {Button, Form} from "react-bootstrap";

/**
 * Form to create user resource.
 */
function UserCreateForm(props) {
    const [result, setResult] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSubmitting, setSubmitting] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const validForm = form.checkValidity();

        event.preventDefault();
        event.stopPropagation();

        if (validForm) {
            const firstName = form.elements.formFirstName.value;
            const lastName = form.elements.formLastName.value;
            const gender = form.elements.formGender.value.toLowerCase();

            setSubmitting(true);

            createResource(props.resourcePath, {
                first_name: firstName,
                last_name: lastName,
                gender: gender
            }).then(response => {
                setResult(`Created user with ID: ${response.data.id}.`);
            }).catch(errorMessage => {
                setErrorMessage(errorMessage);
                setResult(null);
            }).finally(() => {
                setSubmitting(false);
            });
        }

        setValidated(true);
    };

    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="formFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control required type="text"/>
                </Form.Group>
                <Form.Group controlId="formLastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control required type="text"/>
                </Form.Group>
                <Form.Group controlId="formGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control required as="select">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" disabled={isSubmitting}>Submit</Button>
            </Form>
            <div style={{marginTop: "10px"}}>
                {errorMessage && !result ? <p style={{color: "red"}}>{errorMessage}</p> : null}
                {result ? <p>{result}</p> : null}
            </div>
        </>
    );
}

export default UserCreateForm;
