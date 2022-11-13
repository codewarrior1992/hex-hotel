<template>
    <div class="reserve-page">
        <!-- Loading -->
        <Loading-effect :active.sync="isLoading">
            <div class="loadingio-spinner-spinner-6hzyekklbs">
            <div class="ldio-t40shzjf6m9">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
        </Loading-effect>

        <!-- RoomNav -->
        <ReserveNav />

        <!-- Reserve Page -->
        <div class="container">
            <ul class="process">
                <li :class="{active : reserve.main}">{{$t('reserve.info')}}</li>
                <li :class="{active : reserve.payment}">{{$t('reserve.payment')}}</li>
                <li :class="{active : reserve.done}">{{$t('reserve.reserved')}}</li>
            </ul>
            <div class="content">
                <div class="row">
                    <div class="col-xl-7 col-lg-7 col-md-12 mx-auto">
                        <router-view></router-view>
                    </div>
                    <div class="col-xl-5 col-lg-5 col-md-12" v-if="$route.name != 'done'">
                        <ul class="room-info" v-if="Object.values(room).length > 0 && Object.values(range).length > 0">
                            <li class="image">
                                <img :src="room.images[0]" alt="" >
                            </li>    
                            <li class="title">
                                <h2>{{ title }}</h2>
                            </li>              
                            <li class="in">
                                <span class="material-icons"> date_range </span>
                                <span>{{$t('reserve.in')}}</span>
                                <span>{{new Date(range.start).toLocaleDateString()}}</span>
                            </li>  
                            <li class="out">
                                <span class="material-icons"> date_range </span>
                                <span>{{$t('reserve.out')}}</span>
                                <span>{{new Date(range.end).toLocaleDateString()}}</span>
                            </li>  
                            <li class="price">
                                <ul>
                                    <li v-if="weekdays != 0">
                                        <span>
                                            <i18n-n :value="weekdaysPrice" format="currency" :locale="locale"></i18n-n>
                                            x {{ weekdays.length }} {{$t('reserve.night')}}
                                        </span>
                                        <span>
                                            <i18n-n :value="calculate('weekdays')" 
                                            format="currency" :locale="$i18n.locale"></i18n-n>
                                        </span>
                                    </li>
                                    <li v-if="weekend != 0">
                                        <span> 
                                            <i18n-n :value="weekendPrice" format="currency" :locale="locale"></i18n-n>
                                            x {{ weekend.length }} {{$t('reserve.night')}}
                                        </span>
                                        <span>
                                            <i18n-n :value="calculate('weekend')" 
                                            format="currency" :locale="locale"></i18n-n>
                                        </span>
                                    </li>
                                    <li>
                                        <span>{{$t('reserve.fee')}}</span>
                                        <i18n-n :value="fee" format="currency" :locale="$i18n.locale"></i18n-n>
                                    </li>
                                </ul>
                                <div class="total">
                                    <span>{{$t('reserve.total')}}</span>
                                    <i18n-n v-if="room" 
                                    :value="calculate('total')" format="currency" :locale="locale"></i18n-n>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- FooterMap -->
        <FooterMap/>
    </div>
</template>

<script>
import ReserveNav from '@/components/RoomNav.vue';
import FooterMap from '@/components/FooterMap.vue';
import { getDatesInRange, calculatePrice } from '@/assets/js/functions.js';
import { mapGetters } from 'vuex';
export default {
    components:{
        ReserveNav,
        FooterMap
    },
    data(){
        return {
            room :{},
            range : {},
            reserve:{
                main:false,
                payment:false,
                done:false,
            },  
            weekdays: [],
            weekend: [],
        }
    },
    computed:{
        ...mapGetters(['isLoading']),
        locale(){ return this.$i18n.locale },
        fee(){ return this.room.fee[this.$i18n.locale] },
        title(){ return this.room.title[this.$i18n.locale]},
        weekdaysPrice(){ return this.room.weekdaysPrice[this.$i18n.locale] },
        weekendPrice(){ return this.room.weekendPrice[this.$i18n.locale]},
    },
    watch:{
        '$route.path':{
            handler: function(route) {
                switch (route) {
                    case '/reserve/':
                        this.reserve.main = true;
                        break;
                    case '/reserve/payment':
                        this.reserve.main = true;
                        this.reserve.payment = true;
                        break;
                    case '/reserve/done':
                        this.reserve.main = true;
                        this.reserve.payment = true;
                        this.reserve.done = true;
                        break;
                    default:
                        break;
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods:{
        calculate(key){
            const args = {
                key,
                weekdaysPrice : this.weekdaysPrice,
                weekendPrice : this.weekendPrice,
                weekdaysLth : this.weekdays.length,
                weekendLth : this.weekend.length,
                fee : this.fee,
            }
            return calculatePrice(args)
        }, 
    },
    created(){
        if(!sessionStorage.getItem('booking')) return this.$router.push({name:'home'});

        this.$store.dispatch('updateLoading', true);

        const { room , range } = JSON.parse(sessionStorage.getItem('booking'));
        this.room = room;
        this.range = range; 

        const {weekend, weekdays} = getDatesInRange( new Date(range.start), new Date(range.end) );  
        this.weekdays = weekdays;
        this.weekend = weekend;

        this.$store.dispatch('updateLoading', false);
    },
}
</script>

<style>

</style>