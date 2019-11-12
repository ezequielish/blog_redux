import { TRAER_TAREAS, LOADING, ERROR, CAMBIO_USUARIO_ID, TAREA_TITULO, GUARDADA, LOADING_BTN, ACTUALIZAR, LIMPIAR } from '../types/tareasType';

const INITIAL_STATE = {
	tareas: [], //comenzamos con el estado inicial
	loading: false,
	error: '',
	usuarioId: '',
	tareaTitulo: '',
	regresar: false,
	loadingBtn: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {//compurueba el tipo que viene en el dispatch
		case TRAER_TAREAS:
			return {
				...state,
				tareas: action.payload,
				loading: false, 
				error: '',
				regresar: false
			};

		case LOADING:
			return { ...state, loading: true }

		case ERROR:
			return { ...state, error: action.payload, loading: false }

		case CAMBIO_USUARIO_ID:
			return { ...state, usuarioId: action.payload }

		case TAREA_TITULO:
			return { ...state, tareaTitulo: action.payload }

		case LOADING_BTN:
			return { ...state, loadingBtn: true }
		case GUARDADA:
			return {
				...state,
				tareas: {},
				loadingBtn: false,
				error: '',
				usuarioId: '',
				tareaTitulo: '',
				regresar: true
			}

		case ACTUALIZAR:
			return {
				...state, tareas: action.payload
			}
		case LIMPIAR: 
			return{
				...state,usuarioId: '',tareaTitulo: ''
			}	
		default: return state;
	};
};