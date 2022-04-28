import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class EditSalesModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'Sales', {
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
                            Edit Sales
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="SalesId">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control type="text" name="SalesId" required
                                            disabled
                                            defaultValue={this.props.salid}
                                            placeholder="SalesName" />
                                    </Form.Group>

                                    <Form.Group controlId="Date">
                                        <Form.Label>Date sold</Form.Label>
                                        <Form.Control type="date" name="Datesold" required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="Customer">
                                        <Form.Label>Customer</Form.Label>
                                        <Form.Control type="text" name="Customer" required
                                            placeholder="Customer Name" />
                                    </Form.Group>
                                    <Form.Group controlId="Product">
                                        <Form.Label>Product</Form.Label>
                                        <Form.Control type="text" name="Product" required
                                            placeholder="Product Name" />
                                    </Form.Group>
                                    <Form.Group controlId="Store">
                                        <Form.Label>Store</Form.Label>
                                        <Form.Control type="text" name="Store" required
                                            placeholder="Store Name" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Sales
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