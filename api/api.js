import { http } from '@/utils/request.js'

// 登录
export const login = data => http.post('/sys/loginSms',data)

// 查询用户基本信息
export const queryUserInfo = data => http.post('/guider/mine/getCustomerInfo',{},{ params:data })

// 查询景区电子围栏列表
export const queryFence = data => http.post('/guider/electronicFence/queryForScenery',data)

// 创建自定义电子围栏
export const createFence = data => http.post('/guider/electronicFence/addElectronicFence',data)

// 导游启用电子围栏
export const enableFence = data => http.post('/guider/electronicFence/enable',data)

// 导游禁用电子围栏
export const disableFence = data => http.post('/guider/electronicFence/disable',data)

// 导游发送信息
export const sendMsg = data => http.post('/guider/message/sendMsg',data)