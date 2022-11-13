<template>
    <div class="home-page">
      <!-- Loading -->
      <Loading-effect :active.sync="isLoading">
        <div class="loadingio-spinner-spinner-6hzyekklbs">
          <div class="ldio-t40shzjf6m9">
          <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
      </Loading-effect>

      <!-- HomeNav -->
      <HomeNav :rooms="rooms"/>
      
      <!-- Banner -->
      <section class="container">
        <div class="banner">
          <h1>HexHotel</h1>
          <div class="bg-cover" :style="{ backgroundImage: 'url(' + backGround + ')' }"></div>
          <DatePicker class="date" :rooms="rooms"/>
        </div>
      </section>
      
      <!-- Recommend -->
      <section class="container">
        <div class="recommend-room">
          <div class="theme-text">
          <h2>{{$t('home.recommend')}}</h2>
          <span>{{$t('home.recommend_sub')}}</span>
          </div>
          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12" v-for="(item,i) in recommends" :key="i">
              <router-link :to="`room/${item._id}`" class="room-info">
                <div class="overflow-hidden">
                  <div class="room-img" :style="{ backgroundImage: 'url(' + item.images[0] + ')' }"></div>
                </div>
                <h3>{{ item.title[locale] }}</h3>
                <i18n-n :value="item.weekdaysPrice[locale]" format="currency" :locale="locale"></i18n-n>
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Introduce -->
      <section class="introduce" :style="{ backgroundImage: 'url(' + backGround + ')' }">
        <div class="container position-relative">
          <div class="text-group">
            <h2>{{ $t('home.slogan') }}</h2>
            <span>{{ $t('home.slogan_sub') }}</span>
          </div>
        </div>
      </section>

      <!-- Room-Style -->
      <section class="container">
        <div class="room-style">
          <div class="row row-section">
            <div class="col-lg-4 col-md-12">
              <div class="theme-text">
                <h2>{{$t('home.single')}}</h2>
                <span>{{$t('home.single_sub')}}</span>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12" v-for="(item,i) in categories(0)" :key="i">
              <router-link :to="`room/${item._id}`" s class="room-info">
                <div class="overflow-hidden">
                  <div class="room-img" :style="{ backgroundImage: 'url(' + item.images[0] + ')' }"></div>
                </div>
                <h3>{{ item.title[locale] }}</h3>
                <i18n-n :value="item.weekdaysPrice[locale]" format="currency" :locale="locale"></i18n-n>
              </router-link>
            </div>
          </div>
          <div class="row row-section">
            <div class="col-lg-4 col-md-12">
              <div class="theme-text">
                <h2>{{$t('home.couple')}}</h2>
                <span>{{$t('home.couple_sub')}}</span>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12" v-for="(item,i) in categories(1)" :key="i">
              <router-link :to="`room/${item._id}`" class="room-info">
                <div class="overflow-hidden">
                  <div class="room-img" :style="{ backgroundImage: 'url(' + item.images[0] + ')' }"></div>
                </div>
                <h3>{{ item.title[locale] }}</h3>
                <i18n-n :value="item.weekdaysPrice[locale]" format="currency" :locale="locale"></i18n-n>
              </router-link>
            </div>
          </div>
          <div class="row row-section">
            <div class="col-lg-4 col-md-12">
              <div class="theme-text">
                <h2>{{$t('home.family')}}</h2>
                <span>{{$t('home.family_sub')}}</span>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12" v-for="(item,i) in categories(2)" :key="i">
              <router-link :to="`room/${item._id}`"  class="room-info">
                <div class="overflow-hidden">
                  <div class="room-img" :style="{ backgroundImage: 'url(' + item.images[0] + ')' }"></div>
                </div>
                <h3>{{ item.title[locale] }}</h3>
                <i18n-n :value="item.weekdaysPrice[locale]" format="currency" :locale="locale"></i18n-n>
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <FooterMap />
    </div>
</template>

<script>
// @ is an alias to /src
import HomeNav from '@/components/HomeNav.vue';
import FooterMap from '@/components/FooterMap.vue';
import DatePicker from '@/components/HomeDatePicker.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'HomeView',
  components: {
    HomeNav,
    DatePicker,
    FooterMap,
  },
  data(){
    return{
      backGround :'https://images.unsplash.com/photo-1523594572281-3c9a566b6163?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80',
    }
  },
  methods:{
    categories(type){ 
      return this.rooms.filter((item) => item.category.type === type) 
    },
  },
  computed:{
    ...mapGetters(['isLoading']),
    ...mapGetters('roomModules',['rooms']),
    recommends(){ return this.rooms.filter((item) => item.recommend) },
    locale(){
      return this.$i18n.locale
    }
  },
  async created(){
    this.$store.dispatch('updateLoading',true);
    await this.$store.dispatch('roomModules/getRooms');    
    this.$store.dispatch('updateLoading',false)
  }
};
</script>
