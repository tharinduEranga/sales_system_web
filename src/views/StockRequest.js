import React from "react";

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import {Card, CardBody, CardHeader, CardTitle, Col, Form, Row} from "reactstrap";
import {MDBBtn, MDBDataTableV5} from 'mdbreact';
import axios from "axios";
import {SERVER_URL_DEV} from "../variables/constants";
import Functions from "../variables/functions";
import {Button, Modal} from "react-bootstrap";
import {InputText, InputSelect} from "../variables/input";
import Joi from "joi-browser";
import INTERCEPTOR from "variables/global/interceptor";

class StockRequest extends React.Component {
    state = {
        interceptor: INTERCEPTOR, // added this line to avoid unused import warning for INTERCEPTOR
        stockRequestsUrl: SERVER_URL_DEV.concat(`/stock-request`),
        branchesUrl: SERVER_URL_DEV.concat(`/branch`),
        addModalOpen: false,
        updateModalOpen: false,
        addStockRequest: {
            byBranchId: '',
            forBranchId: '',
            vehicleId: ''
        },
        updateStockRequest: {
            id: '',
            byBranchId: '',
            forBranchId: '',
            vehicleId: ''
        },
        addStockRequestErrors: {
            byBranchId: '',
            forBranchId: '',
            vehicleId: ''
        },
        updateStockRequestErrors: {
            byBranchId: '',
            forBranchId: '',
            vehicleId: ''
        },
        stockRequestsTable: {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'From',
                    field: 'byBranchName',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'To',
                    field: 'forBranchName',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Vehicle',
                    field: 'vehicleReg',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Created',
                    field: 'createdAt',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Updated',
                    field: 'updatedAt',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Action',
                    field: 'action',
                    sort: 'asc',
                    width: 200
                }
            ],
            rows: []
        },
        branches: [<option key='' value=''>(Select a from branch)</option>],
        selectedBranchId: '',
        processing: false
    }

    addValidateSchema = {
        name: Joi.string().required(),
        address: Joi.string().required(),
        tel: Joi.string().required()
    }

    updateValidateSchema = {
        id: Joi.string().required(),
        name: Joi.string().required(),
        address: Joi.string().required(),
        tel: Joi.string().required(),
        statusId: Joi.number().required()
    }

    openAddModal = () => this.setState({addModalOpen: true});
    closeAddModal = () => this.setState({addModalOpen: false});

    openUpdateModal = () => this.setState({updateModalOpen: true});
    closeUpdateModal = () => this.setState({updateModalOpen: false});

    async componentDidMount() {
        this.setBranches();
        this.setStockRequests();
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
                                    <CardTitle tag="h4">Stock Requests</CardTitle>
                                </CardHeader>
                                <CardBody>

                                    <div className="row container" style={{height: "12vh"}}>
                                        <div className="align-items-start justify-content-start col-6"
                                             style={{marginTop: "10px"}}>
                                            <InputSelect
                                                label=""
                                                id="selectBranchId"
                                                name="selectBranchId"
                                                error={''}
                                                value={this.state.selectedBranchId}
                                                onChange={this.handleSelectBranchChange}
                                                options={
                                                    this.state.branches
                                                }
                                            >
                                            </InputSelect>
                                        </div>
                                        <div className="col-6">
                                            <div className="d-flex align-items-end justify-content-end">
                                                <Button variant="primary" className="w-100" onClick={this.openAddModal}>Add New</Button>
                                            </div>
                                        </div>
                                    </div>
                                    <Modal show={this.state.addModalOpen} onHide={this.closeAddModal}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>New Stock Request Details</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="container">
                                                <Form onSubmit={this.addStockRequest}>
                                                    <Row className="justify-content-center">
                                                        <Col className="pr-1" md="12">
                                                            <InputText
                                                                label="Stock Request Name"
                                                                id="name"
                                                                name="name"
                                                                error={this.state.addStockRequestErrors.name}
                                                                value={this.state.addStockRequest.name}
                                                                onChange={this.handleAddFormChange}
                                                            />
                                                        </Col>
                                                        <Col className="pr-1" md="12">
                                                            <InputText
                                                                label="StockRequest Address"
                                                                id="address"
                                                                name="address"
                                                                error={this.state.addStockRequestErrors.address}
                                                                value={this.state.addStockRequest.address}
                                                                onChange={this.handleAddFormChange}
                                                            />
                                                        </Col>
                                                        <Col className="pr-1" md="12">
                                                            <InputText
                                                                label="StockRequest Tel"
                                                                id="tel"
                                                                name="tel"
                                                                error={this.state.addStockRequestErrors.tel}
                                                                value={this.state.addStockRequest.tel}
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
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.closeAddModal}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                    <Modal show={this.state.updateModalOpen} onHide={this.closeUpdateModal}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Update Stock Request Details</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="container">
                                                <Form onSubmit={this.updateStockRequest}>
                                                    <Row>
                                                        <Col className="pr-1" md="12">
                                                            <InputText
                                                                label="StockRequest Name"
                                                                id="name"
                                                                name="name"
                                                                error={this.state.updateStockRequestErrors.name}
                                                                value={this.state.updateStockRequest.name}
                                                                onChange={this.handleUpdateFormChange}
                                                            />
                                                        </Col>
                                                        <Col className="pr-1" md="12">
                                                            <InputText
                                                                label="StockRequest Address"
                                                                id="address"
                                                                name="address"
                                                                error={this.state.updateStockRequestErrors.address}
                                                                value={this.state.updateStockRequest.address}
                                                                onChange={this.handleUpdateFormChange}
                                                            />
                                                        </Col>
                                                        <Col className="pr-1" md="12">
                                                            <InputText
                                                                label="StockRequest Tel"
                                                                id="tel"
                                                                name="tel"
                                                                error={this.state.updateStockRequestErrors.tel}
                                                                value={this.state.updateStockRequest.tel}
                                                                onChange={this.handleUpdateFormChange}
                                                            />
                                                        </Col>
                                                        <Col className="pr-1" md="12">
                                                            <InputSelect
                                                                label="StockRequest Status"
                                                                id="statusId"
                                                                name="statusId"
                                                                error={this.state.updateStockRequestErrors.statusId}
                                                                value={this.state.updateStockRequest.statusId}
                                                                onChange={this.handleUpdateFormChange}
                                                                options={[
                                                                    <option key={1} value={1}>Active</option>,
                                                                    <option key={0} value={0}>Inactive</option>
                                                                ]}>
                                                            </InputSelect>
                                                        </Col>
                                                        <Col md="12">
                                                            <Button type="submit" variant="primary" block
                                                                    disabled={this.state.processing}>Update</Button>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={this.closeUpdateModal}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                    <div className="container">
                                        <MDBDataTableV5 hover entriesOptions={[5, 20, 25]}
                                                        entries={5}
                                                        data={this.state.stockRequestsTable}
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
        branchOptions = [<option key='' value=''>(Select a from branch)</option>, ...branchOptions];

        this.setState({
            branches: branchOptions
        });
    }

    async setStockRequests() {

        const selectedBranchId = this.state.selectedBranchId;
        const response = await axios.get(selectedBranchId ? this.state.stockRequestsUrl + `/by-branch/` + selectedBranchId
            : this.state.stockRequestsUrl);

        const dataWithButton = response.data.data.map(data => {
            data.action = <React.Fragment>
                <button className="btn btn-warning btn-sm w-20 ml-1" value={JSON.stringify(data)}
                        onClick={this.stockRequestUpdateClick}>Update
                </button>
            </React.Fragment>
            return data;
        });

        this.setState({
            stockRequestsTable: {
                columns: this.state.stockRequestsTable.columns,
                rows: dataWithButton
            }
        });
    }

    handleAddFormChange = ({currentTarget: input}) => {
        const addStockRequest = {...this.state.addStockRequest};
        addStockRequest[input.name] = input.value;
        this.setState({addStockRequest});
    }

    handleUpdateFormChange = ({currentTarget: input}) => {
        const updateStockRequest = {...this.state.updateStockRequest};
        updateStockRequest[input.name] = input.value;
        this.setState({updateStockRequest});
    }

    handleSelectBranchChange = async ({currentTarget: input}) => {
        let selectedBranchId = input.value;
        await this.setState({selectedBranchId});
        this.setStockRequests();
    }

    addStockRequest = async event => {
        event.preventDefault();
        const addStockRequestErrors = this.addFormErrors();
        this.setState({addStockRequestErrors});
        if (Object.keys(addStockRequestErrors).length > 0)
            return;

        this.setProcessing(true);

        try {
            const response = await axios.post(this.state.stockRequestsUrl, this.state.addStockRequest);
            if (response.data.success) {
                Functions.successSwal(response.data.message);
                this.closeAddModal();
                this.setState({addStockRequest: {name: ''}});
                await this.setStockRequests();
            }
        } catch (e) {
        }

        this.setProcessing(false);
    }

    updateStockRequest = async event => {
        event.preventDefault();
        const updateStockRequestErrors = this.updateFormErrors();
        this.setState({updateStockRequestErrors});
        if (Object.keys(updateStockRequestErrors).length > 0)
            return;

        this.setProcessing(true);

        try {
            const response = await axios.put(this.state.stockRequestsUrl, this.state.updateStockRequest);
            if (response.data.success) {
                Functions.successSwal(response.data.message);
                this.closeUpdateModal();
                await this.setStockRequests();
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

    updateFormErrors = () => {
        const errors = {};
        const {updateStockRequest} = this.state;
        const options = {abortEarly: false};
        let validate = Joi.validate(updateStockRequest, this.updateValidateSchema, options);

        if (!validate.error) return errors;

        for (const detail of validate.error.details)
            errors[detail.path] = detail.message;
        return errors;
    }

    stockRequestUpdateClick = (event) => {
        const selected = JSON.parse(event.target.value);
        this.setState({
            updateStockRequest: {
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


export default StockRequest;