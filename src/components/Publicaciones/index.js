import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions'
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Comentarios from './Comentarios'
const { traerPorUsuario: publicacionesTraerPorUsuario,abrirCerrar,traerComentarios } = publicacionesActions;
const { traerUsuarios } = usuariosActions;


class Publicaciones extends Component {

    async componentDidMount() {
        const {
            traerUsuarios,
            match: { params: { id } },
            publicacionesTraerPorUsuario
        } = this.props;

        if (!this.props.usuariosReducer.usuarios.length) {
            await traerUsuarios();
        }
        if (this.props.usuariosReducer.error) {
            return;
        }


        if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[id])) {
            await publicacionesTraerPorUsuario(id);
        }
    }

    ponerUsuario = () => {
        const {
            match: { params: { id } },
            usuariosReducer
        } = this.props;

        if (usuariosReducer.error) {
            return <Fatal mensaje={usuariosReducer.error} />;
        }
        if (!usuariosReducer.usuarios.length || usuariosReducer.cargando) {

            return <Spinner />
        }

        const nombre = usuariosReducer.usuarios[id].name;

        return (
            <h3>
                Publicaciones de {nombre}
            </h3>
        );
    };

    ponerPublicaciones = () => {
        const {
            usuariosReducer,
            usuariosReducer: { usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: { params: { id } }
        } = this.props;

        if (!usuarios.length) return;
        if (usuariosReducer.error) return;
        if (publicacionesReducer.loading) {
            return <Spinner />;
        }
        if (publicacionesReducer.error) {
            return <Fatal mensaje={publicacionesReducer.error} />
        }

        if (!publicaciones.length) return;


        if (!('publicaciones_key' in usuarios[id])) return;
        const { publicaciones_key } = usuarios[id];
        return this.mostrarInfo(
            publicaciones[publicaciones_key],
            publicaciones_key
        )
    }

    mostrarInfo = (publicaciones,publicaciones_key) =>(
        publicaciones.map((publicacion,comment_key) => (
            <ListGroup
                key={publicacion.id}
                onClick={() => this.mostrarComentarios(publicaciones_key,comment_key,publicacion.comentarios)}
            >
                <ListGroupItem>
                    <h4>
                        {publicacion.title}
                    </h4>
                    <p>
                        {publicacion.body}
                    </p>
                    { (publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios} /> : '' }
                </ListGroupItem>
            </ListGroup>
        ))
    )
    
    mostrarComentarios = (pub_key, com_key, comentarios) => {
		this.props.abrirCerrar(pub_key, com_key)
		if (!comentarios.length) {
			this.props.traerComentarios(pub_key, com_key)
		}
	};
    render() {
         
        return (
            <Fragment>
                {this.ponerUsuario()}
                {this.ponerPublicaciones()}
            </Fragment>
        )
    }
}

const mapStateToProps = ({ publicacionesReducer, usuariosReducer }) => {
    return {
        publicacionesReducer,
        usuariosReducer
    }
}

const mapDispatchToProps = {
    traerUsuarios,
    publicacionesTraerPorUsuario,
    abrirCerrar,
	traerComentarios
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)