// 公共的js代码
// 1.提取公共的baseURL  

var token = window.localStorage.getItem('token') || ''
// 1.1login请求一进来  携带者请求的选项 success 、 URL等
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url;


    // 统一设置请求头
    if (!options.url.includes('/api/')) {
        options.headers = {
            // Authorization: token,
            Authorization: token,
        }
    }

    options.complete = function (res) {
        if (
            res.responseJSON.status === 1 &&
            res.responseJSON.message === '身份认证失败！'
        ) {
            // 1. 清除无效的token
            window.localStorage.removeItem('token')
            // 2. 回到login页面
            window.location.href = '/login.html'
        } else {
        }
    }


})