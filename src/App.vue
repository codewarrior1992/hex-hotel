<template>
  <div id="app">
    <UserModal />
    <Message />
    <router-view />
  </div>
</template>
<script>
import UserModal from '@/components/UserModal.vue';
import Message from '@/components/AlertMessage.vue';
import { userFromStorage } from './assets/js/functions';
export default {
  components: {
    UserModal,
    Message
  },
  data() {
    return {
      counter : null
    };
  },
  watch:{
    '$route':{
      handler(){
        this.$store.commit('calculateModules/RESET_STATE')
      },
      deep:true
    }
  },
  methods:{
    removeCounter(){
      window.clearInterval(this.counter)
    }
  },
  mounted(){  
    this.counter = setInterval(async function(){
      const user = userFromStorage();
      if(!user) return

      const now = new Date().getTime();
      const expireTime = user.expired;

      if(now > expireTime){
        // 1. Fetch
        const { uid } = userFromStorage()
        const response = await this.$store.dispatch('userModules/logOut', { uid });
        if(!response) return

        // 2. Storage
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');

        // 3. Route
        this.router.push({ name : 'home' });

        // 4. Message
        const timestamp = Math.floor(new Date() / 1000)
        const message = response.data.message[this.$i18n.locale];
        this.$store.dispatch('showMessage',{timestamp, message});
        this.$store.dispatch('removeMessage',{timestamp});
      } 
    }.bind(this), 1000 * 60 * 30)

  },
  beforeDestroy(){
    this.removeCounter()
  }
};
</script>
<style lang="scss">
@import './assets/css/all.scss';
</style>
