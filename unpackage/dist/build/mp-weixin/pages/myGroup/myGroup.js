(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myGroup/myGroup"],{"146f":function(e,n,t){"use strict";t.r(n);var r=t("6caa"),a=t.n(r);for(var o in r)"default"!==o&&function(e){t.d(n,e,(function(){return r[e]}))}(o);n["default"]=a.a},4471:function(e,n,t){"use strict";var r;t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return o})),t.d(n,"a",(function(){return r}));var a=function(){var e=this,n=e.$createElement,t=(e._self._c,e.__map(e.member,(function(n,t){var r=e.__get_orig(n),a=n.phone.substr(5);return{$orig:r,g0:a}})));e.$mp.data=Object.assign({},{$root:{l0:t}})},o=[]},"4ae8":function(e,n,t){"use strict";t.r(n);var r=t("4471"),a=t("146f");for(var o in a)"default"!==o&&function(e){t.d(n,e,(function(){return a[e]}))}(o);t("c5a7");var u,c=t("f0c5"),i=Object(c["a"])(a["default"],r["b"],r["c"],!1,null,"42c97851",null,!1,r["a"],u);n["default"]=i.exports},"6caa":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=o(t("a34a")),a=t("f6f9");function o(e){return e&&e.__esModule?e:{default:e}}function u(e,n,t,r,a,o,u){try{var c=e[o](u),i=c.value}catch(s){return void t(s)}c.done?n(i):Promise.resolve(i).then(r,a)}function c(e){return function(){var n=this,t=arguments;return new Promise((function(r,a){var o=e.apply(n,t);function c(e){u(o,r,a,c,i,"next",e)}function i(e){u(o,r,a,c,i,"throw",e)}c(void 0)}))}}var i={data:function(){return{code:"",travelAgency:"",curId:"",member:[],timer:null}},onLoad:function(){this.startTimer()},onUnload:function(){clearInterval(this.timer)},methods:{startTimer:function(){var e=this,n=function n(){return e.getTeamInfo(),n};this.timer=setInterval(n(),5e3)},getTeamInfo:function(){var n=this;return c(r.default.mark((function t(){var o,u;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,a.queryTeamInfo)({});case 2:o=t.sent,u=o.value;try{n.code=u.guider.touristTeamCode,n.travelAgency=u.guider.travelAgency,e.setNavigationBarTitle({title:"我的团(".concat(u.member.length+1||1,")")}),n.member=u.member}finally{e.hideLoading(),e.stopPullDownRefresh()}case 5:case"end":return t.stop()}}),t)})))()},showMask:function(e){this.curId=e,wx.vibrateShort({success:function(e){console.log(e)}})},hideMask:function(){this.curId=""},del:function(n){var t=this;e.showModal({content:"是否删除团员",success:function(){var o=c(r.default.mark((function o(u){return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!u.confirm){r.next=13;break}return r.prev=1,r.next=4,(0,a.delMember)({memberId:n});case 4:e.showToast({title:"删除成功",icon:"none"}),r.next=10;break;case 7:r.prev=7,r.t0=r["catch"](1),e.showToast({title:"删除失败",icon:"none"});case 10:return r.prev=10,t.getTeamInfo(),r.finish(10);case 13:case"end":return r.stop()}}),o,null,[[1,7,10,13]])})));function u(e){return o.apply(this,arguments)}return u}()})},call:function(n){e.makePhoneCall({phoneNumber:n})},msg:function(n){e.navigateTo({url:"/pages/publish/publish?mode=personal&no=".concat(n)})},dismiss:function(){var n=this;e.showModal({content:"解散后团队成员将不能听到导游讲解,确定解散吗?",success:function(){var t=c(r.default.mark((function t(o){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!o.confirm){t.next=12;break}return t.prev=1,t.next=4,(0,a.dismiss)();case 4:n.getTeamInfo(),e.showToast({title:"解散失败",icon:"none"}),e.navigateBack(),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](1),e.showToast({title:"解散失败",icon:"none"});case 12:case"end":return t.stop()}}),t,null,[[1,9]])})));function o(e){return t.apply(this,arguments)}return o}()})}},onPullDownRefresh:function(){e.showLoading(),this.getTeamInfo()}};n.default=i}).call(this,t("543d")["default"])},b42e:function(e,n,t){},bc10:function(e,n,t){"use strict";(function(e){t("6965");r(t("66fd"));var n=r(t("4ae8"));function r(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},c5a7:function(e,n,t){"use strict";var r=t("b42e"),a=t.n(r);a.a}},[["bc10","common/runtime","common/vendor"]]]);