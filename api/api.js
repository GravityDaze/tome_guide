import { http } from '@/utils/request.js'

// 获取短信
export const getCode = data => http.post('/sys/getVerificationCode',{},{ params:data })

// 验证码是否正确
export const validateCode = data => http.post('/sys/validateCode', data)

// 登录
export const login = data => http.post('/sys/loginWxApp',data)

// 通过经纬度查询到景区编号
export const querySceneryNum = data => http.post('/guider/scenice/getSceneryBylon',data)

// 查询用户基本信息
export const queryUserInfo = data => http.post('/guider/mine/getCustomerInfo',{},{ params:data })

// 查询景区电子围栏列表
export const queryFence = data => http.post('/guider/electronicFence/queryForScenery',data)

// 查询设施
export const queryFacilities = data => http.post('/guider/scenice/getFacilities',{},{ params:data })

// 查询景点
export const queryScenicSpot = data => http.post('/guider/scenice/getScenicSpot',{},{ params:data })

// 导游发送信息
export const sendMsg = data => http.post('/guider/message/sendMsg',data)

// 导游建团
export const group = data => http.post('/guider/touristTeam/add',data)