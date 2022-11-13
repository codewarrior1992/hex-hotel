import axios from 'axios';

export default {
    namespaced: true,
    state: {
        range: {},
        originalOrders:[],
        rawOrders : [],
        filteredOrders:[],
        newOrders:[],
        modalData : {},
        isUpdateModal: false,
        isDeleteModal: false,
    },
    actions :{
        async createOrder(context,payload){
            try {
                const { bookingData, config } = payload
                const response = await axios.post('order/create', bookingData, config );
                return response
            } catch (err){
                return err
            }
        },
        async getOrders(context, payload){
            try{
                const response = await axios.get('order/all', payload);
                context.commit('ORDERS', response.data.orders)
                return response
            } catch(err){
                return err
            }
        },
        async getOrder(context, payload){
            try{
                const response = await axios.get('order/item', payload );
                return response
            } catch(err){
                return err
            }
        },
        async updateOrder(context, payload){
            try{
                const {data, config} = payload;
                const response = await axios.patch('order/update', data, config );
                return response
            } catch (err) {
                return err
            }
        },
        async deleteOrder(context, payload){
            try{
                const {data, config} = payload
                const response = await axios.post('order/delete', data, config );
                return response
            } catch (err){
                return err
            }
        },
    },
    mutations :{
        ORDERS(state,payload){
            state.originalOrders = payload
        },
        CLASSIFY(state,payload){
            const { tab, isFinding } = payload;
            const now = Date.now();

            let arr = [];
            isFinding == false ? arr = state.originalOrders : arr = state.filteredOrders

            let future = [...arr].filter((order)=> now < new Date(order.range.start ).getTime())
            let before = [...arr].filter((order) => now >= new Date(order.range.start).getTime())
            let all = [...arr];

            switch(tab){
                case true : 
                    state.rawOrders = future
                break;
                case false : 
                    state.rawOrders = before
                break;
                case null : 
                    state.rawOrders = all
                break;
            }
        },
        SET_ORDERS(state,payload){
            state.newOrders = payload
        },
        SET_FILTERED_ORDERS(state,payload){
            state.filteredOrders = payload
        },
        FILTER(state,payload){
            const { isNum , value, locale } = payload;
            isNum == 0 ? 
            state.filteredOrders = [...state.originalOrders]
            .filter((item) => item.oid === Number(value)) :
            state.filteredOrders = [...state.originalOrders]
            .filter((item) => item.room.title[locale]
            .toLocaleLowerCase().includes(value.toLocaleLowerCase())) 
        },
        SET_RANGE(state,payload){
            state.range = payload
        },
        UPDATE_MODAL(state, payload){
            const { order, room, isUpdateModal } = payload;
            state.isUpdateModal = isUpdateModal;
            state.modalData = { order, room }
        },
        DELETE_MODAL(state, payload){
            const { uid, oid, isDeleteModal } = payload;
            state.isDeleteModal = isDeleteModal;
            state.modalData = { uid, oid }
        },
        CLOSE_MODAL(state, payload){
            state.isDeleteModal = payload;
            state.isUpdateModal = payload;

        }
    },
    getters : {
        originalOrders(state){
            return state.originalOrders
        },
        rawOrders(state){
            return state.rawOrders
        },
        newOrders(state){
            return state.rawOrders
        },
        filteredOrders(state){
            return state.filteredOrders
        },
        range(state){
            return state.range
        },
        modalData(state){
            return state.modalData
        },
        isUpdateModal(state){
            return state.isUpdateModal
        },
        isDeleteModal(state){
            return state.isDeleteModal
        },
    }
}