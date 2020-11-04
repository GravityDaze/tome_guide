<template>
	<view class="personal">
		<view class="bg">
			<image src="../../static/bg@2x.png" mode=""></image>
		</view>
		
		<view class="guide-panel">
			<view class="guide-avatar">
				<image src="../../static/guide.png" mode=""></image>
			</view>
			
			<view class="guide-name">
				<text>{{ userInfo.realName }}</text>
				<view class="tag">导游</view>
			</view>
		</view>
		
		<view class="list">
			<view class="list-item" v-for="(item,index) in listItem" :key="index" @click="handler(item)">
				<image class="icon" :src="require(`../../static/${item.icon}`)" ></image>
				<text>{{item.text}}</text>
				<image v-show="item.text !== '退出'" class="arrow" src="../../static/more.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { queryUserInfo } from '@/api/api.js'
	export default {
		data() {
			return {
				listItem:[
					{
						icon:'info.png',
						text:'个人资料',
						url:'info'
					},
					{
						icon:'fence.png',
						text:'景区围栏',
						url:'fence',
						params:'read'
					},
					// {
					// 	icon:'自定义围栏@2x.png',
					// 	text:'自定义围栏',
					// 	url:'fence',
					// 	params:'edit'
					// },
					{
						icon:'logout.png',
						text:'退出'
					}
				],
				userInfo:{}
			};
		},
		onLoad(){
			this.getUserInfo()
		},
		methods:{
			async getUserInfo(){
				this.userInfo = JSON.parse( uni.getStorageSync('customerInfo') )
			},
			handler(item){
				if(!item.url){
					uni.showModal({
						content:'是否退出登录',
						confirmColor:'#FFCB3E',
						success:({confirm}) => {
							if(confirm){
								uni.clearStorageSync()
								getApp().globalData = {}
								uni.stopLocationUpdate()
								return uni.reLaunch({
									url:'../login/login'
								}) 
							}
						}
					})
					
				}
				
				uni.navigateTo({
					url:`../${item.url}/${item.url}?type=${item.params}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.personal{
		display:flex;
		flex-flow:column;
		align-items: center;
		
		.bg{
			position:fixed;
			z-index:-1;
			top:0;
			width:100%;
			height:300rpx;
			
			image{
				width:100%;
				height:100%;
			}
		}
		
		.guide-panel{
			margin:93rpx 0 54rpx;
			display:flex;
			align-items:center;
			width:642rpx;
			height:226rpx;
			background:rgba(255,255,255,.95);
			box-shadow:0px 6rpx 24rpx 0px rgba(36,36,35,0.08);
			border-radius:30rpx;
			
			.guide-avatar{
				margin:0 25rpx;
				
				image{
					width:132rpx;
					height:132rpx;
				}
			}
			
			.guide-name{
				display:flex;
				flex-flow: column;
				justify-content: center;
				
				text{
					font-size:36rpx;
					font-weight:400;
					color:rgba(51,51,50,1);
					padding-bottom:10rpx;
				}
				
				.tag{
					display:flex;
					align-items:center;
					justify-content: center;
					width:88rpx;
					height:37rpx;
					background:rgba(255,203,62,1);
					box-shadow:0px 6rpx 11rpx 1rpx rgba(229,176,32,0.21);
					border-radius:19rpx;
					font-size:24rpx;
					font-weight:400;
					color:rgba(51,51,51,1);
				}
				
			}
		}
		
		.list{
			width:642rpx;
		
			.list-item{
				display:flex;
				align-items: center;
				padding:15rpx 0;
				border-bottom:1rpx solid rgba(217,217,217,.9);
				
				.icon{
					margin-right:28rpx;
					width:64rpx;
					height:64rpx;
				}
				
				.arrow{
					margin-left:auto;
					width:29rpx;
					height:29rpx;
				}
				
				text{
					font-size:30rpx;
					font-weight:400;
					color:rgba(153,152,150,1);
				}
			}
		
		}
		
	}


</style>
