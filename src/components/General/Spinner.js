import React from 'react';
import {  Row, Col } from 'reactstrap';
import { Spinner as MySpinner } from 'reactstrap';
const Spinner = () => (
    <Row>
        <Col className="text-center">
            <MySpinner type="grow" color="primary" />
            <MySpinner type="grow" color="primary" />
            <MySpinner type="grow" color="primary" />
        </Col>
    </Row>
);

export default Spinner;