$(function () {
    // 初始化富文本编辑器
    initEditor()

    $.get('/my/article/cates', function (res) {
        if (res.status === 0) {
            var strHtml = template('cate', res)
            $('[name=cate_id]').html(strHtml)
            layui.form.render()
        }
    })

    // 1.初始化图片裁剪器
    var $image = $('#image')

    // 2.裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3.初始化裁剪区域
    $image.cropper(options)
    $('#chooseImage').on('click', function () {
        $('#file').click()
    })

    $('#file').change(function (e) {
        var file = e.target.files[0]
        // console.log(fd);
        var newImageURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')
            .attr('src', newImageURL)
            .cropper(options)
    })

    // 草稿按钮
    var state = '已发布'
    $('#caogao').click(function (e) {
        state = '草稿'
    })

    $('#formPub').on('submit', function (e) {
        e.preventDefault();
        var fd = new FormData($(this)[0])
        fd.append('state', state)
        fd.forEach(function (v, k) {
            console.log(v, k);
        })
    })



})