<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {  
			userInfo: {},
			sceneryNum:'',
			latitude:'',
			longitude:''
			
		}
	}
</script>

<style>
	/*每个页面公共css */
	page{
		height:100%;
		background:rgba(247,246,242,1);
	}
	
	/* 清除父子元素margin粘连 */
	.clearfix::before{
		content:'';
		display:table;
	}
</style>
