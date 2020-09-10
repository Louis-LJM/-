// 点击盒子切换隐藏
$(function () {
    $('.login-reg-box a').on('click', function () {
        $('.login-reg-box').hide().next().show()
    })
    $('.register-box a').on('click', function () {
        $('.register-box').hide().prev().show()
    })

    // 表单验证
    layui.form.verify({
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
    console.log($('.register-box form'))
    $('.register-box form').on('submit', function (e) {
        e.preventDefault();
        var username = $('#userName').val()
        var password = $('#psd').val()
        var formData = {
            username: username,
            password: password
        }
        $.post(
            '/api/reguser',
            formData,
            function (res) {
                // console.log(res);
                if (res.status === 0) {
                    $('.register-box a').click()
                    // window.location.href = './index.html'
                }
                layui.layer.msg(res.message)
            }
        )
    })


    // login请求
    console.log($('#btn-login'))
    $('#btn-login').submit(function (e) {
        e.preventDefault();
        // console.log(1111);
        var formData = $(this).serialize()
        console.log(formData);
        $.post('/api/login', formData, function (res) {
            if (res.status === 0) {
                window.location.href = '/index.html'
                // res.token.length !== 0 &&
                //     window.localStorage.setItem('token', res.token)
            }
            // layui.layer.msg(res.message)
            console.log(res)
        })
    })








    // 1.阻止默认行为
    // 2.获取表单数据
    // 3.看接口文档  发送ajax
    // 4.处理res响应


})