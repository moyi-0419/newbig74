$(function(){

    {
        let myForm = $('#myForm')
        let submit = $('#submit')
        let newName = $('#wh-login')
        let newPwd = $('#wh-logintwo')
        myForm.on('submit',(e)=>{
            e.preventDefault()
            // alert(123)
            console.log(myForm.serialize())
            $.ajax({
                type:"post",
                url:'http://localhost:8080/api/v1/admin/user/login',
                data:myForm.serialize(),
                beforeSend:()=>{
                    let flag = false;
                    $('#myForm input[name]').each((index,item)=>{
                        if($(item).val().trim() == ''){
                            flag = true;
                        }
                    })
                    if(flag){
                        $('.myModel').modal('show')
                        $('.modal-body p').text('error:username or password')
                        var timeId = setInterval(()=>{
                            $('.myModel').modal('hide')
                            clearInterval(timeId)
                        },4000)
                        return false;
                    }
                },
                success:(res)=>{
                    console.log(res);
                    $('.myModel').modal('show')
                    $('.modal-body p').text(res.msg)
                    $('.btn-primary').on('click',()=>{
                        $('.myModel').modal('hide')
                    })
                    if(res.code == 200){
                        // console.log(123)
                        console.log(res);
                        window.localStorage.setItem('token',res.token)
                        $('.myModel').modal('show')
                        $('.modal-body p').text(res.msg)
                        $('.btn-primary').on('click',()=>{
                            $('.myModel').modal('hide')
                            window.location.href = './index.html';
                        })
                       
                    }
                }
            })
        })
    }
})