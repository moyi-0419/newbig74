/**
 * 这是一个实现登陆页面业务逻辑的一个文件
 * 登陆的实现思路：
 * 1. 给登陆按钮注册事件 submit 不要忘了阻止默认行为
 * 2. 在发送请求之前，一定要先获取用户名和密码
 * 3. 需要进行必要的校验  用户名或密码不能为空
 * 4. 接收服务器端响应回来的数据 根据状态码进行判断 
 * 5. 如果登陆成功要弹出提示框 提示登陆成功
 * 6. 如果失败，也要弹出提示框 提示登陆失败
 */
$(function(){
  // 1. 给登陆按钮注册事件
  $('.login_form').on('submit',function(e){
    // 2. 阻止默认行为
    e.preventDefault()
    // console.log(123);
    // 3. 发送ajax请求
    $.ajax({
      type:'post',
      url:'http://localhost:8080/api/v1/admin/user/login',
      // data:{
      //   username:
      //   password
      // }
      beforeSend:function(){
        // 4. 在此处进行数据的校验 用户名和密码不能为空
        var flag = false 
        $('.login_form input[name]').each(function(index,ele){
          if($(ele).val().trim()==''){
            flag = true
          }
        })
        if(flag){
          // alert('用户名或密码不能为空')
          $('.myModel').modal('show')
         var timeId= setTimeout(function() {
          $('.myModel').modal('hide')
          clearTimeout(timeId)
          }, 2000);
          
          $('.myModel .modal-body p').text('用户名或密码不能为空')
          return false;// 阻止请求的发送
        }
      },
      data:$(this).serialize(),
      success:function(res){
        // console.log(res);
        $('.myModel').modal('show')
          $('.myModel .modal-body p').text(res.msg)
          // var timeId= setTimeout(function() {
          //   $('.myModel').modal('hide')
          //   clearTimeout(timeId)
          //   }, 2000);
        if(res.code==200){
          // 跳转到后台的主页面
          // $('.myModel').on('hidden.bs.modal', function (e) {
            // do something...
            window.location.href='./index.html';
          // })
          
        }
      }
    })
  })
})