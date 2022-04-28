import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddCusModal} from './AddCusModal';
import {EditCusModal} from './EditCusModal';
export class Customer extends Component {

   constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false, editModalShow:false}
    }

   refreshList(){
        fetch(process.env.REACT_APP_API+'Customer')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
    deleteDep(depid) {
        if (window.confirm('Are you sure?')) {
            fetch(process.env.REACT_APP_API + 'Customer/' + depid, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }
   
    render(){
        const { deps, depid, depname, depaddress } = this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <p></p>
                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        NewCustomer</Button>

                    <AddCusModal show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>      
                        <tr>
                        <th>CustomerId</th>
                            <th>CustomerName</th>
                            <th>CustomerAddress</th>
                        <th>Actions</th>
                        </tr>      
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                            <tr key={dep.CustomerId}>
                                <td>{dep.CustomerId}</td>
                                <td>{dep.CustomerName}</td>
                                <td>{dep.CustomerAddress}</td>
                                <td>

                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                depid: dep.CustomerId, depname: dep.CustomerName, depaddress: dep.CustomerAddress
                                            })}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteDep(dep.CustomerId)}>
                                            Delete
                                        </Button>

                                        <EditCusModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            depid={depid}
                                            depname={depname}
                                            depaddress={depaddress}/>
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>                             

                
            </div>
        )
    }
}