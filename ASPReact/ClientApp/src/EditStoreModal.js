import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditStoreModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'Store', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: event.target.Id.value,
                Name: event.target.Name.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
            },
                (error) => {
                    alert('Failed');
                })
    }
    render() {
        return (
            <div className="container">

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Store
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="StoreId">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control type="text" name="StoreId" required
                                            disabled
                                            defaultValue={this.props.depid}
                                            placeholder="StoreName" />
                                    </Form.Group>

                                    <Form.Group controlId="Name">
                                        <Form.Label>StoreName</Form.Label>
                                        <Form.Control type="text" name="Name" required
                                            defaultValue={this.props.depname}
                                            placeholder="StoreName" />
                                    </Form.Group>
                                    <Form.Group controlId="Address">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="text" name="Address" required
                                            placeholder="Address" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Store
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>cancel</Button>
                    </Modal.Footer>

                </Modal>

            </div>
        )
    }

}