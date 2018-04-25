// pages/musiclist/musiclist.js
var type1='';
var size=10;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      songlist:[],
      bangdan:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.type)
    size=10;
    type1 = options.type;
    var that=this;//改变this指向
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        from: 'qianqian',
        version: '2.1.0',
        method: 'baidu.ting.billboard.billList',
        format: 'json',
        type: type1,
        offset: 0,
        size:10
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
       var songlist1=res.data.song_list;
      //  console.log(songlist1)
       var bangdan1 = res.data.billboard.name;
       that.setData({
         songlist: songlist1,
         bangdan: bangdan1
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
      setTimeout(function(){
          wx.stopPullDownRefresh()//停止刷新
          wx.hideNavigationBarLoading()//隐藏加载小动画
          wx.setNavigationBarTitle({
            title: '歌曲列表'   //标题改字
          })
      },2000)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;//改变this指向
    size+=10;
    console.log(size)
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      data: {
        from: 'qianqian',
        version: '2.1.0',
        method: 'baidu.ting.billboard.billList',
        format: 'json',
        type: type1,
        offset: 0,
        size:size
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var songlist1 = res.data.song_list;
        if(size>songlist1.length){
            wx.showToast({
              title: '没有更多内容了',
              icon: 'success',
              duration: 2000
            })
        }
        var bangdan1 = res.data.billboard.name;
        wx.hideLoading()
        that.setData({
          songlist: songlist1,
          bangdan: bangdan1
        })
      }
    })  
  }



})