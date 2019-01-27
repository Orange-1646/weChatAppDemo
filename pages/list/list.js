// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    a : 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    var cache = wx.getStorageSync('likeList');
    if(!cache) cache = {};
    this.setData({
      likeList: cache
    })
    
  },
  typeNavigate: function(e){
    var typeId = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/type/type?typeId=' + typeId,
    })
  },
  likeTap: function(e){
    var i = e.currentTarget.dataset.listindex
    var likeList = this.data.likeList;
    likeList[i] = !likeList[i];
    this.setData({
      likeList : likeList
    });
    wx.setStorage({
      key: 'likeList',
      data: this.data.likeList,
    });
    
  },
  repost : function(e){
    wx.showActionSheet({
      itemList: ['内容过期了', '内容和' + e.currentTarget.dataset.content + '不相关', '不再显示来自' + e.currentTarget.dataset.content+'的内容' ],
    })
  },
  getData : function(){
    var that = this;
    wx.request({
      url: 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getRecommendInfo',
      success: function (res) {
        that.setData({
          recommendHead: res.data
        })
      }
    });
    wx.request({
      url: 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getMarkTypeList',
      success: function (res) {
        that.setData({
          recommendType: res.data.data
        });
      }
    });
    wx.request({
      url: 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getHomeArticleList',
      success: function (res) {
        that.setData({
          recommendList: res.data.data
        });
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

  }
})