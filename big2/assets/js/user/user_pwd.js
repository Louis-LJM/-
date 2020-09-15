$(function () {
    // 校验规则
    var form = layui.form
    form.verify({
        len: [/^\S(6,12)$/, '长度必须是6到12位，不能有空格'],

        // 验证新密码不能和原密码相同
        diff: function (value) {
            // value 表示原密码
            // 获取原密码
            var oldPwd = $('[name="oldPwd"]').val()
            if (value === oldPwd) {
                return '新密码不能和原密码相同'
            }
        },
        // 验证新密码和确认密码是否相同
        same: function (value) {
            var newPwd = $('[name="newPwd"]').val()
            if (value !== newPwd) {
                return '第二个和第三个必须一样'
            }
        }
    })


    //修改按钮
    $("#changePwd").on("click", function (e) {
        e.preventDefault();
        console.log("-----");
        $.post('/my/updatepwd', $('#formInfo').serialize(), function (res) {
            console.log(res.status);
            if (res.status === 0) {
                $('button[type="reset"]').click()
            }
        })
    })

    // $('#changPwd').on("click", function (e) {
    //     console.log("-------");
    //     e.preventDefault();
    //     // console.log(1111);
    //     // console.log(1111);
    //     // initUserInfo();
    //     // $.post('/my/userinfo', $('#formInfo').serialize(), function (res) {
    //     //     // console.log(res);
    //     //     if (res.status === 0) {
    //     //         // 重置按钮触发
    //     //         $('button[type="reset"]').click()
    //     //     } else {

    //     //     }
    //     // })
    // })
})