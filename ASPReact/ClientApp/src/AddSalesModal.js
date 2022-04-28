import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddSalesModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(process.env.REACT_APP_API + 'Sales', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //................

            body: JSON.stringify({
                SalesId: null,
                SalesDate: event.target.SalesDate.value,
                SalesCustomer: event.target.SalesCustomer.value,
                SalesProduct: event.target.SalesProduct.value,
                SalesStore: event.target.SalesStore.value
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
                            Create
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
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
