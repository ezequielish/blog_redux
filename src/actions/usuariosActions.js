import { TRAER_USUARIOS, LOADING, ERROR } from '../types/usuariosType'
export const traerUsuarios = () => async (dispatch) => {
	dispatch({
		type: LOADING
	});
	try {
		const data = await fetch('https://jsonplaceholder.typicode.com/users')
		if(data.status === 404 || data.status === 500){
			return dispatch({
				type: ERROR,
				payload: 'Algo salió mal, intente más tarde.'
			})
			
		}
		const resp = await data.json()
		dispatch({
			type: TRAER_USUARIOS,// este seria el type que declaramos en el reducers para enviar el payload
			payload: resp,
			error: ''
		})
	} catch (err) {
		dispatch({
			type: ERROR,
			payload: 'Algo salió mal, intente más tarde.'
		})
	}
}