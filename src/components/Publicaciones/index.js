import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions'

const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions;
const { traerUsuarios } = usuariosActions;


class Publicaciones extends Component {

   async componentDidMount(){
        if (!this.props.usuariosReducer.usuarios.length) {
			await this.props.traerUsuarios();
        }
        this.props.publicacionesTraerPorUsuario(this.props.match.params.id);
      
    }
    render() {
        console.log(this.props);
        
        return (
            <Fragment>
                <p>{this.props.match.params.id}</p>
            </Fragment>
        )
    }
}
const mapStateToProps = ({publicacionesReducer, usuariosReducer}) =>{
   return{
       publicacionesReducer, 
       usuariosReducer
   }
}

const mapDispatchToProps = {
	traerUsuarios,
	publicacionesTraerPorUsuario
};

export default connect(mapStateToProps,mapDispatchToProps)(Publicaciones)