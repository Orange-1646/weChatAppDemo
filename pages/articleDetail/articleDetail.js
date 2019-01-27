// pages/articleDetail/articleDetail.js
var request = require('../../utils/request.js');
var audio = wx.createInnerAudioContext();
var width;
wx.getSystemInfo({
  success: function(res) {
    width = res.windowWidth;
    console.log(width)
  },
})
Page({
  contentDealer : function(str){
    str.match
  },
  /**
   * 页面的初始数据
   */
  data: {
    audioProgress : 1,
    progressBtnPos : 0
  },
  playVideo : function(){
    var video = wx.createVideoContext(this.data.video.id, this);
    video.play();
    this.setData({
      videoPlaying : true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id : options.id
    });
    this.getData(this.data.id);
  },
  setAudio : function(){
    audio.src = this.data.audio.src;
  },
  getData : function(id){
    var that = this;
    request({
      url: '/getArticleDetail/' + id,
      success: function (res) {
        console.log(res);
        that.setData({
          title: res.title,
          author: res.author,
          content: res.content,
          publishTime: res.publishTime,
          readNum: res.readNum,
          audio: res.audio,
          video: res.video,
          banner: res.banner,
          progressBtnPos : 0
        });
        that.setAudio();
      }
    })
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

  },
  switchAudio : function(){
    this.setData({
      play : !this.data.play
    });
    if(!this.data.play){
      audio.pause();
      this.stopProgress();
    }else{
      audio.play();
      this.startProgress();
    }
  },
  startProgress : function(){
    var that = this;
    this.setData({
      progressTimer : setInterval(function(){
        that.setData({
          progressBtnPos : (audio.currentTime/audio.duration)*500
        });
        that.setProgressBar();
      }, 100)
    })
  },
  stopProgress : function(){
    clearInterval(this.data.progressTimer);
  },
  setProgressBar : function(){
    this.setData({
      audioProgress: (this.data.progressBtnPos /500)*100 + 1
    })
  },
  dragProgress : function(e){
    this.stopProgress();
    var nowX = e.touches[0].pageX;
    if(750/width*nowX > 700){
      nowX = 700/750*width;
    }
    if(750/width*nowX < 200){
      nowX = 200/750*width;
    }
    var diff = nowX - this.data.lastPageX;
    var targetPos = this.data.progressBtnPos + 750 / width * diff;
    if(targetPos > 500)targetPos = 500;
    if(targetPos < 0) targetPos = 0;
    this.setData({
      progressBtnPos : targetPos,
      lastPageX : nowX
    });
    this.setProgressBar();
  },
  startDrag : function(e){
    this.setData({
      lastPageX : e.touches[0].pageX
    })
  },
  endDrag : function(){
    audio.seek(this.data.progressBtnPos/500*this.data.audio.duration);
    audio.play();
    this.startProgress();
  }
})