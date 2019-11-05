import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions'
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions;
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
            <h1>
                Publicaciones de {nombre}
            </h1>
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
        return publicaciones[publicaciones_key].map(publicacion => (
            <div
                key={publicacion.id}

            >
                <h2>
                    {publicacion.title}
                </h2>
                <h3>
                    {publicacion.body}
                </h3>
            </div>
        ))


    }
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
    publicacionesTraerPorUsuario
};

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)