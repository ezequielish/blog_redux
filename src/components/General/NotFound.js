import React from 'react';
import NotFoundImg from '../../assets/img/404.svg'
import { Row, Col } from 'reactstrap';
const NotFound = () => (

    <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
            <figure >
                <img alt="Not Found" width='100%' height='100%' src={NotFoundImg} />
            </figure>
        </Col>
    </Row>

)

export default NotFound