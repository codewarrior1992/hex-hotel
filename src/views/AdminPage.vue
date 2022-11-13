<template>
    <div class="admin-page">
        <!-- Loading -->
        <Loading-effect :active.sync="isLoading">
            <div class="loadingio-spinner-spinner-6hzyekklbs">
            <div class="ldio-t40shzjf6m9">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
        </Loading-effect>

        <!-- AdminNav -->
        <AdminNav/>

        <!-- Modal -->
        <AdminModal/>

        <!--- MainContent -->
        <router-view class="container content"></router-view>

        <!-- Footer -->
        <FooterMap/>
    </div>
</template>

<script>
import AdminNav from '@/components/AdminNav.vue';
import AdminModal from '@/components/AdminModal.vue';
import FooterMap from '@/components/FooterMap.vue';
import { mapGetters } from 'vuex';
export default {
    components:{
        FooterMap,
        AdminNav,
        AdminModal
    },
    computed:{
        ...mapGetters(['isLoading'])
    },
    data(){
        return {}
    }
}
</script>