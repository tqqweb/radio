// pages/radiostation/radiostation.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rel:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        from: 'qianqian',
        version: '2.1.0',
        method: 'baidu.ting.radio.getCategoryList',
        format: 'json'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.result[0])
        var rel1 = res.data.result[0];
        that.setData({
          rel:rel1
        })
      }
    })  
  }
})