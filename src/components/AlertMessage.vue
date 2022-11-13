<template>
    <div class="alert-message">
        <p class="message" :class="{active : item}"
            v-for="( item, i) in messages" :key="i">
            {{ item.message }}
        </p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return {}
    },
    computed:{
        ...mapGetters(['messages'])
    },
}
</script>
