import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios)
import store from '@/store/index.js'

export const getUserStorage = () => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const sessionUser = JSON.parse(sessionStorage.getItem('user'));
    let user;

    if(localUser == null && sessionUser == null) return null
    localUser !== null ? user = localUser : user = sessionUser
    return user
}

export const setUserStorage = (user) => {
    localStorage.getItem('user') != null ? 
    localStorage.setItem('user',JSON.stringify(user)) : 
    sessionStorage.setItem('user', JSON.stringify(user));
}

export const getDatesInRange = (start, end) => {
    const dates = [];
    const weekend = [];
    const weekdays= [];
    while (start <= end) {
        dates.push(new Date(start));
        start.setDate(start.getDate() + 1);
    }

    dates.forEach((d) => {
        new Date(d).getDay() === 6 || new Date(d).getDay() === 0
        ? weekend.push(d)
        : weekdays.push(d);
    });
    return { weekend, weekdays }
}

export const calculatePrice = (argument) => {
    const {key, weekdaysLth, weekendLth, weekdaysPrice, weekendPrice, fee} = argument 

    switch(key){
        case 'total' :
            return (weekdaysPrice * weekdaysLth) + (weekendPrice * weekendLth) + fee;
        case 'weekdays' :
             return weekdaysPrice * weekdaysLth
        case 'weekend' :
            return weekendPrice * weekendLth
    }
}

export const messagePopUp = (message) => {
    const timestamp = Math.floor(new Date() / 1000)
    store.dispatch('showMessage',{timestamp, message});
    store.dispatch('removeMessage',{timestamp});
}

export const isLoggedFun = async(refresh_token) => {
    const response = await Vue.axios.post('user/is-logged-in', 
        {
            headers : { 'Authorization' : 'Bearer ' + refresh_token },
        }
    )
    return response != undefined ? true : false
}

export const openUserModal = () => {
    store.commit('userModules/USER_MODAL', true);
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');

    const locale = localStorage.getItem('locale')
    const message = {
        'en-US' : 'Please log in',
        'zh-TW' : '請登入帳戶',
        'ja-JP' : 'ログインしてください'
    }

    const timestamp = Math.floor(new Date() / 1000)
    store.dispatch('showMessage',{timestamp, message:message[locale]});
    store.dispatch('removeMessage',{timestamp});
}
