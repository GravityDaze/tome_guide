(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{"1bbd":function(e,t,n){},"1cbd":function(e,t,n){"use strict";(function(e){n("6965");r(n("66fd"));var t=r(n("c16e"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"247b":function(e,t,n){"use strict";var r=n("1bbd"),o=n.n(r);o.a},"663b":function(e,t,n){"use strict";n.r(t);var r=n("abed"),o=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);t["default"]=o.a},abed:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("a34a")),o=n("f6f9");function a(e){return e&&e.__esModule?e:{default:e}}function i(e,t){return l(e)||d(e,t)||c(e,t)||u()}function u(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(e,t){if(e){if("string"===typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function d(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,a=void 0;try{for(var i,u=e[Symbol.iterator]();!(r=(i=u.next()).done);r=!0)if(n.push(i.value),t&&n.length===t)break}catch(c){o=!0,a=c}finally{try{r||null==u["return"]||u["return"]()}finally{if(o)throw a}}return n}}function l(e){if(Array.isArray(e))return e}function f(e,t,n,r,o,a,i){try{var u=e[a](i),c=u.value}catch(s){return void n(s)}u.done?t(c):Promise.resolve(c).then(r,o)}function p(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var a=e.apply(t,n);function i(e){f(a,r,o,i,u,"next",e)}function u(e){f(a,r,o,i,u,"throw",e)}i(void 0)}))}}var v={data:function(){return{sendMsg:!1,count:60,btnText:"获取验证码",loginAsAdmin:!1,account:"",password:"",phone:"",code:"",wxCode:"",show:!1}},components:{},computed:{disabled:function(){return!/^1[3456789]\d{9}$/.test(this.phone)||this.sendMsg},text:function(){return this.loginAsAdmin?"导游":"管理员"}},onLoad:function(){var t=this;e.login({success:function(e){t.wxCode=e.code}})},methods:{getCode:function(){var e=this;return p(r.default.mark((function t(){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.disabled){t.next=2;break}return t.abrupt("return");case 2:return e.sendMsg=!0,e.timer=setInterval((function(){e.count<=0&&(clearInterval(e.timer),e.sendMsg=!1,e.count=60,e.btnText="重新获取"),e.count--}),1e3),t.prev=4,t.next=7,(0,o.getCode)({phone:e.phone});case 7:t.sent,t.next=16;break;case 10:t.prev=10,t.t0=t["catch"](4),clearInterval(e.timer),e.sendMsg=!1,e.count=60,e.btnText="重新获取";case 16:case"end":return t.stop()}}),t,null,[[4,10]])})))()},validate:function(e){var t=this;return p(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,o.validateCode)({code:e,phone:t.phone});case 3:return n.sent,n.abrupt("return",new Promise((function(e){return e(!0)})));case 7:return n.prev=7,n.t0=n["catch"](0),n.abrupt("return",new Promise((function(e){return e(!1)})));case 10:case"end":return n.stop()}}),n,null,[[0,7]])})))()},submit:function(){this.loginAsAdmin?this.adminLogin():this.guideLogin()},adminLogin:function(){var t=this;return p(r.default.mark((function n(){var a;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,e.showLoading({mask:!0,title:"登录中"}),n.next=4,(0,o.loginAdmin)({name:t.account,password:t.password});case 4:a=n.sent,e.setStorageSync("token",a.value.tokenInfo.access_token),e.getLocation({type:"gcj02",success:function(t){var n=t.latitude,r=t.longitude;getApp().globalData.longitude=r,getApp().globalData.latitude=n,e.redirectTo({url:"../admin/admin"})}}),n.next=12;break;case 9:n.prev=9,n.t0=n["catch"](0),e.showModal({content:n.t0.toString()});case 12:return n.prev=12,e.hideLoading(),n.finish(12);case 15:case"end":return n.stop()}}),n,null,[[0,9,12,15]])})))()},guideLogin:function(){var t=this;return p(r.default.mark((function n(){var a,u,c,s,d;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.validate(t.code);case 2:if(!n.sent){n.next=28;break}return n.prev=3,e.showLoading({mask:!0,title:"登录中"}),n.next=7,e.login();case 7:return a=n.sent,u=i(a,2),u[0],c=u[1],s=c.code,n.next=14,(0,o.login)({code:t.code,ip:"127.0.0.1",phone:t.phone,wxCode:s});case 14:d=n.sent,e.setStorageSync("token",d.value.tokenInfo.access_token),e.setStorageSync("customerInfo",JSON.stringify(d.value.customerInfo)),e.reLaunch({url:"../index/index"}),n.next=23;break;case 20:n.prev=20,n.t0=n["catch"](3),e.showModal({content:n.t0.toString()});case 23:return n.prev=23,e.hideLoading(),n.finish(23);case 26:n.next=29;break;case 28:e.showToast({title:"验证码输入错误",icon:"none"});case 29:case"end":return n.stop()}}),n,null,[[3,20,23,26]])})))()},getphonenumber:function(t){var n=this;return p(r.default.mark((function a(){var i,u,c,s;return r.default.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if("getPhoneNumber:ok"===t.detail.errMsg){r.next=2;break}return r.abrupt("return");case 2:return i=t.detail,u=i.encryptedData,c=i.iv,r.prev=3,e.showLoading({mask:!0,title:"登录中"}),r.next=7,(0,o.wxLogin)({iv:c,encryptedData:u,wxCode:n.wxCode});case 7:s=r.sent,e.setStorageSync("token",s.value.tokenInfo.access_token),e.setStorageSync("customerInfo",JSON.stringify(s.value.customerInfo)),e.reLaunch({url:"../index/index"}),r.next=17;break;case 13:r.prev=13,r.t0=r["catch"](3),e.showModal({content:r.t0.toString()}),e.login({success:function(e){n.wxCode=e.code}});case 17:return r.prev=17,e.hideLoading(),r.finish(17);case 20:case"end":return r.stop()}}),a,null,[[3,13,17,20]])})))()}}};t.default=v}).call(this,n("543d")["default"])},c16e:function(e,t,n){"use strict";n.r(t);var r=n("cf5c"),o=n("663b");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("247b");var i,u=n("f0c5"),c=Object(u["a"])(o["default"],r["b"],r["c"],!1,null,"12548fd6",null,!1,r["a"],i);t["default"]=c.exports},cf5c:function(e,t,n){"use strict";var r;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return r}));var o=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.loginAsAdmin=!e.loginAsAdmin})},a=[]}},[["1cbd","common/runtime","common/vendor"]]]);