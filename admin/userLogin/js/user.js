$(function () {

    $.ajax({
        type: "get",
        url: BigNew.user_detail,
        success: (res) => {
            console.log(res)
            if (res.code == 200) {
                for (var key in res.data) {
                    $(`#form .${key}`).val(res.data[key])
                }
                $('#form .user_pic').attr('src', res.data.userPic)
            }
        }
    })

    $('#exampleInputFile').on('change', function () {
    
        $('.user_pic').attr('src', URL.createObjectURL(this.files[0]))
    })
    $('.btn-edit').on('click', function (e) {
        e.preventDefault()
        console.log(123)

        let data = new FormData($('#form')[0])
        console.log(data)
        $.ajax({
            type: "post",
            url: BigNew.user_edit,
            data: data,
            contentType: false,
            processData: false,
            success: (res) => {
                console.log(res);
                if(res.code == 200){

                    $.ajax({
                        type:"get",
                        url :BigNew.user_info,
                        success:(res)=>{
                            console.log(res)
                            if(res.code == 200){
                                parent.$('.user_info span').html(`欢迎&nbsp;&nbsp;${res.data.nickname}`)
                                parent.$('.user_info img').attr('src',res.data.userPic)
                                parent.$('.header_bar img').attr('src',res.data.userPic)
                            }
                        }
                    })
                }
            }
        })
    })
})