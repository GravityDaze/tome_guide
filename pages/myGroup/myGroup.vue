<template>
	<view class="my-group clearfix" @click="hideMask">
		<view class="bg">
			<image src="../../static/bg.png" mode=""></image>
		</view>

		<view class="panel">
			<image src="../../static/info.png" mode=""></image>
			<text>当前组团码</text>
			<view>{{code}}</view>
		</view>

		<view class="header">
			<view>
				{{code}}团成员
			</view>
			<text>{{travelAgency}}</text>
		</view>

		<view class="dismiss" @click="dismiss">
			<image src="../../static/dismiss.png"></image>
		</view>

		<view class="member-list">
			<!-- 导游 -->
			<view class="member">
				<image src="../../static/img_touxiangdaoyou@2x.png"></image>
				<view class="name">导游</view>
			</view>

			<!-- 游客 -->
			<view class="member" @longpress="showMask(item.id)" v-for="item in member" :key="item.id">
				<image :class="{ani: curId === item.id}" src="../../static/member.png"></image>
				<view class="name">{{item.nickName}}</view>
				<view :class="[{ show: curId === item.id }, 'mask']">
					<view @click.stop="call(item.phone)">
						<image src="../../static/phone.png" mode=""></image>
						<text>电话</text>
					</view>

					<view @click.stop="msg">
						<image src="../../static/msg.png" mode=""></image>
						<text>信息</text>
					</view>

					<view @click.stop="del(item.id)">
						<image src="../../static/del.png" mode=""></image>
						<text>删除</text>
					</view>
				</view>

			</view>

		</view>

	</view>
</template>

<script>
	import {
		queryTeamInfo,
		dismiss,
		delMember
	} from '@/api/api.js'
	export default {
		data() {
			return {
				code: '',
				travelAgency: '',
				curId: '',
				member: [],
				timer: null
			};
		},
		onLoad() {
			// 查询团信息
			this.startTimer()

		},
		onUnload() {
			clearInterval(this.timer)
		},
		methods: {
			// 定时获取团员数据
			startTimer() {
				const count = () => {
					this.getTeamInfo();
					return count;
				};
				this.timer = setInterval(count(), 3000);
			},

			async getTeamInfo() {
				const {
					value
				} = await queryTeamInfo({})
				this.code = value.guider.touristTeamCode
				this.travelAgency = value.guider.travelAgency
				this.member = value.member
			},

			showMask(id) {
				this.curId = id
				uni.vibrateShort({
					success: function() {
					}
				});
			},
			hideMask() {
				this.curId = ''
			},
			del(id) {
				uni.showModal({
					content: '是否删除团员',
					success:async res =>{
						if(res.confirm){
							try{
								await delMember({
									memberId:id
								})
								uni.showToast({
									title:'删除成功',
									icon:'none'
								})
							}catch(err){
								uni.showToast({
									title:'删除失败',
									icon:'none'
								})
							}finally{
								this.getTeamInfo()
							}
						}
					}
				})
			},

			call(phoneNumber) {
				uni.makePhoneCall({
					phoneNumber
				})
			},
			
			msg(){
				uni.navigateTo({
					url:"/pages/publish/publish?mode=personal"	
				})
			},
			
			// 结算团队
			dismiss() {
				uni.showModal({
					content: '解散后团队成员将不能听到导游讲解,确定解散吗?',
					success:async res=>{
						if(res.confirm){
							try{
								await dismiss()
								this.getTeamInfo()
							}catch(err){
								uni.showToast({
									title:'解散失败',
									icon:'none'
								})
							}
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-group {
		position: relative;
		padding: 0 35rpx;
		height: 100%;

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
			margin-top: 20rpx;

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
				text-indent: 30rpx
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

			.ani {
				animation: mymove ease-in-out .5s infinite alternate;
			}

			.member {
				position: relative;
				display: flex;
				flex-flow: column;
				align-items: center;
				margin-top: 90rpx;

				&>image {
					width: 116rpx;
					height: 116rpx;
					margin-bottom: 30rpx;
				}

				.name {
					font-size: 26rpx;
					font-weight: 500;
					color: rgba(153, 153, 153, 1);
				}

				// 过渡效果
				.show {
					transform: scale(1) !important;
					opacity: 1 !important;
				}

				.mask {
					position: absolute;
					display: flex;
					top: -120rpx;
					background: rgba(255, 255, 255, .6);
					padding: 15rpx;
					box-shadow: 1rpx 6rpx 18rpx 0px rgba(36, 36, 35, 0.11);
					border-radius: 25rpx;
					white-space: nowrap;
					transition: .3s;
					transform: scale(0);
					opacity: 0;

					view {
						padding: 0 15rpx;
						display: flex;
						flex-flow: column;
						align-items: center;

						text {
							font-size: 24rpx;
							color: #8a8a8a;
						}

						image {
							width: 35rpx;
							height: 35rpx;
							margin-bottom: 5rpx;
						}
					}
				}

			}

		}

		.dismiss {
			position: absolute;
			width: 110rpx;
			height: 110rpx;
			right: 15rpx;
			bottom: 100rpx;

			image {
				height: 100%;
				width: 100%;
			}
		}

		@keyframes mymove {
			from {
				transform: translateY(5rpx);
			}

			to {
				transform: translateY(-5rpx);
			}
		}
	}
</style>
