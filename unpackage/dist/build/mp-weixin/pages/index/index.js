(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"2ecf":function(e,t,n){"use strict";(function(e){n("6965");r(n("66fd"));var t=r(n("9ce1"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"4b25":function(e,t,n){},"6b1f":function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return r}));var r={uniPopup:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-popup/uni-popup")]).then(n.bind(null,"d9ba"))}},a=function(){var e=this,t=e.$createElement;e._self._c},o=[]},"9ce1":function(e,t,n){"use strict";n.r(t);var r=n("6b1f"),a=n("c150");for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("b9ed");var i,u=n("f0c5"),c=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,"249b0962",null,!1,r["a"],i);t["default"]=c.exports},b9ed:function(e,t,n){"use strict";var r=n("4b25"),a=n.n(r);a.a},c01f:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=u(n("a34a")),a=u(n("73a2")),o=n("f6f9"),i=u(n("b8ca"));function u(e){return e&&e.__esModule?e:{default:e}}function c(e,t){return f(e)||l(e,t)||d(e,t)||s()}function s(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,o=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done);r=!0)if(n.push(i.value),t&&n.length===t)break}catch(c){a=!0,o=c}finally{try{r||null==u["return"]||u["return"]()}finally{if(a)throw o}}return n}}function f(e){if(Array.isArray(e))return e}function p(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=d(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,u=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){u=!0,o=e},f:function(){try{i||null==n.return||n.return()}finally{if(u)throw o}}}}function d(e,t){if(e){if("string"===typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function g(e,t,n,r,a,o,i){try{var u=e[o](i),c=u.value}catch(s){return void n(s)}u.done?t(c):Promise.resolve(c).then(r,a)}function h(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function i(e){g(o,r,a,i,u,"next",e)}function u(e){g(o,r,a,i,u,"throw",e)}i(void 0)}))}}var v=function(){n.e("pages/index/components/panel").then(function(){return resolve(n("c6e2"))}.bind(null,n)).catch(n.oe)},b=function(){Promise.all([n.e("common/vendor"),n.e("pages/index/components/tools")]).then(function(){return resolve(n("9558"))}.bind(null,n)).catch(n.oe)},y={data:function(){return{isLogin:!1,timer:null,latitude:36.026226,longitude:103.75202,scenery:"未定位到景区",polygons:[],markerType:"scenicSpot",curMarkerId:0,manual:!1,markerInfo:{},markers:[],menuItems:[{name:"景点",icon:"icon_quanbujingdian@2x",type:"scenicSpot"},{name:"设施",icon:"icon_jingdiansheshi@2x",type:"facilities"},{name:"消息",icon:"icon_quanbuxiaoxi@2x",url:"/pages/message/message"},{name:"组团",icon:"icon_quanbuzutuan@2x",url:"/pages/group/group"},{name:"个人中心",icon:"icon_quanbugerenzhongxin@2x",url:"/pages/personal/personal"},{name:"发布消息",icon:"icon_quanbufabuxiaoxi@2x",url:"/pages/publish/publish"}],iconPath:new Map([["FAC_ALM","alm"],["FAC_WC","toilet"],["FAC_DOOR","door"],["FAC_SELL","shop"],["FAC_SERVICE","servicestation"]]),facilitiesData:[],scenicSpotData:[]}},onShow:function(){e.setNavigationBarTitle({title:"途咪导游机"}),e.getStorageSync("token")&&(this.isLogin=!0),this.getLocation(),this.queryGroup()},onLoad:function(){new a.default({key:"56LBZ-OKVCW-TP3RL-RVH7P-RDRIQ-4EB2T"})},onUnload:function(){clearInterval(this.timer),this.timer=null},methods:{login:function(){e.navigateTo({url:"/pages/login/login"})},queryGroup:function(){var e=this;return h(r.default.mark((function t(){var n,a,i;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.isLogin){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,(0,o.isCreateTeam)();case 4:if(n=t.sent,a=n.value,a)e.menuItems=e.menuItems.map((function(e){return"组团"===e.name&&(e.name="我的团",e.url="/pages/myGroup/myGroup"),e})),getApp().globalData.touristTeamNo=a,e.getTourist();else for(getApp().globalData.touristTeamNo="",e.menuItems=e.menuItems.map((function(e){return"我的团"===e.name&&(e.name="组团",e.url="/pages/group/group"),e})),i=0;i<e.markers.length;i++)"y"===e.markers[i].id.substr(0,1)&&(e.markers.splice(i,1),i--);case 7:case"end":return t.stop()}}),t)})))()},changeMarker:function(t){e.showToast({icon:"none",title:"当前显示".concat("scenicSpot"===t?"景点":"设施")}),this.manual=!0,this.markerType=t,this.getMarkers(this.markerType)},getMarkers:function(e){"scenicSpot"===e?this.getScenicSpot():this.getFacilities()},getTourist:function(){var e=this;return h(r.default.mark((function t(){var n,a,u,s,l,f,d,m,g,h,v,b,y;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,o.queryTeamInfo)();case 2:n=t.sent,a=n.value.member,u=p(a);try{for(u.s();!(s=u.n()).done;)l=s.value,f=i.default.transform([parseFloat(l.lon),parseFloat(l.lat)],i.default.BD09,i.default.GCJ02),d=c(f,2),m=d[0],g=d[1],l.lon=m,l.lat=g}catch(r){u.e(r)}finally{u.f()}if(JSON.stringify(a)!==JSON.stringify(e.member)){t.next=8;break}return t.abrupt("return",console.log("重复数据不予添加"));case 8:for(h=0;h<e.markers.length;h++)"y"===e.markers[h].id.substr(0,1)&&(e.markers.splice(h,1),h--);e.member=a,v=p(a),t.prev=11,v.s();case 13:if((b=v.n()).done){t.next=20;break}if(y=b.value,y.lon&&y.lat){t.next=17;break}return t.abrupt("continue",18);case 17:e.markers.push({height:71,iconPath:"/static/youke@2x.png",id:"y"+y.id,latitude:y.lat,longitude:y.lon,width:54});case 18:t.next=13;break;case 20:t.next=25;break;case 22:t.prev=22,t.t0=t["catch"](11),v.e(t.t0);case 25:return t.prev=25,v.f(),t.finish(25);case 28:case"end":return t.stop()}}),t,null,[[11,22,25,28]])})))()},getScenery:function(){var e=this;return h(r.default.mark((function t(){var n;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,o.querySceneryNum)({lat:getApp().globalData.latitude,lon:getApp().globalData.longitude});case 2:if(n=t.sent,n.value){t.next=5;break}return t.abrupt("return");case 5:e.scenery=n.value.name,getApp().globalData.sceneryNo=n.value.no,e.getFence(),e.getMarkers(e.markerType);case 9:case"end":return t.stop()}}),t)})))()},getFacilities:function(){var e=this;return h(r.default.mark((function t(){var n,a,u,s,l,f,d,m,g;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,o.queryFacilities)({sceniceNo:getApp().globalData.sceneryNo});case 2:n=t.sent,a=p(n.value);try{for(a.s();!(u=a.n()).done;)s=u.value,l=i.default.transform([parseFloat(s.lon),parseFloat(s.lat)],i.default.BD09,i.default.GCJ02),f=c(l,2),d=f[0],m=f[1],s.lon=d,s.lat=m}catch(r){a.e(r)}finally{a.f()}if(JSON.stringify(n.value)!==JSON.stringify(e.facilitiesData)||e.manual){t.next=7;break}return t.abrupt("return",console.log("重复数据不予添加"));case 7:for(e.manual=!1,g=0;g<e.markers.length;g++)"y"!==e.markers[g].id.substr(0,1)&&(e.markers.splice(g,1),g--);e.facilitiesData=n.value,n.value.forEach((function(t){e.markers.push({height:78,iconPath:"/static/".concat(e.iconPath.get(t.type),".png"),id:"s"+t.id,latitude:t.lat,longitude:t.lon,width:65})}));case 11:case"end":return t.stop()}}),t)})))()},getScenicSpot:function(){var e=this;return h(r.default.mark((function t(){var n,a,u,s,l,f,d,m,g;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,o.queryScenicSpot)({sceniceNo:getApp().globalData.sceneryNo});case 2:n=t.sent,a=p(n.value);try{for(a.s();!(u=a.n()).done;)s=u.value,l=i.default.transform([parseFloat(s.lon),parseFloat(s.lat)],i.default.BD09,i.default.GCJ02),f=c(l,2),d=f[0],m=f[1],s.lon=d,s.lat=m}catch(r){a.e(r)}finally{a.f()}if(JSON.stringify(n.value)!==JSON.stringify(e.scenicSpotData)||e.manual){t.next=7;break}return t.abrupt("return",console.log("重复数据不予添加"));case 7:for(e.manual=!1,g=0;g<e.markers.length;g++)"y"!==e.markers[g].id.substr(0,1)&&(e.markers.splice(g,1),g--);e.scenicSpotData=n.value,n.value.forEach((function(t){e.markers.push({height:78,iconPath:"/static/scenery.png",id:"j"+t.id,latitude:t.lat,longitude:t.lon,width:65})}));case 11:case"end":return t.stop()}}),t)})))()},startTimer:function(){var e=this;if(this.isLogin&&!this.timer){var t=function t(){return e.getScenery(),t};this.timer=setInterval(t(),3e4)}},getLocation:function(){var t=this;return h(r.default.mark((function n(){var a,u,s,l,f,p,d;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.getLocation({type:"gcj02"});case 2:if(a=n.sent,u=c(a,2),s=u[0],l=u[1],!s){n.next=16;break}return n.next=9,e.getSetting();case 9:f=n.sent,p=c(f,2),p[0],d=p[1],!1===d.authSetting["scope.userLocation"]&&e.showModal({title:"提示",content:"检测到您拒绝了地理位置授权，这将无法获取到正确的位置，是否重新进行授权 ?",success:function(){var n=h(r.default.mark((function n(a){var o,i,u;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!a.confirm){n.next=10;break}return n.next=3,e.openSetting();case 3:o=n.sent,i=c(o,2),i[0],u=i[1],u.authSetting["scope.userLocation"]&&t.getLocation(),n.next=11;break;case 10:e.showToast({title:"授权失败",icon:"none",duration:1e3});case 11:case"end":return n.stop()}}),n)})));function a(e){return n.apply(this,arguments)}return a}()}),n.next=22;break;case 16:t.latitude=l.latitude,t.longitude=l.longitude,getApp().globalData.latitude=l.latitude,getApp().globalData.longitude=l.longitude,t.startTimer(),e.startLocationUpdate({success:function(){e.onLocationChange(function(){var n=h(r.default.mark((function n(a){var u,s,l,f,p,d,m;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.isLogin){n.next=2;break}return n.abrupt("return");case 2:if(u=i.default.transform([a.longitude,a.latitude],i.default.GCJ02,i.default.BD09),s=c(u,2),l=s[0],f=s[1],getApp().globalData.latitude=l,getApp().globalData.longitude=f,p=JSON.parse(e.getStorageSync("customerInfo")),d=p.no,m=p.imei,!getApp().globalData.sceneryNo||!getApp().globalData.touristTeamNo){n.next=9;break}return n.next=9,(0,o.uploadLocation)([{sceneryNo:getApp().globalData.sceneryNo,customerNo:d,imei:m,lat:f,lon:l,touristTeamNo:getApp().globalData.touristTeamNo}]);case 9:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}())}});case 22:case"end":return n.stop()}}),n)})))()},getFence:function(){var e=this;return h(r.default.mark((function t(){var n,a;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,o.queryFence)({sceneryNo:getApp().globalData.sceneryNo});case 2:n=t.sent,a=n.value.list,e.polygons=a.map((function(e){var t=e.scope.split(";"),n=t.map((function(e){var t=e.split(","),n=c(t,2),r=n[0],a=n[1],o=i.default.transform([parseFloat(r),parseFloat(a)],i.default.BD09,i.default.GCJ02),u=c(o,2),s=u[0],l=u[1];return{latitude:l,longitude:s}}));return{points:n,strokeColor:"#0DC392",strokeWidth:2,fillColor:"#07C28F26"}}));case 5:case"end":return t.stop()}}),t)})))()},moveToLocation:function(){var t=e.createMapContext("map",this);t.moveToLocation()},refresh:function(){e.showLoading({mask:!0,title:"更新数据中"}),this.getLocation(),this.queryGroup(),setTimeout((function(t){return e.hideLoading()}),1e3)},markertap:function(e){this.markerInfo={},this.$refs.popup.open(),this.curMarkerId=e.markerId;var t=this.curMarkerId.substr(0,1);"j"===t?this.createMakerInfo(this.scenicSpotData,t,this.curMarkerId):"s"===t?this.createMakerInfo(this.facilitiesData,t,this.curMarkerId):"y"===t&&this.createMakerInfo(this.member,t,this.curMarkerId)},createMakerInfo:function(t,n,r){var o,i=this,u=p(t);try{var c=function(){var t=o.value,u=parseInt(r.substr(1));if(t.id===u)return e.getLocation({type:"gcj02",success:function(e){var r=e.latitude,o=e.longitude,u=new a.default({key:"56LBZ-OKVCW-TP3RL-RVH7P-RDRIQ-4EB2T"});u.direction({mode:"walking",from:{latitude:r,longitude:o},to:{latitude:t.lat,longitude:t.lon},success:function(e){var r=e.result.routes[0].distance;i.markerInfo="y"===n?{type:n,nickName:t.nickName,distance:r,battery:t.battery,no:t.no,phone:t.phone,lon:t.lon,lat:t.lat}:{type:n,coverUrl:t.coverUrl,distance:r,describe:t.describe,name:t.name||t.location,lon:t.lon,lat:t.lat}},fail:function(e){i.markerInfo="y"===n?{type:n,nickName:t.nickName,distance:-1,battery:t.battery,no:t.no,phone:t.phone,lon:t.lon,lat:t.lat}:{type:n,coverUrl:t.coverUrl,distance:-1,describe:t.describe,name:t.name||t.location,lon:t.lon,lat:t.lat}}})}}),"break"};for(u.s();!(o=u.n()).done;){var s=c();if("break"===s)break}}catch(l){u.e(l)}finally{u.f()}}},components:{tools:b,panel:v}};t.default=y}).call(this,n("543d")["default"])},c150:function(e,t,n){"use strict";n.r(t);var r=n("c01f"),a=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=a.a}},[["2ecf","common/runtime","common/vendor"]]]);