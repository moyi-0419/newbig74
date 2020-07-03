$(function () {
  $.ajax({
    type: 'get',
    url: BigNew.user_info,
    success: function (res) {
      if (res.code == 200) {
        $('.user_info span i').text(res.data.nickname)
        $('.user_info img').attr('src', res.data.userPic)
        $('.user_center_link img').attr('src', res.data.userPic)
      }
    }
  })

  $('.logout').on('click', function () {
    // alert(1)
    window.location.href = './userlogin.html';
    localStorage.removeItem('token')
  })
  $('.menu .level01').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active')
    if($(this).index() == 1){
      $('.menu .level02').slideToggle()
      $(this).find('b').toggleClass('rotate0')
      $('.menu .level02 li:eq(0)').trigger('click')
    }
  })
  $('.menu .level02 li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active')
    // $(this).slideToggle()
    // $(this).find('b').toggleClass('rotate0')
    // $('.menu .level02 li:eq(0)').trigger('click')
    console.log(this);

  })



})