$(function () {

    //一显示就发送Ajax请求获取并渲染数据到html
    //因为下面要调用这个Ajax请求所以封装到rander函数中，并且先自执行一次
    function rander() {
        $.ajax({
            type: "get",
            url: BigNew.category_list,
            success: (res) => {
                console.log(res);
                if (res.code == 200) {
                    let htmlStr = template('categoryList', res)
                    $('tbody').html(htmlStr)
                }
            }
        })
    }

    rander()

    //新增分类点击弹出模态框
    $('.btn-success').on('click', function () {
        // alert('测试')
        $('#myModal h4').text("新增分类")
        $('#myForm')[0].reset()
        $('input[name=id]').val('')
    })
    $('.btn-sure').on('click', function () {

        $.ajax({
            type: "post",
            url: BigNew.category_add,
            //serialize()获取form表单中带有name属性的value
            //值并转换成键值对&键值对的字符串
            data: $('#myForm').serialize(),
            success: (res) => {
                console.log(res)
                if (res.code === 201) {
                    $('#myModal').modal('hide')
                    //调用上面封装好的函数
                    rander()
                }
            }
        })
    })

    //删除分类模块

    $('#delModal').on('shown.bs.modal',function(e){
        console.log(e.relatedTarget);
        categoryId = $(e.relatedTarget).data("id")
        console.log(categoryId)
    })
    $('.btn-sure-del').on('click',function(){
        // alert("cs")
        $.ajax({
            type:"post",
            url :BigNew.category_delete,
            data:{
                id:categoryId
            },
            success:function(res){
                console.log(res);
                if(res.code ===204){
                    $('#delModal').modal('hide')
                    rander()
                }
            }
        })
    })

    //修改数据回调
    $('#myModal').on('shown.bs.modal',function(e){
        console.log(e.relatedTarget)
        if($(e.relatedTarget).attr('id') === 'xinzengfenlei'){
            $('#myModal h4').text('新增文章分类')
        }else{
            $('#myModal h4').text('编辑文章分类')

            //发送Ajax请求回调数据渲染
            $.ajax({

                type:"get",
                url :BigNew.category_search,
                data:{
                    id:$(e.relatedTarget).data('id')
                },
                success:(res)=>{
                    console.log(res)
                    if(res.code === 200){
                        $('#myForm input[name=id]').val(res.data[0].id)
                        $('#myForm input[name=name]').val(res.data[0].name)
                        $('#myForm input[name=slug]').val(res.data[0].slug)
                    }
                }
            })
        }
    })

    //隐藏域编辑分类更新
    $('.btn-sure').on('click',function(){
        let Id = $('input[name=id]').val()
        // console.log(Id)
        $.ajax({
            type:"post",
            url :Id ? BigNew.category_edit : BigNew.category_add,
            data:$('#myForm').serialize(),
            success:(res)=>{
                console.log(res)
                if(res.code ==  201 || res.code == 200){
                    $('#myModal').modal('hide')
                    rander()
                }
            }
        })
    })


})