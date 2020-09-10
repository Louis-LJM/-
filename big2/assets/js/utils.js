// 公共的js代码
// 1.提取公共的baseURL  


// 1.1login请求一进来  携带者请求的选项 success 、 URL等
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

})