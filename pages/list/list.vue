<template>
	<view class="change_scenery_box">
	  <view class="search">
	    <input type='text' placeholder='请输入您要搜索的导游'  />
	    <icon type='search' class='icons' ></icon>
	  </view>
	  <view class="content_title">
	    <text>导游</text>
	  </view>
	    <scroll-view
	      class="around-scenery"
	      scroll-y
	    >
	    <radio-group @change="radioChange">
	      <template v-for="item in showSceneryArr">
	        <label>
	        <view class="item">
	          <view class="top">
	            <view>{{item.name}}</view>
	            <radio color="#FFCB3E" />
	          </view>
	          <view class="bottom">
	            <image src="/imgs/location@1x.png"></image>
	            <text>{{item.distance}}</text>
	          </view>
	        </view>
	        </label>
	      </template>
	      </radio-group>
	    </scroll-view>
	
	  <view class="btn_box">
	    <text>开启视频之旅</text>
	  </view>
	</view>
</template>

<script>
	export default {
		onShow(){
			uni.hideHomeButton()
		},
		data() {
			return {
				showSceneryArr:[]
			};
		},
		methods:{
			radioChange:{}
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
  height:78rpx;
  font-size: 24rpx;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  margin:20rpx 26rpx 0;
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
  height:173rpx;
  font-size: 34rpx;
  font-weight: 700;
  box-sizing: border-box;
  padding:0 56rpx;
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
  border:1px solid #999;
  border-radius: 18rpx;
  width: 28rpx;
  height: 28rpx;
  background-size: 100% 100%;
}
.btn_box{
  width:700rpx;
  height: 88rpx;
  border-radius: 44rpx;
  font-size: 30rpx;
  background-color: rgba(255, 200, 60, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 10rpx 0 100rpx rgb(220, 220, 220);
  position: fixed;
  left:0;
  right:0;
  margin:0 auto;
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
.around-scenery{
  position:absolute;
  top:256rpx;
  bottom:0;
  padding:0 56rpx;
  box-sizing: border-box;
}

.item{
  display:flex;
  height:130rpx;
  flex-flow:column;
  justify-content: center;
  box-sizing: border-box;
  border-bottom:1px solid rgba(214,215,217,1);
}

.last{
  margin-bottom:130rpx;
}

.top{
  display: flex;
  justify-content: space-between;
  font-size:30rpx;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(51,51,50,1)
}

.bottom{
font-size:26rpx;
font-family:San Francisco Display;
font-weight:400;
color:rgba(153,152,150,1);
}

.bottom image{
  width:22rpx;
  height:22rpx;
  margin-right: 9rpx;
}

/* 修改默认单选框样式 */
radio .wx-radio-input{
  height:34rpx;
  width:34rpx;
  border-radius:50%;
  border:2rpx solid rgba(191, 191, 191, 1);
}

::-webkit-scrollbar{
  width: 0;
  height: 0;
  color: transparent;
  }
</style>
