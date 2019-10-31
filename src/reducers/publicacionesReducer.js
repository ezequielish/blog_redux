import { TRAER_PUBLICACIONES } from '../types/publicacionesType';

const INITIAL_STATE = {
	publicaciones: [],
	loading: false,
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TRAER_PUBLICACIONES:
			return { ...state, publicaciones: action.payload };

		default: return state;
	};
};
