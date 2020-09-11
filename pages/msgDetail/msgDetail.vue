<template>
	<view class="msg-detail">
		<view class="msg-box">
			<view class="title">
				<view class="type">
					导游提醒
				</view>
				<view class="date">
					2019-6-19 9:32
				</view>
			</view>
			<view class="content">
				各位团友现在我们自由活动一直活动到中午12点半的时候然后去吃烤肉 吃完烤肉以后午休2小时然后下午上山
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.msg-detail{
		padding:20rpx;
		
		.msg-box{
			background:#fff;
			border-radius:25rpx;
			padding:25rpx 40rpx 35rpx;
			box-shadow: 1rpx 1rpx 23rpx 2rpx rgba(36, 36, 35, 0.08);
			
			.title{
				display:flex;
				justify-content: space-between;
				align-items:flex-end;
				
				.type{
					font-size:36rpx;
					font-weight:600;
					color:#343433;
				}
				
				.date{
					color:#999;
					font-size:24rpx;
				}
			}
			
			.content{
				color:#999;
				font-size:32rpx;
				margin-top:20rpx;
				line-height:1.5;
				letter-spacing: 3rpx;
			}
			
		}
	}
	
	
</style>
