import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddProModal } from './AddProModal';
import { EditProModal } from './EditProModal';

export class Product extends Component {

    constructor(props) {
        super(props);
        this.state = { pros: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'Product')
            .then(response => response.json())
            .then(data => {
                this.setState({ pros: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }
    deletepro(proid) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'Product/' + proid, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {
        const { pros, proid, proname, proprice } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div >
                <p></p>
                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        NewProduct</Button>

                    <AddProModal show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ProductId</th>
                            <th>ProductName</th>
                            <th>ProductPrice</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pros.map(pro =>
                            <tr key={pro.ProductId}>
                                <td>{pro.ProductId}</td>
                                <td>{pro.ProductName}</td>
                                <td>{pro.ProductPrice}</td>
                                <td>

                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                proid: pro.ProductId, proname: pro.ProductName, proprice: pro.ProductPrice
                                            })}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deletepro(pro.ProductId)}>
                                            Delete
                                        </Button>

                                        <EditProModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            proid={proid}
                                            proname={proname}
                                            proprice={proprice}/>
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

               
            </div>
        )
    }
}

