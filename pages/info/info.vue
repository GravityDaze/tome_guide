<template>
	<view class="info">
		<view class="panel">
			<view class="avatar" @click="changeAvatar">
				<text>头像：</text>
				<view class="right-content">
					<image class="avatar-img" src="../../static/guide.png" mode=""></image>
					<image class="more" src="../../static/个人资料更多@2x.png" mode=""></image>
				</view>
			</view>
			<view class="name">
				<text>姓名：</text>
				<view class="right-content">
					<input placeholder-class="phcolor" type="text" v-model="userInfo.realName" placeholder="请输入姓名" />
					<image class="more" src="../../static/个人资料更多@2x.png" mode=""></image>
				</view>
			</view>
			<view class="nick-name">
				<text>昵称：</text>
				<view class="right-content">
					<input placeholder-class="phcolor" type="text" v-model="userInfo.nickName" placeholder="请输入昵称" />
					<image class="more" src="../../static/个人资料更多@2x.png" mode=""></image>
				</view>
			</view>
			<view class="phone">
				<text>手机号：</text>
				<view class="right-content">
					<text>{{userInfo.phone}}</text>
					<image style="opacity:0" class="more" src="../../static/个人资料更多@2x.png" mode=""></image>
				</view>
			</view>
			<view class="gender" @click="changeGender">
				<text>性别：</text>
				<view class="right-content">
					<text>{{gender}}</text>
					<image class="more" src="../../static/个人资料更多@2x.png" mode=""></image>
				</view>
			</view>
			<view class="email">
				<text>邮箱：</text>
				<view class="right-content">
					<input placeholder-class="phcolor" type="text" v-model="userInfo.email" placeholder="请输入邮箱" />
					<image class="more" src="../../static/个人资料更多@2x.png" mode=""></image>
				</view>
			</view>
			<view class="id-card">
				<text>身份证号：</text>
				<view class="right-content">
					<text>{{userInfo.credentialsNumber}}</text>
					<image style="opacity:0" class="more" src="../../static/个人资料更多@2x.png" mode=""></image>
				</view>
			</view>
			<view class="id-card">
				<text>导游证号：</text>
				<view class="right-content">
					<text>{{userInfo.guideCard}}</text>
					<image style="opacity:0" class="more" src="../../static/个人资料更多@2x.png" mode=""></image>
				</view>
			</view>
			<view class="id-card">
				<text>旅行社：</text>
				<view class="right-content" @click="collapse" >
					<text>查看所属旅行社</text>
					<image class="more" :src="require(`../../static/${isCollapse?'上拉':'下拉'}@2x.png`)"></image>
				</view>
			</view>
			<view class="agency" v-show="isCollapse">
				<view class="agency-name" v-for="item in userInfo.travelAgencys">{{item.travelAgencyName}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{
					realName:'',
					nickName:'',
					email:''
				},
				isCollapse:false
			};
		},
		computed:{
			gender(){
				switch(this.userInfo.sex){
					case 0:
						return '保密'
					case 1:
						return '男'
					case 2:
						return '女'
				}
			}
		},
		onHide(){
			// save()
		},
		onLoad(){
			this.userInfo = JSON.parse( uni.getStorageSync('customerInfo') )
		},
		methods:{
			changeGender(){
				return
				uni.showActionSheet({
					 itemList: ['保密', '男', '女'],
					 success: ({tapIndex}) => {
						this.userInfo.sex = tapIndex
					 }
				})
			},
			// save(){
				
			// },
			collapse(){
				this.isCollapse = !this.isCollapse
			},
			changeAvatar(){
				return
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    success: function (res) {
						
				        console.log(JSON.stringify(res.tempFilePaths));
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.info {
		padding: 20rpx 15rpx;

		.panel {
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 1px 23px 1px rgba(36, 36, 35, 0.08);
			border-radius: 30px;
			padding: 55rpx;
			box-sizing: border-box;
			
			.agency{
				margin-top:40rpx;
				color:#fff;
				
				
				.agency-name{
					font-size:28rpx;
					display:inline-block;
					padding:8rpx 15rpx;
					background:rgba(230,229,227,1);
					border-radius:5px;
					margin-right:20rpx;
				}
			}

			&>view:not(.agency) {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 95rpx;
				border-bottom: 1rpx solid rgba(217, 217, 217, .9);
				
				text{
					font-size:32rpx;
					font-weight:500;
					color:rgba(51,51,50,1);
				}

				.right-content {
					display:flex;
					align-items: center;
					
					text{
						color:rgba(153,152,150,1);
						font-size:30rpx;
					}
					
					.more {
						height: 30rpx;
						width: 35rpx;
						margin-left:15rpx;
					}
					
					input{
						text-align:right;
						color:rgba(153,152,150,1);
					}
					
					.phcolor{
						color:rgba(153,152,150,1);
					}
				}

			}

			.avatar {
				
				.avatar-img {
					width: 80rpx;
					height: 80rpx;
				}
			}

		}

	}
</style>
