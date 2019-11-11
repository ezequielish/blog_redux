
import { TRAER_TAREAS, LOADING, ERROR, CAMBIO_USUARIO_ID, TAREA_TITULO, GUARDADA, LOADING_BTN, ACTUALIZAR } from '../types/tareasType';

export const traerTodas = () => async (dispatch) => {
	dispatch({
		type: LOADING
	});

	try {
		const data = await fetch('https://jsonplaceholder.typicode.com/todos');
		if (data.status === 404 || data.status === 500) {
			return dispatch({
				type: ERROR,
				payload: 'Algo salió mal, intente más tarde.'
			})

		}
		const resp = await data.json()
		// console.log(resp);

		const tareas = {};
		resp.map((tar) => (
			tareas[tar.userId] = {
				...tareas[tar.userId],
				[tar.id]: {
					...tar
				}
			}
		));

		dispatch({
			type: TRAER_TAREAS,
			payload: tareas
		})
	}
	catch (error) {
		dispatch({
			type: ERROR,
			payload: 'Tareas no disponible.'
		})
	}
};

export const cambioUsuario = (value) => (dispatch) => {
	dispatch({
		type: CAMBIO_USUARIO_ID,
		payload: value
	})

}

export const cambioTareaTitulo = (value) => (dispatch) => {
	dispatch({
		type: TAREA_TITULO,
		payload: value
	})
}

export const agregarTarea = (nuevaTarea) => async (dispatch) => {
	dispatch({
		type: LOADING_BTN
	});


	try {
		const data = await fetch('https://jsonplaceholder.typicode.com/todos',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(nuevaTarea)
			}
		);
		if (data.status === 404 || data.status === 500) {
			return dispatch({
				type: ERROR,
				payload: 'Algo salió mal, intente más tarde.'
			})

		}
		// const resp = await data.json()

		dispatch({
			type: GUARDADA
		});

	} catch (error) {
		dispatch({
			type: ERROR,
			payload: 'Error al agregar tareas'
		})
	}

}

export const editar = (tarea_editada) => async (dispatch) => {
	dispatch({
		type: LOADING_BTN
	});


	try {
		const data = await fetch(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(tarea_editada)
			}
		);
		if (data.status === 404 || data.status === 500) {
			return dispatch({
				type: ERROR,
				payload: 'Algo salió mal, intente más tarde.'
			})

		}
		// const resp = await data.json()

		dispatch({
			type: GUARDADA
		});

	} catch (error) {
		dispatch({
			type: ERROR,
			payload: 'Error al agregar tareas'
		})
	}

};

export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
	const { tareas } = getState().tareasReducer;
	const seleccionada = tareas[usu_id][tar_id];

	const actualizadas = {
		...tareas
	};
	actualizadas[usu_id] = {
		...tareas[usu_id]
	};
	actualizadas[usu_id][tar_id] = {
		...tareas[usu_id][tar_id],
		completed: !seleccionada.completed
	}

	dispatch({
		type: ACTUALIZAR,
		payload: actualizadas
	})
};

export const elimiarTarea = (tar_id) => async (dispatch) => {
	dispatch({
		type: LOADING
	})
}