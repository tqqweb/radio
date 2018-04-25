// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songlist:[],
    val:''
  },
  searchQuery:function(e){

    var val=e.detail.value;
    this.setData({
      val:val
    })
    console.log(val)
    
    var that=this;
    wx.request({
      url: 'http://tingapi.ting.baidu.com/v1/restserver/ting',
        data: {
          from: 'qianqian',
          version: '2.1.0',
          method:'baidu.ting.search.common',
          format: 'json',
          query:val,
          page_no:1,
          page_size:30
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          // console.log(res.data.song_list)
          var songlist1 = res.data.song_list;
          if (songlist1!=null){
              for(var i=0;i<songlist1.length;i++){
                  // 判断字符串中是否有某一个值：indexOf(),无-1，有返回下标，下标为>=0;
                  if(songlist1[i].title.indexOf("<em>")>=0){
                    songlist1[i].title = songlist1[i].title.replace(/<em>|<\/em>/g,'');
                  }
                  if (songlist1[i].author.indexOf("<em>") >= 0) {
                    songlist1[i].author = songlist1[i].author.replace(/<em>|<\/em>/g, '');
                  }
              }
          }

          that.setData({
            songlist:songlist1
          })
        }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})