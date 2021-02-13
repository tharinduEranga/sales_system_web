import React from "react";

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";
import {MDBDataTableV5} from 'mdbreact';
import axios from "axios";
import {SERVER_URL_DEV} from "../variables/constants";
import Swal from "sweetalert2";
import Functions from "../variables/functions";

class Products extends React.Component {
    state = {
        productsUrl: SERVER_URL_DEV.concat(`/product`),
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
                        Functions.errorSwal(e.response.data.message); break;
                }
            } else {
                Functions.errorSwal(e.message);
            }
        }
    }
}

export default Products;