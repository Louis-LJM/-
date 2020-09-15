$(function () {
    // 设置表格数据请求的查询参数
    var q = {
        // 页码值
        pagenum: 1,
        // 每页显示多少条数据
        pagesize: 5,
        // 文章分类的Id
        cate_id: $('[name=cate_id').val(),
        // 文章的状态：可选值有：已发布、草稿
        state: $('[name=state').val(),
    }
    // 过滤器
    template.defaults.imports.formatDate = function (olddate) {
        // console.log(a)
        var timenew = moment(olddate).format('MMMM Do YYYY, h:mm:ss a')
        return timenew
    }
    // 获取数据
    initList();

    function initList() {
        $.get('/my/article/list', q, function (res) {
            // console.log(res);
            if (res.status === 0) {
                // console.log(res)
                var strHtml = template('tpl-table', res)
                // console.log($('tpl-table'))
                $('tbody').html(strHtml)
                // 调用渲染分页
                renderPage(res.total)
            }
        })
    }
    // 顶部下拉框
    initCate()

    function initCate() {
        $.get('/my/article/cates', function (res) {
            // console.log(res)
            if (res.status === 0) {
                console.log(res)
                var strHtml = template('tpl-cate', res)
                $('#sct-cate').html(strHtml)
                // 先写的form（无法监听变化），后动态创建表单元素内容option，再layui.form.render()重新渲染
                layui.form.render()
            }
        })
    }

    // 筛选按钮
    $('#form-search').on('submit', function (e) {
        e.preventDefault()

        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        // console.log(q)
        initList()
    })

    // 渲染分页
    function renderPage(total) {
        // console.log(todal)   
        layui.use('laypage', function () {
            var laypage = layui.laypage
            // 执行一个laypage实例
            laypage.render({
                elem: 'page', //注意。这里的test1是ID，不用加#号
                count: total, // 数据总数
                curr: q.pagenum, // 当前页码
                limit: q.pagesize, // 每页条数

                limits: [2, 3, 5, 10],
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                // 默认第一次时调用  切换页码时，调用jump函数
                jump: function (obj, first) {

                    // 首次不执行
                    if (!first) {
                        // obj包含了当前分页的所有参数，比如
                        // console.log(obj.curr) // 得到当前页，以便向服务器端请求对应页的数据
                        // console.log(obj.limit) //得到每页显示的条数

                        // 安装最新页码获取文章列表数据
                        q.pagenum = obj.curr
                        q.pagesize = obj.limit
                        initList()
                    } else {}
                },
            })
        })
    }

    // 删除文章
    // console.log($('tbody'));
    $('tbody').on('click', '.delete', function (e) {
        e.preventDefault();
        // console.log(546544)
        var Id = $(this).attr('data-id')
        var len = $('.delete').length

        //确认框
        layer.confirm('Sure?', {
            icon: 3,
            title: '删除文章'
        }, function (index) {
            // console.log(556555)
            $.get(`/my/article/delete/${Id}`, function (res) {
                console.log(res)
                if (res.status === 0) {

                    if (len === 1) {
                        // 改变页码 pagenum
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initList();
                    layer.close(index)
                }
            })
        })
    })
})