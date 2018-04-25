// pages/songlist/songlist.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    board:null,
    type1:[1,2,6,7,8,9,11,18]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var type2=this.data.type1;
    var arr=[];//存指定得值
    for (var i = 0; i < type2.length;i++){
      wx.request({
        url: 'http://tingapi.ting.baidu.com/v1/restserver/ting', 
        data: {
          from: 'qianqian',
          version: '2.1.0',
          method:'baidu.ting.billboard.billList',
          format:'json',
          type:type2[i],
          offset:0,
          size:50
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          arr.push(res.data.billboard);//获取到页面需要的数据
          // console.log(arr)
          console.log(res.data.billboard)
          that.setData({
              board:arr //将数据给data中的board变量
          })
        }
      })  
    }
  }

})