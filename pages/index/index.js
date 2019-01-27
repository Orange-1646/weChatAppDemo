// pages/index/index.js
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  navigateInside : function(){
    wx.navigateTo({
      url: '../inside/inside',
    })
  },
  childTap : function(e){
    console.log('child---', e);
  },
  parentTap : function(e){
    console.log('parent---', e);
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
