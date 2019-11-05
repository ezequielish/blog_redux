
import { TRAER_PUBLICACION_POR_USUARIO, LOADING ,ERROR } from '../types/publicacionesType';

import { TRAER_USUARIOS } from '../types/usuariosType'

// export const traerPublicaciones = () => async (dispatch) => {
//     try {
//         const data = await fetch('https://jsonplaceholder.typicode.com/posts')
//         if (data.status === 404 || data.status === 500) {
//             return dispatch({
//                 type: ERROR,
//                 payload: 'Algo salió mal, intente más tarde.'
//             })

//         }
//         const resp = await data.json()
//         dispatch({
//             type: TRAER_PUBLICACIONES,// este seria el type que declaramos en el reducers para enviar el payload
//             payload: resp,
//             error: ''
//         })
//     } catch (err) {
//         dispatch({
//             type: ERROR,
//             payload: 'Algo salió mal, intente más tarde.'
//         })
//     }
// }

export const traerPorUsuario = (key) => async (dispatch, getState) => {
    const { usuarios } = getState().usuariosReducer;
    const { publicaciones } = getState().publicacionesReducer;
    const usuario_id = usuarios[key].id;

    dispatch({
		type: LOADING
	});
    try {

        const data = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)
        if (data.status === 404 || data.status === 500) {
            return dispatch({
                type: ERROR,
                payload: 'Algo salió mal, intente más tarde.'
            })

        }

        const resp = await data.json()
        const publicaciones_actualizadas = [
            ...publicaciones,
            resp
        ];

        const publicaciones_key = publicaciones_actualizadas.length - 1;

       
        const usuarios_actualizados = [...usuarios];
        usuarios_actualizados[key] = {
            ...usuarios[key],
            publicaciones_key
        }

        dispatch({
            type: TRAER_PUBLICACION_POR_USUARIO,// este seria el type que declaramos en el reducers para enviar el payload
            payload: publicaciones_actualizadas,
            error: ''
        })
        dispatch({
            type: TRAER_USUARIOS,
            payload: usuarios_actualizados,
            error: ''
        });
    }catch(error){
        dispatch({
			type: ERROR,
			payload: 'Publicaciones no disponibles.'
		})
    }
};