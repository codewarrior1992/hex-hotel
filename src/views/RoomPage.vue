<template>
  <div class="room-page">
    <!-- Loading -->
    <Loading-effect :active.sync="isLoading">
      <div class="loadingio-spinner-spinner-6hzyekklbs">
        <div class="ldio-t40shzjf6m9">
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
    </Loading-effect>

    <!-- RoomNav-->
    <RoomNav @page-update="goRoom"/>

    <!-- Pics Preview-->
    <section class="container preview">
      <div class="bg-cover" :style="{backgroundImage : `url(${currentImage})`}">
        <h1 v-if="room.title">{{ title }}</h1>
        <span>{{$t('room.discount')}}</span>
      </div>
      <ul class="image-list">
        <li v-for="(item,i) in room.images" :key="i"
        :class="{'active' : currentImage === item}">
          <a href="#" @mouseover="currentImage = item">
            <img :src="item">
          </a>
        </li>
      </ul>
    </section>

    <!-- Description & Amenities & Date Picker -->
    <section class="room-information container">
      <div class="row">
        <div class="col-xl-8 col-lg-7 col-md-12 col-sm-12">

          <!-- Description -->
          <div class="description">
            <h2>{{$t('room.description')}}</h2>
                <p class="style" v-if="room.description">{{ room.description[$i18n.locale] }}</p>
                <p class="info" v-if="room.introduction">{{ room.introduction[$i18n.locale] }}</p>
                <p class="check">
                  {{ $t('room.in') }} <br/> 
                  {{ $t('room.out') }} 
                </p>
          </div>

          <!-- Amenities -->
          <div class="amenities">
            <h2>{{$t('room.amenities')}}</h2>
              <ul class="row">
                <li class="col-xl-3 col-lg-4 col-md-4 col-6" 
                  v-if="room.amenities" :class="{active : room.amenities.wifi}">
                  <span class="material-symbols-outlined">wifi</span>
                  {{$t('room.wifi')}}
                </li>
                <li class="col-xl-3 col-lg-4 col-md-4 col-6" 
                  v-if="room.amenities" 
                  :class="{active : room.amenities.television}">
                  <span class="material-symbols-outlined">desktop_windows</span>
                  {{$t('room.tv')}}
                </li>
                <li class="col-xl-3 col-lg-4 col-md-4 col-6" 
                  v-if="room.amenities" 
                  :class="{active : room.amenities.greatView}">
                  <span class="material-symbols-outlined">landscape</span>
                  {{$t('room.view')}}
                </li>
                <li class="col-xl-3 col-lg-4 col-md-4 col-6" 
                  v-if="room.amenities" 
                  :class="{active : room.amenities.breakfast}">
                  <span class="material-symbols-outlined">
                    restaurant
                  </span>
                  {{$t('room.food')}}
                </li>
                <li class="col-xl-3 col-lg-4 col-md-4 col-6" 
                  v-if="room.amenities" 
                  :class="{active : room.amenities.airConditioner}">
                  <span class="material-symbols-outlined">
                    heat_pump
                  </span>
                  {{$t('room.temperature')}}
                </li>
                <li class="col-xl-3 col-lg-4 col-md-4 col-6" 
                  v-if="room.amenities" 
                  :class="{active : room.amenities.smokeFree}">
                  <span class="material-symbols-outlined">smoking_rooms</span>
                  {{$t('room.smoke')}}
                </li>
                <li class="col-xl-3 col-lg-4 col-md-4 col-6" 
                  v-if="room.amenities" 
                  :class="{active : room.amenities.miniBar}">
                  <span class="material-symbols-outlined">local_bar</span>
                  {{$t('room.bar')}}
                </li>
                <li class="col-xl-3 col-lg-4 col-md-4 col-6" 
                  v-if="room.amenities" 
                  :class="{active : room.amenities.refrigerator}">
                  <span class="material-symbols-outlined">kitchen</span>
                  {{$t('room.fridge')}}
                </li>
                <li class="col-xl-3 col-lg-4 col-md-4 col-6" 
                  v-if="room.amenities" 
                  :class="{active : room.amenities.childFriendly}">
                  <span class="material-symbols-outlined">child_care</span>
                  {{$t('room.child')}}
                </li>
                <li class="col-xl-3 col-lg-4 col-md-4 col-6" 
                  v-if="room.amenities" 
                  :class="{active : room.amenities.roomService}">
                  <span class="material-symbols-outlined">room_service</span>
                  {{$t('room.service')}}
                </li>
                <li class="col-xl-3 col-lg-4 col-md-4 col-6" 
                  v-if="room.amenities" 
                  :class="{active : room.amenities.sofa}">
                  <span class="material-symbols-outlined">chair</span>
                  {{$t('room.sofa')}}
                </li>
                <li class="col-xl-3 col-lg-4 col-md-4 col-6" 
                  v-if="room.amenities" 
                  :class="{active : room.amenities.petFriendly}">
                  <span class="material-symbols-outlined">pets</span>
                  {{$t('room.pet')}}
                </li>
              </ul>
          </div>
        </div>
        
        <div class="col-xl-4 col-lg-5 col-md-12 col-sm-12">
          <div class="scroll-area">
            <div class="sticky-contain">
              <div class="price">
              <h2>Reserve</h2>
              <strong class="weekdays">
                <i18n-n v-if="room.weekdaysPrice" :value="weekdaysPrice" format="currency" :locale="locale"></i18n-n>
                <strong class="text-gray-middle"> / {{$t('room.night')}}</strong>
              </strong>
              <span class="weekend">
                {{$t('room.price') + ' -'}} 
                <i18n-n v-if="room.weekendPrice" :value="weekendPrice" format="currency" :locale="locale"></i18n-n>
                <strong class="text-gray-middle"> / {{$t('room.night')}} </strong>
              </span>
              </div>
              <DatePicker class="calendar" :room="room"/>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recommend -->
    <section class="container recommend">
      <h2>{{$t('room.recommend')}}</h2>
        <swiper :options="swiperOption" v-if="rooms.length > 0">
          <swiper-slide v-for="(room,i) in rooms" :key="i">
            <RecommendRoom :item="room" @click.native="goRoom(room._id)"/>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </section>

    <!-- Footer -->
    <FooterMap/>
  </div>
</template>
<script>
  import 'swiper/dist/css/swiper.css';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import DatePicker from '@/components/RoomDatePicker.vue';
  import RoomNav from '@/components/RoomNav.vue';
  import RecommendRoom from '@/components/RecommendRoom.vue';
  import FooterMap from '@/components/FooterMap.vue';
  import { mapGetters } from 'vuex';

  export default {
    components:{
      RoomNav,
      RecommendRoom,
      FooterMap,
      DatePicker,
      swiper,
      swiperSlide
    },
    data(){
      return{
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 20,
          speed:1000,
          autoplay: {
            delay: 1500,
            stopOnLastSlide: false,
            disableOnInteraction: true,
          },
          breakpoints : {
            1024 :{
              slidesPerView : 3,
              spaceBetween : 20
            },
            768 :{
              slidesPerView : 2,
              spaceBetween : 20
            },
            390 :{
              slidesPerView : 1,
              spaceBetween : 0
            }
          },
          loop:true,
        },
        currentImage:'',
        range:{},
      }
    },
    computed:{
      ...mapGetters(['isLoading']),
      ...mapGetters('roomModules',['rooms','room']),
      locale(){ return this.$i18n.locale },
      title(){ return this.room.title[this.$i18n.locale] },
      weekdaysPrice(){ return this.room.weekdaysPrice[this.$i18n.locale] },
      weekendPrice(){ return this.room.weekendPrice[this.$i18n.locale] }

    },
    methods:{
      async goRoom(_id){
          this.$router.push(`/room/${_id}`);
          this.getRoom();
      },
      async getRooms(){
        this.$store.dispatch('updateLoading',true)
        await this.$store.dispatch('roomModules/getRooms');  
        this.$store.dispatch('updateLoading',false)
      },
      async getRoom(){
        this.$store.dispatch('updateLoading',true)
        const response = await this.$store.dispatch('roomModules/getRoom', this.$route.params.id);
        this.currentImage = response.data.room.images[0]
        this.$store.dispatch('updateLoading',false)
      }
    },
    created(){      
      this.getRoom();  
      this.getRooms();       
    }
  }
</script>
