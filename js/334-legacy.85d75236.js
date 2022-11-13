"use strict";(self["webpackChunkhex_hotel"]=self["webpackChunkhex_hotel"]||[]).push([[334],{4334:function(e,t,a){a.r(t),a.d(t,{default:function(){return x}});var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"admin-page"},[a("Loading-effect",{attrs:{active:e.isLoading},on:{"update:active":function(t){e.isLoading=t}}},[a("div",{staticClass:"loadingio-spinner-spinner-6hzyekklbs"},[a("div",{staticClass:"ldio-t40shzjf6m9"},[a("div"),a("div"),a("div"),a("div"),a("div"),a("div"),a("div"),a("div"),a("div"),a("div"),a("div"),a("div")])])]),a("AdminNav"),a("AdminModal"),a("router-view",{staticClass:"container content"}),a("FooterMap")],1)},s=[],r=a(3019),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("nav",{staticClass:"admin-navigation",class:{isActive:e.isNav}},[a("ul",{staticClass:"links"},[a("li",{staticClass:"logo-item"},[a("router-link",{staticClass:"logo",attrs:{to:"/"}},[a("span",[e._v("HH")])])],1),a("li",{staticClass:"dropdown-btn lang-item",class:{isActive:e.isLang}},[a("a",{staticClass:"lang",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.langFun.apply(null,arguments)}}},[a("span",{staticClass:"material-symbols-outlined"},[e._v(" language ")]),a("span",{staticClass:"main-text"},[e._v(e._s(e.currentLang))]),a("span",{staticClass:"material-symbols-outlined"},[e._v(" arrow_drop_down ")])]),a("ul",{staticClass:"dropdown-lang"},e._l(e.langs,(function(t,n){return a("li",{key:n},[a("a",{attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),e.langPicker(t)}}},[e._v(e._s(t.title))])])})),0)]),a("li",{staticClass:"user-item"},[a("a",{staticClass:"user",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.logOut.apply(null,arguments)}}},[a("span",{staticClass:"material-symbols-outlined"},[e._v(" account_circle ")]),a("span",{staticClass:"main-text"},[e._v(e._s(e.$t("navbar.out")))])])])]),a("a",{staticClass:"toggle",attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.isNav=!e.isNav}}},[a("span",{staticClass:"material-symbols-outlined"},[e._v(" menu ")])])])},o=[],l=a(6198),c=(a(1539),a(4747),a(5666),a(6407)),u={data:function(){return{langs:[{title:"繁體中文",value:"zh-TW"},{title:"English",value:"en-US"},{title:"にほんご",value:"ja-JP"}],currentLang:"繁體中文",isNav:!1,isLang:!1,isLoading:!1}},methods:{langFun:function(){this.isLang=!this.isLang,this.isDate=!1,this.isRoom=!1},langPicker:function(e){this.currentLang=e.title,this.isLang=!this.isLang,this.$i18n.locale=e.value,localStorage.setItem("locale",e.value)},uiReset:function(){this.isLang=!1,this.isNav=!1},logOut:function(){var e=this;return(0,l.Z)(regeneratorRuntime.mark((function t(){var a,n,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=(0,c.qn)(),n=a.uid,t.next=3,e.$store.dispatch("userModules/logOut",{uid:n});case 3:if(s=t.sent,s){t.next=6;break}return t.abrupt("return");case 6:localStorage.removeItem("user"),sessionStorage.removeItem("user"),(0,c.BK)(s.data.message[e.$i18n.locale]),e.$store.commit("userModules/LOGIN_STATUS",!1),e.$router.push({name:"home"});case 11:case"end":return t.stop()}}),t)})))()}},mounted:function(){var e=this;document.addEventListener("click",(function(t){e.$el.contains(t.target)||e.uiReset()})),this.langs.forEach((function(t){t.value===e.$i18n.locale&&(e.currentLang=t.title)}))}},d=u,m=a(1001),f=(0,m.Z)(d,i,o,!1,null,null,null),v=f.exports,h=function(){var e,t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"admin-modal",class:{isUpdateModal:t.isUpdateModal,isDeleteModal:t.isDeleteModal},on:{click:function(e){return e.target!==e.currentTarget?null:t.closeModal.apply(null,arguments)}}},[n("div",{staticClass:"update-modal"},[n("div",{staticClass:"header"},[t.room?n("h1",{staticClass:"modal-title fw-bold"},[t._v(t._s(t.room.title[t.locale]))]):t._e(),n("button",{staticClass:"btn-close",attrs:{type:"button"},on:{click:t.closeModal}})]),n("div",{staticClass:"body"},[n("DatePicker",{staticClass:"rounded-0",attrs:{"is-range":"","is-expanded":"",locale:{id:t.locale,firstDayOfWeek:2,masks:{weekdays:"W"}},attributes:t.attributes,"select-attribute":t.selectDragAttribute,"drag-attribute":t.selectDragAttribute,"disabled-dates":[{ordinalWeekdays:(e={},e[-1]=5,e)}],"min-date":new Date,"max-date":(new Date).setDate((new Date).getDate()+30)},model:{value:t.range,callback:function(e){t.range=e},expression:"range"}}),n("ul",{staticClass:"expense"},[t.weekdays.length>0?n("li",{staticClass:"item"},[n("span",[void 0!==t.room?n("i18n-n",{attrs:{value:t.weekdaysPrice,format:"currency",locale:t.locale}}):t._e(),t._v(" x "+t._s(t.weekdays.length)+" "+t._s(t.$t("calendar.night"))+" ")],1),void 0!==t.room?n("i18n-n",{attrs:{value:t.calculate("weekdays"),format:"currency",locale:t.locale}}):t._e()],1):t._e(),t.weekend.length>0?n("li",{staticClass:"item"},[n("span",[void 0!==t.room?n("i18n-n",{attrs:{value:t.weekendPrice,format:"currency",locale:t.locale}}):t._e(),t._v(" x "+t._s(t.weekend.length)+" "+t._s(t.$t("calendar.night"))+" ")],1),void 0!==t.room?n("i18n-n",{attrs:{value:t.calculate("weekend"),format:"currency",locale:t.locale}}):t._e()],1):t._e(),n("li",{staticClass:"item"},[n("span",[t._v(t._s(t.$t("calendar.fee")))]),t.room?n("i18n-n",{attrs:{value:t.room.fee[t.locale],format:"currency",locale:t.locale}}):t._e()],1),n("li",{staticClass:"total"},[n("span",[t._v(t._s(t.$t("calendar.total")))]),void 0!==t.room?n("i18n-n",{attrs:{value:t.calculate("total"),format:"currency",locale:t.locale}}):t._e()],1)])],1),n("div",{staticClass:"footer"},[n("a",{staticClass:"update-btn",on:{click:function(e){return e.preventDefault(),t.updateOrder.apply(null,arguments)}}},[t._v(t._s(t.$t("admin.update")))])])]),n("div",{staticClass:"delete-modal"},[n("div",{staticClass:"header"},[n("h1",{staticClass:"fw-bold"},[t._v(t._s(t.$t("admin.confirm")))]),n("button",{staticClass:"btn-close",attrs:{type:"button"},on:{click:t.closeModal}})]),n("div",{staticClass:"footer"},[n("button",{staticClass:"delete-btn",attrs:{type:"button"},on:{click:function(e){return e.preventDefault(),t.deleteOrder.apply(null,arguments)}}},[t._v(t._s(t.$t("admin.delete")))])])])])},g=[],p=a(6782),k=a.n(p),_=a(629),w={components:{DatePicker:k()},data:function(){return{attributes:[{key:"today",highlight:{fillMode:"outline",style:{background:"#EA5B5B",border:"#2D3643"},contentStyle:{color:"#fff"},contentClass:""},dates:new Date}],selectDragAttribute:{highlight:{start:{style:{backgroundColor:"#569DC3"},contentStyle:{color:"#ffffff"}},base:{style:{backgroundColor:"#E3E6E9"},contentStyle:{color:"#748290"}},end:{style:{backgroundColor:"#569DC3"},contentStyle:{color:"#ffffff"}},order:10}},isShow:!1,weekdays:[],weekend:[],value:""}},computed:(0,r.Z)((0,r.Z)({},(0,_.Se)("orderModules",["modalData","isUpdateModal","isDeleteModal"])),{},{range:{get:function(){return this.$store.state.orderModules.range},set:function(e){this.$store.commit("orderModules/SET_RANGE",e)}},locale:function(){return this.$i18n.locale},room:function(){return this.modalData.room},order:function(){return this.modalData.order},fee:function(){return this.room.fee[this.$i18n.locale]},weekdaysPrice:function(){return this.room.weekdaysPrice[this.$i18n.locale]},weekendPrice:function(){return this.room.weekendPrice[this.$i18n.locale]}}),watch:{range:function(e){var t=(0,c.pC)(new Date(e.start),new Date(e.end)),a=t.weekdays,n=t.weekend;this.weekdays=a,this.weekend=n}},methods:{updateOrder:function(){var e=this;return(0,l.Z)(regeneratorRuntime.mark((function t(){var a,n,s,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={oid:e.order.oid,rid:e.room._id,range:e.range},n=(0,c.qn)(),s=n.access_token,r={headers:{Authorization:"Bearer ".concat(s)}},t.next=5,e.$store.dispatch("orderModules/updateOrder",{data:a,config:r});case 5:return i=t.sent,t.next=8,e.getOrders();case 8:e.closeModal(),(0,c.BK)(i.data.message[e.$i18n.locale]);case 10:case"end":return t.stop()}}),t)})))()},deleteOrder:function(){var e=this;return(0,l.Z)(regeneratorRuntime.mark((function t(){var a,n,s,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=(0,c.qn)(),n=a.access_token,s={headers:{Authorization:"Bearer ".concat(n)}},r=e.modalData,t.next=5,e.$store.dispatch("orderModules/deleteOrder",{data:r,config:s});case 5:return i=t.sent,e.$store.commit("orderModules/CLOSE_MODAL",!1),t.next=9,e.getOrders();case 9:(0,c.BK)(i.data.message[e.$i18n.locale]);case 10:case"end":return t.stop()}}),t)})))()},getOrders:function(){var e=this;return(0,l.Z)(regeneratorRuntime.mark((function t(){var a,n,s,r,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$store.dispatch("updateLoading",!0),a=(0,c.qn)(),n=a.access_token,s=a.uid,r={headers:{Authorization:"Bearer "+n},params:{uid:s}},t.next=5,e.$store.dispatch("orderModules/getOrders",r);case 5:i={tab:null,isFinding:!1},e.$store.commit("orderModules/CLASSIFY",i),e.$store.dispatch("updateLoading",!1);case 8:case"end":return t.stop()}}),t)})))()},calculate:function(e){var t={key:e,weekdaysPrice:this.weekdaysPrice,weekendPrice:this.weekendPrice,weekdaysLth:this.weekdays.length,weekendLth:this.weekend.length,fee:this.fee};return(0,c.e_)(t)},closeModal:function(){this.$store.commit("orderModules/CLOSE_MODAL",!1)}}},C=w,y=(0,m.Z)(C,h,g,!1,null,null,null),b=y.exports,$=a(7711),D={components:{FooterMap:$.Z,AdminNav:v,AdminModal:b},computed:(0,r.Z)({},(0,_.Se)(["isLoading"])),data:function(){return{}}},M=D,L=(0,m.Z)(M,n,s,!1,null,null,null),x=L.exports}}]);
//# sourceMappingURL=334-legacy.85d75236.js.map