import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddStoreModal } from './AddStoreModal';
import { EditStoreModal } from './EditStoreModal';

export class Store extends Component {

    constructor(props) {
        super(props);
        this.state = { sts: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'Store')
            .then(response => response.json())
            .then(data => {
                this.setState({ sts: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }
    deletepro(stoid) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'Store/' + stoid, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }
    

    render() {
        const { sts, stoid, stoname, stoprice } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div >
                <p></p>
                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        NewStore</Button>

                    <AddStoreModal show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
               
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        
                        <tr>
                            <th>StoreId</th>
                            <th>StoreName</th>
                            <th>StorePrice</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sts.map(sto =>
                            <tr key={sto.StoreId}>
                                <td>{sto.StoreId}</td>
                                <td>{sto.ProductName}</td>
                                <td>{sto.ProductPrice}</td>
                                <td>

                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                stoid: sto.ProductId, stoname: sto.ProductName, stoprice: sto.ProductPrice
                                            })}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deletesto(sto.ProductId)}>
                                            Delete
                                        </Button>

                                        <EditStoreModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            stoid={stoid}
                                            stoname={stoname}
                                            stoprice={stoprice} />
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                
            </div>
        )
    }
}

