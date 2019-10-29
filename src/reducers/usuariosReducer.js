const INITIAL_STATE = {
	usuarios: [] //comenzamos con el estado inicial
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {//compurueba el tipo que viene en el dispatch
		case 'TRAER_USUARIOS':
			return { ...state, usuarios: action.payload };

		default: return state;
	};
};