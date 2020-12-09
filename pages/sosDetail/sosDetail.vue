<template>
	<view class="sos-detail">
		<map :style="{height:`calc( 100vh - ${mapHeight}px )`}" id="map" :longitude="longitude" :latitude="latitude" :markers="markers" :polyline="polyline"></map>
		<!-- 面板 -->
		<view class="panel">
			<view class="title">
				<text>游客{{ sosInfo.nickName }}SOS求救</text>
				<view class="navigation">
					<image @click="navigation(sosInfo.nickName)" src="../../static/navigation.png" mode=""></image>
				</view>
			</view>
			<view class="content">
				<view class="dl">
					<view class="dt">
						游客昵称：
					</view>
					<view class="dd">
						{{sosInfo.nickName}}
					</view>
				</view>
				<view class="dl">
					<view class="dd">
						游客手机：
					</view>
					<view class="dd">
						{{ sosInfo.phone || '游客未填写' }}
					</view>
				</view>
				<view class="dl">
					<view class="dt">
						求救方式：
					</view>
					<view class="dd">
						{{ sosTypeMap.get(sosInfo.sosType) }}
					</view>
				</view>
				<view class="dl">
					<view class="dt">
						求救时间：
					</view>
					<view class="dd">
						{{ sosInfo.sosDateTime }}
					</view>
				</view>
				<view class="dl">
					<view class="dt">
						求救坐标：
					</view>
					<view class="dd">
						{{ sosInfo.lat + '，' + sosInfo.lon }}
					</view>
				</view>
				<!-- <view class="dl">
					<view class="dt">
						海拔高度：
					</view>
					<view class="dd">
						1200
					</view>
				</view> -->
				<view class="dl">
					<view class="dt">
						求救地址：
					</view>
					<view class="dd">
						{{ sosInfo.seat }}
					</view>
				</view>

			</view>
			<view class="btn" :class="{ disabled:sosInfo.isConfirm === 1 }" @click="reslove">
				已处理
			</view>
		</view>
	</view>
</template>

<script>
	// 引入腾讯地图核心类
	import QQMapWX from '../../libs/qqmap-wx-jssdk.min.js'
	import {
		getLatLngCenter
	} from '@/utils/getLatLngCenter.js'
	import gcoord from '../../utils/gcoord.js'
	import { querySingleSos,sosResolve } from '../../api/api.js'
	export default {
		onLoad(options) {
			// 获取到panel的高度
			const query = uni.createSelectorQuery().in(this);
			query.select('.panel').boundingClientRect(data => {
			  this.mapHeight = data.height
			}).exec();
			
			this.getSOSLocation(options.id)
		},
		data() {
			return {
				longitude: '',
				latitude: '',
				sosInfo:{},
				sosTypeMap:new Map([
					[0,'紧急语音'],
					[1,'网络视频'],
					[2,'导游电话'],
					[3,'景区电话'],
					
				]),
				markers: [],
				polyline: [],
				includePoints: [],
				touristLocal: [],
				mapHeight:0
			};
		},
		methods: {
			async getSOSLocation(sosId) {
				const { value } = await querySingleSos({sosId})
				this.sosInfo = value
				// 模拟游客位置
				this.touristLocal = [value.lat, value.lon]
				// 获取到导游的位置
				uni.getLocation({
					type: 'gcj02',
					success: ({
						latitude,
						longitude
					}) => {
						// 计算出中心经纬度
						const center = getLatLngCenter([gcoord.transform(
						  [this.touristLocal[0],this.touristLocal[1]],    // 经纬度坐标
						  gcoord.BD09,     // 当前坐标系
						  gcoord.GCJ02     // 目标坐标系
						),[latitude,longitude]
						])
						this.longitude = center[1]
						this.latitude = center[0]
						
						// 将游客的位置转换为GCJ02坐标系
						const touristLngLatArr = gcoord.transform(
						  [this.touristLocal[1],this.touristLocal[0]],    // 经纬度坐标
						  gcoord.BD09,     // 当前坐标系
						  gcoord.GCJ02     // 目标坐标系
						)
						
						// const guideLngLatArr = gcoord.transform(
						//   [longitude,latitude],    // 经纬度坐标
						//   gcoord.BD09,     // 当前坐标系
						//   gcoord.GCJ02     // 目标坐标系
						// )
						
						const touristLngLat = {
							longitude: touristLngLatArr[0],
							latitude: touristLngLatArr[1]
						}
						
						const guideLngLat = {
							longitude,
							latitude
						}
						
						// 缩放以完整显示marker
						const mapContext = uni.createMapContext('map')
						mapContext.includePoints({
							points: [touristLngLat,guideLngLat],
							padding: [100, 100, 100, 100],
							success: res => {
								// 路径规划
								const qqmapsdk = new QQMapWX({
									key: '56LBZ-OKVCW-TP3RL-RVH7P-RDRIQ-4EB2T'
								});
								qqmapsdk.direction({
									mode: 'walking',
									from: guideLngLat,
									to: touristLngLat,
									fail:res=>{
										uni.showToast({
											icon:'none',
											title:'起终点距离过长'
										})
									},
									success: res => {
										const { distance } = res.result.routes[0]
										const coors = res.result.routes[0].polyline,
											pl = [];
										//坐标解压（返回的点串坐标，通过前向差分进行压缩）
										const kr = 1000000;
										for (let i = 2; i < coors.length; i++) {
											coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
										}
										//将解压后的坐标放入点串数组pl中
										for (let i = 0; i < coors.length; i += 2) {
											pl.push({
												latitude: coors[i],
												longitude: coors[i + 1]
											})
										}
										// 生成polyline
										this.polyline = [{
											points: pl,
											color: "#00cc99",
											width: 5,
											colorList:[]
										}]

										// 设置导游marker
										const guideMarker = {
											...guideLngLat,
											height: 44,
											iconPath: "/static/guide2.png",
											id: 0,
											width: 32,
											label: {
												content: '我',
												anchorX: -8

											}
										}
										
										const touristMarker = {
											...touristLngLat,
											height: 44,
											iconPath: "/static/youke@2x.png",
											id: 0,
											width: 32,
											label: {
												content: '游客',
												anchorX: -12
											},
											callout: {
												content: `距离您当前位置${distance}m`,
												borderRadius: 18,
												borderColor: '#FFCE0B',
												padding: 6,
												display: 'ALWAYS',
												borderWidth: 1
											}
										}
										// 生成marker
										this.markers.push(...[guideMarker, touristMarker])
									}
								})
							}
						})
					}
				});
			},

			navigation(nickName) {
				// 将BD-09坐标系转换为gcj02坐标系
				// 将游客的位置转换为GCJ02坐标系
				const touristLngLatArr = gcoord.transform(
				  [this.touristLocal[1],this.touristLocal[0]],    // 经纬度坐标
				  gcoord.BD09,     // 当前坐标系
				  gcoord.GCJ02     // 目标坐标系
				)
				
				const touristLngLat = {
					longitude: touristLngLatArr[0],
					latitude: touristLngLatArr[1]
				}
				
				// 调用app的导航服务
				wx.openLocation({
					...touristLngLat,
					name: `游客${nickName}的求救位置`, // 位置名
					address: '', // 要去的地址详情说明
					scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
				});
			},
			
			reslove(){
				if( this.sosInfo.isConfirm === 1 ) return
				uni.showModal({
					content:'请确认该条SOS信息是否已经被处理',
					success:async res=>{
						if(res.confirm){
							try{
								const res = await sosResolve({sosId:this.sosInfo.id})
								uni.showToast({
									icon:'none',
									title:'已成功处理'
								})
								uni.navigateBack()
							}catch(err){
								console.log(err)
								uni.showToast({
									icon:'none',
									title:'处理失败'
								})
							}
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.sos-detail {

		map {
			height: 50vh;
			width: 750rpx;
		}

		.panel {
			position: fixed;
			bottom: 0;
			padding: 30rpx;
			box-sizing: border-box;
			left: 0;
			right: 0;
			margin: 0 auto;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 6rpx 18rpx 0px rgba(36, 35, 34, 0.11);
			border-radius: 20rpx 20rpx 0 0;
			

			.title {
				position:relative;
				margin-bottom:37rpx;

				text {
					font-size: 36rpx;
					font-weight: bold;
					color: rgba(51, 50, 49, 1);
				}
				
				.navigation{
					position:absolute;
					right:0;
					top:0;
					width:100rpx;
					height:100rpx;
					display:flex;
					justify-content: center;
					align-items:center;
					background:#ffcb3d;
					border-radius:50%;
					box-shadow: 0px 8rpx 16rpx 0px rgba(158, 116, 1, 0.18);
					
					image {
						width: 60%;
						height: 60%;
						
					}
				}
				
			}

			.content {
				font-size: 30rpx;
				font-weight: 500;
				color: rgba(153, 152, 149, 1);

				.dl {
					display: flex;
					margin-bottom: 12rpx;
					
					.dt{
						flex-shrink: 0
					}
				}

			}

			.btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 96rpx;
				background: rgba(255, 203, 61, 1);
				box-shadow: 0px 8rpx 16rpx 0px rgba(158, 115, 1, 0.18);
				border-radius: 10rpx;
				font-size: 34rpx;
				font-weight: 400;
				color: rgba(51, 50, 49, 1);
				margin-top: 40rpx;
			}
			
			.disabled{
				background: #B3B1AF !important;
				box-shadow:none !important;
			}



		}

	}
</style>
