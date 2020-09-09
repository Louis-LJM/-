// 点击盒子切换隐藏
$(function () {
    $('.login-reg-box a').on('click', function () {
        $('.login-reg-box').hide().next().show()
    })
    $('.register-box a').on('click', function () {
        $('.register-box').hide().prev().show()
    })

    // 表单验证
    var form = layui.form
    form.verify({
        password: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repassword: function (value) {
            if ($('#psd').val() !== value) {
                return '密码不一致'
            }
        }
    })


    // 发送注册请求reg-btn
    $('.register-box form').on('submit', function (e) {
        e.preventDefault();
        var username = $('#userName').val()
        var password = $('#psd').val()
        var formData = {
            username: username,
            password: password
        }
        $.post(
            'http://www.liulongbin.top:3007/api/reguser',
            formData,
            function (res) {
                // console.log(res);
                if (res.status === 0) {
                    console.log(res.message);
                    $('.register-box a').click()
                }
            }
        )
    })
    // 1.阻止默认行为
    // 2.获取表单数据
    // 3.看接口文档  发送ajax
    // 4.处理res响应


})