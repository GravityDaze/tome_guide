<template>
	<view class="group" @click="close">
		<mySelect @change="change" @handleInput="handleInput" :items="items" @select="select" :isOpenSelect="isOpenSelect" />
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
				orginList:[],//原始排序
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
				try{
					const res = await queryTravelAgencyList({
						name:this.name
					})
					this.list = res.value.list
					this.items = this.list.map(v => v.name)
				}catch(err){
					console.log(err)
				}
			},
			
			// 输入时
			handleInput(key){
				console.log(key+'打印输入时的key')
				this.travelAgencyId = ''
				this.name = key
				this.getList()
			},
			
			// 切换多选框状态
			change(status) {
				this.isOpenSelect = status
			},

			// 重新排列多选框
			select(item) {
				this.close()
				this.items = [item]
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
				if( !this.travelAgencyId ){
					// 对输入的内容进行检索
					for( const v of this.list ){
						if( this.name === v.name ){
							this.travelAgencyId = v.id
							break
						}
					}
				}
				
				if( !this.travelAgencyId ) {
					return uni.showToast({
						title:'请选择旅行团',
						icon:'none'
					})
				}
				
				
				const res = await createTeam({
					customerId:parseInt(this.id) || '',
					travelAgencyId: this.travelAgencyId,
					sceneryNo:getApp().globalData.sceneryNo,
					lon: getApp().globalData.longitude,
					lat: getApp().globalData.latitude
				})
				getApp().globalData.touristTeamNo = res.value.no
				uni.redirectTo({
					url: `/pages/myGroup/myGroup?id=${ this.id || ''}`
				})
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
		box-sizing: border-box;

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
