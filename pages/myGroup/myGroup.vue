<template>
	<view class="my-group clearfix" @click="hideMask">
		<view class="bg">
			<image src="../../static/bg.png" mode=""></image>
		</view>

		<view class="panel">
			<image src="../../static/个人资料@2x.png" mode=""></image>
			<text>当前组团码</text>
			<view>5781</view>
		</view>

		<view class="header">
			<view>
				5781团成员
			</view>
			<text>康辉旅行社</text>
		</view>
		
		<view class="dismiss" @click="dismiss">
			<image src="../../static/解散团队@2x.png" mode=""></image>
		</view>
		
		<view class="member-list">
			<view class="member" @longpress="showMask">
				<image src="../../static/img_touxiangdaoyou@2x.png" mode=""></image>
				<text>导游</text>
				<view class="mask" v-if="test" @click.stop="del">
					删除
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				test: false
			};
		},
		methods: {
			showMask() {
				this.test = true
				uni.vibrateShort({
					success: function() {
						console.log('success');
					}
				});
			},
			hideMask() {
				console.log('起飞')
				this.test = false
			},
			del() {
				uni.showModal({
					content: '是否删除团员'
				})
			},
			dismiss(){
				uni.showModal({
					content: '解散后团队成员将不能听到导游讲解,确定解散吗?'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.my-group {
		position: relative;
		padding: 0 35rpx;
		height:100%;

		.bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 300rpx;
			z-index: -1;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.panel {
			display: flex;
			align-items: center;
			flex-flow: column;
			height: 334rpx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 1rpx 23rpx 1rpx rgba(36, 36, 35, 0.08);
			border-radius: 20rpx;
			background: #fff;
			margin-top:20rpx;

			image {
				width: 104rpx;
				height: 104rpx;
				margin-top: 33rpx;
				margin-bottom: 20rpx;
			}

			text {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(153, 153, 153, 1);
			}

			view {
				font-size: 50rpx;
				margin-top: 50rpx;
				font-family: Helvetica;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				letter-spacing: 30rpx;
				text-indent:30rpx
			}
		}

		.header {
			display: flex;
			flex-flow: column;
			align-items: center;
			margin-top: 55rpx;

			view {
				position: relative;
				font-size: 34rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				margin-bottom: 18rpx;

				&::after {
					position: absolute;
					left: 0;
					right: 0;
					margin: auto;
					content: '';
					bottom: 0;
					width: 90rpx;
					height: 6rpx;
					background: rgba(255, 203, 62, 1);
				}
			}

			text {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(153, 153, 153, 1);
			}


		}

		.member-list {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			// grid-template-rows: repeat();

			.member {
				position: relative;
				display: flex;
				flex-flow: column;
				align-items: center;
				margin-top: 90rpx;

				image {
					width: 116rpx;
					height: 116rpx;
					margin-bottom: 30rpx;
				}

				text {
					font-size: 26rpx;
					font-weight: 500;
					color: rgba(153, 153, 153, 1);
				}

				.mask {
					position: absolute;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 26rpx;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					background: rgba(0, 0, 0, .47);
				}

			}

		}
		
		.dismiss{
			position:absolute;
			width:110rpx;
			height:110rpx;
			right:15rpx;
			bottom:100rpx;
			
			image{
				height:100%;
				width:100%;
			}
		}
	}
</style>
