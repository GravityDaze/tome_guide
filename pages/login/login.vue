<template>
	<view class="login">
		
		<!-- 导游登录 -->
		<view class="tourist" v-if="!loginAsAdmin">
			<view class="phone">
				<text>+86</text>
				<input type="text" placeholder="请输入手机号" v-model="phone" />
			</view>
			<view class="code">
				<text>验证码</text>
				<input type="text" placeholder="请输入验证码" v-model="code" />
				<view class="code-btn" :class="{send:disabled}" @click="getCode">{{ !sendMsg?btnText:`已发送(${count})` }}</view>
			</view>
		</view>
		
		
		<!-- 管理员登录 -->
		<view class="admin" v-else>
			<view class="account">
				<text>账号</text>
				<input type="text" placeholder="请输入账号" v-model="account" />
			</view>
			<view class="password">
				<text>密码</text>
				<input type="password" placeholder="请输入密码" v-model="password" />
			</view>
		</view>
		
		<view class="msg"><text @click="loginAsAdmin = !loginAsAdmin">切换至{{text}}登录 > </text></view>
		<view class="login-btn" @click="submit">登录</view>
	</view>
</template>

<script>
	import { login, getCode, validateCode , isCreateTeam, loginAdmin } from '@/api/api.js'
	export default {
		data(){
			return{
				sendMsg:false,
				count:60,
				btnText:'获取验证码',
				loginAsAdmin:false,
				account:'',
				password:'',
				phone:'',
				code:''
			}
		},
		computed:{
			disabled(){
				return !(/^1[3456789]\d{9}$/.test(this.phone)) || this.sendMsg
			},
			text(){
				if(!this.loginAsAdmin){
					return '管理员'
				}else{
					return '导游'
				}
			},
		},
		methods:{
			
			// 获取验证码
			async getCode(){
				if(this.disabled)return
				this.sendMsg = true
				this.timer = setInterval( ()=>{
					this.count--
				},1000 )
				try{
					const res = await getCode({phone:this.phone})
				}catch(err){
					clearInterval(this.timer)
					this.sendMsg = false
					this.count = 60
					this.btnText = '重新获取'
				}
			},
			
			// 校验验证码
			async validate(code){
				try{
					const res = await validateCode({
						code,
						phone:this.phone
					})
					return new Promise( reslove => reslove(true) )
				}catch(err){
					return new Promise( reslove => reslove(false) )
				}	
				
			},
			
			submit(){
				if( this.loginAsAdmin ){
					this.adminLogin()
				}else{
					this.guideLogin()
				}
			},
			
			// 管理员登录
			async adminLogin(){
				const res = await loginAdmin({name:this.account,password:this.password})
				// 保存token
				uni.setStorageSync('token', res.value.tokenInfo.access_token )
				// 获取到管理员当前位置
				uni.getLocation({
					type:'gcj02',
					success:res=>{
						const { latitude,longitude } = res 
						getApp().globalData.longitude = longitude,
						getApp().globalData.latitude = latitude
						// 跳转至导游列表
						uni.redirectTo({
							url:'../list/list'
						})
					}
				})
			},
			
			// 导游登陆
			async guideLogin(){
				if( await this.validate(this.code) ){
					// 订阅模板信息
					uni.requestSubscribeMessage({
						tmplIds:['40DLebQyZfsu_hhPfy5jXjXSXNOgLjnqs696an3AdQI'],
						success:async result=>{
							if( result['40DLebQyZfsu_hhPfy5jXjXSXNOgLjnqs696an3AdQI'] ===  'reject' ){
								return uni.showModal({
									content:'请订阅游客求救提醒'
								})
							}
							try{
								uni.showLoading()
								// 获取到open_id
								const [err,res] = await uni.login()
								const {code} = res
								const r = await login({
									code:this.code,//验证码
									ip: "127.0.0.1",
									phone: this.phone,
								}) 
								// 保存token
								uni.setStorageSync('token', r.value.tokenInfo.access_token )
								// 保存用户信息
								uni.setStorageSync('customerInfo',JSON.stringify(r.value.customerInfo))
								uni.redirectTo({
									url:'../index/index'
								})
							}catch(err){
								// uni.showToast({
								// 	title:err.toString(),
								// 	icon:'none'
								// })
								uni.showModal({
									content:err.toString()
								})
							}finally{
								uni.hideLoading()
							}
						},
						fail :err=>{
							console.log(err)
						}
					})
				}else{
					uni.showToast({
						title:'验证码输入错误',
						icon:'none'
					})
				}
			},
			
			
			
		},
		watch:{
			count(num){
				if(num < 0){
					clearInterval(this.timer)
					this.sendMsg = false
					this.count = 60
					this.btnText = '重新获取'
				}
			}
		},
		onHide(){
			// clearInterval(this.timer)
			// this.sendMsg = false
			// this.count = 60
			// this.btnText = '重新获取'
		},
		onLoad(){
			// 模板消息授权框
			
		}
	}
</script>

<style lang="scss" scoped>
	.login{
		padding:25rpx;
		
		
		
		.msg{
			font-size:24rpx;
			color:grey;
			color:#FFCB3E;
			text-align: right;
		}
		
		.login-btn{
			display:flex;
			justify-content: center;
			align-items: center;
			height:80rpx;
			background:$base-color;
			color:#fff;
			margin-top:25rpx;
			border-radius: 8rpx;
			
		}
		
		.admin,.tourist{
			&>view{
				display:flex;
				align-items: center;
				height:80rpx;
				margin-bottom:25rpx;
				border-radius: 0 8rpx 8rpx 0;
				
				input{
						height:100%;
						background:rgb(242,242,242);
					}
					
					text{
						display:flex;
						align-items: center;
						justify-content: center;
						width:100rpx;
						font-size:24rpx;
						height:100%;
						background:rgb(242,242,242);
						border-radius: 8rpx 0 0 8rpx;
					}
				}
				
				.phone,.account,.password{
					background:rgb(242,242,242);
				
					input{
						width:100%;
					}
				}
				
				.code{
					
					.code-btn{
						display:flex;
						justify-content: center;
						align-items: center;
						height:100%;
						background:$base-color;
						flex:1;
						color:#fff;
						margin-left:12rpx;
						border-radius: 8rpx;
						font-size:28rpx;
					}
					
					.send{
						background:rgb(242,242,242);
						color: grey;
					}
					
					input{
						flex:2;
						border-radius: 0 8rpx 8rpx 0;
					}
				
			}
		
		}
		
		.change{
			display:flex;
			flex-flow: column;
			align-items:center;	
			margin-top:500rpx;
				
			image{
				width:51rpx;
				height:50rpx;
				margin-bottom:12rpx;
			}
			
			text{
				font-size:22rpx;
			}
			

		}
	}
	
</style>
