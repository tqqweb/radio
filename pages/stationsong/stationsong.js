// pages/stationsong/stationsong.js
var chname='';
var songlist1=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rel:'',
    songlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    chname=options.chname
    var that = this;
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        from: 'qianqian',
        version: '2.1.0',
        method: 'baidu.ting.radio.getChannelSong',
        format: 'json',
        pn:0,
        rn:10,
        channelname: chname
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        var rel1=res.data.result;
        songlist1 = res.data.result.songlist;
        // console.log(songlist1.length)  //10 对象
        that.setData({
          rel:rel1,
          songlist: songlist1
        })
      }
    })
  
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // wx.startPullDownRefresh()//开始刷新
    wx.showNavigationBarLoading()//出现加载小动画
    wx.setNavigationBarTitle({//标题改字
      title: '加载中'
    })
    setTimeout(function () {
      wx.stopPullDownRefresh()//停止刷新
      wx.hideNavigationBarLoading()//隐藏加载小动画
      wx.setNavigationBarTitle({
        title: '电台歌曲'   //标题改字
      })
    }, 2000)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        from: 'qianqian',
        version: '2.1.0',
        method: 'baidu.ting.radio.getChannelSong',
        format: 'json',
        pn: 0,
        rn: 10,
        channelname: chname
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        var sl=res.data.result.songlist;
        if(sl.length<10){
          wx.showToast({
            title: '没有更多内容了',
            icon: 'success',
            duration: 2000
          })
        }
        for(var i=0;i<sl.length;i++){
          songlist1.push(sl[i])
        } 
        // console.log(songlist1.length)
        var rel1 = res.data.result;
        wx.hideLoading()
        that.setData({
          rel: rel1,
          songlist:songlist1
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})