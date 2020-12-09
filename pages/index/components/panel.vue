<template>
	<view class="panel">
		<view v-if="Object.keys(markerInfo).length === 0" class="loading">
			<text>加载中...</text>
		</view>
		
		<view v-else-if="markerInfo.type === 'j'" class="scenery">
			<view class="header">
				<view class="name">{{markerInfo.name || ''}}</view>
				<view class="distance">{{ markerInfo.distance == -1?`起终点过长`:`距离您${markerInfo.distance}m`}}</view>
			</view>
			
			<view class="body">
				<image class="img" :src="markerInfo.coverUrl" mode="center"></image>
				<view class="right">
					<view class="desc">{{markerInfo.describe || '...'}}</view>
					<view class="btn-area">
						<view class="go-there" @click="navigation(markerInfo)"><image src="../../../static/gohere.png" mode=""></image>去这里</view>
					</view>
				</view>
			</view>
		</view>
		
		<view v-else-if="markerInfo.type === 's'" class="toilet">
			<view class="distance"><view style="color:#FF704B">{{markerInfo.name || '...'}}</view>{{ markerInfo.distance == -1?`（起终点过长）`:`距离您${markerInfo.distance}m`   }}</view>
			<view class="go-there" @click="navigation(markerInfo)"><image src="../../../static/gohere.png" mode=""></image>去这里</view>
		</view>
		
		<view v-else class="tourist">
			<view class="header">
				<view class="name">游客{{markerInfo.nickName || ''}}</view>
				<view class="distance">{{ markerInfo.distance == -1?`起终点过长`:`距离您${markerInfo.distance}m`}}</view>
			</view>
				
			<view class="body">
				<view class="info">
					<view>
						电量：<text :style="{ color:markerInfo.battery>50?'#0A98D5':'red'}">{{markerInfo.battery}}%</text>
					</view>
					<view>
						电话：{{markerInfo.phone || '未记录'}}
					</view>
					<view>
						编号：{{markerInfo.no || ''}}
					</view>
					<view>
						imei：{{markerInfo.imei || ''}}
					</view>
				</view>
				
				<view class="btn-area">
					<view class="go-there" @click="navigation(markerInfo)"><image src="../../../static/gohere.png" mode=""></image>去这里</view>
					<view v-if="markerInfo.phone" class="go-there" @click="call(markerInfo)">打电话</view>
					<view class="go-there" @click="msg(markerInfo)">发信息</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['markerInfo'],
		methods:{
			// 调用导航
			navigation(markerInfo){
				// 调用app的导航服务
				uni.openLocation({
					latitude: parseFloat(markerInfo.lat),
					longitude: parseFloat(markerInfo.lon),
					name:markerInfo.name || `游客${markerInfo.nickName}的位置`, // 位置名
					address: '', // 要去的地址详情说明
					scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
				});
			},
			
			// 打电话
			call({phone}){
				uni.makePhoneCall({
					phoneNumber:phone
				})
			},
			
			// 发信息
			msg({no}){
				uni.navigateTo({
					url:`/pages/publish/publish?mode=personal&no=${no}`	
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.panel{
		
		// 加载面板
		.loading{
			color:#999896;
			background:#fff;
			padding:20rpx 0;
			font-size:22rpx;
			text-align: center;
		}
		
		// 游客信息
		.tourist{
			min-width:100rpx;
			background:rgba(255,255,255,1);
			box-shadow:0px 6rpx 13rpx 3rpx rgba(33,33,32,0.18);
			border-radius:0 0 15rpx 15rpx;
			padding:25rpx;
			
			.header{
				display:flex;
				align-items:center;
				margin-bottom:25rpx;
				
				.name{
					color:#4D4C4B;
					font-weight:400;
					font-size:36rpx;
					padding:0 18rpx;
					border-left:6rpx solid $base-color;
				}
				
				.distance{
					color:#999999;
					font-size:24rpx;
				}
			}
			
			.body{
				
				.info{
					margin-bottom:25rpx;
					
					&>view{
						line-height:1.5;
						font-size:26rpx;
						color: #4D4C4B;
					}
				}
				
				
				
				.btn-area{
					display:flex;
					
					view{
						display:flex;
						align-items:center;
						justify-content:center;
						padding:12rpx 20rpx;
						background:rgba(255,203,62,1);
						box-shadow:0px 4rpx 9rpx 1rpx rgba(246,191,42,0.39);
						border-radius:29rpx;
						color:#4D4C4B;
						font-size:28rpx;
						margin-right:20rpx;
						
						image{
							width:35rpx;
							height:35rpx;
							margin-right:12rpx;
						}
						
					}
				
				}
			}
			
			
			
		}
		
		
		.scenery{
			min-width:100rpx;
			background:rgba(255,255,255,1);
			box-shadow:0px 6rpx 13rpx 3rpx rgba(33,33,32,0.18);
			border-radius:0 0 15rpx 15rpx;
			padding:25rpx;
			
			.header{
				display:flex;
				align-items:center;
				margin-bottom:25rpx;
				
				.name{
					color:#4D4C4B;
					font-weight:400;
					font-size:36rpx;
					padding:0 18rpx;
					border-left:6rpx solid $base-color;
				}
				
				.distance{
					color:#999999;
					font-size:24rpx;
				}
			}
			
			.body{
				display:flex;
				justify-content: space-between;
				
				
				.img{
					width:180rpx;
					height:180rpx;
					margin-right:25rpx;
				}
				
				.right{
					display:flex;
					flex-flow:column;
					justify-content: space-between;
					flex:1;
					
					.desc{
						display: -webkit-box ;
						overflow: hidden;
						view-overflow: ellipsis;
						white-space: pre-wrap;
						-webkit-box-orient: vertical;
						-webkit-line-clamp:2; 
						color:#999896;
						font-size:30rpx;
					}
					
					.btn-area{
						display:flex;
						
						view{
							display:flex;
							align-items:center;
							justify-content:center;
							padding:12rpx 20rpx;
							background:rgba(255,203,62,1);
							box-shadow:0px 4rpx 9rpx 1rpx rgba(246,191,42,0.39);
							border-radius:29rpx;
							color:#4D4C4B;
							font-size:28rpx;
							margin-right:35rpx;
							
							image{
								width:35rpx;
								height:35rpx;
								margin-right:12rpx;
							}
							
						}
					
					}
					
				}
				
			}
			
		}
	
		.toilet{
			min-width:100rpx;
			display:flex;
			align-items:center;
			box-shadow:0px 4rpx 9rpx 1rpx rgba(0, 0, 0, 0.14);
			border-radius: 0 0 10rpx 10rpx;
			font-size:28rpx;
			color:#999;
			padding:25rpx;
			background: #fff;
		
			.distance{
				display:flex;
				align-items: center;
				border-left:6rpx solid $base-color;
				padding-left: 8rpx;
				height:30rpx;
				margin-right:16rpx;
			}
			
			.go-there{
				display:flex;
				justify-content: center;
				align-items:center;
				padding:12rpx 16rpx;
				background:$base-color;
				box-shadow:0px 4rpx 9rpx 1rpx rgba(246,191,42,0.3);
				border-radius:23rpx;
				color:#4D4C4B;
				font-size:22rpx;
				
				image{
					width:29rpx;
					height:16rpx;
					margin-right:3rpx;
				}
			}
		}
	}
	
</style>
