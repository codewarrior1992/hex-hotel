"use strict";(self["webpackChunkhex_hotel"]=self["webpackChunkhex_hotel"]||[]).push([[406],{5406:function(e,t,s){s.r(t),s.d(t,{default:function(){return l}});var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"book-info"},[s("h1",[e._v(e._s(e.$t("reserve.infoTitle")))]),s("ValidationObserver",{scopedSlots:e._u([{key:"default",fn:function(t){var n=t.handleSubmit,a=t.invalid;return[s("form",{on:{submit:function(t){return t.preventDefault(),n(e.passDataToReservePage)}}},[s("ValidationProvider",{attrs:{name:"validName",rules:"required",tag:"div"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.errors;return[s("div",{staticClass:"input-wrap"},[s("div",{staticClass:"input-field",class:{active:"name"==e.inputFocus}},[s("label",{attrs:{for:"name"}},[s("span",{staticClass:"material-symbols-outlined"},[e._v("person")]),s("span",[e._v(e._s(e.$t("reserve.name")))]),s("strong",[e._v("*")])]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{type:"text",name:"name",id:"name",placeholder:e.$t("reserve.inputName")},domProps:{value:e.name},on:{focus:function(t){e.inputFocus="name"},blur:function(t){e.inputFocus=""},input:function(t){t.target.composing||(e.name=t.target.value)}}})]),s("span",{staticClass:"error",class:{"error-show":n.length>0}},[e._v(e._s(n[0]))])])]}}],null,!0)}),s("ValidationProvider",{attrs:{name:"validPhone",rules:"required",tag:"div"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.errors;return[s("div",{staticClass:"input-wrap"},[s("div",{staticClass:"input-field",class:{active:"phone"==e.inputFocus}},[s("label",{attrs:{for:"phone"}},[s("span",{staticClass:"material-symbols-outlined"},[e._v(" phone_iphone ")]),s("span",[e._v(e._s(e.$t("reserve.phone")))]),s("strong",[e._v("*")])]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"},{name:"mask",rawName:"v-mask",value:"####-###-###",expression:"'####-###-###'"}],attrs:{type:"text",name:"phone",id:"phone",placeholder:e.$t("reserve.inputPhone")},domProps:{value:e.phone},on:{focus:function(t){e.inputFocus="phone"},blur:function(t){e.inputFocus=""},input:function(t){t.target.composing||(e.phone=t.target.value)}}})]),s("span",{staticClass:"error",class:{"error-show":n.length>0}},[e._v(e._s(n[0]))])])]}}],null,!0)}),s("button",{staticClass:"next",class:{pass:!a},attrs:{type:"submit",disabled:a}},[e._v(" "+e._s(e.$t("reserve.next"))+" ")])],1)]}}])})],1)},a=[],o={props:{condition:{type:Object}},data(){return{inputFocus:!1,name:"",phone:"",counter:0}},methods:{passDataToReservePage(){let e;e=void 0!=this.condition?this.condition:JSON.parse(sessionStorage.getItem("booking")),e.name=this.name,e.phone=this.phone,sessionStorage.setItem("booking",JSON.stringify(e)),this.$router.push({name:"payment",params:{booking:e}})}},created(){this.$store.dispatch("updateLoading",!0),this.counter=setTimeout((()=>{this.$store.dispatch("updateLoading",!1)}),600)},beforeDestroy(){clearTimeout(this.counter)}},r=o,i=s(1001),u=(0,i.Z)(r,n,a,!1,null,null,null),l=u.exports}}]);
//# sourceMappingURL=406.72556553.js.map