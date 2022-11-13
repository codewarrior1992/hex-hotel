<template>
    <div class="container">
        <!-- Content -->
        <div class="row">
                <div class="book-done">
                    <h1>{{ $t('reserve.success')}}</h1>
                    <ul>
                        <li class="guest">
                            <div class="item">
                                <strong>{{ $t('reserve.guest') }}</strong>
                                <span v-if="newOrder.room">{{ newOrder.room.title[locale] }}</span>
                            </div>
                            <div class="item">
                                <strong>{{ $t('reserve.phone') }}</strong>
                                <span v-if="newOrder.guest">{{ newOrder.guest.phone }}</span>
                            </div>
                        </li>
                        <li class="room">
                            <div class="item">
                                <strong>{{ $t('reserve.room') }}</strong>
                                <span v-if="newOrder.room">{{ newOrder.room.title[locale] }} x {{ day }}  {{ $t('reserve.night')}}</span>
                            </div>
                        </li>
                        <li class="total">
                            <div class="item">
                                <strong>{{ $t('reserve.total') }}</strong>
                                <i18n-n v-if="newOrder.total" :value="newOrder.total[locale]" format="currency" :locale="$i18n.locale"></i18n-n>
                            </div>
                        </li>
                        <li class="time">
                            <div class="item">
                                <strong>{{ $t('reserve.in') }}</strong>
                                <span v-if="newOrder.range">{{ new Date(newOrder.range.start).toLocaleDateString() }}</span>
                            </div>
                            <div class="item">
                                <strong>{{ $t('reserve.out') }}</strong>
                                <span v-if="newOrder.range">{{ new Date(newOrder.range.end).toLocaleDateString() }}</span>
                            </div>
                        </li>
                    </ul>
                    <div class="link-group">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-12">
                                <router-link to="/admin" class="edit">{{ $t('reserve.edit') }}</router-link>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-12">
                                <router-link to="/" class="home">{{ $t('reserve.home') }}</router-link>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
import { getUserStorage, messagePopUp } from '@/assets/js/functions.js'

export default {
    props:{
        order :{
            type : Object,
            default : () => {}
        }
    },
    data(){
        return{
            rawOrder : {},
            newOrder : {},
            isLoading : false,
            counter : 0
        }
    },
    watch:{
        rawOrder:{
            handler(val){
                if(!val) return
                this.newOrder = {...this.rawOrder}
            },
            deep: true
        }
    },
    methods:{
        async orderGet(uid, oid , access_token, message){
            // 1. Fetch
            this.$store.dispatch('updateLoading',true);
            const config = { 
                headers : { 'Authorization' : 'Bearer ' + access_token },
                params : { uid , oid }
            }
            const response = await this.$store.dispatch('orderModules/getOrder',  config);

            // 02. UI
            this.rawOrder = response.data.order;
            this.$store.dispatch('updateLoading',false);

            // 03. Message
            messagePopUp(message[this.locale])
        },
    },
    computed:{
        day(){
            const start = new Date(this.newOrder.range.start).getTime();
            const end = new Date(this.newOrder.range.end).getTime();

            const day = (end - start) / 1000 / 60 /60 / 24 ;
            return  day
        },
        locale(){
            return this.$i18n.locale
        }
    },
    async created(){
        // 1. Route
        if(!sessionStorage.getItem('order')) this.$router.push({name:'home'});

        // 2. Get Data From Storage
        let data;
        this.order != undefined ? 
        data = this.order : 
        data = JSON.parse(sessionStorage.getItem('order'));

        const { oid, message } = data;
        const { access_token, uid } = getUserStorage();

        // 3. Fetch
        this.orderGet(uid, oid , access_token, message);
        
        this.$store.dispatch('updateLoading',true);
        this.counter = setTimeout(()=>{ this.$store.dispatch('updateLoading',false); },600)
    },
    beforeDestroy(){
        sessionStorage.removeItem('order');
        clearTimeout(this.counter)
    }
}
</script>
