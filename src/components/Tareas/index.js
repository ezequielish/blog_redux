import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'
import * as tareasActions from '../../actions/tareasActions';
import { Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
class Tareas extends Component {
	componentDidMount() {
		
		if (!Object.keys(this.props.tareas).length) {
			this.props.traerTodas();
		}

	}
	componentDidUpdate() {
		const { tareas, loading, traerTodas } = this.props;
		
		
		if (!Object.keys(tareas).length && !loading){
			traerTodas();
		}
		 
	}


	mostrarContenido = () => {
		const { tareas, loading, error } = this.props
		if (loading) {
			return <Spinner />
		}

		if (error) {
			return <Fatal mensaje={error} />
		}

		return Object.keys(tareas).map(usu_id => (
			<Row key={usu_id}>
				<h4>Usuario {usu_id}</h4>
				{this.mostrarTareas(usu_id)}
			</Row>
		))
	}
	mostrarTareas = (usu_id) => {
		const { tareas, cambioCheck, elimiarTarea } = this.props;
		const por_usuario = {
			...tareas[usu_id]
		}

		return Object.keys(por_usuario).map((tar_id) => (
			<Col md="12" key={tar_id} style={{ padding: '5px' }}>
				<input type='checkbox'
					onChange={() => cambioCheck(usu_id, tar_id)}
					defaultChecked={por_usuario[tar_id].completed}
				/>
				{por_usuario[tar_id].title}
				<Link to={`/tareas/guardar/${usu_id}/${tar_id}`}>
					<Button color="info" size="sm" style={{ marginLeft: '25px' }}>Editar</Button>
				</Link>
				<Button onClick={() => elimiarTarea(tar_id)} color="danger" size="sm" style={{ marginLeft: '25px' }}>Eliminar</Button>
			</Col>
		));

	}
	render() {
		// console.log(this.props.tareas);
		return (
			<Fragment>
				<Link to="tareas/guardar">
					<Button outline color="primary" style={{ margin: '25px 0' }}>Agregar tarea</Button>
				</Link>
				{this.mostrarContenido()}
			</Fragment>
		)
	}
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);