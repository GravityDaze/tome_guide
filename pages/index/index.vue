<template>
	<view class="index">
		<tools class="tools" :scenery="scenery" @changeMarker="changeMarker" :menuItems="menuItems" v-if="isLogin" />
		<map id="map" :latitude="latitude" :longitude="longitude" :polygons="polygons" show-location show-compass :markers="markers"
		 @markertap="markertap"></map>
		
		<view class="btn">
			<!-- 定位 -->
			<view class="local" @click="moveToLocation">
				<image src="../../static/local.png"></image>
			</view>
			<!-- 刷新 -->
			<view v-if="isLogin" class="refresh" @click="refresh">
				<image src="../../static/refresh.png"></image>
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
		uploadLocation
	} from '../../api/api.js'
	import gcoord from '../../utils/gcoord.js'
	export default {
		data() {
			return {
				isLogin: false, //当前是否登录
				timer: null, // 定时器
				latitude: 36.026226,
				longitude: 103.75202,
				scenery: '未定位到景区', //当前景区
				polygons: [], //围栏
				markerType: 'scenicSpot', //当前应当显示哪种类型的type
				curMarkerId: 0,
				manual: false, // marker是否处于手动切换模式
				markerInfo: {}, // marker信息
				markers: [], // marker数据
				menuItems: [{
						name: '景点',
						icon: 'icon_quanbujingdian@2x',
						type: 'scenicSpot'
					},
					{
						name: '设施',
						icon: 'icon_jingdiansheshi@2x',
						type: 'facilities'
					},

					// {
					// 	name: '店铺',
					// 	icon: 'icon_quanbudianpu@2x',
					// 	type:'shop'
					// },
					{
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
					// {
					// 	name: '关闭围栏',
					// 	icon: 'icon_quanbuguanbiweilan@2x'
					// },
					{
						name: '发布消息',
						icon: 'icon_quanbufabuxiaoxi@2x',
						url: '/pages/publish/publish'
					}
				], //工具栏数据
				iconPath: new Map([
					["FAC_ALM", "alm"],
					["FAC_WC", "toilet"],
					["FAC_DOOR", "door"],
					["FAC_SELL", "shop"],
					["FAC_SERVICE", "servicestation"],
				]),
				facilitiesData: [], //设施数据
				scenicSpotData: [] // 景点数据

			}
		},

		onShow() {
			// 恢复标题
			uni.setNavigationBarTitle({
			      title: "途咪导游机"
			})
			
			// 查询是否为导游登录
			this.isLogin = uni.getStorageSync('token') && uni.getStorageSync('customerInfo')
			// 查询是否为管理员登录
			if(  uni.getStorageSync('token') && !uni.getStorageSync('customerInfo') ){
				return uni.redirectTo({
					url:'/pages/list/list'
				})
			}
			
			// 获取地理位置
			this.getLocation()
			// 查询是否建团
			this.queryGroup()
		},

		onLoad() {
			// 实例化API核心类
			const qqmapsdk = new QQMapWX({
				key: '56LBZ-OKVCW-TP3RL-RVH7P-RDRIQ-4EB2T'
			});
		},
		onUnload() {
			// 清除定时器
			clearInterval(this.timer)
			this.timer = null
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
				if( !this.isLogin ) return 
				const {
					value
				} = await isCreateTeam()
				console.log(value)
				if (value) {
					this.menuItems = this.menuItems.map(v => {
						if (v.name === "组团") {
							v.name = '我的团'
							v.url = '/pages/myGroup/myGroup'
						}
						return v
					})
					getApp().globalData.touristTeamNo = value
					
					// 已建团时查询游客位置并生成标记
					this.getTourist()
				} else {
					getApp().globalData.touristTeamNo = ''
					this.menuItems = this.menuItems.map(v => {
						if (v.name === "我的团") {
							v.name = '组团'
							v.url = '/pages/group/group'
						}
						return v
					})
					// 未建团时清除游客标记
					for (let i = 0; i < this.markers.length; i++) {
						if (this.markers[i].id.substr(0, 1) === 'y') {
							this.markers.splice(i, 1)
							i--
						}
					}

				}
			},

			// 手动marker的显示状态
			changeMarker(type) {
				// 切换toast
				uni.showToast({
					icon:'none',
					title:`当前显示${ type === 'scenicSpot' ? '景点':'设施'}`
				})
				this.manual = true;
				this.markerType = type
				this.getMarkers(this.markerType)
			},

			// 手动切换菜单中景区和设施的切换 
			getMarkers(type) {
				if (type === 'scenicSpot') {
					this.getScenicSpot()
				} else {
					this.getFacilities()
				}
			},

			//  获取到游客
			async getTourist() {
				// 在地图上显示游客数据
				const res = await queryTeamInfo()
				const {
					member
				} = res.value
				// 将member中的坐标系转换为gjc02坐标系
				for( const v of member ){
					const [ lon,lat ] = gcoord.transform(
					  [parseFloat(v.lon),parseFloat(v.lat)],    // 经纬度坐标
					  gcoord.BD09,     // 当前坐标系
					  gcoord.GCJ02     // 目标坐标系
					)
					v.lon = lon
					v.lat = lat
					
				}
				
			
				if (JSON.stringify(member) === JSON.stringify(this.member)) {
					return console.log('重复数据不予添加')
				}
				
				// 清除游客数据
				for (let i = 0; i < this.markers.length; i++) {
					if (this.markers[i].id.substr(0, 1) === 'y') {
						this.markers.splice(i, 1)
						i--
					}
				}
				
				this.member = member
				for (const v of member) {
					if (!v.lon || !v.lat) continue
					this.markers.push({
						height: 71,
						iconPath: `/static/youke@2x.png`,
						id: 'y' + v.id,
						latitude: v.lat,
						longitude: v.lon,
						width: 54
					})
				}
			},
			
			// 获取到景区
			async getScenery() {
				const res = await querySceneryNum({
					lat:  getApp().globalData.latitude,
					lon:  getApp().globalData.longitude
				})
				if(!res.value) return
				this.scenery = res.value.name
				getApp().globalData.sceneryNo = res.value.no
				// 获取到围栏
				this.getFence()
				// 获取到标记信息
				this.getMarkers(this.markerType)
			},

			// 获取到设施
			async getFacilities() {
				const res = await queryFacilities({
					sceniceNo: getApp().globalData.sceneryNo
				})
				
				// 将设施中的坐标系转换为gjc02坐标系
				for( const v of res.value ){
					const [ lon,lat ] = gcoord.transform(
					  [parseFloat(v.lon),parseFloat(v.lat)],    // 经纬度坐标
					  gcoord.BD09,               // 当前坐标系
					  gcoord.GCJ02                 // 目标坐标系
					)
					v.lon = lon
					v.lat = lat
				}

				if (JSON.stringify(res.value) === JSON.stringify(this.facilitiesData) && !this.manual) {
					return console.log('重复数据不予添加')
				}
				// 恢复自动模式
				this.manual = false
				// 先清除markers中除游客以外的所有数据
				for (let i = 0; i < this.markers.length; i++) {
					if (this.markers[i].id.substr(0, 1) !== 'y') {
						this.markers.splice(i, 1)
						i--
					}
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

			// 获取到景点
			async getScenicSpot() {
				const res = await queryScenicSpot({
					sceniceNo: getApp().globalData.sceneryNo
				})
				
				// 将设施中的坐标系转换为gjc02坐标系
				for( const v of res.value ){
					const [ lon,lat ] = gcoord.transform(
					  [parseFloat(v.lon),parseFloat(v.lat)],    // 经纬度坐标
					  gcoord.BD09,               // 当前坐标系
					  gcoord.GCJ02                 // 目标坐标系
					)
					v.lon = lon
					v.lat = lat
				}

				// 和原来的信息进行对比
				if (JSON.stringify(res.value) === JSON.stringify(this.scenicSpotData) && !this.manual) {
					return console.log('重复数据不予添加')
				}
				
				// 恢复自动模式
				this.manual = false
				// 先清除markers中除了游客以外的所有数据
				for (let i = 0; i < this.markers.length; i++) {
					if (this.markers[i].id.substr(0, 1) !== 'y') {
						this.markers.splice(i, 1)
						i--
					}
				}

				// 储存标记点信息
				this.scenicSpotData = res.value
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
				if( !this.isLogin || this.timer  ) return
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
						success:()=> {
							uni.onLocationChange(async r => {
								if( !this.isLogin  ) return
								// 将经纬度转换为BD-09坐标系
								const [ lon,lat ] = gcoord.transform(
								  [r.longitude,r.latitude],    // 经纬度坐标
								  gcoord.GCJ02,               // 当前坐标系
								  gcoord.BD09                 // 目标坐标系
								)
								getApp().globalData.latitude = lon
								getApp().globalData.longitude = lat
								// 实时上传导游位置数据
								const { no,imei }  = JSON.parse( uni.getStorageSync('customerInfo') ) 
								if( getApp().globalData.sceneryNo && getApp().globalData.touristTeamNo ){
									await uploadLocation([{
										sceneryNo:getApp().globalData.sceneryNo,
										customerNo:no,
										imei,
										lat,
										lon,
										touristTeamNo:getApp().globalData.touristTeamNo
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
						const [ lon , lat ] = v.split(',')
						// 将经纬度转换为GCJ02坐标系
						const [ longitude , latitude ] = gcoord.transform(
						  [parseFloat(lon),parseFloat(lat)],    // 经纬度坐标
						  gcoord.BD09,               // 当前坐标系
						  gcoord.GCJ02                 // 目标坐标系
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
				const mapContext = uni.createMapContext('map', this)
				mapContext.moveToLocation()
			},
			
			// 刷新
			refresh(){
				uni.showLoading({
					mask:true,
					title:'更新数据中'
				})
				this.getLocation()
				this.queryGroup()
				setTimeout( _=>uni.hideLoading(),1000 )
			},

			// 点击地图标记事件
			markertap(data) {
				// 消除原标记
				this.markerInfo = {}
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
					this.createMakerInfo(this.scenicSpotData, markerType, this.curMarkerId)
				} else if (markerType === 's') {
					this.createMakerInfo(this.facilitiesData, markerType, this.curMarkerId)
				} else if (markerType === 'y') {
					this.createMakerInfo(this.member, markerType, this.curMarkerId)
				}
			},

			// 生成标记信息
			createMakerInfo(markerData, markerType, curId) {
				for (const item of markerData) {
					const id = parseInt(curId.substr(1))
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

										// 对游客信息单独处理
										if (markerType === 'y') {
											this.markerInfo = {
												type: markerType,
												nickName: item.nickName,
												distance,
												battery:item.battery,
												no: item.no,
												phone: item.phone,
												lon: item.lon,
												lat: item.lat
											}
										} else {
											this.markerInfo = {
												type: markerType,
												coverUrl: item.coverUrl,
												distance,
												describe: item.describe,
												name: item.name || item.location,
												lon: item.lon,
												lat: item.lat
											}
										}
									},
									fail: res => {
										if (markerType === 'y') {
											this.markerInfo = {
												type: markerType,
												nickName: item.nickName,
												distance:-1,
												battery:item.battery,
												no: item.no,
												phone: item.phone,
												lon: item.lon,
												lat: item.lat
												
											}
										} else {
											this.markerInfo = {
												type: markerType,
												coverUrl: item.coverUrl,
												distance: -1,
												describe: item.describe,
												name: item.name || item.location,
												lon: item.lon,
												lat: item.lat
											}
										}
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
		
		.btn{
			
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
			margin-bottom:20rpx;
		
			image {
				width: 65%;
				height: 65%;
			}
		
			}	
			
			.refresh{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 88rpx;
				height: 88rpx;
				background: #fff;
				box-shadow: 0px 6rpx 13rpx 3rpx rgba(33, 33, 32, 0.18);
				border-radius: 50%;
				
				
				
				image{
					width: 55%;
					height: 55%;
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
