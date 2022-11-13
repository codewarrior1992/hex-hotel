<template>
    <nav class="admin-navigation" :class="{'isActive' : isNav}">
        <ul class="links">
            <li class="logo-item">
                <router-link to="/" class="logo">
                    <span>HH</span>
                </router-link>
            </li>
            <li class="dropdown-btn lang-item" :class="{'isActive': isLang}">
                <a href="#" class="lang" @click.prevent="langFun">
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
            <li class="user-item">
                <a href="#" class="user" @click.prevent="logOut">
                <span class="material-symbols-outlined">
                    account_circle
                </span>
                <span class="main-text">{{$t('navbar.out')}}</span> 
                </a>
            </li>
        </ul>
        <a href="#" class="toggle"  @click.prevent="isNav = !isNav">
            <span class="material-symbols-outlined">
                menu
            </span>
        </a>
    </nav>
</template>

<script>
import { getUserStorage, messagePopUp } from '@/assets/js/functions.js';
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
            isLang : false,
            isLoading : false,
        }
    },
    methods:{
        langFun(){
            this.isLang = !this.isLang;
            this.isDate = false;
            this.isRoom = false;
        },
        langPicker(item){
            this.currentLang = item.title;
            this.isLang = !this.isLang;
            this.$i18n.locale = item.value
            localStorage.setItem('locale',item.value)
        },
        uiReset(){
            this.isLang = false;
            this.isNav = false;
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
            messagePopUp(response.data.message[this.$i18n.locale])

            // 4. UI
            this.$store.commit('userModules/LOGIN_STATUS', false)
            this.$router.push({ name : 'home' })
        },
    },
    mounted(){
        document.addEventListener('click', (e) => {
            if (this.$el.contains(e.target)) return;
            this.uiReset();
        });

        this.langs.forEach((item)=>{
            if(item.value === this.$i18n.locale ) this.currentLang = item.title;
        })
    }
}
</script>