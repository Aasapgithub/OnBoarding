import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddStoreModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'Store', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //................

            body: JSON.stringify({
                ProductId: null,
                ProductName: event.target.StoreName.value,
                ProductPrice: event.target.StoreAddress.value
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
                            Create store
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="Name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="StoreName" required
                                            placeholder="Store Name" />
                                    </Form.Group>
                                    <Form.Group controlId="Address">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control type="text" name="Address" required
                                            placeholder="Address" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Modal.Footer>
                                        <Button variant="primary" type="submit">
                                            Create
                                        </Button>
                                        <Button variant="danger" onClick={this.props.onHide}>cancel</Button>
                    </Modal.Footer>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                   

                        

                </Modal>

            </div>
        )
    }

}
