$(function () {
    var $image = $('#image')

    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 创建裁剪区域
    $image.cropper(options)


    // 上传按钮
    $('#btn-upload').on('click', function () {
        $('#file').click()
    })


    $('#file').on('change', function (e) {
        // e.target 获取当前的input file这个dom
        console.log(e.target.files);
        // 1.获取图片对象
        var file = e.target.files[0]
        // 2.根据选择的文件，创建一个对应的URL地址
        var newImgURL = URL.createObjectURL(file)

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片的路径
            .cropper(options) // 重新初始化裁剪区域
    })

    $('#sure').on('click', function (e) {
        e.preventDefault();
        // 获取图片  把图片URL转成base64
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个canvas画布
                width: 100,
                height: 100,
            })
            .toDataURL('image/png') //将canvas画布上的内容，转换成base64格式的字符串
        console.log(dataURL)
        // 发送请求
        $.post('/my/update/avatar', {
            avatar: dataURL
        }, function (res) {
            // console.log(res);
            if (res.status === 0) {
                console.log(res.message);
                // 调用iframe形成的父页面index.html内嵌的index.js的getUserInfo方法
                window.parent.getUserInfo();
            }
        })
    })
})