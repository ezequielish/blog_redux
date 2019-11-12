import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner as SpinnerBtn, Row, Col, Button, Form, FormGroup, Label, Input, Badge } from 'reactstrap';
import * as tareasActions from '../../actions/tareasActions';
import { Redirect } from 'react-router-dom'
class Guardar extends Component {

    state = {
        usuarioIdRequired: false,
        tituloTareaRequired: false,
        enviando: false
    }
    componentDidMount() {
		const {
			match: { params: { user_id, tarea_id } },
			tareas,
			cambioUsuario,
            cambioTareaTitulo,
            limpiarForm
        } = this.props;
        
		if (user_id && tarea_id && !!(Object.keys(tareas).length)) {

            const tarea = tareas[user_id][tarea_id];
           
			cambioUsuario(tarea.userId);
			cambioTareaTitulo(tarea.title);
		}else{
            limpiarForm();
        }
	}
    handleSubmit = (event) => {
        event.preventDefault()


        const { usuarioId, 
            tareaTitulo, 
            agregarTarea,
            match: { params: { user_id, tarea_id }} ,
            tareas,
            editar
        } = this.props
        const nuevaTarea = {
            userId: usuarioId,
            title: tareaTitulo,
            completed: false
        }

        if (usuarioId === '') {
            return this.setState({
                usuarioIdRequired: true
            })
            
        }
        if (tareaTitulo === '') {
            return this.setState({
                tituloTareaRequired: true
            })
            
        }
        
        if (user_id && tarea_id) {
			const tarea = tareas[user_id][tarea_id];
			const tarea_editada = {
				...nuevaTarea,
				completed: tarea.completed,
				id: tarea.id
			};
            editar(tarea_editada);
		}else {
            agregarTarea(nuevaTarea);
		}


    }

    handleInputUsuarioId = (event) => {
        if (event.target.value !== '') {
            this.setState({
                usuarioIdRequired: false
            })
        }
        this.props.cambioUsuario(event.target.value);
    }
    handleInputTareaTitle = (event) => {
        if (event.target.value !== '') {
            this.setState({
                tituloTareaRequired: false
            })
        }
        this.props.cambioTareaTitulo(event.target.value);
    }

    loadingBtn = () => {
        const { loadingBtn } = this.props;

        if(loadingBtn){
            return true
        }
        return false
        
    }
    render() {
        
        return (
            <Row>
                {this.props.regresar && <Redirect to='/tareas' />}
                <Col md="3">
                    <Form onSubmit={this.handleSubmit}>
                        <h4 style={{ margin: '25px 0' }}>Agregar Tarea</h4>
                        <FormGroup>
                            <Label for="usuarioId">Usuario ID</Label>
                            {
                                this.state.usuarioIdRequired &&
                                <Badge color="warning">Requerido</Badge>
                            }
                            <Input min="1"
                                type="number"
                                name="usuario"
                                id="usuarioId"
                                value={this.props.usuarioId}
                                onChange={this.handleInputUsuarioId}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="tarea">Tarea</Label>
                            {
                                this.state.tituloTareaRequired &&
                                <Badge color="warning">Requerido</Badge>
                            }
                            <Input
                                type="text"
                                name="tarea"
                                id="tarea"
                                value={this.props.tareaTitulo}
                                onChange={this.handleInputTareaTitle}
                            />
                        </FormGroup>
                        <Button disabled={this.loadingBtn()} color="success">Guardar</Button>
                        {this.loadingBtn() && <SpinnerBtn size="sm" color="primary" />}
                    </Form>
                </Col>
            </Row>

        )
    }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer
export default connect(mapStateToProps, tareasActions)(Guardar)