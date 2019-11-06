import React from 'react';
import { connect } from 'react-redux'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'

const Comentarios = (props) => {
    if (props.com_error) {
        return <Fatal mensaje={props.com_error} />
    }
    if (props.com_loading && !props.comentarios.length) {
        return <Spinner />
    }

    const ponerComentarios = () => (
        props.comentarios.map((comentario, key) => (
            <li key={key}>
                <b>
                    {comentario.email}
                </b>
                <p>
                    {comentario.body}
                </p>

            </li>
        ))
    )
    return (
        <ul>
            {ponerComentarios()}
        </ul>
    )

}

const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer
export default connect(mapStateToProps)(Comentarios)