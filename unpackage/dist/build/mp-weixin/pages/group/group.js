(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/group/group"],{"8e10":function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return r}));var a=function(){var e=this,t=e.$createElement;e._self._c},o=[]},"9f54":function(e,t,n){"use strict";(function(e){n("6965");r(n("66fd"));var t=r(n("b5c6"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},b1ad:function(e,t,n){"use strict";var r=n("fe8b"),a=n.n(r);a.a},b5c6:function(e,t,n){"use strict";n.r(t);var r=n("8e10"),a=n("ceeb");for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("b1ad");var i,u=n("f0c5"),c=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);t["default"]=c.exports},ceeb:function(e,t,n){"use strict";n.r(t);var r=n("d44f"),a=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=a.a},d44f:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=o(n("a34a")),a=n("f6f9");function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=u(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){c=!0,o=e},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw o}}}}function u(e,t){if(e){if("string"===typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(e,t):void 0}}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function l(e,t,n,r,a,o,i){try{var u=e[o](i),c=u.value}catch(l){return void n(l)}u.done?t(c):Promise.resolve(c).then(r,a)}function s(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function i(e){l(o,r,a,i,u,"next",e)}function u(e){l(o,r,a,i,u,"throw",e)}i(void 0)}))}}var f=function(){n.e("components/my-select/my-select").then(function(){return resolve(n("bbdc"))}.bind(null,n)).catch(n.oe)},d={data:function(){return{orginList:[],list:[],items:[],isOpenSelect:!1,id:null}},onLoad:function(t){if(t.id&&(this.id=t.id),!getApp().globalData.sceneryNo)return e.showToast({icon:"none",title:"您不在任何景区",mask:!0,duration:1e3}),setTimeout((function(t){return e.navigateBack()}),1e3);this.getList()},methods:{getList:function(){var e=this;return s(r.default.mark((function t(){var n;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,a.queryTravelAgencyList)({name:e.name});case 3:n=t.sent,e.list=n.value.list,e.items=e.list.map((function(e){return e.name})),t.next=11;break;case 8:t.prev=8,t.t0=t["catch"](0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})))()},handleInput:function(e){console.log(e+"打印输入时的key"),this.travelAgencyId="",this.name=e,this.getList()},change:function(e){this.isOpenSelect=e},select:function(e){var t=this;this.close(),this.items=[e],this.list.forEach((function(n){e===n.name&&(t.travelAgencyId=n.id)}))},close:function(){this.isOpenSelect=!1},createMyGroup:function(){var t=this;return s(r.default.mark((function n(){var o,u,c,l;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(t.travelAgencyId){n.next=19;break}o=i(t.list),n.prev=2,o.s();case 4:if((u=o.n()).done){n.next=11;break}if(c=u.value,t.name!==c.name){n.next=9;break}return t.travelAgencyId=c.id,n.abrupt("break",11);case 9:n.next=4;break;case 11:n.next=16;break;case 13:n.prev=13,n.t0=n["catch"](2),o.e(n.t0);case 16:return n.prev=16,o.f(),n.finish(16);case 19:if(t.travelAgencyId){n.next=21;break}return n.abrupt("return",e.showToast({title:"请选择旅行团",icon:"none"}));case 21:return n.next=23,(0,a.createTeam)({customerId:parseInt(t.id)||"",travelAgencyId:t.travelAgencyId,sceneryNo:getApp().globalData.sceneryNo,lon:getApp().globalData.longitude,lat:getApp().globalData.latitude});case 23:l=n.sent,getApp().globalData.touristTeamNo=l.value.no,e.redirectTo({url:"/pages/myGroup/myGroup?id=".concat(t.id||"")});case 26:case"end":return n.stop()}}),n,null,[[2,13,16,19]])})))()}},components:{mySelect:f}};t.default=d}).call(this,n("543d")["default"])},fe8b:function(e,t,n){}},[["9f54","common/runtime","common/vendor"]]]);