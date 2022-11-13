<template>
    <div class="book-payment">
        <!-- Content -->
        <h1>{{$t('reserve.paymentTitle')}}</h1> 

        <div class="row gy-4">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <label for="cash" :class="{ active : selected == 'cash'}" @click="selected = 'cash'">
                    <input type="radio" name="payment" id="cash" value="cash" v-model="selected"/>
                    <strong class="radio"></strong>
                    <span class="text">{{$t('reserve.cash')}}</span>
                    <span class="material-symbols-outlined">
                        payments
                    </span>
                </label>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12">
                <label for="credit" 
                class="unchecked">
                    <input type="radio" 
                    name="payment" id="credit" 
                    value="credit" 
                    v-model="selected"
                    disabled/>
                    <strong class="radio"></strong>
                    <span class="text">{{$t('reserve.credit')}}</span>
                    <span class="material-symbols-outlined">
                        credit_card
                    </span>
                </label>
            </div>
        </div>
        
        <button type="button" class="next" @click.prevent="orderGenerate">
            {{$t('reserve.booking')}}
        </button>
    </div>
</template>

<script>
import { getUserStorage } from '@/assets/js/functions.js'
export default {
    props:{
        booking :{
            type : Object,
            default : () => null
        }
    },
    data(){
        return{
            isLoading : false,
            inputFocus:'',
            locks:{
                number:true,
                cvc:false,
            },
            owner: '',
            credit: '',
            expired: '',
            code:'',
            selected : 'cash',
            counter:0
        }
    },
    methods:{
        getData(){
            const { uid , access_token } = getUserStorage();

            let data;
            this.booking != undefined ? 
            data = this.booking : 
            data = JSON.parse(sessionStorage.getItem('booking'));

            return { uid , access_token , data }
        },
        async orderGenerate(){
            // 1. Fetch
            const { uid , access_token , data } = this.getData();
            const bookingData = {
                uid, 
                guest : {
                    name : data.name,
                    phone : data.phone,
                },
                reserve : {
                    rid : data.room._id,
                    range : data.range
                }
            }
            const config = { 
                headers : { 'Authorization' : `Bearer ${ access_token }`} 
            }
            const response = await this.$store.dispatch('orderModules/createOrder', {bookingData, config})

            // 2. Pass Data
            if(response.data.success){
                const order = {
                    oid : response.data.oid , 
                    message : response.data.message
                }
                sessionStorage.removeItem('booking');
                sessionStorage.setItem('order',JSON.stringify(order))
    
                this.$router.push({
                    name : 'done',
                    params : { order }
                })
            }          
        }
    },
    created(){
        if(!sessionStorage.getItem('booking') || this.booking == null) 
        return this.$router.push({name:'home'})
        this.$store.dispatch('updateLoading',true);
        this.counter = setTimeout(()=>{ this.$store.dispatch('updateLoading',false); },600)
    },
    beforeDestroy(){
        clearTimeout(this.counter)
    }
}
</script>
