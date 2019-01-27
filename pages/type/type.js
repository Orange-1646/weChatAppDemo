// pages/type/type.js
var request = require("../../utils/request.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  repost: function (e) {
    wx.showActionSheet({
      itemList: ['内容过期了', '内容和' + this.data.title + '不相关', '不再显示来自' + this.data.title + '的内容'],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id : options.typeId
    })
    var cache = wx.getStorageSync('likeListType' + this.data.id);
    if (!cache) cache = {};
    this.setData({
      likeList: cache
    })
    this.getData(options.typeId)
    
  },
  likeTap: function (e) {
    var i = e.currentTarget.dataset.listindex
    var likeList = this.data.likeList;
    likeList[i] = !likeList[i];
    this.setData({
      likeList: likeList
    });
    wx.setStorage({
      key: 'likeListType' + this.data.id,
      data: this.data.likeList,
    });

  },
  getData : function(typeId){
    var that = this;
    request({
      url: '/getArticleTypeTitleInfo/' + typeId,
      success: function (res) {
        that.setData({
          title: res.title,
          titleImgSrc: res.imgSrc
        })
      }
    });
    request({
      url: '/getArticleTypeList/' + typeId,
      success: function (res) {
        that.setData({
          recommendList: res
        })
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
  navigateToDetail : function(e){
    var id = e.currentTarget.dataset.itemid;
    wx.navigateTo({
      url: '/pages/articleDetail/articleDetail?id=' + id,
    })
  }
})