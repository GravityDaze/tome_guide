(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"1cbd":function(e,t,n){"use strict";(function(e){n("6965");r(n("66fd"));var t=r(n("c16e"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"401b":function(e,t,n){},"663b":function(e,t,n){"use strict";n.r(t);var r=n("abed"),o=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=o.a},9008:function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}));var o=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.loginAsAdmin=!e.loginAsAdmin})},a=[]},abed:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("a34a")),o=n("f6f9");function a(e){return e&&e.__esModule?e:{default:e}}function u(e,t,n,r,o,a,u){try{var i=e[a](u),c=i.value}catch(s){return void n(s)}i.done?t(c):Promise.resolve(c).then(r,o)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function i(e){u(a,r,o,i,c,"next",e)}function c(e){u(a,r,o,i,c,"throw",e)}i(void 0)}))}}var c={data:function(){return{sendMsg:!1,count:60,btnText:"获取验证码",loginAsAdmin:!1,account:"",password:"",phone:"",code:""}},computed:{disabled:function(){return!/^1[3456789]\d{9}$/.test(this.phone)||this.sendMsg},text:function(){return this.loginAsAdmin?"导游":"管理员"}},methods:{getCode:function(){var e=this;return i(r.default.mark((function t(){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.disabled){t.next=2;break}return t.abrupt("return");case 2:return e.sendMsg=!0,e.timer=setInterval((function(){e.count--}),1e3),t.prev=4,t.next=7,(0,o.getCode)({phone:e.phone});case 7:t.sent,t.next=16;break;case 10:t.prev=10,t.t0=t["catch"](4),clearInterval(e.timer),e.sendMsg=!1,e.count=60,e.btnText="重新获取";case 16:case"end":return t.stop()}}),t,null,[[4,10]])})))()},validate:function(e){var t=this;return i(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,o.validateCode)({code:e,phone:t.phone});case 3:return n.sent,n.abrupt("return",new Promise((function(e){return e(!0)})));case 7:return n.prev=7,n.t0=n["catch"](0),n.abrupt("return",new Promise((function(e){return e(!1)})));case 10:case"end":return n.stop()}}),n,null,[[0,7]])})))()},submit:function(){this.loginAsAdmin?this.adminLogin():this.guideLogin()},adminLogin:function(){var t=this;return i(r.default.mark((function n(){var a;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,(0,o.loginAdmin)({name:t.account,password:t.password});case 2:a=n.sent,e.setStorageSync("token",a.value.tokenInfo.access_token),e.getLocation({type:"gcj02",success:function(t){var n=t.latitude,r=t.longitude;getApp().globalData.longitude=r,getApp().globalData.latitude=n,e.redirectTo({url:"../list/list"})}});case 5:case"end":return n.stop()}}),n)})))()},guideLogin:function(){var t=this;return i(r.default.mark((function n(){var a;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.validate(t.code);case 2:if(!n.sent){n.next=21;break}return n.prev=3,e.showLoading(),n.next=7,(0,o.login)({code:t.code,ip:"127.0.0.1",phone:t.phone});case 7:a=n.sent,e.setStorageSync("token",a.value.tokenInfo.access_token),e.setStorageSync("customerInfo",JSON.stringify(a.value.customerInfo)),e.redirectTo({url:"../index/index"}),n.next=16;break;case 13:n.prev=13,n.t0=n["catch"](3),e.showModal({content:n.t0.toString()});case 16:return n.prev=16,e.hideLoading(),n.finish(16);case 19:n.next=22;break;case 21:e.showToast({title:"验证码输入错误",icon:"none"});case 22:case"end":return n.stop()}}),n,null,[[3,13,16,19]])})))()}},watch:{count:function(e){e<0&&(clearInterval(this.timer),this.sendMsg=!1,this.count=60,this.btnText="重新获取")}},onHide:function(){}};t.default=c}).call(this,n("543d")["default"])},c16e:function(e,t,n){"use strict";n.r(t);var r=n("9008"),o=n("663b");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("fcb3");var u,i=n("f0c5"),c=Object(i["a"])(o["default"],r["b"],r["c"],!1,null,"1cdc6782",null,!1,r["a"],u);t["default"]=c.exports},fcb3:function(e,t,n){"use strict";var r=n("401b"),o=n.n(r);o.a}},[["1cbd","common/runtime","common/vendor"]]]);