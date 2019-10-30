import React from 'react';
// import NotFound from '../../assets/img/404.svg'
import error from '../../assets/img/error-24px.svg'
import {  Row, Col } from 'reactstrap';
const Fatal = (props) => (

	<Row>
		<Col className="text-right" xs="8"><p>{props.mensaje}</p></Col>
		<Col xs="1"><img alt="icon-error" src={error} /></Col>
	</Row>

);

export default Fatal;
