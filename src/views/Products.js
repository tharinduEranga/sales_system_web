import React from "react";

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import {Card, CardBody, CardHeader, CardTitle, Col, Form, Row} from "reactstrap";
import {MDBDataTableV5} from 'mdbreact';
import axios from "axios";
import {SERVER_URL_DEV} from "../variables/constants";
import Functions from "../variables/functions";
import {Button, Modal} from "react-bootstrap";
import InputText from "../variables/input";

class Products extends React.Component {
    state = {
        productsUrl: SERVER_URL_DEV.concat(`/product`),
        addModalOpen: false,
        addProduct: {
            name: ''
        },
        addProductErrors: {
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
                                                            <InputText
                                                                label="Product Name"
                                                                id="name"
                                                                name="name"
                                                                error={this.state.addProductErrors.name}
                                                                value={this.state.addProduct.name}
                                                                onChange={this.handleAddFormChange}
                                                            />
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
            if (!e.response)
                Functions.errorSwal(e.message);

            switch (e.response.status) {
                case 400:
                case 401:
                case 403:
                case 500:
                    Functions.errorSwal(e.response.data.message);
                    break;
            }
        }
    }

    handleAddFormChange = ({currentTarget: input}) => {
        const addProduct = {...this.state.addProduct};
        addProduct[input.name] = input.value;
        this.setState({addProduct});
    }

    addProduct = async event => {
        event.preventDefault();
        const addProductErrors = this.addFormErrors();
        this.setState({addProductErrors})
        if (Object.keys(addProductErrors).length > 0)
            return;

        try {
            const response = await axios.post(this.state.productsUrl, this.state.addProduct);
            if (response.data.success)
                Functions.successSwal(response.data.message);
            else
                Functions.errorSwal(response.data.message);
        } catch (e) {
            if (!e.response)
                Functions.errorSwal(e.message);

            switch (e.response.status) {
                case 400:
                case 401:
                case 403:
                case 500:
                    Functions.errorSwal(e.response.data.message);
                    break;
            }
        }
    }

    addFormErrors = () => {
        const errors = {};
        const {addProduct} = this.state;
        if (addProduct.name.trim() === '')
            errors.name = 'Name is required!';
        return errors;
    }

}


export default Products;