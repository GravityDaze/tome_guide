<template>
	<view class="msg-detail">
		<view class="msg-box">
			<view class="title">
				<view class="type">
					{{ msgTypeMap.get(msg.sendType) }}
				</view>
				<view class="date">
					{{msg.publishDateTime}}
				</view>
			</view>
			<view class="content">
				{{msg.content}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options){
			this.msg = JSON.parse(uni.getStorageSync('msg'))
		},
		data() {
			return {
				msg:{},
				msgTypeMap:new Map([
					[1, "平台消息"],
					[2, "导游提醒"],
					[3, "景区消息"]
				])
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
