import { http } from '@/utils/request.js'

// 获取短信
export const getCode = data => http.post('/sys/getVerificationCode',{},{ params:data })

// 验证码是否正确
export const validateCode = data => http.post('/sys/validateCode', data)

// 导游登录
export const login = data => http.post('/sys/loginWxApp',data)

// 管理员登录
export const loginAdmin = data => http.post('/sys/a3AdminLogin',data)

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
export const publish = data => http.post('/guider/message/sendMsg',data)

// 导游对指定游客发送消息
export const sendMsg = data => http.post('/guider/message/sendMsgToCustomer',data)

// 导游查询消息
export const queryMsg = data => http.post('/guider/message/queryListByCustomerId',{})

// 将查询到的消息改为已读
export const read = data => http.post('/guider/message/read',data)

// 导游建团
export const createTeam = data => http.post('/guider/touristTeam/creatTeam',data)

// 查询导游列表
export const queryGuide = data => http.post('/guider/touristTeam/getGuiders',{},{ params:data })

// 二维码加团
export const joinTeamQr = data => http.post('/guider/touristTeam/joinQR',data)

// 查询导游是否建团
export const isCreateTeam = data => http.post('/guider/touristTeam/getTeam',data)

// 查询旅行社列表
export const queryTravelAgencyList = data => http.post('/mis/travelAgency/query',data)

// 查询团信息
export const queryTeamInfo = data => http.post('/guider/touristTeam/queryTeamInfo',{},{ params:data })

// 删除团员
export const delMember = data => http.post('/guider/touristTeam/deleteMember',{},{ params:data })

// 解散团队
export const dismiss = data => http.post('/guider/touristTeam/dissTeam',{},{ params:data })

// 查询sos求救信息
export const sosQuery = data => http.post('/guider/sos/query')

// 查询单条sos求救信息
export const querySingleSos = data => http.post('/guider/sos/get',{},{ params:data })

// 解决sos求救信息
export const sosResolve = data => http.post('/guider/sos/deal',{},{ params:data })

// 实时上传导游位置
export const uploadLocation = data => http.post('/gather/uploadTerminalTrackInfo',data)