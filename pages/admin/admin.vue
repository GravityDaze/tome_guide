<template>
	<view class="change_scenery_box">
		<view class="top-area">
			<view class="search">
				<input type='text' placeholder='请输入您要搜索的导游姓名或手机号' @input="search" />
				<icon type='search' class='icons'></icon>
			</view>
			<view class="add" @click="$refs.popup.open()">
				<image src="../../static/menu.png"></image>
			</view>
			<uni-popup ref="popup" type="top">
				<view class="menu">
					<view class="menu-item" v-for="(item,index) in menuItems" :key="index" @click="click(item)">
						<image :src="require(`../../static/${item.icon}.png`)"></image>
						<text>{{item.name}}</text>
					</view>
				</view>
			</uni-popup>
		</view>

		<scroll-view class="around-scenery" scroll-y refresher-enabled @refresherrefresh="refresh"
			:refresher-triggered="triggered">
			<radio-group @change="radioChange">
				<uni-swipe-action>
					<template v-for="item in guides">
						<label :key="item.id">
							<uni-swipe-action-item :autoClose="false" :right-options="options" @click.stop="edit(item)">
								<view class="item">
									<view class="top">
										<view class="name">
											<text>{{item.realName}}</text>
											<view class="status" v-if="item.haveTeam === 0">
												已建团
											</view>
										</view>
										<radio color="#FFCB3E" :value="item.id" :checked="item.id === id" />
									</view>
									<view class="bottom">
										<image src="../../static/phone.png"></image>
										<text>{{item.customerPhone}}</text>
									</view>
								</view>
							</uni-swipe-action-item>
						</label>
					</template>
				</uni-swipe-action>
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
		querySceneryNum,
		clearTeam
	} from '../../api/api.js'
	import { equalsObj } from '../../utils/deepCompare.js'
	export default {
		onShow() {
			uni.hideHomeButton()
			this.getGuides()
		},
		watch:{
			guides:{
				handler(newVal,oldVal){
					// 执行深比较
					if( !equalsObj( newVal,oldVal ) ){
						this.id = ''
						this.status = ''
					}
				},
				deep:true
			}
		},
		data() {
			return {
				guides: [],
				triggered: false,
				status: '',
				id: '', // 导游id
				query: '', // 查询条件
				menuItems: [{
						name: '添加导游',
						icon: 'icon_quanbugerenzhongxin@2x',
						url: '/pages/createGuide/createGuide'
					},
					{
						name: '一键散团',
						icon: 'icon_quanbuzutuan@2x',
						handle: this.clearTeam
					},
					{
						name: '退出',
						icon: 'icon_quanbuguanbiweilan@2x',
						handle: this.logout
					},
				],
				options: [{
					text: '编辑',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			};
		},
		methods: {
			async getGuides(name = "") {
				uni.showLoading({
					mask: true,
					title: '加载中'
				})
				try {
					const res = await queryGuide({
						name
					})
					this.guides = res.value
					// 重新查询是否建团
					this.status = this.guides.some( v=>  this.id === v.id && v.haveTeam === 0 )
				} finally {
					this.triggered = false
					uni.hideLoading()
				}
			},
			refresh() {
				this.triggered = true
				this.getGuides()
			},
			click(item) {
				if (item.url) {
					uni.navigateTo({
						url: item.url
					})
				} else {
					item.handle()
				}
			},

			// 注销
			logout() {
				uni.showModal({
					content: "是否退出管理员账号",
					success: res => {
						if (res.confirm) {
							uni.clearStorage()
							getApp().globalData = {}
							uni.reLaunch({
								url: '/pages/login/login'
							})
						}
					}
				})
			},
			// 查询导游
			search(e) {
				this.getGuides(e.detail.value)
			},
			radioChange(e) {
				const {
					value
				} = e.detail
				this.id = parseInt(value)
				// 查询是否建团
				this.status = this.guides.some( v=> this.id === v.id && v.haveTeam === 0)
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
								mask: true
							})
							try {
								const {
									value
								} = await querySceneryNum({
									lat: getApp().globalData.latitude,
									lon: getApp().globalData.longitude
								})
								if (!value) {
									uni.showModal({
										content: '您不在任何景区'
									})
								} else {
									getApp().globalData.sceneryNo = value.no
									uni.navigateTo({

										url: `/pages/group/group?id=${this.id}`
									})
								}
							} finally {
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

			},
			// 清除导游团
			clearTeam(){
				uni.showModal({
					content:'是否解散所有团',
					success:async (res)=> {
						if(res.confirm){
							uni.showLoading({
								title:'解散中',
								mask:true
							})
							try{
								await clearTeam()
								this.$refs.popup.close()
								uni.showModal({
									content:'解散成功',
									showCancel:false
								})
								this.getGuides()
							}catch(err){
								uni.showModal({
									content:err.toString(),
									showCancel:false
								})
							}finally{
								uni.hideLoading()
							}
						}
					}
				})
				
			},
			
			// 编辑导游
			edit(item) {
				// _lock变量保证该方法每次点击只执行一次
				if( this._lock ) return 
				this._lock = true
				uni.navigateTo({
					url: `/pages/createGuide/createGuide?name=${item.realName}&phone=${item.customerPhone}&id=${item.id}`,
					success:_=>this._lock = false
				})
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

	.top-area {
		display: flex;
		margin: 20rpx 26rpx;
		box-sizing: border-box;
		height: 78rpx;

		.search {
			flex: 5;
			padding: 0 30rpx;
			background-color: white;
			box-shadow: 5rpx 0 50rpx rgb(200, 200, 200);
			border-radius: 30px;
			font-size: 24rpx;
			display: flex;
			flex-direction: row-reverse;
			align-items: center;
			justify-content: flex-end;

			input {
				flex-grow: 1;
				height: 100%;
				padding-left: 20rpx;
				color: rgba(153, 152, 150, 1);
				background-color: white;
			}
		}

		.add {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				height: 60rpx;
				width: 60rpx;
			}
		}

		.menu {
			height: 200rpx;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			// grid-template-rows: repeat(1, 1fr);
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
		margin: 0 auto;
		margin-bottom: 20rpx;
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
		// position: absolute;
		// top: 220rpx;
		// bottom: 120rpx;
		flex: 1;
		padding: 0 56rpx;
		height: 1px;
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
