
import axios from 'axios';
export default {
    namespaced: true,
    state: {
		rooms : [],
        room : {}
    },
    actions: {
        async getRooms(context){
            const response = await axios.get('room/all')
            context.commit('ROOMS', response.data.rooms)
        },
        async getRoom(context, id){
            const response = await axios.get(`room/${id}`)
            context.commit('ROOM', response.data.room)
            return response
        }
    },
    mutations: {
		ROOMS(state,payload){
            state.rooms = payload
        },
        ROOM(state,payload){
            state.room = payload
        }	
    }, 
    getters : {
        rooms(state){ return state.rooms },
        room(state){ return state.room }
    }
}