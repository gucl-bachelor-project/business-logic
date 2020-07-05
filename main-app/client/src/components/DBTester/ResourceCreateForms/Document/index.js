import React, {useState} from "react";
import {createResource} from "../utils/api-call";
import {Button, Form} from "react-bootstrap";

/**
 * Form to create document resource.
 */
function DocumentCreateForm(props) {
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
            const title = form.elements.formTitle.value;
            const content = form.elements.formContent.value;
            const publishDate = form.elements.formPublishDate.value;
            const authorUserId = form.elements.formAuthorUserId.value;

            setSubmitting(true);

            createResource(props.resourcePath, {
                title: title,
                content: content,
                pub_date: publishDate,
                author_user_id: authorUserId
            }).then(response => {
                setResult(`Created document with ID: ${response.data.id}.`);
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
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control required type="text"/>
                </Form.Group>
                <Form.Group controlId="formContent">
                    <Form.Label>Content</Form.Label>
                    <Form.Control required as="textarea" rows="1"/>
                </Form.Group>
                <Form.Group controlId="formPublishDate">
                    <Form.Label>Publish Date</Form.Label>
                    <Form.Control required readOnly value={new Date().toISOString()}/>
                </Form.Group>
                <Form.Group controlId="formAuthorUserId">
                    <Form.Label>Author user ID</Form.Label>
                    <Form.Control required type="number" defaultValue="0"/>
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

export default DocumentCreateForm;
