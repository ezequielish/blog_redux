import { TRAER_USUARIOS, LOADING, ERROR } from '../type/usuariosType'

const INITIAL_STATE = {
	usuarios: [], //comenzamos con el estado inicial
	loading: false,
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {//compurueba el tipo que viene en el dispatch
		case TRAER_USUARIOS:
			return { ...state, usuarios: action.payload, loading: false, error: ''};

		case LOADING:
			return { ...state, loading: true }

		case  ERROR:
			return {...state, error: action.payload, loading: false }

		
		default: return state;
	};
};