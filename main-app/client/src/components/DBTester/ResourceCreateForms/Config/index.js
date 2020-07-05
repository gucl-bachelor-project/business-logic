import React, {useState} from "react";
import {createResource} from "../utils/api-call";
import {Button, Form} from "react-bootstrap";

/**
 * Form to create config resource.
 */
function ConfigCreateForm(props) {
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
            const name = form.elements.formName.value;
            const enable = form.elements.formEnable.checked;

            setSubmitting(true);

            createResource(props.resourcePath, {
                name: name,
                enabled: enable
            }).then(response => {
                setResult(`Created config with ID: ${response.data.id}.`);
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
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control required type="text"/>
                </Form.Group>
                <Form.Group>
                    <Form.Check id="formEnable" label="Enable" type="checkbox"/>
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

export default ConfigCreateForm;
