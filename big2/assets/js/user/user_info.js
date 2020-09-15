$(function () {
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })

    // 获取登录用户信息
    initUserInfo()
    function initUserInfo() {
        $.get('/my/userinfo', function (res) {
            console.log(res);
            // 判断
            if (res.status === 0) {
                // 赋值
                layui.form.val('formInfo', res.data)
            } else {
            }
        })
    }

    // 重置按钮
    $('#btn-rest').click(function (e) {
        e.preventDefault();
        initUserInfo()
    })

    // 更新用户信息
    $('#formupdate').submit(function (e) {

        e.preventDefault();
        console.log("-------");
        $.post('/my/userinfo', $(this).serialize(), function (res) {
            if (res.status === 0) {
                // 更新页面信息（之前的请求）
                // console.log(window.parent);
                // window.parent.getUserInfo();
                window.parent.getUserInfo();

            }
        })
    })
})