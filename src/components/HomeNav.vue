<template>
  <header>
    <nav class="home-navigation" :class="{'show':isNav}">
      <ul class="links">
        <!-- Logo -->
        <li>
          <router-link to="/" href="#" class="logo">
              <span>HH</span>
          </router-link>
        </li>
        
        <!-- Check Time -->
        <li class="dropdown-btn" :class="{'show': isDate}">
          <a href="#" class="calendar" @click.prevent="behaviorHandler('date')">
            <span class="material-symbols-outlined">
              calendar_month
            </span>
            <span class="main-text" v-if="Object.keys(range).length === 0">
              {{$t('navbar.check')}}</span>
            <span v-else class="main-text">
              {{ range.start.toLocaleDateString() }} -
              {{ range.end.toLocaleDateString() }}</span>
            <span class="material-symbols-outlined">
              arrow_drop_down
            </span>
          </a>
          <div class="dropdown-date">
            <DatePicker class="date-picker" 
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
          </div>
        </li>

        <!-- Room Style -->
        <li class="dropdown-btn" :class="{'show': isRoom}">
          <a href="#" class="room" @click.prevent="behaviorHandler('room')">
            <span class="material-symbols-outlined">
              hotel
            </span>
            <span href="#" class="main-text" v-if="Object.keys(room).length === 0">{{ $t('navbar.room')}}</span>
            <span href="#" class="main-text" v-else>{{ title }}</span>
            <span class="material-symbols-outlined">
              arrow_drop_down
            </span>
          </a>
          <ul class="dropdown-room">
            <li v-for="(room,i) in rooms" :key="i">
              <a href="#"  @click.prevent="pickRoom(room)">{{ room.title[locale] }}</a>
            </li>
          </ul>
        </li>

        <!-- Reserve -->
        <li>
          <a href="#" class="reserve" @click.prevent="goReservePage">
            <span class="material-symbols-outlined">
              book_online
            </span>
            <span class="main-text">{{$t('navbar.reserve')}}</span>
          </a>
        </li>

        <!-- Language -->
        <li class="dropdown-btn" :class="{'show': isLang}">
          <a href="#" class="locale" @click.prevent="behaviorHandler('lang')">
            <span class="material-symbols-outlined">
              language
            </span>
            <span class="main-text">{{ currentLang }}</span>
            <span class="material-symbols-outlined">
              arrow_drop_down
            </span>
          </a>
          <ul class="dropdown-lang">
            <li v-for="(item,i) in langs" :key="i">
              <a href="#" @click.prevent="langPicker(item)">{{ item.title }}</a>
            </li>
          </ul>
        </li>

        <!-- Log In -->
        <li v-if="!isLogIn">
            <a href="#" class="user" @click.prevent="openUserModal">
              <span class="material-symbols-outlined">
                account_circle
              </span>
              <span class="toggle-content main-text">{{$t('navbar.in')}}
              </span> 
            </a>
        </li>
        <li v-else class="dropdown-btn" :class="{'show': isAdmin}">
            <a href="#" class="user" @click.prevent="behaviorHandler('admin')">
              <span class="material-symbols-outlined">
                account_circle
              </span>
              <span class="main-text">{{ $t('navbar.user') }}</span>   
              <span class="material-symbols-outlined">
                arrow_drop_down
              </span>
            </a>
            <ul class="dropdown-admin">
                <li>
                  <router-link to="/admin">{{$t('navbar.dashboard')}}</router-link>
                </li>  
                <li>
                  <a href="#" class="toggle-content" @click.prevent="logOut">{{$t('navbar.out')}}</a>
                </li>           
            </ul>
        </li>
      </ul>
      
      <a href="#" class="toggle-nav"  @click.prevent="isNav = !isNav">
          <span class="material-symbols-outlined">
            menu
          </span>
      </a>
    </nav>
  </header>
</template>

<script>
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import { getUserStorage, getDatesInRange, messagePopUp } from '@/assets/js/functions.js';
import {  mapGetters } from 'vuex';
export default {
  props:{
    rooms:{
      type : Array,
    }
  },
  components: {
    DatePicker,
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
      langs : [
        {
          title : '繁體中文',
          value : 'zh-TW'
        },
        {
          title : 'English',
          value : 'en-US'
        },
        {
          title : 'にほんご ',
          value : 'ja-JP'
        },
      ],
      currentLang : '',
      isLoading : false,
      isNav : false,
      isDate : false,
      isRoom : false,
      isLang : false,
      isAdmin : false,
      weekdays:[],
      weekend:[]
    }
  },
  methods:{
    behaviorHandler(action){
      switch(action){
        case 'date' : {
            this.isDate = !this.isDate;
            this.isRoom = false;
            this.isLang = false;
            this.isAdmin = false;
          break;
        }
        case 'room' : {
            this.isRoom = !this.isRoom;
            this.isDate = false;
            this.isLang = false;
            this.isAdmin = false;
          break;
        }
        case 'lang' : {
          this.isLang = !this.isLang;
          this.isDate = false;
          this.isRoom = false;
          this.isAdmin = false;
          break;
        }
        case 'admin' : {
          this.isAdmin = !this.isAdmin;
          this.isLang = false;
          this.isDate = false;
          this.isRoom = false;
        }
      }
    },
    langPicker(item){
      this.currentLang = item.title;
      this.isLang = !this.isLang;

      this.$i18n.locale = item.value;
      localStorage.setItem('locale',item.value)
    },
    scrollFun(){
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        document.querySelector(".home-navigation").style.top = "0";
      } else {
        document.querySelector(".home-navigation").style.top = "-72px";
      }
      this.uiReset();
    },
    uiReset(){
      this.isDate = false;
      this.isRoom = false;
      this.isLang = false;
      this.isAdmin = false;
      this.isNav = false;
    },
    pickRoom(room){
      this.$store.dispatch('calculateModules/updateRoom', room)
      this.isRoom = !this.isRoom;
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
        messagePopUp(message[this.locale])
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
    openUserModal(){
      this.uiReset()
      this.$store.commit('userModules/USER_MODAL', true);
    },
    async logOut(){
      // 1. Fetch
      const { uid } = getUserStorage()
      const response = await this.$store.dispatch('userModules/logOut', { uid });
      if(!response) return

      // 2. Storage
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');

      // 3. Message
      messagePopUp(response.data.message[this.locale])

      // 4. UI
      this.$store.commit('userModules/LOGIN_STATUS', false)
      this.$router.push({ name : 'home' })
    },
  },
  computed:{
    ...mapGetters('userModules',['isLogIn']),
    ...mapGetters('calculateModules',['room']),
    range:{
      get(){ 
        return this.$store.state.calculateModules.range;
      },
      set(val){ 
        this.$store.commit('calculateModules/RANGE', val)
      }
    },
    title(){ 
      return this.room.title[this.$i18n.locale] 
    },
    locale(){ 
      return this.$i18n.locale 
    },
  },
  watch:{
    range(range){
      if(range == null) return
      this.$store.dispatch('calculateModules/updateRange',range);
      const {weekdays , weekend} = getDatesInRange( new Date(range.start), new Date(range.end) );
      this.weekdays = weekdays;
      this.weekend = weekend
    },
  },
  async created(){
    localStorage.getItem('user') || sessionStorage.getItem('user') ? 
    this.$store.commit('userModules/LOGIN_STATUS', true) : 
    this.$store.commit('userModules/LOGIN_STATUS', false)
  },
  mounted(){
    document.addEventListener('click', (e) => {
      if (this.$el.contains(e.target)) return;
      this.uiReset();
    });
    
    window.addEventListener('scroll', this.scrollFun, false);

    this.langs.forEach((item)=>{
      if(item.value === this.$i18n.locale ) this.currentLang = item.title;
    })
  },
  beforeDestroy(){
    window.removeEventListener('scroll', this.scrollFun);
  }
};
</script>
