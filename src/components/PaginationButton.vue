<template>
    <nav v-if="rawOrders.length > 0">
        <ul class="pagination justify-content-center page-button">
            <li class="page-item" :class="{disabled : currentPage == 0}">
                <a class="page-link" href="#" @click.prevent="currentPage--">&laquo;</a>
            </li>
            <li class="page-item" 
                :class="{active : currentPage == i}"
                v-for="(page,i) in sortPages" :key="i">
                <a class="page-link" href="#" @click.prevent="switchPage(i)">{{i + 1}}</a>
            </li>
            <li class="page-item" :class="{disabled : currentPage + 1 == sortPages.length}">
                <a class="page-link" href="#"  @click.prevent="currentPage++">&raquo;</a>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    props:{
        rawOrders: {
            type : Array,
            default:() => {[]}
        }
    },
    data(){
        return{
            currentPage : 0,
        }
    },
    computed:{
        sortPages(){
            let sortPages = [];
            this.rawOrders.forEach((order,i)=>{
                if(i % 10 == 0) {
                    sortPages.push([])
                }
                sortPages.forEach((page,k)=>{
                    if(parseInt(i / 10) == k){
                        page.push(order)
                    }
                })
            })
            return sortPages
        }
    },
    methods:{
        switchPage(i){
            this.currentPage = i;
            this.$emit('updatePage', this.sortPages[this.currentPage]);
        }
    },
    watch:{
        rawOrders(val){
            if(val.length == 0) return
            this.currentPage = 0;
            this.$emit('updatePage', this.sortPages[this.currentPage])
        }
    },
    created(){
        this.$emit('updatePage', this.sortPages[this.currentPage]);
    }
}
</script>

<style>

</style>