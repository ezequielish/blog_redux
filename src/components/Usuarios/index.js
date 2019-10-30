
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux'
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import * as traerUsuarios from '../../actions/usuariosActions'
class Usuarios extends Component {


	componentDidMount() {
		this.props.traerUsuarios()
	}
	ponerFilas = () => this.props.usuarios.map((usuario) => (
		<tr key={usuario.id}>
			<td>
				{usuario.name}
			</td>
			<td>
				{usuario.email}
			</td>
			<td>
				{usuario.website}
			</td>
		</tr>
	));

	ponerContenido = () => {
		if (this.props.loading) {
			return <Spinner />;
		}

		if (this.props.error) {
			return <Fatal mensaje={this.props.error} />;
		}

		return (
		
			<div className="margen">
				<Table>
					<thead>
						<tr>
							<th>
								Nombre
						</th>
							<th>
								Correo
						</th>
							<th>
								Enlace
						</th>
						</tr>
					</thead>
					<tbody>
						{this.ponerFilas()}
					</tbody>
				</Table>
			</div>
		)
	};

	

	render() {
		return (
			<div>
				{this.ponerContenido()}
			</div>
		)
	}
}
const mapStateToProps = (reducers) => {
	return reducers.usuariosReducer;
};

export default connect(mapStateToProps, traerUsuarios)(Usuarios);