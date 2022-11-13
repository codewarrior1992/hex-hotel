<template>
    <div class="book-info">
        <h1>{{$t('reserve.infoTitle')}}</h1> 
        <ValidationObserver v-slot="{ handleSubmit, invalid }"> 
            <form @submit.prevent="handleSubmit(passDataToReservePage)">
                
                <!-- Name -->
                <ValidationProvider name="validName" rules="required" v-slot="{ errors }" tag="div">
                    <div class="input-wrap">
                        <div class="input-field" :class="{active:inputFocus == 'name'}">
                            <label for="name">
                                <span class="material-symbols-outlined">person</span>
                                <span>{{$t('reserve.name')}}</span>
                                <strong>*</strong>
                            </label>
                            <input type="text" name="name" id="name" @focus="inputFocus = 'name'" @blur="inputFocus = ''"
                            v-model="name" :placeholder="$t('reserve.inputName')">
                        </div>
                        <span class="error" :class="{'error-show':errors.length > 0}">{{ errors[0] }}</span>
                    </div>
                </ValidationProvider>

                <!-- Phone -->
                <ValidationProvider name="validPhone" rules="required" v-slot="{ errors }" tag="div">
                    <div class="input-wrap">
                        <div class="input-field" :class="{active:inputFocus == 'phone'}">
                            <label for="phone">
                                <span class="material-symbols-outlined">
                                    phone_iphone
                                </span>
                                <span>{{$t('reserve.phone')}}</span>
                                <strong>*</strong>
                            </label>
                            <input type="text" name="phone" id="phone" 
                            @focus="inputFocus = 'phone'" 
                            @blur="inputFocus = ''"
                            v-model="phone" :placeholder="$t('reserve.inputPhone')"
                            v-mask="'####-###-###'">
                        </div>
                        <span class="error" :class="{'error-show':errors.length > 0}">{{ errors[0] }}</span>
                    </div>
                </ValidationProvider>

                <!-- Submit -->
                <button type="submit" class="next" 
                    :disabled="invalid" :class="{pass:!invalid}">
                    {{$t('reserve.next')}}
                </button>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
export default {
    props:{
        condition :{
            type : Object,
        },
    },
    data(){
        return{
            inputFocus : false,
            name :'',
            phone : '',
            counter:0
        }
    },
    methods:{
        passDataToReservePage(){
            let booking;
            this.condition != undefined ? 
            booking = this.condition : 
            booking = JSON.parse(sessionStorage.getItem('booking'))

            booking.name = this.name,
            booking.phone = this.phone,

            sessionStorage.setItem('booking',JSON.stringify(booking))

            this.$router.push({ 
                name:'payment', 
                params : { 
                    booking
                }
            })
        },
    },
    created(){
        this.$store.dispatch('updateLoading',true);
        this.counter = setTimeout(()=>{ this.$store.dispatch('updateLoading',false); },600)
    },
    beforeDestroy(){
        clearTimeout(this.counter)
    }
}
</script>
