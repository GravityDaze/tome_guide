<template>
	<view class="message">
		<view class="msg" v-if="showMsg">
			<text>消息列表为空！</text>
		</view>
		<view class="message-box" @click="check(item)" v-for="item in msgList" :key="item.id" v-else>
			<image v-if="!item.isRead" :src="require(`../../static/${ iconMap.get(item.sendType) }.png`)"></image>
			<image v-else :src="require(`../../static/${ iconReadMap.get(item.sendType) }.png`)"></image>
			<view class="text">
				<view class="title">
					<view class="type">
						{{ msgTypeMap.get(item.sendType) }}
					</view>
					
					<view class="date">
						{{ item.publishDateTime }}
					</view>
				</view>
				
				<view class="bottom-text">
					{{item.content}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { queryMsg,read } from '../../api/api.js'
	export default {
		onShow(){
			this.getMsg()
		},
		data() {
			return {
				showMsg:false,
				msgList:[],
				msgTypeMap:new Map([
					[1, "平台消息"],
					[2, "导游提醒"],
					[3, "景区消息"]
				]),
				iconMap:new Map([
					[1, "icon_tumitixing"],
					[2, "icon_daoyouitixing"],
					[3, "icon_jingqutixing"],
					]
				),
				iconReadMap:new Map([
					[1, "icon_tumitixingyidu"],
					[2, "icon_daoyoutixingyidu"],
					[3, "icon_jingquitixingyidu"],
					]
				),
			};
		},
		methods:{
			async getMsg(){
				try{
					const { value } = await queryMsg({
						pageNum:1,
						pageSize:10
					})
					if( !value.list ){
						this.showMsg = true
					}else{
						this.showMsg = false
						this.msgList = value.list
					}
				}finally{
					uni.hideLoading()
					uni.stopPullDownRefresh()
				}
			},
			async check(params){
				uni.setStorageSync('msg',JSON.stringify(params))
				await read({id:params.id})
				uni.navigateTo({
					url:`/pages/msgDetail/msgDetail`
				})
			}
		},
		onPullDownRefresh: function() {
			uni.showLoading()
		    this.getMsg()
		},
	}
</script>

<style lang="scss" scoped>
	.message{
		padding:20rpx;
		
		.msg{
			display:flex;
			justify-content: center;
			color:#999896;
			font-size:26rpx;
		}
		
		.message-box{
			display:flex;
			align-items:center;
			background:#fff;
			padding:30rpx 20rpx;
			border-radius:15rpx;
			margin-bottom:20rpx;
			
			image{
				width:120rpx;
				height:120rpx;
				margin-right:20rpx;
			}
			
			.text{
				display:flex;
				flex-flow:column;
				flex:1;
				overflow:hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				
				.title{
					display:flex;
					justify-content: space-between;
					align-items: flex-end;
					line-height:1.5;
					
					.type{
						font-size:36rpx;
						font-weight:600;
						color:#343433;
					}
					
					.date{
						color:#999;
						font-size:24rpx;
					}
				}
				
				.bottom-text{
					overflow:hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					color:#999;
					font-size:32rpx;
				}
			}
			
			
			
			
			
			
		}
	}
</style>
