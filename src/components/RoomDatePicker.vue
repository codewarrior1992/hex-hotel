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

    <!-- Submit-->
    <a href="#" class="reserve" @click.prevent="goReservePage">{{ $t('calendar.reserve')}}</a>
  </div>
</template>
<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import { messagePopUp } from '@/assets/js/functions.js'
export default {
  components: {
    DatePicker,
  },
  props:{
    room :{
      type : Object,
    }
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
      range: {},
    };
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
    goReservePage(){
      const range = this.range;
      const room = this.room;
      const condition = {range , room}

      if(Object.values(range).length == 0) {
        const message = {
          'zh-TW':'請選擇日期與房型',
          'en-US':'Please select a date',
          'ja-JP':'日付を選択してください',
        }
        messagePopUp(message[this.$i18n.locale])
        return
      }

      sessionStorage.setItem('booking',JSON.stringify(condition));

      this.$router.push({ 
        name:'reserve', 
        params : { condition }
      })
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
