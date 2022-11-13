import axios from 'axios'
import { getUserStorage, openUserModal, setUserStorage } from '@/assets/js/functions.js';
import router from '@/router';

axios.defaults.baseURL = 'https://hexhotel.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Request interceptor
axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Response interceptor
axios.interceptors.response.use(
    (response) => response,
    async(error) => {
        switch(error.response.status){
            case 401 : {
                // 1. Refresh token & save new data to storage
                const { refresh_token } = getUserStorage();
                const config = { headers: { Authorization: `Bearer ${ refresh_token }` }};
                const response = await axios.post('user/refresh-token', config);
                if(response === undefined) break;
                
                const user = { 
                    access_token : response.data.access_token, 
                    refresh_token : response.data.refresh_token, 
                    uid : response.data._id, 
                    expired : new Date().getTime() + 1000 * 60 * 60
                };

                setUserStorage(user)
                    
                // 2. Get new access token & retry
                const { access_token } = getUserStorage();
                error.config.headers.Authorization = `Bearer ${ access_token }`
                return await axios(error.config)
            }
            case  403 : {
                openUserModal()
                return router.push({name : 'home'});
            }
        }
    }
);


export default axios;
