<template>
	<view class="publish">
		<view class="title">使用设备</view>
		<view class="disabled number">
			<input type="number" disabled :value="count" />
		</view>
		<view class="title">异常台数（必填）</view>
		<view class="number">
			<input type="number" v-model="number" placeholder="请输入异常台数:" />
		</view>
		<view class="title">异常原因（必填）</view>
		<view class="msg">
			<textarea placeholder="请输入异常原因:" v-model="remark" maxlength="200"></textarea>
		</view>
		<!-- 发布按钮 -->
		<view class="publish-btn" @click="publish">
			点击申报
		</view>
	</view>
</template>

<script>
	import { publish,sendMsg,getCount,dismiss } from '@/api/api.js'
	export default {
		onLoad(options){
			this.id = options.id
		},
		onShow(){
			// 获取到数量
			this.getMemberCount()
		},
		data() {
			return {
				id:'',
				count:0,//总台数
				number:'', // 异常台数
				remark:'' // 备注
			};
		},
		methods:{
			async getMemberCount(){
				const {value} = await getCount({
					customerId:this.id,
				})
				this.count = value.memberCount
			},
			publish(){
				if( this.number === "" ) return uni.showToast({
					title:'请填写异常台数',
					icon:'none'
				})
				
				if( this.remark === "" ) return uni.showToast({
					title:'请填写备注',
					icon:'none'
				})
				
				if( this.number > this.count ) return uni.showToast({
					title:'异常台数超过总台数',
					icon:'none'
				})
				
				uni.showModal({
					title:'提交异常申报',
					content:'提交成功后，该旅游团将会被解散',
					success:async res=>{
						if(res.confirm){
							uni.showLoading({
								mask:true
							})
							try{
								await dismiss({
									customerId: this.id,
									faultCount:this.number,
									readyCount:this.count,
									remark:this.remark
								})
								if (this.id !== "") {
									uni.reLaunch({
										url: '/pages/list/list'
									})
								} else {
									uni.reLaunch({
										url: '/pages/index/index'
									})
								}
							}catch(err){
								uni.showModal({
									content:err.toString()
								})
							}finally{
								uni.hideLoading()
							}
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.publish{
		padding:15rpx;
		
		.title{
			// margin-left:10rpx;
			padding:10rpx;
			font-size:24rpx;
		}
		
		.disabled{
			background:rgba(240,240,240,1) !important;
		}
		
		.number{
			height:80rpx;
			background:rgba(255,255,255,1);
			box-shadow:0px 6rpx 18rpx 0px rgba(36,36,35,0.11);
			border-radius:20rpx;
			
			input{
				width:100%;
				height:100%;
				padding:20rpx;
				box-sizing: border-box;
			}
		}
		
		.msg{
			height:300rpx;
			background:rgba(255,255,255,1);
			box-shadow:0px 6rpx 18rpx 0px rgba(36,36,35,0.11);
			border-radius:20rpx;
			
			textarea{
				width:100%;
				height:100%;
				padding:20rpx;
				box-sizing: border-box;
			}
		}
		
		.publish-btn{
			display:flex;
			justify-content: center;
			align-items:center;
			margin-top:40rpx;
			height:98rpx;
			background:rgba(255,203,62,1);
			box-shadow:0px 4rpx 21rpx 0px rgba(196,153,35,0.19);
			border-radius:10rpx;
		}
	}
</style>
