<template>
    <div class="admin-modal" 
    :class="{isUpdateModal : isUpdateModal, isDeleteModal : isDeleteModal}" 
    @click.self="closeModal">
        <!-- Update modal -->
        <div class="update-modal">
            <div class="header">
                <h1 class="modal-title fw-bold" v-if="room">{{ room.title[locale]}}</h1>
                <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="body">
                <DatePicker
                    class="rounded-0"
                    v-model="range"
                    is-range
                    is-expanded
                    :locale="{ id: locale, firstDayOfWeek: 2, masks: { weekdays: 'W' } }"
                    :attributes="attributes"
                    :select-attribute="selectDragAttribute"
                    :drag-attribute="selectDragAttribute"
                    :disabled-dates="[{ ordinalWeekdays: { [-1]: 5 } }]"
                    :min-date="new Date()"
                    :max-date="new Date().setDate(new Date().getDate() + 30)"
                />
                <ul class="expense">
                    <li class="item" v-if="weekdays.length > 0">
                        <span>
                            <i18n-n v-if="room !== undefined" :value="weekdaysPrice" format="currency" :locale="locale"></i18n-n>
                            x {{ weekdays.length }} {{$t('calendar.night')}}
                        </span>
                        <i18n-n v-if="room !== undefined" :value="calculate('weekdays')" format="currency" :locale="locale"></i18n-n>
                    </li>
                    <li class="item" v-if="weekend.length > 0">
                        <span>
                            <i18n-n v-if="room !== undefined" :value="weekendPrice" format="currency" :locale="locale"></i18n-n>
                            x {{ weekend.length }} {{$t('calendar.night')}}
                        </span>
                        <i18n-n v-if="room !== undefined" :value="calculate('weekend')" format="currency" :locale="locale"></i18n-n>
                    </li>
                    <li class="item">
                        <span>{{$t('calendar.fee')}}</span> 
                        <i18n-n v-if="room" :value="room.fee[locale]" format="currency" :locale="locale"></i18n-n>
                    </li>
                    <li class="total">
                        <span>{{$t('calendar.total')}}</span>
                            <i18n-n v-if="room !== undefined" :value="calculate('total')" format="currency" :locale="locale"></i18n-n>
                        </li>
                </ul>
            </div>
            <div class="footer">
                <a class="update-btn" @click.prevent="updateOrder">{{ $t('admin.update') }}</a>
            </div>
        </div>

        <!-- Delete modal -->
        <div class="delete-modal">
            <div class="header">
                <h1 class="fw-bold">{{ $t('admin.confirm') }}</h1>
                <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="footer">
                <button type="button" class="delete-btn"
                @click.prevent="deleteOrder">{{ $t('admin.delete') }}</button>
            </div>
        </div> 
    </div>
</template>
<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import { getUserStorage, getDatesInRange, calculatePrice, messagePopUp } from '@/assets/js/functions.js'
import { mapGetters } from 'vuex';
export default {
    components:{
        DatePicker
    },
    data(){
        return {
            attributes: [
                {
                key: 'today',
                highlight: {
                    fillMode: 'outline',
                    style: {
                    background: '#EA5B5B',
                    border: '#2D3643',
                    },
                    contentStyle: {
                    color: '#fff',
                    },
                    contentClass: '',
                },
                dates: new Date(),
                },
            ],
            selectDragAttribute: {
                highlight: {
                start: {
                    style: {
                    backgroundColor: '#569DC3',
                    },
                    contentStyle: {
                    color: '#ffffff',
                    },
                },
                base: {
                    style: {
                    backgroundColor: '#E3E6E9',
                    },
                    contentStyle: {
                    color: '#748290',
                    },
                },
                end: {
                    style: {
                    backgroundColor: '#569DC3',
                    },
                    contentStyle: {
                    color: '#ffffff',
                    },
                },
                order: 10,
                },
            },
            isShow:false,
            weekdays: [],
            weekend: [],
            value:'',
        }
    },
    computed:{
        ...mapGetters('orderModules',['modalData','isUpdateModal','isDeleteModal']),
        range:{
            get(){  return this.$store.state.orderModules.range  },
            set(val){ this.$store.commit('orderModules/SET_RANGE', val) }
        },
        locale(){ return this.$i18n.locale },
        room(){ return this.modalData.room },
        order(){  return this.modalData.order },
        fee(){ return this.room.fee[this.$i18n.locale] },
        weekdaysPrice(){ return this.room.weekdaysPrice[this.$i18n.locale] },
        weekendPrice(){ return this.room.weekendPrice[this.$i18n.locale] },
    },
    watch: {
        range(range){
            const { weekdays, weekend } = getDatesInRange( new Date(range.start), new Date(range.end));
            this.weekdays = weekdays;
            this.weekend = weekend;
        }
    },
    methods:{
        async updateOrder(){
            // 1. Fetch
            const data = {
                oid : this.order.oid,
                rid : this.room._id,
                range : this.range,
            }
            const { access_token } = getUserStorage();
            const config = { headers : { 'Authorization' : `Bearer ${access_token}`}}
            const response = await this.$store.dispatch('orderModules/updateOrder', { data, config })

            // 02. Reload
            await this.getOrders();
            this.closeModal();

            // 03. Message
            messagePopUp(response.data.message[this.$i18n.locale])
        },
        async deleteOrder(){
            // 01. Fetch
            const { access_token } = getUserStorage();
            const config = { headers : { 'Authorization' : `Bearer ${access_token}` }}
            const data = this.modalData;
            const response = await this.$store.dispatch('orderModules/deleteOrder', {data, config});
        
            // 02. Reload
            this.$store.commit('orderModules/CLOSE_MODAL', false);
            await this.getOrders()

            // 03. Message
            messagePopUp(response.data.message[this.$i18n.locale])
        },
        async getOrders(){
            this.$store.dispatch('updateLoading',true);

            // 1. Fetch
            const { access_token , uid } = getUserStorage();
            const config = {
                headers : { 'Authorization' : 'Bearer ' + access_token },
                params : { uid }
            }
            await this.$store.dispatch('orderModules/getOrders', config);

            // 2. Classify
            const payload = {tab : null, isFinding : false}
            this.$store.commit('orderModules/CLASSIFY', payload)

            this.$store.dispatch('updateLoading',false)
        },
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
        closeModal(){
            this.$store.commit('orderModules/CLOSE_MODAL', false);
        }
    },
}
</script>
