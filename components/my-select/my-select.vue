<template>
	<view class="my-select">
		<view class="select" @click.stop="changeSelectStatus">
			<view class="travel-agency">{{items[0]}}</view>
			<image src="../../static/icon-shaixuan@2x.png"></image>
		</view>
			
		<scroll-view scroll-y style="max-height:300rpx" class="select-box" v-if="isOpenSelect">
			<view @click.stop="select(item)" class="select-item" :style="{background:index === 0? '#f0f0f0':'#fff'}" v-for="(item,index) in items" :key="index">
				{{item}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:{
			items:{
				type:Array
			},
			isOpenSelect:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				selectStatus:false,
			};
		},
		watch:{
			isOpenSelect(res){
				if(!res){
					this.selectStatus = false
				}
			}
		},
		methods:{
			changeSelectStatus(){
				this.selectStatus = !this.selectStatus
				this.$emit('change',this.selectStatus)
			},
			select(item){
				this.$emit('select',item)
			},
		}
		
	}
</script>

<style lang="scss">
	
	.my-select{
		position:relative;
	}
	
	.select{
		display:flex;
		justify-content: space-between;
		align-items: center;
		background:rgba(255,255,255,1);
		box-shadow:0px 6rpx 12rpx 0px rgba(36,36,35,0.08);
		border-radius:20rpx;
		padding:25rpx;
		font-size:32rpx;
		font-weight:500;
		color:rgba(51,51,50,1);
		
		image{
			width: 30rpx;
			height: 38rpx;
		}
	}
	
	.select-box{
		width:100%;
		position:absolute;
		margin-top:20rpx;
		background: #FFFFFF;
		font-size:32rpx;
		font-weight:500;
		box-shadow: 0px 6rpx 12rpx 0px rgba(48, 48, 48, 0.06);
		border-radius: 20rpx;
		overflow:hidden;
		
		.select-item{
			padding:25rpx;
		}
	}
	
	
</style>
