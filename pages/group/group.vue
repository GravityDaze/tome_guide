<template>
	<view class="group">
		<view class="tips">
			选择旅行社
		</view>
		<view class="select">
			<view class="">
				康辉旅行社
			</view>
			<image src="../../static/icon-shaixuan@2x.png" mode=""></image>
		</view>
		<view class="create-btn" @click="createMyGroup">
			创建我的团队
		</view>
	</view>
</template>

<script>
	import { group } from '@/api/api'
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			async createMyGroup(){
				const res = await group({
					"sceneryNo":"S0001",
					    	"imei":"123456",
					    	"travelAgencyId":1,
					    	"lon":"39.256325",
					    	"lat":"99.326365",
					    	"address":"峨眉山山脚底"
				})
				return console.log(res)
				
				uni.navigateTo({
					url:"/pages/myGroup/myGroup"
				})
			}
		}
	}
</script>

<style lang="scss">
	.group{
		padding:55rpx 15rpx;
		position:relative;
		
		.tips{
			font-size:32rpx;
			font-weight:500;
			color:rgba(153,151,151,1);
			margin-left:30rpx;
			margin-bottom:20rpx;
		}
		
		.select{
			display:flex;
			justify-content: space-between;
			align-items: center;
			background:rgba(255,255,255,1);
			box-shadow:0px 6rpx 12rpx 0px rgba(36,36,35,0.08);
			border-radius:20rpx;
			padding:25rpx;
			font-size:32rpx;
			font-weight:500;
			color:rgba(51,51,50,1);
			
			image{
				width: 30rpx;
				height: 38rpx;
			}
		}
		
		.create-btn{
			display:flex;
			justify-content: center;
			align-items: center;
			height:98rpx;
			background:rgba(255,203,62,1);
			box-shadow:0px 8rpx 16rpx 0px rgba(234,181,38,0.13);
			border-radius:10rpx;
			font-size:32rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,50,1);
			margin-top:330rpx;
		}
	}
</style>
