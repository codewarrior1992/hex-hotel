<template>
    <a class="room-component">
        <div class="room-info">
            <div class="overflow-hidden position-relative">
                <div class="room-img" :style="{ backgroundImage: 'url(' + item.images[0] + ')' }"></div>
            </div>
            <div class="info">
                <h3>{{ item.title[locale] }}</h3>
                <i18n-n :value="item.weekdaysPrice[locale]" format="currency" :locale="locale" class="price"></i18n-n>
            </div>
        </div>
    </a>
</template>
<script>
export default {
    props:{
        item : {
            type : Object,
            default(){return {}}
        }
    },
    data(){
        return {}
    },
    computed:{
        locale(){
            return this.$i18n.locale
        }
    }
}
</script>