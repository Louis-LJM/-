// 公共的js代码
// 1.提取公共的baseURL  

var token = localStorage.getItem('token') || ''
// 1.1login请求一进来  携带者请求的选项 success 、 URL等
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;


    // 统一设置请求头
    options.headers = {
        // Authorization: token,
        Authorization: token,
    }
})