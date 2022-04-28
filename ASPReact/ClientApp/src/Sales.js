import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddSalesModal } from './AddSalesModal';
import { EditSalesModal } from './EditSalesModal';

export class Sales extends Component {

    constructor(props) {
        super(props);
        this.state = { sls: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'Sales')
            .then(response => response.json())
            .then(data => {
                this.setState({ sls: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }
    deletesal(salid) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'Sales/' + salid, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {
        const { sls, salid, salcustomer, salproduct, salstore, saldate} = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div >
                <p></p>
                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        NewSale</Button>

                    <AddSalesModal show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>SalesId</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Store</th>
                            <th>Date Sold</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sls.map(sal =>
                            <tr key={sal.SalesId}>
                                <td>{sal.Customer}</td>
                                <td>{sal.Product}</td>
                                <td>{sal.Store}</td>
                                <td>{sal.DateSold}</td>
                                
                                <td>

                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                salid: sal.SalesId, salcustomer: sal.Customer, salproduct: sal.Product, salstore: sal.Store, saldate: sal.DateSold
                                            })}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deletesal(sal.SalesId)}>
                                            Delete
                                        </Button>

                                        <EditSalesModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            salid={salid}
                                            salcustomer={salcustomer}
                                            salproduct={salproduct}
                                            salstore={salstore}
                                            saldate={saldate}/>
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                
            </div>
        )
    }
}

