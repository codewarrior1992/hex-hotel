<template>
  <div class="date-picker">
    <!-- Date -->
    <div class="selection-area" :class="{ isActive: isDate }">
      <a href="#" @click.prevent="dateHandler">
        <span class="material-icons"> date_range </span>
        <span v-if="Object.keys(range).length === 0">{{ $t('calendar.check') }}</span>
        <span v-else
          >{{ range.start.toLocaleDateString() }} -
          {{ range.end.toLocaleDateString() }}</span
        >
        <span class="material-icons"> arrow_drop_down </span>
      </a>
    </div>
    <transition name="fade" mode="out-in">
      <DatePicker
        v-if="isDate"
        class="slide-area calendar"
        v-model="range"
        is-range
        is-expanded
        :locale="{ id: $i18n.locale, firstDayOfWeek: 2, masks: { weekdays: 'W' } }"
        :attributes="attributes"
        :select-attribute="selectDragAttribute"
        :drag-attribute="selectDragAttribute"
        :disabled-dates="[{ ordinalWeekdays: { [-1]: 5 } }]"
        :min-date="new Date()"
        :max-date="new Date().setDate(new Date().getDate() + 30)"
      />
    </transition>

    <!-- Room -->
    <div class="selection-area" 
    :class="{ isActive: isRoom }">
      <a
        href="#"
        @click.prevent="roomHandler"
        class="d-flex align-items-center"
      >
        <span class="material-icons"> hotel </span>
        <span href="#" v-if="Object.keys(room).length === 0">{{ $t('calendar.room')}}</span>
        <span href="#" v-else>{{ title }}</span>
        <span class="material-icons"> arrow_drop_down </span>
      </a>
    </div>
    <transition name="fade" mode="out-in">
      <ul class="slide-area" v-if="isRoom">
        <li v-for="(room, i) in rooms" :key="i" class="room-item">
          <a href="#" @click.prevent="pickRoom(room)">{{ room.title[locale] }}</a>
        </li>
      </ul>
    </transition>

    <!-- Calculate -->
    <transition name="slide" mode="out-in">
      <ul
        class="expense" v-if="Object.keys(room).length > 0 && Object.keys(range).length > 0"
      >
        <li class="item" v-if="weekdays.length > 0">
          <span>
            <i18n-n :value="weekdaysPrice" format="currency" :locale="locale"></i18n-n>
            x {{ weekdays.length }} {{$t('calendar.night')}}
          </span>
          <i18n-n v-if="room !== undefined" :value="calculate('weekdays')" format="currency" :locale="locale"></i18n-n>
        </li>
        <li class="item" v-if="weekend.length > 0">
          <span>
            <i18n-n :value="weekendPrice" format="currency" :locale="locale"></i18n-n>
            x {{ weekend.length }} {{$t('calendar.night')}}
          </span>
          <i18n-n v-if="room !== undefined" :value="calculate('weekend')" format="currency" :locale="locale"></i18n-n>
        </li>
        <li class="item">
          <span>{{$t('calendar.fee')}}</span> 
          <i18n-n :value="fee" format="currency" :locale="locale"></i18n-n>
        </li>
        <li class="total">
          <span>{{$t('calendar.total')}}</span>
          <i18n-n v-if="room !== undefined" :value="calculate('total')" format="currency" :locale="locale"></i18n-n>
        </li>
      </ul>
    </transition>

    <!-- Submit-->
    <a href="#" class="reserve" @click.prevent="goReservePage">{{ $t('calendar.reserve')}}</a>
  </div>
</template>
<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import { getDatesInRange , calculatePrice} from '@/assets/js/functions.js';
import { mapGetters } from 'vuex';
export default {
  props:{
    rooms:{
      type : Array,
    }
  },
  components: {
    DatePicker,
  },
  data() {
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
      isDate: false,
      isRoom: false,
      isSlide: false,
      weekdays: [],
      weekend: [],
    };
  },
  computed:{
    ...mapGetters('calculateModules',['room']),
    range:{
      get(){ return this.$store.state.calculateModules.range },
      set(val){  this.$store.commit('calculateModules/RANGE', val) }
    },
    locale(){  return this.$i18n.locale },
    title(){ return this.room.title[this.$i18n.locale] },
    fee(){ return this.room.fee[this.$i18n.locale] },
    weekdaysPrice(){ return this.room.weekdaysPrice[this.$i18n.locale] },
    weekendPrice(){ return this.room.weekendPrice[this.$i18n.locale] },
  },
  watch: {
    range(range){
      if(range == null) return
      this.$store.dispatch('calculateModules/updateRange',range);
      const {weekdays , weekend} = getDatesInRange( new Date(range.start), new Date(range.end) );
      this.weekdays = weekdays;
      this.weekend = weekend
    },
  },
  methods: {
    dateHandler() {
      this.isRoom = false;
      this.isDate = !this.isDate;
    },
    roomHandler() {
      this.isDate = false;
      this.isRoom = !this.isRoom;
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
        return calculatePrice(args);
    },
    pickRoom(room){
      this.isRoom = false;
      this.$store.dispatch('calculateModules/updateRoom', room)
    },
    goReservePage(){
      const range = this.range;
      const room = this.room;
      const condition = {range , room}
      
      // 1. Condition
      if(Object.values(range).length == 0 || Object.values(room).length == 0) {
        const message = {
          'zh-TW':'請選擇日期與房型',
          'en-US':'Please select date and room type',
          'ja-JP':'日付と部屋タイプを選択してください',
        }
        const timestamp = Math.floor(new Date() / 1000)
        this.$store.dispatch('showMessage',{timestamp, message : message[this.locale]});
        this.$store.dispatch('removeMessage',{timestamp});
        return
      }

      // 2. Storage
      sessionStorage.setItem('booking',JSON.stringify(condition));

      // 3. Route
      this.$router.push({ 
        name:'reserve', 
        params : { condition }
      })

      // 4. Clear
      // this.$store.commit('calculateModules/RESET_STATE')
    },
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if (this.$el.contains(e.target)) return;
      this.isDate = false;
      this.isRoom = false;
    });
  },
};
</script>
