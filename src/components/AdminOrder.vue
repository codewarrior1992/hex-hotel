<template>
  <div class="admin-order">
    <!-- Filter Bar -->
    <div class="row justify-content-between">
      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
          <ul class="tabs">
            <li>
              <a href="#" :class="{active : tab == null}" @click.prevent="classifyOrders(null)">
                {{ $t('admin.all')}}
              </a>
            </li>
            <li>
              <a href="#" :class="{active : tab == true}" @click.prevent="classifyOrders(true)">
                {{ $t('admin.future')}}
              </a>
            </li>
            <li>
              <a href="#" :class="{active : tab == false}" @click.prevent="classifyOrders(false)">
                {{ $t('admin.before')}}
              </a>
            </li>
          </ul>
      </div>

      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 align-items-stretch">
          <div class="search-group">
            <div class="input-field">
              <input type="text" :placeholder="$t('admin.input')" @click.prevent="" v-model.trim="value">
              <ul class="suggestion" v-if="suggestion.length > 0">
                <li v-for="(text,i) in suggestion" :key="i"><a @click.prevent="value = text">{{ text }}</a></li>
              </ul>
            </div>
            <a href="#" class="find" @click.prevent="findOrders">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                  <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                </svg>
            </a>
          </div>
      </div>
    </div>

    <!-- Order List -->
    <div class="list">
      <div class="result" v-if="filteredOrders.length > 0">
        <h2>
          {{$t('admin.result')}} 
        </h2>
        <a href="#" class="reset" @click.prevent="reset">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
          </svg>
        </a>
      </div>
      <ul class="row" v-if="rawOrders.length > 0"> 
        <li class="col-xl-4 col-lg-6 col-md-6 col-sm-12"
          v-for="(item,i) in newOrders" :key="i">
          <div class="item">
            <div class="image" v-if="item.room" :style="{ backgroundImage: 'url(' + item.room.images[0] + ')' }"></div>
            <div class="content">          

              <h2 class="room" v-if="item.room">{{ item.room.title[locale] }}</h2>

              <p class="icon">
                <span class="material-symbols-outlined">content_copy</span> 
                {{ item.oid }}
              </p>

              <p class="icon">
                <span class="material-symbols-outlined">date_range</span>
                {{ new Date(item.range.start).toLocaleDateString() }} - {{ new Date(item.range.end).toLocaleDateString() }}
              </p>

              <i18n-n  class="text-danger fw-bold" :value="item.total[locale]" format="currency" :locale="locale" tag="P"></i18n-n>
              
              <p class="badge-pill">
                <span class="category" v-if="item.room">{{ item.room.category[locale] }}</span>
                <span v-if="item.status == 'checked'" class="status text-white bg-success">{{$t('admin.status_checked')}}</span>
                <span v-if="item.status == 'cancel'" class="status text-white bg-danger">{{$t('admin.status_cancel')}}</span>
                <span v-if="item.status == 'available'" class="status text-white bg-primary">{{$t('admin.status_available')}}</span>
              </p>

              <div class="buttons">
                <a href="#" class="check-btn" @click.prevent="openEditModal(item)" :class="{'disable':compareDateForModal(item)}">
                  <span class="material-symbols-outlined">
                    settings
                  </span>
                  {{$t('admin.edit')}}
                </a>
                <a href="#" class="delete-btn" @click.prevent="openDeleteModal(item)" :class="{'disable':compareDateForModal(item)}">
                  <span class="material-symbols-outlined">
                    delete
                  </span>
                  {{$t('admin.delete')}}
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div v-else class="none">
        <h3>(;-;)</h3>
        <p>{{$t('admin.none')}}</p>
        <a href="#" @click.prevent="reset" class="reset">{{$t('admin.reset')}}</a>
      </div>
    </div>

    <!-- Page -->
    <PaginationButton :rawOrders="rawOrders" @updatePage="renderOrders"/>
  </div>
</template>
<script>
import PaginationButton from '@/components/PaginationButton.vue';
import { getUserStorage, messagePopUp } from '@/assets/js/functions.js';
import { suggestion } from '@/assets/js/suggestion.js'
import { mapGetters } from 'vuex';
export default {
    components:{  
      PaginationButton,
    },
    data(){
        return{
            tab:null,
            value:'',
            order:{},
            isFinding : false,
            suggestion:[],
            unEdit : false
        }
    },
    watch:{
      value:{
        handler(val){
          if(val == '') return this.suggestion = [];
          this.suggestion = suggestion.filter((item)=>{
            return item.toLocaleLowerCase().includes(val.toLocaleLowerCase())
          })
        }
      },
    },
    computed:{
      locale(){ return this.$i18n.locale },
      ...mapGetters(['isLoading']),
      ...mapGetters('orderModules',['originalOrders','rawOrders']),
      newOrders:{
        get(){ return this.$store.state.orderModules.newOrders },
        set(val){  this.$store.commit('orderModules/SET_ORDERS', val) }
      },
      filteredOrders:{
        get(){ return this.$store.state.orderModules.filteredOrders },
        set(val){  this.$store.commit('orderModules/SET_FILTERED_ORDERS', val) }
      }
    },
    methods:{
      async getOrders(){
          // 01. Fetch
          this.$store.dispatch('updateLoading',true)
          const { access_token , uid } = getUserStorage();
          const config = {
              headers : { 'Authorization' : 'Bearer ' + access_token },
              params : { uid }
          }
          await this.$store.dispatch('orderModules/getOrders', config)

          // 02. UI
          this.classifyOrders(this.tab);
          this.$store.dispatch('updateLoading',false)
      },
      classifyOrders(keyword){
        this.loading();
        this.tab = keyword;

        const payload = {
          tab : this.tab,
          isFinding : this.isFinding
        }

        this.$store.commit('orderModules/CLASSIFY', payload)
      },
      renderOrders(data){
        this.newOrders = data;
      },
      findOrders(){
        if(this.value == ''){
          const message = {
            'en-US' : 'Please enter the information to search',
            'zh-TW' : '請輸入要搜尋的資料',
            'ja-JP' : '検索する情報を入力してください',
          }
          messagePopUp(message[this.locale])
          return 
        }

        this.loading();
        let input = Number(this.value);
        this.isFinding = true;

        // 1. Filter
        const isNum = input % input;
        const payload = { 
          isNum, 
          value : this.value,
          locale : this.$i18n.locale
        }

        this.$store.commit('orderModules/FILTER' , payload)

        // 2. Classify & Reload
        this.classifyOrders(this.tab)
        this.value = '';
      },
      //
      async openEditModal(item){
        if(this.compareDateForModal(item)) return 
        const response = await this.$store.dispatch('roomModules/getRoom',item.room.rid) 
        const data =  { 
          order : item, 
          room : response.data.room, 
          isUpdateModal: true, 
        }
        this.$store.commit('orderModules/UPDATE_MODAL', data);
        this.$store.commit('orderModules/SET_RANGE', item.range)
      },
      openDeleteModal(item){
        if(this.compareDateForModal(item)) return 
        const { uid } = getUserStorage();
        const data = {  
          uid, 
          oid : item.oid,
          isDeleteModal: true, 
        };
        this.$store.commit('orderModules/DELETE_MODAL', data)
      },
      //
      compareDateForModal(item){   
        const start = new Date(item.range.start).getTime();
        const now = Date.now();
        return now > start ? true : false
      },
      loading(){
        this.$store.dispatch('updateLoading',true)
        setTimeout(()=>{this.$store.dispatch('updateLoading',false)},600);
      },
      reset(){
        location.reload();
      },
    },
    created(){           
        this.getOrders(); 
    },
}
</script>