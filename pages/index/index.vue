<template>
	<view class="index">
		<tools />
		<map id="map" :latitude="latitude" :longitude="longitude" show-location show-compass :markers="markers" @markertap="markertap"></map>

		<!-- 定位 -->
		<view class="local" @click="moveToLocation">
			<image src="../../static/local.png" mode=""></image>
		</view>
		<!-- 登录按钮 -->
		<view class="login-btn" @click="login" v-if="!isLogin">
			<text>登录</text>
		</view>
		
		<!-- 弹出面板 -->
		<uni-popup ref="popup" type="bottom">
			<panel :markerInfo="markerInfo" />
		</uni-popup>
		
	</view>
</template>

<script>
	// 引入腾讯地图核心类
	import QQMapWX from '../../libs/qqmap-wx-jssdk.min.js'
	import panel from './components/panel.vue'
	import tools from './components/tools.vue'
	export default {
		data() {
			return {
				isLogin:false,
				latitude: 36.026226,
				longitude: 103.75202,
				curMarkerId: 0,
				markerInfo: {},
				markers: [{
						height: 78,
						iconPath: "/static/scenery.png",
						id: 0,
						latitude: 30.614207,
						longitude: 104.069568,
						width: 65
					},
					{
						height: 78,
						iconPath: "/static/Toilet@2x.png",
						id: 1,
						latitude: 30.610999,
						longitude: 104.073405,
						width: 65
					},
				]
			}
		},
		
		onShow(){
			// 查询是否登录
			uni.getStorageSync('token') && ( this.isLogin = true )
		},
		
		onLoad() {
			// 实例化API核心类
			const qqmapsdk = new QQMapWX({
				key: '56LBZ-OKVCW-TP3RL-RVH7P-RDRIQ-4EB2T'
			});
			
			// 获取地理位置
			this.getLocation()
		},
		methods: {
			
			login() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			async getLocation() {
				const [err, res] = await uni.getLocation({
					type: 'gcj02'
				})
				// 检测到用户拒绝了地理位置授权 , 引导用户打开权限设置
				if (err) {
					const [err, res] = await uni.getSetting()
					if (res.authSetting['scope.userLocation'] === false) {
						uni.showModal({
							title: '提示',
							content: '检测到您拒绝了地理位置授权，这将无法获取到正确的位置，是否重新进行授权 ?',
							success: async res => {
								if (res.confirm) {
									const [err, res] = await uni.openSetting()
									res.authSetting['scope.userLocation'] && this.getLocation()
								} else {
									uni.showToast({
										title: '授权失败',
										icon: 'none',
										duration: 1000
									})
								}
							}
						})
					}

				} else {
					this.latitude = res.latitude
					this.longitude = res.longitude
					getApp().globalData.latitude = this.latitude
					getApp().globalData.longitude = this.longitude
				}
			},

			// 回到中心点
			moveToLocation() {
				const mapContext = uni.createMapContext('map', this)
				mapContext.moveToLocation()
			},

			// 点击地图标记事件
			markertap(data) {
				this.$refs.popup.open()
				this.curMarkerId = data.markerId
				// 测试数据
				if (this.curMarkerId === 0) {
					this.markerInfo = {
						type: 0, //type 0 为景点
						name: '麦田中心',
						desc: '麦田中心是一个历史悠久芜湖起飞芜湖芜湖芜湖芜湖芜湖芜湖芜湖芜湖芜湖芜湖芜湖',
						img: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3282131397,3379319612&fm=26&gp=0.jpg',
						video: '',
						distance: 450
					}
				} else {
					this.markerInfo = {
						type: 1, //type 1 为厕所
						distance: 1150
					}
				}
			}
		},
		components: {
			tools,
			panel
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		map {
			height: calc(100vh - 54rpx);
			width: 750rpx;
		}

		// 定位按钮
		.local {
			position: fixed;
			bottom: 160rpx;
			right: 15rpx;
			z-index: 10;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 88rpx;
			height: 88rpx;
			background: #fff;
			box-shadow: 0px 6rpx 13rpx 3rpx rgba(33, 33, 32, 0.18);
			border-radius: 50%;

			image {
				width: 65%;
				height: 65%;
			}

		}

		// 登录按钮
		.login-btn {
			position: fixed;
			display: flex;
			align-items: center;
			justify-content: center;
			bottom: 70rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 420rpx;
			height: 88rpx;
			box-shadow: 0px 8rpx 16rpx 0px rgba(239, 181, 22, 0.48);
			border-radius: 44rpx;
			background: $base-color;
		}
	}
</style>
