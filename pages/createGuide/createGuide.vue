<template>
	<view class="info">
		<view class="panel">
			<view class="id-card">
				<text>导游姓名：</text>
				<view class="right-content">
					<input type="text" v-model="name" placeholder="请输入导游姓名" />
				</view>
			</view>
			<view class="id-card">
				<text>手机号：</text>
				<view class="right-content">
					<input type="text" v-model="phone" placeholder="请输入导游手机号" />
				</view>
			</view>
		</view>
		<view class="btn" @click="submit">
			<text>{{ id?'保存编辑':'创建导游' }}</text>
		</view>
	</view>
</template>

<script>
	import { editGuide, addGuide } from '../../api/api.js'
	export default {
		data() {
			return {
				name: '',
				phone: '',
				id: ''
			};
		},
		onLoad(options) {
			this.name = options.name
			this.phone = options.phone
			this.id = options.id
		},
		methods: {
			async submit() {
				// 创建参数
				const params = {
					phone: this.phone,
					realName: this.name,
					sosPhone: this.phone,
					isCreateTeam: 1,
					guideCard: this.phone
				}
				// 新增
				try {
					uni.showLoading({
						mask: true
					})
					if (!this.id) {
						await addGuide(params)
					} else {
						await editGuide({...params,id:this.id})
					}
					uni.navigateBack({
						success: _ => uni.showToast({
							title: this.id ? '编辑成功' : '新增成功'
						})
					})
				} catch (err) {
					uni.showModal({
						showCancel: false,
						content: err.toString()
					})
				} finally {
					uni.hideLoading()
				}

			}
		}
	}
</script>

<style lang="scss">
	.info {
		padding: 20rpx 15rpx;

		.btn {
			margin: 20rpx auto 0;
			height: 88rpx;
			border-radius: 44rpx;
			font-size: 30rpx;
			background-color: #ffc83c;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 10rpx 0 100rpx gainsboro;
		}

		.panel {
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 1px 23px 1px rgba(36, 36, 35, 0.08);
			border-radius: 20px;
			padding: 55rpx;
			box-sizing: border-box;

			&>view:not(.agency) {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 95rpx;
				border-bottom: 1rpx solid rgba(217, 217, 217, .9);

				text {
					font-size: 32rpx;
					font-weight: 500;
					color: rgba(51, 51, 50, 1);
				}

				.right-content {
					display: flex;
					align-items: center;

					text {
						color: rgba(153, 152, 150, 1);
						font-size: 30rpx;
					}

					.more {
						height: 30rpx;
						width: 35rpx;
						margin-left: 15rpx;
					}

					input {
						text-align: right;
						color: rgba(153, 152, 150, 1);
					}

					.phcolor {
						color: rgba(153, 152, 150, 1);
					}
				}

			}



		}

	}
</style>
