/*!

=========================================================
* Now UI Dashboard React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components

// core components

import {Modal, Button} from "react-bootstrap";
import {Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Row} from "reactstrap";

class RegularTables extends React.Component {
    state = {
        isOpen: false
    };

    openModal = () => this.setState({isOpen: true});
    closeModal = () => this.setState({isOpen: false});

    render() {
        return (
            <React.Fragment>
                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{height: "100vh"}}
                >
                    <Button variant="primary" onClick={this.openModal}>
                        Launch demo modal
                    </Button>
                </div>
                <Modal show={this.state.isOpen} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <div className="container">

                            <Form>
                                <Row>
                                    <Col className="pr-1" md="12">
                                        <FormGroup>
                                            <label>Company (disabled)</label>
                                            <Input
                                                defaultValue="Creative Code Inc."
                                                disabled
                                                placeholder="Company"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="pr-1" md="12">
                                        <FormGroup>
                                            <label>Username</label>
                                            <Input
                                                defaultValue="michael23"
                                                placeholder="Username"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col className="pr-1" md="12">
                                        <FormGroup>
                                            <label htmlFor="exampleInputEmail1">
                                                Email address
                                            </label>
                                            <Input placeholder="Email" type="email" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

export default RegularTables;
