<template>
	<view class="publish">
		<view class="msg">
			<textarea placeholder="请输入内容:" :value="message" maxlength="200" @input="input"></textarea>
		</view>
		<view class="tips">
			<view class="tips-text">
				*此消息将通知{{ !mode?'全部组员':'该组员'}}
			</view>
			
			<view class="word-num">
				<text style="color:#FFCB3E">{{num}}</text>/200
			</view>
		</view>
		<!-- 发布按钮 -->
		<view class="publish-btn" @click="publish">
			发布
		</view>
	</view>
</template>

<script>
	import { publish,sendMsg } from '@/api/api.js'
	export default {
		onShow(){
			// 未建团时返回首页
			if(!getApp().globalData.touristTeamNo){
				uni.showToast({
					icon:'none',
					title:'请先组团',
					duration:1000,
					mask:true
				})
				setTimeout( ()=>{
					uni.navigateBack()
				},1000 )
			}
		},
		onLoad(options){
			this.mode = options.mode
			this.no = options.no
		},
		data() {
			return {
				num:0,
				message:'',
				mode:'',
				no:''
			};
		},
		methods:{
			input(e){
				this.num = e.detail.cursor
				this.message = e.detail.value
			},
			publish(){
				if(!this.message){
					return uni.showToast({
						title:'请输入内容',
						icon:'none'
					})
				}
				
				// 判断是发布给所有团员还是指定团员
				if( !this.mode ){
					uni.showModal({
						content:'此消息发布将通知全体团队成员，确认发布吗？',
						success:async r =>{
							if(r.confirm){
								try{
									const res = await publish({
									 message:this.message
									})
									this.num = 0
									this.message = ''
									uni.showToast({
										title:'发布成功',
										icon:'none'
									})
								}catch(err){
									console.log(err)
								}
							}
						}
					})
				}else{
					uni.showModal({
						content:'此消息将通知该组员，确认发布吗？',
						success:async r =>{
							if(r.confirm){
								try{
									const res = await sendMsg({
									 message:this.message,
									 receiver:this.no
									})
									this.num = 0
									this.message = ''
									uni.showToast({
										title:'发送成功',
										icon:'none'
									})
								}catch(err){
									console.log(err)
								}
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.publish{
		padding:15rpx;
		
		.msg{
			height:614rpx;
			background:rgba(255,255,255,1);
			box-shadow:0px 6rpx 18rpx 0px rgba(36,36,35,0.11);
			border-radius:20rpx;
			
			textarea{
				width:100%;
				height:100%;
				padding:20rpx;
				box-sizing: border-box;
			}
		}
		
		.tips{
			display:flex;
			justify-content: space-between;
			font-size:24rpx;
			font-weight:500;
			color:rgba(153,153,153,1);
			margin-top:30rpx;
		}
		
		.publish-btn{
			display:flex;
			justify-content: center;
			align-items:center;
			margin-top:80rpx;
			height:98rpx;
			background:rgba(255,203,62,1);
			box-shadow:0px 4rpx 21rpx 0px rgba(196,153,35,0.19);
			border-radius:10rpx;
		}
	}
</style>
