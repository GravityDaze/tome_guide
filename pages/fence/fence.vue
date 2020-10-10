<template>
	<view class="fence">
		<swiper class="swiper" v-if="showPanel" @change="change">
			<swiper-item v-for="(item,index) in fenceInfo" :key="item.id">
				<view class="swiper-item">
					<view class="num">
						{{ '0' + (index+1) }}
					</view>
					<view class="desc">
						<view class="title">{{ item.name }}</view>
						<view class="tips">
							<view>触发方式：{{warnTypeMap.get(item.warnType)}}</view>
							<view>提醒方式：{{remindTypeMap.get(item.remindType)}}</view>
							<!-- <view :style="{ color:fenceInfo.status === 0 ? 'red':'#999896' }">当前状态：{{statusMap.get(fenceInfo.status)}}</view> -->
						</view>
<!-- 						<view class="btn">
							<view class="enable" @click="changeFenceStatus">
								<image src="../../static/启用@2x.png" mode=""></image>
								{{ fenceInfo.status===0?'启用':'禁用' }}
							</view>

							<view class="delete" @click="delFence">
								<image src="../../static/删除@2x.png" mode=""></image>
								删除
							</view>
						</view> -->
					</view>

				</view>
			</swiper-item>
		</swiper>
		
		<map id="map" :latitude="latitude" :longitude="longitude" :polygons="polygons" :polyline="polyline" :markers="markers"></map>
		
		<!-- 新增围栏按钮 -->
	<!-- 	<view class="add-fench" @click="addFench">
			<image :src="require(`../../static/${addMode?'清除':'新建'}@2x.png`)" mode=""></image>
		</view> -->
		
		<!-- 新增围栏面板 -->
		<!-- <view class="add-panel" v-if="addMode">
			<view class="title">
				<input type="text" value="" placeholder="请输入围栏标题" placeholder-class="phcolor" />
			</view>
			<view class="type">
				<view class="warn-type" @click="chooseWarnType">
					请选择触发条件
					<image src="../../static/icon-shaixuan@2x.png" mode=""></image>
				</view>

				<view class="remind-type" @click="chooseRemindType">
					请选择提醒方式
					<image src="../../static/icon-shaixuan@2x.png" mode=""></image>
				</view>
			</view>
		</view> -->
		
		<!-- 保存围栏 -->
	<!-- 	<view class="save-fence" @click="saveFence" v-if="addMode">
			保存
		</view> -->
		
	</view>
</template>

<script>
	import {
		queryFence,
		createFence,
		disableFence,
		enableFnece
	} from '@/api/api.js'
	import gcoord from '../../utils/gcoord.js'
	import {
		getLatLngCenter
	} from '@/utils/getLatLngCenter.js'
	import {
		isPolygon
	} from '@/utils/polygon.js'
	export default {
		data() {
			return {
				id:0, //自定义绘制围栏marker的id
				allowDrawing:false, // 是否允许在地图上绘制polyline
				showPanel: false,  //是否展示电子围栏面板
				// pageType: '', // 页面参数 'read' => 导游从'景区围栏'选项进入 , 'edit' => 导游从'自定义围栏'选项进入
				// addMode: false, // 是否处于新增或编辑电子围栏模式
				polygons: [], 
				// polyline:[],
				markers:[],
				fenceInfo: {}, //从服务器查询到的电子围栏信息
				latitude: '', 
				longitude: '',
				curIndex: 0, //当前展示的电子围栏的swiper索引
				warnTypeMap: new Map([
					[1, "出围栏报警"],
					[2, "进围栏报警"],
					[3, "进出围栏报警"]
				]),
				remindTypeMap: new Map([
					[0, "不提示"],
					[1, "振动"],
					[2, "语音"],
					[3, "语音+震动"]
				]),
				statusMap: new Map([
					[0, "禁用"],
					[1, "启用"],
					[9, "删除"]
				])
			}
		},
		onLoad() {
			if(!getApp().globalData.sceneryNo) {
				uni.showToast({
					icon:'none',
					title:'您不在任何景区',
					mask:true,
					duration:1000
				})
				return setTimeout( _=>uni.navigateBack(),1000 )
			}
			this.getFence()
		},
		methods: {
			async getFence() {
				const res = await queryFence({
					sceneryNo: getApp().globalData.sceneryNo
				})
				if (!res.value.list.length) {
					// 不存在景区围栏时, 返回导游当前的位置
					this.latitude = getApp().globalData.latitude
					this.longitude = getApp().globalData.longitude
					return uni.showToast({
						title: '该景区没有围栏',
						icon: 'none'
					});
				}
				
				this.showPanel = true
				// 生成所有电子围栏
				this.fenceInfo = res.value.list.map( v=>({
						id: v.id, // 围栏id
						name: v.name, //围栏名
						warnType: v.warnType, //触发条件 
						remindType: v.remindType, //提醒方式
						status: v.status ,//当前状态
						scope:v.scope // 经纬度集合
				}) ) 
				
				this.getPolygon()	
			},
			
			// 绘制多边形
			getPolygon(){
				
				const { scope } = this.fenceInfo[this.curIndex]
				// 获取到经纬度数组
				const latLng = scope.split(';')
				const floatlatLng = latLng.map(v => v.split(',').map(v => parseFloat(v))).map(v => [v[1], v[0]])
				// 获取到中心经纬度
				this.latitude = getLatLngCenter(floatlatLng)[0]
				this.longitude = getLatLngCenter(floatlatLng)[1]
				
				// 绘制多边形
				const points = floatlatLng.map(v => {
					
					// 将经纬度转换为GCJ02坐标系
					const [ longitude , latitude ] = gcoord.transform(
					  [v[1],v[0]],    // 经纬度坐标
					  gcoord.BD09,               // 当前坐标系
					  gcoord.GCJ02                 // 目标坐标系
					)
					
					return {
						latitude,
						longitude
					}
				})
				
				// 缩放以完整显示marker
				const mapContext = uni.createMapContext('map', this)
				mapContext.includePoints({
					points: points,
					padding: [100, 100, 100, 100],
				})
				
				this.polygons=[{
					points,
					strokeColor: "#0DC392",
					strokeWidth: 2,
					fillColor: "#07C28F26"
				}]
				
			},
			
			change({detail}){
				this.curIndex = detail.current
				this.getPolygon()
			},
			
			// 新增围栏
			// addFench() {
			// 	this.addMode = !this.addMode
			// 	this.allowDrawing = this.addMode
			// 	!this.addMode && this.clearMapCover()
			// },

			// 改变围栏状态
			// async changeFenceStatus() {
			// 	if (this.fenceInfo.status === 0) {
			// 		// 启用电子围栏
			// 		const res = await enableFence({
			// 			id: this.fenceInfo.id
			// 		})
			// 		this.fenceInfo.status = 1
			// 	} else {
			// 		const res = await disableFence({
			// 			id: this.fenceInfo.id
			// 		})
			// 		this.fenceInfo.status = 0
			// 	}

			// },
			
			// // 选择报警方式
			// chooseWarnType(){
			// 	uni.showActionSheet({
			// 		 itemList: ['出围栏报警', '进围栏报警', '进出围栏报警'],
			// 		 success: ({tapIndex}) => {
			// 			// this.userInfo.sex = tapIndex
			// 		 }
			// 	})
			// },
			
			// // 选择提醒类型
			// chooseRemindType(){
			// 	uni.showActionSheet({
			// 		 itemList: ['不提示', '震动', '语音','语音+震动'],
			// 		 success: ({tapIndex}) => {
			// 			// this.userInfo.sex = tapIndex
			// 		 }
			// 	})
			// },
			
			// 清除地图上所有标记物
			// clearMapCover(){
			// 	this.polygons = []
			// 	this.polyline = []
			// 	this.markers = []
			// 	this.id = 0 
			// },
			
			// 绘制围栏
			// drawPolyline(e){
			// 	if(!this.allowDrawing) return
				
			// 	// 点击地图时 在地图上创建marker
			// 	const { latitude, longitude } = e.detail
			// 	this.markers.push({
			// 		id:this.id++,
			// 		latitude,
			// 		longitude,
			// 		iconPath:'/static/定位@2x.png'
			// 	})
			// 	// 根据marker的坐标绘制polyline
			// 	const points = this.markers.map( v=>({
			// 		latitude:v.latitude,
			// 		longitude:v.longitude
			// 	}) )
			// 	this.polyline = [{
			// 		points,
			// 		width:2,
			// 		color:'#0DC392',
			// 		dottedLine:true
			// 	}]
			// },
			
			// 点击第一个marker时将polyline闭合为polygon
	// 		closeLine(e){
	// 			if(!this.allowDrawing) return
	// 			if( e.markerId !== 0 ){
	// 				uni.showToast({
	// 					title:'请选择第一个标记进行闭合',
	// 					icon:'none'
	// 				})
	// 			}else{
					
	// 				const points = this.markers.map( v=>({
	// 					latitude:v.latitude,
	// 					longitude:v.longitude
	// 				}) )
	
	// 				if( points.length <= 2 ){
	// 					return uni.showToast({
	// 						title:'请至少绘制三个点',
	// 						icon:'none'
	// 					})
	// 				}
					
	// 				// 判断绘制出来的是否是规则多边形
	// 				if( !isPolygon(points)){
	// 					this.clearMapCover()
	// 					return uni.showToast({
	// 						title:'请绘制规则的多边形',
	// 						icon:'none'
	// 					})
	// 				}
	// 				// 形成闭合多边形
	// 				this.polygons = [{
	// 					points,
	// 					strokeColor: "#0DC392",
	// 					strokeWidth: 2,
	// 					fillColor: "#07C28F26"
	// 				}]
	// 				// 清除polyLine
	// 				this.polyline = []
	// 				this.markers = []
	// 				this.id = 0 
	// 				uni.showToast({
	// 					title:'电子围栏绘制成功',
	// 					icon:'none'
	// 				})
	// 				this.allowDrawing = false
	// 			}
	// 		},
			
			// 创建围栏
			// async saveFence(){
			// 	const res = await createFence({
			// 		sceneryNo: "S0001",
			// 		name: "测试围栏",
			// 		scope:"103.57289155100398_30.91334920379188,103.57642189165819_30.913597063584852",
			// 		warnType:1,
			// 		remindType:1
			// 	})
			// 	console.log(res)
			// }
			 
		}
	}
</script>

<style lang="scss" scoped>
	.fence {
		.swiper {
			position: fixed;
			margin-top: 20rpx;
			z-index: 99;
			width: 100%;
			height: 500rpx;

			.swiper-item {
				position: relative;
				display: flex;
				padding-bottom: 60rpx;
				width: 700rpx;
				margin: auto;
				box-shadow: 0px 1rpx 23rpx 1rpx rgba(36, 36, 35, 0.08);
				border-radius: 30rpx;
				background: #fff;

				.num {
					position: absolute;
					top: 30rpx;
					left: 16rpx;
					font-size: 86rpx;
					font-family: Helvetica;
					font-weight: bold;
					color: rgba(255, 203, 62, 1);

					&::after {
						content: '';
						display: block;
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translateX(-50%);
						width: 67rpx;
						height: 4rpx;
						background: rgba(255, 203, 62, 1);
					}

				}

				.desc {
					margin-left: 165rpx;

					.title {
						margin-top: 55rpx;
						font-size: 36rpx;
						font-weight: bold;
						color: rgba(51, 51, 50, 1);
					}

					.tips {
						margin-top: 30rpx;
						display: flex;
						flex-flow: column;

						font-weight: 500;
						color: rgba(153, 152, 150, 1);

						view {
							margin-bottom: 12rpx;
							font-size: 30rpx;
						}
					}

				}

				.btn {

					display: flex;

					.enable,
					.delete {
						display: flex;
						justify-content: center;
						align-items: center;
						height: 60rpx;
						width: 160rpx;
						color: #fff;
						background: rgba(255, 203, 62, 1);
						box-shadow: 0px 4rpx 21rpx 0px rgba(255, 203, 62, 0.48);
						border-radius: 8rpx;
						font-size: 28rpx;
						margin-top: 40rpx;
						margin-right: 45rpx;
					}

					.delete {
						background: #FA491D;
						box-shadow: 0px 4px 21px 0px rgba(250, 73, 29, 0.48);
					}

					image {
						width: 35rpx;
						height: 32rpx;
						padding: 8rpx;
					}
				}
			}
		}



		map {
			height: 100vh;
			width: 750rpx;
		}

		// 新增按钮
		.add-fench {
			position: fixed;
			right: 16rpx;
			z-index: 99;
			bottom: 150rpx;

			image {
				width: 95rpx;
				height: 95rpx;
			}
		}

		.phcolor {
			color: #999996;
;
		}
		
		// 保存按钮
		.save-fence{
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

		// 新增面板
		.add-panel {
			position: fixed;
			padding: 35rpx;
			left: 0;
			right: 0;
			margin: auto;
			top: 20rpx;
			z-index: 99;
			width: 718rpx;
			box-sizing: border-box;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 1rpx 23rpx 1rpx rgba(36, 36, 35, 0.08);
			border-radius: 30rpx;

			.title {
				width: 100%;
				height: 80rpx;
				background: rgba(255, 0, 42, 0);
				border: 1rpx solid rgba(203, 203, 203, 1);
				box-sizing: border-box;
				border-radius: 3rpx;
				margin-bottom: 20rpx;


				input {
					width: 100%;
					height: 100%;
					padding: 0 20rpx;
					box-sizing: border-box;
				}
			}

			.type {

				display: flex;
				justify-content: space-between;

				.warn-type,
				.remind-type {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 20rpx;
					box-sizing: border-box;
					width: 300rpx;
					height: 80rpx;
					border: 1rpx solid rgba(203, 203, 203, 1);
					border-radius: 3rpx;
					color: rgba(153, 153, 150, 1);
					font-size:30rpx;

					image {
						width: 30rpx;
						height: 38rpx;
					}
				}

			}

		}

	}
</style>
