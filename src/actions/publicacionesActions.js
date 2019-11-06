
import { ACTUALIZAR, LOADING, ERROR, COM_LOADING, COM_ERROR, COM_ACTUALIZAR } from '../types/publicacionesType';

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
        const nuevas = resp.map((publicacion) => ({
            ...publicacion,
            comentarios: [],
            abierto: false
        }))
        const publicaciones_actualizadas = [
            ...publicaciones,
            nuevas
        ];

        const publicaciones_key = publicaciones_actualizadas.length - 1;


        const usuarios_actualizados = [...usuarios];
        usuarios_actualizados[key] = {
            ...usuarios[key],
            publicaciones_key
        }

        dispatch({
            type: ACTUALIZAR,// este seria el type que declaramos en el reducers para enviar el payload
            payload: publicaciones_actualizadas,
            error: ''
        })
        dispatch({
            type: TRAER_USUARIOS,
            payload: usuarios_actualizados,
            error: ''
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: 'Publicaciones no disponibles.'
        })
    }
};

export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
    const { publicaciones } = getState().publicacionesReducer;
    const seleccionada = publicaciones[pub_key][com_key];

    const actualizada = {
        ...seleccionada,
        abierto: !seleccionada.abierto
    };

    const publicaciones_actualizadas = [...publicaciones];

    publicaciones_actualizadas[pub_key] = [
        ...publicaciones[pub_key]
    ];
    publicaciones_actualizadas[pub_key][com_key] = actualizada;

    dispatch({
        type: ACTUALIZAR,
        payload: publicaciones_actualizadas
    })

}

export const traerComentarios = (pub_key, com_key) => async (dispatch, getState) => {
    const { publicaciones } = getState().publicacionesReducer
    const seleccionada = publicaciones[pub_key][com_key];
    dispatch({
        type: COM_LOADING
    });
    try {
        const data = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`)

        if (data.status === 404 || data.status === 500) {
            return dispatch({
                type: ERROR,
                payload: 'Algo salió mal, intente más tarde.'
            })

        }

        const resp = await data.json();

        const actualizada = {
            ...seleccionada,
            comentarios: resp
        }
        const publicaciones_actualizadas = [...publicaciones];
        
        publicaciones_actualizadas[pub_key][com_key] = actualizada;

        dispatch({
            type: COM_ACTUALIZAR,
            payload: publicaciones_actualizadas
        });
    } catch (error) {
        dispatch({
            type: COM_ERROR,
            payload: 'Comentarios no disponibles.'
        })
    }
}