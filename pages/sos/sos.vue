<template>
	<view class="sos">
		<view class="msg-panel" @click="go">
			<view class="date">2019-11-18 19:37</view>
			<view class="sos-info">
				<view class='tourist'>游客夏天SOS求救</view>
				<view class="sos-location">
					<view class="point"></view>
					<view class="location">求救地址：北纬:30°36′37.83″ 东经:104°3′38.20″</view>
				</view>
			</view>
			<image class="more" src="../../static/更多@2x.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			go(){
				uni.navigateTo({
					url:"/pages/sosDetail/sosDetail"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sos{
		
		padding:15rpx;
		
		.msg-panel{
			position:relative;
			background:rgba(255,255,255,1);
			box-shadow:0 6rpx 18rpx 0 rgba(36,36,35,0.1);
			border-radius:20rpx;
			padding:30rpx 60rpx 30rpx 60rpx;
			
			.more{
				position:absolute;
				width:32rpx;
				height:30rpx;
				top:50%;
				right:30rpx;
				transform:translateY(-50%);
			}
			
			.date{
				text-align:center;
				font-size:24rpx;
				font-weight:500;
				color:rgba(153,152,150,1);
			}
			
			.sos-info{
				
				.tourist{
					font-size:34rpx;
					font-weight:bold;
					color:rgba(51,51,50,1);
					margin:45rpx 0 25rpx 0;
				}
				
				.sos-location{
					position:relative;
					font-size:30rpx;
					font-weight:500;
					color:rgba(153,152,150,1);
					
					.location{
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
					
					.point{
						position:absolute;
						top:50%;
						transform:translateY(-50%);
						left:-24rpx;
						width:14rpx;
						height:14rpx;
						background:rgba(255,203,62,1);
						box-shadow:0px 2rpx 16rpx 0px rgba(203,38,38,0.26);
						border-radius:50%;
					}
					
				}
				
			}
			
		}
	}
	
</style>
