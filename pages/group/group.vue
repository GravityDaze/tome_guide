<template>
	<view class="group" @click="close">
		<view class="tips">
			选择旅行社
		</view>
		<mySelect @change="change" :items="items" @select="select" :isOpenSelect="isOpenSelect" />
		<view class="create-btn" @click="createMyGroup">
			创建我的团队
		</view>
	</view>
</template>

<script>
	import mySelect from '../../components/my-select/my-select.vue'
	import {
		createTeam,
		isCreateTeam,
		queryTravelAgencyList
	} from '@/api/api'
	export default {
		data() {
			return {
				list: [],
				items: [],
				isOpenSelect: false,
				id:null
			};
		},
		onLoad(options) {
			// 如果是管理员建团,则需要导游id
			if (options.id){
				this.id = options.id
			} 
			
			if(!getApp().globalData.sceneryNo) {
				uni.showToast({
					icon:'none',
					title:'您不在任何景区',
					mask:true,
					duration:1000
				})
				return setTimeout( _=>uni.navigateBack(),1000 )
			}
			
			// 查询旅行团列表
			this.getList()
			
		},
		methods: {
			async getList() {
				const res = await queryTravelAgencyList({})
				this.list = res.value.list
				this.items = this.list.map(v => v.name)
				// 初始对旅行社id赋值
				this.travelAgencyId = this.list[0].id
			},

			// 切换多选框状态
			change(status) {
				this.isOpenSelect = status
			},

			// 重新排列多选框
			select(item) {
				this.close()
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i] === item) {
						this.items.splice(i, 1)
						this.items.unshift(item)
					}
				}

				// 获取参数
				this.list.forEach(v => {
					if (item === v.name) {
						this.travelAgencyId = v.id
					}
				})

			},

			// 点击空白处关闭多选框
			close() {
				this.isOpenSelect = false
			},

			async createMyGroup() {
				const res = await createTeam({
					customerId:parseInt(this.id),
					travelAgencyId: this.travelAgencyId,
					sceneryNo:getApp().globalData.sceneryNo,
					lon: getApp().globalData.longitude,
					lat: getApp().globalData.latitude
				})
				console.log(res)
				getApp().globalData.touristTeamNo = res.value.no
				uni.redirectTo({
					url: `/pages/myGroup/myGroup?id=${this.id}`
				})
				
				return console.log(res)
			}
		},
		components: {
			mySelect
		}
	}
</script>

<style lang="scss">
	.group {
		padding: 55rpx 15rpx;
		position: relative;
		height:100%;

		.tips {
			font-size: 32rpx;
			font-weight: 500;
			color: rgba(153, 151, 151, 1);
			margin-left: 30rpx;
			margin-bottom: 20rpx;
		}


		.create-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 98rpx;
			background: rgba(255, 203, 62, 1);
			box-shadow: 0px 8rpx 16rpx 0px rgba(234, 181, 38, 0.13);
			border-radius: 10rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 50, 1);
			margin-top: 330rpx;
		}
	}
</style>
