<template>
	<view class="index">
		<tools class="tools" :scenery="scenery" />
		<map id="map" :latitude="latitude" :longitude="longitude" :polygons="polygons" show-location show-compass :markers="markers"
		 @markertap="markertap"></map>

		<!-- 定位 -->
		<view class="local" @click="moveToLocation">
			<image src="../../static/local.png" mode=""></image>
		</view>
		<!-- 登录按钮 -->
		<view class="login-btn" @click="login" v-if="!isLogin">
			<text>登录</text>
		</view>

		<!-- 弹出面板 -->
		<uni-popup ref="popup" type="top">
			<panel :markerInfo="markerInfo" />
		</uni-popup>

	</view>
</template>

<script>
	// 引入腾讯地图核心类
	import QQMapWX from '../../libs/qqmap-wx-jssdk.min.js'
	import panel from './components/panel.vue'
	import tools from './components/tools.vue'
	import {
		querySceneryNum,
		queryFence,
		queryFacilities,
		queryScenicSpot
	} from '../../api/api.js'
	export default {
		data() {
			return {
				isLogin: false,
				timer: null,
				latitude: 36.026226,
				longitude: 103.75202,
				scenery: '未定位到景区',
				polygons: [],
				curMarkerId: 0,
				markerInfo: {},
				markers: [],
				iconPath: new Map([
					["FAC_ALM", "alm"],
					["FAC_WC", "toilet"],
					["FAC_DOOR", "door"],
					["FAC_SELL", "shop"],
					["FAC_SERVICE", "servicestation"],
				]),
				facilitiesData: [],
				sceneryData: []
			}
		},

		onShow() {
			// 查询是否登录
			uni.getStorageSync('token') && (this.isLogin = true)
		},

		onLoad() {
			// 实例化API核心类
			const qqmapsdk = new QQMapWX({
				key: '56LBZ-OKVCW-TP3RL-RVH7P-RDRIQ-4EB2T'
			});

			// 获取地理位置
			this.getLocation()
		},
		onUnload() {
			// 清除定时器
			clearInterval(this.timer)
		},
		methods: {
			// 登录
			login() {
				uni.navigateTo({
					url: '../login/login'
				})
			},

			// 获取到景区
			async getScenery() {
				const res = await querySceneryNum({
					// lat:  getApp().globalData.latitude,
					// lon:  getApp().globalData.longitude
					"lon": 116.304279,
					"lat": 40.012476
				})
				this.scenery = res.value.name
				getApp().globalData.sceneryNo = res.value.no
				// 获取到围栏
				this.getFence()
				// 获取到景点及设施
				this.getFacilities()
				this.getScenicSpot()
			},

			// 获取到设施
			async getFacilities() {
				const res = await queryFacilities({
					sceniceNo: getApp().globalData.sceneryNo
				})
				if (JSON.stringify(res.value) === JSON.stringify(this.facilitiesData)) {
					return console.log('重复数据不予添加')
				}

				// 储存标记点信息
				this.facilitiesData = res.value
				res.value.forEach(v => {
					this.markers.push({
						height: 78,
						iconPath: `/static/${this.iconPath.get(v.type)}.png`,
						id: 's' + v.id,
						latitude: v.lat,
						longitude: v.lon,
						width: 65
					})
				})
			},
			async getScenicSpot() {
				const res = await queryScenicSpot({
					sceniceNo: getApp().globalData.sceneryNo
				})
				// 和原来的信息进行对比
				if (JSON.stringify(res.value) === JSON.stringify(this.sceneryData)) {
					return console.log('重复数据不予添加')
				}

				// 储存标记点信息
				this.sceneryData = res.value
				res.value.forEach(v => {
					this.markers.push({
						height: 78,
						iconPath: `/static/scenery.png`,
						id: 'j' + v.id,
						latitude: v.lat,
						longitude: v.lon,
						width: 65
					})
				})
			},

			// 开启定时器
			startTimer() {
				if (!uni.getStorageSync('token')) return
				const count = () => {
					this.getScenery();
					return count;
				};
				this.timer = setInterval(count(), 30000);
			},

			// 获取到地理位置
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
					getApp().globalData.latitude = res.latitude
					getApp().globalData.longitude = res.longitude
					// 开启定时器
					this.startTimer()

					// 开启实时位置监听
					uni.startLocationUpdate({
						success() {
							uni.onLocationChange(async r => {
								getApp().globalData.latitude = r.latitude
								getApp().globalData.longitude = r.longitude
							})
						}
					})
				}
			},

			// 渲染电子围栏
			async getFence() {
				const res = await queryFence({
					sceneryNo: getApp().globalData.sceneryNo
				})
				// 生成多边形
				const {
					list
				} = res.value
				this.polygons = list.map(v => {
					const latLng = v.scope.split(';')
					const points = latLng.map(v => {
						const latitude = parseFloat(v.split(',')[1])
						const longitude = parseFloat(v.split(',')[0])
						return {
							latitude,
							longitude
						}
					})
					return {
						points,
						strokeColor: "#0DC392",
						strokeWidth: 2,
						fillColor: "#07C28F26"
					}
				})
				console.log(this.polygons)
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
				/** 判断标记点类型
					s => 设施
					j => 景区
					y => 游客
				**/
				const markerType = this.curMarkerId.substr(0, 1)
				if (markerType === 'j') {
					// 根据类型生成markerInfo
					 this.createMakerInfo( this.sceneryData , markerType , this.curMarkerId )
				}else if ( markerType === 's' ){
					this.createMakerInfo( this.facilitiesData , markerType, this.curMarkerId )
				}
			},
			
			// 生成标记信息
			createMakerInfo(markerData,markerType,curId){
				for (const item of markerData) {
					const id = parseInt(curId.substr(1))
						console.log(markerData)
					if (item.id === id) {
						// 路径规划
						uni.getLocation({
							type: 'gcj02',
							success: ({
								latitude,
								longitude
							}) => {
								// 计算出距离
								const qqmapsdk = new QQMapWX({
									key: '56LBZ-OKVCW-TP3RL-RVH7P-RDRIQ-4EB2T'
								});
								qqmapsdk.direction({
									mode: 'walking',
									from: {
										latitude,
										longitude
									},
									to: {
										latitude: item.lat,
										longitude: item.lon
									},
									success: res => {
										const {
											distance
										} = res.result.routes[0]
										this.markerInfo = {
											type:markerType,
											coverUrl:item.coverUrl,
											distance,
											describe:item.describe,
											name:item.name || item.location,
											lon:item.lon,
											lat:item.lat
										}							
									},
									fail:res => {
										this.markerInfo = {
											type:markerType,
											coverUrl:item.coverUrl,
											distance:-1,
											describe:item.describe,
											name:item.name || item.location,
											lon:item.lon,
											lat:item.lat
										}	
										console.log(this.markerInfo)
									},
								})
							}
						})
						break
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
			height: 100vh;
			width: 750rpx;
		}

		.tools {
			position: fixed;
			top: 0;
			z-index: 99;
			width: 100%;
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
