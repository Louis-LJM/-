$(function () {
    initTable();

    function initTable() {
        $.get('/my/article/cates', function (res) {
            if (res.status === 0) {
                console.log(res.data)
                var strHtml = template('tpl-table', res)
                $('tbody').html(strHtml)
            }
        })
    }

    // 添加分类按钮
    var addIndex = null;
    var editIndex = null
    $('#addBtn').on('click', function (e) {
        e.preventDefault();
        var strAddHtml = $('#tpl-add').html()
        var addIndex = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: strAddHtml,
        })
    })

    // 代理事件-添加分类
    $('body').on('submit', '#addForm', function (e) {
        e.preventDefault();
        var formData = $(this).serialize()
        // 发送请求
        $.post('/my/article/addcates', formData, function (res) {
            console.log(res)
            if (res.status === 0) {
                // 成功后  清除并关闭
                initTable();
                layui.layer.close(addIndex)
            }
        })
    })

    // 编辑分类
    $('tbody').on('click', '.btn-edit', function (e) {
        e.preventDefault();
        var strEditHtml = $('#tpl-edit').html()
        editIndex = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑文章分类',
            content: strEditHtml,
        })

        // 获取button的data-id属性值
        var Id = $(this).attr('data-id')
        $.get('/my/article/cates/' + Id, function (res) {
            if (res.status === 0) {
                console.log(res.data)
                layui.form.val('editForm', res.data)

            }
        })
    })

    // 编辑分类确定修改
    $('body').on('submit', '#editForm', function (e) {
        e.preventDefault()
        var formData = $(this).serialize()
        $.post('/my/article/updatecate', formData, function (res) {
            initTable()
            layui.layer.close(editIndex)
        })
    })

    // 删除
    $('tbody').on('click', '.btn-delete', function (e) {
        e.preventDefault();
        var Id = $(this).attr('data-id')
        console.log(Id)
        // 弹出层
        layer.confirm('SURE？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.get('/my/article/deletecate/' + Id, function (res) {
                if (res.status === 0) {
                    initTable()
                    layer.close(index)
                }
            })
        })

    })
})