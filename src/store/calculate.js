
const getDefaultState = () => {
    return {
        range : {},
        room : {}
    }
}

const state = getDefaultState();

const actions = {
    updateRange(context,payload){
        context.commit('RANGE', payload)
    },
    updateRoom(context,payload){
        context.commit('ROOM', payload)
    },
}

const mutations = {
    RANGE(state, payload){
        payload == null ?
        state.range = {} :
        state.range = payload
    },
    ROOM(state, payload){
        state.room = payload
    },
    RESET_STATE (state) {
        Object.assign(state, getDefaultState())
    }
}

const getters = {
    range(state){
        return state.range
    },
    room(state){
        return state.room
    },
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}