<template>
	<view class="tools">
		<view class="tools-panel">
			<view class="location">
				<image src="../../../static/location.png" mode=""></image>
				<text>{{ scenery }}</text>
			</view>

			<view class="operation">
				<image src="../../../static/sos@2x.png" @click="sos"></image>
				<image src="../../../static/menu.png" @click="openMenu"></image>
			</view>
		</view>

		<!-- 工具栏菜单 -->
		<uni-popup ref="popup" type="top">
			<view class="menu">
				<view class="menu-item" v-for="(item,index) in menuItems" :key="index" @click="navigate(item.url)">
					<image :src="require(`../../../static/${item.icon}.png`)"></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		props:{
			scenery:{
				type: String,
				default: '未定位'
			}
		},
		data() {
			return {
				menuItems: [{
						name: '景点',
						icon: 'icon_quanbujingdian@2x'
					},
					{
						name: '设施',
						icon: 'icon_jingdiansheshi@2x'
					}, {
						name: '店铺',
						icon: 'icon_quanbudianpu@2x'
					},
					{
						name: '消息',
						icon: 'icon_quanbuxiaoxi@2x'
					},
					{
						name: '组团',
						icon: 'icon_quanbuzutuan@2x',
						url:'/pages/group/group'
					},
					{
						name: '个人中心',
						icon: 'icon_quanbugerenzhongxin@2x',
						url:'/pages/personal/personal'
					},
					{
						name: '关闭围栏',
						icon: 'icon_quanbuguanbiweilan@2x'
					},
					{
						name: '发布消息',
						icon: 'icon_quanbufabuxiaoxi@2x',
						url:'/pages/publish/publish'
					}
				]
			}
		},
		methods: {
			openMenu() {
				this.$refs.popup.open()
			},
			
			navigate(url){
				uni.navigateTo({
					url
				})
			},
			
			sos(){
				uni.navigateTo({
					url:'/pages/sos/sos'
				})
				
			}
		}
	}
</script>

<style lang="scss">
	.tools {
		box-shadow: 0px 1px 37px 3px rgba(44, 44, 42, 0.19);
		padding: 0 35rpx;
		background: #fff;

		.tools-panel {
			display: flex;
			height: 98rpx;
			align-items: center;
			justify-content: space-between;


			.location {

				display: flex;
				align-items: center;

				image {
					width: 36rpx;
					height: 30rpx;
					margin-right: 8rpx;
				}

				text {
					font-size: 38rpx;
					font-family: PingFang SC;
					color: rgba(51, 51, 50, 1);
				}
			}

			.operation {
				image {
					width: 60rpx;
					height: 60rpx;
					margin-left: 25rpx;
				}
			}
		}

		.menu {
			height: 350rpx;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-template-rows: repeat(2, 1fr);
			background: #fff;

			.menu-item {

				display: flex;
				flex-flow: column;
				align-items: center;
				justify-content: center;

				image {
					width: 90rpx;
					height: 90rpx;
					margin-bottom: 12rpx;
				}

				text {
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: rgba(153, 153, 153, 1);
				}
			}

		}
	}
</style>
