(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"2ecf":function(e,t,n){"use strict";(function(e){n("6965");r(n("66fd"));var t=r(n("9ce1"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},7245:function(e,t,n){"use strict";var r=n("85c9"),o=n.n(r);o.a},"85c9":function(e,t,n){},"9ce1":function(e,t,n){"use strict";n.r(t);var r=n("b5f1"),o=n("c150");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("7245");var u,i=n("f0c5"),c=Object(i["a"])(o["default"],r["b"],r["c"],!1,null,"79d68208",null,!1,r["a"],u);t["default"]=c.exports},b5f1:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}));var r={uniPopup:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-popup/components/uni-popup/uni-popup")]).then(n.bind(null,"988c"))}},o=function(){var e=this,t=e.$createElement;e._self._c},a=[]},c01f:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=i(n("a34a")),o=i(n("73a2")),a=n("f6f9"),u=i(n("b8ca"));function i(e){return e&&e.__esModule?e:{default:e}}function c(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=f(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u=!0,i=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return u=e.done,e},e:function(e){i=!0,a=e},f:function(){try{u||null==n.return||n.return()}finally{if(i)throw a}}}}function s(e,t){return d(e)||m(e,t)||f(e,t)||l()}function l(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function f(e,t){if(e){if("string"===typeof e)return p(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function m(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,a=void 0;try{for(var u,i=e[Symbol.iterator]();!(r=(u=i.next()).done);r=!0)if(n.push(u.value),t&&n.length===t)break}catch(c){o=!0,a=c}finally{try{r||null==i["return"]||i["return"]()}finally{if(o)throw a}}return n}}function d(e){if(Array.isArray(e))return e}function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){v(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function b(e,t,n,r,o,a,u){try{var i=e[a](u),c=i.value}catch(s){return void n(s)}i.done?t(c):Promise.resolve(c).then(r,o)}function y(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function u(e){b(a,r,o,u,i,"next",e)}function i(e){b(a,r,o,u,i,"throw",e)}u(void 0)}))}}var w=function(){n.e("pages/index/components/panel").then(function(){return resolve(n("c6e2"))}.bind(null,n)).catch(n.oe)},k=function(){Promise.all([n.e("common/vendor"),n.e("pages/index/components/tools")]).then(function(){return resolve(n("9558"))}.bind(null,n)).catch(n.oe)},x={data:function(){return{rotate:!1,isLogin:!1,timer:null,timer2:null,latitude:36.026226,longitude:103.75202,scenery:"未定位到景区",polygons:[],manual:!1,markerInfo:{},markers:[],menuItems:[],menuArr:Object.freeze([{name:"消息",icon:"icon_quanbuxiaoxi@2x",url:"/pages/message/message"},{name:"组团",icon:"icon_quanbuzutuan@2x",url:"/pages/group/group"},{name:"个人中心",icon:"icon_quanbugerenzhongxin@2x",url:"/pages/personal/personal"},{name:"发布消息",icon:"icon_quanbufabuxiaoxi@2x",url:"/pages/publish/publish"}])}},computed:{menuItemsRes:function(){return this.menuItems.length?this.menuItems:this.menuArr.filter((function(e){return"个人中心"===e.name}))}},onShow:function(){if(e.setNavigationBarTitle({title:"途咪导游端"}),this.isLogin=e.getStorageSync("token")&&e.getStorageSync("customerInfo"),e.getStorageSync("token")&&!e.getStorageSync("customerInfo"))return e.redirectTo({url:"/pages/admin/admin"});this.getLocation(),this.queryGroup()},onUnload:function(){clearInterval(this.timer),clearInterval(this.timer2),this.timer=null,this.timer2=null,e.offLocationChange()},methods:{login:function(){e.navigateTo({url:"/pages/login/login"})},queryGroup:function(){var e=this;return y(r.default.mark((function t(){var n,o;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.isLogin){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,(0,a.isCreateTeam)();case 4:n=t.sent,o=n.value,o?(e.menuItems=e.menuArr.map((function(e){return"组团"===e.name?h(h({},e),{},{name:"我的团",url:"/pages/myGroup/myGroup"}):e})),getApp().globalData.touristTeamNo=o,e.getTourist(),e.getNewSos()):(getApp().globalData.touristTeamNo="",e.menuItems=e.menuArr.map((function(e){return"我的团"===e.name?h(h({},e),{},{name:"组团",url:"/pages/group/group"}):e})).filter((function(e){return"发布消息"!==e.name})),e.markers=[]);case 7:case"end":return t.stop()}}),t)})))()},getNewSos:function(){var e=this;if(this.isLogin&&!this.timer2){var t=function t(){return e.getSos(),t};this.timer2=setInterval(t(),5e3)}},getSos:function(){return y(r.default.mark((function t(){var n;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,a.getSos)();case 2:if(n=t.sent,1!==n.value){t.next=7;break}return t.next=6,(0,a.delSos)();case 6:e.showModal({content:"您收到一条新的sos消息，请查看",success:function(){var t=y(r.default.mark((function t(n){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n.confirm&&e.navigateTo({url:"/pages/sos/sos"});case 1:case"end":return t.stop()}}),t)})));function n(e){return t.apply(this,arguments)}return n}()});case 7:case"end":return t.stop()}}),t)})))()},getTourist:function(){var e=this;return y(r.default.mark((function t(){var n,o;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,a.queryTeamInfo)({customerId:""});case 2:n=t.sent,o=n.value.member,e.member=o.map((function(e){var t=u.default.transform([+e.lon,+e.lat],u.default.BD09,u.default.GCJ02),n=s(t,2),r=n[0],o=n[1];return h(h({},e),{},{lon:r,lat:o})})),e.markers=e.member.map((function(e){return{height:71,iconPath:"/static/youke@2x.png",id:e.id,latitude:e.lat,longitude:e.lon,width:54}}));case 6:case"end":return t.stop()}}),t)})))()},getScenery:function(){var e=this;return y(r.default.mark((function t(){var n;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,a.querySceneryNum)({lat:getApp().globalData.latitude,lon:getApp().globalData.longitude});case 2:n=t.sent,n.value?(e.scenery=n.value.name,getApp().globalData.sceneryNo=n.value.no,e.getFence()):(e.scenery="未定位到景区",getApp().globalData.sceneryNo="",getApp().globalData.touristTeamNo||(e.polygons=[],e.marker=[],e.markerInfo={}));case 4:case"end":return t.stop()}}),t)})))()},startTimer:function(){var e=this;if(this.isLogin&&!this.timer){var t=function t(){return e.getScenery(),t};this.timer=setInterval(t(),3e4)}},getLocation:function(){var t=this;return y(r.default.mark((function n(){var o,i,c,l,f,p,m;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.getLocation({type:"gcj02"});case 2:if(o=n.sent,i=s(o,2),c=i[0],l=i[1],!c){n.next=16;break}return n.next=9,e.getSetting();case 9:f=n.sent,p=s(f,2),p[0],m=p[1],!1===m.authSetting["scope.userLocation"]&&e.showModal({title:"提示",content:"检测到您拒绝了地理位置授权，这将无法获取到正确的位置，请打开设置界面手动开启权限。 ",success:function(){var n=y(r.default.mark((function n(o){var a,u,i,c;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(a=o.confirm,!a){n.next=11;break}return n.next=4,e.openSetting();case 4:u=n.sent,i=s(u,2),i[0],c=i[1],c.authSetting["scope.userLocation"]&&t.getLocation(),n.next=12;break;case 11:e.showToast({title:"授权失败",icon:"none",duration:1e3});case 12:case"end":return n.stop()}}),n)})));function o(e){return n.apply(this,arguments)}return o}()}),n.next=22;break;case 16:t.latitude=l.latitude,t.longitude=l.longitude,getApp().globalData.latitude=l.latitude,getApp().globalData.longitude=l.longitude,t.startTimer(),e.startLocationUpdate({success:function(){e.onLocationChange(function(){var n=y(r.default.mark((function n(o){var i,c,l,f,p,m,d,g;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.isLogin){n.next=2;break}return n.abrupt("return");case 2:if(i=u.default.transform([o.longitude,o.latitude],u.default.GCJ02,u.default.BD09),c=s(i,2),l=c[0],f=c[1],getApp().globalData.latitude=f,getApp().globalData.longitude=l,p=JSON.parse(e.getStorageSync("customerInfo")),m=p.no,d=p.imei,g=p.phone,!getApp().globalData.sceneryNo||!getApp().globalData.touristTeamNo){n.next=10;break}return console.log("uploading..."),n.next=10,(0,a.uploadLocation)([{sceneryNo:getApp().globalData.sceneryNo,customerNo:m,imei:d||g,lat:f,lon:l,touristTeamNo:getApp().globalData.touristTeamNo}]);case 10:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}())}});case 22:case"end":return n.stop()}}),n)})))()},getFence:function(){var e=this;return y(r.default.mark((function t(){var n,o;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,a.queryFence)({sceneryNo:getApp().globalData.sceneryNo});case 2:n=t.sent,o=n.value.list,e.polygons=o.map((function(e){var t=e.scope.split(";"),n=t.map((function(e){var t=e.split(","),n=s(t,2),r=n[0],o=n[1],a=u.default.transform([+r,+o],u.default.BD09,u.default.GCJ02),i=s(a,2),c=i[0],l=i[1];return{latitude:l,longitude:c}}));return{points:n,strokeColor:"#0DC392",strokeWidth:2,fillColor:"#07C28F26"}}));case 5:case"end":return t.stop()}}),t)})))()},moveToLocation:function(){var t=e.createMapContext("map");t.moveToLocation()},refresh:function(){var t=this;this.rotate=!0,e.showLoading({mask:!0,title:"更新数据中"}),this.getScenery(),this.queryGroup(),setTimeout((function(n){t.rotate=!1,e.hideLoading()}),1e3)},markertap:function(e){var t=this;this.markerInfo={},this.$refs.popup.open(),this.$nextTick((function(n){return t.createMakerInfo(e.detail.markerId)}))},createMakerInfo:function(t){var n,r=this,a=c(this.member);try{var u=function(){var a=n.value;if(a.id===t)return e.getLocation({type:"gcj02",success:function(e){var t=e.latitude,n=e.longitude,u=new o.default({key:"56LBZ-OKVCW-TP3RL-RVH7P-RDRIQ-4EB2T"}),i=function(e,t){return{nickName:e.nickName,distance:t,battery:e.battery,no:e.no,imei:e.imei,phone:e.phone,lon:e.lon,lat:e.lat}};u.direction({mode:"walking",from:{latitude:t,longitude:n},to:{latitude:a.lat,longitude:a.lon},success:function(e){var t=e.result.routes[0].distance;r.markerInfo=i(a,t)},fail:function(e){r.markerInfo=i(a,-1)}})}}),"break"};for(a.s();!(n=a.n()).done;){var i=u();if("break"===i)break}}catch(s){a.e(s)}finally{a.f()}}},components:{tools:k,panel:w}};t.default=x}).call(this,n("543d")["default"])},c150:function(e,t,n){"use strict";n.r(t);var r=n("c01f"),o=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=o.a}},[["2ecf","common/runtime","common/vendor"]]]);