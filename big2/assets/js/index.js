$(function () {
    // 获取用户信息
    // /my/userinfo /  header / ls中的token

    //   获取登录后保存在本地的token
    //   var token = window.localStorage.getItem('token') || ''

    window.getUserInfo = function getUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            // 请求头设置（s不要忘）
            // headers: {
            //   Authorization: token,
            // },
            success: function (res) {
                //   debugger  （断点调试）
                //   console.log(res)

                //   res.data.user_pic
                if (res.status === 1) return
                var resname = res.data.nickname || res.data.username
                $('#welcome').html(resname)

                // 存在：显示图片头像，隐藏文字头像
                if (res.data.user_pic) {
                    // 替换图片的地址
                    $('.layui-nav-img').attr('src', res.data.user_pic).show()
                    $('.text-avatar').hide()
                } else {
                    // 反之
                    $('.layui-nav-img').hide()

                    $('.text-avatar').html(resname[0].toUpperCase())
                }
            },
            // 请求完成后 判断token
            // complete: function (res) {
            //     console.log(res);
            //     if (res.responseJSON.status === 1 &&
            //         res.responseJSON.message === "身份认证失败！") {
            //         // 清除无效的token
            //         window.localStorage.removeItem('token')
            //         // 跳转到跳转页面
            //         window.location.href = '/login.html'
            //     } else {
            //         console.log('--------');
            //     }
            // }
        })
    }
    getUserInfo()


    // 用户退出
    $('#btn-logout').click(function (e) {
        // e.preventDefault()

        // 确认框
        var index = layer.open({
            title: '提示'
            , icon: 3
            , content: '确定退出？'
            , btn: ['确定', '取消']
            , btn1: function () {
                console.log(1)
                window.location.href = '/login.html'
                window.localStorage.removeItem('token')
                layer.close(index)
            },
        });

    })
})
