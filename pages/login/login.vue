<template>
	<view class="login">
		<view class="phone">
			<text>+86</text>
			<input type="text" placeholder="请输入手机号" v-model="phone" />
		</view>
		
		<view class="code">
			<text>验证码</text>
			<input type="text" placeholder="请输入验证码" v-model="code" />
			<view class="code-btn" :class="{send:sendMsg}" @click="getCode">{{ !sendMsg?btnText:`已发送(${count})` }}</view>
		</view>

		<text class="msg">温馨提示：尚未注册途咪账号的手机号，登录时将自动注册</text>
		
		<view class="login-btn" @click="login">登录</view>
	</view>
</template>

<script>
	import { login, getCode, validateCode } from '@/api/api.js'
	export default {
		data(){
			return{
				sendMsg:false,
				count:60,
				btnText:'获取验证码',
				phone:'',
				code:''
			}
		},
		methods:{
			
			// 获取验证码
			async getCode(){
				if(this.sendMsg)return
				this.sendMsg = true
				const res = await getCode({phone:this.phone})
				this.timer = setInterval( ()=>{
					this.count--
				},1000 )
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
			
			
			async login(){
					if( await this.validate(this.code) ){
						
						try{
							const res = await login({
								code:this.code,
								ip: "127.0.0.1",
								phone: this.phone,
								sceneryNo: "S0001"
							}) 
							uni.setStorageSync('token', res.value.access_token )
							uni.redirectTo({
								url:'../index/index'
							})
						}catch(err){
							uni.showToast({
								title:err.toString(),
								icon:'none'
							})
						}

					}else{
						uni.showToast({
							title:'验证码输入错误',
							icon:'none'
						})
					}
					
				
				
			}
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
			clearInterval(this.timer)
		}
	}
</script>

<style lang="scss" scoped>
	.login{
		padding:25rpx;
		
		.msg{
			font-size:24rpx;
			color:grey;
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
		
		.phone,.code{
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
		
		.phone{
			background:rgb(242,242,242);
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
	
</style>
