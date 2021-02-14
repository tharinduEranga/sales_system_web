import React from "react";

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import {Card, CardBody, CardHeader, CardTitle, Col, Form, FormGroup, Input, Row} from "reactstrap";
import {MDBDataTableV5} from 'mdbreact';
import axios from "axios";
import {SERVER_URL_DEV} from "../variables/constants";
import Swal from "sweetalert2";
import Functions from "../variables/functions";
import {Button, Modal} from "react-bootstrap";

class Products extends React.Component {
    state = {
        productsUrl: SERVER_URL_DEV.concat(`/product`),
        addModalOpen: false,
        addProduct: {
            name: ''
        },
        productsTable: {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    width: 250
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Created At',
                    field: 'createdAt',
                    sort: 'asc',
                    width: 200
                },
            ],
            rows: []
        }
    }

    openAddModal = () => this.setState({addModalOpen: true});
    closeAddModal = () => this.setState({addModalOpen: false});

    async componentDidMount() {
        return this.setProducts();
    }

    render() {

        return (
            <React.Fragment>
                <PanelHeader size="sm"/>
                <div className="content">
                    <Row>
                        <Col xs={12}>
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h4">Products</CardTitle>
                                </CardHeader>
                                <CardBody>

                                    <div className="d-flex align-items-center justify-content-center"
                                         style={{height: "10vh"}}>
                                        <Button variant="primary" onClick={this.openAddModal}>
                                            Add New
                                        </Button>
                                    </div>
                                    <Modal show={this.state.addModalOpen} onHide={this.closeAddModal}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>New Product Details</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="container">
                                                <Form onSubmit={this.addProduct}>
                                                    <Row>
                                                        <Col className="pr-1" md="12">
                                                            <FormGroup>
                                                                <label>Product Name</label>
                                                                <Input
                                                                    placeholder="Enter Name"
                                                                    type="text"
                                                                    value={this.state.addProduct.name}
                                                                    name="name"
                                                                    onChange={this.handleAddFormChange}
                                                                />
                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="10">
                                                            <Button type="submit" variant="primary">Save</Button>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.closeAddModal}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                    <MDBDataTableV5 hover entriesOptions={[5, 20, 25]}
                                                    entries={5}
                                                    data={this.state.productsTable}
                                                    fullPagination
                                                    searchTop searchBottom={false}/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }

    async setProducts() {
        try {
            const response = await axios.get(this.state.productsUrl);
            if (!response.data.success) {
                Functions.errorSwalWithFooter('Something went wrong!', response.data.message);
                return;
            }

            this.setState({
                productsTable: {
                    columns: this.state.productsTable.columns,
                    rows: response.data.data
                }
            });
        } catch (e) {
            if (e.response) {
                switch (e.response.status) {
                    case 400:
                    case 401:
                    case 403:
                    case 500:
                        Functions.errorSwal(e.response.data.message);
                        break;
                }
            } else {
                Functions.errorSwal(e.message);
            }
        }
    }

    handleAddFormChange = ({currentTarget: input}) => {
        const addProduct = {...this.state.addProduct};
        addProduct[input.name] = input.value;
        this.setState({addProduct});
    }

    addProduct = event => {
        event.preventDefault();
        console.log(this.state.addProduct);
    }
}


export default Products;