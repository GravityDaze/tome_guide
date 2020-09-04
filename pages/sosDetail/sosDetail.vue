<template>
	<view class="sos-detail">
		<map :style="{height:`calc( 100vh - ${mapHeight}px )`}" id="map" :longitude="longitude" :latitude="latitude" :markers="markers" :polyline="polyline"></map>
		<!-- 面板 -->
		<view class="panel">
			<view class="title">
				<text>游客夏天SOS求救</text>
				<image src="../../static/jiuyuanxiangqingsos@2x.png" mode=""></image>
			</view>
			<view class="content">
				<view class="dl">
					<view class="dt">
						游客昵称：
					</view>
					<view class="dd">
						夏天
					</view>
				</view>
				<view class="dl">
					<view class="dd">
						游客手机：
					</view>
					<view class="dd">
						18200001234
					</view>
				</view>
				<view class="dl">
					<view class="dt">
						求救方式：
					</view>
					<view class="dd">
						对讲机
					</view>
				</view>
				<view class="dl">
					<view class="dt">
						求救时间：
					</view>
					<view class="dd">
						2019-7-10 17:33:30
					</view>
				</view>
				<view class="dl">
					<view class="dt">
						求救坐标：
					</view>
					<view class="dd">
						103.4562451,40.3555
					</view>
				</view>
				<view class="dl">
					<view class="dt">
						海拔高度：
					</view>
					<view class="dd">
						1200
					</view>
				</view>
				<view class="dl">
					<view class="dt">
						求救地址：
					</view>
					<view class="dd">
						上清宫小卖部
					</view>
				</view>

			</view>
			<view class="btn" @click="navigation">
				导航
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
	export default {
		onLoad() {
			// 获取到panel的高度
			const query = uni.createSelectorQuery().in(this);
			query.select('.panel').boundingClientRect(data => {
			  this.mapHeight = data.height
			}).exec();
			
			this.getSOSLocation()
		},
		data() {
			return {
				longitude: '',
				latitude: '',
				markers: [],
				polyline: [],
				includePoints: [],
				touristLocal: [],
				mapHeight:0
			};
		},
		methods: {
			getSOSLocation() {
				// 模拟游客位置
				this.touristLocal = [30.715819, 104.112577]
				// 获取到导游的位置
				uni.getLocation({
					type: 'gcj02',
					success: ({
						latitude,
						longitude
					}) => {
						// 计算出中心经纬度
						const center = getLatLngCenter([this.touristLocal, [latitude, longitude]])
						this.longitude = center[1]
						this.latitude = center[0]
						// 保存游客和导游所在位置的经纬度
						const touristLngLat = { 
							longitude: this.touristLocal[1],
							latitude: this.touristLocal[0]
						}
						const guideLngLat = {
							latitude, 
							longitude
						}
						// 缩放以完整显示marker
						const mapContext = uni.createMapContext('map', this)
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
											color: "#74C0F7",
											width: 5
										}]

										// 设置导游marker
										const guideMarker = {
											...guideLngLat,
											height: 44,
											iconPath: "/static/导游@2x.png",
											id: 0,
											width: 32,
											label: {
												content: '我',
												anchorX: -8

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
										// 设置游客marker
										const touristMarker = {
											...touristLngLat,
											height: 44,
											iconPath: "/static/youke@2x.png",
											id: 0,
											width: 32,
											label: {
												content: '游客',
												anchorX: -12
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

			navigation() {
				// 调用app的导航服务
				wx.openLocation({
					latitude: this.touristLocal[0],
					longitude: this.touristLocal[1],
					name: '终点位置', // 位置名
					address: '测试说明', // 要去的地址详情说明
					scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
				});
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
				display: flex;
				align-items: center;
				justify-content: space-between;

				text {
					font-size: 36rpx;
					font-weight: bold;
					color: rgba(51, 50, 49, 1);
				}

				image {
					width: 76rpx;
					height: 80rpx;
				}
			}

			.content {
				font-size: 30rpx;
				font-weight: 500;
				color: rgba(153, 152, 149, 1);

				.dl {
					display: flex;
					margin-bottom: 12rpx;
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



		}

	}
</style>
