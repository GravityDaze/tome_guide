<template>
	<view class="message">
		<view class="message-box" @click="check">
			<image src="../../static/icon_daoyouitixing.png" mode=""></image>
			<view class="text">
				<view class="title">
					<view class="type">
						导游提醒
					</view>
					
					<view class="date">
						2019-6-03 9:37
					</view>
				</view>
				
				<view class="bottom-text">
					各位团友,四点来大门集合
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			check(params){
				uni.navigateTo({
					url:"/pages/msgDetail/msgDetail"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.message{
		padding:20rpx;
		
		.message-box{
			display:flex;
			align-items:center;
			background:#fff;
			padding:30rpx 20rpx;
			border-radius:15rpx;
			
			image{
				width:120rpx;
				height:120rpx;
				margin-right:20rpx;
			}
			
			.text{
				display:flex;
				flex-flow:column;
				flex:1;
				
				.title{
					display:flex;
					justify-content: space-between;
					align-items: flex-end;
					line-height:1.5;
					
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
				
				.bottom-text{
					overflow:hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					color:#999;
					font-size:32rpx;
				}
			}
			
			
			
			
			
			
		}
	}
</style>
