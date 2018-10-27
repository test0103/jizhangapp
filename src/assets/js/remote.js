import axios from 'axios';
import $ from 'jquery';
var ipsever = localStorage.getItem('url')
$.ajax({
  url: 'http://chaobi.lian2345.com/api/chaobi/deal/kpl/ip/tongyong/jizhang', //url路径
  type: 'POST', //GET
  async: false, //或false,是否异步
  data: { //参数

  },
  timeout: 5000, //超时时间
  dataType: 'json', //返回的数据格式：
  beforeSend: function (xhr) {},
  success: function (data, textStatus, jqXHR) {
    console.log(data);

    if (data.status == '200') {
      if (localStorage.getItem('url') != data.list.ipUrl) {
        localStorage.setItem('url', data.list.ipUrl)
      }
    } else {
      localStorage.getItem('url')
    }
    // ipsever='http://192.168.1.225:9086/'
    ipsever = localStorage.getItem('url')

  },
  error: function (xhr, textStatus) {
    console.log('小程序cookie获取失败---->' + textStatus);
  },
  complete: function () {}
})

const request = {
  verification: "acc/sms/send_sms",
  login: "acc/user/login",
  register: "acc/user/register",
  retrievePassword: 'acc/user/findLoginPassword',
  currentBill: 'acc/userbook/selectByTime',
  querySoloBill: 'acc/userbookkeeping/bookkeepingdetail',
  editBill: 'acc/userbookkeeping/add',
  ownAllBillType: 'acc/userbook/selectAll',
  allBillType: 'acc/userbook/selectAllBy',
  queryBill: 'acc/userbook/selectByPrimaryKey',
  addBill: 'acc/userbook/insert',
  deleteBill: 'acc/userbook/deleteByPrimaryKey',
  userInfo: 'acc/user',
  checkUpdate: 'acc/appversion/chaobi/deal/market/version',
  countAllBalance: 'acc/useraccount/consumetypebyuserid',
  allBillPurpose: 'acc/userbookkeeping/lifetype',
  allConsumeType: 'acc/userbookkeeping/consumetype',
  addsuggest: 'acc/feedbacklog/add',
  queryBudget: 'acc/index/selectByBookAndTime',
  queryAllConsume: 'acc/index/selectBySpending',
  queryAllBill: 'acc/index/selectByTimeAndId',
  deleteSoloBill: 'acc/userbookkeeping/delete',
  changeBudget: 'acc/userbudget/add',
  Consumeraccount: 'acc/useraccount/selectByBookAndTime',
  selectBySpendingName: 'acc/useraccount/selectBySpendingName',
  addzhanghuyue: 'acc/useraccount/add',
  selectByTimeAndId: 'acc/useraccount/selectByTimeAndId',
  isLogined: 'acc/user/queryticket',
  Select: '/KplLoans_Iteration/telphone/tongyong/global/api/version.action',
  quit: 'acc/user/logout',
}
const stringify = (params) => {
  if ('object' !== typeof params) {
    return ''
  }
  let string = ''
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      string += '&' + key + '=' + params[key]
    }
  }
  return string.substr(1)
}

//获取验证码
const gainvft = (params) => {
  return axios.post(`${ipsever+request.verification}`, stringify(params))
}

//登录
const login = (params) => {
  return axios.post(`${ipsever+request.login}`, stringify(params))
}

//注册
const register = (params) => {
  return axios.post(`${ipsever+request.register}`, stringify(params))
}

// 找回密码
const retrievePassword = (params) => {
  return axios.post(`${ipsever+request.retrievePassword}`, stringify(params))
}
// 安全退出
const quit = (params) => {
  return axios.post(`${ipsever+request.quit}`, stringify(params))
}

// 根据ticket获取用户信息
const userInfo = (params) => {
  return axios.get(`${ipsever+request.userInfo+'/'+params}`)
}

// 点击日历获取当日账本
const currentBill = (params) => {
  return axios.get(`${ipsever+request.currentBill}`, {
    params: params
  })
}

// 查询当个账本详情
const querySoloBill = (params) => {
  return axios.get(`${ipsever+request.querySoloBill}`, {
    params: params
  })
}

// 编辑账本和新增账本
const editBill = (params) => {
  return axios.post(`${ipsever+request.editBill}`, stringify(params))
}

// 查询用户的所有账本类型
const ownAllBillType = (params) => {
  return axios.get(`${ipsever+request.ownAllBillType}`, {
    params: params
  })
}

// 查询所有账本类型
const allBillType = (params) => {
  return axios.get(`${ipsever+request.allBillType}`, {
    params: params
  })
}

// 查询用户单个账本
const queryBill = (params) => {
  return axios.get(`${ipsever+request.queryBill}`, {
    params: params
  })
}

// 添加账本
const addBill = (params) => {
  return axios.post(`${ipsever+request.addBill}`, stringify(params))
}

// 删除账本
const deleteBill = (params) => {
  return axios.post(`${ipsever+request.deleteBill}`, stringify(params))
}

// "账户"界面，显示所有消费账户余额（现金、微信、支付宝......）
const countAllBalance = (params) => {
  return axios.get(`${ipsever+request.countAllBalance}`, {
    params: params
  })
}

// 在记一笔账界面，显示所有记账用途（餐饮、果蔬、购物、住房...）
const allBillPurpose = (params) => {
  return axios.get(`${ipsever+request.allBillPurpose}`, {
    params: params
  })
}

// 在记一笔账界面，显示所有消费账户类型（现金、微信、支付宝......）
const allConsumeType = (params) => {
  return axios.get(`${ipsever+request.allConsumeType}`, {
    params: params
  })
}
// 添加一条反馈意见----ticket
const addsuggest = (params) => {
  return axios.post(`${ipsever+request.addsuggest}`, stringify(params))
}

// 根据用户id，账本类型，当月月份查询预算
const queryBudget = (params) => {
  return axios.get(`${ipsever+request.queryBudget}`, {
    params: params
  })
}

// 查询单月的总收入,总支出（支出1，收入2）
const queryAllConsume = (params) => {
  return axios.get(`${ipsever+request.queryAllConsume}`, {
    params: params
  })
}
// 查询单月的所有记账记录，统计当天的记账记录和收入，支出
const queryAllBill = (params) => {
  return axios.get(`${ipsever+request.queryAllBill}`, {
    params: params
  })
}

// 删除记一笔账
const deleteSoloBill = (params) => {
  return axios.post(`${ipsever+request.deleteSoloBill}`, stringify(params))
}

// 修改 预算账户 
const changeBudget = (params) => {
  return axios.post(`${ipsever+request.changeBudget}`, stringify(params))
}
//修改新增账户余额
const addzhanghuyue = (params) => {
  return axios.post(`${ipsever+request.addzhanghuyue}`, stringify(params))
}
// 根据账户ID 账户消费类型 查找月消费记录 
const Consumeraccount = (params) => {
  return axios.get(`${ipsever+request.Consumeraccount}`, {
    params: params
  })
}
// 根据账户ID 账户消费类型 查找月消费总收入总流出 
const selectBySpendingName = (params) => {
  return axios.get(`${ipsever+request.selectBySpendingName}`, {
    params: params
  })
}
// 查询单月账户的所有记账记录，统计当天的记账记录和收入，支出
const selectByTimeAndId = (params) => {
  return axios.get(`${ipsever+request.selectByTimeAndId}`, {
    params: params
  })
}

//检查更新版本
const checkUpdate = (params) => {
  return axios.post(`${ipsever+request.checkUpdate}`, stringify(params))
}
// 通过ticket查询是否重复登录
const isLogined = (params) => {
  return axios.get(`${ipsever+request.isLogined}`, {
    params: params
  })
}
// 记账控制
const Select = (params) => {
  return axios.post(`${ipsever+request.Select}`, stringify(params))
}

export default {
  gainvft,
  login,
  register,
  retrievePassword,
  currentBill,
  querySoloBill,
  editBill,
  ownAllBillType,
  allBillType,
  queryBill,
  addBill,
  deleteBill,
  userInfo,
  countAllBalance,
  allBillPurpose,
  allConsumeType,
  addsuggest,
  queryBudget,
  queryAllConsume,
  queryAllBill,
  deleteSoloBill,
  changeBudget,
  Consumeraccount,
  checkUpdate,
  selectBySpendingName,
  addzhanghuyue,
  selectByTimeAndId,
  isLogined,
  Select,
  quit
}
