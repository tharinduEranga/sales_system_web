import React from "react";

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import {Card, CardBody, CardHeader, CardTitle, Col, Form, Row} from "reactstrap";
import {MDBBtn, MDBDataTableV5} from 'mdbreact';
import axios from "axios";
import {SERVER_URL_DEV} from "../variables/constants";
import Functions from "../variables/functions";
import {Button, Modal} from "react-bootstrap";
import {InputText, InputSelect, InputNumber} from "../variables/input";
import Joi from "joi-browser";
import INTERCEPTOR from "variables/global/interceptor";

class MakeStockRequest extends React.Component {
    state = {
        interceptor: INTERCEPTOR, // added this line to avoid unused import warning for INTERCEPTOR
        branchesUrl: SERVER_URL_DEV.concat(`/branch`),
        stockRequestsUrl: SERVER_URL_DEV.concat(`/stock-request`),
        productsUrl: SERVER_URL_DEV.concat(`/product`),
        stockRequest: {
            id: '',
            byBranchId: '',
            forBranchId: '',
            vehicleId: ''
        },
        stockRequestErrors: {
            byBranchId: '',
            forBranchId: '',
            vehicleId: '',
            qty: 0
        },
        addedProductDetailsTable: {
            columns: [
                {
                    label: 'Product',
                    field: 'productName',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'QTY',
                    field: 'qty',
                    sort: 'asc',
                    width: 200
                }
            ],
            rows: []
        },
        branches: [<option key='' value=''>(Select a from branch)</option>],
        selectedByBranchId: '',
        insertedQty: 0,
        processing: false
    }

    addValidateSchema = {
        byBranchId: Joi.string().required(),
        forBranchId: Joi.string().required()
    }

    async componentDidMount() {
        return this.setBranches();
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
                                    <CardTitle tag="h4">Make Stock Request</CardTitle>
                                </CardHeader>
                                <CardBody>

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="d-flex align-items-end justify-content-end">
                                                <div className="container">
                                                    <Form onSubmit={this.addStockRequest}>
                                                        <Row className="justify-content-center">
                                                            <Col className="pr-1" md="12">
                                                                <InputSelect
                                                                    label=""
                                                                    id="selectBranchId"
                                                                    name="selectBranchId"
                                                                    error={this.state.stockRequestErrors.byBranchId}
                                                                    value={this.state.selectedByBranchId}
                                                                    onChange={this.handleSelectByBranchChange}
                                                                    options={
                                                                        this.state.branches
                                                                    }
                                                                >
                                                                </InputSelect>
                                                            </Col>
                                                            <Col className="pr-1" md="12">
                                                                <InputNumber
                                                                    label="Price Per One"
                                                                    id="price"
                                                                    name="price"
                                                                    error={this.state.stockRequestErrors.qty}
                                                                    value={this.state.insertedQty}
                                                                    onChange={this.handleAddFormChange}
                                                                />
                                                            </Col>
                                                            <Col md="12">
                                                                <Button type="submit" variant="primary" block
                                                                        disabled={this.state.processing}>Save</Button>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <hr/>
                                    <div className="container">
                                        <MDBDataTableV5 hover entriesOptions={[5, 20, 25]}
                                                        entries={5}
                                                        data={this.state.addedProductDetailsTable}
                                                        fullPagination
                                                        searchTop searchBottom={false}/>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }

    async setBranches() {
        const response = await axios.get(this.state.branchesUrl);
        let branchOptions = response.data.data.map(branch => {
            return <option key={branch.id} value={branch.id}>{branch.name}</option>
        });
        branchOptions = [<option key='' value=''>(Select a branch)</option>, ...branchOptions];

        this.setState({
            branches: branchOptions
        });
    }

    handleAddFormChange = ({currentTarget: input}) => {
        const addStockRequest = {...this.state.stockRequest};
        addStockRequest[input.name] = input.value;
        this.setState({addStockRequest});
    }

    handleSelectByBranchChange = async ({currentTarget: input}) => {
        let selectedByBranchId = input.value;
        await this.setState({selectedByBranchId});
    }

    addStockRequest = async event => {
        event.preventDefault();
        const stockRequestErrors = this.addFormErrors();
        this.setState({stockRequestErrors});
        if (Object.keys(stockRequestErrors).length > 0)
            return;

        this.setProcessing(true);

        try {
            const response = await axios.post(this.state.stockRequestsUrl, this.state.stockRequest);
            if (response.data.success) {
                Functions.successSwal(response.data.message);
                this.closeAddModal();
                this.setState({addStockRequest: {name: ''}});
                await this.setBranches();
            }
        } catch (e) {
        }

        this.setProcessing(false);
    }

    addFormErrors = () => {
        const errors = {};
        const {addStockRequest} = this.state;
        const options = {abortEarly: false};
        let validate = Joi.validate(addStockRequest, this.addValidateSchema, options);

        if (!validate.error) return errors;

        for (const detail of validate.error.details)
            errors[detail.path] = detail.message;
        return errors;
    }

    productUpdateClick = (event) => {
        const selected = JSON.parse(event.target.value);
        this.setState({
            updateBranch: {
                id: selected.id,
                name: selected.name,
                address: selected.address,
                tel: selected.tel,
                statusId: selected.statusId
            }
        });
        this.openUpdateModal();
    }

    setProcessing = (processing) => {
        this.setState({processing: processing});
    }
}


export default MakeStockRequest;