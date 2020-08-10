<template>
	<view class="index">
		<tools />
		<map style="width: 100%;">
		</map>
		<!-- 登录按钮 -->
		<view class="login-btn" @click="login">
			<text>登录</text>
		</view>
	</view>
</template>

<script>
	import tools from './components/tools.vue'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			login(){
				uni.navigateTo({
					url:'../login/login'
				})
			}
		},
		components: {
			tools
		}
	}
</script>

<style lang="scss" scoped>
	.index {
		map {
			height: 100vh;
		}

		// 登录按钮
		.login-btn {
			position: fixed;
			display:flex;
			align-items: center;
			justify-content: center;
			bottom: 70rpx;
			left: 50%;
			transform: translateX(-50%);
			width:420rpx;
			height:88rpx;
			box-shadow:0px 8rpx 16rpx 0px rgba(239,181,22,0.48);
			border-radius:44rpx;
			background: $base-color;
		}
	}
</style>
