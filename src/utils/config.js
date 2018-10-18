/**
 * 配置各个子域环境之间的切换
 * 
 * imgBaseUrl: 图片所在CDN地址
 * getBaseUrl(): 得到当前域名地址对应的接口地址
 */

const imgBaseUrl = 'https://imagecdn.bigswitch314.cn/'

function getBaseUrl () {
  let baseUrl,
    host = window.location.host,
    subDomain = host.split('.')[0]
  if (subDomain === 'vip-sim') {
    baseUrl = 'https://sim.bigswitch314.cn'
  } else if (subDomain === 'vip') {
    baseUrl = 'https://wx.bigswitch314.cn'
  } else {
    baseUrl = 'https://bigswitch314.cn'
  }
  return baseUrl
}

export {
    imgBaseUrl,
    getBaseUrl
  }