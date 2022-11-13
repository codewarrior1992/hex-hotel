import axios from 'axios';
export default {
    namespaced: true,
    state: {
        isLogIn : false,
        isUserModal : false,
    },
    actions :{
        async signUp(context, payload){
            const response = await axios.post('user/register', payload );
            return response
        },
        async logIn(context, payload){
            const response = await axios.post('user/log-in', payload );
            return response
        },
        async logOut(context, payload){
            const response = await axios.post('user/log-out',  payload )
            return response
        },
    },
    mutations :{
        LOGIN_STATUS(state, payload){
            state.isLogIn = payload
        },
        USER_MODAL(state, payload){
            state.isUserModal = payload
        },
    },
    getters : {
        isLogIn(state){
            return state.isLogIn
        },
        isUserModal(state){
            return state.isUserModal
        },
    }
}