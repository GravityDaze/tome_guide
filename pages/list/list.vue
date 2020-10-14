<template>
	<view class="change_scenery_box">
		<uni-nav-bar  @clickLeft="logout" left-icon="back" left-text="退出" class="nav" :border="false" title="选择导游" status-bar />
		<view class="search">
			<input type='text' placeholder='请输入您要搜索的导游' @input="search" />
			<icon type='search' class='icons'></icon>
		</view>
		<!-- <view class="content_title">
	    <text>导游</text>
	  </view> -->
		<scroll-view :style="{top:`${navHeight+60}px` }" class="around-scenery" scroll-y refresher-enabled @refresherrefresh="refresh" :refresher-triggered="triggered">
			<radio-group @change="radioChange">
				<template v-for="(item,index) in guides">
					<label :key="index">
						<view class="item">
							<view class="top">
								<view class="name">
									<text>{{item.realName}}</text>
									<view class="status" v-if="item.haveTeam === 0">
										已建团
									</view>
								</view>
								<radio color="#FFCB3E" :value="item.customerPhone" />
							</view>
							<view class="bottom">
								<image src="/static/phone.png"></image>
								<text>{{item.customerPhone}}</text>
							</view>
						</view>
					</label>
				</template>
			</radio-group>
		</scroll-view>

		<view class="btn_box" @click="skip">
			<text>{{ status?'编辑旅行团':'创建旅行团' }}</text>
		</view>
	</view>
</template>

<script>
	import {
		queryGuide,
		querySceneryNum
	} from '../../api/api.js'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		onLoad(){
			// 获取手机导航栏高度
			let el = uni.createSelectorQuery().select('.nav');
			el.boundingClientRect(data => this.navHeight = data.height).exec()
		},
		onShow() {
			uni.hideHomeButton()
			this.guides = []
			this.getGuides()
		},
		components:{
			uniNavBar
		},
		data() {
			return {
				navHeight:0,
				guides: [],
				triggered: false,
				status: '', 
				id:'' ,// 导游id
				name:'' // 导游名
			};
		},
		methods: {
			async getGuides() {
				this.triggered = true
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				const res = await queryGuide({
					name:this.name
				})
				this.guides = res.value
				this.triggered = false
				uni.hideLoading()
			},
			refresh() {
				this.getGuides()
			},
			// 注销
			logout(){
				uni.showModal({
					content:"是否退出管理员账号",
					success:res =>{
						if(res.confirm){
							uni.clearStorage()
							getApp().globalData = {}
							uni.reLaunch({
								url:'/pages/login/login'
							})
						}
					}
				})
			},
			// 查询导游
			search(e) {
				this.name = e.detail.value
				this.getGuides()
			},
			radioChange({
				detail
			}) {
				const {
					value
				} = detail
				// 通过手机号查询该导游是否建团
				for (const item of this.guides) {
					if (item.customerPhone === value) {
						this.status = (item.haveTeam === 0)
						this.id = item.id
						break
					}
				}
			},
			skip() {
				if (this.status === false) {
					// 获取到景区编号和导游信息
					uni.getLocation({
						type: 'gcj02',
						success: async res => {
							const {
								latitude,
								longitude
							} = res
							getApp().globalData.longitude = longitude,
							getApp().globalData.latitude = latitude
							// 获取到景区编号
							uni.showLoading({
								mask:true
							})
							try{
								const {
									value
								} = await querySceneryNum({
									lat: getApp().globalData.latitude,
									lon: getApp().globalData.longitude
								})
								if (!value) {
									uni.showModal({
										content:'您不在任何景区'
									})
								} else {
									getApp().globalData.sceneryNo = value.no
									uni.navigateTo({
										url: `/pages/group/group?id=${this.id}`
									})
								}
							}finally{
								uni.hideLoading()
								
							}
						}
					})
				} else if (this.status === true) {
					uni.navigateTo({
						url: `/pages/myGroup/myGroup?id=${this.id}`
					})
				} else {
					uni.showToast({
						title: '请选择导游',
						icon: 'none'
					})
				}

			}
		}
	}
</script>

<style lang="scss">
	.change_scenery_box {
		height: 100vh;
		display: flex;
		flex-direction: column;
		/* overflow: hidden; */
	}

	.search {
		background-color: white;
		box-shadow: 5rpx 0 50rpx rgb(200, 200, 200);
		margin-top: 20rpx;
		border-radius: 30px;
		box-sizing: border-box;
		padding: 0 30rpx;
		height: 78rpx;
		font-size: 24rpx;
		display: flex;
		flex-direction: row-reverse;
		align-items: center;
		margin: 20rpx 26rpx 0;
		justify-content: flex-end;
	}

	.search input {
		flex-grow: 1;
		height: 100%;
		padding-left: 20rpx;
		color: rgba(153, 152, 150, 1);
		background-color: white;
	}

	.icons {
		/* border:1px solid red; */
		display: flex;
		align-items: center;
	}

	.content_title {
		display: flex;
		align-items: center;
		height: 173rpx;
		font-size: 34rpx;
		font-weight: 700;
		box-sizing: border-box;
		padding: 0 56rpx;
	}

	.all_single_box .single_box:first-child {
		margin-top: 30rpx;
		/* background-color: red; */
	}

	.single_box {
		border-bottom: 1px solid rgba(200, 200, 200, 1);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.single_left {
		/* border: 1px solid red; */
		height: 128rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.single_top {
		font-size: 30rpx;
		color: rgba(50, 50, 50, 1);
	}

	.single_bottom {
		font-size: 26rpx;
		color: #999;
		margin-top: 18rpx;
	}

	.single_location_icon {
		width: 22rpx;
		height: 22rpx;
		/* background:rgba(205,205,205,1); */
		/* background-size: 100% 100%; */
		margin-right: 10rpx;
	}

	.right_gouxuan1 {
		/* border:1px solid #999; */
		border-radius: 18rpx;
		width: 36rpx;
		height: 36rpx;
		background-size: 100% 100%;
	}

	.right_gouxuan2 {
		border: 1px solid #999;
		border-radius: 18rpx;
		width: 28rpx;
		height: 28rpx;
		background-size: 100% 100%;
	}

	.btn_box {
		width: 700rpx;
		height: 88rpx;
		border-radius: 44rpx;
		font-size: 30rpx;
		background-color: rgba(255, 200, 60, 1);
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 10rpx 0 100rpx rgb(220, 220, 220);
		position: fixed;
		left: 0;
		right: 0;
		margin: 0 auto;
		bottom: 20rpx;
		z-index: 999
	}

	.collectHeadDialog_outbox {
		/* border:1px solid red; */
		width: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 999;
	}

	/* 景区选择区域 */
	.around-scenery {
		position: absolute;
		top: 220rpx;
		bottom: 120rpx;
		padding: 0 56rpx;
		box-sizing: border-box;
	}

	.item {
		display: flex;
		height: 130rpx;
		flex-flow: column;
		justify-content: center;
		box-sizing: border-box;
		border-bottom: 1px solid rgba(214, 215, 217, 1);
	}

	.last {
		margin-bottom: 130rpx;
	}

	.top {
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 50, 1);

		.name {
			display: flex;
			align-items: center;

			.status {
				margin-left: 10rpx;
				font-size: 20rpx;
				color: red;
			}
		}

	}

	.bottom {
		font-size: 26rpx;
		font-family: San Francisco Display;
		font-weight: 400;
		color: rgba(153, 152, 150, 1);
	}

	.bottom image {
		width: 22rpx;
		height: 22rpx;
		margin-right: 5rpx;
	}

	/* 修改默认单选框样式 */
	radio .wx-radio-input {
		height: 34rpx;
		width: 34rpx;
		border-radius: 50%;
		border: 2rpx solid rgba(191, 191, 191, 1);
	}

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
</style>
