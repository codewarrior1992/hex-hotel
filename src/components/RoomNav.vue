<template>
    <header>
        <nav class="room-navigation" :class="{'isActive' : isNav}">
            <ul class="links">
                <!-- Logo -->
                <li class="logo-item">
                    <router-link to="/" href="#" class="logo">
                        <span>HH</span>
                    </router-link>
                </li>
                
                <!-- Room -->
                <li class="dropdown-btn room-item" :class="{'isActive': isRoom}" 
                v-if="currentRoute">
                    <a href="#" class="room" @click.prevent="behaviorHandler('room')">
                        <span class="material-symbols-outlined">
                        hotel
                        </span>
                        <span class="main-text">{{ $t('navbar.style')}}</span>
                        <span class="material-symbols-outlined">
                        arrow_drop_down
                        </span>
                    </a>
                    <ul class="dropdown-room">
                        <li v-for="(room, i) in rooms" :key="i">
                            <a  class="room" @click.prevent="pickRoom(room._id)">{{ room.title[$i18n.locale] }}</a>
                        </li>
                    </ul>
                </li>

                <!-- Language -->
                <li class="dropdown-btn lang-item" :class="{'isActive': isLang}">
                    <a href="#" class="lang" @click.prevent="behaviorHandler('lang')">
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
                <li class="user-item" v-if="!isLogIn">
                    <a href="#" class="user" @click.prevent="openUserModal">
                        <span class="material-symbols-outlined">
                            account_circle
                        </span>
                        <span class="main-text">{{$t('navbar.in')}}</span> 
                    </a>
                </li>
                <li class="dropdown-btn user-item " v-else :class="{'isActive': isAdmin}">
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
            
            <a href="#" class="toggle-btn"  @click.prevent="isNav = !isNav">
            <span class="material-symbols-outlined">
                menu
            </span>
            </a>
        </nav>
    </header>
</template>

<script>
import { getUserStorage, messagePopUp } from '@/assets/js/functions.js';
import { mapGetters } from 'vuex';
export default {
    data(){
        return {
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
                    title : 'にほんご',
                    value : 'ja-JP'
                },
            ],
            currentLang : '繁體中文',
            isNav : false,
            isRoom : false,
            isLang : false,
            isLoading : false,
            isAdmin : false,
        }
    },
    methods:{
        behaviorHandler(action){
            switch(action){
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
        uiReset(){
            this.isDate = false;
            this.isRoom = false;
            this.isLang = false;
            this.isNav = false;
            this.isAdmin = false;
        },
        async getRooms(){
            if(this.$route.name != 'room') return
            this.$store.dispatch('roomModules/getRooms')
        },
        pickRoom(_id){
            this.$emit('page-update', _id);
            this.isRoom = false;
        },
        openUserModal(){
            this.uiReset();
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

            // 3. UI
            this.$store.dispatch('userModules/updateLogInStatus', false)
            this.$router.push({ name : 'home' })

            // 4. Message
            messagePopUp(response.data.message[this.$i18n.locale])
        }
    },
    computed:{
        ...mapGetters('userModules',['isLogIn']),
        ...mapGetters('roomModules',['rooms']),
        currentRoute(){ return !this.$route.path.includes('/reserve') }
    },
    async created(){
        this.getRooms();

        localStorage.getItem('user') || sessionStorage.getItem('user') ? 
        this.$store.commit('userModules/LOGIN_STATUS', true) : 
        this.$store.commit('userModules/LOGIN_STATUS', false)
    },
    mounted(){
        document.addEventListener('click', (e) => {
        if (this.$el.contains(e.target)) return;
            this.uiReset();
        });

        this.langs.forEach((item)=>{
            if(item.value === this.$i18n.locale ) this.currentLang = item.title;
        })
    },
    beforeDestroy(){
        window.removeEventListener('scroll', this.scrollFun);
    }
}
</script>