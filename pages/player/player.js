// pages/player/player.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    artist:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        from: 'qianqian',
        version: '2.1.0',
        method: 'baidu.ting.artist.get72HotArtist',
        format:'json',
        offset:0,
        limit:100
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var artist1 = res.data.artist;
        that.setData({
          artist: artist1
        })
        console.log(res)
      }
    })  
  }
})