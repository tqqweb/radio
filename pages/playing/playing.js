// pages/playing/playing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      song:null,
      playImg:'../../img/play2.png',
      flag:1,
      dateTime:0,  //音乐播放时间
      val:0, //slider默认值
      a:0,//时间前面加0
      geci:[],//歌词
      hid:false//标题、演唱者
  },
  onReady:function(){
    this.audioCtx = wx.createAudioContext('myAudio');//拿到指定id的音乐
    this.audioCtx.play();//实现音乐自动播放
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: 'http://music.baidu.com/data/music/fmlink',
      data: {
        rate: '320',
        songIds: options.songid,
        type:''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var song1 = res.data.data.songList[0];
        console.log(res.data.data.songList[0])
          that.setData({
            song: song1
          })        
      }
    })  
  },
  audioPlay:function(){
    if(this.data.flag==1){
        this.audioCtx.pause()
        this.setData({
          playImg:'../../img/play1.png',
          flag:0
        })
    }else{
        this.audioCtx.play()
        this.setData({
          playImg: '../../img/play2.png',
          flag:1
        })
    }
  },
  timeUpDate:function(e){
    var dateTime1 = parseInt(e.detail.currentTime);
    var a1 = dateTime1 % 60 ;
    if (a1<10){
        a1='0'+a1;
    }
    // console.log(dateTime)
    this.setData({
      dateTime: dateTime1,
      val: e.detail.currentTime,
      a: a1   //给当前小于10的数前面加0
    })
  },
  sliderChange:function(e){
      console.log(e.detail.value)//音乐播放的当前时间
      var val2 = e.detail.value;
      this.setData({
        dateTime: val2,
        val: val2
      })
      this.audioCtx.seek(val2)
  },
  returnStart:function(){
    this.audioCtx.seek(0)
  },
  tap1:function(){
    var that = this;
    var dateArr = [], fontArr = [];
    wx.request({
      url: this.data.song.lrcLink,
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var data = res.data;
        var reg=/\[|\]/g;
        if(data.indexOf('[')>=0){
          //检测字符串中是否有某个元素，有返回下标，没有返回-1；
            var data1=data.replace(reg,',')
        }
        var arr=data1.split(',')
        for(var i=0;i<arr.length;i++){
          if(i%2==1){
              dateArr.push(arr[i])
          }else{
              fontArr.push(arr[i])
          }
        }
        // for(var j=0;j<dateArr.length;j++){
        //   if (parseInt(dateArr[j]) == that.data.dateTime){
        //     console.log(fontArr[j])
        //   }
        // }
        that.setData({
          geci: fontArr,
          hid:true
        })
        
      },
      fail:function(){
        wx.showToast({
          title: '没有歌词',
          icon: 'warn',
          duration: 2000
        })
      }
    })
  }

})