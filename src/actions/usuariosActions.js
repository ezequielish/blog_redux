
export const traerUsuarios = () => async (dispatch) => {
	try {
		const data = await fetch('https://jsonplaceholder.typicode.com/users')
		const resp = await data.json()
		dispatch({
			type: 'TRAER_USUARIOS',// este seria el type que declaramos en el reducers para enviar el payload
			payload: resp
		})
	} catch (err) {
		console.log(err)
	}
}