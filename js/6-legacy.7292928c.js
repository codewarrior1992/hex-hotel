"use strict";(self["webpackChunkhex_hotel"]=self["webpackChunkhex_hotel"]||[]).push([[6],{2841:function(e,t,s){s.d(t,{Z:function(){return m}});var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("header",[s("nav",{staticClass:"room-navigation",class:{isActive:e.isNav}},[s("ul",{staticClass:"links"},[s("li",{staticClass:"logo-item"},[s("router-link",{staticClass:"logo",attrs:{to:"/",href:"#"}},[s("span",[e._v("HH")])])],1),e.currentRoute?s("li",{staticClass:"dropdown-btn room-item",class:{isActive:e.isRoom}},[s("a",{staticClass:"room",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.behaviorHandler("room")}}},[s("span",{staticClass:"material-symbols-outlined"},[e._v(" hotel ")]),s("span",{staticClass:"main-text"},[e._v(e._s(e.$t("navbar.style")))]),s("span",{staticClass:"material-symbols-outlined"},[e._v(" arrow_drop_down ")])]),s("ul",{staticClass:"dropdown-room"},e._l(e.rooms,(function(t,a){return s("li",{key:a},[s("a",{staticClass:"room",on:{click:function(s){return s.preventDefault(),e.pickRoom(t._id)}}},[e._v(e._s(t.title[e.$i18n.locale]))])])})),0)]):e._e(),s("li",{staticClass:"dropdown-btn lang-item",class:{isActive:e.isLang}},[s("a",{staticClass:"lang",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.behaviorHandler("lang")}}},[s("span",{staticClass:"material-symbols-outlined"},[e._v(" language ")]),s("span",{staticClass:"main-text"},[e._v(e._s(e.currentLang))]),s("span",{staticClass:"material-symbols-outlined"},[e._v(" arrow_drop_down ")])]),s("ul",{staticClass:"dropdown-lang"},e._l(e.langs,(function(t,a){return s("li",{key:a},[s("a",{attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),e.langPicker(t)}}},[e._v(e._s(t.title))])])})),0)]),e.isLogIn?s("li",{staticClass:"dropdown-btn user-item ",class:{isActive:e.isAdmin}},[s("a",{staticClass:"user",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.behaviorHandler("admin")}}},[s("span",{staticClass:"material-symbols-outlined"},[e._v(" account_circle ")]),s("span",{staticClass:"main-text"},[e._v(e._s(e.$t("navbar.user")))]),s("span",{staticClass:"material-symbols-outlined"},[e._v(" arrow_drop_down ")])]),s("ul",{staticClass:"dropdown-admin"},[s("li",[s("router-link",{attrs:{to:"/admin"}},[e._v(e._s(e.$t("navbar.dashboard")))])],1),s("li",[s("a",{staticClass:"toggle-content",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.logOut.apply(null,arguments)}}},[e._v(e._s(e.$t("navbar.out")))])])])]):s("li",{staticClass:"user-item"},[s("a",{staticClass:"user",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.openUserModal.apply(null,arguments)}}},[s("span",{staticClass:"material-symbols-outlined"},[e._v(" account_circle ")]),s("span",{staticClass:"main-text"},[e._v(e._s(e.$t("navbar.in")))])])])]),s("a",{staticClass:"toggle-btn",attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.isNav=!e.isNav}}},[s("span",{staticClass:"material-symbols-outlined"},[e._v(" menu ")])])])])},i=[],n=s(3019),r=s(6198),o=(s(5666),s(8309),s(6699),s(2023),s(1539),s(4747),s(6407)),l=s(629),c={data:function(){return{langs:[{title:"繁體中文",value:"zh-TW"},{title:"English",value:"en-US"},{title:"にほんご",value:"ja-JP"}],currentLang:"繁體中文",isNav:!1,isRoom:!1,isLang:!1,isLoading:!1,isAdmin:!1}},methods:{behaviorHandler:function(e){switch(e){case"room":this.isRoom=!this.isRoom,this.isDate=!1,this.isLang=!1,this.isAdmin=!1;break;case"lang":this.isLang=!this.isLang,this.isDate=!1,this.isRoom=!1,this.isAdmin=!1;break;case"admin":this.isAdmin=!this.isAdmin,this.isLang=!1,this.isDate=!1,this.isRoom=!1}},langPicker:function(e){this.currentLang=e.title,this.isLang=!this.isLang,this.$i18n.locale=e.value,localStorage.setItem("locale",e.value)},uiReset:function(){this.isDate=!1,this.isRoom=!1,this.isLang=!1,this.isNav=!1,this.isAdmin=!1},getRooms:function(){var e=this;return(0,r.Z)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if("room"==e.$route.name){t.next=2;break}return t.abrupt("return");case 2:e.$store.dispatch("roomModules/getRooms");case 3:case"end":return t.stop()}}),t)})))()},pickRoom:function(e){this.$emit("page-update",e),this.isRoom=!1},openUserModal:function(){this.uiReset(),this.$store.commit("userModules/USER_MODAL",!0)},logOut:function(){var e=this;return(0,r.Z)(regeneratorRuntime.mark((function t(){var s,a,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return s=(0,o.qn)(),a=s.uid,t.next=3,e.$store.dispatch("userModules/logOut",{uid:a});case 3:if(i=t.sent,i){t.next=6;break}return t.abrupt("return");case 6:localStorage.removeItem("user"),sessionStorage.removeItem("user"),e.$store.dispatch("userModules/updateLogInStatus",!1),e.$router.push({name:"home"}),(0,o.BK)(i.data.message[e.$i18n.locale]);case 11:case"end":return t.stop()}}),t)})))()}},computed:(0,n.Z)((0,n.Z)((0,n.Z)({},(0,l.Se)("userModules",["isLogIn"])),(0,l.Se)("roomModules",["rooms"])),{},{currentRoute:function(){return!this.$route.path.includes("/reserve")}}),created:function(){var e=this;return(0,r.Z)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.getRooms(),localStorage.getItem("user")||sessionStorage.getItem("user")?e.$store.commit("userModules/LOGIN_STATUS",!0):e.$store.commit("userModules/LOGIN_STATUS",!1);case 2:case"end":return t.stop()}}),t)})))()},mounted:function(){var e=this;document.addEventListener("click",(function(t){e.$el.contains(t.target)||e.uiReset()})),this.langs.forEach((function(t){t.value===e.$i18n.locale&&(e.currentLang=t.title)}))},beforeDestroy:function(){window.removeEventListener("scroll",this.scrollFun)}},u=c,d=s(1001),v=(0,d.Z)(u,a,i,!1,null,null,null),m=v.exports},5006:function(e,t,s){s.r(t),s.d(t,{default:function(){return h}});var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"reserve-page"},[s("Loading-effect",{attrs:{active:e.isLoading},on:{"update:active":function(t){e.isLoading=t}}},[s("div",{staticClass:"loadingio-spinner-spinner-6hzyekklbs"},[s("div",{staticClass:"ldio-t40shzjf6m9"},[s("div"),s("div"),s("div"),s("div"),s("div"),s("div"),s("div"),s("div"),s("div"),s("div"),s("div"),s("div")])])]),s("ReserveNav"),s("div",{staticClass:"container"},[s("ul",{staticClass:"process"},[s("li",{class:{active:e.reserve.main}},[e._v(e._s(e.$t("reserve.info")))]),s("li",{class:{active:e.reserve.payment}},[e._v(e._s(e.$t("reserve.payment")))]),s("li",{class:{active:e.reserve.done}},[e._v(e._s(e.$t("reserve.reserved")))])]),s("div",{staticClass:"content"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-xl-7 col-lg-7 col-md-12 mx-auto"},[s("router-view")],1),"done"!=e.$route.name?s("div",{staticClass:"col-xl-5 col-lg-5 col-md-12"},[Object.values(e.room).length>0&&Object.values(e.range).length>0?s("ul",{staticClass:"room-info"},[s("li",{staticClass:"image"},[s("img",{attrs:{src:e.room.images[0],alt:""}})]),s("li",{staticClass:"title"},[s("h2",[e._v(e._s(e.title))])]),s("li",{staticClass:"in"},[s("span",{staticClass:"material-icons"},[e._v(" date_range ")]),s("span",[e._v(e._s(e.$t("reserve.in")))]),s("span",[e._v(e._s(new Date(e.range.start).toLocaleDateString()))])]),s("li",{staticClass:"out"},[s("span",{staticClass:"material-icons"},[e._v(" date_range ")]),s("span",[e._v(e._s(e.$t("reserve.out")))]),s("span",[e._v(e._s(new Date(e.range.end).toLocaleDateString()))])]),s("li",{staticClass:"price"},[s("ul",[0!=e.weekdays?s("li",[s("span",[s("i18n-n",{attrs:{value:e.weekdaysPrice,format:"currency",locale:e.locale}}),e._v(" x "+e._s(e.weekdays.length)+" "+e._s(e.$t("reserve.night"))+" ")],1),s("span",[s("i18n-n",{attrs:{value:e.calculate("weekdays"),format:"currency",locale:e.$i18n.locale}})],1)]):e._e(),0!=e.weekend?s("li",[s("span",[s("i18n-n",{attrs:{value:e.weekendPrice,format:"currency",locale:e.locale}}),e._v(" x "+e._s(e.weekend.length)+" "+e._s(e.$t("reserve.night"))+" ")],1),s("span",[s("i18n-n",{attrs:{value:e.calculate("weekend"),format:"currency",locale:e.locale}})],1)]):e._e(),s("li",[s("span",[e._v(e._s(e.$t("reserve.fee")))]),s("i18n-n",{attrs:{value:e.fee,format:"currency",locale:e.$i18n.locale}})],1)]),s("div",{staticClass:"total"},[s("span",[e._v(e._s(e.$t("reserve.total")))]),e.room?s("i18n-n",{attrs:{value:e.calculate("total"),format:"currency",locale:e.locale}}):e._e()],1)])]):e._e()]):e._e()])])]),s("FooterMap")],1)},i=[],n=s(3019),r=s(2841),o=s(7711),l=s(6407),c=s(629),u={components:{ReserveNav:r.Z,FooterMap:o.Z},data:function(){return{room:{},range:{},reserve:{main:!1,payment:!1,done:!1},weekdays:[],weekend:[]}},computed:(0,n.Z)((0,n.Z)({},(0,c.Se)(["isLoading"])),{},{locale:function(){return this.$i18n.locale},fee:function(){return this.room.fee[this.$i18n.locale]},title:function(){return this.room.title[this.$i18n.locale]},weekdaysPrice:function(){return this.room.weekdaysPrice[this.$i18n.locale]},weekendPrice:function(){return this.room.weekendPrice[this.$i18n.locale]}}),watch:{"$route.path":{handler:function(e){switch(e){case"/reserve/":this.reserve.main=!0;break;case"/reserve/payment":this.reserve.main=!0,this.reserve.payment=!0;break;case"/reserve/done":this.reserve.main=!0,this.reserve.payment=!0,this.reserve.done=!0;break;default:break}},deep:!0,immediate:!0}},methods:{calculate:function(e){var t={key:e,weekdaysPrice:this.weekdaysPrice,weekendPrice:this.weekendPrice,weekdaysLth:this.weekdays.length,weekendLth:this.weekend.length,fee:this.fee};return(0,l.e_)(t)}},created:function(){if(!sessionStorage.getItem("booking"))return this.$router.push({name:"home"});this.$store.dispatch("updateLoading",!0);var e=JSON.parse(sessionStorage.getItem("booking")),t=e.room,s=e.range;this.room=t,this.range=s;var a=(0,l.pC)(new Date(s.start),new Date(s.end)),i=a.weekend,n=a.weekdays;this.weekdays=n,this.weekend=i,this.$store.dispatch("updateLoading",!1)}},d=u,v=s(1001),m=(0,v.Z)(d,a,i,!1,null,null,null),h=m.exports}}]);
//# sourceMappingURL=6-legacy.7292928c.js.map