
import { TRAER_PUBLICACIONES, ERROR } from '../types/publicacionesType';
export const traerPublicaciones = () => async (dispatch) => {
    try {
        const data = await fetch('https://jsonplaceholder.typicode.com/posts')
        if (data.status === 404 || data.status === 500) {
            return dispatch({
                type: ERROR,
                payload: 'Algo salió mal, intente más tarde.'
            })

        }
        const resp = await data.json()
        dispatch({
            type: TRAER_PUBLICACIONES,// este seria el type que declaramos en el reducers para enviar el payload
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

export const traerPorUsuario = (key) => async (dispatch, getState) => {
    const { usuarios } = getState().usuariosReducer;
    const usuario_id = usuarios[key].id;
    try {

        const data = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)
        if (data.status === 404 || data.status === 500) {
            return dispatch({
                type: ERROR,
                payload: 'Algo salió mal, intente más tarde.'
            })

        }
        const resp = await data.json()
        dispatch({
            type: TRAER_PUBLICACIONES,// este seria el type que declaramos en el reducers para enviar el payload
            payload: resp,
            error: ''
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Algo salió mal, intente más tarde.'
        })
    }
};