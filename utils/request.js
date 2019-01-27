function request(param){
  wx.request({
    url: "https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine" + param.url,
    success: function(res){
      if(res.data.code == 0){
        param.success(res.data.data);
      }
      else{
        requestErr();
      }
    },
    fail : function(){
      requestErr();
    }
  })
}

function requestErr(){
  wx.showToast({
    title: '请求错误',
    icon: 'none'
  })
}
module.exports = request;
//param:{
//   url,
//   success,
// }