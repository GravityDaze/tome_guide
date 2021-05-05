<template>
	<view class="index">
		<tools class="tools" :scenery="scenery" :menuItems="menuItemsRes" v-if="isLogin" />
		<map id="map" :latitude="latitude" :longitude="longitude" :polygons="polygons" show-location show-compass :markers="markers"
		 @markertap="markertap"></map>

		<view class="btn">
			<!-- 定位 -->
			<view class="local" @click="moveToLocation">
				<image src="../../static/local.png"></image>
			</view>
			<!-- 刷新 -->
			<view v-if="isLogin" class="refresh" @click="refresh">
				<image :class="rotate?'active':''" src="../../static/refresh.png"></image>
			</view>
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
		queryScenicSpot,
		isCreateTeam,
		queryTeamInfo,
		uploadLocation,
		getSos,
		delSos
	}
	from '../../api/api.js'
	import gcoord from '../../utils/gcoord.js'
	export default {
		data() {
			return {
				rotate: false, //旋转动画
				isLogin: false, //当前是否登录
				timer: null, // 景区设施定时器
				timer2: null, // sos求救信息定时器
				latitude: 36.026226,
				longitude: 103.75202,
				scenery: '未定位到景区', //当前景区
				polygons: [], //围栏
				manual: false, // marker是否处于手动切换模式
				markerInfo: {}, // marker信息
				markers: [], // marker数据
				menuItems:[],
				menuArr: Object.freeze([{
						name: '消息',
						icon: 'icon_quanbuxiaoxi@2x',
						url: '/pages/message/message'
					},
					{
						name: '组团',
						icon: 'icon_quanbuzutuan@2x',
						url: '/pages/group/group'
					},
					{
						name: '个人中心',
						icon: 'icon_quanbugerenzhongxin@2x',
						url: '/pages/personal/personal'
					},
					{
						name: '发布消息',
						icon: 'icon_quanbufabuxiaoxi@2x',
						url: '/pages/publish/publish'
					}
				]), //工具栏数据
			}
		},
		computed:{
			menuItemsRes(){
				// 防止极端情况下网络故障时无法退出
				return this.menuItems.length?this.menuItems:this.menuArr.filter( v=>v.name==='个人中心' )
			}
		},
		onShow() {
			// 恢复标题
			uni.setNavigationBarTitle({
				title: "途咪导游端"
			})

			// 查询是否为导游登录
			this.isLogin = uni.getStorageSync('token') && uni.getStorageSync('customerInfo')
			// 查询是否为管理员登录
			if (uni.getStorageSync('token') && !uni.getStorageSync('customerInfo')) {
				return uni.redirectTo({
					url: '/pages/admin/admin'
				})
			}   

			// 获取地理位置
			this.getLocation()
			// 查询是否建团
			this.queryGroup()
		},
		onUnload() {
			// 清除定时器
			clearInterval(this.timer)
			clearInterval(this.timer2)
			this.timer = null
			this.timer2 = null
			uni.offLocationChange()
		},
		methods: {
			// 登录
			login() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},

			// 进首页时查询是否建团动态切换菜单栏数据
			async queryGroup() {
				if (!this.isLogin) return
				const {
					value
				} = await isCreateTeam()
				if (value) {
					this.menuItems = this.menuArr.map(v => {
						if (v.name === "组团") {
							return {  ...v,name:'我的团',url:'/pages/myGroup/myGroup' }
						}
						return v
					})
					getApp().globalData.touristTeamNo = value
					// 已建团时查询游客位置并生成标记
					this.getTourist()
					// 已建团时开启定时器查询是否有新的sos信息
					this.getNewSos()
				} else {
					getApp().globalData.touristTeamNo = ''
					this.menuItems = this.menuArr.map(v => {
						if (v.name === "我的团") {
							return {  ...v,name:'组团',url:'/pages/group/group' }
						}
						return v
					}).filter( v=>v.name !== '发布消息' )
					// 未建团时清除游客标记
					this.markers = []
				}
			},


			// 开启sos定时器
			getNewSos() {
				if (!this.isLogin || this.timer2) return
				const count = () => {
					this.getSos();
					return count;
				};
				this.timer2 = setInterval(count(), 5000);
			},

			// 获取新的sos信息
			async getSos() {
				const res = await getSos()
				if (res.value === 1) {
					await delSos()
					uni.showModal({
						content: '您收到一条新的sos消息，请查看',
						success: async res => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/sos/sos'
								})
							}
						}
					})
				}
			},

			//  获取到游客并展示到地图
			async getTourist() {
				const res = await queryTeamInfo({
					customerId: ''
				})
				const { member } = res.value
				// 转换坐标系
				this.member = member.map(v => {
					const [lon, lat] = gcoord.transform(
						[+v.lon, +v.lat], // 经纬度坐标
						gcoord.BD09, // 当前坐标系
						gcoord.GCJ02 // 目标坐标系
					)
					return { 
						...v,
						lon,
						lat
					}
				})
				// 生成标记
				this.markers = this.member.map(v => {
					return {
						height: 71,
						iconPath: `/static/youke@2x.png`,
						id: v.id,
						latitude: v.lat,
						longitude: v.lon,
						width: 54
					}
				})
			},

			// 获取到景区
			async getScenery() {
				const res = await querySceneryNum({
					lat: getApp().globalData.latitude,
					lon: getApp().globalData.longitude
				})
				if (!res.value) {
					this.scenery = "未定位到景区"
					getApp().globalData.sceneryNo = ""
					// 判断导游在走出景区的时候是否建团,如果未建团则清除地图上的Marker信息,
					if (!getApp().globalData.touristTeamNo) {
						// 清除围栏数据
						this.polygons = []
						// 清除marker数据
						this.marker = []
						this.markerInfo = {}
					}

				} else {
					this.scenery = res.value.name
					getApp().globalData.sceneryNo = res.value.no
					// 获取到围栏
					this.getFence()
				}
			},

			// 开启定时器
			startTimer() {
				if (!this.isLogin || this.timer) return
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
							content: '检测到您拒绝了地理位置授权，这将无法获取到正确的位置，请打开设置界面手动开启权限。 ',
							success: async ({
								confirm
							}) => {
								if (confirm) {
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
						success: () => {
							uni.onLocationChange(async r => { 
								if (!this.isLogin) return
								// 将经纬度转换为BD-09坐标系
								const [lon, lat] = gcoord.transform(
									[r.longitude, r.latitude], // 经纬度坐标
									gcoord.GCJ02, // 当前坐标系
									gcoord.BD09 // 目标坐标系
								)
								getApp().globalData.latitude = lat
								getApp().globalData.longitude = lon
								// 实时上传导游位置数据
								const {
									no,
									imei,
									phone
								} = JSON.parse(uni.getStorageSync('customerInfo'))
								if (getApp().globalData.sceneryNo && getApp().globalData.touristTeamNo) {
									console.log('uploading...') 
									await uploadLocation([{
										sceneryNo: getApp().globalData.sceneryNo,
										customerNo: no,
										imei: imei || phone,
										lat,
										lon,
										touristTeamNo: getApp().globalData.touristTeamNo
									}])
								}
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
						const [lon, lat] = v.split(',')
						// 将经纬度转换为GCJ02坐标系
						const [longitude, latitude] = gcoord.transform(
							[+lon, +lat], // 经纬度坐标
							gcoord.BD09, // 当前坐标系
							gcoord.GCJ02 // 目标坐标系
						)
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
			},

			// 回到中心点
			moveToLocation() {
				const mapContext = uni.createMapContext('map')
				mapContext.moveToLocation()
			},

			// 刷新
			refresh() {
				this.rotate = true
				uni.showLoading({
					mask: true,
					title: '更新数据中'
				})
				this.getScenery()
				this.queryGroup()
				setTimeout(_ => {
					this.rotate = false
					uni.hideLoading()
				}, 1000)
			},

			// 点击地图标记事件
			markertap(e) {
				// 消除原标记
				this.markerInfo = {}
				this.$refs.popup.open()
				this.$nextTick( _=> this.createMakerInfo(e.detail.markerId) )
			},

			// 生成游客标记信息
			createMakerInfo(id) {
				for (const item of this.member) {
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
								// 创建对象
								const createMarkerObj = (item,distance)=> ({
										nickName: item.nickName,
										distance,
										battery: item.battery,
										no: item.no,
										imei: item.imei,
										phone: item.phone,
										lon: item.lon,
										lat: item.lat
								})
								
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
										this.markerInfo = createMarkerObj( item,distance )
									},
									fail: res => {
										this.markerInfo = createMarkerObj( item,-1 )
									}
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

		.btn {

			position: fixed;
			bottom: 160rpx;
			right: 15rpx;
			z-index: 10;

			// 定位按钮
			.local {

				display: flex;
				align-items: center;
				justify-content: center;
				width: 88rpx;
				height: 88rpx;
				background: #fff;
				box-shadow: 0px 6rpx 13rpx 3rpx rgba(33, 33, 32, 0.18);
				border-radius: 50%;
				margin-bottom: 20rpx;

				image {
					width: 65%;
					height: 65%;
				}

			}

			.refresh {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 88rpx;
				height: 88rpx;
				background: #fff;
				box-shadow: 0px 6rpx 13rpx 3rpx rgba(33, 33, 32, 0.18);
				border-radius: 50%;

				@keyframes rotate {
					from {
						transform: rotate(0);

					}

					to {
						transform: rotate(360deg);

					}
				}

				image {
					width: 55%;
					height: 55%;
				}

				.active {
					animation: rotate 1s infinite linear;
				}

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
