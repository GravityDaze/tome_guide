import Request from '@/libs/luch-request/index.js'
export const http = new Request()
// 全局配置
http.setConfig(config => {
	config.baseURL = 'https://tome3pay.zhihuiquanyu.com',
		// config.baseURL = 'http://192.168.0.117:8088',
	config.timeout = 10000
	return config
})

// 请求拦截器
http.interceptors.request.use((config, cancel) => {
	const token = uni.getStorageSync('token')
	config.header = {
		"Authorization": `Bearer ${token}`
	}
	return config
})

// 响应拦截器
http.interceptors.response.use(res => {
	const {
		resultCode
	} = res.data.resultStatus
	// 请求成功
	if (resultCode === '0000') {
		return res.data
	} else {
		return Promise.reject(new Error(res.data.resultStatus.resultMessage))
	}
}, err => {
	const {
		resultCode
	} = err.data.resultStatus
	if (resultCode === '0007') {
		const token = uni.getStorageSync('token')
		token && uni.redirectTo({
			url: '../login/login',
			success: () => {
				uni.showToast({
					title: '登录失效',
					icon: 'none'
				})
			}
		})
		uni.clearStorageSync()
	} else {
		return Promise.reject(new Error(err.data.resultStatus.resultMessage))
	}
})
